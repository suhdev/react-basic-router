export function createHashHistory(win = window) {
  let path = win.location.hash.replace('#/', '/');
  let hasListener = false;
  let subs: ((path: string, prevPath: string) => void)[] = [];

  function getCurrentPath() {
    return path;
  }

  function listen(cb: (currentPath: string, prevPath: string) => void) {
    subs.push(cb);
    if (!hasListener) {
      registerListener();
    }
    return () => {
      subs = subs.filter(e => e !== cb);
      if (!subs.length) {
        unregisterListener();
      }
    };
  }

  const fn = () => {
    const prevPath = path;
    path = location.hash.replace('#/', '/');
    for (const s of subs) {
      s(path, prevPath);
    }
  };

  function registerListener() {
    win.addEventListener('hashchange', fn);
    hasListener = true;
  }

  function unregisterListener() {
    win.removeEventListener('hashchange', fn);
    hasListener = false;
  }

  return {
    getCurrentPath,
    listen,
  };
}
