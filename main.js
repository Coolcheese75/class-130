song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftwrist = 0;
scorerightwrist = 0;

function preload(){
 song=loadSound("music.mp3");
}

function setup() {
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    hbg = ml5.poseNet(video,modelLoaded);
    hbg.on('pose',gotPoses);
}

function gotPoses(results)
{
if (results.length > 0)

{
    console.log(results);
    scoreleftwrist = results[0].pose.keypoints[9].score;
    console.log("scoreleftwrist = : " + scoreleftwrist);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log('leftWristX =' + leftWristX + 'leftWristY =' + leftWristY);

    scorerightwrist = results[0].pose.keypoints[10].score;
    console.log("scorerightwrist = : " + scorerightwrist);
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log('rightWristX =' + rightWristX + 'rightWristY =' + rightWristY);
}

}

function modelLoaded() 
{
    console.log('Posenet is initialized');
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");


    circle(rightWristX,rightWristY,20);


    if(scorerightwrist>0.2)
    {


    if(rightWristY>0 && rightWristY<=100)
    {
    document.getElementById("speed").innerHTML="speed = 0.5x";
    song.rate(0.5);
    }

    else if(rightWristY>100 && rightWristY<=200)
    {
    document.getElementById("speed").innerHTML="speed = 1x";
    song.rate(1);
    }

    else if(rightWristY>200 && rightWristY<=300)
    {
    document.getElementById("speed").innerHTML="speed = 1.5x";
    song.rate(1.5);
    }

    else if(rightWristY>300 && rightWristY<=400)
    {
    document.getElementById("speed").innerHTML="speed = 2x";
    song.rate(2);
    }

    else if(rightWristY>400 && rightWristY<=500)
    {
    document.getElementById("speed").innerHTML="speed = 2.5x";
    song.rate(2.5);
    }
    }
    if(scoreleftwrist>0.2)
    {
    circle(leftWristX,leftWristY,20);
    InNumber = Number(leftWristY);
    remove_decimals = floor(InNumber);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}