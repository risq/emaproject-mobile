/**
 * Created by jerek0 on 02/04/2015.
 */

let $ = require('jquery');

let $dimensionContent = $('.dimension .content');

function init() {
    // En fait j'ai rien à faire ici mais les init c'est le bien :)
}

function changePage(templateName) {
    let xmlhttp;

    if(window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open('GET', templateName+'.html', true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200) {
                onPageLoaded(templateName, xmlhttp.response);
            } else if(xmlhttp.status == 404) {
                alert('404 : Template not found');
            } else {
                alert('Error : '+xmlhttp.status);
            }
        }
    }
}

function onPageLoaded(templateName, data) {
    // Load the markup
    $dimensionContent.html(data);
    
    // Launch the script for this page
    let pageScript = require('./'+templateName);

    pageScript.init();

}

module.exports = {
    init: init,
    changePage: changePage
};