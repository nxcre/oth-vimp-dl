// ==UserScript==
// @name         OTH ViMP Video DL Button
// @namespace    https://github.com/nxcre/oth-vimp-dl
// @version      0.7.1
// @description  Adds a download button below and renames the video appropiately.
// @description:de  Fuegt einen Download Button unter dem Video hinzu und benennt es passend um.
// @author       nxcre
// @license      MIT License
// @downloadURL  https://github.com/nxcre/oth-vimp-dl/raw/master/oth-vimp-dl-button.user.js
// @updateURL    https://github.com/nxcre/oth-vimp-dl/raw/master/oth-vimp-dl-button.user.js
// @match        https://vimp.oth-regensburg.de/video/*
// @match        https://vimp.oth-regensburg.de/m/*
// @grant        GM_setClipboard
// @grant        GM_download
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Options
    var debug = false;
    var autoDownload = false;
    var highlighted = false;

    if(debug) {
        console.log("Debug Log for oth-vimp-dl-button.user.js:");
    }
    var vTitle = document.getElementById("p_video").getElementsByTagName("img")[0].title;
    var vURL = document.getElementById("p_video").getElementsByTagName("source")[0].src;

    // Get the date string with leading 0
    var textDate = document.getElementsByClassName("uploader clearfix")[0].children[2].innerHTML.substr(40);
    if (textDate.charAt(0)=="v"){
        var origDate = new Date();
        textDate = textDate.substr(4, 2);
        origDate.setHours(-parseInt(textDate));
        var month = new Array();
        month[0] = "Januar";
        month[1] = "Februar";
        month[2] = "März";
        month[3] = "April";
        month[4] = "Mai";
        month[5] = "Juni";
        month[6] = "Juli";
        month[7] = "August";
        month[8] = "September";
        month[9] = "Oktober";
        month[10] = "November";
        month[11] = "Dezember";
        textDate = month[origDate.getMonth()];

        textDate = origDate.getDate() + ". " + textDate + " " + origDate.getFullYear();
    }
    if (textDate.charAt(1)=="."){
        textDate = "0" + textDate;
    }


    // Convert the date string to ISO date string
    var isoday = textDate.substr(0,2);
    var isomonth = "ERROR";
    var isoyear = textDate.substr(-4);
    textDate = textDate.substr(4);
    textDate = textDate.substr(0,textDate.length -5);
    switch(textDate) {
        case "Januar":
            isomonth = "01";
            break;
        case "Februar":
            isomonth = "02";
            break;
        case "März":
            isomonth = "03";
            break;
        case "April":
            isomonth = "04";
            break;
        case "Mai":
            isomonth = "05";
            break;
        case "Juni":
            isomonth = "06";
            break;
        case "Juli":
            isomonth = "07";
            break;
        case "August":
            isomonth = "08";
            break;
        case "September":
            isomonth = "09";
            break;
        case "Oktober":
            isomonth = "10";
            break;
        case "November":
            isomonth = "11";
            break;
        case "Dezember":
            isomonth = "12";
            break;
        default:
            isomonth = "ERROR";
    }

    var sep = "-";

    var vDate = isoyear + sep + isomonth + sep + isoday;

    if(debug) {
        console.log("\n Debug: \t" + debug
                    + "\n AutoDownload: \t" + autoDownload
                    + "\n Highlighted:  \t" + highlighted
                    + "\n\n Video Title:  \t" + vTitle
                    + "\n Video URL:  \t" + vURL
                    + "\n Date:  \t" + vDate
                    + "\n\n textDate:  \t" + textDate
                    + "\n isoDay:  \t" + isoday
                    + "\n isoMonth:  \t" + isomonth
                    + "\n isoYear:  \t" + isoyear);
    }

    // Download the video automatically right after loading the page
    if(autoDownload) {
        if(debug) {
            console.log("\nStart Downloading:  \"" + vDate + " " + vTitle + ".mp4\" - From URL: " + vURL);
        }
        GM_download(vURL, vDate + " " + vTitle + ".mp4");
    }

    // Create the "DOWNLOAD" button after the share button below the video
    var vimpDLNode = document.getElementsByClassName("buttonpane clearfix")[0];
    vimpDLNode.innerHTML = vimpDLNode.innerHTML + '<a id="vimpDLButton" class="btn" href="' + vURL + '" download="' + vDate + ' ' + vTitle + '.mp4">DOWNLOAD</a>';

    if(debug) {
        console.log("\n vimpDLNode:  \t" + vimpDLNode);
    }

    // Highlight the newly added button
    if(highlighted) {
        GM_addStyle ( `
    	#vimpDLButton {
    		box-shadow:inset 0px 1px 0px 0px #9acc85;
    		background:linear-gradient(to bottom, #74ad5a 5%, #68a54b 100%);
    		background-color:#74ad5a;
    		border:1px solid #3b6e22;
    		display:inline-block;
    		cursor:pointer;
    		color:#ffffff;
    		font-family:Arial;
    		font-size:14px;
    		font-weight:bold;
    		padding:10px 16px;
    		text-decoration:none;
    	}
    	#vimpDLButton:hover {
    		background:linear-gradient(to bottom, #68a54b 5%, #74ad5a 100%);
    		background-color:#68a54b;
    	}
    	#vimpDLButton:active {
    		position:relative;
    		top:1px;
    	}
        ` );
    }
})();
