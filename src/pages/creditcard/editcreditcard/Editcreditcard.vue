<template>
  <div class="content">
    <div class="addbtn">
      <router-link to="/Creditcard">
        <button>返回</button>
      </router-link>
    </div>
    <div class="addpage-box">
      <div class="add-title">拉新产品编辑</div>
      <ul class="add-ul">
        <li>
          <span class="t-name">拉新产品名称</span>
          <input class="t-ipt" v-model="formItem.cardname" type="text" placeholder="请输入拉新产品名称" />
        </li>
        <li>
          <span class="t-name">拉新产品标签</span>
          <CheckboxGroup v-model="formItem.cardtag">
            <Checkbox v-for="item in alltag" :label="item.id" :key="item.id">{{item.tab_name}}</Checkbox>
          </CheckboxGroup>
        </li>
        <li>
          <span class="t-name">拉新产品图标</span>
          <Upload
            ref="upload"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload1"
            type="drag"
            action="http://aaadmin3.rong298.cn/bank/bank"
            style="display: inline-block;width:120px;"
          >
            <div style="width: 120px;height:120px;">
              <img class="addimg" :src="formItem.imgurl1" />
            </div>
          </Upload>
        </li>
        <li>
          <span class="t-name">推广海报</span>
          <Upload
            ref="upload"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload2"
            type="drag"
            action="http://aaadmin3.rong298.cn/bank/bank"
            style="display: inline-block;width:120px;"
          >
            <div style="width: 120px;height:120px;">
              <img class="addimg" :src="formItem.imgurl2" />
            </div>
          </Upload>
        </li>
        <li>
          <span class="t-name">拉新产品介绍主标题</span>
          <input
            class="t-ipt"
            v-model="formItem.cardintroduce"
            type="text"
            placeholder="请输入拉新产品介绍主标题"
          />
        </li>
        <li>
          <span class="t-name">拉新产品介绍副标题</span>
          <input
            class="t-ipt"
            v-model="formItem.cardintroduce2"
            type="text"
            placeholder="请输入拉新产品介绍副标题"
          />
        </li>
        <li>
          <span class="t-name">福利介绍</span>
          <input class="t-ipt" v-model="formItem.cardintroduce3" type="text" placeholder="请输入福利介绍" />
        </li>
        <li>
          <span class="t-name">通过时间</span>
          <input class="t-ipt" v-model="formItem.cardintroduce4" type="text" placeholder="请输入通过时间" />
        </li>
        <li>
          <span class="t-name">申请跳转链接</span>
          <input class="t-ipt" v-model="formItem.applyurl" type="text" placeholder="请输入银行介绍" />
        </li>
        <!-- <li>
                    <span class="t-name">结算周期</span>
                    <input class="t-ipt" v-model="formItem.model2" type="text" placeholder="请输入结算周期" />
        </li>-->
        <li>
          <span class="t-name">结算周期</span>
          <input class="t-ipt" v-model="formItem.passtime" type="text" placeholder="请输入结算周期" />
        </li>
        <li>
          <span class="t-name">订单保护期</span>
          <input class="t-ipt" v-model="formItem.baohutime" type="text" placeholder="请输入订单保护期" />
        </li>
        <li>
          <span class="t-name">结算类型</span>
          <RadioGroup v-model="formItem.animal">
            <label>
              <Radio label="0">人工结算</Radio>
              <Radio label="1">主动查询</Radio>
              <Radio label="2">被动查询</Radio>
            </label>
          </RadioGroup>
        </li>
        <li>
          <span class="t-name">查询网址</span>
          <input class="t-ipt" v-model="formItem.queryurl" type="text" placeholder="请输入查询网址" />
        </li>
        <li>
          <span class="t-name">产品佣金</span>
          <input class="t-ipt" v-model="formItem.yongjin" type="number" placeholder="请输入产品佣金" />
          <Select
            v-model="modelyj"
            style="width:60px; margin-left:8px;"
            :transfer="sel"
            :placeholder="cpyjin"
            :label-in-value="sel"
            @on-change="cheshi"
          >
            <Option v-for="item in yjList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </li>
        <li>
          <span class="t-name">最高返佣</span>
          <input class="t-ipt" v-model="formItem.highrebate" type="number" placeholder="请输入最高返佣" />
          <Select
            v-model="modelfy"
            style="width:60px; margin-left:8px;"
            :transfer="sel"
            :placeholder="yhufy"
            :label-in-value="sel"
            @on-change="cheshi2"
          >
            <Option v-for="item in fyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </li>
        <li>
          <span class="t-name">申请要求</span>
          <quill-editor ref="myTextEditor" v-model="formItem.sqyq"></quill-editor>
        </li>
        <li>
          <span class="t-name">产品详情</span>
          <quill-editor ref="myTextEditor" v-model="formItem.cpxq"></quill-editor>
        </li>
        <li>
          <span class="t-name">返佣说明</span>
          <quill-editor ref="myTextEditor" v-model="formItem.fysm"></quill-editor>
        </li>
        <li>
                    <span class="t-name">广告文案</span>
                    <!-- <quill-editor ref="myTextEditor" v-model="formItem.card_adcopy"></quill-editor> -->
                    <el-input type="textarea" style="width:610px;" :rows="5" placeholder="请输入广告文案" v-model="formItem.card_adcopy"></el-input>
                </li>
        <li>
          <span class="t-name">排序</span>
          <input class="t-ipt" v-model="formItem.cardrank" type="number" placeholder="请输入排序" />
        </li>
        <li>
          <span class="t-name"></span>
          <button class="t-btn" @click="editCreditCard">保存产品</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  name: "Editcreditcard",
  data() {
    return {
      banktags: "",
      cardinfo: "",
      i: 0,
      sel: true,
      modelyj: "",
      yjList: [
        {
          value: "1",
          label: "%"
        },
        {
          value: "2",
          label: "元"
        }
      ],
      modelfy: "",
      fyList: [
        // {
        //     value: '1',
        //     label: '%'
        // },
        {
          value: "2",
          label: "元"
        }
      ],
      cpyjin: "%",
      yhufy: "元",
      formItem: {
        baohutime: "",
        banknames: "",
        cardname: "",
        cardtag: [],
        imgurl1: "",
        imgurl2: "",
        cardintroduce: "",
        cardintroduce2: "",
        cardintroduce3: "",
        cardintroduce4: "",

        passtime: "",
        animal: 1,
        queryurl: "",
        highrebate: "",
        yongjin: "",
        textarea: "",
        cardrank: 1,
        applyurl: "",
        fysm: "",
        sqyq: "",

        cpxq: "",
        card_adcopy: ""
      },
      data1: "",
      alltag: [],
      sid: ""
    };
  },
  created() {
    this.sid = this.$route.query.sid;
    var params = {
      action: "getOneCard"
    };
    var data = qs.stringify({
      card_id: this.sid
    });
    this.api.apiPost(
      "/bank/card",
      "post",
      data,
      params,
      (status, code, res) => {
        if (status) {
          //console.log("银行上架产品："+JSON.stringify(_this.data1));
          this.cardinfo = res.data.card;
          var str1 = this.cardinfo[0].card_yongjin;
          var str2 = this.cardinfo[0].card_pass_fanyong;
          var reg = RegExp(/%/); //校验是否包含%
          var reg2 = RegExp(/#/); //校验是否包含#
          if (str1.match(reg)) {
            // 包含
            this.formItem.yongjin = str1.substr(0, str1.length - 1); //去除最后一位字符
            this.cpyjin = "%";
          } else if (str1.match(reg2)) {
            this.formItem.yongjin = str1.substr(0, str1.length - 1); //去除最后一位字符
            this.cpyjin = "元";
          } else {
            this.formItem.yongjin = str1;
          }

          // if(str2.match(reg)){
          //     // 包含
          //     this.formItem.highrebate = str2.substr(0, str2.length - 1); //去除最后一位字符
          //     this.yhufy = '%';
          // }else
          if (str2.match(reg2)) {
            this.formItem.highrebate = str2.substr(0, str2.length - 1); //去除最后一位字符
            this.yhufy = "元";
          } else {
            this.formItem.highrebate = str2;
          }
          var eText = JSON.parse(this.cardinfo[0].card_details_text);
          this.formItem.id = this.cardinfo[0].id;
          this.formItem.cardname = this.cardinfo[0].card_name;
          this.formItem.imgurl1 = this.cardinfo[0].card_img;
          this.formItem.imgurl2 = this.cardinfo[0].card_qr_bg;
          //this.formItem.model2=this.cardinfo[0].card_pass_end;
          this.formItem.animal = "" + this.cardinfo[0].card_pass_type;
          this.formItem.queryurl = this.cardinfo[0].card_pass_url;
          this.formItem.baohutime = this.cardinfo[0].card_order_losetime;
          this.formItem.cardtag = this.cardinfo[0].card_class; //银行标签
          this.formItem.cardrank = this.cardinfo[0].card_sort;
          this.formItem.applyurl = this.cardinfo[0].card_url;
          this.formItem.passtime = this.cardinfo[0].card_pass_end;
          this.formItem.cardintroduce = this.cardinfo[0].card_introduce;
          this.formItem.cardintroduce2 = this.cardinfo[0].card_introduce2;
          this.formItem.cardintroduce3 = this.cardinfo[0].card_introduce3;
          this.formItem.cardintroduce4 = this.cardinfo[0].card_introduce4;
          this.formItem.fysm = eText.fysm;
          this.formItem.sqyq = eText.sqyq;
          //this.formItem.sxcl= eText.sxcl;
          this.formItem.cpxq = eText.cpxq;
          this.formItem.card_adcopy = this.cardinfo[0].card_adcopy;
          this.i = parseInt(this.cardinfo[0].card_bank - 1);
        } else {
          this.$Message.error("获取数据失败！");
        }
      }
    );
  },
  methods: {
    cheshi(e) {
      var str = e.label;
      str = str.replace(/元/g, "#");
      this.cpyjin = str;
    },
    cheshi2(e) {
      var str2 = e.label;
      str2 = str2.replace(/元/g, "#");
      this.yhufy = str2;
    },
    editCreditCard() {
      this.cpyjin = this.cpyjin.replace(/元/g, "#");
      this.yhufy = this.yhufy.replace(/元/g, "#");
      var params = {
        action: "edit"
      };
      var data = qs.stringify({
        card_id: this.formItem.id,
        value: {
          card_class: this.formItem.cardtag,
          card_name: this.formItem.cardname,
          card_introduce: this.formItem.cardintroduce,
          card_introduce2: this.formItem.cardintroduce2,
          card_introduce3: this.formItem.cardintroduce3,
          card_introduce4: this.formItem.cardintroduce4,
          card_img: this.formItem.imgurl1,
          card_qr_bg: this.formItem.imgurl2,
          card_sort: this.formItem.cardrank,
          card_url: this.formItem.applyurl,
          //card_pass_time: this.formItem.passtime,
          card_order_losetime: Number(this.formItem.baohutime),
          card_pass_url: this.formItem.queryurl,
          card_pass_end: this.formItem.passtime,
          card_pass_type: this.formItem.animal,
          card_yongjin: this.formItem.yongjin + this.cpyjin,
          card_pass_fanyong: this.formItem.highrebate + this.yhufy,
          fysm: this.formItem.fysm,
          sqyq: this.formItem.sqyq,
          //sxcl: this.formItem.sxcl,
          cpxq: this.formItem.cpxq,
          card_adcopy: this.formItem.card_adcopy
        }
      });
      this.api.apiPost(
        "/bank/card",
        "post",
        data,
        params,
        (status, code, res) => {
          if (status) {
            this.$Message.success("编辑成功！");
            this.$router.push({
              path: "/Creditcard"
            });
          } else {
            this.$Message.error(res.msg);
          }
        }
      );
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M."
      });
    },
    handleBeforeUpload1(file) {
      this.file = file;
      const FileExt = this.file.name.replace(/.+\./, ""); //取得文件的后缀名
      const reader = new FileReader(); //读取文件的字符流
      reader.readAsDataURL(file); //将文件读取为 DataURL 以data:开头的字符串
      reader.onload = e => {
        this.formItem.imgurl1 = e.target.result;
      };
      return false;
    },
    handleBeforeUpload2(file) {
      this.file = file;
      const FileExt = this.file.name.replace(/.+\./, ""); //取得文件的后缀名
      const reader = new FileReader(); //读取文件的字符流
      reader.readAsDataURL(file); //将文件读取为 DataURL 以data:开头的字符串
      reader.onload = e => {
        this.formItem.imgurl2 = e.target.result;
      };
      return false;
    },
    getBank() {
      this.api.apiPost("/bank/tags", "get", "", "", (status, code, res) => {
        if (status) {
          this.alltag = res.data;
          //console.log("哈哈哈："+JSON.stringify(this.alltag));
        } else {
          this.$Message.error(res.msg);
        }
      });
    }
  },
  mounted() {
    this.getBank();
  }
};
</script>

<style scoped>
.add-ul >>> .ivu-select-dropdown-list li {
  margin-bottom: 0;
}
.add-ul >>> .ivu-select-selection {
  border-color: rgba(180, 180, 180, 1);
  border-radius: 0;
}
.add-ul >>> .ivu-input-wrapper {
  width: auto;
}
.add-ul >>> textarea.ivu-input {
  width: 280px;
  height: 110px;
  display: inline-block;
}
.add-ul >>> .ivu-upload-drag {
  border: none;
  border-radius: 0;
}
.add-ul >>> .quill-editor {
  float: left;
  max-width: 610px;
}
.add-ul >>> .ivu-checkbox-group {
  display: inline-block;
  line-height: 40px;
}
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
}
.add-ul li {
  margin-bottom: 40px;
  width: 100%;
  float: left;
}
.t-name {
  width: 140px;
  float: left;
  font-size: 14px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  height: 40px;
  display: block;
  line-height: 40px;
}
.t-ipt {
  width: 280px;
  height: 40px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(180, 180, 180, 1);
  padding: 5px 10px;
  font-size: 14px;
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
}

.demo-upload-list {
  width: 120px;
  height: 120px;
  display: inline-block;
  text-align: center;
  overflow: hidden;
  background: #fff;
  position: relative;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.addimg {
  width: 120px;
  height: 120px;
}
.demo-nav {
  color: #888;
  font-size: 12px;
  display: inline-block;
  margin-left: 10px;
}
.text-area {
  width: 280px;
  height: 100px;
  line-height: 24px !important;
}
</style>