const makeThreadGroup = (threads, beadsGroups) => {
  const beadToGroupMap = {};
  beadsGroups.forEach(group => {
    group.beads.forEach(beadId => {
      beadToGroupMap[beadId] = group.id;
    });
  });

  const threadGroupObject = {};
  threads.forEach(thread => {
    const { _id: threadId } = thread;

    const threadGroupId = `path${beadToGroupMap[thread.source]}${
      beadToGroupMap[thread.target]
    }`;
    if (!threadGroupObject[threadGroupId]) {
      threadGroupObject[threadGroupId] = {
        id: threadGroupId,
        source: beadToGroupMap[thread.source],
        target: beadToGroupMap[thread.target],
        threads: [threadId],
      };
    } else {
      threadGroupObject[threadGroupId].threads.push(threadId);
    }
  });

  return Object.values(threadGroupObject);
};

export default makeThreadGroup;
