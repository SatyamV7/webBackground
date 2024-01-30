// webBg API
// API developed & maintained by Satyam Verma (github.com/SatyamV7)

import { webBgData } from './webBgDB.js';

export function webBg(ID, zIndex) {
    document.body.style.margin = '0';
    document.body.style.background = 'transparent';
    let e = document.createElement('div');
    e.id = 'webBackgroundFrame';
    e.style.cssText = 'position: fixed;width: 100%;height: 100%;z-index: 0;border: 0;padding: 0';
    const u = 'http://127.0.0.1:443'; // https://SatyamV7.github.io/webBackground/
    if (isNaN(ID) == false & ID <= webBgData.length & zIndex !== null & isNaN(zIndex) == false) {
        var zI = zIndex;
        console.log(`webBackground Configuration:`, '\n', `Background ID:`, ID, '\n', `Background Name:`, webBgData[ID].Name, '\n', `z-index for webBackgroundFrame:`, zI);
    }
    else {
        console.error(`Configuration for webBackground is invalid`);
    }
    e.innerHTML = `<iframe src="` + u + `/server/BG/` + webBgData[ID].ID + `/index.html" style="position: fixed;width: 100%;height: 100%;z-index: ` + zI + `;border: 0;padding: 0"></iframe>`;
    document.body.appendChild(e); var c = document.querySelector('#webBackgroundFrame');
    c.addEventListener('contextmenu', event => event.preventDefault());
    console.log(`webBackgroundDB:`, '\n', webBgData);
}
