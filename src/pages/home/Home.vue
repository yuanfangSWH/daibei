<template>
  <div class="content" v-loading="loading">
    <!-- 统计 -->
    <div class="statistical">
      <div class="tonj">
        <div class="t-bt">平台注册用户统计</div>
        <div class="t-nr">
          <div class="t-img">
            <img src="static/images/yhtb1.png" />
          </div>
          <div class="t-wz">
            <div class="t-wzt1">总注册用户</div>
            <div class="t-wzt2">
              {{statistical1.sum_user}}
              <span>人</span>
            </div>
          </div>
          <div class="t-img">
            <img src="static/images/yhtb2.png" />
          </div>
          <div class="t-wz">
            <div class="t-wzt1">今日新增用户</div>
            <div class="t-wzt2">
              {{statistical1.today_adduser}}
              <span>人</span>
            </div>
          </div>
        </div>
      </div>
      <div class="tonj">
        <div class="t-bt">订单注册统计</div>
        <div class="t-nr">
          <div class="t-img">
            <img src="static/images/bjtb1.png" />
          </div>
          <div class="t-wz">
            <div class="t-wzt1">总订单注册量</div>
            <div class="t-wzt2">
              {{statistical2.sum_order}}
              <span>件</span>
            </div>
          </div>
          <div class="t-img">
            <img src="static/images/bjtb2.png" />
          </div>
          <div class="t-wz">
            <div class="t-wzt1">总审核订单量</div>
            <div class="t-wzt2">
              {{statistical2.month_order}}
              <span>件</span>
            </div>
          </div>
        </div>
      </div>
      <div class="tonj">
        <div class="t-bt">信用卡通过数统计</div>
        <div class="t-nr">
          <div class="t-img">
            <img src="static/images/yhktb1.png" />
          </div>
          <div class="t-wz">
            <div class="t-wzt1">通过总数</div>
            <div class="t-wzt2">
              {{statistical3.sum_card}}
              <span>件</span>
            </div>
          </div>
          <div class="t-img">
            <img src="static/images/yhktb2.png" />
          </div>
          <div class="t-wz">
            <div class="t-wzt1">上月通过数</div>
            <div class="t-wzt2">
              {{statistical3.month_card}}
              <span>件</span>
            </div>
          </div>
        </div>
      </div>
      <div class="tonj">
        <div class="t-bt">贷款通过数统计</div>
        <div class="t-nr">
          <div class="t-img">
            <img src="static/images/daik1.png" />
          </div>
          <div class="t-wz">
            <div class="t-wzt1">通过总数</div>
            <div class="t-wzt2">
              {{statistical4.sum_loan}}
              <span>件</span>
            </div>
          </div>
          <div class="t-img">
            <img src="static/images/daik2.png" />
          </div>
          <div class="t-wz">
            <div class="t-wzt1">上月通过数</div>
            <div class="t-wzt2">
              {{statistical4.month_loan}}
              <span>件</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 分析 -->
    <div class="calculate">
      <div class="c-bt">今日昨天各时段收益分析</div>
      <div class="c-nr">
        <div class="c-nrdind" style="margin-left: 50px;">
          <dl class="c-wz1">今日申请订单</dl>
          <dl class="c-wz2">(0点到当前)</dl>
          <dl class="c-wz3">
            {{cardData1.today_all_order}}
            <span>件</span>
          </dl>
        </div>
        <div class="c-nrdind">
          <dl class="c-wz1">今日返佣订单</dl>
          <dl class="c-wz2">(0点到当前)</dl>
          <dl class="c-wz3">
            {{cardData1.today_success_order}}
            <span>件</span>
          </dl>
        </div>
        <div class="c-nrdind">
          <dl class="c-wz1">今日预估收入</dl>
          <dl class="c-wz2">(0点到当前)</dl>
          <dl class="c-wz3">
            {{cardData1.today_estimate_income}}
            <span>元</span>
          </dl>
        </div>
        <div class="c-nrdind">
          <dl class="c-wz1">昨日申请订单</dl>
          <dl class="c-wz2">(昨日全天)</dl>
          <dl class="c-wz3">
            {{cardData2.yesterday_all_order}}
            <span>件</span>
          </dl>
        </div>
        <div class="c-nrdind">
          <dl class="c-wz1">昨日返佣订单</dl>
          <dl class="c-wz2">(昨日全天)</dl>
          <dl class="c-wz3">
            {{cardData2.yesterday_success_order}}
            <span>件</span>
          </dl>
        </div>
        <div class="c-nrdind">
          <dl class="c-wz1">昨日预估收入</dl>
          <dl class="c-wz2">(昨日全天)</dl>
          <dl class="c-wz3">
            {{cardData2.yesterday_estimate_income}}
            <span>元</span>
          </dl>
        </div>
      </div>
    </div>
    <!-- 图表 -->
    <div class="chart">
      <div class="tb-bt">
        实时数据
        <span>（统计时间：{{shijData}}）</span>
      </div>
      <div class="tb-nr">
        <ve-line :data="chartData" :settings="chartSettings"></ve-line>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    this.chartSettings = {
      metrics: ["今日申请订单", "昨日申请订单"],
      dimension: ["日期"]
    };
    return {
      //统计数据
      statistical1: { sum_user: 0, today_adduser: 0 },
      statistical2: { sum_order: 0, month_order: 0 },
      statistical3: { sum_card: 0, month_card: 0 },
      statistical4: { sum_loan: 0, month_loan: 0 },
      //收益数据1
      cardData1: [],
      //收益数据2
      cardData2: [],
      //图表时间
      shijData: "",
      // 图表数据
      chartData: {
        columns: ["日期", "今日申请订单", "昨日申请订单"],
        rows: []
      },
      loading: true
    };
  },
  //生命周期-页面初始化完成加载
  created() {
    this.loadingData();
  },
  methods: {
    //加载统计数据
    loadingData() {
      this.api.apiPost(
        "/datascreen/datacount",
        "get",
        "",
        "",
        (status, judge, res) => {
          if (status) {
            this.statistical1 = res.data.user_count;
            this.statistical2 = res.data.order_count;
            this.statistical3 = res.data.cardorder_count;
            this.statistical4 = res.data.loanorder_count;
            this.loadingData2();
          } else {
            //关闭加载
            this.loading = false;
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
    //加载当日订单及收入统计
    loadingData2() {
      this.api.apiPost(
        "/datascreen/todaycount",
        "get",
        "",
        "",
        (status, judge, res) => {
          if (status) {
            this.cardData1 = res.data;
            this.loadingData3();
          } else {
            //关闭加载
            this.loading = false;
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
    //昨日订单及收入统计
    loadingData3() {
      this.api.apiPost(
        "/datascreen/yesterdaycount",
        "get",
        "",
        "",
        (status, judge, res) => {
          if (status) {
            this.cardData2 = res.data;
            this.loadingData4();
          } else {
            //关闭加载
            this.loading = false;
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
    //加载报表数据
    loadingData4() {
      this.api.apiPost(
        "/datascreen/dataview",
        "get",
        "",
        "",
        (status, judge, res) => {
          if (status) {
            //报表数据
            for (var i = 0; i < res.data.length; i++) {
              this.chartData.rows.push({
                日期: res.data[i].time,
                今日申请订单: res.data[i].today_order,
                昨日申请订单: res.data[i].yesterday_order
              });
              //获取当前日期
              var myDate = new Date();
              //统计时间
              this.shijData = myDate.toLocaleDateString();
            }
            //关闭加载
            this.loading = false;
          } else {
            //关闭加载
            this.loading = false;
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error",
              position: "bottom-right"
            });
          }
        }
      );
    }
  }
};
</script>

<style scoped>
.content {
  position: absolute;
  top: 54px;
  left: 220px;
  background: #ebf1f4;
  padding-left: 20px;
  padding-right: 8px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
/* 图表 */
.chart {
  width: 1655px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;
  background-color: #ffffff;
  border: 1px solid rgba(231, 233, 234, 1);
}
.tb-bt {
  width: 100%;
  height: 56px;
  line-height: 56px;
  font-size: 15px;
  text-indent: 20px;
}
.tb-bt span {
  color: #9b9b9b;
}
.tb-nr {
  width: 100%;
}
/* 分析 */
.calculate {
  width: 1655px;
  height: auto;
  margin-bottom: 15px;
  background-color: #ffffff;
  border: 1px solid rgba(231, 233, 234, 1);
}
.c-bt {
  width: 100%;
  height: 56px;
  line-height: 56px;
  font-size: 15px;
  text-indent: 20px;
  border-bottom: 1px #b5adac solid;
}
.c-nr {
  width: 100%;
  height: 246px;
  display: flex;
}
.c-nrdind {
  width: 230px;
  height: 150px;
  margin-top: 48px;
  margin-left: 40px;
  background-color: #f3f7fa;
}
.c-wz1 {
  text-align: center;
  font-size: 20px;
  color: #868d9c;
  padding-top: 26px;
}
.c-wz2 {
  text-align: center;
  font-size: 14px;
  color: #b6bcca;
  padding-top: 10px;
}
.c-wz3 {
  text-align: center;
  font-size: 32px;
  color: #5e6575;
  padding-top: 14px;
}
.c-wz3 span {
  font-size: 16px;
}
/* 统计css */
.statistical {
  width: 1655px;
  height: auto;
  display: flex;
  padding-top: 15px;
  margin-bottom: 15px;
}
.tonj {
  width: 410px;
  height: 100%;
  background-color: #ffffff;
  border: 1px solid rgba(231, 233, 234, 1);
  margin-right: 5px;
}
.t-bt {
  width: 100%;
  height: 56px;
  line-height: 56px;
  font-size: 15px;
  text-indent: 20px;
  border-bottom: 1px #b5adac solid;
}
.t-nr {
  width: 100%;
  height: 108px;
  display: flex;
}
.t-img {
  width: 56px;
  height: 56px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 23px;
}
.t-img img {
  width: 56px;
  height: 56px;
}
.t-wz {
  width: 160px;
  height: 56px;
  margin-top: 23px;
}
.t-wzt1 {
  font-size: 14px;
  line-height: 28px;
  color: #adadad;
}
.t-wzt2 {
  font-size: 22px;
}
.t-wzt2 span {
  font-size: 14px;
}
</style>