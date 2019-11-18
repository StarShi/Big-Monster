let is_test = process.env.NODE_ENV === 'test' ? true : false;
const config = {
  is_test: is_test,
  domain_name: is_test ? 'https://www.baidu.com' : 'https://www.baidu.com',
  temp_dir: 'jest_puppeteer_global_setup'
};

module.exports = config;
