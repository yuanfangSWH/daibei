<template>
    <div class="content">
        <div class="addbtn"><router-link to="/bbs/yhmp"><button>返回</button></router-link></div>
        <div class="addpage-box">
            <div class="add-title">编辑文案</div>
            <ul class="add-ul">
                    <span class="t-name">文案内容</span><Input maxlength="50" v-model="formItem.bjwan"  type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入文案内容50字内" />
                </li>
                <li>
                    <span class="t-name"></span><button class="t-btn" @click="addInform">保存</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import qs from 'qs';
export default {
    name: 'Edityhmp',
    data (){
        return{
            // 总数据绑定
            formItem: {
                // 文案数据
                bjwan:'',
                id:'',
            },

        //    获取全部数据
            informData:'',
            sid:''
        }
    },
    created () {
        this.sid = this.$route.query.sid;
        var params = {
            
                action: 'getOne',
            };
        var data= qs.stringify({
                id: this.sid
            });
        this.api.apiPost('/user/personalcard', 'post', data, params, (status, code, res) => {
            if (status) {
                this.informData = res.data;
                // 获取单个id信息
                this.formItem.id = this.informData.id;
                this.formItem.bjwan = this.informData.personal_text;
                
            } else {
                this.$Message.error(''+res.msg);
            }
        });
    },


    methods: {
        addInform () {
            var params = {
                    action: 'edit',
                };
            var data= qs.stringify({
                    id: this.formItem.id,
                        // personal_text: this.formItem.bjwan,
                    user_introduce: this.formItem.bjwan,
                });
            this.api.apiPost('/user/personalcard', 'post', data, params, (status, code, res) => {
                if (status) {
                    this.$Message.success('编辑成功！');
                    this.$router.push({
                        path: '/bbs/yhmp',
                    })
                } else {
                    this.$Message.error('编辑失败！');
                }
            });
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
.add-ul >>> textarea.ivu-input{ width: 280px; height: 110px; display: inline-block; border: 1px solid rgba(180,180,180,1); border-radius: 0;}
.add-ul >>> .ivu-upload-drag{ border: none; border-radius: 0;}
.add-ul >>> .quill-editor{ float: left; max-width: 650px;}
.add-ul >>> .ivu-checkbox-group{ display:inline-block; line-height: 40px;}
.add-ul >>> .ivu-radio-group{ line-height: 40px; float: left;}
ul li{ list-style: none;}
.content{ position:absolute; top: 54px; left: 240px; width: calc(100% - 240px);height: calc(100vh - 242px); overflow-y:scroll; background: #EBF1F4; padding-left: 20px; box-sizing: border-box; height: calc(100vh - 54px); }
.addbtn button{ height: 36px; line-height: 36px; color: #ffffff; background: #037AFF; padding: 0 15px; border: none; font-size: 16px; margin: 20px 0;}
.addpage-box{ float: left; width: calc(100% - 20px); background: #ffffff}
.add-title{ width: 100%; border-bottom: 1px solid #E7E9EA; box-sizing: border-box; padding: 12px 20px; font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(0,0,0,1);}
.add-ul{ padding: 30px 50px; float: left;}
.add-ul li{ margin-bottom: 40px; width: 100%; float: left;}

.t-name{ width: 100px; float: left; font-size:14px;font-family:PingFang-SC-Medium;font-weight:500;color:rgba(0,0,0,1); float: left; height: 40px; display: block; line-height: 40px;}

.t-ipt{ float: left; width: 280px; height: 40px;background:rgba(255,255,255,1);border:1px solid rgba(180,180,180,1); padding: 5px 10px;font-size:14px;}
.t-btn{width:280px;height:40px;background:rgba(3,122,255,1);border-radius:2px; border: none; color: #ffffff; font-size: 14px; font-weight: 500; margin-top: 60px;}
.demo-nav{ color: #888; font-size: 12px; display: inline-block; margin-left: 10px; line-height: 40px;}
.t-tip{ color: #333; float: left; margin-left: 10px; line-height: 40px;}
.t-tip2{ color: #333; float: left; margin: 0 8px; line-height: 40px;}
</style>