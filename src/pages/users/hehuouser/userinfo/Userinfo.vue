<template>
  <div class="content">
    <div class="addbtn">
      <router-link to="/users/Hehuouser">
        <button>返回</button>
      </router-link>
    </div>
    <div class="addpage-box">
      <div class="infonav01">
        <div class="info-left">
          <div class="add-title">用户详情</div>
          <div class="leftbox">
            <div class="a01">
              <!-- <div class="a-toux"><img src="/static/images/avatar_icon.png" alt="" /></div> -->
              <div class="a-toux">
                <img :src="uinfo.avatar" alt />
              </div>
              <div class="a-nic">{{uinfo.nickname}}</div>
              <div class="a-dj">
                <span>{{uinfo.user_type}}</span>
              </div>
            </div>
            <div class="a02">
              <ul>
                <li>
                  <p>{{uinfo.team_nums}}人</p>
                  <span class="b-01">团队人数</span>
                </li>
                <li>
                  <p>{{uinfo.up_nums}}人</p>
                  <span class="b-02">直推合伙</span>
                </li>
                <li>
                  <p>{{uinfo.team_money}}元</p>
                  <span class="b-01">团队业绩</span>
                </li>
                <li>
                  <p>{{uinfo.pri_money}}元</p>
                  <span class="b-02">个人业绩</span>
                </li>
              </ul>
            </div>
            <div class="a05">
              <ul>
                <li>
                  <span class="a03 a03-2">手机号</span>
                  <span class="a04">{{uinfo.mobile}}</span>
                </li>
                <li>
                  <span class="a03 a03-3">微信号</span>
                  <span class="a04">{{uinfo.wx}}</span>
                </li>
                <li>
                  <span class="a03 a03-5">注册时间</span>
                  <span class="a04">{{uinfo.reg_time}}</span>
                </li>
                <li>
                  <span class="a03 a03-4">用户余额</span>
                  <span class="a04">{{uinfo.account}}元</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="info-right">
          <div class="add-title">用户详情</div>
          <div class="orderbox">
            <div class="order-child or01">
              <div class="c-01">昨日收入</div>
              <div class="c-02">
                {{orderdata.yesIncome}}
                <span>元</span>
              </div>
            </div>
            <div class="order-child or01">
              <div class="c-01">上月收入</div>
              <div class="c-02">
                {{orderdata.lastMonthMoney}}
                <span>元</span>
              </div>
            </div>
            <div class="order-child or01">
              <div class="c-01">累计收入</div>
              <div class="c-02">
                {{orderdata.allMonthMoney}}
                <span>元</span>
              </div>
            </div>
          </div>
          <div class="orderbox">
            <div class="order-child or02">
              <div class="c-01">昨日办卡订单</div>
              <div class="c-02">
                {{orderdata.yesCardOrder}}
                <span>件</span>
              </div>
            </div>
            <div class="order-child or02">
              <div class="c-01">上月办卡订单</div>
              <div class="c-02">
                {{orderdata.lastCardOrder}}
                <span>件</span>
              </div>
            </div>
            <div class="order-child or02">
              <div class="c-01">累计办卡订单</div>
              <div class="c-02">
                {{orderdata.allCardOrder}}
                <span>件</span>
              </div>
            </div>
          </div>
          <div class="orderbox">
            <div class="order-child or03">
              <div class="c-01">昨日贷款订单</div>
              <div class="c-02">
                {{orderdata.yesLoanOrder}}
                <span>件</span>
              </div>
            </div>
            <div class="order-child or03">
              <div class="c-01">上月贷款订单</div>
              <div class="c-02">
                {{orderdata.lastLoanOrder}}
                <span>件</span>
              </div>
            </div>
            <div class="order-child or03">
              <div class="c-01">累计贷款订单</div>
              <div class="c-02">
                {{orderdata.allLoanOrder}}
                <span>件</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="formBox">
        <div id="main" style="width: 95%;height:400px;"></div>
      </div>
      <div class="jl-t">提现记录</div>
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  name: "Userinfo",
  data() {
    return {
      forminfo: "",
      id: "",
      orderdata: "",
      uinfo: "",
      pagesinfo: "",
      infoTotal01: 0,
      pageNum: 1, //当前页数
      pageSize: 10, //每页的条数
      timeData: [],
      orderNum: [],
      fyNum: [],
      formItem: {
        infoData: ""
      },
      columns1: [
        {
          title: "id",
          key: "id",
          align: "center"
        },
        {
          title: "姓名",
          key: "outcome_name",
          align: "center"
        },
        {
          title: "提现方式",
          key: "account_type",
          align: "center"
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
          title: "状态",
          key: "outcome_state",
          align: "center"
        },
        {
          title: "处理日期",
          key: "outcome_start_time",
          align: "center"
        }
      ],
      data1: [],
      sid: ""
    };
  },
  created() {
    this.sid = this.$route.query.sid;
    var params = {
      action: "getInfo"
    };
    var data = qs.stringify({
      userId: this.sid
    });
    this.api.apiPost(
      "/user/userop",
      "post",
      data,
      params,
      (status, code, res) => {
        if (status) {
          var obj = new Object();
          obj = res.data;
          obj.id = this.sid;
          this.infoData = obj;
          this.uinfo = this.infoData.userInfo;
          if (this.uinfo.user_type == 0) {
            this.uinfo.user_type = "普通用户";
          } else if (this.uinfo.user_type == 1) {
            this.uinfo.user_type = "合伙人";
          }
          this.orderdata = this.infoData.order;
          this.id = this.infoData.id;
        } else {
          this.$Message.error("" + res.msg);
        }
      }
    );
  },
  methods: {
    orderFun() {
      var params = {
        action: "take",
        page: this.pageNum
      };
      var data = qs.stringify({
        userId: this.sid
      });
      this.api.apiPost(
        "/user/userop",
        "post",
        data,
        params,
        (status, code, res) => {
          if (status) {
            this.data1 = res.data.take;
            for (var i = 0; i < this.data1.length; i++) {
              if (this.data1[i].account_type == "1") {
                this.data1[i].account_type = "银行卡";
              } else if (this.data1[i].account_type == "2") {
                this.data1[i].account_type = "微信";
              } else if (this.data1[i].account_type == "3") {
                this.data1[i].account_type = "支付宝";
              }
              if (this.data1[i].outcome_state == "0") {
                this.data1[i].outcome_state = "失败";
              } else if (this.data1[i].outcome_state == "1") {
                this.data1[i].outcome_state = "成功";
              } else if (this.data1[i].outcome_state == "2") {
                this.data1[i].outcome_state = "待审核";
              } else if (this.data1[i].outcome_state == "3") {
                this.data1[i].outcome_state = "提现中";
              } else if (this.data1[i].outcome_state == "4") {
                this.data1[i].outcome_state = "挂起";
              }
            }
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
      this.orderFun();
    },
    formData() {
      var params = {
        action: "form"
      };
      var data = qs.stringify({
        userId: this.sid
      });
      this.api.apiPost(
        "/user/userop",
        "post",
        data,
        params,
        (status, code, res) => {
          if (status) {
            let { keys, values, entries } = Object;
            this.forminfo = res.data.form;
            for (let key of keys(this.forminfo)) {
              //console.log("这是key："+key);
              this.timeData = this.timeData.concat(key);
            }
            for (let value of values(this.forminfo)) {
              //console.log("这是value："+JSON.stringify(value));
              this.orderNum = this.orderNum.concat(value.apply);
              this.fyNum = this.fyNum.concat(value.applyed);
            }
            this.drawChart();
          } else {
            this.$Message.error("" + res.msg);
          }
        }
      );
    },
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      let option = {
        color: ["#037AFF", "#2EA400"],
        title: {
          text: "数据报表（最近30天）"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["申请订单", "返佣订单"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.timeData
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "申请订单",
            type: "line",
            symbol: "circle", //设定为实心点
            symbolSize: 12, //设定实心点的大小
            stack: "总量",
            data: this.orderNum
          },
          {
            name: "返佣订单",
            type: "line",
            symbol: "circle", //设定为实心点
            symbolSize: 12, //设定实心点的大小
            stack: "总量",
            data: this.fyNum
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  mounted() {
    this.formData();
    this.orderFun();
  }
};
</script>

<style scoped>
ul li {
  list-style: none;
}
.content {
  position: absolute;
  top: 54px;
  left: 240px;
  width: calc(100% - 240px);
  height: calc(100vh - 242px);
  overflow-y: scroll;
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
.addpage-box {
  float: left;
  width: calc(100% - 20px);
  background: #ffffff;
}
.add-title {
  width: 100%;
  border-bottom: 1px solid #e7e9ea;
  box-sizing: border-box;
  padding: 12px 20px;
  font-size: 14px;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
}
.add-ul {
  padding: 30px 50px;
  float: left;
}
.add-ul li {
  margin-bottom: 40px;
  width: 100%;
  float: left;
}
.infonav01 {
  width: 100%;
  float: left;
  border-bottom: 20px solid #ebf1f4;
  display: flex;
}
.info-left {
  float: left;
  width: 896px;
}
.leftbox {
  float: left;
  width: 896px;
  display: flex;
  margin: 34px;
}
.a01 {
  width: 100px;
  text-align: center;
  float: left;
  margin-right: 31px;
  margin-top: 32px;
}
.a-toux {
  width: 100px;
  height: 65px;
  text-align: center;
}
.a-toux img {
  width: 65px;
  height: 65px;
  border-radius: 65px;
  display: inline-block;
}
.a-nic {
  width: 100px;
  display: inline-block;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  margin: 3px 0;
}
.a-dj {
  width: 100px;
  display: inline-block;
}
.a-dj span {
  width: 80px;
  height: 24px;
  line-height: 24px;
  color: #ffffff;
  font-size: 14px;
  background: #037aff;
  border-radius: 32px;
  display: inline-block;
}
.a02 {
  width: 344px;
  text-align: center;
  float: left;
  background: #f3f7fa;
}
.a02 li {
  width: 50%;
  float: left;
  margin-top: 31px;
}
.a02 li p {
  font-size: 14px;
  color: #000;
  font-weight: 500;
}
.a02 li .b-01 {
  width: 98px;
  height: 24px;
  line-height: 24px;
  color: #ffffff;
  font-size: 14px;
  background: #037aff;
  border-radius: 32px;
  display: inline-block;
}
.a02 li .b-02 {
  width: 98px;
  height: 24px;
  line-height: 24px;
  color: #ffffff;
  font-size: 14px;
  background: #ffaf03;
  border-radius: 32px;
  display: inline-block;
}
.info-right {
  flex: 1;
  float: left;
  font-size: 14px;
  font-family: PingFang SC;
  color: rgba(0, 0, 0, 1);
  line-height: 20px;
  border-left: 20px solid #ebf1f4;
}
.a05 ul li {
  margin: 15px 0;
  float: left;
  width: 100%;
}
.a05 {
  float: left;
  flex: 1;
  margin-left: 50px;
}
.a03 {
  float: left;
  padding-left: 30px;
  width: 110px;
}
.a03-2 {
  background: url(/static/images/u2.png) no-repeat left center;
  background-size: 20px 20px;
}
.a03-3 {
  background: url(/static/images/u3.png) no-repeat left center;
  background-size: 20px 20px;
}
.a03-4 {
  background: url(/static/images/u6.png) no-repeat left center;
  background-size: 20px 20px;
}
.a03-5 {
  background: url(/static/images/u5.png) no-repeat left center;
  background-size: 20px 20px;
}
.a04 {
  float: left;
}
.tableBox {
  width: 100%;
  font-size: 14px;
}
.pagebox {
  background: #ffffff;
  text-align: center;
  padding: 30px 0 50px;
  width: calc(100% - 20px);
}
.jl-t {
  width: 100%;
  float: left;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  box-sizing: border-box;
  padding: 10px 20px;
}
.orderbox {
  width: 100%;
  float: left;
  display: flex;
  margin-bottom: 5px;
  box-sizing: border-box;
  padding-left: 20px;
  margin-top: 10px;
}
.order-child {
  flex: 1;
  text-align: center;
  height: 80px;
}
.or01 {
  background-color: #f9faf3;
  margin-right: 10px;
}
.or02 {
  background-color: #f6f6f6;
  margin-right: 10px;
}
.or03 {
  background-color: #f3f7fa;
  margin-right: 10px;
}
.c-01 {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(134, 141, 156, 1);
  margin: 12px 0;
}
.c-02 {
  font-size: 22px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(94, 101, 117, 1);
}
.c-02 span {
  font-size: 14px !important;
}
.formBox {
  width: 100%;
  float: left;
  border-bottom: 10px solid #ebf1f4;
  padding-top: 20px;
  padding-left: 20px;
}
</style>