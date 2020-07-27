let streams = [];
let symbolSize = 20;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    let x = 0;
    let y = 0;
    for (let i = 0; i < (windowWidth / symbolSize) + 1; i++) {
        let stream = new Stream();
        stream.generateSymbols(x, y);
        streams.push(stream);
        x += symbolSize;
    }
    textSize(symbolSize);
}

function draw() {
    background(0);
    streams.forEach(stream => {
        stream.render();
    });
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
        for (let i = 0; i < this.totalSymbols + 1; i++) {
            let symbol = new Matrix(x, y, this.spd);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize;
        }
    },
    render: function () {
        this.symbols.forEach(symbol => {
            fill(0, 255, 70);
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        })
    }
}