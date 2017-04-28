import * as nock from 'nock';
import { loadScript, loadScriptDefaultOptions } from '../src/loadScript';
import { deferred } from 'deferred-factory';

describe('测试 loadscript ', () => {

  test('测试加载一个存在的脚本', async () => {
    expect(await loadScriptHelper('http://script-loader.com/good_script.js')).toBe(true);
  });

  test('测试加载一个不存在的脚本', async () => {
    expect(await loadScriptHelper('http://script-loader.com/bad_script.js')).toBe(false);
  });

  test('测试超时是否有效', async () => {
    expect(await loadScriptHelper('http://script-loader.com/delay_good_script.js', { timeout: 1000 })).toBe(false);
  });

  test('测试超时是否有效2', async () => {
    expect(await loadScriptHelper('http://script-loader.com/delay_good_script.js', { timeout: 5000 })).toBe(true);
  });

});

beforeEach(() => {
  nock('http://script-loader.com').get('/good_script.js').reply(200, `document.body.innerText = 'good';`);
  nock('http://script-loader.com').get('/delay_good_script.js').delayBody(2000).reply(200, `document.body.innerText = 'good';`);
  nock('http://script-loader.com').get('/bad_script.js').replyWithError('error');
});

function loadScriptHelper(src: string, { timeout }: Partial<typeof loadScriptDefaultOptions> = loadScriptDefaultOptions) {
  const deffer = deferred<boolean>();
  loadScript(src, {
    timeout,
    onSuccess() {
      deffer.resolve(true);
    },
    onError() {
      deffer.resolve(false);
    }
  });
  return deffer.promise;
}
