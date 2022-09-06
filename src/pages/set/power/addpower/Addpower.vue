<template>
    <div class="content">
        <div class="addbtn"><router-link to="/set/Power"><button>返回</button></router-link></div>
        <div class="addpage-box">
            <div class="add-title">添加权限</div>
            <ul class="add-ul">
                <li>
                    <span class="t-name">接口路径</span><input class="t-ipt" v-model="url" type="text" placeholder="请输入接口路径" />
                </li>
                <li>
                    <span class="t-name">权限描述</span><input class="t-ipt" v-model="mshu" type="text" placeholder="请输入权限描述" />
                </li>
                <li>
                    <span class="t-name">权限分组</span>
                    <Select v-model="model1" style="width:200px">
                        <Option v-for="item in groupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </li>
                <li>
                    <span class="t-name"></span><button class="t-btn" @click="addrole">添加</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import qs from 'qs';
export default {
    name: 'Addpower',
    data (){
        return{
            url:'',
            mshu:'',
            groupList: [],
            model1: ''
        }
    },
    methods: {
        addrole () {
            var params = {
                    action: 'addpower',
                };
            var data= qs.stringify({
                    url: this.url,
                    desc: this.mshu,
                    ap_id: this.model1
                });
            this.api.apiPost('/admin/power', 'post', data, params, (status, code, res) => {
                if (status) {
                    this.$Message.success('添加成功！');
                    this.$router.push({
                        path: '/set/Power',
                    })
                } else {
                    this.$Message.error('添加失败！');
                }
            });
        },
        groupFun () {
            var params = {
                    action: 'powergrouplist'
                };
            this.api.apiPost('/admin/powergroup', 'get', '', params, (status, code, res) => {
                if (status) {
                    this.groupList = res.data.PowergroupList;
                } else {
                    this.$Message.error('获取数据失败！');
                }
            });
        },
    },
    mounted () {
        this.groupFun();
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