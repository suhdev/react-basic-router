"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hash_history_1 = require("./hash-history");
describe('hash-history', () => {
    test('should return current path', () => {
        const history = hash_history_1.createHashHistory({
            location: {
                hash: '#/',
            },
        });
        expect(history.getCurrentPath()).toEqual('/');
    });
    test('should register event listeners correctly', () => {
        const wind = {
            location: {
                hash: '#/',
            },
            addEventListener: () => { },
            removeEventListener: () => { },
        };
        const onChange = jest.fn(() => { });
        const addSpy = spyOn(wind, 'addEventListener');
        const removeSpy = spyOn(wind, 'removeEventListener');
        const history = hash_history_1.createHashHistory(wind);
        expect(history.getCurrentPath()).toEqual('/');
        expect(addSpy).not.toHaveBeenCalled();
        expect(removeSpy).not.toHaveBeenCalled();
        const unlisten = history.listen(onChange);
        expect(addSpy).toHaveBeenCalledTimes(1);
        expect(removeSpy).not.toHaveBeenCalled();
        unlisten();
        expect(addSpy).toHaveBeenCalledTimes(1);
        expect(removeSpy).toHaveBeenCalledTimes(1);
    });
    test('should register event listeners once', () => {
        const wind = {
            location: {
                hash: '#/',
            },
            addEventListener: () => { },
            removeEventListener: () => { },
        };
        const onChange1 = jest.fn(() => { });
        const onChange2 = jest.fn(() => { });
        const addSpy = spyOn(wind, 'addEventListener');
        const removeSpy = spyOn(wind, 'removeEventListener');
        const history = hash_history_1.createHashHistory(wind);
        expect(history.getCurrentPath()).toEqual('/');
        expect(addSpy).not.toHaveBeenCalled();
        expect(removeSpy).not.toHaveBeenCalled();
        const unlisten1 = history.listen(onChange1);
        const unlisten2 = history.listen(onChange2);
        expect(addSpy).toHaveBeenCalledTimes(1);
        expect(removeSpy).not.toHaveBeenCalled();
        unlisten1();
        expect(removeSpy).not.toHaveBeenCalled();
        unlisten2();
        expect(removeSpy).toHaveBeenCalledTimes(1);
    });
});
