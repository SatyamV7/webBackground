const container = document.getElementById("container");
let clock = new THREE.Clock();
const gui = new dat.GUI();

let scene, camera, renderer, material;
let settings = { fps: 39, scale: 0.25, parallaxVal: 0, click: false };

//custom events
const sceneLoadedEvent = new Event("sceneLoaded");

async function init() {
  renderer = new THREE.WebGLRenderer({
    antialias: false,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(settings.scale);
  container.appendChild(renderer.domElement);
  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  material = new THREE.ShaderMaterial({
    uniforms: {
      u_time: { value: 0, type: "f" },
      u_fog: { value: true, type: "b" },
      u_speed: { value: 0.5, type: "f" },
      u_scale: { value: 1, type: "f" },
      u_scale2: { value: 0.57, type: "f" },
      u_iters: { value: 5, type: "i" },
      u_color1: { value: new THREE.Color("#87b0b7"), type: "c" },
      u_fog_color: { value: new THREE.Color("#0f1c1c"), type: "c" },
      u_brightness: { value: 1, type: "f" },
      u_mouse: { value: new THREE.Vector4(), type: "v4" },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight), type: "v2" },
    },
    vertexShader: `
          varying vec2 vUv;        
          void main() {
              vUv = uv;
              gl_Position = vec4( position, 1.0 );    
          }
        `,
  });
  this.onmousedown = mouseClick;
  this.onmousemove = mouseMove;

  material.fragmentShader = await (await fetch("shaders/clouds.frag")).text();
  resize();

  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2, 1, 1), material);
  scene.add(quad);

  window.addEventListener("resize", (e) => resize());
  render();

  document.dispatchEvent(sceneLoadedEvent);
}

function mouseClick(e) {
  if (!settings.click) return;

  material.uniforms.u_mouse.value.x = e.pageX * settings.scale;
  material.uniforms.u_mouse.value.y = e.pageY * settings.scale;
  material.uniforms.u_mouse.value.z = 1;
  material.uniforms.u_mouse.value.w = 1;
}

function mouseMove(e) {
  if (settings.parallaxVal == 0) return;

  const x = (window.innerWidth - e.pageX * settings.parallaxVal) / 90;
  const y = (window.innerHeight - e.pageY * settings.parallaxVal) / 90;

  container.style.transform = `translateX(${x}px) translateY(${y}px) scale(1.09)`;
}

function setScale(value) {
  if (settings.scale == value) return;

  settings.scale = value;
  renderer.setPixelRatio(settings.scale);
  material.uniforms.u_resolution.value = new THREE.Vector2(
    window.innerWidth * settings.scale,
    window.innerHeight * settings.scale
  );
}

function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  material.uniforms.u_resolution.value = new THREE.Vector2(
    window.innerWidth * settings.scale,
    window.innerHeight * settings.scale
  );
}

function render() {
  setTimeout(function () {
    requestAnimationFrame(render);
  }, 1000 / settings.fps);

  //reset every 6hr
  if (clock.getElapsedTime() > 21600) clock = new THREE.Clock();
  material.uniforms.u_time.value = clock.getElapsedTime();

  renderer.render(scene, camera);
}

init();

//datgui threejs color menu
function addColor(ui, property, displayName) {
  var conf = { color: property.value.getHex() };
  ui.addColor(conf, "color")
    .onChange(function (val) {
      property.value = new THREE.Color(val);
    })
    .name(displayName);
}
