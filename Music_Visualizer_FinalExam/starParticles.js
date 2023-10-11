class starParticle{//creates stars and help control behavior
    //@param radius - radius of the object to center around
    //@param width - width of the particle
    constructor(radius, width){
        //put at min/max of whatever object to center around, otherwise wherever
        this.position = p5.Vector.random2D().mult(radius);
        this.velocity = createVector(0, 0);
        this.acceleration = this.position.copy().mult(random(0.0001, 0.00001));
        this.width = width;
    }

    //displays the particle
    //NOTE: apparently you cant override in Javascript??
    /*
    show(){
        noStroke()
        fill(255)
        ellipse(this.position.x, this.position.y, this.width)
    }*/
    show(colorPassed){
        noStroke()
        fill(colorPassed)
        ellipse(this.position.x, this.position.y, this.width)
    }
    //updates its position
    //@param beat - boolean, true if beat, false if not
    update(beat){
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);

        if(beat){
            this.position.add(this.velocity);
            this.position.add(this.velocity);
            this.position.add(this.velocity);
            this.position.add(this.velocity);
        }
    }
    //when it's off the screen, dissappear
    isDepleated(){
        if(this.position.x < -windowWidth || this.position.x > windowWidth||this.position.y < -windowHeight||this.position.y>windowHeight){
            return true;
        }
        else{
            return false;
        }
    }
}