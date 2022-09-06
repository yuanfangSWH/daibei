<template>
    <div class="content">
        <div class="addbtn"><router-link to="/set/account"><button>返回</button></router-link></div>
        <div class="addpage-box">
            <div class="add-title">编辑权限</div>
            <ul class="add-ul">
                <li>
                    <div class="allqxuan">
                        <Checkbox
                            :indeterminate="indeterminate"
                            :value="checkAll"
                            @click.prevent.native="handleCheckAll">全选</Checkbox>
                    </div>
                    <div class="cbox" v-for="(item,index) in data11" :key="index">
                        <div class="cztitle">
                            <!-- <Checkbox v-model="item.allcheck" @on-change="allFun">{{item.name}}</Checkbox> -->
                            {{item.name}}
                        </div>
                        <div class="czlist">
                            <CheckboxGroup v-model="ids" @on-change="checkAllGroupChange">
                                <Checkbox v-for="(item2,index2) in item.fun" :key="index2" v-model="item2.check" :label="item2.af_id">{{item2.af_desc}}</Checkbox>
                            </CheckboxGroup>
                        </div>
                    </div>
                </li>
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
    name: 'Editaccountqx',
    data (){
        return{
            powerdata:'',
            url:'',
            mshu:'',
            groupList: [],
            model1: '',
            id:'',
            data1:[],
            data11:[],
            data2:[],
            ids:[],
            data3:[],
            indeterminate: true,
            checkAll: false,
            tLength:0,
            allids:[],
            sid:''
        }
    },
    created () {
        this.sid = this.$route.query.sid;
        var params = {
                action: 'edit',
            };
        var data= qs.stringify({
                adminid: this.sid
            });
        this.api.apiPost('/admin/accountqx', 'post', data, params, (status, code, res) => {
            if (status) {
                var obj = new Object();
                obj = res.data;
                obj.admid = this.sid;
                this.powerdata = obj;
                //console.log("接收数据："+JSON.stringify(this.powerdata));
                this.data1 = this.powerdata.qbqx;//所有权限
                var arrid=[];
                for(var i=0; i<this.data1.length; i++){
                    var Bobj = new Object();
                    Bobj = this.data1[i];
                    Bobj.allcheck=false;
                    for(var j=0; j<this.data1[i].fun.length; j++){
                        var obj = new Object();
                        obj = this.data1[i].fun[j];
                        obj.check=false;
                        arrid = arrid.concat(this.data1[i].fun[j].af_id);
                    }
                }
                this.allids = arrid;
                this.tLength = this.allids.length;
                //console.log("数zu："+JSON.stringify(this.data1));
                //console.log("数zu："+JSON.stringify(this.allids));
                this.data11 = this.data1;
                this.data2 = this.powerdata.yyqx;//拥有的权限
                this.id = this.powerdata.admid;
                var arr2 = [];
                for(var i=0; i<this.data2.length; i++){
                    arr2 = arr2.concat(this.data2[i].af_id);
                }
                this.ids = arr2;
            } else {
                this.$Message.error(''+res.msg);
            }
        });
    },
    methods: {
        handleCheckAll () {
            if (this.indeterminate) {
                this.checkAll = false;
            } else {
                this.checkAll = !this.checkAll;
            }
            this.indeterminate = false;

            if (this.checkAll) {
                this.ids = this.allids;
            } else {
                this.ids = [];
            }
        },
        checkAllGroupChange (data) {
            if (data.length === this.tLength) {
                this.indeterminate = false;
                this.checkAll = true;
            } else if (data.length > 0) {
                this.indeterminate = true;
                this.checkAll = false;
            } else {
                this.indeterminate = false;
                this.checkAll = false;
            }
        },
        editFun () {
            var params = {
                    action: 'editsave',
                };
            var data= qs.stringify({
                    adminid: this.id,
                    afid: this.ids,
                });
            this.api.apiPost('/admin/accountqx', 'post', data, params, (status, code, res) => {
                if (status) {
                    this.$Message.success('编辑成功！');
                    this.$router.push({
                        path: '/set/account',
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
.czlist{ float: left; margin-right: 20px;}
.cztitle{border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px; font-weight: bold; font-size: 14px;}
.js{ height: 40px; line-height: 40px; font-size: 14px; font-weight: bold;}
.cbox{ display: inline-block; width: 100%; margin-bottom: 30px;}
.allqxuan{ display: inline-block; width: 100%; margin-bottom: 30px; color: #037AFF; font-weight: bold;}
</style>