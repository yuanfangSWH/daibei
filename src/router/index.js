import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component:()=> import('@/pages/login/Login'),
      meta: {
        show: false,
        title: '后台登录'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component:()=> import('@/pages/login/Login'),
      meta: {
        show: false,
        title: '后台登录'
      }
    },
    {
      path: '/banktag',
      name: 'Banktag',
      component:()=> import('@/pages/banktag/Banktag'),
      meta: {
        show: true,
        title: '拉新产品标签',
        name: '产品管理'
      }
    },
    {
      path: '/addbanktag',
      name: 'Addbanktag',
      component:()=> import('@/pages/addbanktag/Addbanktag'),
      meta: {
        show: true,
        title: '添加拉新产品标签',
        name: '产品管理'
      }
    },
    {
      path: '/editbanktag',
      name: 'Editbanktag',
      component:()=> import('@/pages/editbanktag/Editbanktag'),
      meta: {
        show: true,
        title: '编辑拉新产品标签',
        name: '产品管理'
      }
    },
    {
      path: '/bank',
      name: 'Bank',
      component:()=> import('@/pages/bank/Bank'),
      meta: {
        show: true,
        title: '银行产品',
        name: '产品管理'
      }
    },
    {
      path: '/addbank',
      name: 'Addbank',
      component:()=> import('@/pages/addbank/Addbank'),
      meta: {
        show: true,
        title: '添加银行产品',
        name: '产品管理'
      }
    },
    {
      path: '/editbank',
      name: 'Editbank',
      component:()=> import('@/pages/editbank/Editbank'),
      meta: {
        show: true,
        title: '编辑银行产品',
        name: '产品管理'
      }
    },
    {
      path: '/creditcard',
      name: 'Creditcard',
      component:()=> import('@/pages/creditcard/Creditcard'),
      meta: {
        show: true,
        title: '拉新产品',
        name: '产品管理'
      }
    },
    {
      path: '/creditcard/addcreditcard',
      name: 'Addcreditcard',
      component:()=> import('@/pages/creditcard/addcreditcard/Addcreditcard'),
      meta: {
        show: true,
        title: '添加拉新产品',
        name: '产品管理'
      }
    },
    {
      path: '/creditcard/Editcreditcard',
      name: 'Editcreditcard',
      component:()=> import('@/pages/creditcard/editcreditcard/Editcreditcard'),
      meta: {
        show: true,
        title: '编辑拉新产品',
        name: '产品管理'
      }
    },
    {
      path: '/loantag',
      name: 'Loantag',
      component:()=> import('@/pages/loantag/Loantag'),
      meta: {
        show: true,
        title: '贷款产品标签',
        name: '产品管理'
      }
    },
    {
      path: '/loantag/addloantag',
      name: 'Addloantag',
      component:()=> import('@/pages/loantag/addloantag/Addloantag'),
      meta: {
        show: true,
        title: '添加贷款产品标签',
        name: '产品管理'
      }
    },
    {
      path: '/loantag/editloantag',
      name: 'Editloantag',
      component:()=> import('@/pages/loantag/editloantag/Editloantag'),
      meta: {
        show: true,
        title: '编辑贷款产品标签',
        name: '产品管理'
      }
    },
    {
      path: '/loan',
      name: 'Loan',
      component:()=> import('@/pages/loan/Loan'),
      meta: {
        show: true,
        title: '贷款产品',
        name: '产品管理'
      }
    },
    {
      path: '/loan/Addloan',
      name: 'Addloan',
      component:()=> import('@/pages/loan/addloan/Addloan'),
      meta: {
        show: true,
        title: '添加贷款产品',
        name: '产品管理'
      }
    },
    {
      path: '/loan/editloan',
      name: 'Editloan',
      component:()=> import('@/pages/loan/editloan/Editloan'),
      meta: {
        show: true,
        title: '编辑贷款产品',
        name: '产品管理'
      }
    },
    {
      path: '/order/cardorder',
      name: 'Cardorder',
      component:()=> import('@/pages/order/cardorder/Cardorder'),
      meta: {
        show: true,
        title: '拉新订单',
        name: '订单管理'
      }
    },
    {
      path: '/order/loanorder',
      name: 'Loanorder',
      component:()=> import('@/pages/order/loanorder/Loanorder'),
      meta: {
        show: true,
        title: '贷款订单',
        name: '订单管理'
      }
    },
    {
      path: '/order/team',
      name: 'Team',
      component:()=> import('@/pages/order/team/Team'),
      meta: {
        show: true,
        title: '团队奖金',
        name: '团队奖金'
      }
    },
    {
      path: '/bbs/newstag',
      name: 'Newstag',
      component:()=> import('@/pages/bbs/newstag/Newstag'),
      meta: {
        show: true,
        title: '头条分类',
        name: '社区管理'
      }
    },
    
    {
      path: '/bbs/addnewstag',
      name: 'Addnewstag',
      component:()=> import('@/pages/bbs/addnewstag/Addnewstag'),
      meta: {
        show: true,
        title: '添加头条分类',
        name: '社区管理'
      }
    },

    {
      path: '/bbs/yhmp',
      name: 'Addnewstag',
      component:()=> import('@/pages/bbs/yhmp/Yhmp'),
      meta: {
        show: true,
        title: '名片文案',
        name: '社区管理'
      }
    },
    
    {
      path: '/bbs/Edityhmp',
      name: 'Edityhmp',
      component:()=> import('@/pages/bbs/edityhmp/Edityhmp'),
      meta: {
        show: true,
        title: '编辑名片文案',
        name: '社区管理'
      }
    },
    {
      path: '/bbs/Addyhmp',
    name: 'Addyhmp',
    component:()=> import('@/pages/bbs/addyhmp/Addyhmp'),
    meta: {
      show: true,
      title: '添加名片文案',
      name: '社区管理'
      }
    },


   
    
    {
      path: '/bbs/editnewstag',
      name: 'Editnewstag',
      component:()=> import('@/pages/bbs/editnewstag/Editnewstag'),
      meta: {
        show: true,
        title: '编辑头条分类',
        name: '社区管理'
      }
    },
    {
      path: '/bbs/newslist',
      name: 'Newslist',
      component:()=> import('@/pages/bbs/newslist/Newslist'),
      meta: {
        show: true,
        title: '头条列表',
        name: '社区管理'
      }
    },
    {
      path: '/bbs/addnews',
      name: 'Addnews',
      component:()=> import('@/pages/bbs/addnews/Addnews'),
      meta: {
        show: true,
        title: '发布头条列表',
        name: '社区管理'
      }
    },
    {
      path: '/bbs/editnews',
      name: 'Editnews',
      component:()=> import('@/pages/bbs/editnews/Editnews'),
      meta: {
        show: true,
        title: '编辑头条列表',
        name: '社区管理'
      }
    },
    {
      path: '/bbs/bbstag',
      name: 'Bbstag',
      component:()=> import('@/pages/bbs/bbstag/Bbstag'),
      meta: {
        show: true,
        title: '社区板块',
        name: '社区管理'
      }
    },
    {
      path: '/bbs/addbbstag',
      name: 'Addbbstag',
      component:()=> import('@/pages/bbs/addbbstag/Addbbstag'),
      meta: {
        show: true,
        title: '添加社区板块',
        name: '社区管理'
      }
    },
    {
      path: '/bbs/editbbstag',
      name: 'Editbbstag',
      component:()=> import('@/pages/bbs/editbbstag/Editbbstag'),
      meta: {
        show: true,
        title: '编辑社区板块',
        name: '社区管理'
      }
    },
    {
      path: '/bbs/bbslist',
      name: 'Bbslist',
      component:()=> import('@/pages/bbs/bbslist/Bbslist'),
      meta: {
        show: true,
        title: '帖子列表',
        name: '社区管理'
      }
    },
    {
      path: '/bbs/addbbs',
      name: 'Addbbs',
      component:()=> import('@/pages/bbs/addbbs/Addbbs'),
      meta: {
        show: true,
        title: '添加帖子',
        name: '社区管理'
      }
    },
    {
      path: '/bbs/editbbs',
      name: 'Editbbs',
      component:()=> import('@/pages/bbs/editbbs/Editbbs'),
      meta: {
        show: true,
        title: '编辑帖子',
        name: '社区管理'
      }
    },
    {
      path: '/bbs/shenhebbs',
      name: 'Shenhebbs',
      component:()=> import('@/pages/bbs/shenhebbs/Shenhebbs'),
      meta: {
        show: true,
        title: '审核帖子',
        name: '社区管理'
      }
    },
    {
      path: '/guide/notice',
      name: 'notice',
      component: () => import('@/pages/guide/notice/notice'),
      meta: {
        show: true,
        title: '公告配置',
        name: '公告配置'
      }
    },
    {
      path: '/set/domain',
      name: 'notice',
      component: () => import('@/pages/set/domain/domain'),
      meta: {
        show: true,
        title: '公告配置',
        name: '公告配置'
      }
    },
    {
      path: '/guide/edutag',
      name: 'Edutag',
      component:()=> import('@/pages/guide/edutag/Edutag'),
      meta: {
        show: true,
        title: '教程标签',
        name: '运营管理'
      }
    },
    {
      path: '/guide/addedutag',
      name: 'Addedutag',
      component:()=> import('@/pages/guide/addedutag/Addedutag'),
      meta: {
        show: true,
        title: '添加教程标签',
        name: '运营管理'
      }
    },
    {
      path: '/guide/editedutag',
      name: 'Editedutag',
      component:()=> import('@/pages/guide/editedutag/Editedutag'),
      meta: {
        show: true,
        title: '编辑教程标签',
        name: '运营管理'
      }
    },
    {
      path: '/guide/edulist',
      name: 'Edulist',
      component:()=> import('@/pages/guide/edulist/Edulist'),
      meta: {
        show: true,
        title: '教程列表',
        name: '运营管理'
      }
    },
    {
      path: '/guide/addedu',
      name: 'Addedu',
      component:()=> import('@/pages/guide/addedu/Addedu'),
      meta: {
        show: true,
        title: '添加教程',
        name: '运营管理'
      }
    },
    {
      path: '/guide/editedu',
      name: 'Editedu',
      component:()=> import('@/pages/guide/editedu/Editedu'),
      meta: {
        show: true,
        title: '编辑教程',
        name: '运营管理'
      }
    },
    {
      path: '/inform',
      name: 'Informlist',
      component:()=> import('@/pages/inform/Informlist'),
      meta: {
        show: true,
        title: '通知列表',
        name: '文章管理'
      }
    },
    {
      path: '/inform/addinform',
      name: 'Addinform',
      component:()=> import('@/pages/inform/addinform/Addinform'),
      meta: {
        show: true,
        title: '添加通知',
        name: '文章管理'
      }
    },
    {
      path: '/inform/editinform',
      name: 'Editinform',
      component:()=> import('@/pages/inform/editinform/Editinform'),
      meta: {
        show: true,
        title: '编辑通知',
        name: '文章管理'
      }
    },
    {
      path: '/issue',
      name: 'Issuelist',
      component:()=> import('@/pages/issue/Issuelist'),
      meta: {
        show: true,
        title: '常见问题列表',
        name: '文章管理'
      }
    },
    {
      path: '/issue/addissue',
      name: 'Addissue',
      component:()=> import('@/pages/issue/addissue/Addissue'),
      meta: {
        show: true,
        title: '添加常见问题',
        name: '文章管理'
      }
    },
    {
      path: '/issue/editissue',
      name: 'Editissue',
      component:()=> import('@/pages/issue/editissue/Editissue'),
      meta: {
        show: true,
        title: '编辑常见问题',
        name: '文章管理'
      }
    },
    {
      path: '/kefu',
      name: 'Kefu',
      component:()=> import('@/pages/kefu/Kefu'),
      meta: {
        show: true,
        title: '在线客服',
        name: '文章管理'
      }
    },
    {
      path: '/order/audit',
      name: 'Audit',
      component:()=> import('@/pages/order/audit/Audit'),
      meta: {
        show: true,
        title: '贷款订单审核结算',
        name: '订单管理'
      }
    },
    {
      path: '/order/cardaudit',
      name: 'Cardaudit',
      component:()=> import('@/pages/order/cardaudit/Cardaudit'),
      meta: {
        show: true,
        title: '拉新订单审核结算',
        name: '订单管理'
      }
    },
    {
      path: '/financing/withdraw',
      name: 'Withdraw',
      component:()=> import('@/pages/financing/withdraw/Withdraw'),
      meta: {
        show: true,
        title: '提现管理',
        name: '财务管理'
      }
    },
    {
      path: '/banner',
      name: 'Bannerlist',
      component:()=> import('@/pages/banner/Bannerlist'),
      meta: {
        show: true,
        title: 'banner',
        name: '运营管理'
      }
    },
    {
      path: '/banner/addbanner',
      name: 'Addbanner',
      component:()=> import('@/pages/banner/addbanner/Addbanner'),
      meta: {
        show: true,
        title: '添加banner',
        name: '运营管理'
      }
    },
    {
      path: '/banner/ceshiadd',
      name: 'Ceshiadd',
      component:()=> import('@/pages/banner/ceshiadd/Ceshiadd'),
      meta: {
        show: true,
        title: '添加banner',
        name: '运营管理'
      }
    },
    {
      path: '/banner/editbanner',
      name: 'Editbanner',
      component:()=> import('@/pages/banner/editbanner/Editbanner'),
      meta: {
        show: true,
        title: '编辑banner',
        name: '运营管理'
      }
    },
    {
      path: '/users/commonuser',
      name: 'Commonuser',
      component:()=> import('@/pages/users/commonuser/Commonuser'),
      meta: {
        show: true,
        title: '普通用户',
        name: '用户管理'
      }
    },
    {
      path: '/users/commonuser/yicominfo',
      name: 'Yicominfo',
      component:()=> import('@/pages/users/commonuser/yicominfo/Yicominfo'),
      meta: {
        show: true,
        title: '用户详情',
        name: '用户管理'
      }
    },
    {
      path: '/users/commonuser/edit',
      name: 'Edituser',
      component:()=> import('@/pages/users/commonuser/edit/Edit'),
      meta: {
        show: true,
        title: '用户编辑',
        name: '用户管理'
      }
    },
    {
      path: '/users/hehuouser',
      name: 'Hehuouser',
      component:()=> import('@/pages/users/hehuouser/Hehuouser'),
      meta: {
        show: true,
        title: '合伙用户',
        name: '用户管理'
      }
    },
    {
      path: '/users/hehuouser/userinfo',
      name: 'Userinfo',
      component:()=> import('@/pages/users/hehuouser/userinfo/Userinfo'),
      meta: {
        show: true,
        title: '用户详情',
        name: '用户管理'
      }
    },
    {
      path: '/users/hehuouser/hehuoedit',
      name: 'Hehuoedit',
      component:()=> import('@/pages/users/hehuouser/hehuoedit/Hehuoedit'),
      meta: {
        show: true,
        title: '用户编辑',
        name: '用户管理'
      }
    },
    {
      path: '/set/gzhao',
      name: 'Gzhao',
      component:()=> import('@/pages/set/gzhao/Gzhao'),
      meta: {
        show: true,
        title: '公众号配置',
        name: '系统管理'
      }
    },
    {
      path: '/set/role',
      name: 'Role',
      component:()=> import('@/pages/set/role/Role'),
      meta: {
        show: true,
        title: '角色管理',
        name: '系统管理'
      }
    },
    {
      path: '/set/role/addrole',
      name: 'Addrole',
      component:()=> import('@/pages/set/role/addrole/Addrole'),
      meta: {
        show: true,
        title: '添加账号',
        name: '系统管理'
      }
    },
    {
      path: '/set/role/editrole',
      name: 'Editrole',
      component:()=> import('@/pages/set/role/editrole/Editrole'),
      meta: {
        show: true,
        title: '编辑账号',
        name: '系统管理'
      }
    },
    {
      path: '/set/power',
      name: 'Power',
      component:()=> import('@/pages/set/power/Power'),
      meta: {
        show: true,
        title: '权限管理',
        name: '系统管理'
      }
    },
    {
      path: '/set/power/addpower',
      name: 'Addpower',
      component:()=> import('@/pages/set/power/addpower/Addpower'),
      meta: {
        show: true,
        title: '添加权限',
        name: '系统管理'
      }
    },
    {
      path: '/set/power/editpower',
      name: 'Editpower',
      component:()=> import('@/pages/set/power/editpower/Editpower'),
      meta: {
        show: true,
        title: '编辑权限',
        name: '系统管理'
      }
    },
    {
      path: '/set/accountqx',
      name: 'Accountqx',
      component:()=> import('@/pages/set/accountqx/Accountqx'),
      meta: {
        show: true,
        title: '账号权限管理',
        name: '系统管理'
      }
    },
    {
      path: '/set/accountqx/editaccountqx',
      name: 'Editaccountqx',
      component:()=> import('@/pages/set/accountqx/editaccountqx/Editaccountqx'),
      meta: {
        show: true,
        title: '编辑权限',
        name: '系统管理'
      }
    },
    {
      path: '/set/account',
      name: 'Account',
      component:()=> import('@/pages/set/account/Account'),
      meta: {
        show: true,
        title: '账号管理',
        name: '系统管理'
      }
    },
    {
      path: '/set/mbts',
      name: 'Account',
      component:()=> import('@/pages/set/mbts/mbts'),
      meta: {
        show: true,
        title: '账号管理',
        name: '系统管理'
      }
    },
    {
      path: '/set/account/addaccount',
      name: 'Addaccount',
      component:()=> import('@/pages/set/account/addaccount/Addaccount'),
      meta: {
        show: true,
        title: '添加账号',
        name: '系统管理'
      }
    },
    {
      path: '/set/account/editaccount',
      name: 'Editaccount',
      component:()=> import('@/pages/set/account/editaccount/Editaccount'),
      meta: {
        show: true,
        title: '编辑账号',
        name: '系统管理'
      }
    },
    {
      path: '/set/powergroup',
      name: 'Powergroup',
      component:()=> import('@/pages/set/powergroup/Powergroup'),
      meta: {
        show: true,
        title: '权限分组',
        name: '系统管理'
      }
    },
    {
      path: '/set/powergroup/addpowergroup',
      name: 'Addpowergroup',
      component:()=> import('@/pages/set/powergroup/addpowergroup/Addpowergroup'),
      meta: {
        show: true,
        title: '添加权限分组',
        name: '系统管理'
      }
    },
    {
      path: '/set/powergroup/editpowergroup',
      name: 'Editpowergroup',
      component:()=> import('@/pages/set/powergroup/editpowergroup/Editpowergroup'),
      meta: {
        show: true,
        title: '编辑权限分组',
        name: '系统管理'
      }
    },
    {
      path: '/personal',
      name: 'Personal',
      component:()=> import('@/pages/personal/Personal'),
      meta: {
        show: true,
        title: '个人信息',
        //name: '系统管理'
      }
    },
    {
      path: '/personal/editinfo',
      name: 'Editinfo',
      //component: Editinfo,
      component: () => import('@/pages/personal/editinfo/Editinfo'),
      meta: {
        show: true,
        title: '编辑个人信息',
        //name: '系统管理'
      }
    },
    {
      path: '/home',
      name: 'Home',
      component:()=> import('@/pages/home/Home'),
      meta: {
        show: true,
        title: '数据总览',
        name: '数据总览'
      }
    }
    
  ]
})
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login') { // 判断该路由是否需要登录权限
    let onOff = window.sessionStorage.getItem('isLogin')
    if (onOff === 'true') { // 判断是否登录
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})
export default router;