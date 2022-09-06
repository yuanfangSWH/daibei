<template>
  <div id="app">
    <home-header v-if="this.$route.meta.show"></home-header>
    <side-bar v-if="this.$route.meta.show"></side-bar>
    <load-ing></load-ing>
    <router-view />
  </div>
</template>

<script>
import HomeHeader from "@/components/Header";
import SideBar from "@/components/SideBar";
import LoadIng from "@/components/Loading";
export default {
  name: "App",
  components: {
    HomeHeader,
    SideBar,
    LoadIng
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.black-div {
  width: 100%;
  height: 100%;
  min-width: 1700px;
  min-height: 1080px;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 60;
}
.bounced {
  width: 470px;
  height: 300px;
  background: rgba(255, 255, 255, 1);
  position: relative;
  top: 50%;
  margin-top: -265px;
  left: 50%;
  margin-left: -280px;
}
.b-bt {
  width: 100%;
  height: 50px;
  background: rgba(3, 122, 255, 1);
  display: flex;
  line-height: 50px;
  color: #ffffff;
  font-size: 14px;
}
.b-wz1 {
  width: 300px;
  height: 100%;
  text-indent: 40px;
  font-size: 14px;
}
.b-wz2 {
  flex: 1;
  height: 100%;
}
.tebdkk {
  width: 60px;
  height: 54px;
  border-bottom: 2px #037aff solid;
  text-indent: 0;
  text-align: center;
  margin-left: 20px;
}
.b-nr dl {
  font-size: 16px;
  text-align: center;
  padding-top: 70px;
}
.b-nr {
  width: 100%;
  height: 250px;
}
.b-ann {
  width: 260px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 60px;
}
.b-anntes {
  width: 240px;
  text-align: right;
  margin-left: 380px;
  padding-top: 36px;
}
.b-anntes .b-ant {
  margin-right: 30px;
}
.b-ant {
  margin-right: 80px;
}
/* 搜索 */
.tjia {
  width: 130px;
  height: 40px;
  background: rgba(3, 122, 255, 1);
  text-align: center;
  font-size: 16px;
  color: #ffffff;
  line-height: 40px;
  float: left;
  cursor: pointer;
}
.search-div {
  width: 1680px;
  height: 40px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 15px;
  margin-bottom: 15px;
}
.s-srk {
  width: 460px;
  height: 100%;
  float: right;
  display: flex;
  background-color: #ffffff;
  border: 1px solid rgba(231, 233, 234, 1);
}
.s-tb {
  width: 19px;
  height: 20px;
  display: block;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 11px;
}
.s-srk .srk {
  flex: 1;
  height: 40px;
}
.s-input {
  width: 100%;
  margin-top: 4px;
}
.srk .el-input__inner {
  border: 0;
}
.s-srk .an {
  width: 90px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
  background-color: #037aff;
}
/* 分页 */
.paging {
  width: 100%;
  height: 60px;
  margin-top: 30px;
  text-align: center;
}
/* 列表 */
.list-div {
  width: 1650px;
  height: auto;
  margin-bottom: 15px;
  background-color: #ffffff;
  border: 1px solid rgba(231, 233, 234, 1);
  color: #2b333d;
  position: relative;
}
.l-tab {
  width: 100%;
  height: 51px;
  display: flex;
  border-bottom: 1px #e7e9ea solid;
}
.tab-div {
  width: 83px;
  height: 50px;
  line-height: 48px;
  text-align: center;
  font-size: 14px;
}
.tab-a {
  margin-left: 35px;
}
.tab-b {
  margin-left: 80px;
}
.choose {
  color: #037aff;
  border-bottom: 3px #037aff solid;
}
.title {
  width: 100%;
  height: 60px;
  border-bottom: 1px #e7e9ea solid;
  display: flex;
  line-height: 60px;
  text-align: center;
  font-size: 14px;
}
.title .li {
  flex: 1;
}
.li-abq1 {
  cursor: pointer;
}
</style>
