new p5(
  p => {
    class Hands extends Array {
      newHand() {
        this.push(new Hand());
      }

      update() {
        const density = hands.length / (p.width / 100 * p.height / 100);

        //random birth
        if (Math.random() > 0.7 && density < 0.2) {
          this.newHand();
        }

        for (const hand of this) {
          hand.update();
          if (hand.isAlive) {
            hand.draw();
          }
        }

        const ret = this.filter(hand => hand.isAlive);
        return ret;
      }
    }

    class Hand {
      constructor(
        //random()*(max-min)+min
        posX = Math.random() * p.width,
        posY = Math.random() * p.height,
        isRightHand = Math.random() > 0.5,
        size = Math.random() * p.width / 6 + p.width / 12,
        angle = Math.random() * Math.PI * 2,
        ttl = Math.random() * 80 + 20
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

      hands = hands.update();
    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight)
    }

  }
);
