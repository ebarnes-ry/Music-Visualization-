function Fireworks(){//manages set of fireworks
    var fireworks = [];//firework array holding each firework object

    this.addFirework = function(){//adds a new firework to array and sets characteristics
        colorMode(HSB, 360, 100, 100, 100);

        var spectrum = fourier.analyze();
        var bass = fourier.getEnergy("bass");
        var mid = fourier.getEnergy("mid");
        var treble = fourier.getEnergy("treble");

        var choice;//sets color based on frequency values
        var fColor;
        if(bass > mid && bass > treble){
            choice = 0;
            fColor = color(map(bass, 0, 255, 0, 360), 100, 100, 100);
        }
        else if(mid >= bass || mid >= treble){//there's room for overlap
            choice = 1;
            fColor = color(map(mid, 0, 255, 0, 360), 100, 100, 100);
        }
        else if(treble >= bass || treble >= mid){
            choice = 2;
            fColor = color(map(treble, 0, 255, 0, 360), 100, 100, 100);
        }
        else{
            choice = 3;
            fColor = color(random(0, 360), 100, 100, 100);
        }

        var fType, fX, fY;
        fY = random(height*0.2, height*0.8);//position within range of screen
        fX = random(width*0.2, width*0.8);

        if(choice == 0){
            fType = "smallDots";
        }
        else if(choice == 1){
            fType = "smallRotatingDots";
        }
        else if(choice == 2){
            if(int(random(0, 1) == 0)){
                fType = "star";
            }
            else{
                fType = "rotatingStar";
            }
        }
        else{
            fType = "rotatingStar";
        }
        //TODO: Add another argument for maximum size before particles get depleated, larger for higher amplitude value
        fireworks.push(new Firework(fColor, fX, fY, fType));
    }
    this.update = function(){//updates based on depletion of particles
        for(var i = 0; i < fireworks.length; i++){
            fireworks[i].draw();
            if(fireworks[i].depleated){
                fireworks.splice(i, 1);
            }
        }
    }
    //@param x, y
    this.addFireworkMouse = function(x, y){//adds a new firework to array and sets characteristics with mouse position
        colorMode(HSB, 360, 100, 100, 100);

        var fColor = color(random(0, 360), 100, 100, 100);
        var fType, fX, fY;
        fX = x;
        fY = y;
        var rand = int(random(0, 2));

        if(rand == 0){
            fType = "rotatingStar";
        }
        else{
            fType = "star";
        }
        fireworks.push(new Firework(fColor, fX, fY, fType));
    }
}