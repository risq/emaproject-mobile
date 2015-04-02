/**
 * Created by jerek0 on 01/04/2015.
 */

let $ = require('jquery');
let pageManager = require('./PageManager');

// BLOCKS
let $body = $('body');
let $overlayGlobal = $('.overlayGlobal');
let $homeBlock = $('section.home');
let $selectorBlock = $('section.selector');
let $dimensionBlock = $('section.dimension');

// BUTTONS
let $primaryHeaderBtn = $('.primary-header-btn');
let $startBtn = $('#startBtn');
let $dimensionLaunchers = $('.dimensionLauncher');

// Variables
let status = "home";

function init() {
    bindUIActions();
    
    $selectorBlock.hide();
    $dimensionBlock.hide();
}

/**
 * Manager of UI Actions *
 */
function bindUIActions() {
    $primaryHeaderBtn.on('click', onPrimaryHeaderBtn);
    $overlayGlobal.on('click', toggleSideMenu);
    $startBtn.on('click', goToSelector);
    $dimensionLaunchers.on('click', goToDimension);
}

/**
 * Called when the main btn of the header is called *
 */
function onPrimaryHeaderBtn() {
    if(status == 'home') {
        toggleSideMenu();
    } else {
        goBack();
    }
}

/**
 * Make the left side menu appear *
 */
function toggleSideMenu() {
    $body.toggleClass('sideMenu-active');
}

/**
 * Goes to the previous status page *
 */
function goBack() {
    switch(status) {
        case "dimension":
            goToSelector();
            break;
        case "selector":
            goToHome();
            break;
    }
}

/* GO TO DIFFERENT STATUSES */

function goToHome() {
    $homeBlock.show();
    $selectorBlock.hide();
    $dimensionBlock.hide();
    $body.toggleClass('page', false);
    $body.toggleClass('home', true);
    status = "home";
    $primaryHeaderBtn.html("Menu");
}

function goToSelector() {
    $homeBlock.hide();
    $selectorBlock.show();
    $dimensionBlock.hide();
    $body.toggleClass('page', true);
    $body.toggleClass('home',false);
    status = "selector";
    $primaryHeaderBtn.html("Back");
}

function goToDimension() {
    $homeBlock.hide();
    $selectorBlock.hide();
    $dimensionBlock.show();
    pageManager.changePage($(this).data("dimension"));
    status = "dimension";
}

// Export
module.exports = {
    init: init
};