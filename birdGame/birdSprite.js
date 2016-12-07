
var backgroundSprite;
var foregroundSprite;
var birdSprite;
var topCloudSprite;
var treeSprite;


function Sprite(img, x, y, width, height){
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Sprite.prototype.draw = function (renderingContext, x, y) {
    renderingContext.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width, this.height);
}

function initSprites(img){
    birdSprite = [
      new Sprite(img, 15, 0, 92, 82),
      new Sprite(img, 126, 0, 92, 82),
      new Sprite(img, 237, 0, 92, 82)
    ];

    //laserSprite = new Sprite(img, 1, 2 ,3, 4);

    foregroundSprite = new Sprite(img, 0, 675, 888, 100);

    backgroundSprite = new Sprite(img, 930, 0, 380, 430);

    //topCloudSprite = new Sprite(img, 0, 0, 0, 0);

    treeSprite = [
        new Sprite(img, 11, 310, 409, 315),
        new Sprite(img, 443, 198, 196, 429),
        new Sprite(img, 895, 621, 155, 300),
        new Sprite(img, 1108, 700, 146, 221),
        new Sprite(img, 374, 16, 238, 71),
        new Sprite(img, 485, 771, 392, 106)
    ]

}




