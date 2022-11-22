import * as d3 from 'd3';

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

  d3.select('g')
    .append('rect')
    .attr('x', 150)
    .attr('y', yStartPoint - 50)
    .attr('width', 300)
    .attr('height', totalHeight + 50)
    .attr('rx', 10)
    .attr('fill', 'none')
    .attr('stroke', 'orange')
    .attr('stroke-width', 5);

  const textTitle = d3.select('g').append('text');
  const textDescription = d3.select('g').append('text');

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
};

export default beadworkText;
