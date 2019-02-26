/**
 * async load script
 */

let loadPromise = null;

export default class ApiLoader {
  constructor(urlList = []) {
    this.urlList = urlList.map(url => {
      if (url.indexOf('http') > -1) {
        return url;
      } else {
        return `${window.location.protocol}//${url}`;
      }
    });
  }

  scriptLoadPromise(url) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.src = url;
    const promise = new Promise(resolve => {
      script.onload = () => {
        resolve();
      };
    });
    document.body.appendChild(script);
    return promise;
  }

  buildChainPromise() {
    return this.urlList.reduce((promise, url) => {
      return promise.then(() => this.scriptLoadPromise(url));
    }, Promise.resolve());
  }

  load() {
    loadPromise = loadPromise || this.buildChainPromise();
    return new Promise(resolve => {
      loadPromise.then(() => {
        resolve();
      });
    });
  }
}
