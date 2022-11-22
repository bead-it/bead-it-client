import * as d3 from 'd3';
import COLOR from '../../constants/colors';

const tableInit = () => {
  d3.select('.canvas')
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .append('g')
    .attr('id', 'topGroup');
};

const tableGrouping = beadingGroupData => {
  const beadsGroups = d3
    .select('#topGroup')
    .selectAll('g')
    .data(Object.values(beadingGroupData));
  beadsGroups
    .join('g')
    .attr('id', d => d.id)
    .append('text')
    .text(d => d.domain)
    .attr('x', d => d.x + 50)
    .attr('y', d => d.y + 5);
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

  const threads = d3.select('g').selectAll('path').data(threadsGroup);
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
  d3.select('#topGroup')
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

  d3.select('#topGroup')
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

export {
  tableInit,
  tableGrouping,
  tableBeadDrawing,
  tableThreadDrawing,
  tableSorting,
};
