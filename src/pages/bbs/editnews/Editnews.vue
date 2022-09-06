<template>
  <div class="content">
    <div class="addbtn">
      <router-link to="/bbs/newslist">
        <button>返回</button>
      </router-link>
    </div>
    <div class="addpage-box">
      <div class="add-title">发布新闻头条</div>
      <ul class="add-ul">
        <li>
          <span class="t-name">新闻标题</span>
          <input class="t-ipt" v-model="formItem.newsTitle" type="text" placeholder="请输入新闻标题" />
        </li>
        <li>
          <span class="t-name">上传封面图片</span>
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
              <img class="addimg" :src="formItem.imgurl1" />
            </div>
          </Upload>
        </li>
        <li>
          <span class="t-name">头条标签</span>
          <CheckboxGroup v-model="formItem.newstag">
            <Checkbox v-for="item in newstags" :label="item.id" :key="item.id">{{item.tab_name}}</Checkbox>
          </CheckboxGroup>
        </li>
        <li>
          <span class="t-name">头条内容</span>
          <quill-editor ref="myTextEditor" v-model="formItem.newsContent"></quill-editor>
        </li>
        <li>
          <span class="t-name">广告位内容</span>
          <el-input
            type="textarea"
            style="width: 650px;"
            :rows="10"
            autosize
            placeholder="请输入内容"
            v-model="textarea"
          ></el-input>
        </li>
        <li>
          <span class="t-name"></span>
          <button class="t-btn" @click="editNews">保存</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import ImgUpload from "./../../editbank/components/Upload";
export default {
  name: "Editnews",
  components: {
    ImgUpload
  },
  data() {
    return {
      //广告内容
      textarea: "",
      newstags: "",
      sel: true,
      formItem: {
        newsTitle: "",
        imgurl1: "",
        newsContent: "",
        newstag: [],
        id: ""
      },
      newInfo: "",
      sid: ""
    };
  },
  created() {
    this.sid = this.$route.query.sid;
    var params = {
      action: "getOneNew"
    };
    var data = qs.stringify({
      new_id: this.sid
    });
    this.api.apiPost("/news/new", "post", data, params, (status, code, res) => {
      if (status) {
        this.newInfo = res.data;
        //console.log("接收编辑数据：" + JSON.stringify(this.newInfo));
        //var a=this.newInfo.new_tab;
        this.formItem.id = this.newInfo.NewList[0].id;
        this.formItem.newsTitle = this.newInfo.NewList[0].new_name;
        //this.formItem.newstag = a.split('，');//将字符串转数组
        this.formItem.newstag = this.newInfo.NewList[0].new_tab;
        this.formItem.imgurl1 = this.newInfo.NewList[0].new_img;
        //this.formItem.newsContent = JSON.parse(this.newInfo.NewList[0].new_content.replace(/<section/g, '<div').replace(/\/section>/g, '/div>'));
        var str = this.newInfo.NewList[0].new_content;
        this.textarea = this.newInfo.NewList[0].head_content;
        var reg = RegExp(/<section/);
        if (str.match(reg)) {
          // 包含\\u
          this.formItem.newsContent = this.newInfo.NewList[0].new_content
            .replace(/<section/g, "<div")
            .replace(/\/section>/g, "/div>");
        } else {
          this.formItem.newsContent = this.newInfo.NewList[0].new_content;
        }
      } else {
        this.$Message.error("获取数据失败！");
      }
    });
  },
  methods: {
    editNews() {
      var params = {
        action: "edit"
      };
      var data = qs.stringify({
        new_id: this.formItem.id,
        value: {
          new_name: this.formItem.newsTitle,
          new_tab: this.formItem.newstag,
          new_img: this.formItem.imgurl1,
          new_content: this.formItem.newsContent,
          //内容
          head_content: this.textarea
        }
      });
      this.api.apiPost(
        "/news/new",
        "post",
        data,
        params,
        (status, code, res) => {
          if (status) {
            this.$Message.success("编辑成功！");
            this.$router.push({
              path: "/bbs/newslist"
            });
          } else {
            this.$Message.error("编辑失败！");
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
    getNewstag() {
      var params = {
        action: "all"
      };
      this.api.apiPost("/news/tags", "get", "", params, (status, code, res) => {
        if (status) {
          this.newstags = res.data; //获得银行标签数据
        } else {
          this.$Message.error("获取数据失败！");
        }
      });
    }
  },
  mounted() {
    this.getNewstag();
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
  max-width: 650px;
}
.add-ul >>> .ivu-checkbox-group {
  display: inline-block;
  line-height: 40px;
}
.add-ul >>> .ivu-radio-group {
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