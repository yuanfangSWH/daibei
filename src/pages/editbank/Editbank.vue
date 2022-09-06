<template>
    <div class="content">
        <div class="addbtn"><router-link to="/Bank"><button>返回</button></router-link></div>
        <div class="addpage-box">
            <div class="add-title">产品编辑</div>
            <ul class="add-ul">
                <li>
                    <span class="t-name">银行名称</span><input class="t-ipt" v-model="formItem.bankname" type="text" placeholder="请输入银行名称" />
                </li>
                <li>
                    <span class="t-name">银行标题</span><input class="t-ipt" v-model="formItem.banktitle" type="text" placeholder="请输入银行标题" />
                </li>
                <li>
                    <span class="t-name">银行标签</span>
                    <CheckboxGroup v-model="formItem.banktag">
                        <Checkbox v-for="item in banktags" :label="item.id" :key="item.id">{{item.tab_name}}</Checkbox>
                    </CheckboxGroup>
                </li>
                <li>
                    <span class="t-name">银行图标</span>
                    <Upload
                        ref="upload"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload1"
                        type="drag"
                        action="http://aaadmin3.rong298.cn/bank/bank"
                        style="display: inline-block;width:120px;">
                        <div style="width: 120px;height:120px;">
                            <img class="addimg" :src="formItem.imgurl1" />
                        </div>
                    </Upload>
                </li>
                <!-- <li>
                    <span class="t-name">详情图片</span>
                    <Upload
                        ref="upload"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload2"
                        type="drag"
                        action="http://aaadmin3.rong298.cn/bank/bank"
                        style="display: inline-block;width:120px;">
                        <div style="width: 120px;height:120px;">
                            <img class="addimg" :src="formItem.imgurl2" />
                        </div>
                    </Upload>
                </li> -->
                <li>
                    <span class="t-name">银行海报</span>
                    <Upload
                        ref="upload"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload3"
                        type="drag"
                        action="http://aaadmin3.rong298.cn/bank/bank"
                        style="display: inline-block;width:120px;">
                        <div style="width: 120px;height:120px;">
                            <img class="addimg" :src="formItem.imgurl3" />
                        </div>
                    </Upload>
                </li>
                <li>
                    <span class="t-name">银行介绍</span><input class="t-ipt" v-model="formItem.bankintroduce" type="text" placeholder="请输入申请链接" />
                </li>
                <li>
                    <span class="t-name">结算周期</span>
                    <input class="t-ipt" v-model="formItem.model2" type="text" placeholder="请输入结算周期" /><div class="demo-nav">此处填写：结算周期T+X，X值</div>
                    <!-- <Select v-model="formItem.model2" size="large" border style="width:280px; position:relative;">
                        <Option v-for="item in formItem.settlement" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select> -->
                </li>
                <li>
                    <span class="t-name">最快通过时间</span><input class="t-ipt" v-model="formItem.passtime" type="text" placeholder="请输入申请链接" />
                </li>
                <li>
                    <span class="t-name">结算类型</span>
                    <RadioGroup v-model="formItem.animal">
                        <label><Radio label="0">人工结算</Radio>
                        <Radio label="1">主动查询</Radio>
                        <Radio label="2">被动查询</Radio></label>
                    </RadioGroup>
                </li>
                <li>
                    <span class="t-name">查询网址</span><input class="t-ipt" v-model="formItem.queryurl" type="text" placeholder="请输入查询网址" />
                </li>
                <li>
                    <span class="t-name">最高返佣</span><input class="t-ipt" v-model="formItem.highrebate" type="text" placeholder="请输入最高返佣" />
                    <Select v-model="modelfy" style="width:60px; margin-left:8px;" :transfer='sel' :placeholder="yhufy"  :label-in-value='sel' @on-change="cheshi2">
                        <Option v-for="item in fyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </li>
                <li>
                    <span class="t-name">福利介绍</span><Input class="areaipt" v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入福利介绍..." :maxlength='10'></Input><div class="demo-nav">长度10个字符以内</div>
                </li>
                <li>
                    <span class="t-name">排序</span><input class="t-ipt" v-model="formItem.bankrank" type="text" placeholder="请输入排序" />
                </li>
                <li>
                    <span class="t-name"></span><button class="t-btn" @click="editBank">保存产品</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import qs from 'qs';
export default {
    name: 'Editbank',
    data (){
        return{
            banktags: '',
            bankinfo:'',
            sel:true,
            modelfy:'',
            fyList: [
                {
                    value: '1',
                    label: '%'
                },
                {
                    value: '2',
                    label: '元'
                }
            ],
            yhufy:'%',
            formItem: {
                id:'',
                bankname:'',
                banktitle:'',
                banktag: [],//银行标签
                imgurl1:'',
                imgurl2:'',
                imgurl3:'',
                bankintroduce:'',
                model2: '',
                passtime:'',
                animal: '1',
                queryurl:'',
                highrebate:'',
                textarea: '',
                bankrank:''
            },
            data1:'',
        }
    },
    methods: {
        cheshi2 (e) {
            var str2 = e.label;
            str2=str2.replace(/元/g, "#");
            this.yhufy =str2;
        },
        editBank () {
            this.yhufy = this.yhufy.replace(/元/g, "#");
            var params = {
                    action: 'edit',
                };
            var data= qs.stringify({
                    bank_id: this.formItem.id,
                    value: {
                        bank_name: this.formItem.bankname,
                        bank_title: this.formItem.banktitle,
                        bank_icon: this.formItem.imgurl1,
                        // bank_img: this.formItem.imgurl2,
                        bank_qr_bg: this.formItem.imgurl3,
                        bank_text: this.formItem.bankintroduce,
                        bank_pass_end: this.formItem.model2,
                        bank_pass_time: this.formItem.passtime,
                        bank_pass_type: this.formItem.animal,
                        bank_pass_url: this.formItem.queryurl,
                        bank_pass_fanyong: this.formItem.highrebate+this.yhufy,
                        bank_introduce: this.formItem.textarea,
                        bank_tab: this.formItem.banktag,//银行标签
                        bank_sort:this.formItem.bankrank
                        }
                });
            this.api.apiPost('/bank/bank', 'post', data, params, (status, code, res) => {
                if (status) {
                    this.$Message.success('编辑成功！');
                    this.$router.push({
                        path: '/Bank',
                    })
                } else {
                    this.$Message.error('编辑失败！');
                }
            });
        },
        tagInfo () {
            this.bankinfo = this.$route.params.bank;
            var str2 = this.bankinfo[0].bank_pass_fanyong;
            var reg = RegExp(/%/);//校验是否包含%
            var reg2 = RegExp(/#/);//校验是否包含#
            if(str2.match(reg)){
                // 包含   
                this.formItem.highrebate = str2.substr(0, str2.length - 1); //去除最后一位字符 
                this.yhufy = '%';   
            }else if(str2.match(reg2)){
                this.formItem.highrebate = str2.substr(0, str2.length - 1); //去除最后一位字符 
                this.yhufy = '元';  
            }else{
                this.formItem.highrebate = str2;
            };
            //console.log("接收数据："+JSON.stringify(this.bankinfo));
            this.formItem.id=this.bankinfo[0].id,
            this.formItem.bankname=this.bankinfo[0].bank_name;
            this.formItem.imgurl1=this.bankinfo[0].bank_icon;
            //this.formItem.imgurl2=this.bankinfo[0].bank_img;
            this.formItem.imgurl3=this.bankinfo[0].bank_qr_bg;
            this.formItem.bankintroduce=this.bankinfo[0].bank_text;
            this.formItem.model2=this.bankinfo[0].bank_pass_end;
            this.formItem.passtime=this.bankinfo[0].bank_pass_time;
            this.formItem.animal=''+this.bankinfo[0].bank_pass_type;
            this.formItem.queryurl=this.bankinfo[0].bank_pass_url;
            //this.formItem.highrebate=this.bankinfo[0].bank_pass_fanyong;
            this.formItem.textarea=this.bankinfo[0].bank_introduce;
            this.formItem.banktag=this.bankinfo[0].bank_tab;//银行标签
            this.formItem.banktitle=this.bankinfo[0].bank_title;
            this.formItem.bankrank=this.bankinfo[0].bank_sort;
             //console.log("接收数据22："+JSON.stringify(this.formItem.banktag));
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: 'The file format is incorrect',
                desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: 'Exceeding file size limit',
                desc: 'File  ' + file.name + ' is too large, no more than 2M.'
            });
        },
        handleBeforeUpload1 (file) {
            this.file = file
            const FileExt = this.file.name.replace(/.+\./, "");//取得文件的后缀名
            const reader = new FileReader() //读取文件的字符流
            reader.readAsDataURL(file)//将文件读取为 DataURL 以data:开头的字符串
            reader.onload = e => {
                this.formItem.imgurl1= e.target.result
            }
            return false;
        },
        handleBeforeUpload2 (file) {
            this.file = file
            const FileExt = this.file.name.replace(/.+\./, "");//取得文件的后缀名
            const reader = new FileReader() //读取文件的字符流
            reader.readAsDataURL(file)//将文件读取为 DataURL 以data:开头的字符串
            reader.onload = e => {
                this.formItem.imgurl2= e.target.result
            }
            return false;
        },
        handleBeforeUpload3 (file) {
            this.file = file
            const FileExt = this.file.name.replace(/.+\./, "");//取得文件的后缀名
            const reader = new FileReader() //读取文件的字符流
            reader.readAsDataURL(file)//将文件读取为 DataURL 以data:开头的字符串
            reader.onload = e => {
                this.formItem.imgurl3= e.target.result
            }
            return false;
        },
        getBanktag () {
            this.api.apiPost('/bank/tags', 'get', '', '', (status, code, res) => {
                if (status) {
                    this.banktags = res.data;
                } else {
                    this.$Message.error('获取数据失败！');
                }
            });
        }
    },
    mounted () {
        this.tagInfo();
        this.getBanktag();
    }
}
</script>

<style scoped>
.add-ul >>> .ivu-select-dropdown-list li{ margin-bottom: 0;}
.add-ul >>> .ivu-select-selection{ border-color: rgba(180,180,180,1); border-radius: 0;}
.add-ul >>> .ivu-input-wrapper{ width: auto;}
.add-ul >>> textarea.ivu-input{ width: 280px; height: 110px; display: inline-block;border:1px solid rgba(180,180,180,1); border-radius: 0px;}
.add-ul >>> .ivu-upload-drag{ border: none; border-radius: 0;}
.add-ul >>> .ivu-checkbox-group{ display:inline-block; line-height: 40px;}
ul li{ list-style: none;}
.content{ position:absolute; top: 54px; left: 240px; width: calc(100% - 240px);height: calc(100vh - 242px); overflow-y:scroll; background: #EBF1F4; padding-left: 20px; box-sizing: border-box; height: calc(100vh - 54px); }
.addbtn button{ height: 36px; line-height: 36px; color: #ffffff; background: #037AFF; padding: 0 15px; border: none; font-size: 16px; margin: 20px 0;}
.addpage-box{ width: calc(100% - 20px); background: #ffffff}
.add-title{ width: 100%; border-bottom: 1px solid #E7E9EA; box-sizing: border-box; padding: 12px 20px; font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(0,0,0,1);}
.add-ul{ padding: 30px 50px;}
.add-ul li{ margin-bottom: 40px;}
.t-name{ width: 100px; float: left; font-size:14px;font-family:PingFang-SC-Medium;font-weight:500;color:rgba(0,0,0,1); float: left; height: 40px; display: block; line-height: 40px;}
.t-ipt{ width: 280px; height: 40px;background:rgba(255,255,255,1);border:1px solid rgba(180,180,180,1); padding: 5px 10px;font-size:14px;}
.t-btn{width:280px;height:40px;background:rgba(3,122,255,1);border-radius:2px; border: none; color: #ffffff; font-size: 14px; font-weight: 500;}

 .demo-upload-list{ width: 120px; height: 120px;
        display: inline-block;
        text-align: center;
        overflow: hidden;
        background: #fff;
        position: relative;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
    .addimg{ width: 120px; height: 120px;}
    .demo-nav{ color: #888; font-size: 12px; display: inline-block; margin-left: 10px;}
</style>