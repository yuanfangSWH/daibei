<template>
    <div class="content">
        <div class="addbtn"><router-link to="/guide/addedutag"><button>添加标签</button></router-link></div>
        <div class="tabbox">
            <Tabs :animated="false">
                <TabPane label="上架中">
                    <Table :columns="columns1" :data="data1"></Table>
                </TabPane>
                <!-- <TabPane label="回收站">标签二的内容</TabPane> -->
            </Tabs>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import qs from 'qs';
export default {
    name: 'Edutag',
    components:{
        
    },
    data (){
        return{
            goodsId:'',
            columns1: [
                    {
                        title: '编号',
                        key: 'id',
                        align: 'center',
                    },
                    {
                        title: '标签名称',
                        key: 'tab_name',
                        align: 'center',
                    },
                    {
                        title: '排序',
                        key: 'rank',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            var data = params.row
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
                                                path: '/guide/editedutag',
                                                name: 'Editedutag',
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
                id: ''
        }
    },
    methods: {
        getBbstagInfo () {
            var params = {
                    action: 'all',
                };
            this.api.apiPost('/edu/tags', 'get', '', params, (status, code, res) => {
                if (status) {
                    this.data1 = res.data;
                    this.id = res.data.id;
                } else {
                    this.$Message.error(''+res.msg);
                }
            });
        },
        //是否删除对话框
        confirm (index, val) {
            this.$Modal.confirm({
                render: (h) => {
                    return h('span', {
                        class:'reConfirm',  
                    },'确定删除此标签？')
                },
                onOk: () => {
                    let tid = val
                    var params = {
                            action: 'del',
                        };
                    var data= qs.stringify({
                            tag_id: tid,
                        });
                    this.api.apiPost('/edu/tags', 'post', data, params, (status, code, res) => {
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
        this.getBbstagInfo()
    }
}
</script>

<style scoped>
.content{ position:absolute; top: 54px; left: 240px; width: calc(100% - 240px); background: #EBF1F4; padding-left: 20px; box-sizing: border-box; height: calc(100vh - 54px); }
.addbtn button{ height: 36px; line-height: 36px; color: #ffffff; background: #037AFF; padding: 0 15px; border: none; font-size: 16px; margin: 20px 0;}
.tabbox{ background: #ffffff; padding: 10px 20px 20px; width: calc(100% - 20px);height: calc(100vh - 242px);}
.pagebox{ background: #ffffff; text-align: center; padding: 30px 0 50px; width: calc(100% - 20px);}
</style>