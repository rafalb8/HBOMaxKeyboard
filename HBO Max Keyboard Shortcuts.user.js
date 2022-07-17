// ==UserScript==
// @name         HBO Max Keyboard Shortcuts
// @namespace    https://github.com/rafalb8/HBOMaxKeyboard
// @version      0.11
// @description  Adds keyboard shortcuts to HBO Max player
// @author       Rafalb8
// @match        https://play.hbomax.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hbomax.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // config
    const minSeek = 5; // with modifier
    const maxSeek = 10;

    const minVolume = 0.1; // with modifier
    const maxVolume = 0.25;

    var clamp = function (value, min, max) {
        return Math.min(Math.max(value, min), max);
    }


    document.addEventListener('keydown', (e) => {

        const modifier = e.shiftKey;

        var command = {};

        switch (e.key) {
            // seek forward
            case "ArrowRight":
                command = { type: "seek", value: modifier ? minSeek : maxSeek };
                break;

            // seek backward
            case "ArrowLeft":
                command = { type: "seek", value: modifier ? -minSeek : -maxSeek };
                break;

            // volume up
            case "ArrowUp":
                command = { type: "volume", value: modifier ? minVolume : maxVolume };
                break;

            // volume down
            case "ArrowDown":
                command = { type: "volume", value: modifier ? -minVolume : -maxVolume };
                break;

            default:
                return;
        }

        const video = document.querySelector('video');
        if (video?.length > 0) {
            console.log('video not found')
            return
        }

        // send command to player
        switch (command.type) {
            case "seek":
                if (typeof video.fastSeek === 'function') {
                    // fastSeek - firefox only
                    video.fastSeek(video.currentTime + command.value);
                } else {
                    video.currentTime += command.value;
                }
                break;
            case "volume":
                video.volume = clamp(video.volume + command.value, 0, 1);
                break;
        }

    }, false);

})();