<template>
    <div class="content">
        <div class="addbtn">
            <router-link to="/banner/addbanner"><button>添加banner</button></router-link>
            <!-- <router-link to="/banner/ceshiadd"><button>添加测试</button></router-link> -->
        </div>
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
    name: 'Bannerlist',
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
                        title: '素材',
                        key: 'poster_url',
                        align: 'center',
                        render: (h, params) => {
                             //console.log("这里的图片路径："+params.row.bank_img);
                            return h('img', {
                                style: {//设置样式
                                    width: '260px',
                                    height: '65px',
                                    margin: '8px 0 ',
                                },
                                attrs: {//设置属性
                                    src: params.row.poster_url
                                }
                            });
                        }
                    },
                    {
                        title: '介绍',
                        key: 'poster_text',
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
                        key: 'rank',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
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
                                                path: '/banner/editbanner',
                                                name: 'Editbanner',
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
                allbank:[],
                banksname:'',
                i: 0
        }
    },
    methods: {
        getBbsListInfo () {
            var _this=this;
            var params = {
                action: 'getBannerAll',
                page: this.pageNum,
            };
            _this.api.apiPost('/system/banner', 'get', '', params, (status, code, res) => {
                if (code==200) {
                    _this.data1 = res.data.notice;
                    _this.pagesinfo = res.data.pages;
                    _this.pageSize = _this.pagesinfo.defaultPageSize;
                    _this.infoTotal01 = parseInt(_this.pagesinfo.totalCount);
                } else {
                    console.log("获取数据失败");
                    this.$Message.error(res.msg);
                }
            });
        },
        handlePage(value) {
            this.pageNum = value
            this.getBbsListInfo()
        },
        handlePage2(value) {
            this.pageNum = value
            this.getShenhe();
        },
        handlePage3(value) {
            this.pageNum = value
            this.getRecycle();
        },
        //是否删除对话框(上架中的)
        confirm (index, val) {
            this.$Modal.confirm({
                render: (h) => {
                    return h('span', {
                        class:'reConfirm',  
                    },'确定要删除吗？')
                },
                onOk: () => {
                    let tid = val;
                    var params = {
                        action: 'del',
                    };
                    var data= qs.stringify({
                            banner_id: tid
                        })
                    this.api.apiPost('/system/banner', 'post', data, params, (status, code, res) => {
                        if (code==200) {
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
        
        tabClick (data) {
            if(data == 'name1'){
                this.pageNum=1;
                this.getBbsListInfo();
                this.nameNo='name1';
            }
        },
    },
    mounted () {
        this.getBbsListInfo();
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