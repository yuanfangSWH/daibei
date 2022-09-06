<template>
    <div class="content">
        <div class="addbtn"><router-link to="/loantag/Addloantag"><button>添加标签</button></router-link></div>
        <div class="tabbox">
            <Tabs :animated="false">
                <TabPane label="上架中">
                    <Table :columns="columns1" :data="data1"></Table>
                </TabPane>
                <!-- <TabPane label="回收站">标签二的内容</TabPane> -->
            </Tabs>
        </div>
        <div class="pagebox"><Page :total="infoTotal01" :current="pageNum" :page-size="pageSize" show-elevator @on-change="handlePage" /></div>
    </div>
</template>

<script>
import axios from "axios";
import qs from 'qs';
export default {
    name: 'Loantag',
    components:{
        
    },
    data (){
        return{
            goodsId:'',
            columns1: [
                    {
                        title: '编号',
                        key: 'id'
                    },
                    {
                        title: '标签名称',
                        key: 'tab_name'
                    },
                    {
                        title: '排序',
                        key: 'rank'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
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
                                            var data = params.row
                                            this.$router.push({
                                                path: '/editloantag',
                                                name: 'Editloantag',
                                                query: {
                                                    sid: data.id,
                                                }
                                            })
                                            //this.show(params.index)
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
                                            this.goodsId=params.row.id;
                                            this.confirm(params.index, this.goodsId);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data1: [],
                id: '',
                pagesinfo:0,
                pageSize:0,
                infoTotal01:0,
                pageNum:1,
        }
    },
    methods: {
        getLoantagInfo () {
            this.api.apiPost('/loan/tags', 'get', '', '', (status, code, res) => {
                if (status) {
                    this.data1 = res.data;
                    this.id = res.data.id;
                    this.pagesinfo = res.data.pages;
                    this.pageSize = this.pagesinfo.defaultPageSize;
                    this.infoTotal01 = Number(this.pagesinfo.totalCount);
                } else {
                    this.$Message.error(''+res.msg);
                }
            });
        },
        handlePage(value) {
            this.pageNum = value
            this.getLoantagInfo();
        },
        //是否删除对话框
        confirm (index, val) {
            this.$Modal.confirm({
                render: (h) => {
                    return h('span', {
                        class:'reConfirm',  
                    },'确定删除此分类？')
                },
                onOk: () => {
                    let tid = val;

                    var data= qs.stringify({
                            tag_id: tid,
                        });
                    var params = {
                        action: 'del',
                    };
                    this.api.apiPost('/loan/tags', 'post', data, params, (status, code, res) => {
                        if (status) {
                            this.$Message.success('删除成功！');
                            this.data1.splice(index, 1);//同步删除页面当前这条数据
                        } else {
                             this.$Message.error(''+res.msg);
                        }
                    });
                },
                onCancel: () => {
                }
            });
        }
    },
    mounted () {
        this.getLoantagInfo()
    }
}
</script>

<style scoped>
.content{ position:absolute; top: 54px; left: 240px; width: calc(100% - 240px); background: #EBF1F4; padding-left: 20px; box-sizing: border-box; height: calc(100vh - 54px); }
.addbtn button{ height: 36px; line-height: 36px; color: #ffffff; background: #037AFF; padding: 0 15px; border: none; font-size: 16px; margin: 20px 0;}
.tabbox{ background: #ffffff; padding: 10px 20px 20px; width: calc(100% - 20px);}
.pagebox{ background: #ffffff; text-align: center; padding: 30px 0 50px; width: calc(100% - 20px);}
</style>