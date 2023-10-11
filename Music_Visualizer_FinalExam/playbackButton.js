//displays and handles clicks on the playback button.
function PlaybackButton(){
	
	this.x = 80;
	this.y = 20;
    this.x2 = 110;
    this.x3 = 20;
	this.width = 20;
	this.height = 20;
	this.shuffleButton;

	//flag to determine whether to play or pause after button click and
	//to determine which icon to draw
	this.playing = false;

	this.draw = function(){//draws actual "buttons"
        fill("lightgray");
		stroke("darkgray");
		strokeWeight(2);


		if(this.playing){
			rect(this.x, this.y, this.width/2 - 2, this.height);
			rect(this.x + (this.width/2 + 2), this.y, this.width/2 - 2, this.height);
		}
		else{	
			triangle(this.x, this.y, this.x + this.width, this.y + this.height/2, this.x, this.y+this.height);

		}

        triangle(this.x2, this.y, this.x2+this.width, this.y+this.height/2, this.x2, this.y+this.height);
        triangle(this.x2+this.width-2, this.y, this.x2+this.width*2, this.y+this.height/2, this.x2+this.width-2, this.y+this.height);
        
        triangle(this.x3, this.y+this.height/2, this.x3+this.width, this.y, this.x3+this.width, this.y+this.height);
        triangle(this.x3+this.width-2, this.y+this.height/2, this.x3+this.width*2, this.y, this.x3+this.width*2, this.y+this.height);

		shuffleButton = createButton('SHUFFLE');
		shuffleButton.position(170, this.y+16);
		shuffleButton.mousePressed(shuffleSound);
        
	};
	//choses random sound
	//called hwne button pressed
	function shuffleSound(){
		var randomSelection = int(random(0, soundFiles.sounds.length));

		if(soundFiles.selectedSound.isPlaying()){
			soundFiles.selectedSound.stop();
			soundFiles.selectSound(randomSelection);
			soundFiles.selectedSound.play();
		}
		else{
			soundFiles.selectSound(randomSelection);
		}
	}

	//checks for clicks on the button, starts or pauses playabck.
	//@returns true if clicked false otherwise.
	this.hitCheck = function(){
		//if the mouse presses the button, if song !isPlaying play the current selected sound, else loop
		//if mouse presses previous button, 

		if(mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height){
			console.log("play is pressed")
			if(soundFiles.selectedSound.isPlaying()){
				soundFiles.selectedSound.pause();
			}
			else{
				soundFiles.selectedSound.play();
			}
			this.playing = !this.playing;
			return true;
		}
		//if mouse presses next button, if song is playing, play next song, else loop
        else if((mouseX >this.x2 && mouseX < this.x2+this.width*2 && mouseY > this.y && mouseY < this.y +this.height)&& soundFiles.selectedSound.isPlaying()){
            console.log("next is pressed");
			if(soundFiles.currentIndex == soundFiles.sounds.length){
				//stop other song playing
				//play this song instead
				soundFiles.selectedSound.stop();
				soundFiles.selectSound(0);
				soundFiles.selectedSound.play();
			}
			else{
				//stop other song playing
				//play this song instead
				soundFiles.selectedSound.stop();
				soundFiles.selectSound(soundFiles.currentIndex + 1);
				soundFiles.selectedSound.play();
			}
			//console.log(soundFiles.selectedSound);
        }
		//if mouse presses previous button,
        else if((mouseX > this.x3 && mouseX < this.x3+this.width*2 && mouseY > this.y && mouseY < this.y + this.height)&& soundFiles.selectedSound.isPlaying()){
            console.log("back is pressed");
			if(soundFiles.currentIndex != 0){
				soundFiles.selectedSound.stop();
				soundFiles.selectSound(int(soundFiles.currentIndex-1));
				soundFiles.selectedSound.play();
			}
			else{
				soundFiles.selectedSound.stop();
				soundFiles.selectSound(soundFiles.currentIndex);
				soundFiles.selectedSound.play();
			}
        }
		return false;
	};

}