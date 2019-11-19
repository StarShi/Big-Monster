const NodeEnvironment = require('jest-environment-node');
const puppeteer = require('puppeteer');
const fs = require('fs');
const os = require('os');
const path = require('path');
const globalConfig = require('./test.config.js');

const DIR = path.join(os.tmpdir(), globalConfig.temp_dir);

class PuppeteerEnvironment extends NodeEnvironment {

  constructor(config) {
    super(config)
  }

  async setup() {
    await super.setup();
    const wsEndpoint = fs.readFileSync(path.join(DIR, 'wsEndpoint'), 'utf8');
    if (!wsEndpoint) {
      throw new Error('wsEndpoint not found')
    }
    const browser = await puppeteer.connect({
      browserWSEndpoint: wsEndpoint,
    });

    const page_list = await browser.pages();
    for (let i = 0, size = page_list.length; i < size; i++) {
      const page = page_list[i];
      //判断域名，如果不判断页面域名直接调用window.localStorage，会报错的
      if (page.url().indexOf(globalConfig.domain_name) >= 0) {
        this.global.__TOKEN__ = await page.evaluate(() => {
          return window.localStorage.getItem('token')
        });
        break
      }
    }
    browser.openNewPage = async (mockRequest) => {
      const page = await browser.newPage();
      await page.setRequestInterception(true);
      page.on('request', interceptedRequest => {
        const url = interceptedRequest.url();
        if (mockRequest) {
          mockRequest(interceptedRequest);
        } else {
          interceptedRequest.continue();
        }
      });
      this.global.page = page;
      page.on('close', () => {
        this.global.pageClosed = true
      });
      return page;
    };
    this.global.__BROWSER__ = browser;
  }

  async teardown() {
    if (this.global.page && !this.global.pageClosed) {
      console.log('this.page=', this.global.page.url())
      await this.global.page.close()
    }
    if (this.global.__BROWSER__) {
      await this.global.__BROWSER__.disconnect()
    }
    await super.teardown()
  }

  runScript(script) {
    return super.runScript(script)
  }
}

module.exports = PuppeteerEnvironment;
