<template>
  <div class="content">
    <div class="addbtn">
      <button>模板推送</button>
    </div>
    <div class="tabbox">
      <!-- 文章推送 -->
      <div class="mbcss">
        <div class="wzhang">模板名称:</div>
        <el-select class="tsong" v-model="mbdata" @change="xuanz" placeholder="点击请选择...">
          <el-option
            v-for="item in bankData"
            :key="item.template_id"
            :label="item.title"
            :value="item.template_id"
          ></el-option>
        </el-select>
      </div>
      <!-- 模板实例 -->
      <div class="mbcss">
        <div class="mbsl">模板示例:</div>
        <div class="tsong">
          <pre class="db-mbziti">{{indata}}</pre>
        </div>
      </div>
      <!-- 任务名称 -->
      <div class="mbcss">
        <div class="mbsl1">任务名称:</div>
        <div class="tsong">
          <input class="t-ipt" v-model="rwdata" type="text" placeholder="请填写推送标题" />
        </div>
      </div>
      <div class="mbcss">
        <div class="mbsl1">成员类型:</div>
        <!-- 指定成员发送信息 -->
        <el-radio-group class="xuanx" v-model="radio">
          <el-radio :label="0">全体成员</el-radio>
          <el-radio :label="1">指定成员</el-radio>
          <el-radio :label="2">普通用户</el-radio>
          <el-radio :label="3">合伙人</el-radio>
        </el-radio-group>
      </div>
      <!-- 任务名称 -->
      <div class="mbcss" v-if="radio==1">
        <div class="mbsl1">部分成员:</div>
        <div class="tsong1">
          <input class="t-ipt" v-model="user_id" type="text" placeholder="请输入成员ID如多个成员请用,隔开" />
          请输入成员ID如多个成员请用逗号隔开
        </div>
      </div>
      <!-- 任务名称 -->
      <div class="mbcss" v-for="(item,index) in shucdata" :key="index">
        <div class="mbsl2">{{item.type}}:</div>
        <!-- 动态任务输入框 -->
        <div class="tsong">
          <input class="t-ipt" type="text" v-model="item.nndata" placeholder="必填..." />
        </div>
      </div>
      <!-- 更新时间 -->
      <div class="mbcss">
        <div class="mbsl1">备注内容:</div>
        <div class="tsong">
          <Input
            class="kdu"
            type="textarea"
            v-model="nrdata"
            :autosize="{minRows: 2,maxRows: 50}"
            placeholder="请输入问题内容"
          />
          <!-- <el-input class="tlbdjl" type="textarea" :rows="10" placeholder="请输入问题内容" ></el-input> -->
        </div>
      </div>

      <!-- 任务名称 -->
      <div class="mbcss">
        <div class="mbsl1">跳转链接:</div>
        <div class="tsong">
          <input class="t-ipt" v-model="urldata" type="text" placeholder="请输入模板跳转链接" />
        </div>
      </div>
      <button class="t-btn" type="submit" @click="yianz">保存</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Loading } from "element-ui";
import qs from "qs";
export default {
  name: "Account",
  components: {},
  data() {
    return {
      // 下拉选定的值
      mbdata: "",
      mbdata1: "",
      // 模板条件数据
      bankData: [],
      //  获取模板数据接口
      carddata: "",
      //  根据动态获取input输入框
      shucdata: [],
      //  获取input相应的值
      nndata: "",
      nndata1: "",
      nndata2: "",
      nndata3: "",
      nndata4: "",
      //返回信息
      msgdata: "",
      //模板实例信息
      indata: "",
      bndata: [],
      //  指定用户id
      user_id: "",
      //  模板跳转链接
      urldata: "",
      //  任务名称
      rwdata: "",
      //   绑定的id
      title: "",
      // 备注内容
      nrdata: "",
      //  测试发送信息到指定成员
      radio: ""
      // 固定测试
    };
  },
  //生命周期-页面初始化完成加载
  created() {
    this.loadingData();
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
        //产品分类
        this.mbdata = "";
        //加载框
        let loadingInstance = Loading.service();
        setTimeout(function() {
          //关闭加载框
          loadingInstance.close();
        }, 300);
      }
    },

    //加载主数据
    loadingData() {
      var params = {
        action: "allTitle"
      };
      this.api.apiPost(
        "/push/example",
        "get",
        "",
        params,
        (status, judge, res) => {
          if (status) {
            this.bankData = this.bankData.concat(res.data);
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

    //选择下拉
    xuanz: function() {
      var params = {
        action: "Example"
      };
      var data = qs.stringify({
        template_id: this.mbdata
      });
      this.api.apiPost(
        "/push/example",
        "post",
        data,
        params,
        (status, judge, res) => {
          if (status) {
            // 获取全部数据
            this.carddata = res.data;
            // 实例模板换行显示
            this.indata = this.carddata.example;
            // 数组的值
            var bndata = this.carddata.parameter;
            var shucdata = [];
            for (var e = 0; e < bndata.length; e++) {
              shucdata.push({
                type: bndata[e],
                nndata: ""
              });
            }
            this.shucdata = shucdata;
            this.item[e] = nndata;
            (this.nndata[i] = this), nndata[i];
            // this.nndata = this.inputdata.push(v.desc);
            var csdata = this.carddata.nndata;
            for (var e = 0; e < csdata.length; e++) {
              csdata.push({
                inputdata: csdata[e]
              });
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
    zfazhi: function(index) {
      console.log(index);
    },
    //验证
    yianz: function() {
      var value = true;
      this.shucdata.forEach(e => {
        if (e.nndata == "") {
          this.$Message.error(e.type + "信息为空");
          value = false;
        }
      });
      if (value) {
        this.mbtsong();
      }
    },
    //提交
    mbtsong: function() {
      var shucdata = [];
      for (var e = 0; e < this.shucdata.length; e++) {
        shucdata.push(this.shucdata[e].nndata);
      }
      var keyword = shucdata.toString();
      if (this.radio != 1) {
        this.user_id = "";
      }
      var data = qs.stringify({
        // 指定用户id
        member_id: this.user_id,
        // 选取模板id
        template_id: this.mbdata,
        // 获取的用户类型
        push_type: this.radio,
        // 模板跳转链接
        push_url: this.urldata,
        // 获取input中的值
        value: {
          //任务名称
          first: this.rwdata,
          // 备注内容
          remark: this.nrdata,
          //  inputz中的动态值集合
          keyword: keyword
        }
      });
      this.api.apiPost("/push/push", "post", data, "", (status, judge, res) => {
        if (status) {
          this.$Message.success("" + res.msg);
        } else {
          this.$Message.error("" + res.msg);
        }
      });
    }
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
  height: calc(100vh - 344px);
  overflow-y: scroll;
}
.tabbox {
  background: #ffffff;
  padding: 10px 20px 20px;
  width: calc(100% - 20px);
  /* height: 750px; */
}
.db-mbziti {
  font-size: 14px;
}
.kdu {
  margin-top: 25px;
  width: 350px;
}
.pagebox {
  background: #ffffff;
  text-align: center;
  padding: 30px 0 50px;
  width: calc(100% - 20px);
}
.mbcss {
  display: flex;
}
.wzhang {
  font-weight: bold;
  line-height: 30px;
  font-size: 14px;
}
.tsong {
  margin-left: 30px;
}
.tsong1 {
  margin-left: 30px;
  color: crimson;
}
.mbsl {
  font-weight: bold;
  line-height: 50px;
  font-size: 14px;
}
.tishi {
  list-style: none;
}

.mbsl1 {
  font-weight: bold;
  line-height: 75px;
  font-size: 14px;
}
.mbsl2 {
  font-weight: bold;
  line-height: 62px;
  font-size: 14px;
}

.mbxx {
  margin-top: 17px;
}
.mbxx li {
  font-size: 12px;
  list-style: none;
}
.xuanx {
  /* height: 80px; */
  width: 20px;
  margin-left: 30px;
}
.t-btn {
  width: 280px;
  height: 40px;
  background: rgba(3, 122, 255, 1);
  border-radius: 2px;
  border: none;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  margin-left: 90px;
  margin-top: 80px;
}
.t-ipt {
  width: 350px;
  height: 37px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(180, 180, 180, 1);
  padding: 5px 10px;
  font-size: 14px;
  margin-top: 20px;
}
</style>