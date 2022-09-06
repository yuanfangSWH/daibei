<template>
  <div class="content">
    <!-- 订单原因 -->
    <div class="black-div" v-if="exitBounced1">
      <div class="bounced">
        <div class="b-bt">
          <div class="b-wz1">订单原因</div>
        </div>
        <div class="b-nr">
          <div class="tebdwz3">{{yuanData}}</div>
          <div class="b-ann">
            <el-button class="b-ant" style="margin-right: 0px;" @click="Why(2)">关闭</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 订单退回 -->
    <div class="black-div" v-if="exitBounced2">
      <div class="bounced">
        <div class="b-bt">
          <div class="b-wz1">订单退回</div>
        </div>
        <div class="b-nr">
          <div class="tixdwz">
            <div class="blzbw">
              <div class="yhdmz" style="padding-top: 20px;">退回的订单号为：{{xuanzdshuj.id}}</div>
            </div>
          </div>
          <div class="b-anntes">
            <el-button class="b-ant" @click="Chuitk(2)">取消退回</el-button>
            <el-button type="primary" @click="Chuitk(3)">确认退回</el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="addbtn">
      <Input
        v-model="soinfo"
        class="search"
        search
        enter-button="搜索"
        @on-search="sosuoFun"
        placeholder="输入要搜索的用户姓名/身份证/手机号/订单号"
      />
    </div>
    <div class="tabbox">
      <Tabs :animated="false" @on-click="tabClick" :value="nameNo">
        <TabPane label="待审核" name="name1">
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
        <TabPane label="打款中" name="name2">
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
        <TabPane label="已完成" name="name3">
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
        <TabPane label="提现挂起" name="name4">
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
        <TabPane label="已拒绝" name="name5">
          <div class="tableBox">
            <Table :columns="columns5" :data="data5"></Table>
          </div>
          <div class="pagebox">
            <Page
              :total="infoTotal01"
              :current="pageNum"
              :page-size="pageSize"
              show-elevator
              @on-change="handlePage5"
            />
          </div>
        </TabPane>
        <TabPane label="搜索列表" name="name6">
          <div class="tableBox">
            <Table :columns="columns6" :data="data6"></Table>
          </div>
          <div class="pagebox">
            <Page
              :total="infoTotal01"
              :current="pageNumso"
              :page-size="pageSize"
              show-elevator
              @on-change="handlePage6"
            />
          </div>
        </TabPane>
        <TabPane label="已退款" name="name7">
          <div class="tableBox">
            <Table :columns="columns7" :data="data7"></Table>
          </div>
          <div class="pagebox">
            <Page
              :total="infoTotal01"
              :current="pageNumso"
              :page-size="pageSize"
              show-elevator
              @on-change="handlePage6"
            />
          </div>
        </TabPane>
      </Tabs>
    </div>
    <!-- 待审核通过操作弹框 -->
    <Modal v-model="modal1" title="提现结算" ok-text="通过" @on-ok="ok" @on-cancel="cancel">
      <div class="jsbox">
        <div class="js-left">
          <div class="xkbox">用户姓名：{{rowdata1.outcome_name}}</div>
          <div class="xkbox">提现卡号：{{rowdata1.outcome_account}}</div>
          <div class="xkbox">提现渠道：{{rowdata1.account_type}}</div>
          <div class="xkbox">提现金额：{{rowdata1.outcome_money}}</div>
        </div>
        <div class="js-right">
          <div class="xkbox">用户手机号：{{rowdata1.outcome_mobile}}</div>
        </div>
      </div>
    </Modal>
    <!-- 待审核拒绝操作弹框 -->
    <Modal v-model="modal3" title="提现结算" ok-text="拒绝" @on-ok="ok2" @on-cancel="cancel">
      <div class="jsbox">
        <div class="js-left">
          <div class="xkbox">用户姓名：{{rowdata1.outcome_name}}</div>
          <div class="xkbox">提现卡号：{{rowdata1.outcome_account}}</div>
          <div class="xkbox">提现渠道：{{rowdata1.account_type}}</div>
          <div class="xkbox">提现金额：{{rowdata1.outcome_money}}</div>
        </div>
        <div class="js-right">
          <div class="xkbox">用户手机号：{{rowdata1.outcome_mobile}}</div>
        </div>
      </div>
    </Modal>
    <!-- 搜索待结算操作弹框 -->
    <Modal v-model="modal2" title="提现结算" ok-text="结算" @on-ok="ok3" @on-cancel="cancel">
      <div class="jsbox">
        <div class="js-left">
          <div class="xkbox">用户姓名：{{rowdata1.outcome_name}}</div>
          <div class="xkbox">提现卡号：{{rowdata1.outcome_account}}</div>
          <div class="xkbox">提现渠道：{{rowdata1.account_type}}</div>
          <div class="xkbox">提现金额：{{rowdata1.outcome_money}}</div>
        </div>
        <div class="js-right">
          <div class="xkbox">用户手机号：{{rowdata1.outcome_mobile}}</div>
        </div>
      </div>
    </Modal>
    <Modal v-model="modal4" title="提现结算" ok-text="拒绝" @on-ok="ok4" @on-cancel="cancel">
      <div class="jsbox">
        <div class="js-left">
          <div class="xkbox">用户姓名：{{rowdata1.outcome_name}}</div>
          <div class="xkbox">提现卡号：{{rowdata1.outcome_account}}</div>
          <div class="xkbox">提现渠道：{{rowdata1.account_type}}</div>
          <div class="xkbox">提现金额：{{rowdata1.outcome_money}}</div>
        </div>
        <div class="js-right">
          <div class="xkbox">用户手机号：{{rowdata1.outcome_mobile}}</div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  name: "Withdraw",
  components: {},
  data() {
    return {
      //原因弹框
      exitBounced1: false,
      //原因
      yuanData:"",
      //退回弹框
      exitBounced2:false,
      xuanzdshuj:[],
      soinfo: "",
      nameNo: "name1",
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      rowdata1: "",
      self: "",
      up1: "",
      up2: "",
      index01: "",
      num: "",
      yjId: [],
      pagesinfo: "",
      infoTotal01: 0,
      pageTotal01: 0, //总页数
      pageNum: 1, //当前页数
      pageNumso: 1, //当前页数
      pageSize: 10, //每页的条数
      columns1: [
        {
          title: "ID",
          key: "id",
          align: "center"
        },
        {
          title: "用户ID",
          key: "user_id",
          align: "center"
        },
        {
          title: "姓名",
          key: "outcome_name",
          align: "center"
        },
        {
          title: "申请人手机号",
          key: "outcome_mobile",
          align: "center"
        },
        {
          title: "申请人身份证",
          key: "outcome_card",
          align: "center"
        },
        {
          title: "提现渠道",
          key: "account_type",
          align: "center",
          render: (h, params) => {
            var obj = params.row.account_type;
            var aType = "";
            if (obj == 1) {
              aType = "银行卡";
            } else if (obj == 2) {
              aType = "微信";
            } else if (obj == 3) {
              aType = "支付宝";
            } else {
              aType = "微信打款或未知";
            }
            return h("div", aType);
          }
        },
        {
          title: "提现卡号",
          key: "outcome_account",
          align: "center"
        },
        {
          title: "提现金额",
          key: "outcome_money",
          align: "center"
        },
        {
          title: "提交时间",
          key: "outcome_start_time",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
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
                      this.modal1 = true;
                      this.rowdata1 = params.row;
                      this.index01 = params.index;
                    }
                  }
                },
                "通过"
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
                      this.modal3 = true;
                      this.rowdata1 = params.row;
                      this.index01 = params.index;
                    }
                  }
                },
                "拒绝"
              )
            ]);
          }
        }
      ],
      data1: [],
      columns2: [
        {
          title: "ID",
          key: "id",
          align: "center"
        },
        {
          title: "用户ID",
          key: "user_id",
          align: "center"
        },
        {
          title: "姓名",
          key: "outcome_name",
          align: "center"
        },
        {
          title: "申请人手机号",
          key: "outcome_mobile",
          align: "center"
        },
        {
          title: "申请人身份证",
          key: "outcome_card",
          align: "center"
        },
        {
          title: "提现渠道",
          key: "account_type",
          align: "center",
          render: (h, params) => {
            var obj = params.row.account_type;
            var aType = "";
            if (obj == 1) {
              aType = "银行卡";
            } else if (obj == 2) {
              aType = "微信";
            } else if (obj == 3) {
              aType = "支付宝";
            } else {
              aType = "微信打款或未知";
            }
            return h("div", aType);
          }
        },
        {
          title: "提现卡号",
          key: "outcome_account",
          align: "center"
        },
        {
          title: "提现金额",
          key: "outcome_money",
          align: "center"
        },
        {
          title: "提交时间",
          key: "outcome_start_time",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", "打款中");
          }
        }
      ],
      data2: [],
      columns3: [
        {
          title: "ID",
          key: "id",
          align: "center"
        },
        {
          title: "用户ID",
          key: "user_id",
          align: "center"
        },
        {
          title: "姓名",
          key: "outcome_name",
          align: "center"
        },
        {
          title: "申请人手机号",
          key: "outcome_mobile",
          align: "center"
        },
        {
          title: "申请人身份证",
          key: "outcome_card",
          align: "center"
        },
        {
          title: "提现渠道",
          key: "account_type",
          align: "center",
          render: (h, params) => {
            var obj = params.row.account_type;
            var aType = "";
            if (obj == 1) {
              aType = "银行卡";
            } else if (obj == 2) {
              aType = "微信";
            } else if (obj == 3) {
              aType = "支付宝";
            } else {
              aType = "微信打款或未知";
            }
            return h("div", aType);
          }
        },
        {
          title: "提现卡号",
          key: "outcome_account",
          align: "center"
        },
        {
          title: "提现金额",
          key: "outcome_money",
          align: "center"
        },
        {
          title: "提交时间",
          key: "outcome_start_time",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", "已完成");
          }
        }
      ],
      data3: [],
      columns4: [
        {
          title: "ID",
          key: "id",
          align: "center"
        },
        {
          title: "用户ID",
          key: "user_id",
          align: "center"
        },
        {
          title: "姓名",
          key: "outcome_name",
          align: "center"
        },
        {
          title: "申请人手机号",
          key: "outcome_mobile",
          align: "center"
        },
        {
          title: "申请人身份证",
          key: "outcome_card",
          align: "center"
        },
        {
          title: "提现渠道",
          key: "account_type",
          align: "center",
          render: (h, params) => {
            var obj = params.row.account_type;
            var aType = "";
            if (obj == 1) {
              aType = "银行卡";
            } else if (obj == 2) {
              aType = "微信";
            } else if (obj == 3) {
              aType = "支付宝";
            } else {
              aType = "微信打款或未知";
            }
            return h("div", aType);
          }
        },
        {
          title: "提现卡号",
          key: "outcome_account",
          align: "center"
        },
        {
          title: "提现金额",
          key: "outcome_money",
          align: "center"
        },
        {
          title: "提交时间",
          key: "outcome_start_time",
          align: "center"
        },
        {
          title: "状态",
          align: "center",
          render: h => {
            return h("div", "挂起");
          }
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
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
                      this.xuanzdshuj=params.row;
                      this.Chuitk(1);
                    }
                  }
                },
                "退回"
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
                        this.yuanData = params.row.Prompt;
                        this.Why(1);
                    }
                  }
                },
                "原因"
              )
            ]);
          }
        }
      ],
      data4: [],
      columns5: [
        {
          title: "ID",
          key: "id",
          align: "center"
        },
        {
          title: "用户ID",
          key: "user_id",
          align: "center"
        },
        {
          title: "姓名",
          key: "outcome_name",
          align: "center"
        },
        {
          title: "申请人手机号",
          key: "outcome_mobile",
          align: "center"
        },
        {
          title: "申请人身份证",
          key: "outcome_card",
          align: "center"
        },
        {
          title: "提现渠道",
          key: "account_type",
          align: "center",
          render: (h, params) => {
            var obj = params.row.account_type;
            var aType = "";
            if (obj == 1) {
              aType = "银行卡";
            } else if (obj == 2) {
              aType = "微信";
            } else if (obj == 3) {
              aType = "支付宝";
            } else {
              aType = "微信打款或未知";
            }
            return h("div", aType);
          }
        },
        {
          title: "提现卡号",
          key: "outcome_account",
          align: "center"
        },
        {
          title: "提现金额",
          key: "outcome_money",
          align: "center"
        },
        {
          title: "提交时间",
          key: "outcome_start_time",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", "已拒绝");
          }
        }
      ],
      data5: [],
      columns6: [
        {
          title: "ID",
          key: "id",
          align: "center"
        },
        {
          title: "用户ID",
          key: "user_id",
          align: "center"
        },
        {
          title: "姓名",
          key: "outcome_name",
          align: "center"
        },
        {
          title: "申请人手机号",
          key: "outcome_mobile",
          align: "center"
        },
        {
          title: "申请人身份证",
          key: "outcome_card",
          align: "center"
        },
        {
          title: "提现渠道",
          key: "account_type",
          align: "center",
          render: (h, params) => {
            var obj = params.row.account_type;
            var aType = "";
            if (obj == 1) {
              aType = "银行卡";
            } else if (obj == 2) {
              aType = "微信";
            } else if (obj == 3) {
              aType = "支付宝";
            } else {
              aType = "微信打款或未知";
            }
            return h("div", aType);
          }
        },
        {
          title: "提现卡号",
          key: "outcome_account",
          align: "center"
        },
        {
          title: "提现金额",
          key: "outcome_money",
          align: "center"
        },
        {
          title: "提交时间",
          key: "outcome_start_time",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            var orderstate = params.row.outcome_state;
            //console.log("orderstate:"+orderstate)
            if (orderstate == "0") {
              return h("div", "已拒绝");
            } else if (orderstate == "1") {
              return h("div", "已完成");
            } else if (orderstate == "2") {
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
                        this.modal2 = true;
                        this.rowdata1 = params.row;
                        this.index01 = params.index;
                      }
                    }
                  },
                  "通过"
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
                        this.modal4 = true;
                        this.rowdata1 = params.row;
                        this.index01 = params.index;
                      }
                    }
                  },
                  "拒绝"
                )
              ]);
            } else if (orderstate == "3") {
              return h("div", "打款中");
            } else if (orderstate == "4") {
              return h("div", "挂起");
            }
          }
        }
      ],
      data6: [],
      columns7: [
        {
          title: "ID",
          key: "id",
          align: "center"
        },
        {
          title: "用户ID",
          key: "user_id",
          align: "center"
        },
        {
          title: "姓名",
          key: "outcome_name",
          align: "center"
        },
        {
          title: "申请人手机号",
          key: "outcome_mobile",
          align: "center"
        },
        {
          title: "申请人身份证",
          key: "outcome_card",
          align: "center"
        },
        {
          title: "提现渠道",
          key: "account_type",
          align: "center",
          render: (h, params) => {
            var obj = params.row.account_type;
            var aType = "";
            if (obj == 1) {
              aType = "银行卡";
            } else if (obj == 2) {
              aType = "微信";
            } else if (obj == 3) {
              aType = "支付宝";
            } else {
              aType = "微信打款或未知";
            }
            return h("div", aType);
          }
        },
        {
          title: "提现卡号",
          key: "outcome_account",
          align: "center"
        },
        {
          title: "提现金额",
          key: "outcome_money",
          align: "center"
        },
        {
          title: "提交时间",
          key: "outcome_start_time",
          align: "center"
        },
        {
          title: "退款时间",
          key: "refund_time",
          align: "center"
        },
        {
          title: "状态",
          align: "center",
          render: h => {
            return h("div", "已退款");
          }
        }
      ],
      data7: []
    };
  },
  methods: {
    ok() {
      var params = {
        action: "pass"
      };
      var data = qs.stringify({
        take_id: this.rowdata1.id
      });
      this.api.apiPost(
        "/order/takeverify",
        "post",
        data,
        params,
        (status, code, res) => {
          if (status) {
            this.$Message.info("提现成功");
            this.data1.splice(this.index01, 1); //同步删除页面当前这条数据
          } else {
            this.$Message.error("" + res.msg);
          }
        }
      );
    },
    cancel() {
      //this.$Message.info('Clicked cancel');
    },
    ok2() {
      var params = {
        action: "refuse"
      };
      var data = qs.stringify({
        take_id: this.rowdata1.id
      });
      this.api.apiPost(
        "/order/takeverify",
        "post",
        data,
        params,
        (status, code, res) => {
          if (status) {
            this.$Message.info("拒绝成功");
            this.data1.splice(this.index01, 1); //同步删除页面当前这条数据
          } else {
            this.$Message.error("" + res.msg);
          }
        }
      );
    },
    ok3() {
      var params = {
        action: "pass"
      };
      var data = qs.stringify({
        take_id: this.rowdata1.id
      });
      this.api.apiPost(
        "/order/takeverify",
        "post",
        data,
        params,
        (status, code, res) => {
          if (status) {
            this.$Message.info("提现通过");
            this.data6.splice(this.index01, 1); //同步删除页面当前这条数据
          } else {
            this.$Message.error("" + res.msg);
          }
        }
      );
    },
    ok4() {
      var params = {
        action: "refuse"
      };
      var data = qs.stringify({
        take_id: this.rowdata1.id
      });
      this.api.apiPost(
        "/order/takeverify",
        "post",
        data,
        params,
        (status, code, res) => {
          if (status) {
            this.$Message.info("拒绝成功");
            this.data6.splice(this.index01, 1); //同步删除页面当前这条数据
          } else {
            this.$Message.error("" + res.msg);
          }
        }
      );
    },
    //原因弹框
    Why(value) {
      if (value == 1) {
        //开启弹框
        this.exitBounced1 = true;
      } else if (value == 2) {
        //取消
        this.exitBounced1 = false;
      }
    },
    //撤回弹框
    Chuitk(value) {
      if (value == 1) {
        //开启弹框
        this.exitBounced2 = true;
      } else if (value == 2) {
        //取消
        this.exitBounced2 = false;
      } else if (value == 3) {
          //确认
          this.exitBounced2 = false;
          this.chehdin();   
      }
    },
    //撤回订单
    chehdin(id) {
      var data = qs.stringify({
        //ID
        take_id: this.xuanzdshuj.id
      });
      var params = {
        state:"4",
        //操作类型 back=>撤回订单
        action: "back"
      };
      this.api.apiPost(
        "/order/takeverify",
        "POST",
        data,
        params,
        (status, judge, res) => {
          if (status) {
            this.$notify({
              title: "退回成功",
              type: "success",
              position: "bottom-right"
            });
            //初始化
            this.xuanzdshuj = [];
            //查询
            this.getGuaqi();
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error",
              position: "bottom-right"
            });
          }
        }
      );
    },
    getDataInfo() {
      var params = {
        action: "getAllTake",
        state: "2",
        page: this.pageNum
      };
      this.api.apiPost(
        "/order/takeverify",
        "get",
        "",
        params,
        (status, code, res) => {
          if (status) {
            this.data1 = res.data.takeList;
            this.pagesinfo = res.data.pages;
            this.pageSize = Number(this.pagesinfo.defaultPageSize);
            this.infoTotal01 = Number(this.pagesinfo.totalCount);
          } else {
            this.$Message.error("" + res.msg);
          }
        }
      );
    },
    getDkz() {
      var params = {
        action: "getAllTake",
        state: "3",
        page: this.pageNum
      };
      this.api.apiPost(
        "/order/takeverify",
        "get",
        "",
        params,
        (status, code, res) => {
          if (status) {
            this.data2 = res.data.takeList;
            this.pagesinfo = res.data.pages;
            this.pageSize = Number(this.pagesinfo.defaultPageSize);
            this.infoTotal01 = Number(this.pagesinfo.totalCount);
          } else {
            this.$Message.error("" + res.msg);
          }
        }
      );
    },
    getSucc() {
      var params = {
        action: "getAllTake",
        state: "1",
        page: this.pageNum
      };
      this.api.apiPost(
        "/order/takeverify",
        "get",
        "",
        params,
        (status, code, res) => {
          if (status) {
            this.data3 = res.data.takeList;
            this.pagesinfo = res.data.pages;
            this.pageSize = Number(this.pagesinfo.defaultPageSize);
            this.infoTotal01 = Number(this.pagesinfo.totalCount);
          } else {
            this.$Message.error("" + res.msg);
          }
        }
      );
    },
    getGuaqi() {
      var params = {
        action: "getAllTake",
        state: "4",
        page: this.pageNum
      };
      this.api.apiPost(
        "/order/takeverify",
        "get",
        "",
        params,
        (status, code, res) => {
          if (status) {
            this.data4 = res.data.takeList;
            this.pagesinfo = res.data.pages;
            this.pageSize = Number(this.pagesinfo.defaultPageSize);
            this.infoTotal01 = Number(this.pagesinfo.totalCount);
          } else {
            this.$Message.error("" + res.msg);
          }
        }
      );
    },
    getJujue() {
      var params = {
        action: "getAllTake",
        state: "0",
        page: this.pageNum
      };
      this.api.apiPost(
        "/order/takeverify",
        "get",
        "",
        params,
        (status, code, res) => {
          if (status) {
            this.data5 = res.data.takeList;
            this.pagesinfo = res.data.pages;
            this.pageSize = Number(this.pagesinfo.defaultPageSize);
            this.infoTotal01 = Number(this.pagesinfo.totalCount);
          } else {
            this.$Message.error("" + res.msg);
          }
        }
      );
    },
    yidak() {
      var params = {
        action: "getAllTake",
        state: "5",
        page: this.pageNum
      };
      this.api.apiPost(
        "/order/takeverify",
        "get",
        "",
        params,
        (status, code, res) => {
          if (status) {
            this.data7 = res.data.takeList;
            this.pagesinfo = res.data.pages;
            this.pageSize = Number(this.pagesinfo.defaultPageSize);
            this.infoTotal01 = Number(this.pagesinfo.totalCount);
          } else {
            this.$Message.error("" + res.msg);
          }
        }
      );
    },
    sosuoFun(e) {
      var params = {
        action: "getAllTake",
        key: this.soinfo,
        page: this.pageNumso
      };
      this.api.apiPost(
        "/order/takeverify",
        "get",
        "",
        params,
        (status, code, res) => {
          if (status) {
            this.data6 = res.data.takeList;
            this.nameNo = "name6";
            this.pagesinfo = res.data.pages;
            this.pageSize = Number(this.pagesinfo.defaultPageSize);
            this.infoTotal01 = Number(this.pagesinfo.totalCount);
          } else {
            this.$Message.error("" + res.msg);
          }
        }
      );
    },
    handlePage(value) {
      this.pageNum = value;
      this.getDataInfo();
    },
    handlePage2(value) {
      this.pageNum = value;
      this.getDkz();
    },
    handlePage3(value) {
      this.pageNum = value;
      this.getSucc();
    },
    handlePage4(value) {
      this.pageNum = value;
      this.getGuaqi();
    },
    handlePage5(value) {
      this.pageNum = value;
      this.getJujue();
    },
    handlePage6(value) {
      this.pageNumso = value;
      this.sosuoFun();
    },
    handlePage7(value) {
      this.pageNum = value;
      this.yidak();
    },
    tabClick(data) {
      if (data == "name1") {
        this.pageNum = 1;
        this.getDataInfo();
        this.nameNo = "name1";
      } else if (data == "name2") {
        this.pageNum = 1;
        this.getDkz();
        this.nameNo = "name2";
      } else if (data == "name3") {
        this.pageNum = 1;
        this.getSucc();
        this.nameNo = "name3";
      } else if (data == "name4") {
        this.pageNum = 1;
        this.getGuaqi();
        this.nameNo = "name4";
      } else if (data == "name5") {
        this.pageNum = 1;
        this.getJujue();
        this.nameNo = "name5";
      } else if (data == "name6") {
        this.pageNumso = 1;
        //this.sosuoFun();
        this.infoTotal01 = 1;
        this.nameNo = "name6";
      }else if (data == "name7") {
        this.pageNumso = 1;
        this.yidak();
        this.infoTotal01 = 1;
        this.nameNo = "name7";
      }
    }
  },
  mounted() {
    this.getDataInfo();
  }
};
</script>

<style scoped>
/* 弹框 */
.bounced {
  width: 550px;
  height: 210px;
  background: rgba(255, 255, 255, 1);
  position: relative;
  top: 50%;
  margin-top: -230px;
  left: 50%;
  margin-left: -275px;
}
.tebdwz3{
    width: 100%;
    height: 110px;
    line-height: 110px;
    text-align: center;
    font-size: 24px;
}
.b-ann {
    width: 60px;
    margin-left: 470px;
    padding-top: 0px;
}
.yhdmz {
  font-size: 14px;
  color: #404448;
  text-indent: 60px;
  line-height: 60px;
}
.b-anntes {
  width: 240px;
  text-align: right;
  margin-left: 280px;
  padding-top: 10px;
}
/*  */
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
.addbtn {
  width: 100%;
  display: inline-block;
  margin-bottom: 16px;
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
.jsbox {
  width: 100%;
  display: flex;
  font-size: 14px;
}
.js-left {
  flex: 1;
}
.js-right {
  flex: 1;
}
.filter-nav01 {
  float: left;
  width: 100%;
}
.filterBox {
  margin-bottom: 12px;
  display: inline-block;
}
.filter-name {
  float: left;
  line-height: 32px;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
}
.js-ipt {
  margin: 0 8px;
}
.js-nav01 {
  float: left;
  font-size: 14px;
}
.js-qx {
  cursor: pointer;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(3, 122, 255, 1);
  line-height: 32px;
  margin-left: 20px;
  float: left;
}
</style>