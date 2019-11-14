// const puppeteer = require('puppeteer');
import puppeteer from 'puppeteer'

const test =async ()=>{
  const browser = await puppeteer.launch();
  console.log(await browser.version());
  await browser.close();
  console.log('测试');
};

export default test;