<template>
    <div class="content">
        <div class="addbtn"><router-link to="/loan/Addloan"><button>添加产品</button></router-link><Input v-model="soinfo" class="search" search enter-button="搜索" @on-search="sosuoFun" placeholder="输入要搜索的产品名称" /></div>
        <div class="tabbox">
            <Tabs :animated="false" @on-click="tabClick" :value="nameNo">
                <TabPane label="上架中" name="name1">
                    <div class="tableBox"><Table :columns="columns1" :data="data1"></Table></div>
                    <div class="pagebox"><Page :total="infoTotal01" :current="pageNum" :page-size="pageSize" show-elevator @on-change="handlePage" /></div>
                </TabPane>
                <TabPane label="下架" name="name2">
                    <div class="tableBox"><Table :columns="columns2" :data="data2"></Table></div>
                    <div class="pagebox"><Page :total="infoTotal01" :current="pageNum" :page-size="pageSize" show-elevator @on-change="handlePage2" /></div>
                </TabPane>
                <TabPane label="回收站" name="name3">
                    <div class="tableBox"><Table :columns="columns3" :data="data3"></Table></div>
                    <div class="pagebox"><Page :total="infoTotal01" :current="pageNum" :page-size="pageSize" show-elevator @on-change="handlePage3" /></div>
                </TabPane>
                <TabPane label="搜索列表" name="name4">
                    <div class="tableBox"><Table :columns="columns4" :data="data4"></Table></div>
                    <div class="pagebox"><Page :total="infoTotal01" :current="pageNumso" :page-size="pageSize" show-elevator @on-change="handlePage4" /></div>
                </TabPane>
            </Tabs>
        </div>
        <!-- <div class="pagebox"><Page :total="infoTotal01" :current="pageNum" :page-size="pageSize" show-elevator @on-change="handlePage" /></div> -->
    </div>
</template>

<script>
import axios from "axios";
import qs from 'qs';
export default {
    name: 'Loan',
    components:{
        
    },
    data (){
        return{
            soinfo:'',
            nameNo:'name1',
            pagesinfo:'',
            infoTotal01:0,
            pageTotal01: 0,//总页数
            pageNum: 1,//当前页数
            pageNumso: 1,//当前页数
            pageSize: 10,//每页的条数
            columns1: [
                    {
                        title: 'ID',
                        key: 'id',
                        align: 'center',
                    },
                    {
                        title: '产品logo',
                        key: 'loan_icon',
                        align: 'center',
                        render: (h, params) => {
                             //console.log("这里的图片路径："+params.row.bank_img);
                            return h('img', {
                                style: {//设置样式
                                    height: '65px',
                                    margin: '8px 0 ',
                                },
                                attrs: {//设置属性
                                    src: params.row.loan_icon
                                }
                            });
                        }
                    },
                    {
                        title: '产品名称',
                        key: 'loan_name',
                        align: 'center',
                    },
                    {
                        title: '产品海报',
                        key: 'loan_qr_bg',
                        align: 'center',
                        render: (h, params) => {
                             //console.log("这里的图片路径："+params.row.bank_img);
                            return h('img', {
                                style: {//设置样式
                                    height: '65px',
                                    margin: '8px 0 ',
                                },
                                attrs: {//设置属性
                                    src: params.row.loan_qr_bg
                                }
                            });
                        }
                    },
                    {
                        title: '额度范围',
                        key: 'loan_money_start',
                        align: 'center',
                        render: (h, params) => {
                             //console.log("这里的图片路径："+params.row.bank_img);
                            return h('div', params.row.loan_money_start +'-'+ params.row.loan_money_end);
                        }
                    },
                    {
                        title: '贷款期限',
                        key: 'loan_periods_end',
                        align: 'center',
                        render: (h, params) => {
                             //console.log("这里的图片路径："+params.row.bank_img);
                            return h('div', params.row.loan_periods_start +'-'+ params.row.loan_periods_end);
                        }
                    },
                    {
                        title: '月利率',
                        key: 'loan_cost',
                        align: 'center',
                    },
                    {
                        title: '产品佣金',
                        key: 'loan_yongjin',
                        align: 'center',
                    },
                    {
                        title: '用户返佣',
                        key: 'loan_pass_fanyong',
                        align: 'center',
                    },
                    {
                        title: '昨日订单',
                        key: 'yesterOrders',
                        align: 'center',
                    },
                    {
                        title: '今日订单',
                        key: 'todayOrders',
                        align: 'center',
                    },
                    {
                        title: '状态',
                        key: 'sjia',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div','上架');
                        }
                    },
                    {
                        title: '发布时间',
                        key: 'loan_create_time',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            var bankdata1 = params.row;
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            //this.show(params.index)
                                            this.$router.push({
                                                path: '/loan/Editloan',
                                                name: 'Editloan',
                                                 query: {
                                                    sid: bankdata1.id,
                                                }
                                            })
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.confirm(params.index, params.row.id);
                                        }
                                    }
                                }, '下架')
                            ]);
                        }
                    }
                ],
                data1: [],
                columns2: [
                    {
                        title: 'ID',
                        key: 'id',
                        align: 'center',
                    },
                    {
                        title: '产品logo',
                        key: 'loan_icon',
                        align: 'center',
                        render: (h, params) => {
                             //console.log("这里的图片路径："+params.row.bank_img);
                            return h('img', {
                                style: {//设置样式
                                    height: '65px',
                                    margin: '8px 0 ',
                                },
                                attrs: {//设置属性
                                    src: params.row.loan_icon
                                }
                            });
                        }
                    },
                    {
                        title: '产品名称',
                        key: 'loan_name',
                        align: 'center',
                    },
                    {
                        title: '产品海报',
                        key: 'loan_qr_bg',
                        align: 'center',
                        render: (h, params) => {
                             //console.log("这里的图片路径："+params.row.bank_img);
                            return h('img', {
                                style: {//设置样式
                                    height: '65px',
                                    margin: '8px 0 ',
                                },
                                attrs: {//设置属性
                                    src: params.row.loan_qr_bg
                                }
                            });
                        }
                    },
                    {
                        title: '额度范围',
                        key: 'loan_money_start',
                        align: 'center',
                        render: (h, params) => {
                             //console.log("这里的图片路径："+params.row.bank_img);
                            return h('div', params.row.loan_money_start +'-'+ params.row.loan_money_end);
                        }
                    },
                    {
                        title: '贷款期限',
                        key: 'loan_periods_end',
                        align: 'center',
                        render: (h, params) => {
                             //console.log("这里的图片路径："+params.row.bank_img);
                            return h('div', params.row.loan_periods_start +'-'+ params.row.loan_periods_end);
                        }
                    },
                    {
                        title: '月利率',
                        key: 'loan_cost',
                        align: 'center',
                    },
                    {
                        title: '产品佣金',
                        key: 'loan_yongjin',
                        align: 'center',
                    },
                    {
                        title: '用户返佣',
                        key: 'loan_pass_fanyong',
                        align: 'center',
                    },
                    {
                        title: '昨日订单',
                        key: 'yesterOrders',
                        align: 'center',
                    },
                    {
                        title: '今日订单',
                        key: 'todayOrders',
                        align: 'center',
                    },
                    {
                        title: '状态',
                        key: 'sjia',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div','下架');
                        }
                    },
                    {
                        title: '发布时间',
                        key: 'loan_create_time',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
                            var bankdata1 = params.row
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            //this.show(params.index)
                                            this.$router.push({
                                                path: '/loan/Editloan',
                                                name: 'Editloan',
                                                 query: {
                                                    sid: bankdata1.id,
                                                }
                                            })
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.putaway(params.index, params.row.id);
                                        }
                                    }
                                }, '上架'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.deldata(params.index, params.row.id);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data2: [],
                columns3: [
                    {
                        title: 'ID',
                        key: 'id',
                        align: 'center',
                    },
                    {
                        title: '产品logo',
                        key: 'loan_icon',
                        align: 'center',
                        render: (h, params) => {
                             //console.log("这里的图片路径："+params.row.bank_img);
                            return h('img', {
                                style: {//设置样式
                                    height: '65px',
                                    margin: '8px 0 ',
                                },
                                attrs: {//设置属性
                                    src: params.row.loan_icon
                                }
                            });
                        }
                    },
                    {
                        title: '产品名称',
                        key: 'loan_name',
                        align: 'center',
                    },
                    {
                        title: '产品海报',
                        key: 'loan_qr_bg',
                        align: 'center',
                        render: (h, params) => {
                             //console.log("这里的图片路径："+params.row.bank_img);
                            return h('img', {
                                style: {//设置样式
                                    height: '65px',
                                    margin: '8px 0 ',
                                },
                                attrs: {//设置属性
                                    src: params.row.loan_qr_bg
                                }
                            });
                        }
                    },
                    {
                        title: '额度范围',
                        key: 'loan_money_start',
                        align: 'center',
                        render: (h, params) => {
                             //console.log("这里的图片路径："+params.row.bank_img);
                            return h('div', params.row.loan_money_start +'-'+ params.row.loan_money_end);
                        }
                    },
                    {
                        title: '贷款期限',
                        key: 'loan_periods_end',
                        align: 'center',
                        render: (h, params) => {
                             //console.log("这里的图片路径："+params.row.bank_img);
                            return h('div', params.row.loan_periods_start +'-'+ params.row.loan_periods_end);
                        }
                    },
                    {
                        title: '月利率',
                        key: 'loan_cost',
                        align: 'center',
                    },
                    {
                        title: '产品佣金',
                        key: 'loan_yongjin',
                        align: 'center',
                    },
                    {
                        title: '用户返佣',
                        key: 'loan_pass_fanyong',
                        align: 'center',
                    },
                    {
                        title: '昨日订单',
                        key: 'yesterOrders',
                        align: 'center',
                    },
                    {
                        title: '今日订单',
                        key: 'todayOrders',
                        align: 'center',
                    },
                    {
                        title: '状态',
                        key: 'sjia',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div','回收站');
                        }
                    },
                    {
                        title: '发布时间',
                        key: 'loan_create_time',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.putawayRecycle(params.index, params.row.id);
                                        }
                                    }
                                }, '上架')
                            ]);
                        }
                    }
                ],
                data3: [],
                columns4: [
                    {
                        title: 'ID',
                        key: 'id',
                        align: 'center',
                    },
                    {
                        title: '产品logo',
                        key: 'loan_icon',
                        align: 'center',
                        render: (h, params) => {
                             //console.log("这里的图片路径："+params.row.bank_img);
                            return h('img', {
                                style: {//设置样式
                                    height: '65px',
                                    margin: '8px 0 ',
                                },
                                attrs: {//设置属性
                                    src: params.row.loan_icon
                                }
                            });
                        }
                    },
                    {
                        title: '产品名称',
                        key: 'loan_name',
                        align: 'center',
                    },
                    {
                        title: '产品海报',
                        key: 'loan_qr_bg',
                        align: 'center',
                        render: (h, params) => {
                             //console.log("这里的图片路径："+params.row.bank_img);
                            return h('img', {
                                style: {//设置样式
                                    height: '65px',
                                    margin: '8px 0 ',
                                },
                                attrs: {//设置属性
                                    src: params.row.loan_qr_bg
                                }
                            });
                        }
                    },
                    {
                        title: '额度范围',
                        key: 'loan_money_start',
                        align: 'center',
                        render: (h, params) => {
                             //console.log("这里的图片路径："+params.row.bank_img);
                            return h('div', params.row.loan_money_start +'-'+ params.row.loan_money_end);
                        }
                    },
                    {
                        title: '贷款期限',
                        key: 'loan_periods_end',
                        align: 'center',
                        render: (h, params) => {
                             //console.log("这里的图片路径："+params.row.bank_img);
                            return h('div', params.row.loan_periods_start +'-'+ params.row.loan_periods_end);
                        }
                    },
                    {
                        title: '月利率',
                        key: 'loan_cost',
                        align: 'center',
                    },
                    {
                        title: '产品佣金',
                        key: 'loan_yongjin',
                        align: 'center',
                    },
                    {
                        title: '用户返佣',
                        key: 'loan_pass_fanyong',
                        align: 'center',
                    },
                    {
                        title: '昨日订单',
                        key: 'yesterOrders',
                        align: 'center',
                    },
                    {
                        title: '今日订单',
                        key: 'todayOrders',
                        align: 'center',
                    },
                    {
                        title: '状态',
                        key: 'sjia',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            var sta=params.row.loan_state;
                            if(sta == 1){
                                return h('div','上架');
                            }else if(sta == 0){
                                return h('div','下架');
                            }else if(sta == 2){
                                return h('div','回收站');
                            }
                        }
                    },
                    {
                        title: '发布时间',
                        key: 'loan_create_time',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
                            var laonstate=params.row.loan_state;
                            var bankdata1 = params.row;
                            if(laonstate == '1'){
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    path: '/loan/Editloan',
                                                    name: 'Editloan',
                                                    query: {
                                                        sid: bankdata1.id,
                                                    }
                                                })
                                            }
                                        }
                                    }, '编辑'),
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.confirm(params.index, params.row.id);
                                            }
                                        }
                                    }, '下架')
                                ]);
                            }else if(laonstate == '0'){
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                //this.show(params.index)
                                                this.$router.push({
                                                    path: '/loan/Editloan',
                                                    name: 'Editloan',
                                                    query: {
                                                        sid: bankdata1.id,
                                                    }
                                                })
                                            }
                                        }
                                    }, '编辑'),
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.putaway(params.index, params.row.id);
                                            }
                                        }
                                    }, '上架'),
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.deldata(params.index, params.row.id);
                                            }
                                        }
                                    }, '删除')
                                ]);
                            }else if(laonstate == '2'){
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.putawayRecycle(params.index, params.row.id);
                                            }
                                        }
                                    }, '上架')
                                ]);
                            }
                        }
                    }
                ],
                data4: [],
                id: '',
                allbank:[],
                banksname:'',
                i: 0
        }
    },
    methods: {
        getLoanInfo () {
            var params = {
                    action: 'getAllLoan',
                    state: '1',
                    page: this.pageNum
                };
            this.api.apiPost('/loan/loan', 'get', '', params, (status, code, res) => {
                if (status) {
                    this.data1 = res.data.loanList;
                    //console.log("贷款上架产品："+JSON.stringify(this.data1));
                    this.pagesinfo = res.data.pages;
                    this.pageSize = this.pagesinfo.defaultPageSize;
                    this.infoTotal01 = parseInt(this.pagesinfo.totalCount);
                } else {
                    this.$Message.error(''+res.msg);
                }
            });
        },
        getSoldOut () {
            var params = {
                    action: 'getAllLoan',
                    state: '0',
                    page: this.pageNum,
                };
            this.api.apiPost('/loan/loan', 'get', '', params, (status, code, res) => {
                if (status) {
                    this.data2 = res.data.loanList;
                    //console.log("贷款上架产品："+JSON.stringify(this.data1));
                    this.pagesinfo = res.data.pages;
                    this.pageSize = this.pagesinfo.defaultPageSize;
                    this.infoTotal01 = parseInt(this.pagesinfo.totalCount);
                } else {
                    this.$Message.error(''+res.msg);
                }
            });
        },
        getRecycle () {
            var params = {
                    action: 'getAllLoan',
                    state: '2',
                };
            this.api.apiPost('/loan/loan', 'get', '', params, (status, code, res) => {
                if (status) {
                    this.data3 = res.data.loanList;
                    //console.log("贷款上架产品："+JSON.stringify(this.data1));
                    this.pagesinfo = res.data.pages;
                    this.pageSize = this.pagesinfo.defaultPageSize;
                    this.infoTotal01 = parseInt(this.pagesinfo.totalCount);
                } else {
                    this.$Message.error(''+res.msg);
                }
            });
        },
        sosuoFun (e) {
            var params = {
                    action: 'getAllLoan',
                    key: this.soinfo,
                    page: this.pageNumso,
                };
            this.api.apiPost('/loan/loan', 'get', '', params, (status, code, res) => {
                if (status) {
                    this.data4 = res.data.loanList;
                    //console.log("贷款上架产品："+JSON.stringify(this.data1));
                    this.nameNo = "name4";
                    this.pagesinfo = res.data.pages;
                    this.pageSize = this.pagesinfo.defaultPageSize;
                    this.infoTotal01 = parseInt(this.pagesinfo.totalCount);
                } else {
                    this.$Message.error(''+res.msg);
                }
            });
        },
        handlePage(value) {
            this.pageNum = value
            this.getLoanInfo()
        },
        handlePage2(value) {
            this.pageNum = value
            this.getSoldOut();
        },
        handlePage3(value) {
            this.pageNum = value
            this.getRecycle();
        },
        handlePage4(value) {
            this.pageNumso = value
            this.sosuoFun();
        },
        //是否下架对话框(上架中的)
        confirm (index, val) {
            this.$Modal.confirm({
                render: (h) => {
                    return h('span', {
                        class:'reConfirm',  
                    },'确定下架此产品？')
                },
                onOk: () => {
                    let tid = val;
                    var params = {
                            action: 'down',
                        };
                    var data = qs.stringify({
                            loan_id: tid
                        });
                    this.api.apiPost('/loan/loan', 'post', data, params, (status, code, res) => {
                        if (status) {
                            this.$Message.success('下架成功！');
                            this.data1.splice(index, 1);//同步删除页面当前这条数据
                        } else {
                            this.$Message.error('下架失败！');
                        }
                    });
                },
                onCancel: () => {
                }
            });
        },
        //是否上架对话框(下架中的)
        putaway (index, val) {
            this.$Modal.confirm({
                render: (h) => {
                    return h('span', {
                        class:'reConfirm',  
                    },'确定上架此产品？')
                },
                onOk: () => {
                    let tid = val;
                    var params = {
                            action: 'up',
                        };
                    var data = qs.stringify({
                            loan_id: tid
                        });
                    this.api.apiPost('/loan/loan', 'post', data, params, (status, code, res) => {
                        if (status) {
                            this.$Message.success('上架成功！');
                            this.data2.splice(index, 1);//同步删除页面当前这条数据
                        } else {
                            this.$Message.error('上架失败！');
                        }
                    });
                },
                onCancel: () => {
                }
            });
        },
        //是否删除对话框(下架中的)
        deldata (index, val) {
            this.$Modal.confirm({
                render: (h) => {
                    return h('span', {
                        class:'reConfirm',  
                    },'确定删除此产品？')
                },
                onOk: () => {
                    let tid = val
                    var params = {
                            action: 'del',
                        };
                    var data = qs.stringify({
                            loan_id: tid
                        });
                    this.api.apiPost('/loan/loan', 'post', data, params, (status, code, res) => {
                        if (status) {
                            this.$Message.success('删除成功！');
                            this.data2.splice(index, 1);//同步删除页面当前这条数据
                        } else {
                            this.$Message.error('删除失败！');
                        }
                    });
                },
                onCancel: () => {
                }
            });
        },
        //是否上架对话框(回收站的)
        putawayRecycle (index, val) {
            this.$Modal.confirm({
                render: (h) => {
                    return h('span', {
                        class:'reConfirm',  
                    },'确定上架此产品？')
                },
                onOk: () => {
                    let tid = val;

                    var params = {
                            action: 'up',
                        };
                    var data = qs.stringify({
                            loan_id: tid
                        });
                    this.api.apiPost('/loan/loan', 'post', data, params, (status, code, res) => {
                        if (status) {
                            this.$Message.success('上架成功！');
                            this.data3.splice(index, 1);//同步删除页面当前这条数据
                        } else {
                            this.$Message.error('上架失败！');
                        }
                    });
                },
                onCancel: () => {
                }
            });
        },
        tabClick (data) {
            if(data == 'name1'){
                this.pageNum=1;
                this.getLoanInfo();
                this.nameNo='name1';
            }else if(data == 'name2'){
                this.pageNum=1;
                this.getSoldOut();
                this.nameNo='name2';
            }else if(data == 'name3'){
                this.pageNum=1;
                this.getRecycle();
                this.nameNo='name3';
            }else if(data == 'name4'){
                this.pageNumso=1;
                //this.sosuoFun();
                this.infoTotal01=1;
                this.nameNo='name4';
            }
        },
    },
    mounted () {
        this.getLoanInfo();
        //this.getBank();
    }
}
</script>

<style scoped>
.content{ position:absolute; top: 54px; left: 240px; width: calc(100% - 240px); background: #EBF1F4; padding-left: 20px; box-sizing: border-box; height: calc(100vh - 54px); }
.addbtn button{ height: 36px; line-height: 36px; color: #ffffff; background: #037AFF; padding: 0 15px; border: none; font-size: 16px; margin: 20px 0;}
.tableBox{ height: calc(100vh - 304px); overflow-y: scroll;}
.tabbox{ background: #ffffff; padding: 10px 20px 20px; width: calc(100% - 20px); height: calc(100vh - 130px); }
.pagebox{ background: #ffffff; text-align: center; padding: 30px 0 50px; width: calc(100% - 20px);}
.search{ width: 460px; float: right; margin-right: 20px; margin-top: 20px;}
</style>