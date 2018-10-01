import React, { Component } from 'react';
const THREE = require('three')
const OrbitControls = require('three-orbit-controls')(THREE);

class PanoramicPhoto extends Component {
  componentDidMount = () => {
    var container = this.image360;

    if (!container) {
      return;
    }

    var width  = window.innerWidth,
        height = 210;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
    camera.position.x = 0.1;
    camera.lookAt(new THREE.Vector3());

    var renderer =new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    var loader = new THREE.TextureLoader();
    loader.crossOrigin = '';
    var sphere = new THREE.Mesh(
      new THREE.SphereGeometry(100, 20, 20),
      new THREE.MeshBasicMaterial({
        map: loader.load(this.props.src ? this.props.src : 'https://c1.staticflickr.com/4/3953/33031648354_0e35778ca8_k.jpg')
      })
    );
    sphere.scale.x = -1;
    scene.add(sphere);
    var controls = new OrbitControls( camera, renderer.domElement );

    controls.enablePan = true;
    controls.enableZoom = false;
    controls.autoRotate = false;
    // controls.enableDamping = false;
    container.appendChild(renderer.domElement);
    render();
    function render() {
      controls.update();
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    }

    function onMouseWheel(event) {
      event.preventDefault();

      if (event.wheelDeltaY) { // WebKit
        camera.fov -= event.wheelDeltaY * 0.05;
      } else if (event.wheelDelta) { 	// Opera / IE9
        camera.fov -= event.wheelDelta * 0.05;
      } else if (event.detail) { // Firefox
        camera.fov += event.detail * 1.0;
      }
      camera.fov = Math.max(40, Math.min(100, camera.fov));
      camera.updateProjectionMatrix();
    }

    this.image360.addEventListener('mousewheel', onMouseWheel, false);
    this.image360.addEventListener('DOMMouseScroll', onMouseWheel, false);
  }

  render() {
    return (
      <div id="360container" ref={(e) => this.image360 = e}></div>
    );
  }
}

export default PanoramicPhoto;
