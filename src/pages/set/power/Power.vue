<template>
    <div class="content">
        <div class="addbtn"><router-link to="/set/power/addpower"><button>添加权限</button></router-link></div>
        <div class="tabbox">
            <Tabs :animated="false" @on-click="tabClick" :value="nameNo">
                <TabPane label="上架中" name="name1">
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
    name: 'Power',
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
                        key: 'af_id',
                        align: 'center',
                    },
                    {
                        title: '接口路径',
                        key: 'af_url',
                        align: 'center',
                    },
                    {
                        title: '权限描述',
                        key: 'af_desc',
                        align: 'center',
                    },
                    {
                        title: '权限分组',
                        key: 'ap_name',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            var a = params.row;
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
                                                path: '/set/power/editpower',
                                                name: 'Editpower',
                                                query: {
                                                    sid: a.af_id,
                                                }
                                            })
                                        }
                                    }
                                }, '编辑')
                            ]);
                        }
                    }
                ],
                data1: [],
                id: '',
                allbank:[],
                banksname:'',
                i: 0
        }
    },
    methods: {
        getRoleList () {
            var params = {
                    action: 'powerlist',
                    page: this.pageNum,
                };
            this.api.apiPost('/admin/power', 'get', '', params, (status, code, res) => {
                if (status) {
                    this.data1 = res.data.FunList;
                    //console.log("数据："+JSON.stringify(this.data1));
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
            this.getRoleList()
        },
        tabClick (data) {
            if(data == 'name1'){
                this.pageNum=1;
                this.getRoleList();
                this.nameNo='name1';
            }
        },
    },
    mounted () {
        this.getRoleList();
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