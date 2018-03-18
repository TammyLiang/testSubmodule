import Vue from 'vue'
import Router from 'vue-router'
import '../common/window';
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Game',
      component: resolve => require(['../views/game/game'], resolve),
    },
    // 背包
    {
      path: '/knapsack',
      name: 'knapsack',
      component: resolve => require(['../views/knapsack/knapsack'], resolve),
    },
    // 抽奖
    {
      path: '/luckdraw',
      name: 'kuckdraw',
      component: resolve => require(['../views/luckdraw/luckdraw'], resolve)
    },
    // 个人
    {
      path: '/personal',
      name: 'Personal',
      component: resolve => require(['../views/personal/personal'], resolve),
      children: [
        {
          path: '/customer',
          component: resolve => require(['../views/customer/customer'], resolve),
        },
        //投注记录
        {
          path: '/betting/record',
          name: 'bettingRecord',
          component: resolve => require(['../views/recordAndDetails/recordAndDetails'], resolve),
        },
        //资金明细
        {
          path: '/capital/detail',
          name: 'capitalDetail',
          component: resolve => require(['../views/recordAndDetails/recordAndDetails'], resolve),
        },
        // 我的消息
        {
          path: '/my/news',
          name: 'MyNews',
          component: resolve => require(['../views/mynews/mynews'], resolve),
        },

        // 邀请好友
        {
            path: '/invite',
            name: 'invite',
            component: resolve => require(['../views/invite/invite'], resolve),
        },
        // 我邀请的好友
        {
            path: '/myInvite',
            name: 'myInvite',
            component: resolve => require(['../views/myInvite/myInvite'], resolve),
        },
        // 幸运转盘
        {
            path : '/turntable/luckyTurntable',
            name: 'luckyTurntable',
            component: resolve => require(['components/luckyTurntable/turntable'], resolve),
        },
        //幸运转盘 -- 参与
        {
            path : '/turntable/luckyRecharge',
            name: 'luckyRecharge',
            component: resolve => require(['components/luckyTurntable/recharge'], resolve),
        }
      ]
    },
    {
        path : '/loginPop',
        name: 'loginPop',
        component: resolve => require(['components/loginPop/loginpop'], resolve),
    }
  ] 
})
