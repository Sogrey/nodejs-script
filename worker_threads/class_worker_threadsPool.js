class MyWorker {
    constructor(f, cb) {
        this.f = f;
        this.worker = null;
        this.onemessage = cb;
    }

    start() {
        const blob = new Blob([`${this.f.toString()} ${this.f.name}()`], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        this.worker = new Worker(url);
        this.worker.onmessage = (event) => this.onemessage(event.data)
    }

    end() {
        this.worker.terminate();
    }
}
function demo() {
    var i = 0;
    function f() {
        postMessage(i);
        i++;
        setTimeout(f, 500);
    }
    f();
}
let worker = new MyWorker(demo, function (data) { console.log(data) });
worker.start();
setTimeout(() => worker.end(), 2000)