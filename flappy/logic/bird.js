function Bird() {
    this.y = height/2;
    this.x = 64;

    this.gravity = 0.6;
    this.velocity = 0;
    this.lift = -12;
    this.fall_time = 1;

    this.show = function() {
        fill(255);
        stroke(255,255,255);
        ellipse(this.x, this.y, 40, 40);
    }

    this.up = function() {
        this.velocity += this.lift;
        this.fall_time = 1;
    }

    this.update = function() {
        this.velocity += this.gravity;
        this.velocity *= 0.9;
        this.y += this.velocity * this.fall_time;
        this.fall_time += 0.07;
        if (this.y > height) {
            this.y = height;
            this.velocity = 0;
        }
        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
            
        }
    }
}

