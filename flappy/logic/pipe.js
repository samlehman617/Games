function Pipe() {
  this.size = random(75, 200);
  this.center = random(height/6, 5*height/6);
  this.top = this.center - this.size/2;
  this.bottom = this.center + this.size/2;
  console.log("  Size: " + this.size);
  console.log("Center: " + this.center);
  console.log("   Top: " + this.top);
  console.log("Bottom: " + this.bottom);
  //this.top = random(this.size, height/2 + 150);
  //this.bottom = random(this.size, height/2 - 150);
  this.x = width;
  this.w = 35;
  this.speed = 2;

  this.highlight = false;

  if (this.top > this.bottom) {
    console.log("FUCK");
    this.top -=20;
  }

  this.hits = function(bird) {
    if (bird.y < this.top || bird.y > this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        this.highlight = true;
        lost = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  }

  this.show = function() {
    fill(50, 90, 255);
    strokeWeight(2);
    stroke(255, 255, 255);

    if (this.highlight) {
      fill(0, 0, 255);
    }

    rectMode(CORNERS)
    rect(this.x, 0, this.x+this.w, this.top, 0, 0, 5, 5);
    rect(this.x, this.bottom, this.x+this.w, height, 5, 5, 0, 0);

    strokeWeight(10);
  }

  this.update = function() {
    this.x -= this.speed;
  }

  this.offscreen = function() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
}