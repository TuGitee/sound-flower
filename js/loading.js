const loading = document.getElementById('loading');
const line = loading.querySelector('.line');
const app = document.getElementById('app');

app.hide();

function processLoading() {
    let current = 0;
    draw();

    function updateLoading(pct) {
        const original = pct;
        pct = (original - current) / 16;
        function run() {
            current = Math.min(100, current + pct);
            line.style.setProperty('--percent', `${current}%`);
        }
        for (let i = 0; i < 16; i++) {
            setTimeout(run, 16 * i);
        }
    }

    function draw() {
        if (document.readyState === 'complete' || current >= 100) {
            _endLoading();
            return;
        }
        updateLoading(current + parseFloat((Math.random() * 10).toFixed(2).slice(0, 5)));
        requestAnimationFrame(draw);
    }

    function _endLoading(delay = 1000) {
        updateLoading(100);
        setTimeout(() => {
            app.show(true);
            loading.hide();
            init();
        }, delay);
    }
}

processLoading();