import {closeBrowser} from "./puppeteerApi";

module.exports = async () => {
  await closeBrowser();//关闭浏览器
};