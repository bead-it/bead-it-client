import pickRandomColor from '../pickrandomcolor';
import beadSvg from '../../constants/beadsvg';

const doBeading = (beadsGroups, beadShape) => {
  const beadGroupsInfo = {};

  beadsGroups.forEach(group => {
    const { beads, x, y } = group;

    const linkCount = beads.length;
    const angle = (Math.PI * 2) / linkCount;
    let currentAngle = 0;

    beadGroupsInfo[group.id] = {
      id: group.id,
      x: group.x,
      y: group.y,
      domain: group.domain,
      beads: [],
    };

    if (beads.length === 1) {
      beadGroupsInfo[group.id].beads.push({
        id: `bead${beads[0]}`,
        beadX: group.x,
        beadY: group.y,
        fill: pickRandomColor(),
        ...beadSvg[beadShape],
      });
    } else {
      beads.forEach(beadId => {
        const newX = x + Math.cos(currentAngle) * 30;
        const newY = y - Math.sin(currentAngle) * 30;

        const beadInfo = {
          id: `bead${beadId}`,
          beadX: newX,
          beadY: newY,
          fill: pickRandomColor(),
          ...beadSvg[beadShape],
        };

        beadGroupsInfo[group.id].beads.push(beadInfo);

        currentAngle += angle;
      });
    }
  });

  return beadGroupsInfo;
};

export default doBeading;
