const findUrlToGo = e => {
  let currentElement = e.target;

  while (!currentElement.href) {
    currentElement = currentElement.parentElement;
  }

  return currentElement.href;
};

export default findUrlToGo;
