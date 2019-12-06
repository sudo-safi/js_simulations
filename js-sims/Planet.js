class Planet {

    constructor(xxPos, yyPos, xxVel, yyVel, mass, img) {
        this.gravitationalConstant = 6.67e-11;

        this.xxPos = xxPos;
        this.yyPos = yyPos;
        this.xxVel = xxVel;
        this.yyVel = yyVel;
        this.mass = mass;
        this.img = img;
    }

    calcDistance(p) {
        return Math.sqrt((this.xxPos - p.xxPos)*(this.xxPos - p.xxPos) 
            + (this.yyPos - p.yyPos)*(this.yyPos - p.yyPos));
    }

    calcForceExertedBy(p) {
        return gravitationalConstant * this.mass * p.mass / (calcDistance(p) * calcDistance(p));
    }

    calcForceExertedByX(p) {
        return calcForceExertedBy(p) * (p.xxPos - this.xxPos) / calcDistance(p);
    }

    calcForceExertedByY(p) {
        return calcForceExertedBy(p) * (p.yyPos - this.yyPos) / calcDistance(p);
    }

    calcNetForceExertedByX(planets) {
        let net = 0;

        for (let i = 0; i < planets.length; i++) {
            if (!planets[i].equals(this)) {
                net += calcForceExertedByX(planets[i]);
            }
        }

        return net;
    }

    calcNetForceExertedByY(planets) {
        net = 0;

        for (let i = 0; i < planets.length; i++) {
            if(!planets[i].equals(this)) {
                net += calcForceExertedByY(planets[i]);
            }
        }

        return net;
    }

    update(dt, fX, fY) {
        xAccel = fX / mass;
        yAccel = fY / mass;

        xxVel += xAccel * dt;
        yyVel += yAccel * dt;

        xxPos += xxVel * dt;
        yyPos += yyVel * dt;
    }
}
