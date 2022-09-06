<template>
    <div class="content">
        <div class="addbtn"><router-link to="/Creditcard"><button>返回</button></router-link></div>
        <div class="addpage-box">
            <div class="add-title">拉新产品添加</div>
            <ul class="add-ul">
                <li>
                    <span class="t-name">拉新产品名称</span><input class="t-ipt" v-model="formItem.cardname" type="text" placeholder="请输入拉新产品名称" />
                </li>
                <li>
                    <span class="t-name">拉新产品标签</span>
                    <CheckboxGroup v-model="formItem.cardtag">
                        <Checkbox v-for="item in alltag" :label="item.id" :key="item.id">{{item.tab_name}}</Checkbox>
                    </CheckboxGroup>
                </li>
                <li>
                    <span class="t-name">拉新产品图标</span>
                    <img-upload @func="getMsgFormSon"></img-upload>
                </li>
                <li>
                    <span class="t-name">推广海报</span>
                    <img-upload  @func="getMsgFormSon2"></img-upload>
                </li>
                <li>
                    <span class="t-name">拉新产品介绍主标题</span><input class="t-ipt" v-model="formItem.cardintroduce" type="text" placeholder="请输入拉新产品介绍主标题" />
                </li>
                <li>
                    <span class="t-name">拉新产品介绍副标题</span><input class="t-ipt" v-model="formItem.cardintroduce2" type="text" placeholder="请输入拉新产品介绍副标题" />
                </li>
                <li>
                    <span class="t-name">福利介绍</span><input class="t-ipt" v-model="formItem.cardintroduce3" type="text" placeholder="请输入福利介绍" />
                </li>
                <li>
                    <span class="t-name">通过时间</span><input class="t-ipt" v-model="formItem.cardintroduce4" type="text" placeholder="请输入通过时间" />
                </li>
                <li>
                    <span class="t-name">申请跳转链接</span><input class="t-ipt" v-model="formItem.applyurl" type="text" placeholder="请输入申请跳转链接" />
                </li>
                <!-- <li>
                    <span class="t-name">结算周期</span>
                    <input class="t-ipt" v-model="formItem.model2" type="text" placeholder="请输入结算周期" /><div class="demo-nav">（结算周期 1日结2周结）</div>
                </li> -->
                <li>
                    <span class="t-name">结算周期</span><input class="t-ipt" v-model="formItem.passtime" type="text" placeholder="请输入结算周期" />
                </li>
                <li>
                    <span class="t-name">订单保护期</span><input class="t-ipt" v-model="formItem.baohutime" type="text" placeholder="请输入订单保护期" />
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
                    <span class="t-name">查询网址</span><input class="t-ipt" v-model="formItem.queryurl" type="text" placeholder="请输入查询网址" />
                </li>
                <li>
                    <span class="t-name">产品佣金</span><input class="t-ipt" v-model="formItem.yongjin" type="number" placeholder="请输入产品佣金" />
                    <Select v-model="modelyj" style="width:60px; margin-left:8px;" :transfer='sel' placeholder="%" :label-in-value='sel' @on-change="cheshi">
                        <Option v-for="item in yjList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </li>
                <li>
                    <span class="t-name">最高返佣</span><input class="t-ipt" v-model="formItem.highrebate" type="number" placeholder="请输入最高返佣" />
                    <Select v-model="modelfy" style="width:60px; margin-left:8px;" :transfer='sel' placeholder="元"  :label-in-value='sel' @on-change="cheshi2">
                        <Option v-for="item in fyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </li>
                <li>
                    <span class="t-name">申请要求</span>
                    <quill-editor ref="myTextEditor" v-model="formItem.sqyq"></quill-editor>
                </li>
                <li>
                    <span class="t-name">产品详情</span>
                    <quill-editor ref="myTextEditor" v-model="formItem.cpxq"></quill-editor>
                </li>
                <li>
                    <span class="t-name">返佣说明</span>
                    <quill-editor ref="myTextEditor" v-model="formItem.fysm"></quill-editor>
                </li>
                <li>
                    <span class="t-name">广告文案</span>
                    <!-- <quill-editor ref="myTextEditor" v-model="formItem.card_adcopy"></quill-editor> -->
                    <el-input type="textarea" style="width:610px;" :rows="5" placeholder="请输入广告文案" v-model="formItem.card_adcopy"></el-input>
                </li>
                <li>
                    <span class="t-name">排序</span><input class="t-ipt" v-model="formItem.cardrank" type="number" placeholder="请输入排序" /><div class="demo-nav">必填</div>
                </li>
                <li>
                    <span class="t-name"></span><button class="t-btn" @click="addCreditCard">添加产品</button>
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
    name: 'Addcreditcard',
     components:{
         ImgUpload
     },
    data (){
        return{
            sel:true,
            modelyj:'',
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
            modelfy:'',
            fyList: [
                // {
                //     value: '1',
                //     label: '%'
                // },
                {
                    value: '2',
                    label: '元'
                }
            ],
            cpyjin:'%',
            yhufy:'元',
            formItem: {
                baohutime:'',
                cardname:'',
                cardtag: [],
                imgurl1:'',
                imgurl2:'',
                cardintroduce:'',
                cardintroduce2:'',
                cardintroduce3:'',
                cardintroduce4:'',
                model2: '',
                passtime:'',
                animal: '1',
                queryurl:'',
                highrebate:'',
                yongjin:'',
                cardrank:'',
                applyurl:'',
                fysm:'',
                sqyq:'',
                cpxq:'',
                card_adcopy:''
            },
            data1:'',
            alltag:[]
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
        addCreditCard () {
            this.cpyjin = this.cpyjin.replace(/元/g, "#");
            this.yhufy = this.yhufy.replace(/元/g, "#");
            // var s = String(this.formItem.cardtag);
            // var reg = RegExp(/,/);
            // if(s.match(reg)){
            //     // 包含  
            //     this.formItem.cardtag=s.replace(/,/g, "，");      
            // }else{
            //     this.formItem.cardtag = s;
            // }
            var params = {
                    action: 'add',
                };
            var data= qs.stringify({
                     value: {
                        card_class: this.formItem.cardtag,
                        card_name: this.formItem.cardname,
                        card_introduce: this.formItem.cardintroduce,
                        card_introduce2: this.formItem.cardintroduce2,
                        card_introduce3: this.formItem.cardintroduce3,
                        card_introduce4: this.formItem.cardintroduce4,
                        card_img: this.formItem.imgurl1,
                        card_qr_bg: this.formItem.imgurl2,
                        card_sort: this.formItem.cardrank,
                        card_url: this.formItem.applyurl,
                        //card_pass_time: this.formItem.passtime,
                        card_order_losetime:Number(this.formItem.baohutime),
                        card_pass_url: this.formItem.queryurl,
                        card_pass_end: this.formItem.passtime,
                        card_pass_type: this.formItem.animal,
                        card_yongjin: this.formItem.yongjin+this.cpyjin,
                        card_pass_fanyong:this.formItem.highrebate+this.yhufy,
                        fysm: this.formItem.fysm,
                        sqyq: this.formItem.sqyq,
                        //sxcl: this.formItem.sxcl,
                        cpxq: this.formItem.cpxq,
                        card_adcopy:this.formItem.card_adcopy
                        }
                });
            this.api.apiPost('/bank/card', 'post', data, params, (status, code, res) => {
                if (status) {
                    this.$Message.success('添加成功！');
                    this.$router.push({
                        path: '/Creditcard',
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
        getBank () {
            this.api.apiPost('/bank/tags', 'get', '', '', (status, code, res) => {
                if (status) {
                    this.alltag = res.data;
                    //console.log("哈哈哈："+JSON.stringify(this.alltag));
                } else {
                    this.$Message.error('获取数据失败！');
                }
            });
        }
    },
    mounted () {
        this.getBank();
    }
}
</script>

<style scoped>
.add-ul >>> .ivu-select-dropdown-list li{ margin-bottom: 0;}
.add-ul >>> .ivu-select-selection{ border-color: rgba(180,180,180,1); border-radius: 0;}
.add-ul >>> .ivu-input-wrapper{ width: auto;}
.add-ul >>> textarea.ivu-input{ width: 280px; height: 110px; display: inline-block;}
.add-ul >>> .ivu-upload-drag{ border: none; border-radius: 0;}
.add-ul >>> .quill-editor{ float: left; max-width: 610px;}
.add-ul >>> .ivu-checkbox-group{ display:inline-block; line-height: 40px;}
ul li{ list-style: none;}
.content{ position:absolute; top: 54px; left: 240px; width: calc(100% - 240px);height: calc(100vh - 242px); overflow-y:scroll; background: #EBF1F4; padding-left: 20px; box-sizing: border-box; height: calc(100vh - 54px); }
.addbtn button{ height: 36px; line-height: 36px; color: #ffffff; background: #037AFF; padding: 0 15px; border: none; font-size: 16px; margin: 20px 0;}
.addpage-box{ float: left; width: calc(100% - 20px); background: #ffffff}
.add-title{ width: 100%; border-bottom: 1px solid #E7E9EA; box-sizing: border-box; padding: 12px 20px; font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(0,0,0,1);}
.add-ul{ padding: 30px 50px;}
.add-ul li{ margin-bottom: 40px; width: 100%; float: left;}
.t-name{ width: 140px; font-size:14px;font-family:PingFang-SC-Medium;font-weight:500;color:rgba(0,0,0,1); float: left; height: 40px; display: block; line-height: 40px;}
.t-ipt{ width: 280px; height: 40px;background:rgba(255,255,255,1);border:1px solid rgba(180,180,180,1); padding: 5px 10px;font-size:14px;}
.t-btn{width:280px;height:40px;background:rgba(3,122,255,1);border-radius:2px; border: none; color: #ffffff; font-size: 14px; font-weight: 500;}
.demo-nav{ color: #888; font-size: 12px; display: inline-block; margin-left: 10px; line-height: 40px;}
.text-area{ width: 280px; height: 100px; line-height: 24px !important;}

</style>