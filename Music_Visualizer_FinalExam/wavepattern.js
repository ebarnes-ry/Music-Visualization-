//USING PERLIN NOISE!https://genekogan.com/code/p5js-perlin-noise/ ADAPTED TO WAVEFORM

function WavePattern(){//noise vis of wave pattern

	this.name = "wavepattern";
    this.oneTimeBackgroundWavepattern = true;

    var beatDetect = new DetectBeat();
    var particles = [];

    var time = 0;
    var wave, amp;
    this.draw = function(){
        if (this.oneTimeBackgroundWavepattern)//ensure background once per call
        {
          background(0);
          this.oneTimeBackgroundWavepattern = false;
        }

        stroke("white");
        angleMode(DEGREES);
        noFill();
        push();
            this.noiseWave();
        pop();

        push();
            this.circleNoiseWave();
        pop();

        push();
            this.particleSpace();
        pop();
    }
    this.particleSpace = function(){//function to setup space particles
        colorMode(HSB, 360, 100, 100, 100);
        translate(width/2, height/2)


        var spectrum = fourier.analyze();
        var bass = fourier.getEnergy("bass");
        var midi = fourier.getEnergy("mid");
        var treble = fourier.getEnergy("treble");


        var chosenColor;//colors dependent on energy values
        if (bass > midi && bass > treble)
        {
            chosenColor = color(map(bass, 0, 255, 0, 360), 100, 100, 100);
            //console.log("bass");
        }
        else if (midi > bass || midi > treble){
            chosenColor = color(map(midi, 0, 255, 0, 360), 100, 100, 100);
            //console.log("midi");
        }
        else if (treble > bass || treble > midi){
            chosenColor = color(map(treble, 0, 255, 0, 360), 100, 100, 100);
            //console.log("treble");
        }
        else{
            chosenColor = color("white");
            //console.log("none");
        }

    //new particles
        var particle = new starParticle(300, random(2, 5));
        particles.push(particle);

        var beat = beatDetect.detectBeat(spectrum);

        for(var i = particles.length -1; i >= 0; i--){//update and show particles
            if(!particles[i].isDepleated()){
                particles[i].update(beat);
                particles[i].show(chosenColor);
            }
            else{//remove particles that are off screen
                particles.splice(i, 1);
            }
        }
    }
    this.noiseWave = function(){//function to draw noise wave
        wave = fourier.waveform();
        amp = amplitude.getLevel();
        translate(width/2, height/2);
        strokeWeight(1);
        beginShape();
        for (var i = 0; i < wave.length; i++) {
            var ang = map(i, 0, wave.length, 0, 360);
            //var rad = map(wave[i],-1, 1, 300, 600) * noise(i * 0.01, time * 0.005);
            var rad = map(wave[i], -1, 1, 300, 600) * noise(frameCount);//edit the radius on wave and noise variation
            //var rad = map(wave[i], -1, 1, 300, 600) * noise(map(amp, 0, 1, 0, 80));
            //* 0.001
            var x = rad * cos(ang);
            var y = rad * sin(ang);
            stroke(int(random(0, 255)), int(random(0, 255)), int(random(0, 255)));
            //stroke(255);
            curveVertex(x, y);
        }
        endShape(CLOSE);

        time += 1;
    }
    this.circleNoiseWave = function(){//function to draw circle noise wave
        wave = fourier.waveform();
        translate(width/2, height/2);
        beginShape();
        for (var i = 0; i < wave.length; i++) {
            var ang = map(i, 0, wave.length, 0, 360);
            var rad = map(wave[i],-1, 1, 100, 900) * noise(i * 0.01, time * 0.004);//edit radius on different wave and noise terms so it's more a circle flashing
            //var rad = map(wave[i], -1, 1, 300, 600) * noise(frameCount );
            //* 0.001
            var x = rad * cos(ang);
            var y = rad * sin(ang);
            stroke(int(random(0, 255)), int(random(0, 255)), int(random(0, 255)));
            //stroke(255);
            curveVertex(x, y);
        }
        endShape(CLOSE);

        time += 1;//increment "time" basically frame for draw
    }
}
