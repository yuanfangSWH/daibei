<template>
<div class="dnmdbj">
  <Menu theme="dark" mode="vertical" width="220px" id="menubox" ref="side_menu" :open-names="[sidebarOpen]" :active-name="active" accordion>
    <Submenu name="数据总览">
      <template slot="title" >
          <Icon type="md-analytics" />
        数据总览
      </template>
      <MenuItem name="Home" to="/Home">数据总览</MenuItem>
    </Submenu>
    <Submenu name="用户管理">
      <template slot="title">
        <Icon type="md-person" />用户管理
      </template>
      <MenuItem name="users/Commonuser" to="/users/Commonuser">普通用户</MenuItem>
      <MenuItem name="users/Hehuouser" to="/users/Hehuouser">合伙用户</MenuItem>
    </Submenu>
    <Submenu name="产品管理">
      <template slot="title">
        <Icon type="md-card" />产品管理
      </template>
      <MenuItem name="Banktag" to="/Banktag">拉新产品标签</MenuItem>
      <!-- <MenuItem name="Bank" to="/Bank">银行产品</MenuItem> -->
      <MenuItem name="Creditcard" to="/Creditcard">拉新产品</MenuItem>
      <MenuItem name="Loantag" to="/Loantag">贷款产品标签</MenuItem>
      <MenuItem name="Loan" to="/Loan">贷款产品</MenuItem>
    </Submenu>
    <Submenu name="财务管理">
      <template slot="title">
        <Icon type="logo-yen" />财务管理
      </template>
      <!-- <MenuItem name="3-1">收益报表</MenuItem> -->
      <MenuItem name="financing/Withdraw" to="/financing/Withdraw">提现管理</MenuItem>
      <!-- <MenuItem name="3-3">提现记录</MenuItem> -->
    </Submenu>
    <Submenu name="订单管理">
      <template slot="title">
        <Icon type="md-reorder" />订单管理
      </template>
      <MenuItem name="order/Cardorder" to="/order/Cardorder">拉新订单</MenuItem>
      <MenuItem name="order/Loanorder" to="/order/Loanorder">贷款订单</MenuItem>
      <MenuItem name="order/Audit" to="/order/Audit">贷款订单审核结算</MenuItem>
      <MenuItem name="order/Cardaudit" to="/order/Cardaudit">拉新订单审核结算</MenuItem>
      <MenuItem name="order/Team" to="/order/Team">团队奖金</MenuItem>
    </Submenu>
    <Submenu name="运营管理">
      <template slot="title">
        <Icon type="md-git-compare" />运营管理
      </template>
      <MenuItem name="banner" to="/banner">banner</MenuItem>
      <MenuItem name="guide/notice" to="/guide/notice">公告配置</MenuItem>
      <MenuItem name="guide/Edutag" to="/guide/Edutag">操作指南标签</MenuItem>
      <MenuItem name="guide/Edulist" to="/guide/Edulist">操作指南</MenuItem>
     
    </Submenu>
    <Submenu name="文章管理">
      <template slot="title">
        <Icon type="ios-paper" />文章管理
      </template>
      <MenuItem name="issue" to="/issue">常见问题</MenuItem>
      <MenuItem name="inform" to="/inform">通知管理</MenuItem>
      <MenuItem name="kefu" to="/kefu">在线客服</MenuItem>
    </Submenu>
    <Submenu name="社区管理">
      <template slot="title">
        <Icon type="ios-chatbubbles" />社区管理
      </template>
      
      <MenuItem name="bbs/Newstag" to="/bbs/Newstag">头条分类</MenuItem>
      <MenuItem name="bbs/newslist" to="/bbs/newslist">头条列表</MenuItem>
      <MenuItem name="bbs/Bbstag" to="/bbs/Bbstag">社区板块</MenuItem>
      <MenuItem name="bbs/Bbslist" to="/bbs/Bbslist">社区列表</MenuItem>
      <MenuItem name="bbs/Yhmp" to="/bbs/Yhmp">名片文案</MenuItem>
    </Submenu>
    <Submenu name="系统管理">
      <template slot="title">
        <Icon type="md-settings" />系统管理
      </template>
      <MenuItem name="set/mbts" to="/set/mbts">模板推送</MenuItem>
      <MenuItem name="set/Role" to="/set/Role">角色管理</MenuItem>
      <MenuItem name="set/powergroup" to="/set/powergroup">权限分组</MenuItem>
      <MenuItem name="set/Power" to="/set/Power">权限管理</MenuItem>
      <!-- <MenuItem name="set/accountqx" to="/set/accountqx">账号权限管理</MenuItem> -->
      <MenuItem name="set/account" to="/set/account">账号管理</MenuItem>
      <MenuItem name="set/domain" to="/set/domain">分享域名</MenuItem>
      <MenuItem name="set/Gzhao" to="/set/Gzhao">公众号配置</MenuItem>
      
    </Submenu>
    <!-- <div class="menu-data-all"><router-link class="menu-a" to=""><Icon type="md-settings" />系统管理</router-link></div>  -->
  </Menu>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {};
  },
  computed: {
    active() {
      if (this.$route.path.slice(1) == "") {
        return "Home"; //默认高亮的值
      } else {
        return this.$route.path.slice(1);
      }
    },
    sidebarOpen() {
      if (this.$route.meta.name) {
        return this.$route.meta.name;
      } else {
        return "";
      }
    }
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped>
.dnmdbj{
  background-color: #515a6e;
  width: 220px;
  height: 1000px;
}
.menu-data-all .menu-a {
  color: rgba(255, 255, 255, 0.7);
  padding: 14px 24px;
  display: inline-block;
}
.menu-data-all .menu-a:hover {
  color: rgba(255, 255, 255, 1);
}
.menu-data-all i {
  margin-right: 12px;
}
.ivu-menu {
  height: calc(100vh - 54px);
  /* overflow-y: scroll; */
}
</style>