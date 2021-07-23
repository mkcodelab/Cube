const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');

let cubeX = canvas.width/2;
let cubeY = canvas.height/2;
let cubeZ = 0;

function setSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;  
    cubeX = canvas.width/2;
    cubeY = canvas.height/2; 
}
setSize();
addEventListener('resize', setSize);

const cubeCol = 'hsla(100, 100%, 50%, 0.2)';
const dotCol = 'hsla(120, 100%, 50%, 0.3)';

const speedX = 0.02;
const speedY = 0.10;
const speedZ = 0.05;

let size = canvas.height / 4;

const point3D = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

let vertices = [
    new point3D(cubeX - size, cubeY - size, cubeZ - size),
    new point3D(cubeX + size, cubeY - size, cubeZ - size),
    new point3D(cubeX + size, cubeY + size, cubeZ - size),
    new point3D(cubeX - size, cubeY + size, cubeZ - size),

    new point3D(cubeX - size, cubeY - size, cubeZ + size),
    new point3D(cubeX + size, cubeY - size, cubeZ + size),
    new point3D(cubeX + size, cubeY + size, cubeZ + size),
    new point3D(cubeX - size, cubeY + size, cubeZ + size)
];

let edges = [
    [0, 1], [1, 2], [2, 3], [3, 0], //back
    [4, 5], [5, 6], [6, 7], [7, 4], //front
    [0, 4], [1, 5], [2, 6], [3, 7], //sides
]

ctx.lineCap = 'round';

let timeDelta, timeLast = 0;
requestAnimationFrame(loop);
function loop(timeNow) {
    timeDelta = timeNow - timeLast;
    timeLast = timeNow;
    ctx.fillStyle = 'rgba(0,0,0,.2)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle = cubeCol;
    ctx.lineWidth = canvas.width / 100;

    //Z axis
    let angle = timeDelta * 0.001 * speedZ * Math.PI * 2;
    for (let v of vertices) {
        let dx = v.x - cubeX;
        let dy = v.y - cubeY;
        // let dz = v.z - cubeZ;
        let x = dx * Math.cos(angle) - dy * Math.sin(angle);
        let y = dx * Math.sin(angle) + dy * Math.cos(angle);
        v.x = x + cubeX;
        v.y = y + cubeY;
    }
    // X axis
    angle = timeDelta * 0.001 * speedX * Math.PI * 2;
    for (let v of vertices) {
        let dy = v.y - cubeY;
        let dz = v.z - cubeZ;
        let y = dy * Math.cos(angle) - dz * Math.sin(angle);
        let z = dy * Math.sin(angle) + dz * Math.cos(angle);
        v.y = y + cubeY;
        v.z = z + cubeZ;
    }
    //Y axis
    angle = timeDelta * 0.001 * speedY * Math.PI * 2;
    for (let v of vertices) {
        let dx = v.x - cubeX;
        let dz = v.z - cubeZ;
        let x = dz * Math.sin(angle) + dx * Math.cos(angle);
        let z = dz * Math.cos(angle) - dx * Math.sin(angle);
        v.x = x + cubeX;
        v.z = z + cubeZ;
    }

    for (let edge of edges) {
        //lines
        ctx.beginPath();
        ctx.moveTo(vertices[edge[0]].x, vertices[edge[0]].y);
        ctx.lineTo(vertices[edge[1]].x, vertices[edge[1]].y);
        ctx.stroke();
        ctx.closePath();
       
    }
    for (let v of vertices) {
        ctx.beginPath();
        ctx.arc(v.x, v.y, 50, 0, Math.PI*2);
        ctx.fillStyle = dotCol;
        ctx.fill();
        ctx.closePath;
    }

    requestAnimationFrame(loop);
}