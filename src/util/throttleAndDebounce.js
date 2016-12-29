function throttleAndDebounce(fn, throttleMs, debounceMs) {
  let lastCall = null;
  let timeout = null;

  return () => {
    if (timeout !== null) {
      return;
    }

    const now = new Date;
    if (lastCall === null || (now - lastCall > throttleMs)) {
      timeout = setTimeout(() => {
        fn();
        timeout = null;
        lastCall = new Date;
      }, debounceMs);
    }
  };
}

module.exports = throttleAndDebounce;
