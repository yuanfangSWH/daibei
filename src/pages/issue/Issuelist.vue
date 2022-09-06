<template>
    <div class="content">
        <div class="addbtn"><router-link to="/issue/addissue"><button>添加问题</button></router-link></div>
        <div class="tabbox">
            <Tabs :animated="false" @on-click="tabClick" :value="nameNo">
                <TabPane label="发布中" name="name1">
                    <div class="tableBox"><Table :columns="columns1" :data="data1"></Table></div>
                    <div class="pagebox"><Page :total="infoTotal01" :current="pageNum" :page-size="pageSize" show-elevator @on-change="handlePage" /></div>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import qs from 'qs';
export default {
    name: 'Issuelist',
    components:{
        
    },
    data (){
        return{
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
                        title: '标题',
                        key: 'notice_name',
                        align: 'center',
                        // render: (h, params) => {
                        //     return h('div',{
                        //         domProps:{
                        //         innerHTML:`${params.row.education_text}`
                        //         }
                        //     })
                        // }
                    },
                    {
                        title: '问题内容',
                        key: 'notice_content',
                        align: 'center',
                        // render: (h, params) => {
                        //     return h('div',{
                        //         domProps:{
                        //         innerHTML:`${params.row.education_text}`
                        //         }
                        //     })
                        // }
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
                        key: 'notice_time',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            var Informdata1 = params.row;
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
                                                path: '/issue/editissue',
                                                name: 'Editissue',
                                                query: {
                                                    sid: Informdata1.id,
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
                                            this.confirm(params.index, params.row.id, params.row.notice_name);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data1: [],
        }
    },
    methods: {
        getInform () {
            var params = {
                    action: 'getQueanAll',
                    page: this.pageNum,
                };
            this.api.apiPost('/system/quean', 'get', '', params, (status, code, res) => {
                if (code == 200) {
                    this.data1 = res.data.notice;
                    this.pagesinfo = res.data.pages;
                    this.pageSize = Number(this.pagesinfo.defaultPageSize);
                    this.infoTotal01 = Number(this.pagesinfo.totalCount);
                } else {
                    this.$Message.error(''+res.msg);
                }
            });
        },
        handlePage(value) {
            this.pageNum = value
            this.getInform()
        },
        //是否删除对话框(发布中的)
        confirm (index, val, name) {
            this.$Modal.confirm({
                render: (h) => {
                    return h('span', {
                        class:'reConfirm',  
                    },'确定要删除【' + name + '】吗？')
                },
                onOk: () => {
                    let tid = val
                    var params = {
                            action: 'del',
                        };
                    var data= qs.stringify({
                            notice_id: tid
                        });
                    this.api.apiPost('/system/quean', 'post', data, params, (status, code, res) => {
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
        },
        tabClick (data) {
            if(data == 'name1'){
                this.pageNum=1;
                this.nameNo='name1';
            }
        },
    },
    mounted () {
        this.getInform();
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