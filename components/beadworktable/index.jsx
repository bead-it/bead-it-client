import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';

import zoomPanning from '../../utils/d3datautil/zoompanning';
import beadworkText from '../../utils/d3datautil/beadworktext';
import {
  tableInit,
  tableGrouping,
  tableBeadDrawing,
  tableThreadDrawing,
  tableSorting,
  tableTextDrawing,
  tableUngroupIconDrawing,
} from '../../utils/d3datautil/tablework';
import {
  clickEvent,
  mouseOverEvent,
  hightlightCurrentBead,
} from '../../utils/d3datautil/event';
import {
  beadingGroupSel,
  beadsGroupSel,
  beadsMapSel,
  threadsGroupSel,
} from '../../recoilstore/seletors';

import COLOR from '../../constants/colors';
import {
  beadShapeAtom,
  currentBeadIdAtom,
  currentBeadworkInfoAtom,
  detailModalAtom,
  webViewModalAtom,
  mouseoverBeadPositionAtom,
  beadActionModalAtom,
  selectStartPointAtom,
  mouseoverBeadIdAtom,
  selectedBeadsAtom,
  exclusiveBeadsAtom,
  threadModifyModalAtom,
  currentThreadIdAtom,
} from '../../recoilstore/atoms';

export default function BeadworkTable() {
  const beadsGroupData = useRecoilValue(beadsGroupSel);
  const beadingGroupData = useRecoilValue(beadingGroupSel);
  const beadsMap = useRecoilValue(beadsMapSel);
  const threadsGroup = useRecoilValue(threadsGroupSel);
  const [currentBeadId, setCurrentBeadId] = useRecoilState(currentBeadIdAtom);
  const setCurrentThreadId = useSetRecoilState(currentThreadIdAtom);
  const setWebViewModal = useSetRecoilState(webViewModalAtom);
  const setDetailModal = useSetRecoilState(detailModalAtom);
  const setMouseoverBeadId = useSetRecoilState(mouseoverBeadIdAtom);
  const setMouseoverBeadPosition = useSetRecoilState(mouseoverBeadPositionAtom);
  const setBeadActionModal = useSetRecoilState(beadActionModalAtom);
  const setThreadModifyModal = useSetRecoilState(threadModifyModalAtom);
  const [selectStartPoint, setSelectStartPoint] =
    useRecoilState(selectStartPointAtom);
  const beadShape = useRecoilValue(beadShapeAtom);
  const beadworkInfo = useRecoilValue(currentBeadworkInfoAtom);
  const selectedBeads = useRecoilValue(selectedBeadsAtom);
  const setExclusiveBeads = useSetRecoilState(exclusiveBeadsAtom);

  useEffect(() => {
    tableInit();
  }, []);

  useEffect(() => {
    if (beadworkInfo) {
      return beadworkText(beadworkInfo);
    }

    return () => {};
  }, [beadworkInfo]);

  useEffect(() => {
    tableGrouping(beadingGroupData);
  }, [beadingGroupData]);

  useEffect(() => {
    tableBeadDrawing(beadingGroupData, beadShape);
    return tableTextDrawing(beadingGroupData);
  }, [beadingGroupData, beadShape]);

  useEffect(() => {
    tableThreadDrawing(beadingGroupData, threadsGroup);
  }, [beadingGroupData, threadsGroup]);

  useEffect(() => {
    tableSorting();
  }, [beadsGroupData, beadShape, beadsMap, threadsGroup]);

  useEffect(() => {
    return tableUngroupIconDrawing(beadsGroupData);
  }, [beadsGroupData]);

  useEffect(() => {
    clickEvent(
      beadShape,
      setCurrentBeadId,
      setWebViewModal,
      setSelectStartPoint,
      beadingGroupData,
      setExclusiveBeads,
      setCurrentThreadId,
      setThreadModifyModal,
      threadsGroup,
    );
  }, [beadingGroupData, beadShape, beadsMap, threadsGroup]);

  useEffect(() => {
    mouseOverEvent(
      setDetailModal,
      setBeadActionModal,
      setMouseoverBeadPosition,
      setMouseoverBeadId,
    );
  }, [beadsGroupData, beadShape, beadsMap, threadsGroup]);

  useEffect(() => {
    zoomPanning();
  }, []);

  useEffect(() => {
    return hightlightCurrentBead(
      currentBeadId,
      selectStartPoint,
      selectedBeads,
    );
  }, [currentBeadId, selectStartPoint, selectedBeads]);

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
