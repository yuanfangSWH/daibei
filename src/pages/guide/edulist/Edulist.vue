<template>
    <div class="content">
        <div class="addbtn"><router-link to="/guide/addedu"><button>添加教程</button></router-link></div>
        <div class="tabbox">
            <Tabs :animated="false" @on-click="tabClick" :value="nameNo">
                <TabPane label="贷款教程" name="name1">
                    <div class="tableBox"><Table :columns="columns1" :data="data1"></Table></div>
                    <div class="pagebox"><Page :total="infoTotal01" :current="pageNum" :page-size="pageSize" show-elevator @on-change="handlePage" /></div>
                </TabPane>
                <TabPane label="拉新教程" name="name2">
                    <div class="tableBox"><Table :columns="columns2" :data="data2"></Table></div>
                    <div class="pagebox"><Page :total="infoTotal01" :current="pageNum" :page-size="pageSize" show-elevator @on-change="handlePage2" /></div>
                </TabPane>
                <TabPane label="贷款教程回收站" name="name3">
                    <div class="tableBox"><Table :columns="columns3" :data="data3"></Table></div>
                    <div class="pagebox"><Page :total="infoTotal01" :current="pageNum" :page-size="pageSize" show-elevator @on-change="handlePage3" /></div>
                </TabPane>
                <TabPane label="拉新教程回收站" name="name4">
                    <div class="tableBox"><Table :columns="columns4" :data="data4"></Table></div>
                    <div class="pagebox"><Page :total="infoTotal01" :current="pageNum" :page-size="pageSize" show-elevator @on-change="handlePage4" /></div>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import qs from 'qs';
export default {
    name: 'Edulist',
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
                        title: '教程名称',
                        key: 'education_name',
                        align: 'center',
                        // render: (h, params) => {
                        //     var a = params.row.list_tab.join("，");
                        //     return h('div',a);
                        // }
                    },
                    {
                        title: '教程标签',
                        key: 'education_tag',
                        align: 'center',
                        render: (h, params) => {
                            var a = params.row.education_tag.join("，");
                            return h('div',a);
                        }
                    },
                    {
                        title: '教程简介',
                        key: 'education_text',
                        align: 'center',
                        render: (h, params) => {
                            return h('div',{
                                domProps:{
                                innerHTML:`${params.row.education_text}`
                                }
                            })
                        }
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
                        key: 'education_time',
                        align: 'center',
                    },
                    {
                        title: '排序',
                        key: 'education_sort',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            var bbsdata1 = params.row;
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
                                                path: '/guide/editedu',
                                                name: 'Editedu',
                                                query: {
                                                    sid: bbsdata1.id,
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
                                            this.confirm(params.index, params.row.id, params.row.education_name);
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
                        title: '教程名称',
                        key: 'education_name',
                        align: 'center',
                        // render: (h, params) => {
                        //     var a = params.row.list_tab.join("，");
                        //     return h('div',a);
                        // }
                    },
                    {
                        title: '教程标签',
                        key: 'education_tag',
                        align: 'center',
                        render: (h, params) => {
                            var a = params.row.education_tag.join("，");
                            return h('div',a);
                        }
                    },
                    {
                        title: '教程简介',
                        key: 'education_text',
                        align: 'center',
                        render: (h, params) => {
                            return h('div',{
                                domProps:{
                                innerHTML:`${params.row.education_text}`
                                }
                            })
                        }
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
                        key: 'education_time',
                        align: 'center',
                    },
                    {
                        title: '排序',
                        key: 'education_sort',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            var bbsdata1 = params.row;
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
                                                path: '/guide/editedu',
                                                name: 'Editedu',
                                                query: {
                                                    sid: bbsdata1.id,
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
                                            this.xiajia(params.index, params.row.id, params.row.education_name);
                                        }
                                    }
                                }, '下架')
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
                        title: '教程名称',
                        key: 'education_name',
                        align: 'center',
                        // render: (h, params) => {
                        //     var a = params.row.list_tab.join("，");
                        //     return h('div',a);
                        // }
                    },
                    {
                        title: '教程标签',
                        key: 'education_tag',
                        align: 'center',
                        render: (h, params) => {
                            var a = params.row.education_tag.join("，");
                            return h('div',a);
                        }
                    },
                    {
                        title: '教程简介',
                        key: 'education_text',
                        align: 'center',
                        render: (h, params) => {
                            return h('div',{
                                domProps:{
                                innerHTML:`${params.row.education_text}`
                                }
                            })
                        }
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
                        key: 'education_time',
                        align: 'center',
                    },
                    {
                        title: '排序',
                        key: 'education_sort',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.shangjia(params.index, params.row.id, params.row.education_name);
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
                        title: '教程名称',
                        key: 'education_name',
                        align: 'center',
                        // render: (h, params) => {
                        //     var a = params.row.list_tab.join("，");
                        //     return h('div',a);
                        // }
                    },
                    {
                        title: '教程标签',
                        key: 'education_tag',
                        align: 'center',
                        render: (h, params) => {
                            var a = params.row.education_tag.join("，");
                            return h('div',a);
                        }
                    },
                    {
                        title: '教程简介',
                        key: 'education_text',
                        align: 'center',
                        render: (h, params) => {
                            return h('div',{
                                domProps:{
                                innerHTML:`${params.row.education_text}`
                                }
                            })
                        }
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
                        key: 'education_time',
                        align: 'center',
                    },
                    {
                        title: '排序',
                        key: 'education_sort',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.shangjia2(params.index, params.row.id, params.row.education_name);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data4: [],
                id: '',
                allbank:[],
                banksname:'',
                i: 0,
        }
    },
    methods: {
        getEduListInfo () {
            var params = {
                    action: 'getAllEdu',
                    state: '1',
                    type: 1,
                    page: this.pageNum,
                };
            this.api.apiPost('/edu/edus', 'get', '', params, (status, code, res) => {
                if (status) {
                    this.data1 = res.data.EduList;
                    this.pagesinfo = res.data.pages;
                    this.pageSize = Number(this.pagesinfo.defaultPageSize);
                    this.infoTotal01 = Number(this.pagesinfo.totalCount);
                } else {
                    this.$Message.error(''+res.msg);
                }
            });
        },
        getEduListInfo2 () {
            var params = {
                    action: 'getAllEdu',
                    state: '1',
                    type: 2,
                    page: this.pageNum,
                };
            this.api.apiPost('/edu/edus', 'get', '', params, (status, code, res) => {
                if (status) {
                    this.data2 = res.data.EduList;
                    this.pagesinfo = res.data.pages;
                    this.pageSize = Number(this.pagesinfo.defaultPageSize);
                    this.infoTotal01 = Number(this.pagesinfo.totalCount);
                } else {
                    this.$Message.error(''+res.msg);
                }
            });
        },
        getRecycle () {
            var params = {
                    action: 'getAllEdu',
                    state: '0',
                    type: 1,
                    page: this.pageNum,
                };
            this.api.apiPost('/edu/edus', 'get', '', params, (status, code, res) => {
                if (status) {
                    this.data3 = res.data.EduList;
                    this.pagesinfo = res.data.pages;
                    this.pageSize = Number(this.pagesinfo.defaultPageSize);
                    this.infoTotal01 = Number(this.pagesinfo.totalCount);
                } else {
                    this.$Message.error(''+res.msg);
                }
            });
        },
        getRecycle2 () {
            var params = {
                    action: 'getAllEdu',
                    state: '0',
                    type: 2,
                    page: this.pageNum,
                };
            this.api.apiPost('/edu/edus', 'get', '', params, (status, code, res) => {
                if (status) {
                    this.data4 = res.data.EduList;
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
            this.getEduListInfo()
        },
        handlePage2(value) {
            this.pageNum = value
            this.getEduListInfo2();
        },
        handlePage3(value) {
            this.pageNum = value
            this.getRecycle();
        },
        handlePage4(value) {
            this.pageNum = value
            this.getRecycle2();
        },
        //是否下架对话框(上架中的)
        confirm (index, val, name) {
            this.$Modal.confirm({
                render: (h) => {
                    return h('span', {
                        class:'reConfirm',  
                    },'确定要下架【' + name + '】吗？')
                },
                onOk: () => {
                    let tid = val;

                    var params = {
                        action: 'down',
                    };
                    var data = qs.stringify({
                            id: tid
                        });
                    this.api.apiPost('/edu/edus', 'post', data, params, (status, code, res) => {
                        if (status) {
                            this.$Message.success('下架成功！');
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
        //是否下架对话框(信用卡上架中的)
        xiajia (index, val, name) {
            this.$Modal.confirm({
                render: (h) => {
                    return h('span', {
                        class:'reConfirm',  
                    },'确定要下架【' + name + '】吗？')
                },
                onOk: () => {
                    let tid = val;
                    var params = {
                        action: 'down',
                    };
                    var data = qs.stringify({
                            id: tid
                        });
                    this.api.apiPost('/edu/edus', 'post', data, params, (status, code, res) => {
                        if (status) {
                            this.$Message.success('下架成功！');
                            this.data2.splice(index, 1);//同步删除页面当前这条数据
                        } else {
                            this.$Message.error(''+res.msg);
                        }
                    });
                },
                onCancel: () => {
                }
            });
        },
        //是否上架对话框(贷款回收站的)
        shangjia (index, val, name) {
            this.$Modal.confirm({
                render: (h) => {
                    return h('span', {
                        class:'reConfirm',  
                    },'确定要上架【' + name + '】吗？')
                },
                onOk: () => {
                    let tid = val;

                    var params = {
                        action: 'up',
                    };
                    var data = qs.stringify({
                            id: tid
                        });
                    this.api.apiPost('/edu/edus', 'post', data, params, (status, code, res) => {
                        if (status) {
                            this.$Message.success('上架成功！');
                            this.data3.splice(index, 1);//同步删除页面当前这条数据
                        } else {
                            this.$Message.error(''+res.msg);
                        }
                    });
                },
                onCancel: () => {
                }
            });
        },
        //是否上架对话框(信用卡回收站的)
        shangjia2 (index, val, name) {
            this.$Modal.confirm({
                render: (h) => {
                    return h('span', {
                        class:'reConfirm',  
                    },'确定要上架【' + name + '】吗？')
                },
                onOk: () => {
                    let tid = val
                    var params = {
                        action: 'up',
                    };
                    var data = qs.stringify({
                            id: tid
                        });
                    this.api.apiPost('/edu/edus', 'post', data, params, (status, code, res) => {
                        if (status) {
                            this.$Message.success('上架成功！');
                            this.data4.splice(index, 1);//同步删除页面当前这条数据
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
                this.getEduListInfo();
                this.nameNo='name1';
            }else if(data == 'name2'){
                this.pageNum=1;
                this.getEduListInfo2();
                this.nameNo='name2';
            }else if(data == 'name3'){
                this.pageNum=1;
                this.getRecycle();
                this.nameNo='name3';
            }else if(data == 'name4'){
                this.pageNum=1;
                this.getRecycle2();
                this.nameNo='name4';
            }
        },
    },
    mounted () {
        this.getEduListInfo();
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