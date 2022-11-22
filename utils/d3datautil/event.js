import * as d3 from 'd3';

const clickEvent = (beadShape, setCurrentBeadId, setRealViewModal) => {
  d3.select('g')
    .selectAll(beadShape)
    .on('click', e => {
      e.stopPropagation();
      setCurrentBeadId(e.target.getAttribute('id').slice(4));
      setRealViewModal(true);
    });
};

const mouseOverEvent = (
  setDetailModal,
  setDetailModalContents,
  setActionModal,
  setMouseoverBeadPosition,
  beadsMap,
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
      setDetailModalContents({
        url: beadsMap[beadId].page.url,
        title: beadsMap[beadId].page.title,
      });
      setDetailModal(true);
      setActionModal(true);
    });

  d3.select('#topGroup')
    .selectAll('*')
    .on('mouseout', e => {
      e.stopPropagation();
      setDetailModal(false);
      setActionModal(false);
    });
};

const hightlightCurrentBead = currentBeadId => {
  if (currentBeadId) {
    d3.select(`#bead${currentBeadId}`).attr('stroke-width', 10);
  }

  return () => {
    d3.select(`#bead${currentBeadId}`).attr('stroke-width', 4);
  };
};

export { clickEvent, mouseOverEvent, hightlightCurrentBead };
