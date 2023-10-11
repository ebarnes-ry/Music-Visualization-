
//waves will rise and fall according to amplitude reading
//if mousePressed, take the x and y position and send to fish()
function WavesLiterally(){
    this.name = "wavesLiterally";

    var fishPress = new FishPlural();
    var moonT = new MoonTest();
    var waveY;

    this.draw = function(){//overlay all components
        
        push();
        angleMode(DEGREES);
        background(0);
        this.wavesBackground();
        this.waves();
        pop();
        push();
        moonT.draw();
        pop();
        push();
        fishPress.updateFish(waveY);
        pop();
    }

    this.waves = function(){
        colorMode(HSB, 360, 100, 100, 100);
        var wave = fourier.waveform();
        var amp = amplitude.getLevel();
        
          //for each element bin of wave 
        for (var i = 0; i < wave.length; i += 5) {
        // Map waveform of each frequency bin across width of canvas
            var waveX = map(i, 0, wave.length, -25, width + 25);
        // Map waveform freqeuncy to y position of rectangle
            //var waveY = map(wave[i], -1, 1, height / 2 + 250, height / 2 + 50);
            waveY = map(wave[i], -1, 1, height/4 + 550, height/2 + 50)

            if(amp > 0.2){//enhance the wave based on amplitude
                waveY+=map(amp, 0, 1, 0, 100);
            }
    
            // Map hue based on bass
            var bass = fourier.getEnergy("bass");
            var shade = map(bass, 0, 255, 200, 240);
            noStroke();
            fill(int(shade), 100, 100, 15);
            // Create rounded rectangle with fifth argument
            rect(waveX, waveY, 100, height, 50);
        }
    }
    var yintl = 0.0;
    this.wavesBackground = function(){
        noStroke();
        colorMode(HSB, 360, 100, 100, 100);

        //var spectrum = fourier.analyze();
        //var beatDetect = new DetectBeat(spectrum);

        fill(220, 100, 100, 20);
        beginShape();
        var xintl = 0;

        for(var x = 0; x <= width; x += 10){//create the span for vectors
            var y = map(noise(xintl, yintl), 0, 1, 200, 400);//map the y values to change "radomly"
            vertex(x, y);

            xintl += 0.04;//move the position x axis
        }
        yintl += 0.005;//move along the y        
        vertex(width, height);//close
        vertex(0, height);//height vertex

        endShape(CLOSE);

    }
    this.mousePressed = function(){//local mousePrssed for fish
        //console.log('pressed');
        fishPress.addFish(mouseX, waveY);
    }
}