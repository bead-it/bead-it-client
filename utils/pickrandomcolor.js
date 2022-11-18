import COLOR from '../constants/colors';

const beadColors = [
  'pink',
  'red',
  'blue',
  'darkBlue',
  'green',
  'darkGreen',
  'orange',
  'pupple',
  'lightPupple',
  'grayPupple',
];

const pickRandomColor = () => {
  const index = Math.floor(Math.random() * beadColors.length);
  return COLOR[beadColors[index]];
};

export default pickRandomColor;
