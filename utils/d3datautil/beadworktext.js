import * as d3 from 'd3';
import COLOR from '../../constants/colors';

const beadworkText = beadworkInfo => {
  const titleList = [];
  let titleN = 0;
  while (titleN < beadworkInfo.title.length) {
    titleList.push(beadworkInfo.title.slice(titleN, titleN + 18));
    titleN += 18;
  }

  const descriptionList = [];
  let descriptionN = 0;
  while (descriptionN < beadworkInfo.description.length) {
    descriptionList.push(
      beadworkInfo.description.slice(descriptionN, descriptionN + 35),
    );
    descriptionN += 35;
  }

  const titleHeight = 40 * titleList.length;
  const descriptionHeight = 20 * descriptionList.length;
  const totalHeight = titleHeight + descriptionHeight;
  const yStartPoint = 300 - totalHeight / 2;

  d3.select('#beadworkContents')
    .append('rect')
    .attr('x', 150)
    .attr('y', yStartPoint - 50)
    .attr('width', 300)
    .attr('height', totalHeight + 50)
    .attr('rx', 10)
    .attr('fill', COLOR.pink)
    .attr('stroke', 'white')
    .attr('stroke-width', 10);

  const textTitle = d3
    .select('#beadworkContents')
    .append('text')
    .attr('id', 'textTitle');
  const textDescription = d3
    .select('#beadworkContents')
    .append('text')
    .attr('id', 'textDescription');

  textTitle
    .selectAll('tspan')
    .data(titleList)
    .join('tspan')
    .text(d => d)
    .attr('x', 180)
    .attr('y', (d, i) => yStartPoint + 40 * i)
    .style('font-size', '2rem');

  textDescription
    .selectAll('tspan')
    .data(descriptionList)
    .join('tspan')
    .text(d => d)
    .attr('x', 180)
    .attr('y', (d, i) => yStartPoint + titleHeight + 20 * i);

  return () => {
    d3.select('#beadworkContents').selectAll('*').remove();
  };
};

export default beadworkText;
