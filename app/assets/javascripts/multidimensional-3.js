/**
 * Created by jerek0 on 02/04/2015.
 */

let $ = require('jquery');

function init() {

    // fix scroll header
    $('header .bg3').height($(window).height() + 60);
}

module.exports = {
    init: init
};