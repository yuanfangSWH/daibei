<template>
    <div class="content">
        <div class="addbtn"><router-link to="/set/Role"><button>返回</button></router-link></div>
        <div class="addpage-box">
            <div class="add-title">编辑账号</div>
            <ul class="add-ul">
                <li>
                    <span class="t-name">等级名称</span><input class="t-ipt" v-model="name" type="text" placeholder="请输入等级名称" />
                </li>
                <!-- <li>
                    <span class="t-name">权限等级</span><input class="t-ipt" v-model="roledj" type="text" placeholder="请输入权限等级" />
                </li> -->
                <li>
                    <span class="t-name"></span><button class="t-btn" @click="editFun">保存</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import qs from 'qs';
export default {
    name: 'Editrole',
    data (){
        return{
            roledata:'',
            name:'',
            roledj:'',
            id:'',
            sid:''
        }
    },
    created () {
        this.sid = this.$route.query.sid;
        var params = {
                action: 'edit',
            };
        var data= qs.stringify({
                id: this.sid
            });
        this.api.apiPost('/admin/role', 'post', data, params, (status, code, res) => {
            if (status) {
                this.roledata = res.data;
                this.name = this.roledata.ag_name;
                this.roledj = this.roledata.ag_dj;
                this.id = this.roledata.ag_id;
            } else {
                this.$Message.error(''+res.msg);
            }
        });
    },
    methods: {
        editFun () {
            var params = {
                    action: 'editsave'
                };
            var data= qs.stringify({
                    id: this.id,
                    agname: this.name
                });
            this.api.apiPost('/admin/role', 'post', data, params, (status, code, res) => {
                if (status) {
                    this.$Message.success('编辑成功！');
                    this.$router.push({
                        path: '/set/Role',
                    })
                } else {
                    this.$Message.error('编辑失败！');
                }
            });
        },
        infoData (){
            
        },
    },
    mounted () {
        this.infoData();
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