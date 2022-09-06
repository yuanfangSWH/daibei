<template>
    <div class="content">
        <div class="logo"><img src="../../../static/images/logo.png" /></div>
        <div class="loginbox01"></div>
        <div class="loginbox02">
            <div class="login-main">
                <h2 class="login-title">管理登录</h2>
                <ul class="login-ul">
                    <li><div class="login-div01"><span class="i-01"></span><Input class="login-ipt01" v-model="user" type="text" placeholder="请输入手机号" /></div></li>
                    <li><div class="login-div01"><span class="i-02"></span><Input class="login-ipt01" v-model="pwd" type="password" placeholder="请输入密码"/></div></li>
                    <li><div class="login-div02"><span class="i-03"></span><Input class="login-ipt02" v-model="yzcode" style="margin-top:2px;" type="text" placeholder="请输入验证码" /><a class="yzm" @click="changeyzm" href="javascript:;"><img class="yzmimgs" /></a></div></li>
                    <li><Button class="login-btn" type="primary" @click="loginFun">登录</Button></li>
                    <li><div class="login-div03"><Checkbox v-model="single" @on-change="saveFun">记住我的登录</Checkbox></div></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import qs from 'qs';
import $ from 'jquery';
export default {
    name: 'Login',
    data (){
        return{
            yzmimg:'',
            user:'',
            pwd:'',
            yzcode:'',
            single:false
        }
    },
    methods: {
        getyzm () {
            var params={
                    action: 'verification'
                };
            this.api.apiPost('/admin/login', 'get', '', params, (status, code, res) => {
                if (status) {
                    var imgurl = res.data;
                    $(".yzmimgs").attr('src',imgurl);
                } else {
                    this.$Message.error(''+res.msg);
                }
            });
        },
        changeyzm () {
            this.getyzm();
        },
        loginFun () {
            var params = {
                action: 'signin'
            };
            var data = qs.stringify({
                username: this.user,
                password: this.pwd,
                authnum: Number(this.yzcode)
            });
            this.api.apiPost('/admin/login', 'post', data, params, (status, code, res) => {
                if (status) {
                    this.$Message.success('登录成功');
                    localStorage.setItem('loginuser',this.user);
                    window.sessionStorage.setItem('isLogin','true');
                    this.$router.push({
                        path: '/Home',
                    })
                } else {
                    this.$Message.error(''+res.msg);
                    this.getyzm();
                }
            });
        },
        weizhi () {
            var w01 = $(window).width();
            $('.loginbox01').css({
                "left": (w01-551)/2
            });
            $('.loginbox02').css({
                "left": (w01-520)/2
            });
            $(window).resize(function() {
                var w01 = $(window).width();
                $('.loginbox01').css({
                    "left": (w01-551)/2
                });
                $('.loginbox02').css({
                "left": (w01-520)/2
            });
            })
        },
        //设置cookie
        setCookie(c_name,c_pwd,exdays) {
            var exdate=new Date();//获取时间
            exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
            //字符串拼接cookie
            window.document.cookie="userName"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
            window.document.cookie="userPwd"+"="+c_pwd+";path=/;expires="+exdate.toGMTString();
        },
        //读取cookie
        getCookie:function () {
            if (document.cookie.length>0) {
                this.single = true;
                var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
                for(var i=0;i<arr.length;i++){
                    var arr2=arr[i].split('=');//再次切割
                    //判断查找相对应的值
                    if(arr2[0]=='userName'){
                        this.user=arr2[1];//保存到保存数据的地方
                    }else if(arr2[0]=='userPwd'){
                        this.pwd=arr2[1];
                    }
                }
            }
        },
        //清除cookie
        clearCookie:function () {
            this.setCookie("","",-1);//修改2值都为空，天数为负1天就好了
        },
        saveFun (e) {
            var name = this.user;
            var pass = this.pwd;
            if( e === true){
                this.setCookie(name,pass,30);
            }else{
                this.setCookie("","",-1);//清除cookie
            }
        }
    },
    mounted () {
        this.getyzm();
        this.weizhi();
        this.getCookie();
    }
}
</script>

<style scoped>
.logo{ float: left; margin: 50px 0 0 50px;}
.content{ width: 100%; height: 100vh; background: url(../../../static/images/bg.jpg) no-repeat left center; background-size: 100% 100vh; position: relative;}
.loginbox01{ position:absolute; top: 240px; z-index: 1; width: 551px; height: 506px; background:rgba(255,255,255,1);box-shadow:0px 8px 14px 1px rgba(54,106,177,0.08);opacity:0.23;border-radius:10px;} 
.loginbox02{ width: 520px; height: 476px; background: #ffffff;position:absolute; top: 254px; z-index: 2;border-radius:10px;}
.login-main{ width: 400px; padding: 32px 60px 42px;}
ul, ul li{ list-style: none;}
.login-title{ width: 400px; border-bottom: 1px solid #EBEBEB; text-align: center; padding-bottom: 20px; margin-bottom: 36px; font-size:30px;font-family:PingFang SC;font-weight:bold;color:rgba(34,136,208,1);}
.login-ul li{ margin-bottom: 22px;}
.login-div01{ width:360px;height:50px;background:rgba(230,246,255,1);border:1px solid rgba(235,235,235,1);border-radius:25px; display: flex; padding: 11px 20px; margin-left: 20px;}
.login-div02{width:360px;height:50px;background:rgba(255,255,255,1);border:1px solid rgba(235,235,235,1);border-radius:25px; display: flex; padding: 10px 20px; margin-left: 20px;}
.i-01{ width: 22px; height: 22px; background:  url(../../../static/images/icon1.png) no-repeat;}
.i-02{ width: 20px; height: 20px; background:  url(../../../static/images/icon2.png) no-repeat; margin-top: 1px;}
.i-03{ width: 18px; height: 18px; background:  url(../../../static/images/icon3.png) no-repeat; margin-top: 3px;}
.login-ipt01,.login-ipt02{ flex: 1;}
.login-ul li >>> .ivu-input{ border: none !important; background: none !important; height: 22px; line-height: 22px; font-size: 14px;}
.login-ul li >>> .ivu-input:focus{ border: none;box-shadow:none;}
.yzm{ width: 67px; height: 30px; background: #ffffff;}
.yzm img{ width: 67px; height: 30px;}
.login-ul li >>> .login-btn{ width: 360px; margin-left: 20px;background:rgba(3,122,255,1);border-radius:25px; height: 50px;font-size: 18px;}
.login-div03{ margin-left: 20px; color: #A9B6C9; font-size: 14px;}
</style>