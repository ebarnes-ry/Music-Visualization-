function SoundUtility(){
    //array to store visualisations
	this.sounds = [];
	//currently selected vis. set to null until vis loaded in
	this.selectedSound = null;
    this.currentIndex = 0;//initialize index to 0

    //add a new sound to the array
	//@param vis: a sound object
	this.add = function(sound){
		this.sounds.push(sound);
		//if selectedSound is null set the new sound as first initial sound
		if(this.selectedSound == null){
			//this.selectSound();
            this.selectSound(this.currentIndex);
		}
	};
	//@param index: the index of the sound to select
	//select a sound from the array
	this.selectSound = function(index){
        for(var i = 0; i < this.sounds.length; i++){
            if(index == i){
                this.selectedSound = this.sounds[i];
                this.currentIndex = i;
            }
		}
	};
}