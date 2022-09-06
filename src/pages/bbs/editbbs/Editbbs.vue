<template>
  <div class="content">
    <div class="addbtn">
      <router-link to="/bbs/Bbslist">
        <button>返回</button>
      </router-link>
    </div>
    <div class="addpage-box">
      <div class="add-title">编辑帖子</div>
      <ul class="add-ul">
        <li>
          <span class="t-name">帖子标题</span>
          <input class="t-ipt" v-model="formItem.bbsTitle" type="text" placeholder="请输入新闻标题" />
        </li>
        <li>
          <span class="t-name">用户名称</span>
          <input class="t-ipt" v-model="formItem.memberName" type="text" placeholder="请输入新闻标题" />
        </li>
        <li>
          <span class="t-name">上传头像</span>
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
              <img class="addimg2" :src="formItem.imgurl1" />
            </div>
          </Upload>
        </li>
        <li>
          <span class="t-name">贴子图片</span>
          <div class="sgsdsl">
            <div class="wdasd" v-for="(item, key) in imgData" v-bind:key="key">
              <img
                class="whntbimg"
                src="../../../../static/images/xxx.png"
                @click="wxydele(key)"
                title="删除"
              />
              <img class="tsdimg" :src="imgData[key]" />
            </div>
          </div>
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
            :limit="xianz"
            :disabled="wxyjym"
            :file-list="fileList"
            :on-change="handleChange"
          >
            <el-button size="small" type="primary">选择图片</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB，最多9张。图片已存在:{{tiswen}}/9张</div>
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
          <button class="t-btn" @click="addBbs">保存</button>
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
  name: "Editbbs",
  components: {
    ImgUpload
  },
  data() {
    return {
      bbstags: "",
      sel: true,
      bbsInfodata: "",
      formItem: {
        bbsTitle: "",
        imgurl1: "",
        bbsContent: "",
        bbstag: [],
        memberName: "",
        id: ""
      },
      sid: "",
      //B64
      portraitData: [],
      //坐标UID
      zuobz: [],
      imgData: [],
      //图片
      fileList: [],
      //限制上传的数据
      xianz: 9,
      //提示文字
      tiswen: 0,
      //是否禁用
      wxyjym: false
    };
  },
  created() {
    this.sid = this.$route.query.sid;
    var params = {
      action: "getOneBbs"
    };
    var data = qs.stringify({
      list_id: this.sid
    });
    this.api.apiPost("/bbs/bbs", "post", data, params, (status, code, res) => {
      if (status) {
        this.bbsInfodata = res.data;
        this.formItem.id = this.bbsInfodata.BbsList[0].list_id;
        this.formItem.memberName = this.bbsInfodata.BbsList[0].list_member_name;
        this.formItem.bbsTitle = this.bbsInfodata.BbsList[0].list_title;
        this.formItem.bbstag = this.bbsInfodata.BbsList[0].list_tab;
        this.formItem.imgurl1 = this.bbsInfodata.BbsList[0].list_member_avatar;
        this.formItem.bbsContent = this.bbsInfodata.BbsList[0].list_content;
        var tebdimg = this.bbsInfodata.BbsList[0].list_img;
        for (var i = 0; i < tebdimg.length; i++) {
          //数据显示
          this.imgData.push(tebdimg[i]);
        }
        if (this.imgData.length == 9) {
          this.wxyjym = true;
        }
        this.xianz = 9 - Number(this.imgData.length);
        this.tiswen = Number(this.imgData.length);
      } else {
        this.$Message.error("获取数据失败！");
      }
    });
  },
  methods: {
    //删除文件
    wxydele(key) {
      //计算移除指定位置的图片数据
      this.imgData.splice(key, 1);
      this.xianz += 1;
      this.tiswen -= 1;
      if (this.imgData.length < 9) {
        this.wxyjym = false;
      }
    },
    //文件改变时
    handleChange(file, fileList) {
      this.fileList = fileList;
      this.tiswen = Number(this.imgData.length) + Number(this.fileList.length);
    },
    //文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      this.fileList = fileList;
      this.tiswen = Number(this.imgData.length) + Number(this.fileList.length);
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
      var strNew1 = this.imgData.join("|");
      var strNew2 = this.portraitData.join("|");
      var strNew = strNew1 + "|" + strNew2;
      var params = {
        action: "add"
      };
      var params = {
        action: "edit"
      };
      var data = qs.stringify({
        list_id: this.formItem.id,
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
            this.$Message.success("编辑成功！");
            this.$router.push({
              path: "/bbs/Bbslist"
            });
          } else {
            this.$Message.error("编辑失败！");
          }
        }
      );
    },
    getNewstag() {
      var params = {
        action: "all"
      };
      this.api.apiPost("/bbs/tags", "get", "", params, (status, code, res) => {
        if (status) {
          this.bbstags = res.data; //获得银行标签数据
        } else {
          this.$Message.error(res.msg);
        }
      });
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
        this.formItem.imgurl1 = e.target.result;
      };
      return false;
    },
    bbsInfo() {}
  },
  mounted() {
    this.getNewstag();
    this.bbsInfo();
  }
};
</script>

<style scoped>
/*  */
.sgsdsl {
  width: 880px;
  display: flex;
  flex-wrap: wrap;
}
.wdasd {
  width: 120px;
  height: 120px;
  margin-right: 30px;
  position: relative;
}
.tsdimg {
  width: 100%;
  height: 100%;
  display: block;
}
.whntbimg {
  width: 30px;
  height: 30px;
  top: -15px;
  right: -15px;
  position: absolute;
  cursor: pointer;
}
/*  */
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
.addimg {
  display: block;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  width: 120px;
}
.addimg2 {
  display: block;
  width: 120px;
  height: 120px;
  border-radius: 120px;
}
.aImg {
  width: 120px;
  float: left;
  margin-right: 10px;
}
</style>