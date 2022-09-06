<template>
  <div class="content">
    <div class="addbtn">
      <router-link to="/bbs/Bbslist">
        <button>返回</button>
      </router-link>
    </div>
    <div class="addpage-box">
      <div class="add-title">添加帖子</div>
      <ul class="add-ul">
        <li>
          <span class="t-name">帖子标题</span>
          <input class="t-ipt" v-model="formItem.bbsTitle" type="text" placeholder="请输入新闻标题" />
        </li>
        <li>
          <span class="t-name">用户名称</span>
          <input class="t-ipt" v-model="formItem.memberName" type="text" placeholder="请输入用户名称" />
        </li>
        <li>
          <span class="t-name">上传头像</span>
          <img-upload @func="getMsgFormSon1"></img-upload>
        </li>
        <li>
          <span class="t-name">上传贴子图片</span>
          <el-upload
            class="upload-demo"
            action="null"
            :on-remove="handleRemove"
            :before-upload="beforeAvatarUpload"
            :on-exceed="chaoguo"
            :http-request="upload"
            list-type="picture"
            :limit="9"
          >
            <el-button size="small" type="primary">选择图片</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB，最多9张</div>
          </el-upload>
        </li>
        <li>
          <span class="t-name">帖子标签</span>
          <CheckboxGroup v-model="formItem.bbstag">
            <Checkbox v-for="item in bbstags" :label="item.id" :key="item.id">{{item.tab_name}}</Checkbox>
          </CheckboxGroup>
        </li>
        <li>
          <span class="t-name">帖子内容</span>
          <!-- <quill-editor ref="myTextEditor" v-model="formItem.bbsContent"></quill-editor> -->
          <el-input
            class="tlbdjl"
            type="textarea"
            :rows="10"
            placeholder="请输入内容"
            v-model="formItem.bbsContent"
          ></el-input>
        </li>
        <li>
          <span class="t-name"></span>
          <button class="t-btn" @click="addBbs">发帖</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import ImgUpload from "./../../editbank/components/Upload";
import { VueEditor } from "vue2-editor";
export default {
  name: "Addbbs",
  components: {
    ImgUpload,
    VueEditor
  },
  data() {
    return {
      bbstags: "",
      sel: true,
      formItem: {
        bbsTitle: "",
        imgurl1: "",
        bbsContent: "",
        bbstag: [],
        memberName: ""
      },
      //B64
      portraitData: [],
      //坐标UID
      zuobz: []
    };
  },
  methods: {
    //文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      var uid = file.uid;
      //计算移除指定位置的图片数据
      for (var i = 0; i < this.zuobz.length; i++) {
        if (this.zuobz[i] == uid) {
          this.zuobz.splice(i, 1);
          this.portraitData.splice(i, 1);
        }
      }
    },
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
      //把图片的uid存储起来
      this.zuobz.push(e.file.uid);
      var _this = this;
      var reader = new FileReader();
      reader.readAsDataURL(e.file);
      reader.onload = function(e) {
        // 读取到的图片数据编码 转成base64后将此编码字符串传给后台即可
        _this.portraitData.push(e.target.result);
      };
    },
    //超过限制
    chaoguo() {
      this.$message({
        showClose: true,
        message: "超过了上传图片数量限制",
        type: "error",
        position: "bottom-right"
      });
    },
    //提交
    addBbs() {
         var strNew = this.portraitData.join("|");
      var params = {
        action: "add"
      };
      var data = qs.stringify({
        value: {
          //帖子标签id（中文逗号分隔）
          list_tab: this.formItem.bbstag,
          //用户名称
          list_member_name: this.formItem.memberName,
          //标题
          list_title: this.formItem.bbsTitle,
          //帖子内容
          list_content: this.formItem.bbsContent,
          //图片，base64图片或url连接
          list_img: strNew,
          //用户头像，base64图片或url连接
          list_member_avatar: this.formItem.imgurl1
        }
      });
        this.api.apiPost(
          "/bbs/bbs",
          "post",
          data,
          params,
          (status, code, res) => {
            if (status) {
              this.$Message.success("发布成功！");
              this.$router.push({
                path: "/bbs/Bbslist"
              });
            } else {
              this.$Message.error(res.msg);
            }
          }
        );
    },
    getMsgFormSon1(data) {
      this.formItem.imgurl1 = data;
    },
    getNewstag() {
      var params = {
        action: "all"
      };
      this.api.apiPost("/bbs/tags", "get", "", params, (status, code, res) => {
        if (status) {
          this.bbstags = res.data; //获得银行标签数据
        } else {
          this.$Message.error("获取数据失败");
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
.tlbdjl {
  width: 500px;
}
.upload-demo {
  width: 500px;
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