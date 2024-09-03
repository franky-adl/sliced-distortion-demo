// This core-utils contains the most important/top-level functions needed in creating a threejs application

import * as THREE from "three";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";

// global.THREE = THREE;

/**
 * Initializes a reasonable uniforms object ready to be used in fragments
 * @returns a uniforms object with u_time, u_mouse and u_resolution
 */
export const getDefaultUniforms = () => {
    return {
        u_time: { value: 0.0 },
        u_mouse: {
            value: {
                x: 0.0,
                y: 0.0,
            },
        },
        u_resolution: {
            value: {
                x: window.innerWidth * window.devicePixelRatio,
                y: window.innerHeight * window.devicePixelRatio,
            },
        },
    };
};

export const getWrapper = () => {
    return document.getElementById("threejs-wrapper");
};

/**
 * This function contains the boilerplate code to set up the environment for a threejs app;
 * e.g. HTML canvas, resize listener, mouse events listener, requestAnimationFrame
 * Consumer needs to provide the created renderer, camera and (optional) composer to this setup function
 * This has the benefit of bringing the app configurations directly to the consumer, instead of hiding/passing them down one more layer
 * @param {object} app a custom Threejs app instance that needs to call initScene and (optioal) updateScene if animation is needed
 * @param {object} scene Threejs scene instance
 * @param {object} renderer Threejs renderer instance
 * @param {object} camera Threejs camera instance
 * @param {bool} enableAnimation whether the app needs to animate stuff
 * @param {object} uniforms Uniforms object to be used in fragments, u_resolution/u_mouse/u_time got updated here
 * @param {object} composer Threejs EffectComposer instance
 * @returns a custom threejs app instance that has the basic setup ready that can be further acted upon/customized
 */
export const runApp = (
    app,
    scene,
    renderer,
    camera,
    enableAnimation = false,
    uniforms = getDefaultUniforms(),
    composer = null
) => {
    // Create the HTML container, styles defined in index.html
    const container = document.getElementById("canvas");
    container.appendChild(renderer.domElement);
    const wrapper = getWrapper();

    // Register resize listener
    window.addEventListener("resize", () => {
        camera.aspect = wrapper.clientWidth / wrapper.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
        // update uniforms.u_resolution
        if (uniforms.u_resolution !== undefined) {
            uniforms.u_resolution.value.x =
                wrapper.clientWidth * window.devicePixelRatio;
            uniforms.u_resolution.value.y =
                wrapper.clientHeight * window.devicePixelRatio;
        }
        // update image UV to fit aspect
        app.updateUVFactor();
        // randomize offsets
        app.regenerateGrid();
    });

    // Register mouse move/touch listener
    const mouseListener = (e) => {
        uniforms.u_mouse.value.x = e.touches ? e.touches[0].clientX : e.clientX;
        uniforms.u_mouse.value.y = e.touches ? e.touches[0].clientY : e.clientY;

        // allow main app to do more updates
        app.mouseMoveEvent(e);
    };
    if ("ontouchstart" in window) {
        wrapper.addEventListener("touchmove", mouseListener);
    } else {
        wrapper.addEventListener("mousemove", mouseListener);
    }

    // Define your app
    if (app.updateScene === undefined) {
        app.updateScene = (delta, elapsed) => {};
    }
    Object.assign(app, { ...app, container });

    // The engine that powers your scene into movement
    const clock = new THREE.Clock();
    const animate = () => {
        if (enableAnimation) {
            requestAnimationFrame(animate);
        }

        const delta = clock.getDelta();
        const elapsed = clock.getElapsedTime();
        uniforms.u_time.value = elapsed;

        app.updateScene(delta, elapsed);

        if (composer === null) {
            renderer.render(scene, camera);
        } else {
            composer.render();
        }
    };

    app.initScene()
        .then(() => {
            // const veil = document.getElementById("veil");
            // veil.style.opacity = 0;
            return true;
        })
        .then(animate)
        .then(() => {
            // debugging info
            renderer.info.reset();
            // not sure if reliable enough, numbers change everytime...
            console.log("Renderer info", renderer.info);
        })
        .catch((error) => {
            console.log(error);
        });
};

/**
 * This creates the renderer, by default calls renderer's setPixelRatio and setSize methods
 * further reading on color management: See https://www.donmccurdy.com/2020/06/17/color-management-in-threejs/
 * @param {object} rendererProps props fed to WebGlRenderer constructor
 * @param {function} configureRenderer custom function for consumer to tune the renderer, takes renderer as the only parameter
 * @returns created renderer
 */
export const createRenderer = (
    rendererProps = {},
    configureRenderer = (renderer) => {}
) => {
    const wrapper = getWrapper();
    const renderer = new THREE.WebGLRenderer(rendererProps);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);

    // more configurations to the renderer from the consumer
    configureRenderer(renderer);

    return renderer;
};

/**
 * This function creates the EffectComposer object for post processing
 * @param {object} renderer The threejs renderer
 * @param {object} scene The threejs scene
 * @param {object} camera The threejs camera
 * @param {function} extraPasses custom function that takes takes composer as the only parameter, for the consumer to add custom passes
 * @returns The created composer object used for post processing
 */
export const createComposer = (renderer, scene, camera, extraPasses) => {
    const renderScene = new RenderPass(scene, camera);

    let composer = new EffectComposer(renderer);
    composer.addPass(renderScene);

    // custom passes that the consumer wants to add
    extraPasses(composer);

    return composer;
};
