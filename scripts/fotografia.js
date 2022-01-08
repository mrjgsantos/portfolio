var canvas = function (p) {
  let containerW, containerH;
  let img1, img2, img3, img4, cursor;
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
  let mapimage1, mapimage2, mapimage3, mapimage4;
  p.preload = function () {
    img1 = p.loadImage("../data/f1.jpg");
    img2 = p.loadImage("../data/f2.jpg");
    img3 = p.loadImage("../data/f3.jpg");
    img4 = p.loadImage("../data/f4.jpg");
    cursor = p.loadImage("../data/cursor.png");

    robotoMonoLight = p.loadFont("../data/OpenSans-Regular.ttf");

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
    p.background("#E7E7E5");

    const dx = p.constrain(p.rotationY, -3, 3);
    const dy = p.constrain(p.rotationX, -3, 3);

    cx += dx * 2;
    cy += dy * 2;
    cx = p.constrain(cx, 25, p.width - 25);
    cy = p.constrain(cy, 25, p.height - 25);

    if (
      (cursorX > 0) &
      (cursorX < p.width / 2) &
      (cursorY < p.height / 2) &
      (cursorY > 0)
    ) {
      mapimage1 = p.map(cursorX, p.width / 2, p.width, 600, 1200);
    } else {
      0;
    }

    if (
      (cursorX > p.width / 2) &
      (cursorX < p.width) &
      (cursorY > 0) &
      (cursorY < p.height / 2)
    ) {
      mapimage2 = p.map(cursorX, p.width / 2, p.width, 0, 600);
    } else {
      300;
    }

    if (
      (cursorX > 0) &
      (cursorX < p.width / 2) &
      (cursorY > p.height / 2) &
      (cursorY < p.height)
    ) {
      mapimage3 = p.map(cursorX, p.width / 2, p.width, 600, 1200);
    } else {
      300;
    }
    if (
      (cursorX > p.width / 2) &
      (cursorX < p.width) &
      (cursorY > p.height / 2) &
      (cursorY < p.height)
    ) {
      mapimage4 = p.map(cursorY, p.height / 2, p.height, 0, 600);
    } else {
      300;
    }

    p.textSize(30);
    p.textFont(robotoMonoLight);

    p.fill(231, 231, 229, alpha1);
    p.image(
      img1,
      0,
      0,
      containerW / 2,
      containerH / 2,
      mapimage1,
      0,
      1000,
      1000
    );
    p.rect(0, 0, containerW / 2, containerH / 2);
    p.noStroke();
    p.fill(0);

    p.fill(231, 231, 229, alpha2);

    p.image(
      img2,
      containerW / 2,
      0,
      containerW / 2,
      containerH / 2,
      mapimage2,
      0,
      1200,
      1200
    );
    p.rect(containerW / 2, 0, containerW / 2, containerH / 2);
    p.fill(0);
    p.noStroke();

    p.fill(231, 231, 229, alpha3);
    p.image(
      img3,
      0,
      containerH / 2,
      containerW / 2,
      containerH / 2,
      mapimage3,
      0,
      1000,
      1000
    );
    p.rect(0, containerH / 2, containerW / 2, containerH / 2);
    p.fill(0);
    p.noStroke();

    p.fill(231, 231, 229, alpha4);

    p.image(
      img4,
      containerW / 2,
      containerH / 2,
      containerW / 2,
      containerH / 2,
      200,
      mapimage4,
      1000,
      1000
    );

    p.rect(containerW / 2, containerH / 2, containerW / 2, containerH / 2);
    p.fill(0);

    p.stroke(0);
    p.strokeWeight(1.3);

    p.line(p.width / 2, 0, p.width / 2, p.height);

    p.line(0, p.height / 2, p.width, p.height / 2);

    p.noStroke();

    alpha1 = alpha1 + (alphaT1 - alpha1) * easing;
    alpha2 = alpha2 + (alphaT2 - alpha2) * easing;
    alpha3 = alpha3 + (alphaT3 - alpha3) * easing;
    alpha4 = alpha4 + (alphaT4 - alpha4) * easing;

    if (typeof window.orientation == "undefined") {
      cursorX = p.mouseX;
      cursorY = p.mouseY;
      p.imageMode(p.CENTER);
      p.image(cursor, p.mouseX, p.mouseY, 20, 20);
      p.imageMode(p.CORNER);
    } else {
      cursorX = cx;
      cursorY = cy;
      p.fill(255);
      p.noStroke();
      p.imageMode(p.CENTER);
      p.image(cursor, cursorX, cursorY, 20, 20);
      p.imageMode(p.CORNER);
    }

    if (
      cursorX > 0 &&
      cursorX < containerW / 2 &&
      cursorX > 0 &&
      cursorY < containerH / 2
    ) {
      alphaT1 = 50;
    } else {
      alphaT1 = 250;
    }

    if (
      cursorX > containerW / 2 &&
      cursorX < containerW &&
      cursorY > 0 &&
      cursorY < containerH / 2
    ) {
      alphaT2 = 50;
    } else {
      alphaT2 = 250;
    }
    if (
      cursorX > 0 &&
      cursorX < containerW / 2 &&
      cursorY > containerW / 2 &&
      cursorY < containerH
    ) {
      alphaT3 = 50;
    } else {
      alphaT3 = 250;
    }

    if (
      cursorX > containerW / 2 &&
      cursorX < containerW &&
      cursorY > containerW / 2 &&
      cursorY < containerH
    ) {
      alphaT4 = 50;
    } else {
      alphaT4 = 250;
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
  p.mouseClicked = function () {
    if (
      (p.mouseX > 0) &
      (p.mouseX < p.width / 2) &
      (p.mouseY > 0) &
      (p.mouseY < p.height / 2)
    ) {
      p.editorialopen();
    }
    if (
      (p.mouseX > p.width / 2) &
      (p.mouseX < p.width) &
      (p.mouseY > 0) &
      (p.mouseY < p.height / 2)
    ) {
      p.webdesignopen();
    }
    if (
      (p.mouseX > 0) &
      (p.mouseX < p.width / 2) &
      (p.mouseY > p.height / 2) &
      (p.mouseY < p.height)
    ) {
      p.fotografiaopen();
    }
    if (
      (p.mouseX > p.width / 2) &
      (p.mouseX < p.width) &
      (p.mouseY > p.height / 2) &
      (p.mouseY < p.height)
    ) {
      p.videoopen();
    }
  };

  p.editorialopen = function () {
    open("https://jgsantos5.wixsite.com/jorgesantos/natureza");
  };
  p.webdesignopen = function () {
    open("https://jgsantos5.wixsite.com/jorgesantos/viagens");
  };
  p.fotografiaopen = function () {
    open("https://jgsantos5.wixsite.com/jorgesantos/viagens");
  };
  p.videoopen = function () {
    open("https://jgsantos5.wixsite.com/jorgesantos/eventos");
  };
};

var myp5 = new p5(canvas, "canvas");
