import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import zoomPanning from '../../utils/d3datautil/zoompanning';
import {
  beadingGroupSel,
  beadsMapSel,
  threadsGroupSel,
} from '../../recoilstore/seletors';

import COLOR from '../../constants/colors';
import {
  beadShapeAtom,
  currentBeadAtom,
  realViewModalAtom,
} from '../../recoilstore/atoms';

export default function BeadworkTable() {
  const beadingGroupData = useRecoilValue(beadingGroupSel);
  const beadsMap = useRecoilValue(beadsMapSel);
  const threadsGroup = useRecoilValue(threadsGroupSel);
  const setCurrentBead = useSetRecoilState(currentBeadAtom);
  const setRealViewModal = useSetRecoilState(realViewModalAtom);
  const beadShape = useRecoilValue(beadShapeAtom);

  useEffect(() => {
    console.log(beadingGroupData);
    console.log(beadsMap);
  }, [beadingGroupData, beadsMap]);

  useEffect(() => {
    d3.select('.canvas')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .append('g')
      .attr('id', 'topGroup');
  }, []);

  useEffect(() => {
    const beadsGroups = d3
      .select('#topGroup')
      .selectAll('g')
      .data(Object.values(beadingGroupData));
    beadsGroups
      .join('g')
      .attr('id', d => d.id)
      .append('text')
      .text(d => d.domain)
      .attr('x', d => d.x)
      .attr('y', d => d.y);
  }, [beadingGroupData]);

  useEffect(() => {
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
  }, [beadingGroupData, beadShape]);

  useEffect(() => {
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
  }, [beadingGroupData, threadsGroup]);

  useEffect(() => {
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
  }, [beadingGroupData, beadShape, beadsMap, threadsGroup]);

  useEffect(() => {
    d3.select('g')
      .selectAll(beadShape)
      .on('click', e => {
        e.stopPropagation();
        setCurrentBead(e.target);
        setRealViewModal(true);
      });
  }, [beadingGroupData, beadShape, beadsMap, threadsGroup]);

  useEffect(() => {
    zoomPanning();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      d3.select(`#group6374964d690ff5cb4a2f739a`)
        .append('circle')
        .attr('cx', 100)
        .attr('cy', 200)
        .attr('fill', 'black');
    }, 1000);
  });

  return <Canvas className="canvas" color={COLOR} />;
}

const Canvas = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;

  left: 0;
  top: 0;

  background-color: ${props => props.color.pink};

  z-index: 0;
`;
