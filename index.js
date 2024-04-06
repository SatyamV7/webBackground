// webBg Module
// Module developed & maintained by Satyam Verma (github.com/SatyamV7)

import { webBgData } from './webBgDB.js';

function webBg(ID, zIndex) {
    document.body.style.cssText = `margin: 0px;background: transparent;position: relative;z-index: 1;`;
    document.body.insertAdjacentHTML = document.body, ` <!-- Code injected by webBackground -->`;
    let e = document.createElement('iframe');
    e.id = 'webBackgroundFrame';
    if (isNaN(ID) == false & ID <= webBgData.length & zIndex !== null & isNaN(zIndex) == false) {
        var zI = zIndex;
        console.log(`webBackground Configuration:`, '\n', `Background ID:`, ID, '\n', `Background Name:`, webBgData[ID].Name, '\n', `z-index for webBackgroundFrame:`, zI);
    }
    else {
        zI = -1;
        console.error(`Configuration for webBackground is invalid`);
    }
    e.src = webBgData[ID].URL;
    e.style.cssText = `display: flex;position: fixed;width: 100vw;height: 100vh;z-index: ` + zI + `;overflow: hidden;border: 0;padding: 0;`;
    document.body.appendChild(e); var c = document.querySelector('#webBackgroundFrame');
    c.addEventListener('contextmenu', event => event.preventDefault());
    console.log(`webBackgroundDB:`, '\n', webBgData);
}

export { webBg, webBgData }
