//inspired by the aura in the sky, visualizes the frequency spectrum within it's waves (fades out)
/*
//TAKEN INSPIRATION FROM TUTORIAL IN https://www.youtube.com/watch?v=p8nCYCfxOhw FOR PERLIN NOISE
//and https://genekogan.com/code/p5js-perlin-noise/

//also applying star particles that speed up and zoom with beat detection
*/
function AuraSpectrum()
{
  this.name = "auraspectrum";//name for identification by vis object
  var spectrum;
  var spectrumMove = 2.5;
  var spectrumX = 0;
  var spectrumY = 0;

  var beatDetect = new DetectBeat();//beat detection object for particles

  var particles = [];//particle array

  this.oneTimeBackgroundAuraSpectrum = true;

  
  this.draw = function()
  {
    //sets background ONCE/visualisation
    if (this.oneTimeBackgroundAuraSpectrum)
    {
      background(0);
      this.oneTimeBackgroundAuraSpectrum = false;
    }

    background(0, 0, 0, 17);
    

    //aura spectrum
    push();
      this.aura();
    pop();

    //particles in the background
    push()
      this.particleSpace();
    pop()
  }
  
  this.aura = function(){//funciton to draw aura spectrum
    colorMode(HSB, 360, 100, 100, 100);

    spectrum = fourier.analyze();
    spectrumX += spectrumMove;

    
    //positioning is a random result of perlin noise across screen dependent on frame
    spectrumY = noise(frameCount * 0.001) * height;

    //change direction if at other end of screen
    if (spectrumX > width || spectrumX < 0)
    {
      spectrumMove *= -1;
    }
    //draw the spectrum
    for (var i = 0; i < spectrum.length; i++)
    {
      var spectrumH = map(spectrum[i], 0, 255, 0, height);
      //map hue by spectrum
      var h = map(spectrum[i], 0, 255, 0, 360);
      strokeWeight(0.5);
      stroke(int(h), 100, 100, 10);//colors according to spectrum
      line(spectrumX, spectrumY, spectrumX, spectrumY - spectrumH);
    }    
  }
  
  this.particleSpace = function(){//particle space drawing function
    colorMode(HSB, 360, 100, 100, 100);

    var spectrum = fourier.analyze();//spectrum analysis calls
    var bass = fourier.getEnergy("bass");
    var midi = fourier.getEnergy("mid");
    var treble = fourier.getEnergy("treble");

    
    //colors get determined by energy values (|| makes it easier to be variable)
    var chosenColor;
    if (bass > midi && bass > treble)
    {
      chosenColor = color(map(bass, 0, 255, 0, 360), 100, 100, 100);

    }
    else if (midi > bass || midi > treble){
      chosenColor = color(map(midi, 0, 255, 0, 360), 100, 100, 100);

    }
    else if (treble > bass || treble > midi){
      chosenColor = color(map(treble, 0, 255, 0, 360), 100, 100, 100);

    }
    else{
      chosenColor = color('white');
      
    }
    
    //new particles
    var particle = new starParticle(5, random(0.1, 2));
    particles.push(particle);

    var beat = beatDetect.detectBeat(spectrum);
    //move backward through the particle array and call particle functions for position changes/edits (remove when offscreen)
    for(var i = particles.length -1; i >= 0; i--){
      if(!particles[i].isDepleated()){
        particles[i].update(beat);
        particles[i].show(chosenColor);
      }
      else{
        particles.splice(i, 1);//remove particles each time
      }
    }
  }
}