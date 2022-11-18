import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import { useRecoilValue } from 'recoil';

import zoomPanning from '../../utils/zoompanning';
import { beading } from '../../recoilstore/seletors';

export default function BeadworkTable() {
  const beadingData = useRecoilValue(beading);

  useEffect(() => {
    const svg = d3
      .select('.canvas')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%');

    svg.append('g');
  }, []);

  useEffect(() => {
    const beads = d3
      .select('g')
      .selectAll('circle')
      .data(beadingData.beadsInfo);
    beads
      .join('circle')
      .attr('id', d => d.id)
      .attr('cx', d => d.cx)
      .attr('cy', d => d.cy)
      .attr('r', d => d.r)
      .attr('fill', d => d.fill)
      .attr('stroke', d => d.stroke)
      .attr('stroke-width', d => d['stroke-width']);
  }, [beadingData, beadingData.beadsInfo?.length]);

  useEffect(() => {
    zoomPanning();
  }, []);

  return <Canvas className="canvas" />;
}

const Canvas = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;

  left: 0;
  top: 0;

  background-color: brown;

  z-index: 0;
`;
