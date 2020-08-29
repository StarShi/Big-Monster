/*
 * @description: 
 * @author: Star Shi
 * @Date: 2020-08-25 19:54:34
 * @LastEditTime: 2020-08-29 10:19:32
 */
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }

  // 初始化
  this._init(options)
}
// 挂载初始化方法
initMixin(Vue)
// 挂载状态处理方法
stateMixin(Vue)
// 挂载事件处理方法
eventsMixin(Vue)
// 挂载生命周期方法
lifecycleMixin(Vue)
// 挂载渲染方法
renderMixin(Vue)

export default Vue
