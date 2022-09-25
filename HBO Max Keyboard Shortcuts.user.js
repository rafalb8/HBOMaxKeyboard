// ==UserScript==
// @name         HBO Max Keyboard Shortcuts
// @namespace    https://github.com/rafalb8/HBOMaxKeyboard
// @version      0.13
// @description  Adds keyboard shortcuts to HBO Max player
// @author       Rafalb8
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

    var video = document.querySelector('video');

    var fastSeek = false;

    const loadVideo = () => {
        if (video == null || video == undefined) {
            video = document.querySelector('video');
            fastSeek = (typeof video.fastSeek === 'function')
        }
    }

    // register keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        loadVideo();
        var command = {};

        switch (e.key) {
            // seek forward
            case "l":
                command = { type: "seek", value: seek };
                break;

            // seek backward
            case "j":
                command = { type: "seek", value: -seek };
                break;

            // volume up
            case "ArrowUp":
                command = { type: "volume", value: volume };
                break;

            // volume down
            case "ArrowDown":
                command = { type: "volume", value: -volume };
                break;

            // Play/Pause
            case "k":
                command = { type: "control" };
                break;

            default:
                return;
        }

        // send command to player
        switch (command.type) {

            case "seek":
                var pos = video.currentTime + command.value;
                if (fastSeek) {
                    video.fastSeek(pos);
                } else {
                    video.currentTime = pos
                }
                break;

            case "volume":
                video.volume = clamp(video.volume + command.value, 0, 1);
                break;

            case "control":
                if (video.paused) {
                    video.play()
                } else {
                    video.pause()
                }
                break;
        }

    }, false);

})();