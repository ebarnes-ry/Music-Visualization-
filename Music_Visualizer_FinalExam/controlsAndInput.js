//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput(){
	
	this.menuDisplayed = false;
	//playback button displayed in the top left of the screen
	this.playbackButton = new PlaybackButton();

	//make the window fullscreen or revert to windowed
	this.mousePressed = function(){
		//check if the playback button has been clicked
		//if not make the visualisation fullscreen
		if(!(this.playbackButton.hitCheck())){
			fullscreen(true);
            console.log("not there");
		}
	};

	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	this.keyPressed = function(keycode){
		console.log(keycode);
		if(keycode == 32){
			this.menuDisplayed = !this.menuDisplayed;
		}

		if(keycode > 48 && keycode < 58){
			var visNumber = keycode - 49;
			vis.selectVisual(vis.visuals[visNumber].name); 
            console.log(vis.visuals[visNumber].name);
		}
	};

	//draws the playback button and potentially the menu
	this.draw = function(){
		push();

		//playback button 
		this.playbackButton.draw();
		//only draw the menu if menu displayed is set to true.
		if(this.menuDisplayed){
			fill('lightblue')
			stroke('lightblue');
			strokeWeight(0.5)
			textSize(25);
			text("Select a visualisation: ", 20, 100);
			textSize(18);
			text("(press key to select)", 20, 120);
			this.menu();
		}
		else{
			fill('rgba(12, 40, 84, 0.55)')
			stroke('lightblue');
			strokeWeight(0.5)
			textSize(25);
			text("Press space to display menu", width-400, 40);
		}
		pop();

	};

	this.menu = function(){
		//draw out menu items for each visualisation
		x = 50;
		y = 150;
		var counter = 1;
		for(var i = 0; i < vis.visuals.length;i++){
			text(counter + ":", x-30, y);
			text(vis.visuals[i].name, x, y);
			y += 20;
			counter++;
		}
        //if mouseX/Y hover over position of menu options, color rect around them differently
	};
}