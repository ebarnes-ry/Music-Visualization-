function Spacey(){
    this.name = 'spacey';
    this.isSet = false;
    var delta;
    var beatDetect = new DetectBeat();
    var points = [];
    var density = 100;//# points in each row
    this.oneTimeBackgroundSpacey = true;

    this.setupSpacey = function(){
        console.log("setup spacey inner");
        //creates all starting points
        var space = width / density;//distance between each point
        for(var x = 0; x < width; x+=space){
            for(var y = 0; y < height; y += space){
          //vector for each x and y
                var p = createVector(x + random(-10, 10), y + random(-10, 10));
                console.log("vector created")
                points.push(p)
            }
        }
    }
    //STARTING POINT VECTGOR
    //@param x - x coordinate
    //@param y - y coordinate
    function addVector(x, y){
        var p = createVector(x , y);
        points.push(p);
    }
    function onScreen(v) {
        return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
    }
    this.draw = function(){
        var delta  = 0.005;

        var spectrum = fourier.analyze();

        var bass = fourier.getEnergy("bass");
        var mid = fourier.getEnergy("mid");
        var treble = fourier.getEnergy("treble");

        var prev = false;
        var curr = beatDetect.detectBeat(spectrum);
        
        if(beatDetect.detectBeat(spectrum) && !prev){//this allows for a bit more accuracy in appearence so theres more seperation
            delta += 0.003;
        }
        prev = curr;
        
        push();
        //dont reset the background each time!!
        if (this.oneTimeBackgroundSpacey){
          background(0);
          this.oneTimeBackgroundSpacey = false;
        }



        //background(0);
        noStroke();
        fill(255);
        noiseDetail(1);
        angleMode(DEGREES);

        var testBlank = false;
        for(var i = 0; i< points.length; i++){
            if(!onScreen(points[i])){
                testBlank = true;
            }
        }
        //another loop to iterate points
        for(var i=0; i<points.length;i++){
            //angles each point will move (using noise)
            var angle = map(noise(points[i].x * delta, points[i].y*delta), 0, 1, 0, 720);
            

            var r = map(points[i].x, 0, width, 50, 255);
            var g = map(points[i].y, 0, height, 50, 255);
            var b = map(points[i].x, 0, width, 255, 50);

            beginShape();
            stroke(r, g, b);
            //adds vector to each point 
            points[i].add(createVector(cos(angle), sin(angle)));

            //circle for each vertex
            //ellipse(points[i].x, points[i].y, 1);
            vertex(points[i].x, points[i].y);


            if(!onScreen(points[i])) {
                addVector(random(width), random(height));
                addVector(random(width), random(height));
                addVector(random(width), random(height));
                //console.log('removed 1 added 2')
                points.splice(i, 1);
            }
            endShape(CLOSE)
        } 
        pop();
        console.log(frameCount);
        if(frameCount%800 == 0){//controls how many points are on screen at once depending onf rame
            points = [];
            this.oneTimeBackgroundSpacey = true;//resets background
            this.isSet = false;//resets setup
        }
    }
}
