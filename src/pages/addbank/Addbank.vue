<template>
    <div class="content">
        <div class="addbtn"><router-link to="/Bank"><button>返回</button></router-link></div>
        <div class="addpage-box">
            <div class="add-title">产品添加</div>
            <ul class="add-ul">
                <li>
                    <span class="red-xh">*</span><span class="t-name">银行名称</span><input class="t-ipt" v-model="formItem.bankname" type="text" placeholder="请输入银行名称" />
                </li>
                <li>
                    <span class="red-xh">*</span><span class="t-name">银行标题</span><input class="t-ipt" v-model="formItem.banktitle" type="text" placeholder="请输入银行标题" />
                </li>
                <li>
                    <span class="t-name">银行标签</span>
                    <CheckboxGroup v-model="formItem.banktag">
                        <Checkbox v-for="item in banktags" :label="item.id" :key="item.id">{{item.tab_name}}</Checkbox>
                    </CheckboxGroup>
                </li>
                <li>
                    <span class="red-xh">*</span><span class="t-name">银行图标</span>
                    <img-upload @func="getMsgFormSon"></img-upload>
                </li>
                <!-- <li>
                    <span class="red-xh">*</span><span class="t-name">详情图片</span>
                    <img-upload  @func="getMsgFormSon2"></img-upload>
                </li> -->
                <li>
                    <span class="red-xh">*</span><span class="t-name">银行海报</span>
                    <img-upload  @func="getMsgFormSon3"></img-upload>
                </li>
                <li>
                    <span class="red-xh">*</span><span class="t-name">银行介绍</span><input class="t-ipt" v-model="formItem.bankintroduce" type="text" placeholder="请输入银行介绍"  />
                </li>
                <li>
                    <span class="red-xh">*</span><span class="t-name">结算周期</span>
                    <input class="t-ipt" v-model="formItem.model2" type="text" placeholder="请输入结算周期" /><div class="demo-nav">此处填写：结算周期T+X，X值</div>
                    <!-- <Select v-model="formItem.model2" size="large" border style="width:280px; position:relative;">
                        <Option v-for="item in formItem.settlement" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select> -->
                </li>
                <li>
                    <span class="red-xh">*</span><span class="t-name">最快通过时间</span><input class="t-ipt" v-model="formItem.passtime" type="text" placeholder="请输入最快通过时间" />
                </li>
                <li>
                    <span class="red-xh">*</span><span class="t-name">结算类型</span>
                    <RadioGroup v-model="formItem.animal">
                        <label><Radio label="0">人工结算</Radio>
                        <Radio label="1">主动查询</Radio>
                        <Radio label="2">被动查询</Radio></label>
                    </RadioGroup>
                </li>
                <li>
                    <span class="red-xh">*</span><span class="t-name">查询网址</span><input class="t-ipt" v-model="formItem.queryurl" type="text" placeholder="请输入查询网址" />
                </li>
                <li>
                    <span class="red-xh">*</span><span class="t-name">最高返佣</span><input class="t-ipt" v-model="formItem.highrebate" type="text" placeholder="请输入最高返佣" />
                    <Select v-model="modelfy" style="width:60px; margin-left:8px;" :transfer='sel' placeholder="%"  :label-in-value='sel' @on-change="cheshi2">
                        <Option v-for="item in fyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </li>
                <li>
                   <span class="red-xh">*</span><span class="t-name">福利介绍</span><Input class="text-area" v-model="formItem.textarea" type="textarea" placeholder="请输入福利介绍..." :maxlength='10' /><div class="demo-nav">长度10个字符以内</div>
                </li>
                <li>
                   <span class="t-name">排序</span><input class="t-ipt" v-model="formItem.bankrank" type="text" placeholder="请输入排序" /><div class="demo-nav">必填</div>
                </li>
                <li>
                    <span class="t-name"></span><button class="t-btn" @click="addBank">添加产品</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import qs from 'qs';
import ImgUpload from './../editbank/components/Upload';
export default {
    name: 'Addbank',
     components:{
         ImgUpload
     },
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
                bankname:'',
                banktitle:'',
                banktag: [],//银行标签
                imgurl1:'',
                imgurl2:'',
                imgurl3:'',
                bankintroduce:'',
                model2: '',
                passtime:'',
                animal: '',
                queryurl:'',
                highrebate:'',
                textarea: '',
                bankrank:'0'
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
        addBank () {
            if(this.formItem.bankname == ''){
                this.$Message.warning('银行名称不能为空！');
                return;
            }
            if(this.formItem.banktitle == ''){
                this.$Message.warning('银行标题不能为空！');
                return;
            }
            if(this.formItem.bankintroduce == ''){
                this.$Message.warning('银行介绍不能为空！');
                return;
            }
            if(this.formItem.model2 == ''){
                this.$Message.warning('结算周期不能为空！');
                return;
            }
            if(this.formItem.passtime == ''){
                this.$Message.warning('最快通过时间不能为空！');
                return;
            }
            if(this.formItem.animal == ''){
                this.$Message.warning('结算类型不能为空！');
                return;
            }
            if(this.formItem.queryurl == ''){
                this.$Message.warning('查询网址不能为空！');
                return;
            }
            if(this.formItem.highrebate == ''){
                this.$Message.warning('最高返佣不能为空！');
                return;
            }
            if(this.formItem.textarea == ''){
                this.$Message.warning('福利介绍不能为空！');
                return;
            }
            var params = {
                    action: 'add'
                };
            var data= qs.stringify({
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
                })
            this.api.apiPost('/bank/bank', 'post', data, params, (status, code, res) => {
                if (status) {
                    this.$Message.success('添加成功！');
                    this.$router.push({
                        path: '/Bank',
                    })
                } else {
                    this.$Message.error('添加失败！');
                }
            });
        },
        //接收子组件的imgurl
        getMsgFormSon(data){
            this.formItem.imgurl1 = data
            //console.log("父组件1："+this.formItem.imgurl1)
        },
        getMsgFormSon2(data){
            this.formItem.imgurl2 = data
            //console.log("父组件2："+this.formItem.imgurl2)
        },
        getMsgFormSon3(data){
            this.formItem.imgurl3 = data
            //console.log("父组件3："+this.formItem.imgurl3)
        },
        getBanktag () {
            this.api.apiPost('/bank/tags', 'get', '', '', (status, code, res) => {
                if (status) {
                    this.banktags = res.data;
                } else {
                    this.$Message.error(res.msg);
                }
            });
        }
    },
    mounted () {
        this.getBanktag();
    }
}
</script>

<style scoped>
.add-ul >>> .ivu-select-dropdown-list li{ margin-bottom: 0;}
.add-ul >>> .ivu-select-selection{ border-color: rgba(180,180,180,1); border-radius: 0;}
.add-ul >>> .ivu-input-wrapper{ width: auto;}
.add-ul >>> textarea.ivu-input{ width: 280px; height: 110px; display: inline-block;}
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
.red-xh{ color: #ff0000; float: left; line-height:40px; margin-right: 5px; font-size: 16px; }
.text-area{ width: 280px; height: 100px; line-height: 24px !important;}
.demo-nav{ color: #888; font-size: 12px; display: inline-block; margin-left: 10px;}
</style>