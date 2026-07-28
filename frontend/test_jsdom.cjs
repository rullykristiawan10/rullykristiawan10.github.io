const { JSDOM } = require('jsdom');
const jsdom = require('jsdom');

async function test() {
  const dom = new JSDOM('', {
    url: "https://rullykristiawan10-github-io.vercel.app/",
    runScripts: "dangerously",
    resources: "usable"
  });
  dom.window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error("PAGE ERROR:", msg, error);
  };
  dom.window.addEventListener('error', (event) => {
    console.error("Listener PAGE ERROR:", event.error);
  });
  dom.window.addEventListener('unhandledrejection', (event) => {
    console.error("Unhandled Promise Rejection:", event.reason);
  });
  
  const originalConsoleError = dom.window.console.error;
  dom.window.console.error = function() {
    console.log("REACT CONSOLE ERROR:", ...arguments);
    originalConsoleError.apply(this, arguments);
  };

  const html = await fetch("https://rullykristiawan10-github-io.vercel.app/").then(r => r.text());
  
  const dom2 = new JSDOM(html, {
    url: "https://rullykristiawan10-github-io.vercel.app/",
    runScripts: "dangerously",
    resources: "usable"
  });
  
  dom2.window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error("PAGE ERROR2:", msg, error);
  };
  dom2.window.addEventListener('error', (event) => {
    console.error("Listener PAGE ERROR2:", event.error);
  });
  
  const originalConsoleError2 = dom2.window.console.error;
  dom2.window.console.error = function() {
    console.log("REACT CONSOLE ERROR2:", ...arguments);
    originalConsoleError2.apply(this, arguments);
  };
  
  setTimeout(() => {
    console.log("Root element content:", dom2.window.document.getElementById('root')?.innerHTML.slice(0, 100));
    process.exit(0);
  }, 10000);
}

test();
