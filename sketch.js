new p5(
  p => {
    class Hands {
      constructor() {
        this.hands = new Array();
        this.lockTime = 0;
      }

      newHand(posX, posY, size, ttl) {
        this.hands.push(new Hand(posX, posY, size, ttl));
      }

      update() {
        const density = this.hands.length / (p.width / 100 * p.height / 100);

        //random birth
        if (Math.random() > 0.7 && density < 0.2 && this.lockTime < 1) {
          this.newHand();
          if (Math.random() > 0.99) {
            this.hands.splice(0);
            this.newHand(p.width / 2, p.height / 2, p.height * 1.4, 80);
            window.navigator.vibrate(200);
            this.lockTime = 80;
          }
        }

        for (const hand of this.hands) {
          hand.update();
          if (hand.isAlive) {
            hand.draw();
          }
        }

        this.hands = this.hands.filter(hand => hand.isAlive);
        if (this.lockTime > 0) {
          this.lockTime--;
        }
      }
    }

    class Hand {
      constructor(
        //random()*(max-min)+min
        posX = Math.random() * p.width,
        posY = Math.random() * p.height,
        size = Math.random() * p.width / 6 + p.width / 12,
        ttl = Math.random() * 80 + 20,
        angle = Math.random() * Math.PI * 2,
        isRightHand = Math.random() > 0.5
      ) {
        this.posX = posX;
        this.posY = posY;
        this.isRightHand = isRightHand;
        this.size = size;
        this.angle = angle;
        this.ttl = ttl;

        this.isAlive = true;
      }

      update() {
        this.ttl -= 1;
        if (this.ttl < 0) {
          this.isAlive = false;
        }

      }

      draw() {
        p.push();
        p.translate(this.posX, this.posY);
        p.rotate(this.angle);
        p.imageMode(p.CENTER);
        const img = this.isRightHand ? imgR : imgL;
        p.image(img, 0, 0, this.size, this.size);
        p.pop();
      }
    }

    const imgL = p.loadImage('assets/hand_L.png'),
      imgR = p.loadImage('assets/hand_R.png');
    const bgColor = "red";

    let hands = new Hands;

    p.setup = () => {
      p.pixelDensity(1);
      canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      canvas.parent("shinrei");
      p.background(bgColor);
      hands.newHand();
      handSize = p.min(p.width, p.height);
      imgL.resize(handSize, handSize);
      imgR.resize(handSize, handSize);

    }

    p.draw = () => {
      p.background(bgColor);
      p.stroke(0);
      p.strokeWeight(3);
      p.line(0, p.height / 2, p.width, p.height / 2);
      p.line(p.width / 2, 0, p.width / 2, p.height);

      hands.update();
    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight)
    }

  }
);
