/**
 * Created by jerek0 on 01/04/2015.
 */

let $ = require('jquery');

// BLOCKS
let $body = $('body');
let $overlayGlobal = $('.overlayGlobal');
let $homeBlock = $('section.home');

// BUTTONS
let $menuToggler = $('.menuToggler');
let $startBtn = $('#startBtn');

function init() {
    bindUIActions();
}

function bindUIActions() {
    $menuToggler.on('click', toggleSideMenu);
    $overlayGlobal.on('click', toggleSideMenu);
}

function toggleSideMenu() {
    $body.toggleClass('sideMenu-active');
}

module.exports = {
    init: init
};