<template>
    <div class="content">
        <div class="addbtn"><router-link to="/users/Commonuser"><button>返回</button></router-link></div>
        <div class="addpage-box">
            <div class="add-title">用户编辑</div>
            <ul class="add-ul">
                <li>
                    <span class="t-name">用户头像</span>
                    <div class="u-tx">
                        <img class="addimg" :src="formItem.touxiang" />
                    </div>
                </li>
                <li>
                    <span class="t-name">用户名称</span><input class="t-ipt" v-model="formItem.username" type="text" placeholder="暂无用户名称" disabled="disabled" />
                </li>
                <li>
                    <span class="t-name">手机号码</span><input class="t-ipt" v-model="formItem.mobile" type="text" placeholder="暂无用户手机号码" disabled="disabled" />
                </li>
                <li>
                    <span class="t-name">用户等级</span><div class="u-div">{{formItem.dengji}}</div>
                </li>
                <li>
                    <span class="t-name">消息通知</span><div class="u-div"><Checkbox v-model="single1" @on-change="editNotice">开启</Checkbox></div>
                </li>
                <li>
                    <span class="t-name">收益消息</span><div class="u-div"><Checkbox v-model="single2" @on-change="editIncome">开启</Checkbox></div>
                </li>
                <li>
                    <span class="t-name">新成员消息</span><div class="u-div"><Checkbox v-model="single3" @on-change="editJoin">开启</Checkbox></div>
                </li>
                <li>
                    <span class="t-name">会员状态</span><div class="u-div"><Checkbox v-model="single4" @on-change="editState">禁用</Checkbox></div>
                </li>
                <li>
                    <span class="t-name"></span><button class="t-btn" @click="saveinfo">保存</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import qs from 'qs';
export default {
    name: 'Edituser',
    data (){
        return{
            single1: true,
            single2: true,
            single3: true,
            single4: false,
            userinfo:'',
            id:'',
            tz:1,
            sytz:1,
            jointz:1,
            statetz:0,
            formItem:{
                touxiang:'',
                username:'',
                mobile:'',
                dengji:''
            },
            sid:'',
        }
    },
    created () {
        this.sid = this.$route.query.sid;
        var params = {
                    action: 'getInfo',
                };
            var data= qs.stringify({
                    userId: this.sid
                });
            this.api.apiPost('/user/userop', 'post', data, params, (status, code, res) => {
                if (status) {
                    var obj = new Object();
                    obj = res.data;
                    obj.id =this.sid;
                    this.userinfo = obj;
                    //console.log("当前编辑数据："+JSON.stringify(obj));
                    this.formItem.touxiang = this.userinfo.userInfo.avatar;
                    this.formItem.username = this.userinfo.userInfo.nickname;
                    this.formItem.mobile = this.userinfo.userInfo.mobile;
                    if(this.userinfo.userInfo.user_type == 0){
                        this.userinfo.userInfo.user_type = '普通用户'
                    }else{
                        this.userinfo.userInfo.user_type = '合伙人'
                    }
                    this.formItem.dengji = this.userinfo.userInfo.user_type;
                    this.tz = Number(this.userinfo.userInfo.is_notice);
                    if(this.tz==1){
                        this.single1=true;
                    }else{
                        this.single1=false;
                    };
                    this.sytz = Number(this.userinfo.userInfo.is_income);
                    if(this.sytz==1){
                        this.single2=true;
                    }else{
                        this.single2=false;
                    };
                    this.jointz = Number(this.userinfo.userInfo.is_join);
                    if(this.jointz==1){
                        this.single3=true;
                    }else{
                        this.single3=false;
                    };
                    this.statetz = Number(this.userinfo.userInfo.is_state);
                    if(this.statetz==1){
                        this.single4=true;
                    }else{
                        this.single4=false;
                    };
                    this.id = this.userinfo.id;
                } else {
                    this.$Message.error(''+res.msg);
                }
            });
    },
    methods: {
        editNotice (e) {
            if(e==true){
                this.tz = 1;
            }else{
                this.tz = 0;
            }
            var params = {
                    action: 'notice',
                };
            var data= qs.stringify({
                    userId: this.sid,
                    value: this.tz
                });
            this.api.apiPost('/user/userop', 'post', data, params, (status, code, res) => {
                if (status) {
                    if(this.tz==1){
                        this.$Message.success('开启消息通知成功！');
                   }else{
                        this.$Message.success('关闭消息通知成功！');
                   }
                } else {
                    this.$Message.error('设置失败！');
                }
            });
        },
        editIncome (e) {
            if(e==true){
                this.sytz = 1;
            }else{
                this.sytz = 0;
            }
            var params = {
                    action: 'income',
                };
            var data= qs.stringify({
                    userId: this.sid,
                    value: this.sytz
                });
            this.api.apiPost('/user/userop', 'post', data, params, (status, code, res) => {
                if (status) {
                    if(this.sytz==1){
                        this.$Message.success('开启收益通知成功！');
                   }else{
                        this.$Message.success('关闭收益通知成功！');
                   }
                } else {
                    this.$Message.error('设置失败！');
                }
            });
        },
        editJoin (e) {
            if(e==true){
                this.jointz = 1;
            }else{
                this.jointz = 0;
            }
            var params = {
                    action: 'join',
                };
            var data= qs.stringify({
                    userId: this.sid,
                    value: this.jointz
                });
            this.api.apiPost('/user/userop', 'post', data, params, (status, code, res) => {
                if (status) {
                    if(this.jointz==1){
                        this.$Message.success('开启新成员消息成功！');
                   }else{
                        this.$Message.success('关闭新成员消息成功！');
                   }
                } else {
                    this.$Message.error('设置失败！');
                }
            });
        },
        editState (e) {
            if(e==true){
                this.statetz = 1;
            }else{
                this.statetz = 0;
            }
            var params = {
                    action: 'state',
                };
            var data= qs.stringify({
                    userId: this.sid,
                    value: this.statetz
                });
            this.api.apiPost('/user/userop', 'post', data, params, (status, code, res) => {
                if (status) {
                    if(this.statetz==1){
                        this.$Message.success('禁用用户状态成功！');
                   }else{
                        this.$Message.success('解除禁用状态成功！');
                   }
                } else {
                    this.$Message.error('设置失败！');
                }
            });
        },
        saveinfo () {
            this.$router.push({
                path: '/users/Commonuser',
            })
        },
    },
    mounted () {
    }
}
</script>

<style scoped>
ul li{ list-style: none;}
.content{ position:absolute; top: 54px; left: 240px; width: calc(100% - 240px);height: calc(100vh - 242px); overflow-y:scroll; background: #EBF1F4; padding-left: 20px; box-sizing: border-box; height: calc(100vh - 54px); }
.addbtn button{ height: 36px; line-height: 36px; color: #ffffff; background: #037AFF; padding: 0 15px; border: none; font-size: 16px; margin: 20px 0;}
.addpage-box{ width: calc(100% - 20px); background: #ffffff}
.add-title{ width: 100%; border-bottom: 1px solid #E7E9EA; box-sizing: border-box; padding: 12px 20px; font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(0,0,0,1);}
.add-ul{ padding: 30px 50px;}
.add-ul li{ margin-bottom: 40px; display: flex;}
.t-name{ width: 90px; font-size:14px;font-family:PingFang-SC-Medium;font-weight:500;color:rgba(0,0,0,1); float: left; height: 40px; display: block; line-height: 40px;}
.t-ipt{ width: 280px; height: 40px;background:#F3F3F3;border:1px solid rgba(180,180,180,1); padding: 5px 10px;font-size:14px;}
.t-btn{width:280px;height:40px;background:rgba(3,122,255,1);border-radius:2px; border: none; color: #ffffff; font-size: 14px; font-weight: 500;}
.u-tx{ flex: 1; height: 65px; margin-left: 10px;}
.u-tx img{ width: 65px; height: 65px; border-radius: 65px;}
.u-div{ flex: 1;height: 40px; line-height: 40px; font-size:14px;}
</style>