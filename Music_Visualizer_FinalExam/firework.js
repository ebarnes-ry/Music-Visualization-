function Firework(fColor, fX, fY, fType){//function for individual fireworks
    this.specType = fType;
    this.depleated = false;
    var particles = [];
    var speed;

    var amp = amplitude.getLevel();
    speed = map(amp, 0, 1, 10, 20);

    for(var i = 0; i < 360; i+=18){//draw particles in circle
    //make a particle at the x, y, color, angle, speed, and type parameters
        particles.push(new FireworkParticle(fX, fY, fColor, i, speed, fType));//adds new particles and combines into circle
    }

    this.draw = function(){
        for(var i = 0; i < particles.length; i++){//draw particles and mark if depleated
            particles[i].draw();
            if(particles[i].speed <= 0){
                this.depleated = true;
            }
        }
    }
}