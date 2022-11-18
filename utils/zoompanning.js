import * as d3 from 'd3';

const zoomPanning = () => {
  const group = d3.select('g');

  const handleZoom = e => group.attr('transform', e.transform);

  const zoom = d3.zoom().on('zoom', handleZoom);

  d3.select('svg').call(zoom);
};

export default zoomPanning;
