<template>
    <div>
        <div class="head">
            <div class="head-left">代呗3.0后台管理</div>
            <div class="head-right">
                <div class="gs-name">马甲科技有限公司</div>
                <div class="udiv" @click="perFun">用户名：{{user}}</div>
                <div class="exit" @click="exitFun"></div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'HomeHeader',
     data (){
        return{
            user:''
        }
    },
    methods: {
        getuser () {
            this.user = localStorage.getItem('loginuser')
        },
        exitFun () {
            var params={
                    action: 'logout'
                };
            this.api.apiPost('/admin/login', 'get', '', params, (status, code, res) => {
                if (status) {
                    this.$Message.success('退出成功');
                    localStorage.setItem('loginuser','');
                    window.sessionStorage.setItem('isLogin','false');
                    this.$router.push({
                        path: '/login',
                    })
                } else {
                    this.$Message.error('退出失败！');
                }
            });
        },
        perFun () {
            this.$router.push({
                path: '/personal',
            })
        }
    },
    mounted () {
        this.getuser();
    }
}
</script>

<style scoped>
.head{ width: 100%; height: 54px; background: #037AFF;}
.head-left{ color: #ffffff; font-size: 16px; float: left; line-height:54px; padding-left: 40px; }
.head-right{ float: right; color: #ffffff; font-size: 16px; line-height:54px; padding-right: 40px;}
.udiv{ float: left; margin: 0 30px; cursor: pointer;}
.gs-name{ float: left;}
.exit{ width: 24px; height: 24px; background: url(../../static/images/exet.png) no-repeat; float: left; margin-top: 15px; cursor: pointer;}
</style>