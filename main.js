
Webcam.set({
    width: 300,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'"/>'
});}

console.log('ml5.version', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/czWV2Jmcq/model.json', modelLoaded);

function modelLoaded(){
    console.log("ModelLoaded");
}

function check(){
    image = document.getElementById("capture_image");
    classifier.classify(image, gotResult);
    
}

function gotResult(error, results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results);
        document.getElementById("result").innerHTML = results[0].label;
        gesture = results[0].label;
        toSpeak = ""
        if (gesture == "Best"){
            toSpeak = "This is the best!";
            document.getElementById("result").innerHTML = "&#128076;";
        }
         else if (gesture == "Victory"){
            toSpeak = "Victory!";
            document.getElementById("result").innerHTML = "&#128077;";
        }
        else if (gesture == "Amazing"){
            toSpeak = "Amazing!";
            document.getElementById("result").innerHTML = "&#9996;";
        }
         Speak()
    }
}

function speak(){ 
    var synth = window.speechSynthesis; speak_data = toSpeak; 
    var utterThis = new SpeechSynthesisUtterance(speak_data); 
    synth.speak(utterThis); }

