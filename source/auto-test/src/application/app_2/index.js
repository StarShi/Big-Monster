const Nightmare = require('nightmare')
const assert = require('assert')

describe('Load a Page', function() {
    // 设置超时时间
    this.timeout('30s')

    let nightmare = null
    beforeEach(() => {
        nightmare = new Nightmare()
    })

    it('should load locaohos:8000 success', done => {
        // 实际开发中访问的url可能是这`http://localhost:port/path`
        nightmare.goto('http://localhost:8000/')
            .end()
            .then(function (result) { done() })
            .catch(done)
    })

    it('should load baidu(/home page) success', done => {
        // 访问百度
        nightmare.goto('http://www.baidu.com/')
            .end()
            .then(function (result) { done() })
            .catch(done)
    })

    it('should load without error', done => {
        // 访问谷歌根目录，会error(大家懂的)
        nightmare.goto('https://www.google.com/')
            .end()
            .then(function (result) { done() })
            .catch(done)
    })

    it('should load without error', done => {
        // 访问谷歌根目录下的webhp页面，会error(大家懂的)
        nightmare.goto('https://www.google.com/webhp')
            .end()
            .then(function (result) { done() })
            .catch(done)
    })
})