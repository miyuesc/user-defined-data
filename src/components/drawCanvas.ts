export let draw: () => void;
draw = () => {
  (function() {
    let width: any,
      height: any,
      largeHeader: any,
      canvas: any,
      ctx: any,
      circles: any,
      target: any,
      animateHeader: any = true;

    // Main
    initHeader();
    addListeners();

    function initHeader() {
      width = (window as any).innerWidth;
      height = (window as any).innerHeight;
      target = { x: 0, y: height };

      canvas = document.getElementById("demo-canvas");
      canvas.width = width;
      canvas.height = height;
      ctx = canvas.getContext("2d");

      // create particles
      circles = [];
      for (let x = 0; x < width * 0.5; x++) {
        // @ts-ignore
        let c = new Circle();
        circles.push(c);
      }
      animate();
    }

    // Event handling
    function addListeners() {
      (window as any).addEventListener("scroll", scrollCheck);
      (window as any).addEventListener("resize", resize);
    }

    function scrollCheck() {
      if (document.body.scrollTop > height) animateHeader = false;
      else animateHeader = true;
    }

    function resize() {
      width = (window as any).innerWidth;
      height = (window as any).innerHeight;
      largeHeader.style.height = height + "px";
      canvas.width = width;
      canvas.height = height;
    }

    function animate() {
      if (animateHeader) {
        ctx.clearRect(0, 0, width, height);
        for (let i in circles) {
          circles[i].draw();
        }
      }
      requestAnimationFrame(animate);
    }

    // Canvas manipulation
    function Circle() {
      // @ts-ignore
      let _this = this;

      // constructor
      (function() {
        _this.pos = {};
        init();
        console.log(_this);
      })();

      function init() {
        _this.pos.x = Math.random() * width;
        _this.pos.y = height + Math.random() * 100;
        _this.alpha = 0.1 + Math.random() * 0.3;
        _this.scale = 0.1 + Math.random() * 0.3;
        _this.velocity = Math.random();
      }

      // @ts-ignore
      this.draw = function() {
        if (_this.alpha <= 0) {
          init();
        }
        _this.pos.y -= _this.velocity;
        _this.alpha -= 0.0005;
        ctx.beginPath();
        ctx.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 2 * Math.PI, false);
        ctx.fillStyle = "rgba(255,255,255," + _this.alpha + ")";
        ctx.fill();
      };
    }
  })();

  let lastTime = 0;
  let vendors = ["ms", "moz", "webkit", "o"];
  for (let x = 0; x < vendors.length && !(window as any).requestAnimationFrame; ++x) {
    (window as any).requestAnimationFrame = (window as any)[vendors[x] + "RequestAnimationFrame"];
    (window as any).cancelAnimationFrame =
      (window as any)[vendors[x] + "CancelAnimationFrame"] || (window as any)[vendors[x] + "CancelRequestAnimationFrame"];
  }

  if (!(window as any).requestAnimationFrame)
    (window as any).requestAnimationFrame = function(callback: any) {
      let currTime = new Date().getTime();
      let timeToCall = Math.max(0, 16 - (currTime - lastTime));
      let id = (window as any).setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!(window as any).cancelAnimationFrame)
    (window as any).cancelAnimationFrame = function(id: any) {
      clearTimeout(id);
    };
};
