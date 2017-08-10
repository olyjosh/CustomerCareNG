
// these variables can be configured 
var travelstartIframeId = 'travelstartIframe-aa889005-c36b-4095-a639-07edb95a931b';
var iframeUrl = 'https://www.travelstart.com.ng';
var logMessages = false;
var showBanners = false;
var affId = '200223';
var affCampaign = '';
var affCurrency = 'Default'; // ZAR / USD / NAD / ... 
var height = '0px';
var width = '100%';
var language = ''; // ar / en / leave empty for user preference

// do not change these 
var iframe = $('#' + travelstartIframeId);
var iframeVersion = '10';
var autoSearch = false;
var affiliateIdExist = false;
var urlParams = {};
var alreadyExist = [];
var iframeParams = [];
var cpySource = '';
var match,
        pl = /\+/g,
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) {
            return decodeURIComponent(s.replace(pl, " "));
        },
        query = window.location.search.substring(1);
while (match = search.exec(query)) {
    urlParams[decode(match[1])] = decode(match[2]);
}
for (var key in urlParams) {
    if (urlParams.hasOwnProperty(key)) {
        if (key == 'search' && urlParams[key] == 'true') {
            autoSearch = true;
        }
        if (key == 'affId' || key == 'affid' || key == 'aff_id') {
            affiliateIdExist = true;
        }
        iframeParams.push(key + '=' + urlParams[key]);
        alreadyExist.push(key);
    }
}
if (!('show_banners' in alreadyExist)) {
    iframeParams.push('show_banners=' + showBanners);
}
if (!('log' in alreadyExist)) {
    iframeParams.push('log=' + logMessages);
}
if (!affiliateIdExist) {
    iframeParams.push('affId=' + affId);
}
if (!affiliateIdExist) {
    iframeParams.push('language=' + language);
}
if (!('affCampaign' in alreadyExist)) {
    iframeParams.push('affCampaign=' + affCampaign);
}
if (cpySource !== '' && !('cpySource' in alreadyExist)) {
    iframeParams.push('cpy_source=' + cpySource);
}
if (!('utm_source' in alreadyExist)) {
    iframeParams.push('utm_source=affiliate');
}
if (!('utm_medium' in alreadyExist)) {
    iframeParams.push('utm_medium=' + affId);
}
if (!('isiframe' in alreadyExist)) {
    iframeParams.push('isiframe=true');
}
if (!('landing_page' in alreadyExist)) {
    iframeParams.push('landing_page=false');
}
if (affCurrency.length == 3) {
    iframeParams.push('currency=' + affCurrency);
}
if (!('iframeVersion' in alreadyExist)) {
    iframeParams.push('iframeVersion=' + iframeVersion);
}
if (!('host' in alreadyExist)) {
    iframeParams.push('host=' + window.location.href.split('?')[0]);
}
var newIframeUrl = iframeUrl + (autoSearch ? '/search-on-index?search=true' : '/search-on-index?search=false') + '&' + iframeParams.join('&');
iframe.attr('src', newIframeUrl);
function setIframeSize(newWidth, newHeight) {
    iframe.css('width', newWidth);
    iframe.width(newWidth);
    iframe.css('height', newHeight);
    iframe.height(newHeight);
}
setIframeSize(width, height);
$.receiveMessage(function (e, host) {
    if (logMessages) {
        $('#logs').text('RECEIVED *** ' + new Date() + ' *** ' + 'message=' + e.data + ' *** iframeUrl=' + newIframeUrl);
    }
    var dataElements = e.data.split('&');
    if (dataElements && dataElements.length === 1) {
        setIframeSize(width, e.data + 'px');
    } else {
        var elementKey = dataElements[0].split('=');
        var elementValue = dataElements[1].split('=');
        if (elementKey[1] === 'resize') {
            setIframeSize(width, elementValue[1] + 'px');
        }
        if (elementKey[1] === 'deeplink') {
            window.location.replace(unescape(elementValue[1]));
        }
    }
}, iframeUrl);
