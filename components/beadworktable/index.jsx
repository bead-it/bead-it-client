import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';

import zoomPanning from '../../utils/d3datautil/zoompanning';
import beadworkText from '../../utils/d3datautil/beadworktext';
import {
  tableInit,
  tableGrouping,
  tableBeadDrawing,
  tableThreadDrawing,
  tableSorting,
} from '../../utils/d3datautil/tablework';
import {
  clickEvent,
  mouseOverEvent,
  hightlightCurrentBead,
} from '../../utils/d3datautil/event';
import {
  beadingGroupSel,
  beadsMapSel,
  threadsGroupSel,
} from '../../recoilstore/seletors';

import COLOR from '../../constants/colors';
import {
  beadShapeAtom,
  currentBeadIdAtom,
  currentBeadworkInfoAtom,
  detailModalAtom,
  detailModalContentsAtom,
  realViewModalAtom,
  mouseoverBeadPositionAtom,
  beadActionModalAtom,
} from '../../recoilstore/atoms';

export default function BeadworkTable() {
  const beadingGroupData = useRecoilValue(beadingGroupSel);
  const beadsMap = useRecoilValue(beadsMapSel);
  const threadsGroup = useRecoilValue(threadsGroupSel);
  const [currentBeadId, setCurrentBeadId] = useRecoilState(currentBeadIdAtom);
  const setRealViewModal = useSetRecoilState(realViewModalAtom);
  const setDetailModal = useSetRecoilState(detailModalAtom);
  const setDetailModalContents = useSetRecoilState(detailModalContentsAtom);
  const setMouseoverBeadPosition = useSetRecoilState(mouseoverBeadPositionAtom);
  const setBeadActionModal = useSetRecoilState(beadActionModalAtom);
  const beadShape = useRecoilValue(beadShapeAtom);
  const beadworkInfo = useRecoilValue(currentBeadworkInfoAtom);

  useEffect(() => {
    tableInit();
  }, []);

  useEffect(() => {
    if (beadworkInfo) {
      beadworkText(beadworkInfo);
    }
  }, [beadworkInfo]);

  useEffect(() => {
    tableGrouping(beadingGroupData);
  }, [beadingGroupData]);

  useEffect(() => {
    tableBeadDrawing(beadingGroupData, beadShape);
  }, [beadingGroupData, beadShape]);

  useEffect(() => {
    tableThreadDrawing(beadingGroupData, threadsGroup);
  }, [beadingGroupData, threadsGroup]);

  useEffect(() => {
    tableSorting();
  }, [beadingGroupData, beadShape, beadsMap, threadsGroup]);

  useEffect(() => {
    clickEvent(beadShape, setCurrentBeadId, setRealViewModal);
    mouseOverEvent(
      setDetailModal,
      setDetailModalContents,
      setBeadActionModal,
      setMouseoverBeadPosition,
      beadsMap,
    );
  }, [beadingGroupData, beadShape, beadsMap, threadsGroup]);

  useEffect(() => {
    zoomPanning();
  }, []);

  useEffect(() => {
    return hightlightCurrentBead(currentBeadId);
  }, [currentBeadId]);

  useEffect(() => {
    setTimeout(() => {
      d3.select(`#group6374964d690ff5cb4a2f739a`)
        .append('circle')
        .attr('cx', 100)
        .attr('cy', 200)
        .attr('r', 50)
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
