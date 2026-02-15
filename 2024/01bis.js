let body = document.body;
console.log(body.scrollHeight);
console.log(body.offsetHeight);
console.log(body.scrollWidth);
console.log(body.offsetWidth);


var canvas = document.getElementById('dessin');
var ctx = canvas.getContext('2d');

canvas.height = document.body.offsetHeight;
canvas.width = document.body.offsetWidth;

ctx.fillStyle = 'gray';
ctx.fillRect(0, 0, canvas.width, canvas.height);

const drawRectangle = (ctx, x, y, w, h) => {
    ctx.fillStyle = 'red';
    // ctx.clearRect(x-40, 50, 15, 15);
    ctx.fillRect(x, y, w, h);
}

for (let i = 20; i < document.body.scrollWidth; i += 40) {
    setTimeout(drawRectangle(ctx, i, 50, 15, 15), 500);
}