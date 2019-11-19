import puppeteer from 'puppeteer';
import fs from 'fs';
import os from 'os';
import path from 'path';
import mkdirp from 'mkdirp';
import config from './test.config.js';

const DIR = path.join(os.tmpdir(), config.temp_dir);//创建缓存路径

//打开浏览器
const openBrowser = async () => {
  const args = [
    '--allow-running-insecure-content',  //允许不安全的脚本
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--auto-open-devtools-for-tabs',//自动打开开发者工具
    '--disable-dev-shm-usage'
  ];
  // args.push('--proxy-server='+config.domain_name);//代理
  const browser = await puppeteer.launch({
    headless: !config.is_test,
    args
  });

  const pages = await browser.pages();
  let page = pages && pages.length ? pages[0] : await browser.newPage();
  await page.goto(config.domain_name);
  await page.setViewport({
    width: 1920,
    height: 1080
  });
  const token = 'token';//设置token
  if (token) {
    await page.evaluate((token) => {
      window.localStorage.setItem('token', token);
    }, token);
  }

  mkdirp.sync(DIR);//根据缓存路径创建换成空间
  fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());//保存wsEndpoint
};

//获取浏览器
const getBrowser = async () => {
  const wsEndpoint = fs.readFileSync(path.join(DIR, 'wsEndpoint'), 'utf8');
  if (!wsEndpoint) {
    throw new Error('wsEndpoint not found')
  }
  return await puppeteer.connect({
    browserWSEndpoint: wsEndpoint,
  });
};

//关闭浏览器
const closeBrowser = async () => {
  let browser = await getBrowser();
  browser.close();
};

//打开新页面
const openNewPage = async () => {
  let browser = await getBrowser();
  return await browser.newPage();
};

export {openBrowser,getBrowser, closeBrowser, openNewPage}