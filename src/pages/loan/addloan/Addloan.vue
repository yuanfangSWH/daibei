<template>
    <div class="content">
        <div class="addbtn"><router-link to="/Loan"><button>返回</button></router-link></div>
        <div class="addpage-box">
            <div class="add-title">添加贷款产品</div>
            <ul class="add-ul">
                <li>
                    <span class="t-name">产品名称</span><input class="t-ipt" v-model="formItem.loanname" type="text" placeholder="请输入产品名称" />
                </li>
                <li>
                    <span class="t-name">产品描述</span><input class="t-ipt" v-model="formItem.laondescription" type="text" placeholder="请输入产品描述" />
                </li>
                <li>
                    <span class="t-name">产品logo</span>
                    <img-upload @func="getMsgFormSon"></img-upload>
                </li>
                <li>
                    <span class="t-name">产品海报</span>
                    <img-upload  @func="getMsgFormSon2"></img-upload>
                </li>
                <li>
                    <span class="t-name">申请链接</span><input class="t-ipt" v-model="formItem.applyurl" type="text" placeholder="请输入申请链接" />
                </li>
                <!-- <li>
                    <span class="t-name">卡片标签</span><input class="t-ipt" v-model="formItem.loantag" type="text" placeholder="请输入卡片标签" /><div class="demo-nav">例：大额取现，免年费（标签之间用逗号隔开）</div>
                </li> -->
                <li>
                    <span class="t-name">卡片标签</span>
                    <CheckboxGroup v-model="formItem.loantag">
                        <Checkbox v-for="item in loantags" :label="item.id" :key="item.id">{{item.tab_name}}</Checkbox>
                    </CheckboxGroup>
                </li>
                <li>
                    <span class="t-name">结算时间</span><input class="t-ipt" v-model="formItem.loanaccount" type="text" placeholder="请输入结算时间" />
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
                    <span class="t-name">API输入</span><input class="t-ipt" v-model="formItem.loanapi" type="text" placeholder="请输入API" />
                </li>
                <li>
                    <span class="t-name">订单保护期</span><input class="t-ipt" v-model="formItem.losetime" type="number" placeholder="请输入订单保护期" /><div class="t-tip">天</div>
                </li>
                <li>
                    <span class="t-name">产品佣金</span><input class="t-ipt" v-model="formItem.loanyongjin" type="number" placeholder="请输入产品佣金" />
                    <Select v-model="model1" style="width:60px; margin-left:8px; margin-top:4px;" :transfer='sel' placeholder="%" :label-in-value='sel' @on-change="cheshi">
                        <Option v-for="item in yjList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </li>
                <li>
                    <span class="t-name">用户返佣</span><input class="t-ipt" v-model="formItem.loanfanyong" type="number" placeholder="请输入用户返佣" />
                    <Select v-model="model2" style="width:60px; margin-left:8px; margin-top:4px;" :transfer='sel' placeholder="%"  :label-in-value='sel' @on-change="cheshi2">
                        <Option v-for="item in fyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </li>
                <li>
                    <span class="t-name">放款额</span><input class="t-ipt" v-model="formItem.loanminmoney" type="number" placeholder="请输入最小金额" /><div class="t-tip2">~</div><input class="t-ipt" v-model="formItem.loanmaxmoney" type="number" placeholder="请输入最大金额" /><div class="t-tip">元</div>
                </li>
                <li>
                    <span class="t-name">期限范围</span><input class="t-ipt" v-model="formItem.loanminqixian" type="number" placeholder="请输入最小期限" /><div class="t-tip2">~</div><input class="t-ipt" v-model="formItem.loanmaxqixian" type="number" placeholder="请输入最大期限" /><div class="t-tip">月</div>
                </li>
                <li>
                    <span class="t-name">月费率</span><input class="t-ipt" v-model="formItem.loanfeilv" type="number" placeholder="请输入月费率" /><div class="t-tip">%</div>
                </li>
                <li>
                    <span class="t-name">通过率</span><Rate v-model="formItem.loanpass" />
                </li>
                <li>
                    <span class="t-name">最快放款时间</span><input class="t-ipt" v-model="formItem.loanpasstime" type="text" placeholder="请输入最快放款时间" />
                </li>
                <li>
                    <span class="t-name">申请要求</span>
                    <quill-editor ref="myTextEditor" v-model="formItem.applyrequire"></quill-editor>
                </li>
                <li>
                    <span class="t-name">产品详情</span>
                    <quill-editor ref="myTextEditor" v-model="formItem.productxq"></quill-editor>
                </li>
                <li>
                    <span class="t-name">返佣说明</span>
                    <quill-editor ref="myTextEditor" v-model="formItem.fanyongshuom"></quill-editor>
                </li>
                <li>
                    <span class="t-name">广告文案</span>
                    <!-- <quill-editor ref="myTextEditor" v-model="formItem.loan_adcopy"></quill-editor> -->
                    <el-input type="textarea" style="width:610px;" :rows="5" placeholder="请输入广告文案" v-model="formItem.loan_adcopy"></el-input>
                </li>
                <li>
                    <span class="t-name">排序</span><input class="t-ipt" v-model="formItem.loanrank" type="number" placeholder="请输入排序" /><div class="demo-nav">必填</div>
                </li>
                <li>
                    <span class="t-name"></span><button class="t-btn" @click="addLoan">添加产品</button>
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
    name: 'Addloan',
     components:{
         ImgUpload
     },
    data (){
        return{
            loantags:'',
            sel:true,
            model1:'',
            yjList: [
                {
                    value: '1',
                    label: '%'
                },
                {
                    value: '2',
                    label: '元'
                }
            ],
            model2:'',
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
            cpyjin:'%',
            yhufy:'%',
            formItem: {
                loanname:'',
                laondescription:'',
                imgurl1:'',
                imgurl2:'',
                loanaccount: '',
                loantag:[],
                loanapi:'',
                loanyongjin:'',
                loanfanyong:'',
                loanminmoney:'',
                loanmaxmoney:'',
                loanminqixian:'',
                loanmaxqixian:'',
                loanfeilv:'',
                loanpass:'',
                applyrequire:'',
                loan_adcopy:'',
                productxq:'',
                fanyongshuom:'',
                animal: '',
                loanrank:'',
                loanpasstime:'',
                applyurl:'',
                losetime:'',
            },
        }
    },
    methods: {
        cheshi (e) {
            var str = e.label;
            str=str.replace(/元/g, "#");
            this.cpyjin =str;
        },
        cheshi2 (e) {
            var str2 = e.label;
            str2=str2.replace(/元/g, "#");
            this.yhufy =str2;
        },
        addLoan () {
            var params = {
                    action: 'add',
                };
            var data= qs.stringify({
                    value: {
                        loan_name: this.formItem.loanname,
                        loan_introduce: this.formItem.laondescription,
                        loan_icon: this.formItem.imgurl1,
                        loan_qr_bg: this.formItem.imgurl2,
                        loan_sort: parseInt(this.formItem.loanrank),
                        loan_url: this.formItem.applyurl,
                        loan_money_start: parseInt(this.formItem.loanminmoney),
                        loan_money_end: parseInt(this.formItem.loanmaxmoney),
                        loan_yongjin: this.formItem.loanyongjin+this.cpyjin,
                        loan_pass_fanyong: this.formItem.loanfanyong+this.yhufy,
                        loan_class: this.formItem.loantag,
                        loan_pass_rate: parseInt(this.formItem.loanpass),
                        loan_periods_start: parseInt(this.formItem.loanminqixian),
                        loan_periods_end:parseInt(this.formItem.loanmaxqixian),
                        loan_pass_time:this.formItem.loanpasstime,
                        loan_pass_end: this.formItem.loanaccount,
                        loan_pass_type: parseInt(this.formItem.animal),
                        loan_pass_url: this.formItem.loanapi,
                        loan_cost: this.formItem.loanfeilv+'%',
                        fysm: this.formItem.fanyongshuom,
                        sqyq: this.formItem.applyrequire,
                        loan_adcopy: this.formItem.loan_adcopy,
                        cpxq: this.formItem.productxq,
                        loan_order_losetime: Number(this.formItem.losetime),
                        }
                });
            this.api.apiPost('/loan/loan', 'post', data, params, (status, code, res) => {
                if (status) {
                    this.$Message.success('添加成功！');
                    this.$router.push({
                        path: '/Loan',
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
        getLoantag () {
            this.api.apiPost('/loan/tags', 'get', '', '', (status, code, res) => {
                if (status) {
                    this.loantags = res.data;
                } else {
                    this.$Message.error('获取数据失败！');
                }
            });
        }
    },
    mounted () {
        this.getLoantag();
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
.demo-nav{ color: #888; font-size: 12px; display: inline-block; margin-left: 10px; line-height: 40px;}
.t-tip{ color: #333; float: left; margin-left: 10px; line-height: 40px;}
.t-tip2{ color: #333; float: left; margin: 0 8px; line-height: 40px;}
</style>