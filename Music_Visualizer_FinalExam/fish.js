function Fish(mouseX, seaLevel)//@param mouseX, seaLevel
{
  this.x = mouseX;
  this.y = seaLevel;
  this.angle = 270;
  this.heading = createVector(1, 1).setHeading(this.angle);//sets vector heading 

  var speed = 15;//speed of fish

  var direction = -1;
  if (random(0, 1) < 0.5)
    direction = 1;

  this.draw = function()
  {
    fill(255);
    circle(this.x, this.y, 20);

    this.update();//updates position of fish
  }

  this.update = function()//updates position of fish
  {
    this.x += this.heading.x * speed / 2;//adds to heading vector dependent on speed
    this.y += this.heading.y * speed / 2;

    this.angle += 0.1 * speed * direction;//also calculates angle
    this.heading.setHeading(this.angle);//reset vector
  }
}