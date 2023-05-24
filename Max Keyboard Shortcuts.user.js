// ==UserScript==
// @name         Max (and HBO Max) Keyboard Shortcuts
// @namespace    https://github.com/rafalb8/HBOMaxKeyboard
// @version      0.16
// @description  Adds keyboard shortcuts to (HBO)Max player
// @author       Rafalb8
// @author       CHJ85
// @match        https://*.max.com/*
// @match        https://play.hbomax.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hbomax.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // config
    const seek = 5;
    const volume = 0.1;

    // functions
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
    let video = null;
    let fastSeek = false;

    // register keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        loadVideo();

        switch (e.key) {
            // seek forward
            case "l":
                seekVideo(seek);
                break;

            // seek backward
            case "j":
                seekVideo(-seek);
                break;

            // volume up
            case "ArrowUp":
                adjustVolume(volume);
                break;

            // volume down
            case "ArrowDown":
                adjustVolume(-volume);
                break;

            // Play/Pause
            case "k":
            case " ":
                e.preventDefault(); // Prevents spacebar from scrolling the page
                togglePlayPause();
                break;

            // Fullscreen
            case "f":
                if (document.baseURI.includes("play.hbomax.com")) {
                    // skip for play.hbomax.com
                    return;
                }
                toggleFullscreen();
                break;

            // Jump forward
            case "ArrowRight":
                jumpForward();
                break;

            // Jump back
            case "ArrowLeft":
                jumpBack();
                break;

            default:
                return;
        }

        e.stopImmediatePropagation();
    }, false);

    document.addEventListener('click', () => {
        loadVideo();
    });

    function loadVideo() {
        if (video == null || video == undefined) {
            video = document.querySelector('video');
            fastSeek = typeof video.fastSeek === 'function';
        }
    }

    function seekVideo(value) {
        loadVideo();
        if (video) {
            const pos = video.currentTime + value;
            if (fastSeek) {
                video.fastSeek(pos);
            } else {
                video.currentTime = pos;
            }
        }
    }

    function adjustVolume(value) {
        loadVideo();
        if (video) {
            video.volume = clamp(video.volume + value, 0, 1);
        }
    }

    function togglePlayPause() {
        loadVideo();
        if (video) {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        }
    }

    function toggleFullscreen() {
        loadVideo();
        if (video) {
            if (!document.fullscreenElement) {
                video.requestFullscreen({ navigationUI: 'show' }).catch(err => console.log(err));
            } else {
                document.exitFullscreen();
            }
        }
    }

    function jumpForward() {
        seekVideo(seek);
    }

    function jumpBack() {
        seekVideo(-seek);
    }
})();
