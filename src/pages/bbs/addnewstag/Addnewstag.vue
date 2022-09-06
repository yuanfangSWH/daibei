<template>
    <div class="content">
        <div class="addbtn"><router-link to="/bbs/Newstag"><button>返回</button></router-link></div>
        <div class="addpage-box">
            <div class="add-title">头条标签添加</div>
            <ul class="add-ul">
                <li>
                    <span class="t-name">标签名</span><input class="t-ipt" v-model="tagname" type="text" placeholder="请输入银行标签名称" />
                </li>
                <li>
                    <span class="t-name">排序</span><input class="t-ipt" v-model="tagrank" type="text" placeholder="请输入排序" /><div class="demo-nav">必填</div>
                </li>
                <li>
                    <span class="t-name"></span><button class="t-btn" @click="addNewsktag">保存</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import qs from 'qs';
export default {
    name: 'Addnewstag',
    data (){
        return{
            tagname:'',
            tagrank:'',
        }
    },
    methods: {
        addNewsktag () {
            var params = {
                    action: 'add'
                };
            var data= qs.stringify({
                     value: {
                        tag_name: this.tagname,
                        rank: this.tagrank,
                        }
                })
            this.api.apiPost('/news/tags', 'post', data, params, (status, code, res) => {
                if (status) {
                    this.$Message.success('添加成功！');
                    this.$router.push({
                        path: '/bbs/Newstag',
                    })
                } else {
                    this.$Message.error('添加失败！');
                }
            });
        }
    },
    mounted () {
        
    }
}
</script>

<style scoped>
ul li{ list-style: none;}
.content{ position:absolute; top: 54px; left: 240px; width: calc(100% - 240px); background: #EBF1F4; padding-left: 20px; box-sizing: border-box; height: calc(100vh - 54px); }
.addbtn button{ height: 36px; line-height: 36px; color: #ffffff; background: #037AFF; padding: 0 15px; border: none; font-size: 16px; margin: 20px 0;}
.addpage-box{ width: calc(100% - 20px); background: #ffffff}
.add-title{ width: 100%; border-bottom: 1px solid #E7E9EA; box-sizing: border-box; padding: 12px 20px; font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(0,0,0,1);}
.add-ul{ padding: 30px 50px;}
.add-ul li{ margin-bottom: 40px;}
.t-name{ width: 60px; font-size:14px;font-family:PingFang-SC-Medium;font-weight:500;color:rgba(0,0,0,1); float: left; height: 40px; display: block; line-height: 40px;}
.t-ipt{ width: 280px; height: 40px;background:rgba(255,255,255,1);border:1px solid rgba(180,180,180,1); padding: 5px 10px;font-size:14px;}
.t-btn{width:280px;height:40px;background:rgba(3,122,255,1);border-radius:2px; border: none; color: #ffffff; font-size: 14px; font-weight: 500;}
.demo-nav{ color: #888; font-size: 12px; display: inline-block; margin-left: 10px; line-height: 40px;}
</style>