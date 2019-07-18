import { parsePath } from './util';

describe('router/util', () => {
  const currentPath = '/test/123';
  [
    { path: '/data', isExact: false, result: null },
    { path: '/data/:id', isExact: false, result: null },
    { path: '/data/:id/:boxId', isExact: false, result: null },
    { path: '/test', isExact: true, result: null },
    { path: '/test/12', isExact: true, result: null },
    { path: '/test/124', isExact: false, result: null },
    { path: '/test/:id', isExact: false, result: { id: '123' } },
    { path: '/test/:testId', isExact: false, result: { testId: '123' } },
  ]
    .forEach(({ path, isExact, result }) => {
      test(`parsePath ${path} - ${isExact ? 'Exact' : 'Not Exact'}`, () => {
        const testFn = parsePath(path, isExact);
        expect(testFn(currentPath)).toEqual(result);
      });
    });
});
