import generatorCallbackName from '../src/common/generatorCallbackName';
import { isString } from 'lodash';
import { deferred } from 'deferred-factory';

describe('测试 generatorCallbackName', () => {

  test('测试 generatorCallbackName 是否会产生重复的 callback name', async () => {
    const set = new Set();
    let testCount = 100;
    while (testCount--) {
      const name = generatorCallbackName();
      expect(set.has(name)).toBe(false);
      set.add(name);
      await (Sleep(0) as any);
    }
  });

  test('测试 generatorCallbackName 是否会产生重复的非法的 callback name', async () => {
    let testCount = 100;
    while (testCount--) {
      const name = generatorCallbackName();
      expect(isLegalVarName(name)).toBe(true);
      await (Sleep(0) as any);
    }
  });

});

function Sleep(time: number) {
  const defer = deferred<null>();
  setTimeout(() => {
    defer.resolve(null);
  }, time);
  return defer.promise;
}

const isLegalVarNameReg = /^[$A-Za-z_]+\w*/;
function isLegalVarName(name: string) {
  if (isString(name)) {
    return isLegalVarNameReg.test(name);
  }
  return false;
}
