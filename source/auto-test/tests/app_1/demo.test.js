import {getBrowser,openNewPage} from "../../utils/puppeteerApi";


describe('ly.com demo cases', () => {
  let page = null;
  beforeEach(async () => {
    page = await openNewPage();
    await page.goto('https://www.ly.com/');
  });
  afterEach(async ()=> {
    await page.close();
  });
  test('test-ly-demo', async () => {
    const logo = await page.$eval('.logo', el => el.getAttribute('title'));
    await expect(logo).toEqual('旅游');
  });
});

describe('baidu demo cases', () => {
  let page = null;
  beforeEach(async () => {
    page = await openNewPage();
    await page.goto('https://baidu.com/');
  });
  afterEach(async ()=> {
    await page.close();
  });
  test('test-ly-demo', async () => {
    await page.type('#kw', '测试',{delay: 100});
    page.click('#su');
    await page.waitFor(1000);
  });
});