export const adjustViewport = (win: Window, doc: Document) => {
  let docEl: HTMLElement = doc.documentElement;
  let viewport: HTMLMetaElement | null = doc.querySelector('meta[name="viewport"]');
  let appVersion: string = win.navigator.appVersion.toLocaleLowerCase();
  let isIphone: RegExpMatchArray | null = appVersion.match(/iphone/gi);
  let devicePixelRatio: number = win.devicePixelRatio;
  let scale: number | undefined;
  let dpr: number | undefined;
  let refreshRootFont: NodeJS.Timeout | undefined;
  if (viewport) {
    let content: RegExpMatchArray | null | undefined = viewport.getAttribute('content')?.match(/initial-scale=([\d.]+)/);
    if (content) {
      scale = parseFloat(content[1]);
      dpr = parseInt((1 / scale).toString());
    }
  }
  if (!dpr && !scale) {
    if (isIphone) {
      if (devicePixelRatio === 3) {
        dpr = 3;
      } else if (devicePixelRatio === 2) {
        dpr = 2;
      } else {
        dpr = 1;
      }
    } else {
      dpr = 1;
    }
    scale = 1 / dpr;
  }
  docEl.setAttribute('data-dpr', (dpr || 1).toString());
  if (!viewport) {
    let metaElement: HTMLMetaElement = doc.createElement('meta');
    metaElement.setAttribute('name', 'viewport');
    metaElement.setAttribute(
      'content',
      'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no',
    );
    if (docEl.firstElementChild) {
      docEl.firstElementChild.appendChild(metaElement);
    } else {
      let wrap: HTMLDivElement = doc.createElement('div');
      wrap.appendChild(metaElement);
      doc.write(wrap.innerHTML);
    }
  }
  win.addEventListener(
    'resize',
    function () {
      clearTimeout(refreshRootFont);
      refreshRootFont = setTimeout(rootFont, 300);
    },
    false,
  );
  win.addEventListener(
    'pageshow',
    function (e: PageTransitionEvent) {
      if (e.persisted) {
        clearTimeout(refreshRootFont);
        refreshRootFont = setTimeout(rootFont, 300);
      }
    },
    false,
  );
  rootFont();

  function rootFont() {
    let width: number = docEl.clientWidth;
    if (width / dpr! > 540) {
      width = 540 * dpr!;
    }
    let rootFontSize: number = width / 10;
    // 设置根节点font-size
    docEl.style.fontSize = rootFontSize + 'px';
    // 矫正魅族 16系列以及三星s10系列在安卓webview下 1 rem !== 1 rootFontSize的问题
    let div: HTMLDivElement = document.createElement('div');
    div.style.width = '10rem';
    div.style.height = '0';
    document.body.appendChild(div);
    // 理想宽度
    let ideal: number = width;
    // 实际宽度
    let real: number = div.clientWidth;
    // 矫正比例
    let rmd: number = real / ideal;

    if (rmd !== 1) {
      docEl.style.fontSize = (rootFontSize / rmd) + 'px';
    }
    document.body.removeChild(div);
  }
}
