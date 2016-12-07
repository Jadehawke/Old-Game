//trent.ross.fd
var frames = 0;
var bird;
var canvas;
var rendingeringContext;
var width;
var height;
var states = {Splash: 0, Game: 1, Score: 2};
var currentState;
var foregroundPosition = 0;
var forest;


function Bird() {
    this.frame = 0;
    this.animation = [0, 1, 2, 1];
    this.x = 50;
    this.y = 50;
    this.rotation = 0;
    this.radius = 12;
    this.velocity = 0;

    this.gravity = 0.25;
    this._jump = 4.6;

    this.jump = function(){
      this.velocity = -this._jump;


    };


    this.update = function(){
      var n = currentState === states.Splash ? 10 : 5;
      this.frame += frames % n === 0 ? 1 : 0;
      this.frame %= this.animation.length;

        if(currentState === states.Splash){
            this.updateIdleBird()
        } else{
            this.updatePlayingBird();
        }
    };

    this.updateIdleBird = function(){
      this.y = height -280 + 5 * Math.cos(frames / 10);
        this.rotation = 0;
    };

    this.updatePlayingBird = function(){
      this.velocity += this.gravity;
        this.y += this.velocity;

       if(this.y >= height - foregroundSprite.height - 25){//play with these numbers
           this.y = height - foregroundSprite.height - 25;
           if(currentState === states.Game){
               currentState = states.Score;
           }

           this.velocity = this._jump;
       }

        if(this.velocity >= this._jump) {
            this.frame = 1;
            this.rotation = Math.min(Math.PI / 4, this.rotation + 0.3); //this is weird math
        }
        else{
            this.rotation = -0;
        }


    };

    this.draw = function(){
        rendingeringContext.save();

        rendingeringContext.translate(this.x, this.y);
        rendingeringContext.rotate(this.rotation);

        var n = this.animation[this.frame];

        birdSprite[n].draw(rendingeringContext, 20, -50);
        //backgroundSprite.draw(rendingeringContext, 0, 0);
        //foregroundSprite.draw(rendingeringContext, 0, 330);

        rendingeringContext.restore();
    }

}

function main(){
    windowSetUp();
    canvasSetUp();
    loadGraphics();
    currentState = states.Splash;
    document.body.appendChild(canvas);

    bird = new Bird();
    forest = new TreeCollection();
}

function windowSetUp(){
    width = window.innerWidth;
    height = window.innerHeight;

    var inputEvent = "touchstart";
    if (width >= 500){
        width = 380;
        height = 430;
        inputEvent = "mousedown";
    }
    document.addEventListener(inputEvent, onpress);
}

function onpress(){
    switch(currentState){
        case states.Splash:
            currentState = states.Game;
            bird.jump();
            break;
        case states.Game:
            bird.jump();
            break;


    }
}

function canvasSetUp(){
    canvas = document.createElement("canvas");

    canvas.style.border = "15px solid #382b1d";

    canvas.width = width;
    canvas.height = height;

    rendingeringContext = canvas.getContext("2d");
}
function loadGraphics(){
    //initiate sprite sheet
    var img = new Image();
    img.src = "blueJaySheet.png";
    img.onload = function () {
        initSprites(this);
        gameLoop();

        //birdSprite[2].draw(rendingeringContext, 50, 50);
        //backgroundSprite.draw(rendingeringContext, 0, 0);
    };

}

function gameLoop(){
    update();
    render();

    window.requestAnimationFrame(gameLoop);
}


function update(){
    frames++;

    bird.update();
    if(currentState != states.Score){
        foregroundPosition = (foregroundPosition - 2) % 500;
    }
    if(currentState = states.Game){
        forest.update();
    }

}

function render(){
    backgroundSprite.draw(rendingeringContext, 0, 0);
    bird.draw(rendingeringContext);
    foregroundSprite.draw(rendingeringContext, foregroundPosition, height - (foregroundSprite.height - 40));
    //foregroundSprite.draw(rendingeringContext, foregroundPosition + foregroundSprite.width, height - foregroundSprite.height);
    forest.draw(rendingeringContext);

}

function Tree(){
    this.x = 500;
    this.y = height - (treeSprite.height + foregroundSprite.height + 120 + 200 * Math.random());
    this.width = treeSprite.width;
    this.height = treeSprite.height;

    this.detectCollision = function(){
        //intersection
        var cx = Math.min(Math.max(bird.x, this.x), this.x +this.width);
        var cy1 = Math.min(Math.max(bird.y, this.y), this.y + this.height);
        var cy2 = Math.min(Math.max(bird.y, this.y + this.height + 110), this.y + 2 + this.height + 80);
        //closest difference
        var dx = bird.x - cx;
        var dy1 = bird.y - cy1;
        var dy2 = bird.y - cy2;
        //vector length
        var d1 = dx * dx + dy1 * dy1;
        var d2 = dx * dx +dy2 * dy2;
        var r = bird.raduis * bird.raduis;
        //determine intersections
        if (r > d1 || r > d2){
            currentState = states.Score;
        }

        this.draw = function(){
            randomTree = Math.floor(Math.random()*treeSprite.length);

            treeSprite[3].draw(rendingeringContext, 330, 560);
            console.log(randomTree);
            //topCloudSprite.draw(renderingContext, this.x, this.y, + 110 + this.height);
        }

    }

}

function TreeCollection(){
    this._trees = [];
    this.reset = function(){
        this._trees = [];

    };
    this.add = function(){
        this._trees.push(new Tree());
    };

    this.update = function(){
        if(frames % 100 === 0){
            this.add();
        }
        for (var i = 0, len = this._trees.length; i < len; i++){ //iterate through the array of corals and update each
            var tree = this._trees[i]; //the current coral
            if (i == 0){ // if this is the leftmost coral, it is the only coral that the fish can collide with
                tree.detectCollision(); //so, determine if the fidh has collided with this leftmost coral
            }
            tree.x -= 2; //each frame, move each coral two pixels to the left. Higher/lower values change the movement speed.
            if(tree.x < -tree.width){
                this._trees.splice(i, 1);
                i--;
                len--;
            }
        }
    };
    this.draw = function () {
        for (var i = 0, len = this._trees.length; i < len; i++) {
            var helix = this._trees[i];
            helix.draw();
            console.log(i);
        }
    }
}