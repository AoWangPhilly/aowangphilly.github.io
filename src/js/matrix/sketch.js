let symbol;
let symbolSize = 30;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    symbol = new Matrix(
        windowWidth / 2,
        0,
        random(5, 10));
    symbol.setToRandomSymbol();
    textSize(symbolSize);
}

function draw() {
    background(0);
    symbol.render();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);
}

// Symbol class
function Matrix(x, y, spd) {
    this.x = x;
    this.y = y;
    this.spd = spd;
    this.value;
}

Matrix.prototype = {
    constructor: Matrix,
    setToRandomSymbol: function () {
        this.value = String.fromCharCode(
            0x30A0 + floor(random(97))
        );
    },
    rain: function () {
        this.y += this.spd;
    },
    render: function () {
        fill(0, 255, 70);
        text(this.value, this.x, this.y);
        this.rain();
    }
}


// Stream class
function Stream() {

}