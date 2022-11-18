import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import zoomPanning from '../../utils/zoompanning';
import { beading, beadsData } from '../../recoilstore/seletors';

import COLOR from '../../constants/colors';
import {
  currentBead,
  realViewModal,
  threadsReceived,
} from '../../recoilstore/atoms';

export default function BeadworkTable() {
  const beadingData = useRecoilValue(beading);
  const beadsObjectData = useRecoilValue(beadsData);
  const threadsRawData = useRecoilValue(threadsReceived);
  const setCurrentBead = useSetRecoilState(currentBead);
  const setRealViewModal = useSetRecoilState(realViewModal);

  useEffect(() => {
    console.log(beadingData);
    console.log(beadsObjectData);
  }, [beadingData, beadsObjectData]);

  useEffect(() => {
    const svg = d3
      .select('.canvas')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%');

    svg.append('g');
  }, []);

  useEffect(() => {
    const beads = d3.select('g').selectAll('circle').data(beadingData);
    beads
      .join('circle')
      .attr('id', d => d.id)
      .attr('cx', d => d.cx)
      .attr('cy', d => d.cy)
      .attr('r', d => d.r)
      .attr('fill', d => d.fill)
      .attr('stroke', d => d.stroke)
      .attr('stroke-width', d => d['stroke-width']);
  }, [beadingData]);

  useEffect(() => {
    const link = d3
      .linkHorizontal()
      .source(d => {
        const { _id: sourceId } = beadsObjectData[d.source];
        const source = d3.select(`#id${sourceId}`);
        return [Number(source.attr('cx')), Number(source.attr('cy'))];
      })
      .target(d => {
        const { _id: targetId } = beadsObjectData[d.target];
        const target = d3.select(`#id${targetId}`);
        return [Number(target.attr('cx')), Number(target.attr('cy'))];
      });

    const threads = d3.select('g').selectAll('path').data(threadsRawData);
    threads
      .join('path')
      .attr('d', link)
      .attr('id', d => {
        const { _id: threadId } = d;
        return threadId;
      })
      .attr('stroke', COLOR.gray)
      .attr('fill', 'none')
      .attr('stroke-width', '10');
  }, [beadsObjectData, threadsRawData]);

  useEffect(() => {
    d3.select('g')
      .selectAll('circle, path')
      .datum((d, i, nodes) => nodes[i].nodeName)
      .sort((a, b) => {
        if (a === b) {
          return 0;
        }
        if (a === 'circle') {
          return 1;
        }
        return -1;
      });
  }, [beadingData, beadsObjectData, threadsRawData]);

  useEffect(() => {
    d3.select('g')
      .selectAll('circle')
      .on('click', e => {
        e.stopPropagation();
        setCurrentBead(e.target);
        setRealViewModal(true);
      });
  }, [beadingData, beadsObjectData, threadsRawData]);

  useEffect(() => {
    zoomPanning();
  }, []);

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
