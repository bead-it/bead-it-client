const initialProcess = (beads, threads) => {
  const startPoints = new Set(
    beads.map(bead => {
      const { _id: tempId } = bead;
      return tempId;
    }),
  );

  const directions = {};
  const allPoints = new Set(startPoints);

  threads.forEach(thread => {
    startPoints.delete(thread.target);

    if (directions[thread.source]) {
      directions[thread.source].push(thread.target);
    } else {
      directions[thread.source] = [thread.target];
    }
  });

  return { startPoints, allPoints, directions };
};

const makeNextGroups = (group, beadsMap, exclusiveBeads) => {
  const exclusiveSet = new Set(exclusiveBeads);

  const nextGroupObject = {};
  group.forEach(beadId => {
    if (exclusiveSet.has(beadId)) {
      const { domain } = beadsMap[beadId].page;
      if (nextGroupObject[domain]) {
        nextGroupObject[domain].push(beadId);
      } else {
        nextGroupObject[domain] = [beadId];
      }
    } else if (nextGroupObject.noDomain) {
      nextGroupObject.noDomain.push(beadId);
    } else {
      nextGroupObject.noDomain = [beadId];
    }
  });

  const nextGroup = [];
  Object.keys(nextGroupObject).forEach(key => {
    if (key === 'noDomain') {
      nextGroupObject[key].forEach(beadId => {
        nextGroup.push([beadId]);
      });
    } else {
      nextGroup.push(nextGroupObject[key]);
    }
  });

  return nextGroup;
};

const makebeadGroupInfo = (beads, threads, beadsMap, exclusiveBeads) => {
  const { startPoints, allPoints, directions } = initialProcess(beads, threads);

  const groupQueue = ['start'];
  const groupInfo = [];

  while (groupQueue.length) {
    const prevGroups = groupQueue.shift();

    let prevPosition;
    let currentPosition;
    let currentGroups;

    if (prevGroups === 'start') {
      currentPosition = { x: 300, y: 300 };
      currentGroups = makeNextGroups(
        [...startPoints],
        beadsMap,
        exclusiveBeads,
      );
    } else {
      ({ prevPosition, currentPosition, currentGroups } = prevGroups);
    }

    if (currentGroups?.length > 0) {
      currentGroups = currentGroups
        .map(group => {
          return group.filter(beadId => {
            if (allPoints.has(beadId)) {
              allPoints.delete(beadId);
              return true;
            }

            return false;
          });
        })
        .filter(group => group.length > 0);

      let linkCount;
      let angle;
      let currentAngle;

      if (prevGroups === 'start') {
        linkCount = currentGroups.length;
        angle = (Math.PI * 2) / linkCount;
        currentAngle = 0;
      } else {
        linkCount = currentGroups.length + 1;
        angle = (Math.PI * 2) / linkCount;

        if (prevPosition.x === currentPosition.x) {
          currentAngle =
            prevPosition.y > currentPosition.y
              ? Math.PI / 2
              : (Math.PI * 3) / 2;
        } else if (prevPosition.y === currentPosition.y) {
          currentAngle = prevPosition.x > currentPosition.x ? 0 : Math.PI;
        } else {
          currentAngle = Math.atan(
            (currentPosition.y - prevPosition.y) /
              (prevPosition.x - currentPosition.x),
          );

          if (currentPosition.x > prevPosition.x) {
            currentAngle += Math.PI;
          }
        }
        currentAngle += angle;
      }

      currentGroups.forEach(group => {
        const newX = currentPosition.x + Math.cos(currentAngle) * 250;
        const newY = currentPosition.y - Math.sin(currentAngle) * 250;

        const { domain } = beadsMap[group[0]].page;

        const nextGroups = [];

        group.forEach(beadId => {
          const nextBeads = directions[beadId];
          if (nextBeads) {
            nextGroups.push(
              ...makeNextGroups(directions[beadId], beadsMap, exclusiveBeads),
            );
          }
        });

        groupInfo.push({
          id: `group${group[0]}`,
          x: newX,
          y: newY,
          beads: group,
          domain,
        });

        groupQueue.push({
          prevPosition: currentPosition,
          currentPosition: { x: newX, y: newY },
          currentGroups: nextGroups,
        });

        currentAngle += angle;
      });
    }
  }

  return groupInfo;
};

export default makebeadGroupInfo;
