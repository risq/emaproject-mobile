/**
 * Created by jerek0 on 01/04/2015.
 */

let $ = require('jquery');
let gsap = require('gsap');
let pageManager = require('./PageManager');

// BLOCKS
let $body = $('body');
let $overlayGlobal = $('.overlayGlobal');
let $homeBlock = $('section.home');
let $selectorBlock = $('section.selector');
let $dimensionBlock = $('section.dimension');

// BUTTONS
let $primaryHeaderBtn = $('.primary-header-btn');
let $secondaryHeaderBtn = $('.secondary-header-btn');
let $startBtn = $('#startBtn');
let $dimensionLaunchers = $('.dimensionLauncher');

// Variables
let status = "home";

// Bugfix tweenmax viewport for animated elements
TweenMax.set("#startBtn, #hashtagBtn, section.home .content .excerpt", {z:0});

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
    $secondaryHeaderBtn.on('click', onSecondaryHeaderBtn);
    $overlayGlobal.on('click', toggleOffAsides);
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
 * Called when the secondary btn of the header is called *
 */
function onSecondaryHeaderBtn() {
    toggleSideInfos();
}

/**
 * Make the left side menu appear *
 */
function toggleSideMenu() {
    $body.toggleClass('sideMenu-active');
}

/**
 * Make the right side menu appear *
 */
function toggleSideInfos() {
    $body.toggleClass('sideInfos-active');
}

/**
 * Make any side menu disappear *
 */
function toggleOffAsides() {
    $body.toggleClass('sideMenu-active', false);
    $body.toggleClass('sideInfos-active', false);
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
        case "page":
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
    $primaryHeaderBtn.toggleClass('icon-menu', true);
    $primaryHeaderBtn.toggleClass('icon-back', false);
    
    var tl = new TimelineMax();
    tl.from("#startBtn", 0.2, { ease: Back.easeOut.config(1.7), scale: 0});
    tl.from("#hashtagBtn", 0.2, { ease: Back.easeOut.config(1.7), y: 100 });
    tl.from("#startBtn", 0.4, { ease: Back.easeIn.config(1.7), width: "50px", height: "50px", padding: "0"});
    tl.from("section.home .content .excerpt", 0.25, { opacity: 0 });
    tl.from("#startBtn", 0.1, {color: "transparent"});
}

function goToSelector() {
    switch(status) {
        case "home":

            var tl = new TimelineMax();
            tl.to("#startBtn", 0.1, {color: "transparent"});
            tl.to("section.home .content .excerpt", 0.25, { opacity: 0 });
            tl.to("#startBtn", 0.4, { ease: Back.easeOut.config(1.7), width: "50px", height: "50px", padding: "0"});
            tl.to("#hashtagBtn", 0.2, { ease: Back.easeIn.config(1.7), y: 100 });
            tl.to("#startBtn", 0.2, { ease: Back.easeIn.config(1.7), scale: 0});
            
            setTimeout(function() {
                $homeBlock.hide(); 
                $selectorBlock.show();
                $dimensionBlock.hide();
                $body.toggleClass('page', true);
                $body.toggleClass('home',false);
                status = "selector";
                $primaryHeaderBtn.toggleClass('icon-menu', false);
                $primaryHeaderBtn.toggleClass('icon-back', true);
                
                TweenMax.set("#startBtn, #hashtagBtn, section.home .content .excerpt", {clearProps:"all"});
            }, 1200);
            break;
        default:
            var tl = new TimelineMax();
            tl.to(".dimension", 0.25, {opacity: 0});

            setTimeout(function() {
                $homeBlock.hide();
                $selectorBlock.show();
                $dimensionBlock.hide();
                $body.toggleClass('page', true);
                $body.toggleClass('home',false);
                status = "selector";
                $primaryHeaderBtn.toggleClass('icon-menu', false);
                $primaryHeaderBtn.toggleClass('icon-back', true);
            }, 250);
            break;
    }
}

function goToDimension(e) {
    var tl = new TimelineMax();
    tl.to(".dimension", 0, {opacity: 0});
    
    e.preventDefault();
    toggleOffAsides();
    $homeBlock.hide();
    $selectorBlock.hide();
    $dimensionBlock.show();
    $body.toggleClass('page', true);
    $body.toggleClass('home',false);
    pageManager.changePage($(this).data("dimension"));
    
    if($(this).hasClass('fromHome')) {
        status = "page";
    } else {
        status = "dimension";
    }

    $primaryHeaderBtn.toggleClass('icon-menu', false);
    $primaryHeaderBtn.toggleClass('icon-back', true);

    tl.to(".dimension", 0.25, {opacity: 1});
}

// Export
module.exports = {
    init: init
};