function MoonTest(){
    /*1. analyze waveform
    2. draw a circular representation of the waveform at a given time
    3. add this historical to an array
    4. draw each element of the array
    5. update each element of the array
    6. remove elements of array when size is too large
    */
    var rays = []; // array of rays
    var startX = 0;//intl position
    var startY = 0;
    var startRad = 50;//intl size
    var varience = 40;


    function addRay(){//adds new ray to the array of rays
        rays.push({x: startX, y: startY, r: startRad});
    }
    this.draw = function(){
        //noFill();
        fill('rgba(211,211,211, 0.14)');
        stroke('rgba(211,211,211, 0.15)');
        strokeWeight(1.2);
        translate(width/2, height/6);


        //console.log(frameRate()%60==0);
        if(frameCount%120==0){
            addRay();
        }
        
        for(var i = 0; i < rays.length; i++){//for each ray
            var ray = rays[i];

            let wave = fourier.waveform(1024, undefined);
            beginShape();
            for (let i = 0; i < wave.length; i++) {
                if(i == 1){
                    stroke("darkgray");
                }
                let ang = map(i, 0, wave.length, 0, 360);
                //radius is controlled by energy
                let r = map(wave[i], -1, 1, ray.r - varience, ray.r + varience);

                let x = sin(ang) * r;
                let y = cos(ang) * r;
                vertex(x, y);
            }
            endShape();
            ray.r += 0.14;//increases the radius of the circle verticies
                
            if(ray.r > 200){
                rays.splice(i, 1);
            }
        }
        
    }
}