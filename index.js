function webBg(Bg) {
    document.querySelector('body').style.margin = '0';
    document.querySelector('body').innerHTML = `<iframe id="webBackgroundFrame" src="https://satyamv7.github.io/webBackground/BG/` + Bg + `/index.html" style="position: absolute;width: 100%;height: 100%;z-index: -1;border: 0;padding: 0;"></iframe>`; 
    document.querySelector('#webBackgroundFrame').addEventListener('contextmenu', event => event.preventDefault());
}
