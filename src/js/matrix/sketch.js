let streams = [];
let symbolSize = 25;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style("z-index", "-1");
    background(0);
    let x = 0;
    let y = round(random(-500, 0));
    for (let i = 0; i < (windowWidth / symbolSize) + 1; i++) {
        let stream = new Stream();
        stream.generateSymbols(x, y);
        streams.push(stream);
        x += symbolSize;
    }
    textFont('Consolas');
    textSize(symbolSize);
}

function draw() {
    background(0, 128);
    streams.forEach(stream => {
        stream.render();
    });
}


// Symbol class
function Matrix(x, y, spd, initial) {
    this.x = x;
    this.y = y;
    this.spd = spd;
    this.initial = initial;
    this.value;
    this.switchInterval = round(random(2, 20));
}

Matrix.prototype = {
    constructor: Matrix,
    setToRandomSymbol: function () {
        if (frameCount % this.switchInterval == 0) {
            this.value = String.fromCharCode(
                0x30A0 + floor(random(97))
            );
        }
    },
    rain: function () {
        this.y = this.y >= windowHeight ? 0 : this.y += this.spd;
    }
}


// Stream class
function Stream() {
    this.symbols = [];
    this.totalSymbols = round(random(5, 30));
    this.spd = round(random(5, 10));
}

Stream.prototype = {
    constructor: Stream,
    generateSymbols: function (x, y) {
        let initial = round(random(5)) == 1;
        for (let i = 0; i < this.totalSymbols + 1; i++) {
            let symbol = new Matrix(x, y, this.spd, initial);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize;
            initial = false;
        }
    },
    render: function () {
        this.symbols.forEach(symbol => {
            if (symbol.initial) {
                fill(180, 255, 180);
            } else {
                fill(0, 255, 70);
            }
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        })
    }
}