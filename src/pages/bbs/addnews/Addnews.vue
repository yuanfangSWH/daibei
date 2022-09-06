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
          <!-- <img-upload @func="getMsgFormSon"></img-upload> -->
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :http-request="upload"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="portrait" :src="portrait" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
          <button class="t-btn" @click="addNews">发布</button>
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
  name: "Addnews",
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
        newstag: []
      },
      // 图片
      portrait: "",
      portraitData: ""
    };
  },
  methods: {
    //上传图片限制方法
    beforeAvatarUpload(file) {
      const isImage =
        file.type === "image/png" ||
        file.type == "image/jpg" ||
        file.type == "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImage) {
        this.$message.error("上传的图片只能是 JPG/NPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传的图片大小不能超过 2MB!");
      }
      return isImage && isLt2M;
    },
    //得到图片
    upload(e) {
      var _this = this;
      var reader = new FileReader();
      reader.readAsDataURL(e.file);
      reader.onload = function(e) {
        //设置图片显示
        _this.portrait = e.target.result;
        // 读取到的图片数据编码 转成base64后将此编码字符串传给后台即可
        _this.portraitData = e.target.result;
      };
    },
    //fab
    addNews() {
      var params = {
        action: "add"
      };
      var data = qs.stringify({
        value: {
          new_name: this.formItem.newsTitle,
          new_tab: this.formItem.newstag,
          //这就是图片B64
          new_img: this.portraitData,
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
            this.$Message.success("发布成功！");
            this.$router.push({
              path: "/bbs/newslist"
            });
          } else {
            this.$Message.error("发布失败！");
          }
        }
      );
    },
    //接收子组件的imgurl
    getMsgFormSon(data) {
      this.formItem.imgurl1 = data;
    },
    getNewstag() {
      var params = {
        action: "all"
      };
      this.api.apiPost("/news/tags", "get", "", params, (status, code, res) => {
        if (status) {
          this.newstags = res.data;
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
.avatar-uploader {
  width: 180px;
  height: 180px;
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
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