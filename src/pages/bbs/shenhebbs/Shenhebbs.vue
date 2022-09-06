<template>
    <div class="content">
        <div class="addbtn"><router-link to="/bbs/Bbslist"><button>返回</button></router-link></div>
        <div class="addpage-box">
            <div class="add-title">审核帖子</div>
            <ul class="add-ul">
                <li>
                    <span class="t-name">帖子标题</span><input class="t-ipt" v-model="formItem.bbsTitle" type="text" disabled />
                </li>
                <li>
                    <span class="t-name">用户名称</span><input class="t-ipt" v-model="formItem.memberName" type="text"disabled />
                </li>
                <li>
                    <span class="t-name">帖子标签</span>
                    <input class="t-ipt" v-model="shtag" type="text" disabled />
                </li>
                <li>
                    <span class="t-name">封面图片</span>
                    <div style="width: auto; float:left;">
                        <img class="addimg" v-for="(item, index) in formItem.imgurl1" :key="index" :src="item" />
                    </div>
                </li>
                <li>
                    <span class="t-name">用户头像</span>
                    <div style="width: 120px;height:120px; float:left;">
                        <img class="addimg2" :src="formItem.imgurl2" />
                    </div>
                </li>
                <li>
                    <span class="t-name">帖子内容</span>
                    <quill-editor ref="myTextEditor" v-model="formItem.bbsContent" @focus="onEditerFocus($event)"></quill-editor>
                </li>
                <li>
                    <span class="t-name"></span><button class="t-btn" @click="bbsPast">审核通过</button><button class="t-btn2" @click="bbsNopast">审核不通过</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import qs from 'qs';
export default {
    name: 'Shenhebbs',
    data (){
        return{
            bbstags:'',
            sel:true,
            bbsInfodata:'',
            shtag:'',
            formItem: {
                bbsTitle:'',
                imgurl1:'',
                imgurl2:'',
                bbsContent: '',
                bbstag:[],
                memberName:'',
                id:''
            },
        }
    },
    methods: {
        onEditerFocus (event) {
            event.enable(false);
        },
        bbsPast () {
            var params = {
                    action: 'sh',
                };
            var data= qs.stringify({
                    list_id: this.formItem.id,
                });
            this.api.apiPost('/bbs/bbs', 'post', data, params, (status, code, res) => {
                if (status) {
                    this.$Message.success('审核成功！');
                    this.$router.push({
                        path: '/bbs/Bbslist',
                    })
                } else {
                    this.$Message.error(res.msg);
                }
            });
        },
        bbsNopast () {
            var params = {
                    action: 'del',
                };
            var data= qs.stringify({
                    list_id: this.formItem.id,
                });
            this.api.apiPost('/bbs/bbs', 'post', data, params, (status, code, res) => {
                if (status) {
                    this.$Message.success('删除成功！');
                    this.$router.push({
                        path: '/bbs/Bbslist',
                    })
                } else {
                    this.$Message.error(res.msg);
                }
            });
        },
        bbsInfo () {
            this.bbsInfodata=this.$route.params;
            //console.log("接收审核数据：" + JSON.stringify(this.bbsInfodata));
            this.formItem.id = this.bbsInfodata.BbsList[0].list_id;
            this.formItem.memberName = this.bbsInfodata.BbsList[0].list_member_name;
            this.formItem.bbsTitle = this.bbsInfodata.BbsList[0].list_title;
            this.formItem.bbstag = this.bbsInfodata.BbsList[0].list_tab;
            this.formItem.imgurl1 = this.bbsInfodata.BbsList[0].list_img;
            this.formItem.imgurl2 = this.bbsInfodata.BbsList[0].list_member_avatar;
            var str = this.bbsInfodata.BbsList[0].list_content;
            var reg = RegExp(/<section/);
            if(str.match(reg)){
                // 包含p标签   
                this.formItem.bbsContent = this.bbsInfodata.BbsList[0].list_content.replace(/<section/g, '<div').replace(/\/section>/g, '/div>');    
            }else{
                this.formItem.bbsContent = this.bbsInfodata.BbsList[0].list_content;
            }
            
        },
        getNewstag () {
            var _this=this;
            var params = {
                    action: 'all',
                };
            _this.api.apiPost('/bbs/tags', 'get', '', params, (status, code, res) => {
                if (status) {
                    _this.bbstags = res.data;//获得标签数据
                    //标签id匹配标签名
                    var arr01=[];
                    var a=[];
                    for(var i=0; i<_this.bbstags.length; i++){
                        for(var j=0; j<_this.formItem.bbstag.length; j++){
                            if(_this.formItem.bbstag[j] == _this.bbstags[i].id){
                                a = _this.bbstags[i].tab_name;
                                arr01 = arr01.concat(a);
                                }
                            }  
                    }
                    _this.shtag = arr01;
                } else {
                    _this.$Message.error(res.msg);
                }
            });
        },
    },
    mounted () {
        this.getNewstag();
        this.bbsInfo();
    }
}
</script>

<style scoped>
.add-ul >>> .ivu-select-dropdown-list li{ margin-bottom: 0;}
.add-ul >>> .ivu-select-selection{ border-color: rgba(180,180,180,1); border-radius: 0;}
.add-ul >>> .ivu-input-wrapper{ width: auto;}
.add-ul >>> textarea.ivu-input{ width: 280px; height: 110px; display: inline-block;}
.add-ul >>> .ivu-upload-drag{ border: none; border-radius: 0;}
.add-ul >>> .quill-editor{ float: left; max-width: 650px;}
.add-ul >>> .ivu-checkbox-group{ display:inline-block; line-height: 40px;}
.add-ul >>> .ivu-radio-group{ line-height: 40px;}
ul li{ list-style: none;}
.content{ position:absolute; top: 54px; left: 240px; width: calc(100% - 240px);height: calc(100vh - 242px); overflow-y:scroll; background: #EBF1F4; padding-left: 20px; box-sizing: border-box; height: calc(100vh - 54px); }
.addbtn button{ height: 36px; line-height: 36px; color: #ffffff; background: #037AFF; padding: 0 15px; border: none; font-size: 16px; margin: 20px 0;}
.addpage-box{ float: left; width: calc(100% - 20px); background: #ffffff}
.add-title{ width: 100%; border-bottom: 1px solid #E7E9EA; box-sizing: border-box; padding: 12px 20px; font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(0,0,0,1);}
.add-ul{ padding: 30px 50px; float: left;}
.add-ul li{ margin-bottom: 40px; width: 100%; float: left;}
.t-name{ width: 100px; float: left; font-size:14px;font-family:PingFang-SC-Medium;font-weight:500;color:rgba(0,0,0,1); float: left; height: 40px; display: block; line-height: 40px;}
.t-ipt{ float: left; width: 280px; height: 40px;background:rgba(255,255,255,1);border:1px solid rgba(180,180,180,1); padding: 5px 10px;font-size:14px;}
.t-btn{width:180px;height:40px;background:rgba(3,122,255,1);border-radius:2px; border: none; color: #ffffff; font-size: 14px; font-weight: 500; margin-left: 20px;}
.t-btn2{width:180px;height:40px;background: #ed4014;border-radius:2px; border: none; color: #ffffff; font-size: 14px; font-weight: 500; margin-left: 20px;}
.demo-nav{ color: #888; font-size: 12px; display: inline-block; margin-left: 10px;}
.t-tip{ color: #333; float: left; margin-left: 10px; line-height: 40px;}
.t-tip2{ color: #333; float: left; margin: 0 8px; line-height: 40px;}
.addimg{ display: block; max-height: 400px; float: left; margin-right: 10px; margin-bottom: 10px;}
.addimg2{ display: block; width: 120px; height: 120px; border-radius: 120px;}
</style>