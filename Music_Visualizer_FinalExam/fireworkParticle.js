class FireworkParticle{//lowest level of firework, individual particles 
    //@param x, y, color, angle, speed, type
    //constructor for firework particle
    constructor(x, y, color, angle, speed, type){
        this.x = x;
        this.y = y;
        this.color = color;
        this.angle = angle;
        this.speed = speed;
        this.type = type;
        this.x1 = x;//length for extended line
        this.y1 = y;//length for extended line

        this.dotSize = 5;
    }
    draw = function(){//draw function for each type
        push()
        if(this.type == 'smallDots'){
            //console.log("smallDots");
            this.smallDots();
        }
        else if(this.type == 'smallRotatingDots'){
            this.smallRotatingDots();
        }
        else if(this.type == 'star'){
            this.star();
        }
        else{
            this.rotatingStar();
        }
        pop()
    }
    smallDots = function(){
        this.updateDots();
        fill(this.color);
        noStroke();
        ellipse(this.x, this.y, this.dotSize);
    }
    updateDots = function(){
        this.speed -= 0.15;

        this.x += cos(this.angle) * this.speed;
        this.y += sin(this.angle) * this.speed;

        this.dotSize -= 0.1;
    }
    smallRotatingDots = function(){
        this.updateRotatingDots();
        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, this.dotSize);
    }
    updateRotatingDots = function(){
        this.speed -= 0.15;
        this.angle += 5;
        this.x += cos(this.angle) * this.speed;
        this.y += sin(this.angle) * this.speed;

        this.dotSize -= 0.1;
    }
    star = function(){
        this.updateStar();
        stroke(this.color);
        line(this.x, this.y, this.x1, this.y1);
    }
    updateStar = function(){
        this.speed -= 0.25;

        this.x += cos(this.angle) * this.speed;
        this.y += sin(this.angle) * this.speed;
    }
    rotatingStar = function(){
        this.updateRotatingStar();
        stroke(this.color);
        line(this.x, this.y, this.x1, this.y1);
    }
    updateRotatingStar = function(){
        this.speed -= 0.25;
        this.angle += 5;
        this.x += cos(this.angle) * this.speed;
        this.y += sin(this.angle) * this.speed;
    }
}