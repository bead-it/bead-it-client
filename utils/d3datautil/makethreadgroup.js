const makeThreadGroup = (threads, beadsGroups) => {
  const beadToGroupMap = {};
  beadsGroups.forEach(group => {
    group.beads.forEach(beadId => {
      beadToGroupMap[beadId] = group.id;
    });
  });

  const threadGroupObject = {};
  threads.forEach(thread => {
    const threadGroupId = `group${thread.source}${thread.target}`;
    if (!threadGroupObject[threadGroupId]) {
      threadGroupObject[threadGroupId] = {
        id: threadGroupId,
        source: beadToGroupMap[thread.source],
        target: beadToGroupMap[thread.target],
      };
    }
  });

  return Object.values(threadGroupObject);
};

export default makeThreadGroup;
