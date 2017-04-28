import * as nock from 'nock';
import { deferred } from 'deferred-factory';

beforeAll(() => {
  nock('http://script-loader.com').get('/good_script.js').reply(200, `document.body.innerText = 'good';`);
});

test('load a good script', async () => {
  const script = document.createElement('script');
  const deferr = deferred<boolean>();

  script.src = 'http://script-loader.com/good_script.js';
  script.onload = () => {
    setTimeout(() => {
      deferr.resolve(true);
    }, 1000);
  };
  script.onerror = () => {
    deferr.resolve(false);
  };

  document.head.appendChild(script);

  console.log(await deferr.promise);
  console.log(document.documentElement.innerHTML);
});
