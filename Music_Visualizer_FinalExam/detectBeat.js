/*
NOTE: Algorithm sourced from Lecture 7.202...NOTE: independent implementation
*/

function DetectBeat(){
    var sampleBuffer = [];//stores buffer values
    this.detectBeat = function(spectrum){
        var sum = 0;
        var isBeat = false;
        //sum the spectrum values and calculate average based on median values
        for(var i = 0; i < spectrum.length;i++){
            sum += spectrum[i]*spectrum[i];
        }
        if(sampleBuffer.length==60){
            var sampleSum = 0;
            
            for(var i =0; i<sampleBuffer.length;i++){
                sampleSum += sampleBuffer[i];
            }
            //console.log(sampleSum);
            var sampleAverage = sampleSum/sampleBuffer.length;
            
            var beatMetric = varianceCalc(sampleAverage);
            //a beat occurs when that change is greater than normal
            if(sum>sampleAverage*beatMetric){
                isBeat = true;
            }
            sampleBuffer.splice(0,1);
            sampleBuffer.push(sum);
        }
        else{
            sampleBuffer.push(sum);
        }
        //console.log(isBeat);
        return isBeat;
    }
    //function to calculate how to normalize the "slope" for best fit line of spectrum freq
    function varianceCalc(sampleAverage){
        var varianceSum = 0;
        for(var i = 0; i<sampleBuffer.length; i++){
            varianceSum+=sampleBuffer[i]-sampleAverage;
        }
            
        var variance = varianceSum/sampleBuffer.length;
            
        var m = -0.15 / (25-200);
        var b = 1+(m*200);
        return (m*variance)+b;
    }
}