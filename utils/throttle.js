let waiting = false;

export default function throttle(callback, wait = 1000, ...arg) {
  if (!waiting) {
    callback(...arg);

    waiting = true;
    setTimeout(() => {
      waiting = false;
    }, wait);
  }
}
