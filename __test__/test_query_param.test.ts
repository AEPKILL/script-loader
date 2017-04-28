import addQueryParam from '../src/common/addQueryParam';

const url = 'http://script-loader.com/test.js';
const queryParam = 'callback=AEPKILL';

describe('测试 addQueryParam', () => {

  test('当参数不带查询字符串', () => {
    expect(addQueryParam(url, queryParam)).toBe(`${url}?${queryParam}`);
  });

  test('当参数带有查询字符串', () => {
    const queryString = '?name=aepkill';
    const tempUrl = url + queryString;
    expect(addQueryParam(tempUrl, queryParam)).toBe(tempUrl + queryParam);
  });

});
