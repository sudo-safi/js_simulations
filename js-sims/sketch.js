let planets;
let xForces;
let yForces;
let dt;
let radius;

let earth;
let sun;
let bgImage;

let canvasSize;
let cnv;

let images;
let increment = 0;

function preload() {
    earth = loadImage('images/Earth.png');
    bgImage = loadImage('images/space_1.jpeg');
    sun = loadImage('images/sun.png');

    mars = loadImage('images/mars.png');
    jupiter = loadImage('images/mercury.png');
    mercury = loadImage('images/mercury.png');
}

function f1(t) {
    increment += 1;
    setup();
    console.log(increment);   
}

function setup() {

    if (increment % 3 == 0) {
        planets = [new Planet(0.000e00, 0.000e00, 0.0500e04, 0.000e00,  5.974e24), 
            new Planet(0.000e00, 4.500e10, 3.000e04, 0.000e00,   1.989e30),
            new Planet(0.000e00, -4.500e10, -3.000e04, 0.000e00, 1.989e30)
        ];
    
        images = [earth, sun, sun];
        radius = 1.25e11;
    } else if (increment % 3 == 1) {
        planets = [new Planet(0.000e00,  1.1547e11, -3.6524e4,  0.0000,   3.300e30), 
            new Planet( 1.000e11, -5.7735e10,  1.8262e4,  3.1631e4, 3.300e30),
            new Planet(-1.000e11, -5.7735e10,  1.8262e4, -3.1631e4, 3.300e30),
            new Planet(-2.500e11,  0.0000e00,  0.000e00,  6.000e04, 3.302e20)
        ];

        images = [sun, mars, jupiter, mercury];
        radius = 3.00e11;
    } else if (increment % 3 == 2) {
        planets = [new Planet(-3.500e10, 0.000e09, 0.000e00,  1.400e03, 3.000e28), 
            new Planet(-1.000e10, 0.000e09, 0.000e00,  1.400e04, 3.000e28),
            new Planet(1.000e10, 0.000e09, 0.000e00, -1.400e04, 3.000e28),
            new Planet(3.500e10, 0.000e09, 0.000e00, -1.400e03, 3.000e28)
        ];

        images = [mercury, jupiter, earth, mars];
        radius = 5.000e10;
    }

    bgImage = loadImage('images/space_1.jpeg');

    xForces = [];
    yForces = []; 
    dt = 25000;
    noStroke();

    canvasSize = windowWidth / 1.75;
    cnv = createCanvas(canvasSize, canvasSize);
    cnv.style('display', 'block');
    cnv.parent('sim-holder');
}

function draw() {
    background(bgImage);

    for (let i = 0; i < planets.length; i++) {
        xForces[i] = planets[i].calcNetForceExertedByX(planets);
        yForces[i] = planets[i].calcNetForceExertedByY(planets);
        planets[i].update(dt, xForces[i], yForces[i]);

        console.log(typeof planets[i].img);
        image(images[i], placeInCanvasRange(planets[i].xxPos), placeInCanvasRange(planets[i].yyPos), canvasSize / 20, canvasSize / 20);
        // ellipse(placeInCanvasRange(planets[i].xxPos), placeInCanvasRange(planets[i].yyPos), 50, 50);
    }
}

function placeInCanvasRange(val) {
    return ((val / (2*radius))) * canvasSize + (canvasSize / 2);
}


class Planet {

    constructor(xxPos, yyPos, xxVel, yyVel, mass, imgFileName) {
        this.gravitationalConstant = 6.67e-11;

        this.xxPos = xxPos;
        this.yyPos = yyPos;
        this.xxVel = xxVel;
        this.yyVel = yyVel;
        this.mass = mass;
        this.imgFileName = imgFileName;
    }

    calcDistance(p) {
        return Math.sqrt((this.xxPos - p.xxPos)*(this.xxPos - p.xxPos) 
            + (this.yyPos - p.yyPos)*(this.yyPos - p.yyPos));
    }

    calcForceExertedBy(p) {
        return this.gravitationalConstant * this.mass * p.mass / (this.calcDistance(p) * this.calcDistance(p));
    }

    calcForceExertedByY(p) {
        return this.calcForceExertedBy(p) * (p.yyPos - this.yyPos) / this.calcDistance(p);
    }

    calcNetForceExertedByX(planets) {
        let net = 0;

        for (let i = 0; i < planets.length; i++) {
            if (!(planets[i] == this)) {
                let p = planets[i];
                net += this.calcForceExertedByX(p);
            }
        }

        return net;
    }

    calcForceExertedByX(p) {
        return this.calcForceExertedBy(p) * (p.xxPos - this.xxPos) / this.calcDistance(p);
    }

    calcNetForceExertedByY(planets) {
        let net = 0;

        for (let i = 0; i < planets.length; i++) {
            if(!(planets[i] == this)) {
                net += this.calcForceExertedByY(planets[i]);
            }
        }

        return net;
    }

    update(dt, fX, fY) {
        let xAccel = fX / this.mass;
        let yAccel = fY / this.mass;

        this.xxVel += xAccel * dt;
        this.yyVel += yAccel * dt;

        this.xxPos += this.xxVel * dt;
        this.yyPos += this.yyVel * dt;
    }
}