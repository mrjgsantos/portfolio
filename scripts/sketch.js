var canvas = function (p) {
  let containerW, containerH;

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

  let img1,
    img2,
    img3,
    img4,
    mapimage1,
    mapimage2,
    mapimage3,
    image3height = 0,
    mapimage4,
    mapimage11,
    mapimage12,
    mapimage13,
    mapimage14,
    mapimage21,
    mapimage22,
    mapimage23,
    mapimage24;

  let easing = 0.07;
  let permissionGranted = false;

  p.preload = function () {
    img1 = p.loadImage("./data/d1.jpg");
    img2 = p.loadImage("./data/d2.jpg");
    img3 = p.loadImage("./data/d3.jpg");
    img4 = p.loadImage("./data/v4.jpg");

    d1 = p.loadImage("./data/d1.jpg");
    d2 = p.loadImage("./data/d2.jpg");
    d3 = p.loadImage("./data/d3.jpg");
    d4 = p.loadImage("./data/v4.jpg");
    f1 = p.loadImage("./data/f1.jpg");
    f2 = p.loadImage("./data/f2.jpg");
    f3 = p.loadImage("./data/f3.jpg");
    f4 = p.loadImage("./data/f4.jpg");
    v1 = p.loadImage("./data/v1.jpg");
    v2 = p.loadImage("./data/v2.jpg");
    v3 = p.loadImage("./data/v3.png");
    v4 = p.loadImage("./data/v4.jpg");
    w1 = p.loadImage("./data/w1.jpg");
    w2 = p.loadImage("./data/w2.png");
    w3 = p.loadImage("./data/w3.png");
    w4 = p.loadImage("./data/w4.jpg");

    cursor = p.loadImage("./data/cursor.png");

    robotoMonoLight = p.loadFont("./data/OpenSans-Regular.ttf");

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
    p.imageMode(p.CORNER);

    cx = p.width / 2;
    cy = p.height / 2;
    img1 = d1;
    img2 = w1;
    img3 = f1;
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
    p.noCursor();

    const dx = p.constrain(p.rotationY, -3, 3);
    const dy = p.constrain(p.rotationX, -3, 3);

    if (
      (cursorX > 0) &
      (cursorX < p.width / 2) &
      (cursorY < p.height / 2) &
      (cursorY > 0)
    ) {
      if ((cursorX > 0) & (cursorX < p.width / 8)) {
        img1 = d1;
        mapimage11 = 300;
        mapimage1 = mapimage11;
      } else if ((cursorX > p.width / 8) & (cursorX < (2 * p.width) / 8)) {
        mapimage12 = 300;
        mapimage1 = mapimage12;
        img1 = d2;
      } else if (
        (cursorX > (2 * p.width) / 8) &
        (cursorX < (3 * p.width) / 8)
      ) {
        mapimage13 = 300;
        mapimage1 = mapimage13;
        img1 = d3;
      } else if (
        (cursorX > (3 * p.width) / 8) &
        (cursorX < (4 * p.width) / 8)
      ) {
        mapimage14 = 180;
        mapimage1 = mapimage14;
        img1 = w1;
      } else {
        mapimage11 = 300;
        img1 = d1;
      }
    }

    if (
      (cursorX > p.width / 2) &
      (cursorX < p.width) &
      (cursorY > 0) &
      (cursorY < p.height / 2)
    ) {
      if ((cursorX > p.width / 2) & (cursorX < (5 * p.width) / 8)) {
        img2 = w1;
        mapimage21 = 200;
        mapimage2 = mapimage21;
      } else if (
        (cursorX > (5 * p.width) / 8) &
        (cursorX < (6 * p.width) / 8)
      ) {
        mapimage22 = 140;
        mapimage2 = mapimage22;
        img2 = w2;
      } else if (
        (cursorX > (6 * p.width) / 8) &
        (cursorX < (7 * p.width) / 8)
      ) {
        mapimage23 = 100;
        mapimage2 = mapimage23;
        img2 = w3;
      } else if (
        (cursorX > (7 * p.width) / 8) &
        (cursorX < (8 * p.width) / 8)
      ) {
        mapimage24 = 0;
        mapimage2 = mapimage24;
        img2 = w4;
      } else {
        mapimage21 = 200;
        img2 = w1;
      }
    }

    if (
      (cursorX > 0) &
      (cursorX < p.width / 2) &
      (cursorY > p.height / 2) &
      (cursorY < p.height)
    ) {
      if ((cursorX > 0) & (cursorX < p.width / 8)) {
        img3 = f1;
        mapimage31 = 300;
        mapimage3 = mapimage31;
      } else if ((cursorX > p.width / 8) & (cursorX < (2 * p.width) / 8)) {
        mapimage32 = 300;
        mapimage3 = mapimage32;
        img3 = f2;
      } else if (
        (cursorX > (2 * p.width) / 8) &
        (cursorX < (3 * p.width) / 8)
      ) {
        mapimage33 = 0;
        mapimage3 = mapimage33;
        img3 = f3;
      } else if (
        (cursorX > (3 * p.width) / 8) &
        (cursorX < (4 * p.width) / 8)
      ) {
        mapimage34 = 0;
        mapimage3 = mapimage34;
        img3 = f4;
      } else {
        mapimage31 = 300;
        img3 = f1;
      }
      if (img3 == f4) {
        image3height = img3.width;
      } else {
        image3height = img3.height;
      }
    }
    if (
      (cursorX > p.width / 2) &
      (cursorX < p.width) &
      (cursorY > p.height / 2) &
      (cursorY < p.height)
    ) {
      if ((cursorX > p.width / 2) & (cursorX < (5 * p.width) / 8)) {
        img4 = v1;
        mapimage41 = 400;
        mapimage4 = mapimage41;
      } else if (
        (cursorX > (5 * p.width) / 8) &
        (cursorX < (6 * p.width) / 8)
      ) {
        mapimage42 = 350;
        mapimage4 = mapimage42;
        img4 = v2;
      } else if (
        (cursorX > (6 * p.width) / 8) &
        (cursorX < (7 * p.width) / 8)
      ) {
        mapimage43 = 0;
        mapimage4 = mapimage43;
        img4 = v3;
      } else if (
        (cursorX > (7 * p.width) / 8) &
        (cursorX < (8 * p.width) / 8)
      ) {
        mapimage44 = 400;
        mapimage4 = mapimage44;
        img4 = v4;
      } else {
        mapimage21 = 200;
        img4 = v1;
      }
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
      img1.height,
      img1.width
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
      img2.height,
      img2.height
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
      image3height,
      image3height
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
      mapimage4,
      0,
      img4.height,
      img4.height
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

    cx += dx * 2;
    cy += dy * 2;
    cx = p.constrain(cx, 10, p.width - 10);
    cy = p.constrain(cy, 10, p.height - 10);

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
      alphaT1 = 150;
    } else {
      alphaT1 = 250;
    }

    if (
      cursorX > containerW / 2 &&
      cursorX < containerW &&
      cursorY > 0 &&
      cursorY < containerH / 2
    ) {
      alphaT2 = 150;
    } else {
      alphaT2 = 250;
    }
    if (
      cursorX > 0 &&
      cursorX < containerW / 2 &&
      cursorY > containerW / 2 &&
      cursorY < containerH
    ) {
      alphaT3 = 150;
    } else {
      alphaT3 = 250;
    }

    if (
      cursorX > containerW / 2 &&
      cursorX < containerW &&
      cursorY > containerW / 2 &&
      cursorY < containerH
    ) {
      alphaT4 = 150;
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
    open("html/editorial.html", "_self");
  };
  p.webdesignopen = function () {
    open("html/webdesign.html", "_self");
  };
  p.fotografiaopen = function () {
    open("html/fotografia.html", "_self");
  };
  p.videoopen = function () {
    open("html/video.html", "_self");
  };
};

var myp5 = new p5(canvas, "canvas");
