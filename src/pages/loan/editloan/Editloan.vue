<template>
    <div class="content">
        <div class="addbtn"><router-link to="/Loan"><button>返回</button></router-link></div>
        <div class="addpage-box">
            <div class="add-title">编辑贷款产品</div>
            <ul class="add-ul">
                <li>
                    <span class="t-name">产品名称</span><input class="t-ipt" v-model="formItem.loanname" type="text" placeholder="请输入产品名称" />
                </li>
                <li>
                    <span class="t-name">产品描述</span><input class="t-ipt" v-model="formItem.laondescription" type="text" placeholder="请输入产品描述" />
                </li>
                <li>
                    <span class="t-name">产品logo</span>
                    <Upload
                        ref="upload"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload1"
                        type="drag"
                        action="http://aaadmin3.rong298.cn"
                        style="display: inline-block;width:120px;">
                        <div style="width: 120px;height:120px;">
                            <img class="addimg" :src="formItem.imgurl1" />
                        </div>
                    </Upload>
                </li>
                <li>
                    <span class="t-name">产品海报</span>
                    <Upload
                        ref="upload"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload2"
                        type="drag"
                        action="http://aaadmin3.rong298.cn"
                        style="display: inline-block;width:120px;">
                        <div style="width: 120px;height:120px;">
                            <img class="addimg" :src="formItem.imgurl2" />
                        </div>
                    </Upload>
                </li>
                <li>
                    <span class="t-name">申请链接</span><input class="t-ipt" v-model="formItem.applyurl" type="text" placeholder="请输入申请链接" />
                </li>
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
                        <Radio label="0">人工结算</Radio>
                        <Radio label="1">主动查询</Radio>
                        <Radio label="2">被动查询</Radio>
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
                    <Select v-model="model1" style="width:60px; margin-left:8px; margin-top:4px;" :transfer='sel' :placeholder="cpyjin" :label-in-value='sel' @on-change="cheshi">
                        <Option v-for="item in yjList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </li>
                <li>
                    <span class="t-name">用户返佣</span><input class="t-ipt" v-model="formItem.loanfanyong" type="number" placeholder="请输入用户返佣" />
                    <Select v-model="model2" style="width:60px; margin-left:8px; margin-top:4px;" :transfer='sel' :placeholder="yhufy"  :label-in-value='sel' @on-change="cheshi2">
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
                    <span class="t-name">排序</span><input class="t-ipt" v-model="formItem.loanrank" type="number" placeholder="请输入排序" />
                </li>
                <li>
                    <span class="t-name"></span><button class="t-btn" @click="addLoan">保存产品</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import qs from 'qs';
export default {
    name: 'Editloan',
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
            loandata:'',
            formItem: {
                id:'',
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
                animal: 0,
                loanrank:'',
                loanpasstime:'',
                applyurl:'',
                losetime:'',
                kk:'',
                sid:''
            }
        }
    },
    created () {
        this.sid = this.$route.query.sid;
        var params = {
                action: 'getOneLoan',
            };
        var data= qs.stringify({
                loan_id: this.sid
            });
        this.api.apiPost('/loan/loan', 'post', data, params, (status, code, res) => {
            if (status) {
                //console.log("银行上架产品："+JSON.stringify(_this.data1));
                this.loandata = res.data.loanList;
                var str1 = this.loandata[0].loan_yongjin;
                var str2 = this.loandata[0].loan_pass_fanyong;
                var str3 =this.loandata[0].loan_cost;
                var reg = RegExp(/%/);//校验是否包含%
                var reg2 = RegExp(/#/);//校验是否包含#
                if(str1.match(reg)){
                    // 包含   
                    this.formItem.loanyongjin = str1.substr(0, str1.length - 1); //去除最后一位字符 
                    this.cpyjin = '%';   
                }else if(str1.match(reg2)){
                    this.formItem.loanyongjin = str1.substr(0, str1.length - 1); //去除最后一位字符 
                    this.cpyjin = '元'; 
                }else{
                    this.formItem.loanyongjin = str1;
                };

                if(str2.match(reg)){
                    // 包含   
                    this.formItem.loanfanyong = str2.substr(0, str2.length - 1); //去除最后一位字符 
                    this.yhufy = '%';   
                }else if(str2.match(reg2)){
                    this.formItem.loanfanyong = str2.substr(0, str2.length - 1); //去除最后一位字符 
                    this.yhufy = '元';  
                }else{
                    this.formItem.loanfanyong = str2;
                };
                
                if(str3.match(reg)){
                    // 包含   
                    this.formItem.loanfeilv = str3.substr(0, str3.length - 1); //去除最后一位字符  
                }else{
                    this.formItem.loanfeilv = str3;
                };
                //console.log("标签数据："+this.loandata[0].loan_class);
                this.formItem.id=this.loandata[0].id;
                this.formItem.loanname=this.loandata[0].loan_name;
                this.formItem.laondescription=this.loandata[0].loan_introduce;
                this.formItem.imgurl1=this.loandata[0].loan_icon;
                this.formItem.imgurl2=this.loandata[0].loan_qr_bg;
                this.formItem.loanrank=this.loandata[0].loan_sort;
                this.formItem.applyurl=this.loandata[0].loan_url;
                this.formItem.loanminmoney=this.loandata[0].loan_money_start;
                this.formItem.loanmaxmoney=this.loandata[0].loan_money_end;
                this.formItem.loantag=this.loandata[0].loan_class;
                this.formItem.loanpass=this.loandata[0].loan_pass_rate;
                this.formItem.loanminqixian=this.loandata[0].loan_periods_start;
                this.formItem.loanmaxqixian=this.loandata[0].loan_periods_end;
                this.formItem.loanpasstime=this.loandata[0].loan_pass_time;
                this.formItem.loanaccount=this.loandata[0].loan_pass_end;
                this.formItem.animal=String(this.loandata[0].loan_pass_type);
                this.formItem.loanapi=this.loandata[0].loan_pass_url;
                this.formItem.fanyongshuom=this.loandata[0].fysm;
                this.formItem.applyrequire=this.loandata[0].sqyq;
                this.formItem.loan_adcopy=this.loandata[0].loan_adcopy;
                this.formItem.productxq=this.loandata[0].cpxq;
                this.formItem.losetime=this.loandata[0].loan_order_losetime;
            } else {
                this.$Message.error('编辑失败！');
            }
    });
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
            this.cpyjin = this.cpyjin.replace(/元/g, "#");
            this.yhufy = this.yhufy.replace(/元/g, "#");
            var params = {
                    action: 'edit',
                };
            var data= qs.stringify({
                    loan_id: this.formItem.id,
                    value: {
                        loan_name: this.formItem.loanname,
                        loan_introduce: this.formItem.laondescription,
                        loan_icon: this.formItem.imgurl1,
                        loan_qr_bg: this.formItem.imgurl2,
                        loan_sort: this.formItem.loanrank,
                        loan_url: this.formItem.applyurl,
                        loan_money_start: this.formItem.loanminmoney,
                        loan_money_end: this.formItem.loanmaxmoney,
                        loan_yongjin: this.formItem.loanyongjin+this.cpyjin,
                        loan_pass_fanyong: this.formItem.loanfanyong+this.yhufy,
                        loan_class: this.formItem.loantag,
                        loan_pass_rate: this.formItem.loanpass,
                        loan_periods_start: this.formItem.loanminqixian,
                        loan_periods_end:this.formItem.loanmaxqixian,
                        loan_pass_time:this.formItem.loanpasstime,
                        loan_pass_end: this.formItem.loanaccount,
                        loan_pass_type: this.formItem.animal,
                        loan_pass_url: this.formItem.loanapi,
                        loan_cost: this.formItem.loanfeilv+'%',
                        fysm: this.formItem.fanyongshuom,
                        sqyq: this.formItem.applyrequire,
                        loan_adcopy: this.formItem.loan_adcopy,
                        cpxq: this.formItem.productxq,
                        loan_order_losetime: parseInt(this.formItem.losetime),
                        }
                });
            this.api.apiPost('/loan/loan', 'post', data, params, (status, code, res) => {
                if (status) {
                    this.$Message.success('编辑成功！');
                    this.$router.push({
                        path: '/Loan',
                    })
                } else {
                    this.$Message.error('编辑失败！');
                }
            });
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
        getLoantag () {
            this.api.apiPost('/loan/tags', 'get', '', '', (status, code, res) => {
                if (status) {
                    this.loantags = res.data;
                } else {
                    this.$Message.error('编辑失败！');
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