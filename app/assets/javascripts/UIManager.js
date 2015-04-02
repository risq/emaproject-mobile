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
let $modalContestTogglers = $('.modal-contest-toggler');

// Variables
let status = "home";
let modalContestOpen = false;

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
    $modalContestTogglers.on('click', toggleModalContest);
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

function toggleModalContest(e) {
    e.preventDefault();

    let tl = new TimelineLite();
    
    if(modalContestOpen) {
        tl.to(this, 0.4, {y: "0px"});
        tl.to("#modalContest", 0.4, {y: "100%"}, "-=0.4");
        tl.to(this, 0.4, {padding: "10px 20px", width: "auto", height: "auto", "min-width": "inherit"});
        tl.to(this, 0.2, {color: "initial"});
        $body.toggleClass('modalContestOpened', false);
        modalContestOpen=false;
    } else {
        tl.to(this, 0.2, {color: "transparent"});
        tl.to(this, 0.4, {padding: 0, width: "30px", height: "30px", "min-width": 0});
        tl.to(this, 0.4, {y: "-180px"});
        $body.toggleClass('modalContestOpened', true);
        /*l.to(this, 0, {
            position: "fixed",
            bottom: "220px",
            y: 0,
            x: "-50%",
            margin: 0
        });*/
        modalContestOpen=true;
        
        $('<div id="modalContest">').toggleClass('modalContest').html('<h4 class="inverted">WIN YOUR AMAZING TRIP !</h4><p>Lorem ipsum dolor sit amet je sais pas quoi dire</p><a href="#">« I dream do travel in a world (...) »<br/><strong>#myotherdimension</strong></a>').css('transform','translate(0,100%)').appendTo($body);
        //$('#modalContest').on('click', toggleModalContest);
        tl.to("#modalContest", 0.4, {y: "0"}, "=-0.4");
    }
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
    // WE FIRSTLY CHANGE THE PAGE FOR THE HOME
    $homeBlock.show();
    $selectorBlock.hide();
    $dimensionBlock.hide();
    $body.toggleClass('page', false);
    $body.toggleClass('home', true);
    status = "home";
    $primaryHeaderBtn.toggleClass('icon-menu', true);
    $primaryHeaderBtn.toggleClass('icon-back', false);
    
    // THEN WE GET THE ANIMATIONS BACKWARDS
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

            // ANIMATION OF HOME ELEMENTS LEAVING BEFORE ANYTHING
            var tl = new TimelineMax();
            tl.to("#startBtn", 0.1, {color: "transparent"});
            tl.to("section.home .content .excerpt", 0.25, { opacity: 0 });
            tl.to("#startBtn", 0.4, { ease: Back.easeOut.config(1.7), width: "50px", height: "50px", padding: "0"});
            tl.to("#hashtagBtn", 0.2, { ease: Back.easeIn.config(1.7), y: 100 });
            tl.to("#startBtn", 0.2, { ease: Back.easeIn.config(1.7), scale: 0});
            
            // SHOW THE ACTUAL PAGE
            setTimeout(function() {
                $homeBlock.hide(); 
                $selectorBlock.show();
                $dimensionBlock.hide();
                $body.toggleClass('page', true);
                $body.toggleClass('home',false);
                status = "selector";
                $primaryHeaderBtn.toggleClass('icon-menu', false);
                $primaryHeaderBtn.toggleClass('icon-back', true);
                
                // RESET ANIMATED ELEMENTS FROM HOME
                TweenMax.set("#startBtn, #hashtagBtn, section.home .content .excerpt", {clearProps:"all"});
            }, 1200);
            break;
        default:
            
            // FADE OUT OF THE CURRENT PAGE BEFORE ANYTHING
            var tl = new TimelineMax();
            tl.to(".dimension", 0.25, {opacity: 0});

            // CHANGE CURRENT STATUS TO SELECTOR
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
    
    // IN ANY CASE, WE INIT THE OPACITY OF THE PAGE TO 0
    var tl = new TimelineMax();
    tl.to(".dimension", 0, {opacity: 0});
    
    // WE TOGGLE THE NEW CONTENT
    e.preventDefault();
    toggleOffAsides();
    $homeBlock.hide();
    $selectorBlock.hide();
    $dimensionBlock.show();
    $body.toggleClass('page', true);
    $body.toggleClass('home',false);
    pageManager.changePage($(this).data("dimension"));
    setTimeout(function() {
        $('.modal-contest-toggler', $dimensionBlock).on('click', toggleModalContest);
    }, 300);
    
    // Check if it's a page that comes from home or from the dimensions selector
    if($(this).hasClass('fromHome')) {
        status = "page";
    } else {
        status = "dimension";
    }

    $primaryHeaderBtn.toggleClass('icon-menu', false);
    $primaryHeaderBtn.toggleClass('icon-back', true);

    // THE ACTUAL ENTERING ANIMATION (Fade in)
    tl.to(".dimension", 0.25, {opacity: 1});
}

// Export
module.exports = {
    init: init
};