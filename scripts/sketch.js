var canvas = function (p) {
  let containerW, containerH;
  let img1, img2, img3, img4;
  let cursorX, cursorY;
  let cx, cy;
  let alpha1 = 255,
    alpha2 = 255,
    alpha3 = 255,
    alpha4 = 255;
  let alphaT1 = 0,
    alphaT2 = 0,
    alphaT3 = 0,
    alphaT4 = 0;
  let robotoMonoLight;
  let easing = 0.07;
  let permissionGranted = false;

  p.preload = function () {
    img1 = p.loadImage("data/1.png");
    img2 = p.loadImage("data/2.png");
    img3 = p.loadImage("data/3.png");
    img4 = p.loadImage("data/4.png");
    robotoMonoLight = p.loadFont("data/RobotoMono-Light.ttf");

    if (p.windowWidth > p.windowHeight) {
      containerH = p.windowHeight;
      containerW = p.windowHeight;
    } else {
      containerH = p.windowWidth;
      containerW = p.windowWidth;
    }
  };

  p.setup = function () {
    p.createCanvas(containerW, containerH);
    cx = p.width / 2;
    cy = p.height / 2;

    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      DeviceOrientationEvent.requestPermission()
        .catch(() => {
          let button = createButton("click to allow access to sensors");
          button.style("font-size", "24px");
          button.center();
          button.mousePressed(requestAccess);
          throw error;
        })
        .then(() => {
          permissionGranted = true;
        });
    } else {
      p.textSize(48);
      permissionGranted = true;
    }
  };

  p.requestAccess = function () {
    DeviceOrientationEvent.requestPermission()
      .then((response) => {
        if (response == "granted") {
          permissionGranted = true;
        } else {
          permissionGranted = false;
        }
      })
      .catch(console.error);
    this.remove();
  };

  p.draw = function () {
    p.background("#191D23");

    const dx = p.constrain(p.rotationY, -3, 3);
    const dy = p.constrain(p.rotationX, -3, 3);

    cx += dx * 2;
    cy += dy * 2;
    cx = p.constrain(cx, 25, p.width - 25);
    cy = p.constrain(cy, 25, p.height - 25);

    p.strokeWeight(1);
    p.stroke(100);
    p.textSize(24);
    p.textFont(robotoMonoLight);
    p.fill(25, 29, 35, alpha1);
    p.image(img1, 0, 0, containerW / 2, containerH / 2);
    p.noStroke();
    p.rect(0, 0, containerW / 2, containerH / 2);
    p.fill(255);
    p.text("Editorial", 20, 15, p.LEFT, p.TOP);

    p.fill(25, 29, 35, alpha2);
    p.image(img2, containerW / 2, 0, containerW / 2, containerH / 2);
    p.rect(containerW / 2, 0, containerW / 2, containerH / 2);
    p.fill(255);
    p.noStroke();
    p.text("Web Design", containerW / 2 + 20, 15, p.LEFT, p.TOP);

    p.fill(25, 29, 35, alpha3);
    p.image(img3, 0, containerH / 2, containerW / 2, containerH / 2);
    p.rect(0, containerH / 2, containerW / 2, containerH / 2);
    p.fill(255);
    p.noStroke();
    p.text("Fotografia", 20, containerH / 2 + 15, p.LEFT, p.TOP);

    p.fill(25, 29, 35, alpha4);
    p.image(
      img4,
      containerW / 2,
      containerH / 2,
      containerW / 2,
      containerH / 2
    );
    p.rect(containerW / 2, containerH / 2, containerW / 2, containerH / 2);
    p.fill(255);
    p.noStroke();

    p.text("Vídeo", containerW / 2 + 20, containerH / 2 + 15, p.LEFT, p.TOP);
    alpha1 = alpha1 + (alphaT1 - alpha1) * easing;
    alpha2 = alpha2 + (alphaT2 - alpha2) * easing;
    alpha3 = alpha3 + (alphaT3 - alpha3) * easing;
    alpha4 = alpha4 + (alphaT4 - alpha4) * easing;

    if (typeof window.orientation == "undefined") {
      cursorx = p.mouseX;
      cursory = p.mouseY;
    } else {
      cursorx = cx;
      cursory = cy;
      p.fill(255);
      p.noStroke();
      p.ellipse(cursorx, cursory, 50, 50);
    }

    if (
      cursorx > 0 &&
      cursorx < containerW / 2 &&
      cursory > 0 &&
      cursory < containerH / 2
    ) {
      alphaT1 = 0;
    } else {
      alphaT1 = 255;
    }

    if (
      cursorx > containerW / 2 &&
      cursorx < containerW &&
      cursory > 0 &&
      cursory < containerH / 2
    ) {
      alphaT2 = 0;
    } else {
      alphaT2 = 255;
    }
    if (
      cursorx > 0 &&
      cursorx < containerW / 2 &&
      cursory > containerW / 2 &&
      cursory < containerH
    ) {
      alphaT3 = 0;
    } else {
      alphaT3 = 255;
    }

    if (
      cursorx > containerW / 2 &&
      cursorx < containerW &&
      cursory > containerW / 2 &&
      cursory < containerH
    ) {
      alphaT4 = 0;
    } else {
      alphaT4 = 255;
    }
  };

  p.windowResized = function () {
    if (p.windowWidth > p.windowHeight) {
      containerH = p.windowHeight;
      containerW = p.windowHeight;
    } else {
      containerH = p.windowWidth;
      containerW = p.windowWidth;
    }
    p.resizeCanvas(containerW, containerH);
  };
};
var myp5 = new p5(canvas, "canvas");
