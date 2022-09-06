<template>
  <div class="content">
    <div class="addpage-box">
      <div class="add-title">公众号菜单按钮配置</div>
      <ul class="add-ul">
        <li>
          <div class="bj">
            <span class="t-name">菜单配置内容</span>
            <Input
              class="text-area"
              v-model="formItem.gzhcontent"
              type="textarea"
              :autosize="{minRows: 20,maxRows: 32}"
              placeholder="请输入菜单配置内容"
            />
          </div>
        </li>
        <li>
          <div class="bj">
            <span class="t-name">关注回复</span>
            <Input
              class="text-area"
              v-model="formItem.huifu"
              type="textarea"
              :autosize="{minRows: 6,maxRows: 20}"
              placeholder="请输入回复内容"
            />
          </div>
        </li>
        <li>
          <div class="bj">
            <span class="t-name">合伙人文案</span>
            <Input
              class="text-area"
              v-model="formItem.hhrwan"
              type="textarea"
              :autosize="{minRows: 6,maxRows: 20}"
              placeholder="请输入文案内容"
            />
          </div>
        </li>
        <li>
          <div class="bj">
            <span class="t-name">贷款推广文案</span>
            <Input
              class="text-area"
              v-model="formItem.tghbwan"
              type="textarea"
              :autosize="{minRows: 6,maxRows: 20}"
              placeholder="请输入文案内容"
            />
          </div>
        </li>
        <li>
          <span class="t-name"></span>
          <button class="t-btn" @click="editGzhao">保存</button>
        </li>
      </ul>
    </div>
   
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  name: "Tencent",
  data() {
    return {
      formItem: {
        gzhcontent: "",
        huifu: "",
        hhrwan:"",
        tghbwan:""
      }
    };
  },
  methods: {
    editGzhao() {
      if (this.formItem.gzhcontent != "") {
        var params = {
          action: "edit"
        };
        var data = qs.stringify({
          value: this.formItem.gzhcontent,
          cleck: this.formItem.huifu,
          partner: this.formItem.hhrwan,
          loan_promote : this.formItem.tghbwan
        });
        this.api.apiPost(
          "/wechat/menusettings",
          "post",
          data,
          params,
          (status, code, res) => {
            if (status) {
              this.$Message.success("保存成功");
              var a = JSON.stringify(this.formItem.gzhcontent);
              var b = this.formItem.huifu;
            } else {
              this.$Message.error("" + res.msg);
            }
          }
        );
      } else {
        this.$Message.error("请先输入内容");
      }
    },
    //设置cookie
    setCookie(iptCon, huifuCon, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "setdata" + "=" + iptCon + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "sethuifu" + "=" + huifuCon + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "setdata") {
            this.formItem.gzhcontent = JSON.parse(arr2[1]); //保存到保存数据的地方
          } else if (arr2[0] == "sethuifu") {
            this.formItem.huifu = arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie: function() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    },
    //查询
    Thequery() {
      var params = {
        action: "getOne"
      };
      this.api.apiPost(
        "/wechat/menusettings",
        "post",
        "",
        params,
        (status, code, res) => {
          if (status) {
            this.formItem.gzhcontent = res.data.Menu;
            this.formItem.huifu = res.data.Cleck;
            this.formItem.hhrwan = res.data.Partner;
            this.formItem.tghbwan = res.data.Loan_promote;
          } else {
            this.$Message.error("" + res.msg);
          }
        }
      );
    }
  },
  mounted() {
    this.Thequery();
  }
};
</script>

<style scoped>
.bj {
  display: flex;
  width: 100%;
}
.add-ul >>> .ivu-select-dropdown-list li {
  margin-bottom: 0;
}
.add-ul >>> .ivu-select-selection {
  border-color: rgba(180, 180, 180, 1);
  border-radius: 0;
}
.add-ul >>> .ivu-input-wrapper {
  width: auto;
  flex: 1;
}
.add-ul >>> textarea.ivu-input {
  width: 80%;
  display: inline-block;
  border: 1px solid rgba(180, 180, 180, 1);
  border-radius: 0;
}
.add-ul >>> .ivu-upload-drag {
  border: none;
  border-radius: 0;
}
.add-ul >>> .quill-editor {
  float: left;
  max-width: 650px;
}
.add-ul >>> .ivu-checkbox-group {
  display: inline-block;
  line-height: 40px;
}
.add-ul >>> .ivu-radio-group {
  line-height: 40px;
  float: left;
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
  float: left;
  width: 100%;
  box-sizing: border-box;
}
.add-ul li {
  margin-bottom: 40px;
  width: 100%;
  float: left;
}
.t-name {
  width: 100px;
  float: left;
  font-size: 14px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  float: left;
  height: 40px;
  display: block;
  line-height: 40px;
}
.t-ipt {
  float: left;
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
.demo-nav {
  color: #888;
  font-size: 12px;
  display: inline-block;
  margin-left: 10px;
  line-height: 40px;
}
.t-tip {
  color: #333;
  float: left;
  margin-left: 10px;
  line-height: 40px;
}
.t-tip2 {
  color: #333;
  float: left;
  margin: 0 8px;
  line-height: 40px;
}
</style>