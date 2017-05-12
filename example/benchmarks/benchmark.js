const fmt = time => `${Math.round(time * 100) / 100}ms`;

const measure = fn => {
  const start = performance.now();
  fn();
  const end = performance.now();
  return end - start;
};

const benchmark = ({ name, setup, teardown, task, runs }) => {
  return new Promise((resolve) => {
    const times = [];
    let i = 0;

    setup();
    const first = measure(task);
    teardown();

    const done = () => {
      const avg = times.reduce((sum, time) => sum + time) / runs;

      console.log(`FINISHED BENCHMARK: ${name}`);
      console.log(`  First run: ${fmt(first)}`);
      console.log(`  Average: ${fmt(avg)}`);
      resolve(avg);
    };

    const a = () => {
      setup();
      requestAnimationFrame(b);
    };

    const b = () => {
      times.push(measure(task));
      requestAnimationFrame(c);
    };

    const c = () => {
      teardown();
      requestAnimationFrame(d);
    };

    const d = () => {
      i += 1;
      if (i < runs) {
        requestAnimationFrame(a);
      } else {
        requestAnimationFrame(done);
      }
    };

    console.log(`STARTING BENCHMARK: ${name}`);
    requestAnimationFrame(a);
  });
};

module.exports = benchmark;
