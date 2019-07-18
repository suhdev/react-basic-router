import { produce } from 'immer';

export function parsePath(path: string, isExact: boolean) {
  const params = [];
  const newPath = path.replace(/:([^/]+)/gi, (_, group) => {
    params.push(group);
    return '([^/]+)';
  });

  const regex = new RegExp(`^${newPath}${isExact ? '$' : ''}`, 'i');
  const test = (pathToTest: string, currentParams: any = {}) => {
    regex.lastIndex = 0;
    const result = pathToTest.match(regex);
    if (!result) {
      return null;
    }
    return produce(currentParams || {}, (draft) => {
      params.forEach((param, i) => {
        draft[param] = result[i + 1];
      });
    });
  };
  return test;
}
