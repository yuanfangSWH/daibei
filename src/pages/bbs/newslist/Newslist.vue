<template>
    <div class="content">
        <div class="addbtn"><router-link to="/bbs/addnews"><button>添加头条</button></router-link></div>
        <div class="tabbox">
            <Tabs :animated="false" @on-click="tabClick" :value="nameNo">
                <TabPane label="上架中" name="name1">
                    <div class="tableBox"><Table :columns="columns1" :data="data1"></Table></div>
                    <div class="pagebox"><Page :total="infoTotal01" :current="pageNum" :page-size="pageSize" show-elevator @on-change="handlePage" /></div>
                </TabPane>
                <TabPane label="回收站" name="name2">
                    <div class="tableBox"><Table :columns="columns2" :data="data2"></Table></div>
                    <div class="pagebox"><Page :total="infoTotal01" :current="pageNum" :page-size="pageSize" show-elevator @on-change="handlePage2" /></div>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import qs from 'qs';
export default {
    name: 'Newslist',
    components:{
        
    },
    data (){
        return{
            soinfo:'',
            nameNo:'name1',
            pagesinfo:'',
            infoTotal01:0,
            pageNum: 1,//当前页数
            pageSize: 10,//每页的条数
            columns1: [
                    {
                        title: 'ID',
                        key: 'id',
                        align: 'center',
                    },
                    {
                        title: '文章分类',
                        key: 'new_tab',
                        align: 'center',
                        render: (h, params) => {
                            var a = params.row.new_tab.join("，");
                            return h('div',a);
                        }
                    },
                    {
                        title: '标题',
                        key: 'new_name',
                        align: 'center',
                    },
                    {
                        title: '点击量',
                        key: 'new_look_num',
                        align: 'center',
                    },
                    {
                        title: '留言量',
                        key: 'new_reply_num',
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
                        title: '发布日期',
                        key: 'create_time',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            var newsdata1 = params.row;
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
                                                path: '/bbs/editnews',
                                                name: 'Editnews',
                                                query: {
                                                    sid: newsdata1.id,
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
                                            this.confirm(params.index, params.row.id, params.row.new_name);
                                        }
                                    }
                                }, '删除')
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
                        title: '文章分类',
                        key: 'new_tab',
                        align: 'center',
                        render: (h, params) => {
                            var a = params.row.new_tab.join("，");
                            return h('div',a);
                        }
                    },
                    {
                        title: '标题',
                        key: 'new_name',
                        align: 'center',
                    },
                    {
                        title: '点击量',
                        key: 'new_look_num',
                        align: 'center',
                    },
                    {
                        title: '留言量',
                        key: 'new_reply_num',
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
                        title: '发布日期',
                        key: 'create_time',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            var newsdata1 = params.row;
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
                                                path: '/bbs/editnews',
                                                name: 'Editnews',
                                                query: {
                                                    sid: newsdata1.id,
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
                                            //this.show(params.index)
                                           this.putawayRecycle(params.index, params.row.id, params.row.new_name);
                                            
                                        }
                                    }
                                }, '恢复'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.confirmHs(params.index, params.row.id, params.row.new_name);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data2: [],
                id: '',
                allbank:[],
                banksname:'',
                i: 0
        }
    },
    methods: {
        getNewsListInfo () {
            var params = {
                    action: 'getAllNew',
                    state: '1',
                    page: this.pageNum,
                };
            this.api.apiPost('/news/new', 'get', '', params, (status, code, res) => {
                if (status) {
                    this.data1 = res.data.newList;
                    this.pagesinfo = res.data.pages;
                    this.pageSize = Number(this.pagesinfo.defaultPageSize);
                    this.infoTotal01 = Number(this.pagesinfo.totalCount);
                } else {
                    this.$Message.error(res.msg);
                }
            });
        },
        getRecycle () {
            var params = {
                    action: 'getAllNew',
                    state: '0',
                };
            this.api.apiPost('/news/new', 'get', '', params, (status, code, res) => {
                if (status) {
                    this.data2 = res.data.newList;
                    this.pagesinfo = res.data.pages;
                    this.pageSize = Number(this.pagesinfo.defaultPageSize);
                    this.infoTotal01 = Number(this.pagesinfo.totalCount);
                } else {
                    this.$Message.error(res.msg);
                }
            });
        },
        handlePage(value) {
            this.pageNum = value
            this.getNewsListInfo()
        },
        handlePage2(value) {
            this.pageNum = value
            this.getRecycle();
        },
        //是否删除对话框(上架中的)
        confirm (index, val, name) {
            this.$Modal.confirm({
                render: (h) => {
                    return h('span', {
                        class:'reConfirm',  
                    },'确定要删除【' + name + '】吗？')
                },
                onOk: () => {
                    let tid = val;

                    var params = {
                            action: 'del',
                        };
                    var data= qs.stringify({
                            new_id: tid
                        });
                    this.api.apiPost('/news/new', 'post', data, params, (status, code, res) => {
                        if (status) {
                            this.$Message.success('删除成功！');
                            this.data1.splice(index, 1);//同步删除页面当前这条数据
                        } else {
                            this.$Message.error(res.msg);
                        }
                    });
                },
                onCancel: () => {
                }
            });
        },
        //是否恢复对话框(回收站的)
        putawayRecycle (index, val, name) {
            this.$Modal.confirm({
                render: (h) => {
                    return h('span', {
                        class:'reConfirm',  
                    },'确定恢复【' + name + '】吗？')
                },
                onOk: () => {
                    let tid = val;

                    var params = {
                            action: 'up',
                        };
                    var data= qs.stringify({
                            new_id: tid
                        });
                    this.api.apiPost('/news/new', 'post', data, params, (status, code, res) => {
                        if (status) {
                            this.$Message.success('恢复成功！');
                            this.data2.splice(index, 1);//同步删除页面当前这条数据
                        } else {
                            this.$Message.error(res.msg);
                        }
                    });
                },
                onCancel: () => {
                }
            });
        },
        //是否删除对话框(回收站的)
        confirmHs (index, val, name) {
            this.$Modal.confirm({
                render: (h) => {
                    return h('span', {
                        class:'reConfirm',  
                    },'确定要彻底删除【' + name + '】吗？')
                },
                onOk: () => {
                    let tid = val;

                    var params = {
                            action: 'realdel',
                        };
                    var data= qs.stringify({
                            new_id: tid
                        });
                    this.api.apiPost('/news/new', 'post', data, params, (status, code, res) => {
                        if (status) {
                            this.$Message.success('删除成功！');
                            this.data2.splice(index, 1);//同步删除页面当前这条数据
                        } else {
                            this.$Message.error(res.msg);
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
                this.getNewsListInfo();
                this.nameNo='name1';
            }else if(data == 'name2'){
                this.pageNum=1;
                this.getRecycle();
                this.nameNo='name2';
            }
        },
    },
    mounted () {
        this.getNewsListInfo();
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