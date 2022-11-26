import * as d3 from 'd3';
import COLOR from '../../constants/colors';

const clickEvent = (
  beadShape,
  setCurrentBeadId,
  setWebViewModal,
  setSelectStartPoint,
  beadingGroupData,
  setExclusiveBeads,
  setCurrentThreadId,
  setThreadModifyModal,
  threadsGroup,
) => {
  d3.select('#beadGroups')
    .selectAll(beadShape)
    .on('click', e => {
      e.stopPropagation();
      setCurrentBeadId(e.target.getAttribute('id').slice(4));
      setWebViewModal(true);
    });

  d3.select('#beadworkContents').on('click', e => {
    e.stopPropagation();
    setSelectStartPoint(true);
  });

  d3.selectAll('#groupIcon').on('click', e => {
    e.stopPropagation();
    setExclusiveBeads(prev => [
      ...prev,
      ...beadingGroupData[e.target.getAttribute('groupId')].beads.map(bead =>
        bead.id.slice(4),
      ),
    ]);
  });

  d3.select('#topGroup')
    .selectAll('path')
    .on('click', e => {
      e.stopPropagation();

      const pathId = e.target.id;

      let pathGroupThreads;
      threadsGroup.forEach(group => {
        if (group.id === pathId) {
          pathGroupThreads = group.threads;
        }
      });

      if (pathGroupThreads.length > 1) {
        window.alert('Please ungroup before editing thread.');
        return;
      }

      setCurrentThreadId(pathGroupThreads[0]);
      setThreadModifyModal(true);
    });
};

const mouseOverEvent = (
  setDetailModal,
  setActionModal,
  setMouseoverBeadPosition,
  setMouseoverBeadId,
) => {
  d3.select('#topGroup')
    .selectAll('circle')
    .on('mouseover', e => {
      e.stopPropagation();

      const beadId = e.target.id.slice(4);
      const boundingRect = e.target.getBoundingClientRect();

      setMouseoverBeadPosition({
        x: boundingRect.left,
        y: boundingRect.top,
        width: boundingRect.width,
        height: boundingRect.height,
      });

      setMouseoverBeadId(beadId);
      setDetailModal(true);
      setActionModal(true);

      d3.select(e.target).attr('cursor', 'pointer');
    });

  d3.select('#topGroup')
    .selectAll('circle')
    .on('mouseout', e => {
      e.stopPropagation();
      setDetailModal(false);
      setActionModal(false);
    });

  d3.select('#topGroup')
    .selectAll('path')
    .on('mouseover', e => {
      e.stopPropagation();

      const pathId = e.target.id;

      d3.selectAll(`#${pathId}`).attr('stroke', `${COLOR.red}`);
      d3.select(e.target).attr('cursor', 'pointer');
    });

  d3.select('#topGroup')
    .selectAll('path')
    .on('mouseout', e => {
      e.stopPropagation();

      const pathId = e.target.id;

      d3.selectAll(`#${pathId}`).attr('stroke', `${COLOR.gray}`);
    });

  d3.select('#beadworkContents').attr('cursor', 'pointer');
};

const hightlightCurrentBead = (
  currentBeadId,
  selectStartPoint,
  selectedBeads,
) => {
  if (selectStartPoint) {
    d3.select('#beadworkContents').select('rect').attr('stroke', 'orange');
  }

  if (selectedBeads.length > 0) {
    selectedBeads.forEach(beadId => {
      d3.select(`#bead${beadId}`)
        .attr('stroke', 'orange')
        .attr('stroke-width', 10);
    });
  }

  if (currentBeadId) {
    d3.select(`#bead${currentBeadId}`)
      .attr('stroke', 'white')
      .attr('stroke-width', 10);
  }

  return () => {
    if (currentBeadId) {
      d3.select(`#bead${currentBeadId}`).attr('stroke-width', 4);
    }
    if (selectStartPoint) {
      d3.select('#beadworkContents').select('rect').attr('stroke', 'white');
    }
    if (selectedBeads.length > 0) {
      selectedBeads.forEach(beadId => {
        d3.select(`#bead${beadId}`)
          .attr('stroke', 'white')
          .attr('stroke-width', 4);
      });
    }
  };
};

export { clickEvent, mouseOverEvent, hightlightCurrentBead };
