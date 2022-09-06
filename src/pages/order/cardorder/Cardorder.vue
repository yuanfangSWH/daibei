<template>
  <div class="content">
    <!-- 订单审核 -->
    <div class="black-div" v-if="exitBounced1">
      <div class="bounced2">
        <div class="b-bt">
          <div class="b-wz1">订单审核</div>
        </div>
        <div class="b-nr">
          <div class="tixdwz">
            <div class="blzbw">
              <div class="yhdmz" style="padding-top: 20px;">产品名称：{{xuanzdshuj.order_card_name}}</div>
              <div class="yhdmz" >申请人姓名：{{xuanzdshuj.order_to_name}}</div>
              <div class="yhdmz">用户返佣：{{orderyjin}}</div>
              <div class="yhdmz3">
                <el-input
                  class="s-input2"
                  type="primary"
                  placeholder="请输入拒绝的原因...（拒绝订单时必填）"
                  v-model="Refusedto"
                  clearable
                ></el-input>
              </div>
            </div>
          </div>
          <div class="b-anntes2">
            <el-button class="b-ant" style="margin-right: 30px;" @click="Dshenh(2)">取消审核</el-button>
            <el-button type="primary" @click="Dshenh(3)">确认审核</el-button>
            <el-button type="primary" @click="Dshenh(5)">拒绝订单</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 订单撤回 -->
    <div class="black-div" v-if="exitBounced2">
      <div class="bounced">
        <div class="b-bt">
          <div class="b-wz1">订单撤回</div>
        </div>
        <div class="b-nr">
          <div class="tixdwz">
            <div class="blzbw">
              <div class="yhdmz" style="padding-top: 20px;">撤回的订单号为：{{xuanzdshuj.id}}</div>
              <div class="yhdmz2">
                <el-input
                  class="s-input2"
                  type="primary"
                  placeholder="请输入撤回的原因...（必填）"
                  v-model="whyData"
                  clearable
                ></el-input>
              </div>
            </div>
          </div>
          <div class="b-anntes">
            <el-button class="b-ant" @click="Chuitk(2)">取消撤回</el-button>
            <el-button type="primary" @click="Chuitk(3)">确认撤回</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 一键待再查 -->
    <div class="black-div" v-if="exitBounced3">
      <div class="bounced">
        <div class="b-bt">
          <div class="b-wz1">一键待再查</div>
        </div>
        <div class="b-nr">
          <div class="tebdwz3">是否将【{{number}}】条订单全部一键待再查?</div>
          <div class="b-ann" style="padding-top: 10px;width: 190px;">
            <el-button class="b-ant" style="margin-right: 60px;" @click="Qshe(2)">取消</el-button>
            <el-button type="primary" @click="Qshe(3)">确认</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 搜索 -->
    <div data-v-a529ad74 class="search-div"></div>
    <!-- 列表 -->
    <div class="list-div">
      <div class="l-tab">
        <div class="tab-div tab-a" v-bind:class="{ choose: state==1 }" @click="tab(1)">待查询</div>
        <div class="tab-div tab-b" v-bind:class="{ choose: state==2 }" @click="tab(2)">待再查</div>
        <div class="tab-div tab-b" v-bind:class="{ choose: state==3 }" @click="tab(3)">已完成</div>
        <div class="tab-div tab-b" v-bind:class="{ choose: state==4 }" @click="tab(4)">未通过</div>
        <div class="tab-div tab-b" v-bind:class="{ choose: state==5 }" @click="tab(5)">失效订单</div>
      </div>
      <!-- 待查询 -->
      <div class="l-nr-a">
        <!-- 选择条件 -->
        <div class="xuanxi">
          <div class="dldm">
            <div class="xiwz">产品名称：</div>
            <div class="xidiv">
              <el-select v-model="bank" placeholder="全部">
                <el-option
                  v-for="item in bankData"
                  :key="item.id"
                  :label="item.card_name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
            <div class="xiwz">输入订单数：</div>
            <div class="xidiv">
              <el-input
                class="tebddinne"
                type="primary"
                placeholder="请输入...条"
                v-model="num"
                clearable
              ></el-input>条
            </div>
            <div class="xiteb"></div>
            <div class="xiwz">搜索关键字：</div>
            <div class="xidiv2">
              <el-input
                class="s-input"
                type="primary"
                placeholder="输入订单号/姓名/手机号/产品名称进行搜索"
                v-model="searchData"
                @change="loadingData"
                clearable
              ></el-input>
            </div>
          </div>
          <div class="dldm">
            <div class="szkrq">日期：</div>
            <div class="tbdxzd">
              <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
              <span>至</span>
              <el-date-picker v-model="value2" type="date" placeholder="选择日期"></el-date-picker>
            </div>
            <div class="wxyqd">
              <div class="quedan" @click="queryData">确定</div>
            </div>
            <div class="wxyqd2">
              <div class="quedan" @click="Exportff()">导出数据</div>
            </div>
            <div class="tebantg" v-show="state==1" @click="Qshe(1)">一键待再查</div>
          </div>
        </div>
        <div class="title">
          <div class="li">
            <el-button @click="setAllNo">全选/反选</el-button>
          </div>
          <div class="li">订单号</div>
          <div class="li">申请人用户头像</div>
          <div class="li" style="flex:2;">申请人用户名</div>
          <div class="li">推荐人ID</div>
          <div class="li">申请人姓名</div>
          <div class="li">申请人手机号</div>
          <div class="li" style="flex:2;">身份证</div>
          <div class="li" style="flex:2;">产品名称</div>
          <div class="li">用户返佣</div>
          <div class="li" style="flex:2;">提交时间</div>
          <div class="li">操作</div>
        </div>
        <div class="title" v-for="(item,key) in cardData" :key="key">
          <div class="li">
            <input type="checkbox" name="love" v-model="groupData" :value="item.id" />
          </div>
          <div class="li">{{item.id}}</div>
          <div class="li">
            <img :src="item.order_wxicon" />
          </div>
          <div class="li" style="flex:2;">{{item.order_nickname}}</div>
          <div class="li">{{item.order_end_user_id}}</div>
          <div class="li">{{item.order_to_name}}</div>
          <div class="li">{{item.order_to_mobile}}</div>
          <div class="li" style="flex:2;">{{item.order_to_card}}</div>
          <div class="li" style="flex:2;">{{item.order_card_name}}</div>
          <div class="li">{{item.order_yongjin_user}}</div>
          <div class="li" style="flex:2;">{{item.order_create_time}}</div>
          <div class="li" style="text-align: left;">
            <span
              class="li-abq1"
              style="color: #037aff;"
              v-show="state==1||state==2"
              @click="Dshenh(1,item)"
            >审核</span>
            <span class="li-abq1" style="color: #adadad; margin-left: 40px;" v-show="state==3">已完成</span>
            <span
              class="li-abq1"
              style="color: #e52e16;"
              v-show="state==4||state==5"
              @click="Chuitk(1,item)"
            >撤回</span>
          </div>
        </div>
        <div class="paging">
          <el-pagination
            background
            layout="prev, pager, next, jumper"
            :page-size="10"
            :total="totalCount"
            @current-change="jumpData"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Loading } from "element-ui";
import qs from "qs";
export default {
  data() {
    return {
      //切换状态
      state: 1,
      //条件
      conditions: 2,
      //搜索数据
      searchData: "",
      //数据
      cardData: [],
      //拉取数量
      num: "",
      //分页
      page: 1,
      //总数据量
      totalCount: 1,
      //订单审核弹框
      exitBounced1: false,
      //订单撤回弹框
      exitBounced2: false,
      //一键待再查弹框
      exitBounced3: false,
      //撤回的原因
      whyData: "",
      //拒绝的原因
      Refusedto: "",
      //选中的产品条件数据
      bank: "",
      //产品条件数据
      bankData: [{ id: "", card_name: "全部" }],
      //全选数据
      checkAll: true,
      //全选-选中的数据
      groupData: [],
      //起始日期
      value1: null,
      //结束日期
      value2: null,
      //日期数组
      dateTim: "",
      //数据数量
      number: 1,
      //当前选中的数据
      xuanzdshuj: [],
      //弹框的佣金价格
      orderyjin: ""
    };
  },
  //生命周期-页面初始化完成加载
  created() {
    this.loadingData();
    this.conditionsData();
  },
  methods: {
    //切换
    tab(value) {
      if (this.state == value) {
        //加载框
        let loadingInstance = Loading.service();
        setTimeout(function() {
          //关闭加载框
          loadingInstance.close();
        }, 300);
      } else {
        this.state = value;
        //初始化条件----
        //页数
        this.page = 1;
        //产品分类
        this.bank = "";
        //起始日期
        this.value1 = null;
        //结束日期
        this.value2 = null;
        //全选-选中的数据
        this.groupData = [];
        //初始化导出数量
        this.exportSl = "";
        //初始化结束----
        if (value == 1) {
          //待查询
          this.conditions = 2;
          this.loadingData();
        } else if (value == 2) {
          //待再查
          this.conditions = 3;
          this.loadingData();
        } else if (value == 3) {
          //已完成
          this.conditions = 1;
          this.loadingData();
        } else if (value == 4) {
          //未通过
          this.conditions = 5;
          this.loadingData();
        } else if (value == 5) {
          //失效订单
          this.conditions = 0;
          this.loadingData();
        }
        //加载框
        let loadingInstance = Loading.service();
        setTimeout(function() {
          //关闭加载框
          loadingInstance.close();
        }, 300);
      }
    },
    //全选/全不选操作
    setAllNo() {
      //初始化数据
      this.groupData = [];
      var loves = document.getElementsByName("love");
      if (this.checkAll) {
        this.checkAll = false;
        for (var i = 0; i < loves.length; i++) {
          loves[i].checked = true;
          //数据添加
          this.groupData.push(loves[i].value);
        }
      } else {
        this.checkAll = true;
        //数据清空
        this.groupData = [];
        for (var i = 0; i < loves.length; i++) {
          loves[i].checked = false;
        }
      }
    },
    //执行条件
    queryData() {
      if (this.value1 == null && this.value2 == null) {
        this.dateTim = null;
        //执行查询条件
        this.loadingData();
      } else if (this.value1 != null && this.value2 != null) {
        //格式化成为10位秒级时间戳
        var time1 = this.value1;
        var time2 = this.value2;
        time1 = time1.getTime() / 1000;
        time2 = time2.getTime() / 1000;
        this.dateTim = {
          start: time1,
          end: time2
        };
        //执行查询条件
        this.loadingData();
      } else if (this.value1 != null) {
        if (this.value2 == null) {
          this.$message({
            showClose: true,
            message: "结束日期不能为空",
            type: "error",
            position: "bottom-right"
          });
        }
      } else if (this.value2 != null) {
        if (this.value1 == null) {
          this.$message({
            showClose: true,
            message: "起始日期不能为空",
            type: "error",
            position: "bottom-right"
          });
        }
      }
    },
    //加载产品数据
    conditionsData() {
      var params = {
        //操作类型 getAllCard=>获取所有产品数据
        action: "getAllCard"
      };
      this.api.apiPost("/order/card", "get", "",params,(status, judge, res) => {
          if (status) {
            this.bankData = this.bankData.concat(res.data.AllCard);
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
    //加载主数据
    loadingData() {
      var params = {
        //操作类型 getOrder=>获取所有信用卡订单列表
        action: "getOrder",
        //贷款订单状态 0失效1完成2待查询3待再查4待结算5未通过
        state: this.conditions,
        //搜索关键词
        key: this.searchData,
        //拉取数量
        num: this.num,
        //日期范围数组
        date: this.dateTim,
        //产品选择条件
        cardId: this.bank,
        //页数
        page: this.page
      };
      this.api.apiPost(
        "/order/card",
        "get",
        "",
        params,
        (status, judge, res) => {
          if (status) {
            //数据
            this.cardData = res.data.orderList;
            //总数据量
            this.totalCount = Number(res.data.pages.totalCount);
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
    //下一页
    jumpData(val) {
      this.page = val;
      this.loadingData();
    },
    //导出
    Exportff() {
      var rq = "";
      if (this.dateTim == null) {
        rq = "";
      } else {
        rq = "&start=" + this.dateTim.start+"&end="+this.dateTim.end;
      }
      var data =
        //?表名&状态
        "?table=cardorder&state=" +
        this.conditions +
        //产品分类
        "&cardId=" +
        this.bank +
        //日期
        rq +
        //搜索关键字
        "&key=" +
        this.searchData;
      //导出数据API
      this.api.export(data);
    },
    //获取审核数据
    huoqSH() {
      var data = qs.stringify({
        order_id: this.xuanzdshuj.id
      });
      var params = {
        //操作类型 start=>获取审核数据
        action: "start"
      };
      this.api.apiPost(
        "/order/card",
        "POST",
        data,
        params,
        (status, judge, res) => {
          if (status) {
            //佣金价格
            var yonj = res.data.orderInfo.order_yongjin;
            //校验佣金价格是否包含#
            var reg = RegExp(/#/);
            if (yonj.match(reg)) {
              // 包含#就去除最后一位字符
              yonj = yonj.substr(0, yonj.length - 1);
              this.orderyjin = yonj + "元";
            } else {
              this.orderyjin = yonj;
            }
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
    //单审核弹框
    Dshenh(value, data) {
      if (value == 1) {
        this.xuanzdshuj = data;
        this.huoqSH();
        //开启弹框
        this.exitBounced1 = true;
      } else if (value == 2) {
        //取消
        this.exitBounced1 = false;
      } else if (value == 3) {
        //确认
        this.exitBounced1 = false;
        this.yijsh1();
      } else if (value == 5) {
        //判断拒绝原因是否为空
        if (this.Refusedto == "" || this.Refusedto == "null") {
          this.$message({
            showClose: true,
            message: "拒绝订单时需填写原因！",
            type: "error",
            position: "bottom-right"
          });
        } else {
          //确认
          this.exitBounced1 = false;
          this.yijsh3();
        }
      }
    },
    //单审核API方法
    yijsh1() {
      var data = qs.stringify({
        //订单ID
        order_id: this.xuanzdshuj.id
      });
      var params = {
        //操作类型 pass=>审核通过
        action: "pass"
      };
      this.api.apiPost(
        "/order/card",
        "POST",
        data,
        params,
        (status, judge, res) => {
          if (status) {
            this.$notify({
              title: "审核通过",
              type: "success",
              position: "bottom-right"
            });
            //初始化
            this.xuanzdshuj = [];
            this.loadingData();
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
    //订单拒绝
    yijsh3() {
      var data = qs.stringify({
        //订单ID
        order_id: this.xuanzdshuj.id,
        //拒绝原因
        value: {
          account: this.Refusedto
        }
      });
      var params = {
        //操作类型 fail=>拒绝
        action: "fail"
      };
      this.api.apiPost(
        "/order/card",
        "POST",
        data,
        params,
        (status, judge, res) => {
          if (status) {
            this.$notify({
              title: "订单拒绝成功",
              type: "success",
              position: "bottom-right"
            });
            //初始化
            this.xuanzdshuj = [];
            this.betData = "";
            this.Refusedto = "";
            this.loadingData();
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
    //撤回弹框
    Chuitk(value, data) {
      if (value == 1) {
        this.xuanzdshuj = data;
        //开启弹框
        this.exitBounced2 = true;
      } else if (value == 2) {
        //取消
        this.exitBounced2 = false;
      } else if (value == 3) {
        //判断撤回原因是否为空
        if (this.whyData == "" || this.whyData == "null") {
          this.$message({
            showClose: true,
            message: "撤回原因必填！",
            type: "error",
            position: "bottom-right"
          });
        } else {
          //确认
          this.exitBounced2 = false;
          this.chehdin();
        }
      }
    },
    //撤回订单
    chehdin(id) {
      var data = qs.stringify({
        //订单ID
        order_id: this.xuanzdshuj.id,
        //撤回原因
        value: {
          account: this.whyData
        }
      });
      var params = {
        //操作类型 back=>撤回订单
        action: "back"
      };
      this.api.apiPost(
        "/order/card",
        "POST",
        data,
        params,
        (status, judge, res) => {
          if (status) {
            this.$notify({
              title: "撤回成功",
              type: "success",
              position: "bottom-right"
            });
            //初始化
            this.xuanzdshuj = [];
            this.whyData = "";
            this.loadingData();
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
    //一键待再查方法
    Qshe(value) {
      if (this.groupData != "") {
        if (value == 1) {
          //开启弹框
          this.exitBounced3 = true;
          this.number = this.groupData.length;
        } else if (value == 2) {
          //取消
          this.exitBounced3 = false;
        } else if (value == 3) {
          //确认
          this.exitBounced3 = false;
          //一键待再查方法
          this.yijsh();
        }
      } else {
        this.$message({
          showClose: true,
          message: "未勾选订单！",
          type: "error",
          position: "bottom-right"
        });
      }
    },
    //一键待再查API
    yijsh() {
      var data = qs.stringify({
        //订单ID组
        value: { orderList: this.groupData }
      });
      var params = {
        //操作类型 allWait=>一键待再查
        action: "allWait"
      };
      this.api.apiPost(
        "/order/card",
        "POST",
        data,
        params,
        (status, judge, res) => {
          if (judge == "审核成功") {
            this.$notify({
              title: "一键待再查成功",
              type: "success",
              position: "bottom-right"
            });
            //初始化
            this.xuanzdshuj = [];
            this.whyData = "";
            this.groupData = [];
            this.loadingData();
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
    }
  }
};
</script>

<style scoped>
a {
  color: #037aff;
}
.li-abq1 {
  margin-left: 46px;
}
.li img {
  width: 50px;
  height: 50px;
  padding-top: 5px;
}
/* 选择条件 */
.xuanxi {
  width: 100%;
  height: 162px;
  border-bottom: 1px #e7e9ea solid;
}
.dldm {
  width: 100%;
  height: 81px;
  display: flex;
  line-height: 81px;
  font-size: 14px;
}
.xiwz {
  width: 128px;
  height: 100%;
  text-align: center;
}
.xidiv {
  width: 220px;
  height: 100%;
}
.xidiv2 {
  width: 320px;
  height: 100%;
  margin-right: 20px;
}
.s-input {
  margin-top: 0px;
}
.s-input2 {
  margin-top: 0px;
}
.xiteb {
  flex: 1;
  height: 100%;
}
.tesdind {
  width: 520px;
  height: 100%;
  float: right;
}
.tesdind .tebddinne {
  width: 190px;
  margin-right: 10px;
}
.szkrq {
  width: 128px;
  height: 100%;
  text-align: center;
}
.tbdxzd {
  width: 520px;
  height: 100%;
}
.wxyqd {
  flex: 1;
  height: 100%;
}
.wxyqd2 {
  width: 130px;
  height: 100%;
}
.quedan {
  width: 110px;
  height: 40px;
  background: rgba(3, 122, 255, 1);
  text-align: center;
  line-height: 40px;
  color: #ffffff;
  cursor: pointer;
  margin-top: 20px;
}
.tebantg {
  width: 110px;
  height: 40px;
  margin-right: 18px;
  background: rgba(3, 122, 255, 1);
  text-align: center;
  line-height: 40px;
  color: #ffffff;
  cursor: pointer;
  margin-top: 20px;
}
.tbdxzd span {
  padding-left: 10px;
  padding-right: 10px;
}
/* 弹框 */
.bounced {
  width: 550px;
  height: 250px;
  background: rgba(255, 255, 255, 1);
  position: relative;
  top: 50%;
  margin-top: -125px;
  left: 50%;
  margin-left: -275px;
}
.bounced2 {
  width: 550px;
  height: 370px;
  background: rgba(255, 255, 255, 1);
  position: relative;
  top: 50%;
  margin-top: -185px;
  left: 50%;
  margin-left: -275px;
}
.b-anntes {
  width: 240px;
  text-align: right;
  margin-left: 280px;
  padding-top: 10px;
}
.b-anntes2 {
  width: 360px;
  text-align: right;
  margin-left: 170px;
  padding-top: 10px;
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
.tixdwz {
  width: 100%;
  display: flex;
}
.blzbw {
  flex: 1;
}
.yhdmz {
  font-size: 14px;
  color: #404448;
  text-indent: 60px;
  line-height: 60px;
}
.yhdmz3 {
  width: 458px;
  font-size: 14px;
  color: #404448;
  line-height: 40px;
  margin-left: 60px;
  margin-bottom: 20px;
  display: flex;
}
.yhdmz2 {
  width: 458px;
  font-size: 14px;
  color: #404448;
  line-height: 40px;
  margin-left: 60px;
  margin-bottom: 20px;
}
.tebd {
  width: 152px;
  margin-left: 10px;
  margin-right: 10px;
}
.tebdshur {
  width: 100%;
  height: 42px;
  font-size: 14px;
  color: #404448;
  line-height: 42px;
  display: flex;
  padding-top: 16px;
}
.tebdwz2 {
  color: #404448;
  font-size: 14px;
  text-align: center;
  padding-top: 130px;
  padding-bottom: 90px;
}
.tebdwz3 {
  color: #404448;
  font-size: 14px;
  text-align: center;
  padding-top: 50px;
  padding-bottom: 50px;
}
.tebdxial {
  width: 300px;
  height: 42px;
  font-size: 14px;
  color: #404448;
  line-height: 42px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 50px;
}
.content {
  position: absolute;
  top: 54px;
  left: 220px;
  background: #ebf1f4;
  padding-left: 20px;
  box-sizing: border-box;
  height: calc(100vh - 54px);
}

.tableBox >>> .ivu-table-wrapper {
  width: 100% !important;
}
.tabbox >>> .ivu-btn {
  margin-top: 5px;
}
.searchbtn {
  width: 100%;
  padding: 20px 0;
  float: left;
  background: #ebf1f4;
}
.search {
  width: 460px;
  float: right;
  margin-right: 20px;
}
.tabbox {
  background: #ffffff;
  padding: 10px 20px 20px;
  width: calc(100% - 20px);
  height: calc(100vh - 130px);
  float: left;
}
.tableBox {
  height: calc(100vh - 318px);
  overflow-y: scroll;
}
.pagebox {
  background: #ffffff;
  text-align: center;
  padding: 30px 0 50px;
  width: calc(100% - 20px);
}
.filterBox {
  width: 100%;
  float: left;
}
.filter-left {
  float: left;
  width: 560px;
}
.filter-nav01 {
  float: left;
  margin-right: 20px;
}
.filter-name {
  float: left;
  line-height: 30px;
}
.filter-select {
  float: left;
}
.xialaBox,
.riqiBox {
  width: 560px;
  float: left;
  margin-bottom: 20px;
}
.rili-01 {
  float: left;
}
.rili-span {
  float: left;
  line-height: 30px;
  padding: 0 10px;
}
.filter-right {
  float: right;
  margin-right: 20px;
}
.iptdiv {
  width: 100px;
  display: inline-block;
  margin-right: 5px;
}
.order-ipt01 {
  height: 30px;
  border-radius: 4px;
  border: 1px solid #dcdee2;
  margin: 0 5px;
  padding: 0 8px;
}
.order-btn01 {
  width: 110px;
  height: 31px;
  color: #ffffff;
  background: #2d8cf0;
  border: none;
  margin-top: 20px;
  float: right;
}
.sxbtn {
  width: 50px;
  height: 31px;
  color: #ffffff;
  background: #2d8cf0;
  border: none;
  margin-left: 10px;
}
.xk-nav {
  width: 120px;
  display: inline-block;
  margin-right: 5px;
}
.xkbox {
  margin-bottom: 10px;
  font-size: 14px;
}
.search-div {
  height: 20px;
  padding-top: 0px;
  margin-bottom: 0px;
}
</style>