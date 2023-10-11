function FireworkBeats(){//full firework beats object that displays fireworks whenever beat is detected
    this.name = "fireworkbeats";
    this.isSet = true;
    var beatDetect = new DetectBeat();
    var fireworkSet = new Fireworks();//set the fireworks object

    
    this.draw = function(){
        push();
        
        background(0);
        frameRate(60);
        angleMode(DEGREES);
        
        //console.log("something happened");
        var spectrum = fourier.analyze();
        //console.log(beatDetect.detectBeat(spectrum));
        var prev = false;
        var curr = beatDetect.detectBeat(spectrum);
        
        if(beatDetect.detectBeat(spectrum) && !prev){//this allows for a bit more accuracy in appearence so theres more seperation
            fireworkSet.addFirework();
        }
        prev = curr;
        
        fireworkSet.update();
        pop();
    }
    this.mousePressed = function(){//draw a firework on mousepressed 
        fireworkSet.addFireworkMouse(mouseX, mouseY);
    }
}
