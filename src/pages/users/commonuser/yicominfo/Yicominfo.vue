<template>
    <div class="content">
        <div class="addbtn"><router-link to="/users/Commonuser"><button>返回</button></router-link></div>
        <div class="addpage-box">
            <div class="add-title">用户详情</div>
            <div class="infonav01">
                <div class="info-left">
                    <div class="a01">
                        <!-- <div class="a-toux"><img src="/static/images/avatar_icon.png" alt="" /></div> -->
                        <div class="a-toux"><img :src="uinfo.avatar" alt="" /></div>
                        <div class="a-nic">{{uinfo.nickname}}</div>
                        <div class="a-dj"><span>{{uinfo.user_type}}</span></div>
                    </div>
                    <div class="a02">
                        <ul>
                            <li>
                                <p>{{uinfo.cardNums}}次</p>
                                <span class="b-01">总申卡次数</span>
                            </li>
                            <li>
                                <p>{{uinfo.lastMonthCardNums}}次</p>
                                <span class="b-02">上月申卡次数</span>
                            </li>
                            <li>
                                <p>{{uinfo.loanNums}}次</p>
                                <span class="b-01">总贷款次数</span>
                            </li>
                            <li>
                                <p>{{uinfo.lastMonthLoanNums}}次</p>
                                <span class="b-02">上月贷款次数</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="info-right">
                    <ul>
                        <li>
                            <span class="a03 a03-1">真实姓名</span><span class="a04">{{uinfo.name}}</span>
                        </li>
                        <li>
                            <span class="a03 a03-2">手机号</span><span class="a04">{{uinfo.mobile}}</span>
                        </li>
                        <li>
                            <span class="a03 a03-3">微信号</span><span class="a04">{{uinfo.wx}}</span>
                        </li>
                        <li>
                            <span class="a03 a03-4">身份证号</span><span class="a04">{{uinfo.sfz}}</span>
                        </li>
                        <li>
                            <span class="a03 a03-5">注册时间</span><span class="a04">{{uinfo.reg_time}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="jl-t">申请记录</div>
            <div class="tableBox"><Table :columns="columns1" :data="data1"></Table></div>
            <div class="pagebox"><Page :total="infoTotal01" :current="pageNum" :page-size="pageSize" show-elevator @on-change="handlePage" /></div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import qs from 'qs';
export default {
    name: 'Yicominfo',
    data (){
        return{
            id:'',
            uinfo:'',
            pagesinfo:'',
            infoTotal01:0,
            pageNum: 1,//当前页数
            pageSize: 10,//每页的条数
            formItem: {
                infoData:''
            },
            columns1: [
                    {
                        title: 'id',
                        key: 'id',
                        align: 'center',
                    },
                    {
                        title: '申卡贷手机号码',
                        key: 'order_to_mobile',
                        align: 'center',
                    },
                    {
                        title: '产品类别',
                        key: 'type',
                        align: 'center',
                    },
                    {
                        title: '产品名称',
                        key: 'a_name',
                        align: 'center',
                    },
                    // {
                    //     title: '标签内容',
                    //     key: 'user_mobile',
                    //     align: 'center',
                    // },
                    {
                        title: '状态',
                        key: 'order_state',
                        align: 'center',
                    },
                    {
                        title: '申请日期',
                        key: 'order_create_time',
                        align: 'center',
                    }
                ],
                data1: [],
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
                this.infoData = obj;
                this.id=this.infoData.id;
                this.uinfo = this.infoData.userInfo;
                if(this.uinfo.user_type==0){
                    this.uinfo.user_type = '普通用户'
                }else if(this.uinfo.user_type==1){
                    this.uinfo.user_type = '合伙人'
                }
            } else {
                this.$Message.error(''+res.msg);
            }
        });
    },
    methods: {
        orderFun () {
            var params = {
                    action: 'order',
                    page: this.pageNum,
                };
            var data= qs.stringify({
                    userId: this.sid
                });
            this.api.apiPost('/user/userop', 'post', data, params, (status, code, res) => {
                if (status) {
                    this.data1 = res.data.orders;
                    var date01='';
                    for(var i=0; i<this.data1.length; i++){
                        var date02=this.data1[i].order_create_time;
                        date01 = new Date(parseInt(date02) * 1000).toLocaleString().replace(/\/|\//g, "-").replace(/\//g, " ").replace(/下午|上午/g, " "); //时间戳转日期
                        this.data1[i].order_create_time = date01;
                    };
                    this.pagesinfo = res.data.pages;
                    this.pageSize = Number(this.pagesinfo.defaultPageSize);
                    this.infoTotal01 = Number(this.pagesinfo.totalCount);
                } else {
                    this.$Message.error('获取数据失败！');
                }
            });
        },
        handlePage(value) {
            this.pageNum = value
            this.orderFun();
        },
    },
    mounted () {
        this.orderFun();
    }
}
</script>

<style scoped>
ul li{ list-style: none;}
.content{ position:absolute; top: 54px; left: 240px; width: calc(100% - 240px);height: calc(100vh - 242px); overflow-y:scroll; background: #EBF1F4; padding-left: 20px; box-sizing: border-box; height: calc(100vh - 54px); }
.addbtn button{ height: 36px; line-height: 36px; color: #ffffff; background: #037AFF; padding: 0 15px; border: none; font-size: 16px; margin: 20px 0;}
.addpage-box{ float: left; width: calc(100% - 20px); background: #ffffff}
.add-title{ width: 100%; border-bottom: 1px solid #E7E9EA; box-sizing: border-box; padding: 12px 20px; font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(0,0,0,1);}
.add-ul{ padding: 30px 50px; float: left;}
.add-ul li{ margin-bottom: 40px; width: 100%; float: left;}
.infonav01{ width: 100%; float: left; border-bottom: 8px solid #EBF1F4; display: flex;}
.info-left{ float: left; width: 326px; margin: 34px;}
.a01,.a02{ width: 326px; text-align: center; float: left;}
.a-toux{ width: 326px; height: 65px; text-align: center;}
.a-toux img{ width: 65px; height: 65px; border-radius: 65px; display: inline-block;}
.a-nic{ width: 326px; display: inline-block;font-size:14px;font-family:PingFang SC;font-weight:500;color:rgba(0,0,0,1); margin: 3px 0;}
.a-dj{width: 326px; display: inline-block;}
.a-dj span{ width: 80px; height: 24px; line-height: 24px; color: #ffffff; font-size: 14px; background: #037AFF; border-radius: 32px; display: inline-block;}
.a02{ background: #F3F7FA; margin-top: 10px; padding-bottom:20px; }
.a02 li{ width: 50%; float: left; margin-top: 12px;}
.a02 li p{ font-size: 14px; color: #000; font-weight: 500;}
.a02 li .b-01{ width: 98px;height: 24px; line-height: 24px; color: #ffffff; font-size: 14px; background: #037AFF; border-radius: 32px; display: inline-block; }
.a02 li .b-02{ width: 98px;height: 24px; line-height: 24px; color: #ffffff; font-size: 14px; background: #FFAF03; border-radius: 32px; display: inline-block; }
.info-right{ flex: 1;  margin-left: 30px; float: left;font-size:14px;font-family:PingFang SC;font-weight:500;color:rgba(0,0,0,1); line-height: 20px;}
.info-right ul li{ margin-top: 38px; width: 100%; float: left;}
.info-right .a03{ float: left; padding-left: 30px; width: 110px;}
.a03-1{ background: url(/static/images/u1.png) no-repeat left center; background-size: 20px 20px;}
.a03-2{ background: url(/static/images/u2.png) no-repeat left center; background-size: 20px 20px;}
.a03-3{ background: url(/static/images/u3.png) no-repeat left center; background-size: 20px 20px;}
.a03-4{ background: url(/static/images/u4.png) no-repeat left center; background-size: 20px 20px;}
.a03-5{ background: url(/static/images/u5.png) no-repeat left center; background-size: 20px 20px;}
.a04{ float: left;}
.tableBox{ width: 100%; font-size: 14px;}
.pagebox{ background: #ffffff; text-align: center; padding: 30px 0 50px; width: calc(100% - 20px);}
.jl-t{ width: 100%; float: left;font-size:14px;font-family:PingFang SC;font-weight:bold;color:rgba(0,0,0,1); box-sizing: border-box; padding: 10px 20px;}
</style>