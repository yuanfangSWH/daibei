<template>
    <div class="content">
        <div class="addbtn"><Input v-model="soinfo" class="search" search enter-button="搜索" @on-search="sosuoFun" placeholder="输入平台用户ID进行搜索" /></div>
        <div class="tabbox">
            <Tabs :animated="false" @on-click="tabClick" :value="nameNo">
                <TabPane label="已申请用户" name="name1">
                    <div class="tableBox"><Table :columns="columns1" :data="data1"></Table></div>
                    <div class="pagebox"><Page :total="infoTotal01" :current="pageNum" :page-size="pageSize" show-elevator @on-change="handlePage" /></div>
                </TabPane>
                <TabPane label="未申请用户" name="name2">
                    <div class="tableBox"><Table :columns="columns2" :data="data2"></Table></div>
                    <div class="pagebox"><Page :total="infoTotal01" :current="pageNum" :page-size="pageSize" show-elevator @on-change="handlePage2" /></div>
                </TabPane>
                <TabPane label="搜索列表" name="name3">
                    <div class="tableBox"><Table :columns="columns3" :data="data3"></Table></div>
                    <div class="pagebox"><Page :total="infoTotal01" :current="pageNumso" :page-size="pageSize" show-elevator @on-change="handlePage3" /></div>
                </TabPane>
            </Tabs>
        </div>
        <Col class="demo-spin-col" span="8" v-show="isSpinShow">
            <Spin fix>
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
        </Col>
    </div>
</template>

<script>
import axios from "axios";
import qs from 'qs';
export default {
    name: 'Commonuser',
    components:{
        
    },
    data (){
        return{
            isSpinShow:false,
            pagesinfo:'',
            infoTotal01:0,
            pageNum: 1,//当前页数
            pageNumso: 1,//当前页数
            pageSize: 10,//每页的条数
            columns1: [
                    {
                        title: '用户id',
                        key: 'id',
                        align: 'center',
                    },
                    {
                        title: '用户头像',
                        key: 'user_avatar',
                        align: 'center',
                        render: (h, params) => {
                            if(params.row.user_avatar){
                                return h('img', {
                                    style: {//设置样式
                                        width: '50px',
                                        height: '50px',
                                        margin: '8px 0 ',
                                        'border-radius': '50px'
                                    },
                                    attrs: {//设置属性
                                        src: params.row.user_avatar
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
                        title: '用户名',
                        key: 'user_nickname',
                        align: 'center',
                    },
                    {
                        title: '真实姓名',
                        key: 'name',
                        align: 'center',
                    },
                    {
                        title: '手机号',
                        key: 'user_mobile',
                        align: 'center',
                    },
                    {
                        title: '用户等级',
                        key: 'user_rank',
                        align: 'center',
                    },
                    {
                        title: '总申卡数',
                        key: 'cardNums',
                        align: 'center',
                    },
                    {
                        title: '总贷款数',
                        key: 'loanNums',
                        align: 'center',
                    },
                    {
                        title: '注册时间',
                        key: 'user_create_time',
                        align: 'center',
                    },
                    {
                        title: '状态',
                        key: 'user_state',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            var sta=params.row.user_state;
                            if(sta == '1'){
                                return h('div','正常');
                            }else{
                                return h('div','禁止');
                            }
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            var id = params.row.id;
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
                                                path: '/users/commonuser/Yicominfo',
                                                name: 'Yicominfo',
                                                query: {
                                                    sid: id,
                                                }
                                            })

                                        }
                                    }
                                }, '详情'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            //this.show(params.index)
                                            this.$router.push({
                                                path: '/users/commonuser/edit',
                                                name: 'Edituser',
                                                query: {
                                                    sid: id,
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
                columns2: [
                    {
                        title: '用户id',
                        key: 'id',
                        align: 'center',
                    },
                    {
                        title: '用户头像',
                        key: 'user_avatar',
                        align: 'center',
                        render: (h, params) => {
                            if(params.row.user_avatar){
                                return h('img', {
                                    style: {//设置样式
                                        width: '50px',
                                        height: '50px',
                                        margin: '8px 0 ',
                                        'border-radius': '50px'
                                    },
                                    attrs: {//设置属性
                                        src: params.row.user_avatar
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
                        title: '用户名',
                        key: 'user_nickname',
                        align: 'center',
                    },
                    {
                        title: '真实姓名',
                        key: 'name',
                        align: 'center',
                    },
                    {
                        title: '手机号',
                        key: 'user_mobile',
                        align: 'center',
                    },
                    {
                        title: '用户等级',
                        key: 'user_rank',
                        align: 'center',
                    },
                    {
                        title: '总申卡数',
                        key: 'cardNums',
                        align: 'center',
                    },
                    {
                        title: '总贷款数',
                        key: 'loanNums',
                        align: 'center',
                    },
                    {
                        title: '注册时间',
                        key: 'user_create_time',
                        align: 'center',
                    },
                    {
                        title: '状态',
                        key: 'user_state',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            var sta=params.row.user_state;
                            if(sta == '1'){
                                return h('div','正常');
                            }else{
                                return h('div','禁止');
                            }
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            var id = params.row.id;
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
                                                path: '/users/commonuser/Yicominfo',
                                                name: 'Yicominfo',
                                                query: {
                                                    sid: id,
                                                }
                                            })
                                        }
                                    }
                                }, '详情'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            //this.show(params.index)
                                            this.$router.push({
                                                path: '/users/commonuser/edit',
                                                name: 'Edituser',
                                                query: {
                                                    sid: id,
                                                }
                                            })
                                        }
                                    }
                                }, '编辑')
                            ]);
                        }
                    }
                ],
                data2: [],
                columns3: [
                    {
                        title: '用户id',
                        key: 'id',
                        align: 'center',
                    },
                    {
                        title: '用户头像',
                        key: 'user_avatar',
                        align: 'center',
                        render: (h, params) => {
                            if(params.row.user_avatar){
                                return h('img', {
                                    style: {//设置样式
                                        width: '50px',
                                        height: '50px',
                                        margin: '8px 0 ',
                                        'border-radius': '50px'
                                    },
                                    attrs: {//设置属性
                                        src: params.row.user_avatar
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
                        title: '用户名',
                        key: 'user_nickname',
                        align: 'center',
                    },
                    {
                        title: '真实姓名',
                        key: 'name',
                        align: 'center',
                    },
                    {
                        title: '手机号',
                        key: 'user_mobile',
                        align: 'center',
                    },
                    {
                        title: '用户等级',
                        key: 'user_rank',
                        align: 'center',
                    },
                    {
                        title: '总申卡数',
                        key: 'cardNums',
                        align: 'center',
                    },
                    {
                        title: '总贷款数',
                        key: 'loanNums',
                        align: 'center',
                    },
                    {
                        title: '注册时间',
                        key: 'user_create_time',
                        align: 'center',
                    },
                    {
                        title: '状态',
                        key: 'user_state',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            var sta=params.row.user_state;
                            if(sta == '1'){
                                return h('div','正常');
                            }else{
                                return h('div','禁止');
                            }
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            var id = params.row.id;
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
                                                path: '/users/commonuser/Yicominfo',
                                                name: 'Yicominfo',
                                                query: {
                                                    sid: id,
                                                }
                                            })
                                        }
                                    }
                                }, '详情'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            //this.show(params.index)
                                            this.$router.push({
                                                path: '/users/commonuser/edit',
                                                name: 'Edituser',
                                                query: {
                                                    sid: id,
                                                }
                                            })
                                        }
                                    }
                                }, '编辑')
                            ]);
                        }
                    }
                ],
                data3: [],
                id: '',
                soinfo:'',
                nameNo:'name1'
        }
    },
    methods: {
        getPutongInfo () {
                if (this.isSpinShow === false){
                    this.isSpinShow = true;
                    var params = {
                            action: 'getUserList',
                            type: '0',
                            applyed: 1,
                            page: this.pageNum,
                        };
                    this.api.apiPost('/user/list', 'get', '', params, (status, code, res) => {
                        if (status) {
                            this.isSpinShow = false;
                            this.data1 = res.data.userList;
                            //console.log("普通用户："+JSON.stringify(_this.data1));
                            this.pagesinfo = res.data.pages;
                            this.pageSize = Number(this.pagesinfo.defaultPageSize);
                            this.infoTotal01 = Number(this.pagesinfo.totalCount);
                        } else {
                            this.$Message.error(''+res.msg);
                            this.isSpinShow = false;
                        }
                    });
                }
            
        },
        getWsqUser () {
                if (this.isSpinShow === false){
                    this.isSpinShow = true;
                    var params = {
                            action: 'getUserList',
                            type: '0',
                            applyed: 0,
                            page: this.pageNum,
                        };
                    this.api.apiPost('/user/list', 'get', '', params, (status, code, res) => {
                        if (status) {
                            this.isSpinShow = false;
                            this.data2 = res.data.userList;
                            //console.log("银行下架产品："+JSON.stringify(_this.data2));
                            this.pagesinfo = res.data.pages;
                            this.pageSize = Number(this.pagesinfo.defaultPageSize);
                            this.infoTotal01 = Number(this.pagesinfo.totalCount);
                        } else {
                            this.$Message.error(''+res.msg);
                            this.isSpinShow = false;
                        }
                    });
                }
            
        },
        sosuoFun (e) {
            if (this.isSpinShow === false){
                this.isSpinShow = true;
                var params = {
                        action: 'getUserList',
                        key: this.soinfo,
                        page: this.pageNumso,
                    };
                this.api.apiPost('/user/list', 'get', '', params, (status, code, res) => {
                    if (status) {
                        this.isSpinShow = false;
                        this.data3 = res.data.userList;
                        //console.log("搜索结果："+_this.data4);
                        this.nameNo = "name3";
                        this.pagesinfo = res.data.pages;
                        this.pageSize = Number(this.pagesinfo.defaultPageSize);
                        this.infoTotal01 = Number(this.pagesinfo.totalCount);
                    } else {
                        this.$Message.error(''+res.msg);
                        this.isSpinShow = false;
                    }
                });
            }
        },
        handlePage(value) {
            this.pageNum = value
            this.getPutongInfo();
        },
        handlePage2(value) {
            this.pageNum = value
            this.getWsqUser();
        },
        handlePage3(value) {
            this.pageNumso = value
            this.sosuoFun();
        },
        tabClick (data) {
            if(data == 'name1'){
                this.pageNum=1;
                this.getPutongInfo();
                this.nameNo='name1';
            }else if(data == 'name2'){
                this.pageNum=1;
                this.getWsqUser();
                this.nameNo='name2';
            }else if(data == 'name3'){
                this.pageNumso=1;
                //this.sosuoFun();
                this.nameNo='name3';
            }
        },
    },
    mounted () {
        this.getPutongInfo();
    }
}
</script>

<style scoped>

.tableBox{ height: calc(100vh - 304px); overflow-y: scroll;}
.content{ position:absolute; top: 54px; left: 240px; width: calc(100% - 240px); background: #EBF1F4; padding-left: 20px; box-sizing: border-box; height: calc(100vh - 54px); }
.addbtn{width: 100%; display: inline-block; margin-bottom: 16px;}
.addbtn button{ height: 36px; line-height: 36px; color: #ffffff; background: #037AFF; padding: 0 15px; border: none; font-size: 16px; margin: 20px 0;}
.tabbox{ background: #ffffff; padding: 10px 20px 20px; width: calc(100% - 20px); height: calc(100vh - 130px);  }
.pagebox{ background: #ffffff; text-align: center; padding: 30px 0 50px; width: calc(100% - 20px);}
.search{ width: 460px; float: right; margin-right: 20px; margin-top: 20px;}

.ivu-spin-fix{background: none;position: fixed;}
/* 旋转效果 */
.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
   from { transform: rotate(0deg);}
   50% { transform: rotate(180deg);}
   to { transform: rotate(360deg);}
}
</style>