<template>
    <div class="content">
        <div class="addbtn"><router-link to="/set/account/addaccount"><button>添加账号</button></router-link></div>
        <div class="tabbox">
            <Tabs :animated="false" @on-click="tabClick" :value="nameNo">
                <TabPane label="账号列表" name="name1">
                    <div class="tableBox"><Table :columns="columns2" :data="data2"></Table></div>
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
    name: 'Account',
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
            columns2: [
                {
                    title: 'ID',
                    key: 'admin_id',
                    align: 'center',
                },
                {
                    title: '用户名',
                    key: 'admin_username',
                    align: 'center',
                },
                {
                    title: '头像',
                    key: 'admin_avatar',
                    align: 'center',
                    render: (h, params) => {
                            //console.log("这里的图片路径："+params.row.bank_img);
                        if(params.row.admin_avatar){
                            return h('img', {
                                style: {//设置样式
                                    width: '50px',
                                    height: '50px',
                                    margin: '8px 0 ',
                                    'border-radius': '50px'
                                },
                                attrs: {//设置属性
                                    src: params.row.admin_avatar
                                }
                            });
                            }else{
                                return h('img', {
                                style: {//设置样式
                                    width: '50px',
                                    height: '50px',
                                    margin: '8px 0 ',
                                },
                                attrs: {//设置属性
                                    src: '../../../../static/images/avatar_icon.png'
                                }
                            });
                        }
                    }
                },
                {
                    title: '创建时间',
                    key: 'admin_dateline',
                    align: 'center',
                },
                {
                    title: '状态',
                    key: 'admin_status',
                    align: 'center',
                    render: (h, params) => {
                            //console.log("这里的图片路径："+params.row.bank_img);
                        if(params.row.admin_status == '1'){
                            return h('div', '正常');
                        }
                    }
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
                                            path: '/set/account/editaccount',
                                            name: 'Editaccount',
                                            query: {
                                                sid: a.admin_id,
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
                                        this.$router.push({
                                            path: '/set/accountqx/editaccountqx',
                                            name: 'Editaccountqx',
                                            query: {
                                                sid: a.admin_id,
                                            }
                                        })
                                    }
                                }
                            }, '编辑权限')
                        ]);
                    }
                }
            ],
            data2: [],
            id: '',
            grname:'',
        }
    },
    methods: {
        getXiajiList (){
            var params = {
                    action: 'adminlist',
                    page: this.pageNum,
                };
            this.api.apiPost('/admin/accountqx', 'get', '', params, (status, code, res) => {
                if (status) {
                    this.data2 = res.data.SubordinateList;
                    var date01='';
                    for(var i=0; i<this.data2.length; i++){
                        var date02=this.data2[i].admin_dateline;
                        if(date02 != '0'){
                            date01 = new Date(parseInt(date02) * 1000).toLocaleString().replace(/\/|\//g, "-").replace(/\//g, " ").replace(/下午|上午/g, " "); //时间戳转日期
                            this.data2[i].admin_dateline = date01;
                        }
                    };
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
            this.getXiajiList()
        },
        tabClick (data) {
            if(data == 'name1'){
                this.pageNum=1;
                this.getXiajiList();
                this.nameNo='name1';
            }
        },
    },
    mounted () {
        this.getXiajiList();
        //this.getBank();
    }
}
</script>

<style scoped>
.content{ position:absolute; top: 54px; left: 240px; width: calc(100% - 240px); background: #EBF1F4; padding-left: 20px; box-sizing: border-box; height: calc(100vh - 54px); }
.addbtn button{ height: 36px; line-height: 36px; color: #ffffff; background: #037AFF; padding: 0 15px; border: none; font-size: 16px; margin: 20px 0;}
.tableBox{ height: calc(100vh - 344px); overflow-y: scroll;}
.tabbox{ background: #ffffff; padding: 10px 20px 20px; width: calc(100% - 20px); height: calc(100vh - 130px); }
.pagebox{ background: #ffffff; text-align: center; padding: 30px 0 50px; width: calc(100% - 20px);}
.search{ width: 460px; float: right; margin-right: 20px; margin-top: 20px;}
.czlist{ float: left; margin-right: 20px;}
.cztitle{border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px; font-weight: bold; font-size: 14px;}
.js{ height: 40px; line-height: 40px; font-size: 14px; font-weight: bold;}
</style>