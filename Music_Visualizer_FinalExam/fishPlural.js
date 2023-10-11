function FishPlural()//set of fish that jump out of waves literally
{
  var fishes = [];//fish array

  //@param mouseX - x position of mouse
  //@param seaLevel - y position of sea level
  this.addFish = function(mouseX, seaLevel)
  {
    fishes.push(new Fish(mouseX, seaLevel));
  }
  //@param waveY - y position of wave
  //update fish position and remove fish if they are below the wave
  this.updateFish = function(waveY)
  {
    for (var i = 0; i < fishes.length; i++)
    {
      fishes[i].draw();

      if (fishes[i].y > waveY){//sometimes fish might get "swept under"
        fishes.splice(i, 1);
      }
    }
  }
}