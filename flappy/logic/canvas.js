var bird; 
var pipes = [];
var logo;
var jamie;
var lost = false;
var info;
var tier = 0;
var button;
//var pg;

function preload() {
    logo = loadImage("res/ge_logo.png");
    jamie = loadImage("res/jamie_miller.png");
    jamie2 = loadImage("res/jamie_miller.jpg");
    chris = loadImage("res/chris.jpg");
}

function setup() {
    //canvas1 = createCanvas(displayWidth, displayHeight);
    canvas1 = createCanvas(400, 600);
    canvas1.class("main");
    bird = new Bird();
    pipes.push(new Pipe());
    imageMode(CENTER);
}

function draw() {
    background(0);
    smooth();
    if (tier > 49) {
        image(chris, 200, 300, 400, 600);
    } else if (tier > 20) {
        image(jamie2, 200, 300, 400, 600);
    } else {
        image(jamie, 200, 300, 400, 600);
    }
    fill(0,0,0);
    rectMode(CORNER);
    //rect(0, 0, width, height);

    for (var i = pipes.length-1; i>=0; i--) {
        pipes[i].show();
        pipes[i].update();
        
        if (pipes[i].hits(bird)) {
            console.log("hit pipe");
            lost = true;
        }

        if (pipes[i].offscreen()) {
            pipes.splice(i, 1);
            tier += 1;
        }
    }

    bird.update();
    bird.show();
    image(logo, bird.x, bird.y, 40, 40);


    if (bird.y >= height) {
        lost = true;
    }
    if (lost == true) {
        onLose();    
    }

    stroke(0,0,0);
    strokeWeight(4);
    textSize(22);
    text("Tier " + tier, 20, 20);

    

    if (frameCount % 100 == 0 && lost == false) {
        pipes.push(new Pipe());
    }

}

function keyPressed() {
    if (key == ' ') {
        console.log("space");
        bird.up();
    }
}

function touchStarted() {
    console.log("touch");
    bird.up();
}

function resetGame() {
    tier = 0;
    lost = false;
    bird = new Bird();
    imageMode(CENTER);
    canvas1 = createCanvas(400, 600);
    //redraw();
    loop();
    button.hide();
}

function onLose() {
    noLoop();
    pipes = [];

    //info = createGraphics(displayWidth, displayHeight-400);
    info = createGraphics(width, height-400);
    //info.background(0, 0, 255);
    //info.parent("main");
    info.rectMode(CENTER);
    info.class("popup");
    info.smooth();    
    //info.parent("canvas1");
    // Popup window
    info.strokeWeight(4);
    info.fill(50, 90, 255, 225)//, 200);
    info.stroke(255,255,255)//, 200);
    info.rectMode(CORNERS);
    info.rect(5, 5, width-5, height-405, 5, 5, 5, 5);
    //info.rect(5, 5, displayWidth-5, height-405, 5, 5, 5, 5);
    // Text
    info.rectMode(CORNERS);
    console.log(width + ", " + height);
    info.textSize(24);
    info.textAlign(CENTER);
    info.fill(255, 255, 255)//, 200);
    info.stroke(0,0,0);
    info.strokeWeight(0);
    info.text("You've been laid off!", 5, 20, width-5, height/2+100);
    info.textSize(32);
    info.text("Tier " + tier, 5, 70, width-5, height/2+150);
    imageMode(CORNERS);
    info.imageMode(CORNERS);
    // image(info, width/2, height/2, width-10, height-400);
    image(info, 0, 200, width, 400);
    // var headtext = createElement('h2', "You've been laid off!");
    // headtext.position(width/2-95, height/2-90);

    // var tiertext = createElement('h2', "Tier " + tier);
    // tiertext.position(width/2-20, height/2-40);


    button = createButton("Pivot");
    button.position(60, height/2+30);
    button.size(width-100,50);
    button.style("background-color", color(255, 225, 255, 50));
    button.style("color", color(255, 255, 255));
    button.style("font-size", 22);
    button.mousePressed(resetGame);
}