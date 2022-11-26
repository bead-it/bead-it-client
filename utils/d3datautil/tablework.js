import * as d3 from 'd3';
import COLOR from '../../constants/colors';

const tableInit = () => {
  const topGroup = d3
    .select('.canvas')
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .append('g')
    .attr('id', 'topGroup');

  topGroup.append('g').attr('id', 'beadGroups');
  topGroup.append('g').attr('id', 'beadworkContents');
};

const tableGrouping = beadingGroupData => {
  const beadsGroups = d3
    .select('#beadGroups')
    .selectAll('g')
    .data(Object.values(beadingGroupData));
  beadsGroups.join('g').attr('id', d => d.id);
};

const tableBeadDrawing = (beadingGroupData, beadShape) => {
  Object.values(beadingGroupData).forEach(group => {
    const beads = d3
      .select(`#${group.id}`)
      .selectAll(beadShape)
      .data(group.beads);
    beads
      .join(beadShape)
      .attr('id', d => d.id)
      .attr('cx', d => d.beadX)
      .attr('cy', d => d.beadY)
      .attr('r', d => d.r)
      .attr('fill', d => d.fill)
      .attr('stroke', d => d.stroke)
      .attr('stroke-width', d => d['stroke-width']);
  });
};

const tableTextDrawing = beadingGroupData => {
  Object.values(beadingGroupData).forEach(group => {
    d3.select(`#${group.id}`)
      .append('text')
      // .text(group.domain)
      .attr('x', group.x - 45)
      .attr('y', group.y + 5);
  });

  return () => {
    Object.values(beadingGroupData).forEach(group => {
      d3.select(`#${group.id}`).select('text').remove();
    });
  };
};

const tableThreadDrawing = (beadingGroupData, threadsGroup) => {
  const link = d3
    .linkHorizontal()
    .source(d => {
      const sourceGroup = beadingGroupData[d.source];
      return [sourceGroup.x, sourceGroup.y];
    })
    .target(d => {
      const targetGroup = beadingGroupData[d.target];
      return [targetGroup.x, targetGroup.y];
    });

  const threads = d3.select('#beadGroups').selectAll('path').data(threadsGroup);
  threads
    .join('path')
    .attr('d', link)
    .attr('id', d => {
      return d.id;
    })
    .attr('stroke', COLOR.gray)
    .attr('fill', 'none')
    .attr('stroke-width', '10');
};

const tableSorting = () => {
  d3.select('#beadGroups')
    .selectAll('g, path')
    .datum((d, i, nodes) => nodes[i].nodeName)
    .sort((a, b) => {
      if (a === b) {
        return 0;
      }
      if (a === 'g') {
        return 1;
      }

      return -1;
    });

  d3.select('#beadGroups')
    .selectAll('g')
    .selectAll('circle, text')
    .datum((d, i, nodes) => nodes[i].nodeName)
    .sort((a, b) => {
      if (a === b) {
        return 0;
      }
      if (a === 'text') {
        return 1;
      }

      return -1;
    });
};

const tableUngroupIconDrawing = beadingGroupData => {
  beadingGroupData
    .filter(group => group.beads.length > 1)
    .forEach(group => {
      d3.select(`#${group.id}`)
        .append('image')
        .attr('xlink:href', '/images/ungrouping.png')
        .attr('x', group.x - 25)
        .attr('y', group.y - 25)
        .attr('width', 50)
        .attr('height', 50)
        .attr('id', 'groupIcon')
        .attr('groupId', group.id);
    });

  return () => {
    d3.selectAll('#groupIcon').remove();
  };
};

export {
  tableInit,
  tableGrouping,
  tableBeadDrawing,
  tableTextDrawing,
  tableThreadDrawing,
  tableSorting,
  tableUngroupIconDrawing,
};
