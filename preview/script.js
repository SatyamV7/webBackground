import { webBg, webBgData } from '../index.js';
var l = webBgData.length - 1;
var ID = window.prompt('Enter Background ID' + '\n' + '(Any integer from 0 - ' + l + ')');
webBg(ID, -1);
let e = document.createElement('span');
e.style.cssText = `text-align: center;`;
var pStyle = 'text-indent: 50%;font-size: 20px;text-wrap: nowrap;';
if (webBgData[ID].Author == null || webBgData[ID].Author == '' || webBgData[ID].Author == ' ') {
    e.innerHTML = `<p style="margin: 0">` + webBgData[ID].Name + `</p>` + `<p style="` + pStyle + `">~ by Anonymous</p>`;
}
else {
    e.innerHTML = `<p style="margin: 0">` + webBgData[ID].Name + `</p>` + `<p style="` + pStyle + `">~ by ` + webBgData[ID].Author + `</p>`;
}
document.body.appendChild(e);