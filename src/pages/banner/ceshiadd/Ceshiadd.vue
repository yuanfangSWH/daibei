<template>
    <div class="content">
        <div class="addbtn"><router-link to="/banner"><button>返回</button></router-link></div>
        <div class="addpage-box">
            <div class="add-title">添加banner</div>
            <ul class="add-ul">
                <li>
                    <span class="t-name">图片上传</span><img-upload @func="getMsgFormSon"></img-upload>
                </li>
                <li>
                    <span class="t-name">尺寸填写</span><input class="t-ipt" v-model="formItem.size" type="text" placeholder="请输入尺寸" />
                </li>
                <li>
                    <span class="t-name">转跳链接</span><img-upload @func="getMsgFormSon2"></img-upload>
                </li>
                <li>
                    <span class="t-name">排序</span><input class="t-ipt" v-model="formItem.rank" type="text" placeholder="请输入排序" />
                </li>
                <li>
                    <span class="t-name"></span><button class="t-btn" @click="addBbs">添加</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import qs from 'qs';
import ImgUpload from './../../editbank/components/Upload';
export default {
    name: 'Ceshiadd',
     components:{
         ImgUpload
     },
    data (){
        return{
            bbstags:'',
            sel:true,
            formItem: {
                imgurl1:'',
                imgurl2:'',
                size:'',
                tzurl:'',
                rank:'0'
            },
        }
    },
    methods: {
        addBbs () {
            var params = {
                action: 'add',
            };
            var data= qs.stringify({
                    value: {
                        text: this.formItem.size,
                        rank: this.formItem.rank,
                        bannerBase64: this.formItem.imgurl1,
                        bannerTu: this.formItem.imgurl2,
                    }
                });
            this.api.apiPost('/system/ban', 'post', data, params, (status, code, res) => {
                if (code==200) {
                    this.$Message.success('添加成功！');
                    this.$router.push({
                        path: '/banner',
                    })
                } else {
                    this.$Message.error(res.msg);
                    
                }
            });
        },
        //接收子组件的imgurl
        getMsgFormSon(data){
            this.formItem.imgurl1 = data
            //console.log("父组件1："+this.formItem.imgurl1)
        },
        //接收子组件的imgurl
        getMsgFormSon2(data){
            this.formItem.imgurl2 = data
            //console.log("父组件2："+this.formItem.imgurl2)
        },
    },
    mounted () {
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
.t-btn{width:280px;height:40px;background:rgba(3,122,255,1);border-radius:2px; border: none; color: #ffffff; font-size: 14px; font-weight: 500;}
.demo-nav{ color: #888; font-size: 12px; display: inline-block; margin-left: 10px;}
.t-tip{ color: #333; float: left; margin-left: 10px; line-height: 40px;}
.t-tip2{ color: #333; float: left; margin: 0 8px; line-height: 40px;}
</style>