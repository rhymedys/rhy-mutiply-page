/*
 *
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2019-11-22 14:37:18
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-11-26 14:53:37
 *
 * query参数：
 *      doctorOpenId:医生Id(必须)
 *      teptId:科室id
 * param参数：
 *      getConsultType:咨询类型(必须) "1"：图文 ,"2":电话
 */

import Vue from 'vue'
import App from './index.vue'
import router from './router'
import './index.css'
const vue = new Vue({
  el: '#root',
  render: h => h(App),
  router
})

export default vue
