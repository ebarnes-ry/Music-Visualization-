var sound = null;
var sound2 = null;
var sound3 = null;
var sound4 = null;
var sound5 = null;
var sound6 = null;

var soundFiles = null;

var fourier;
var vis = null;
var controls = null;
var amplitude;




function preload(){
    //load in sound files and add them to sound utility for handling
    sound = loadSound('assets/stomper_reggae_bit.mp3');
    sound2 = loadSound('/assets/Colorful-Flowers.mp3')
    //sound2 = loadSound('/assets/Lady_Gaga_Paparazzi.mp3');
    sound3 = loadSound('/assets/silent-wood.mp3')
    sound4 = loadSound('/assets/Where-The-Waves-Take-Us.mp3');
    sound5 = loadSound('/assets/journey-end.mp3');
    sound6 = loadSound('/assets/Dream-Machine.mp3');


    soundFiles = new SoundUtility();//new sound utility
    soundFiles.add(sound);
    soundFiles.add(sound2);
    soundFiles.add(sound3);
    soundFiles.add(sound4);
    soundFiles.add(sound5);
    soundFiles.add(sound6);
}


//get's called once
function setup() {

    createCanvas(windowWidth, windowHeight);//set canvas


    //instantiate the objects
    fourier = new p5.FFT();
    controls = new ControlsAndInput();
    vis = new Visualisations();
    amplitude = new p5.Amplitude();

    vis.add(new AuraSpectrum());
    vis.add(new WavePattern());
    vis.add(new WavesLiterally());
    
    
    vis.add(new FireworkBeats());
    vis.add(new Spacey());

}

function draw(){
    if(vis.selectedVisual.isSet == false){//to ensure setup for specific visual just once
        if (vis.selectedVisual.name == "spacey"){
            vis.selectedVisual.setupSpacey();
            vis.selectedVisual.isSet = true;
        }
    }

    if (vis.selectedVisual.name == "auraspectrum"){//set draw for specific visual (to control background)
        vis.selectedVisual.draw(); //draw the selected visualisation
    }
    else{//otherwise regular background draw protocol
        background(0);
        vis.selectedVisual.draw(); //draw the selected visualisation
    }
    
    controls.draw(); //draw the controls on top.
}

function windowResized() {//old window resize stuff
    resizeCanvas(windowWidth, windowHeight);
    if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
}   

function mouseClicked(){//general mouse click function
	controls.mousePressed();
    if(vis.selectedVisual.mousePressed){//if the selected visual has a specific mouse pressed function call it
        vis.selectedVisual.mousePressed();
    }
}

function keyPressed(){
	controls.keyPressed(keyCode);
}