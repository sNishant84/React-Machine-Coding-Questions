window.timerId = 0;
window.timers = {};

window.myTimeout = function(callback, delay, args = []) {
    const id = window.timerId++;
    const time = Date.now() + delay;

    window.timers[id] = { callback, time, args };

    // if first timer, start processing
    if (Object.keys(window.timers).length === 1) {
        requestIdleCallback(processTimers);
    }

    return id; // optional: return id like setTimeout
}

function processTimers() {
    const now = Date.now();
    let hasPending = false;

    Object.keys(window.timers).forEach(id => {
        const timer = window.timers[id];
        if (now >= timer.time) {
            timer.callback(...timer.args);
            delete window.timers[id];
        } else {
            hasPending = true;
        }
    });

    if (hasPending) {
        requestIdleCallback(processTimers);
    }
}
