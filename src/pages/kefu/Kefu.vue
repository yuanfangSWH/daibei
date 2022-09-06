<template>
  <div class="content">
    <div class="addpage-box">
      <div class="add-title">在线客服二维码配置</div>
      <ul class="add-ul">
        <li>
          <span class="t-name">客服二维码</span>
          <Upload
            ref="upload"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload1"
            type="drag"
            action="http://aaadmin3.rong298.cn"
            style="display: inline-block;width:120px;"
          >
            <div style="width: 120px;height:120px;">
              <img style="width: 120px;height:120px;" class="addimg" :src="formItem.imgurl1" />
            </div>
          </Upload>
        </li>
        <li>
          <span class="t-name">公众号二维码</span>
          <Upload
            ref="upload"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload2"
            type="drag"
            action="http://aaadmin3.rong298.cn"
            style="display: inline-block;width:120px;"
          >
            <div style="width: 120px;height:120px;">
              <img style="width: 120px;height:120px;" class="addimg" :src="formItem.imgurl2" />
            </div>
          </Upload>
        </li>
        <li>
          <span class="t-name">结算客服二维码</span>
          <Upload
            ref="upload"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload3"
            type="drag"
            action="http://aaadmin3.rong298.cn"
            style="display: inline-block;width:120px;"
          >
            <div style="width: 120px;height:120px;">
              <img style="width: 120px;height:120px;" class="addimg" :src="formItem.imgurl3" />
            </div>
          </Upload>
        </li>
        <li>
          <span class="t-name"></span>
          <button class="t-btn" @click="updataEwm">更新</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import ImgUpload from "./../editbank/components/Upload";
export default {
  name: "Kefu",
  components: {
    ImgUpload
  },
  data() {
    return {
      formItem: {
        imgurl1: "",
        imgurl2: "",
        imgurl3: ""
      },
      pdxingw1: false,
      pdxingw2: false,
      pdxingw3: false
    };
  },
  methods: {
    //进入页面查询
    getewm() {
      var params = {
        action: "getServiceCode"
      };
      this.api.apiPost(
        "/system/servicecode",
        "get",
        "",
        params,
        (status, code, res) => {
          if (status) {
            this.formItem.imgurl1 = res.data;
            if (this.formItem.imgurl1 != "") {
              this.pdxingw1 = true;
            }
          } else {
            this.$Message.error("" + res.msg);
          }
        }
      );
      var params = {
        action: "getGzhCode"
      };
      this.api.apiPost(
        "/system/servicecode",
        "get",
        "",
        params,
        (status, code, res) => {
          if (status) {
            this.formItem.imgurl2 = res.data;
            if (this.formItem.imgurl2 != "") {
              this.pdxingw2 = true;
            }
          } else {
            this.$Message.error("" + res.msg);
          }
        }
      );
       var params = {
        action: "getJsCode"
      };
      this.api.apiPost(
        "/system/servicecode",
        "get",
        "",
        params,
        (status, code, res) => {
          if (status) {
            this.formItem.imgurl3 = res.data;
            if (this.formItem.imgurl3 != "") {
              this.pdxingw3 = true;
            }
          } else {
            this.$Message.error("" + res.msg);
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
        this.pdxingw1 = false;
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
        this.pdxingw2 = false;
      };
      return false;
    },
    handleBeforeUpload3(file) {
      this.file = file;
      const FileExt = this.file.name.replace(/.+\./, ""); //取得文件的后缀名
      const reader = new FileReader(); //读取文件的字符流
      reader.readAsDataURL(file); //将文件读取为 DataURL 以data:开头的字符串
      reader.onload = e => {
        this.formItem.imgurl3 = e.target.result;
        this.pdxingw3 = false;
      };
      return false;
    },
    //更新
    updataEwm() {
    //   if (this.pdxingw1) {
    //     this.$Message.success("客服二维码更新成功！");
    //   } else {
    //     this.updataEX1();
    //   }
    //   if (this.pdxingw2) {
    //     this.$Message.success("公众号二维码更新成功！");
    //   } else {
    //     this.updataEX2();
    //   }
     this.updataEX1();
    },
    //更新方法1
    updataEX1() {
      var params = {
        action: "updateServiceCode"
      };
      var data = qs.stringify({
        code: this.formItem.imgurl1,
        gzhcode:this.formItem.imgurl2,
        jscode:this.formItem.imgurl3
      });
      this.api.apiPost(
        "/system/servicecode",
        "post",
        data,
        params,
        (status, code, res) => {
          if (status) {
            this.$Message.success("更新成功！");
          } else {
            this.$Message.error("" + res.msg);
          }
        }
      );
    },
    //更新方法2废弃
    updataEX2() {
      var params = {
        action: "updateServiceCode"
      };
      var data = qs.stringify({
        gzhcode: this.formItem.imgurl2,
        code:""
      });
      this.api.apiPost(
        "/system/servicecode",
        "post",
        data,
        params,
        (status, code, res) => {
          if (status) {
            this.$Message.success("公众号二维码更新成功！");
          } else {
            this.$Message.error("" + res.msg);
          }
        }
      );
    }
  },
  mounted() {
    this.getewm();
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