(function () {
    var snowCount = 80;
    var snowColor = "#ffffff";
    var snowSizeMin = 1;
    var snowSizeMax = 4;
    var snowSpeed = 1;
    var snowOpacityMin = 0.5;
    var snowOpacityMax = 1;

    var canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.pointerEvents = 'none';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '99999';
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    var snows = [];
    for (var i = 0; i < snowCount; i++) {
        snows.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: snowSizeMin + Math.random() * (snowSizeMax - snowSizeMin),
            speed: snowSpeed + Math.random() * 2,
            opacity: snowOpacityMin + Math.random() * (snowOpacityMax - snowOpacityMin),
            swing: Math.random() * Math.PI * 2
        });
    }

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < snows.length; i++) {
            var s = snows[i];
            s.y += s.speed;
            s.swing += 0.02;
            s.x += Math.sin(s.swing) * 1;
            if (s.y > canvas.height) {
                s.y = -10;
                s.x = Math.random() * canvas.width;
            }
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,' + s.opacity + ')';
            ctx.fill();
        }
        requestAnimationFrame(loop);
    }
    loop();
})();
