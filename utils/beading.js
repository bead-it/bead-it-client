import pickRandomColor from './pickrandomcolor';
import beadSvg from '../constants/beadsvg';

const beading = (beads, threads) => {
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

  const beadQueue = ['start'];
  const beadsInfo = [];

  while (beadQueue.length) {
    const currentBead = beadQueue.shift();

    let prevPosition;
    let currentPosition;
    let nextBeadsId;

    if (currentBead === 'start') {
      currentPosition = { cx: 500, cy: 500 };
      nextBeadsId = [...startPoints];
    } else {
      ({ prevPosition, currentPosition, nextBeadsId } = currentBead);
    }

    if (nextBeadsId?.length > 0) {
      nextBeadsId = nextBeadsId.filter(beadId => {
        if (allPoints.has(beadId)) {
          allPoints.delete(beadId);
          return true;
        }

        return false;
      });

      let linkCount;
      let angle;
      let currentAngle;

      if (currentBead === 'start') {
        linkCount = nextBeadsId.length;
        angle = (Math.PI * 2) / linkCount;
        currentAngle = 0;
      } else {
        linkCount = nextBeadsId.length + 1;
        angle = (Math.PI * 2) / linkCount;

        if (prevPosition.cx === currentPosition.cx) {
          currentAngle =
            prevPosition.cy > currentPosition.cy
              ? Math.PI / 2
              : (Math.PI * 3) / 2;
        } else if (prevPosition.cy === currentPosition.cy) {
          currentAngle = prevPosition.cx > currentPosition.cx ? 0 : Math.PI;
        } else {
          currentAngle = Math.atan(
            (currentPosition.cy - prevPosition.cy) /
              (prevPosition.cx - currentPosition.cx),
          );

          if (currentPosition.cx > prevPosition.cx) {
            currentAngle += Math.PI;
          }
        }
        currentAngle += angle;
      }

      nextBeadsId.forEach(beadId => {
        const newCx = currentPosition.cx + Math.cos(currentAngle) * 200;
        const newCy = currentPosition.cy - Math.sin(currentAngle) * 200;

        beadsInfo.push({
          id: beadId,
          ...beadSvg.circle,
          cx: newCx,
          cy: newCy,
          fill: pickRandomColor(),
        });

        beadQueue.push({
          prevPosition: currentPosition,
          currentPosition: { cx: newCx, cy: newCy },
          nextBeadsId: directions[beadId],
        });

        currentAngle += angle;
      });
    }
  }

  return { beadsInfo };
};

export default beading;
