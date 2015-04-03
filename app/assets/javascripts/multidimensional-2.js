/**
 * Created by jerek0 on 02/04/2015.
 */

let $ = require('jquery');
let uiManager = require('./UIManager');

function init() {

    // fix scroll header
    $('header .bg2').height($(window).height() + 60);

    $('.dimension .content .dimensionLauncher').on('click', uiManager.goToDimension);
    window.scrollTo(0, 0);
}

module.exports = {
    init: init
};