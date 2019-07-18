"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immer_1 = require("immer");
function parsePath(path, isExact) {
    const params = [];
    const newPath = path.replace(/:([^/]+)/gi, (_, group) => {
        params.push(group);
        return '([^/]+)';
    });
    const regex = new RegExp(`^${newPath}${isExact ? '$' : ''}`, 'i');
    const test = (pathToTest, currentParams = {}) => {
        regex.lastIndex = 0;
        const result = pathToTest.match(regex);
        if (!result) {
            return null;
        }
        return immer_1.produce(currentParams || {}, (draft) => {
            params.forEach((param, i) => {
                draft[param] = result[i + 1];
            });
        });
    };
    return test;
}
exports.parsePath = parsePath;
