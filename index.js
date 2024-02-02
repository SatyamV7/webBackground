// webBg Module
// Module developed & maintained by Satyam Verma (github.com/SatyamV7)

import { webBgData } from './webBgDB.js';

export function webBg(ID, zIndex) {
    document.body.style.cssText = `margin: 0px;background: transparent;position: relative;z-index: 1;`
    let e = document.createElement('iframe');
    e.id = 'webBackgroundFrame';
    const u = 'http://127.0.0.1:443/'; // https://SatyamV7.github.io/webBackground/
    if (isNaN(ID) == false & ID <= webBgData.length & zIndex !== null & isNaN(zIndex) == false) {
        var zI = zIndex;
        console.log(`webBackground Configuration:`, '\n', `Background ID:`, ID, '\n', `Background Name:`, webBgData[ID].Name, '\n', `z-index for webBackgroundFrame:`, zI);
    }
    else {
        zI = -1
        console.error(`Configuration for webBackground is invalid`);
    }
    e.style.cssText = `display: flex;position: fixed;width: 100vw;height: 100vh;z-index: ` + zI + `;overflow: hidden;border: 0;padding: 0;`;
    e.src = u + `/server/BG/` + webBgData[ID].ID + `/index.html`
    document.body.appendChild(e); var c = document.querySelector('#webBackgroundFrame');
    c.addEventListener('contextmenu', event => event.preventDefault());
    console.log(`webBackgroundDB:`, '\n', webBgData);
}
