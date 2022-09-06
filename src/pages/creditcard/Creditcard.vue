<template>
    <div class="content">
        <div class="addbtn"><router-link to="/creditcard/Addcreditcard"><button>添加产品</button></router-link><Input v-model="soinfo" class="search" search enter-button="搜索" @on-search="sosuoFun" placeholder="输入要搜索的产品名称" /></div>
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
    name: 'Creditcard',
    components:{
        
    },
    data (){
        return{
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
                        title: '卡种名称',
                        key: 'card_name',
                        align: 'center',
                    },
                    {
                        title: '卡片素材',
                        key: 'card_img',
                        align: 'center',
                         render: (h, params) => {
                             //console.log("这里的图片路径："+params.row.bank_img);
                            return h('img', {
                                style: {//设置样式
                                    height: '65px',
                                    margin: '8px 0 ',
                                },
                                attrs: {//设置属性
                                    src: params.row.card_img
                                }
                            });
                        }
                    },
                    {
                        title: '权益描述',
                        key: 'card_introduce',
                        align: 'center',
                    },
                    {
                        title: '标签内容',
                        key: 'card_class',
                        align: 'center',
                        render: (h, params) => {
                            var sta=params.row.card_class;
                            var b = sta.join("，");
                            return h('div',b);
                        }
                    },
                    {
                        title: '发布时间',
                        key: 'card_create_time',
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
                        title: '排序',
                        key: 'card_sort'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
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
                                                path: '/creditcard/Editcreditcard',
                                                name: 'Editcreditcard',
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
                        title: '卡种名称',
                        key: 'card_name',
                        align: 'center',
                    },
                    {
                        title: '卡片素材',
                        key: 'card_img',
                        align: 'center',
                         render: (h, params) => {
                             //console.log("这里的图片路径："+params.row.bank_img);
                            return h('img', {
                                style: {//设置样式
                                    width: '120px',
                                    height: '65px',
                                    margin: '8px 0 ',
                                },
                                attrs: {//设置属性
                                    src: params.row.card_img
                                }
                            });
                        }
                    },
                    {
                        title: '权益描述',
                        key: 'card_introduce',
                        align: 'center',
                    },
                    {
                        title: '标签内容',
                        key: 'card_class',
                        align: 'center',
                        render: (h, params) => {
                            var sta=params.row.card_class;
                            var b = sta.join("，");
                            return h('div',b);
                        }
                    },
                    {
                        title: '发布时间',
                        key: 'card_create_time',
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
                        title: '排序',
                        key: 'card_sort'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 250,
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
                                                path: '/creditcard/Editcreditcard',
                                                name: 'Editcreditcard',
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
                        title: '卡种名称',
                        key: 'card_name',
                        align: 'center',
                    },
                    {
                        title: '卡片素材',
                        key: 'card_img',
                        align: 'center',
                         render: (h, params) => {
                             //console.log("这里的图片路径："+params.row.bank_img);
                            return h('img', {
                                style: {//设置样式
                                    width: '120px',
                                    height: '65px',
                                    margin: '8px 0 ',
                                },
                                attrs: {//设置属性
                                    src: params.row.card_img
                                }
                            });
                        }
                    },
                    {
                        title: '权益描述',
                        key: 'card_introduce',
                        align: 'center',
                    },
                    {
                        title: '标签内容',
                        key: 'card_class',
                        align: 'center',
                        render: (h, params) => {
                            var sta=params.row.card_class;
                            var b = sta.join("，");
                            return h('div',b);
                        }
                    },
                    {
                        title: '发布时间',
                        key: 'card_create_time',
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
                        title: '排序',
                        key: 'card_sort'
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
                        title: '卡种名称',
                        key: 'card_name',
                        align: 'center',
                    },
                    {
                        title: '卡片素材',
                        key: 'card_img',
                        align: 'center',
                         render: (h, params) => {
                             //console.log("这里的图片路径："+params.row.bank_img);
                            return h('img', {
                                style: {//设置样式
                                    width: '120px',
                                    height: '65px',
                                    margin: '8px 0 ',
                                },
                                attrs: {//设置属性
                                    src: params.row.card_img
                                }
                            });
                        }
                    },
                    {
                        title: '权益描述',
                        key: 'card_introduce',
                        align: 'center',
                    },
                    {
                        title: '标签内容',
                        key: 'card_class',
                        align: 'center',
                        render: (h, params) => {
                            var sta=params.row.card_class;
                            var b = sta.join("，");
                            return h('div',b);
                        }
                    },
                    {
                        title: '发布时间',
                        key: 'card_create_time',
                        align: 'center',
                    },
                    {
                        title: '状态',
                        key: 'sjia',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            var cardstate=params.row.card_state;
                            if(cardstate == 1){
                                return h('div','上架');
                            }else if(cardstate == 0){
                                return h('div','下架');
                            }else if(cardstate == 2){
                                return h('div','回收站');
                            }
                        }
                    },
                    {
                        title: '排序',
                        key: 'card_sort'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
                            var cardstate=params.row.card_state;
                            var bankdata1 = params.row;
                            if(cardstate == '1'){
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
                                                    path: '/creditcard/Editcreditcard',
                                                    name: 'Editcreditcard',
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
                            }else if(cardstate == '0'){
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
                                                path: '/creditcard/Editcreditcard',
                                                name: 'Editcreditcard',
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
                            }else if(cardstate == '2'){
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
                //allbank:[],
                banksname:'',
                i: 0,
                soinfo:'',
                nameNo:'name1',
        }
    },
    methods: {
        //  getBank () {
        //     this.api.apiPost('/bank/allbank', 'get', '', '', (status, code, res) => {
        //         if (status) {
        //             this.allbank = res.data.allBanks;
        //         } else {
        //             this.$Message.error(res.msg);
        //         }
        //     });
        // },
        getBankInfo () {
            var _this=this;
            var params={
                    action: 'getAllCard',
                    state: '1',
                    page: _this.pageNum,
                };
            _this.api.apiPost('/bank/card', 'get', '', params, (status, code, res) => {
                if (status) {
                    _this.data1 = res.data.cardList;
                    _this.pagesinfo = res.data.pages;
                    _this.pageSize = _this.pagesinfo.defaultPageSize;
                    _this.infoTotal01 = parseInt(_this.pagesinfo.totalCount);
                } else {
                    _this.$Message.error(res.msg);
                }
            });
        },
        getSoldOut () {
            var _this=this;

            var params={
                    action: 'getAllCard',
                    state: '0',
                    page: _this.pageNum,
                };
            _this.api.apiPost('/bank/card', 'get', '', params, (status, code, res) => {
                if (status) {
                    _this.data2 = res.data.cardList;
                    //console.log("银行下架产品："+JSON.stringify(_this.data2));
                    _this.pagesinfo = res.data.pages;
                    _this.pageSize = _this.pagesinfo.defaultPageSize;
                    _this.infoTotal01 = parseInt(_this.pagesinfo.totalCount);
                } else {
                    _this.$Message.error(res.msg);
                }
            });
        },
        getRecycle () {
            var _this=this;
            var params={
                    action: 'getAllCard',
                    state: '2',
                    page: _this.pageNum,
                };
            _this.api.apiPost('/bank/card', 'get', '', params, (status, code, res) => {
                if (status) {
                    _this.data3 = res.data.cardList;
                    //console.log("银行回收站产品："+JSON.stringify(_this.data3));
                    _this.pagesinfo = res.data.pages;
                    _this.pageSize = _this.pagesinfo.defaultPageSize;
                    _this.infoTotal01 = parseInt(_this.pagesinfo.totalCount);
                } else {
                    _this.$Message.error(res.msg);
                }
            });
        },
        sosuoFun (e) {
            var _this=this;
            var params={
                    action: 'getAllCard',
                    key: _this.soinfo,
                    page: _this.pageNumso,
                };
            _this.api.apiPost('/bank/card', 'get', '', params, (status, code, res) => {
                if (status) {
                    _this.data4 = res.data.cardList;
                    //console.log("搜索结果："+_this.data4);
                    _this.nameNo = "name4";
                    _this.pagesinfo = res.data.pages;
                    _this.pageSize = _this.pagesinfo.defaultPageSize;
                    _this.infoTotal01 = parseInt(_this.pagesinfo.totalCount);
                } else {
                    _this.$Message.error(res.msg);
                }
            });
        },
        handlePage(value) {
            this.pageNum = value
            this.getBankInfo();
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
                    var params={
                        action: 'down',
                    };
                    var data=qs.stringify({
                            card_id: tid
                        });
                    this.api.apiPost('/bank/card', 'post', data, params, (status, code, res) => {
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
                    var params={
                        action: 'up',
                    };
                    var data=qs.stringify({
                            card_id: tid
                        });
                    this.api.apiPost('/bank/card', 'post', data, params, (status, code, res) => {
                        if (status) {
                            this.$Message.success('上架成功！');
                            this.data2.splice(index, 1);//同步删除页面当前这条数据
                        } else {
                            this.$Message.error('下架失败！');
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
                    let tid = val;
                    var params={
                        action: 'del',
                    };
                    var data=qs.stringify({
                            card_id: tid
                        });
                    this.api.apiPost('/bank/card', 'post', data, params, (status, code, res) => {
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
                    var params={
                        action: 'up',
                    };
                    var data=qs.stringify({
                            card_id: tid
                        });
                    this.api.apiPost('/bank/card', 'post', data, params, (status, code, res) => {
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
                this.getBankInfo();
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
        this.getBankInfo();
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