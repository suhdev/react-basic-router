"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createHashHistory(win = window) {
    let path = win.location.hash.replace('#/', '/');
    let hasListener = false;
    let subs = [];
    function getCurrentPath() {
        return path;
    }
    function listen(cb) {
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
exports.createHashHistory = createHashHistory;
