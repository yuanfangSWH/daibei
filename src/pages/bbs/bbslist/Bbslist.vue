<template>
  <div class="content">
    <div class="addbtn">
      <Input
        v-model="soinfo"
        class="search"
        search
        enter-button="搜索"
        @on-search="lzoshou"
        placeholder="输入用户名称/用户id/内容/标题进行搜索"
      />
    </div>

    <div class="addbtn">
      <router-link to="/bbs/addbbs">
        <button>添加帖子</button>
      </router-link>
    </div>
    <div class="tabbox">
      <Tabs :animated="false" @on-click="tabClick" :value="nameNo">
        <TabPane label="上架中" name="name1">
          <div class="tableBox">
            <Table :columns="columns1" :data="data1"></Table>
          </div>
          <div class="pagebox">
            <Page
              :total="infoTotal01"
              :current="pageNum"
              :page-size="pageSize"
              show-elevator
              @on-change="handlePage"
            />
          </div>
        </TabPane>
        <TabPane label="待审核" name="name2">
          <div class="tableBox">
            <Table :columns="columns2" :data="data2"></Table>
          </div>
          <div class="pagebox">
            <Page
              :total="infoTotal01"
              :current="pageNum"
              :page-size="pageSize"
              show-elevator
              @on-change="handlePage2"
            />
          </div>
        </TabPane>
        <TabPane label="回收站" name="name3">
          <div class="tableBox">
            <Table :columns="columns3" :data="data3"></Table>
          </div>
          <div class="pagebox">
            <Page
              :total="infoTotal01"
              :current="pageNum"
              :page-size="pageSize"
              show-elevator
              @on-change="handlePage3"
            />
          </div>
        </TabPane>
        <TabPane label="搜索列表" name="name4">
          <div class="tableBox">
            <Table :columns="columns4" :data="data4"></Table>
          </div>
          <div class="pagebox">
            <Page
              :total="infoTotal01"
              :current="pageNum"
              :page-size="pageSize"
              show-elevator
              @on-change="handlePage4"
            />
          </div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  name: "Bbslist",
  components: {},
  data() {
    return {
      soinfo: "",
      nameNo: "name1",
      pagesinfo: "",
      infoTotal01: 0,
      pageNum: 1, //当前页数
      pageSize: 10, //每页的条数
      columns1: [
        {
          title: "ID",
          key: "list_id",
          align: "center"
        },
        {
          title: "文章分类",
          key: "list_tab",
          align: "center",
          render: (h, params) => {
            var a = params.row.list_tab.join("，");
            return h("div", a);
          }
        },
        {
          title: "标题",
          key: "list_title",
          align: "center"
        },
        {
          title: "点击量",
          key: "list_look_sum",
          align: "center"
        },
        {
          title: "留言量",
          key: "list_comment_sum",
          align: "center"
        },
        {
          title: "状态",
          key: "sjia",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", "上架");
          }
        },
        {
          title: "发布日期",
          key: "list_time",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            var bbsdata1 = params.row;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      //this.show(params.index)
                      this.$router.push({
                        path: "/bbs/editbbs",
                        name: "Editbbs",
                        query: {
                          sid: bbsdata1.list_id
                        }
                      });
                    }
                  }
                },
                "编辑"
              ),
              // h('Button', {
              //     props: {
              //         type: 'primary',
              //         size: 'small'
              //     },
              //     style: {
              //         marginRight: '5px'
              //     },
              //     on: {
              //         click: () => {
              //             //this.show(params.index)
              //            var bankdata1 = params.row
              //             axios({
              //                 method: "post",
              //                 url: "http://aaadmin3.rong298.cn/bbs/bbs",
              //                 headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              //                 params:{
              //                     action: 'getOneLoan',
              //                 },
              //                 data:qs.stringify({
              //                     list_id: bankdata1.list_id
              //                 })
              //             })
              //             .then(res => {
              //                 bankdata1 = res.data.data;
              //                 //console.log("xinyongka上架产品："+JSON.stringify(bankdata1));
              //                 this.$router.push({
              //                     path: '/loan/Editloan',
              //                     name: 'Editloan',
              //                     params: bankdata1
              //                 })
              //             })
              //             .catch(function (error) {
              //                 console.log("错误："+error);
              //             //_this.$Message.error(''+res.data.msg);
              //             })
              //         }
              //     }
              // }, '留言'),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.confirm(
                        params.index,
                        params.row.list_id,
                        params.row.list_title
                      );
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data1: [],
      columns2: [
        {
          title: "ID",
          key: "list_id",
          align: "center"
        },
        {
          title: "文章分类",
          key: "list_tab",
          align: "center",
          render: (h, params) => {
            var a = params.row.list_tab.join("，");
            return h("div", a);
          }
        },
        {
          title: "标题",
          key: "list_title",
          align: "center"
        },
        {
          title: "点击量",
          key: "list_look_sum",
          align: "center"
        },
        {
          title: "留言量",
          key: "list_comment_sum",
          align: "center"
        },
        {
          title: "状态",
          key: "sjia",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", "待审核");
          }
        },
        {
          title: "发布日期",
          key: "list_time",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            var bbsdata1 = params.row;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      //this.show(params.index)
                      var params = {
                        action: "getOneBbs"
                      };
                      var data = qs.stringify({
                        list_id: bbsdata1.list_id
                      });
                      this.api.apiPost(
                        "/bbs/bbs",
                        "post",
                        data,
                        params,
                        (status, code, res) => {
                          if (status) {
                            bbsdata1 = res.data;
                            this.$router.push({
                              path: "/bbs/shenhebbs",
                              name: "Shenhebbs",
                              params: bbsdata1
                            });
                          } else {
                            this.$Message.error("获取数据失败！");
                          }
                        }
                      );
                    }
                  }
                },
                "审核"
              )
            ]);
          }
        }
      ],
      data2: [],
      columns3: [
        {
          title: "ID",
          key: "list_id",
          align: "center"
        },
        {
          title: "文章分类",
          key: "list_tab",
          align: "center",
          render: (h, params) => {
            var a = params.row.list_tab.join("，");
            return h("div", a);
          }
        },
        {
          title: "标题",
          key: "list_title",
          align: "center"
        },
        {
          title: "点击量",
          key: "list_look_sum",
          align: "center"
        },
        {
          title: "留言量",
          key: "list_comment_sum",
          align: "center"
        },
        {
          title: "状态",
          key: "sjia",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", "下架");
          }
        },
        {
          title: "发布日期",
          key: "list_time",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            var bbsdata1 = params.row;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      //this.show(params.index)
                      this.$router.push({
                        path: "/bbs/editbbs",
                        name: "Editbbs",
                        query: {
                          sid: bbsdata1.list_id
                        }
                      });
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      //this.show(params.index)
                      this.huifuFun(
                        params.index,
                        params.row.list_id,
                        params.row.list_title
                      );
                    }
                  }
                },
                "恢复"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.confirmHs(
                        params.index,
                        params.row.list_id,
                        params.row.list_title
                      );
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data3: [],
      columns4: [
        {
          title: "ID",
          key: "list_id",
          align: "center"
        },
        {
          title: "文章分类",
          key: "list_tab",
          align: "center",
          render: (h, params) => {
            var a = params.row.list_tab.join("，");
            return h("div", a);
          }
        },
        {
          title: "标题",
          key: "list_title",
          align: "center"
        },
        {
          title: "点击量",
          key: "list_look_sum",
          align: "center"
        },
        {
          title: "留言量",
          key: "list_comment_sum",
          align: "center"
        },
        {
          title: "状态",
          key: "sjia",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", "下架");
          }
        },
        {
          title: "发布日期",
          key: "list_time",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            var bbsdata1 = params.row;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      //this.show(params.index)
                      this.$router.push({
                        path: "/bbs/editbbs",
                        name: "Editbbs",
                        query: {
                          sid: bbsdata1.list_id
                        }
                      });
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      //this.show(params.index)
                      this.huifuFun(
                        params.index,
                        params.row.list_id,
                        params.row.list_title
                      );
                    }
                  }
                },
                "恢复"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.confirmHs(
                        params.index,
                        params.row.list_id,
                        params.row.list_title
                      );
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data4: [],
      id: "",
      allbank: [],
      banksname: "",
      i: 0
    };
  },
  methods: {
    getBbsListInfo() {
      var params = {
        action: "getAllBbs",
        state: "1",
        page: this.pageNum
      };
      this.api.apiPost("/bbs/bbs", "get", "", params, (status, code, res) => {
        if (status) {
          this.data1 = res.data.BbsList;
          this.pagesinfo = res.data.pages;
          this.pageSize = this.pagesinfo.defaultPageSize;
          this.infoTotal01 = parseInt(this.pagesinfo.totalCount);
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    //搜索方法
    lzoshou() {
      var params = {
        action: "getAllBbs",
        key: this.soinfo,
        page: this.pageNum
      };
      this.api.apiPost("/bbs/bbs", "get", "", params, (status, code, res) => {
        if (status) {
          this.data4 = res.data.BbsList;
          this.nameNo = "name4";
          this.pagesinfo = res.data.pages;
          this.pageSize = this.pagesinfo.defaultPageSize;
          this.infoTotal01 = parseInt(this.pagesinfo.totalCount);
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    
    getShenhe() {
      var params = {
        action: "getAllBbs",
        state: "3",
        page: this.pageNum
      };
      this.api.apiPost("/bbs/bbs", "get", "", params, (status, code, res) => {
        if (status) {
          this.data2 = res.data.BbsList;
          this.pagesinfo = res.data.pages;
          this.pageSize = this.pagesinfo.defaultPageSize;
          this.infoTotal01 = parseInt(this.pagesinfo.totalCount);
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    getRecycle() {
      var params = {
        action: "getAllBbs",
        state: "0",
        page: this.pageNum
      };
      this.api.apiPost("/bbs/bbs", "get", "", params, (status, code, res) => {
        if (status) {
          this.data3 = res.data.BbsList;
          this.pagesinfo = res.data.pages;
          this.pageSize = this.pagesinfo.defaultPageSize;
          this.infoTotal01 = parseInt(this.pagesinfo.totalCount);
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    handlePage(value) {
      this.pageNum = value;
      this.getBbsListInfo();
    },
    handlePage2(value) {
      this.pageNum = value;
      this.getShenhe();
    },
    handlePage3(value) {
      this.pageNum = value;
      this.getRecycle();
    },
    handlePage4(value) {
      this.pageNum = value;
      this.lzoshou();
    },
    //是否删除对话框(上架中的)
    confirm(index, val, name) {
      this.$Modal.confirm({
        render: h => {
          return h(
            "span",
            {
              class: "reConfirm"
            },
            "确定要删除【" + name + "】吗？"
          );
        },
        onOk: () => {
          let tid = val;
          var params = {
            action: "del"
          };
          var data = qs.stringify({
            list_id: tid
          });
          this.api.apiPost(
            "/bbs/bbs",
            "post",
            data,
            params,
            (status, code, res) => {
              if (status) {
                this.$Message.success("删除成功！");
                this.data1.splice(index, 1); //同步删除页面当前这条数据
              } else {
                this.$Message.error(res.msg);
              }
            }
          );
        },
        onCancel: () => {}
      });
    },
    //是否恢复对话框(回收站的)
    huifuFun(index, val, name) {
      this.$Modal.confirm({
        render: h => {
          return h(
            "span",
            {
              class: "reConfirm"
            },
            "确定恢复【" + name + "】吗？"
          );
        },
        onOk: () => {
          let tid = val;
          var params = {
            action: "up"
          };
          var data = qs.stringify({
            list_id: tid
          });
          this.api.apiPost(
            "/bbs/bbs",
            "post",
            data,
            params,
            (status, code, res) => {
              if (status) {
                this.$Message.success("恢复成功！");
                this.data3.splice(index, 1); //同步删除页面当前这条数据
              } else {
                this.$Message.error(res.msg);
              }
            }
          );
        },
        onCancel: () => {}
      });
    },
    //是否删除对话框(回收站的)
    confirmHs(index, val, name) {
      this.$Modal.confirm({
        render: h => {
          return h(
            "span",
            {
              class: "reConfirm"
            },
            "确定要彻底删除【" + name + "】吗？"
          );
        },
        onOk: () => {
          let tid = val;
          var params = {
            action: "realdel"
          };
          var data = qs.stringify({
            list_id: tid
          });
          this.api.apiPost(
            "/bbs/bbs",
            "post",
            data,
            params,
            (status, code, res) => {
              if (status) {
                this.$Message.success("删除成功！");
                this.data3.splice(index, 1); //同步删除页面当前这条数据
              } else {
                this.$Message.error(res.msg);
              }
            }
          );
        },
        onCancel: () => {}
      });
    },
    tabClick(data) {
      if (data == "name1") {
        this.pageNum = 1;
        this.getBbsListInfo();
        this.nameNo = "name1";
      } else if (data == "name2") {
        this.pageNum = 1;
        this.getShenhe();
        this.nameNo = "name2";
      } else if (data == "name3") {
        this.pageNum = 1;
        this.getRecycle();
        this.nameNo = "name3";
      } else if (data == "name4") {
        this.pageNum = 1;
        // this.lzoshou();
        this.nameNo = "name4";
      }
    }
  },
  mounted() {
    this.getBbsListInfo();
    //this.getBank();
  }
};
</script>

<style scoped>
.content {
  position: absolute;
  top: 54px;
  left: 240px;
  width: calc(100% - 240px);
  background: #ebf1f4;
  padding-left: 20px;
  box-sizing: border-box;
  height: calc(100vh - 54px);
}
.addbtn button {
  height: 36px;
  line-height: 36px;
  color: #ffffff;
  background: #037aff;
  padding: 0 15px;
  border: none;
  font-size: 16px;
  margin: 20px 0;
}
.tableBox {
  height: calc(100vh - 304px);
  overflow-y: scroll;
}
.tabbox {
  background: #ffffff;
  padding: 10px 20px 20px;
  width: calc(100% - 20px);
  height: calc(100vh - 130px);
}
.pagebox {
  background: #ffffff;
  text-align: center;
  padding: 30px 0 50px;
  width: calc(100% - 20px);
}
.search {
  width: 460px;
  float: right;
  margin-right: 20px;
  margin-top: 20px;
}
</style>