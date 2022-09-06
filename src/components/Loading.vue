<template>
    <div>
        <Col class="demo-spin-col" span="8" v-show="isSpinShow">
            <Spin fix>
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
        </Col>
    </div>
</template>
<script>
export default {
    name: 'LoadIng',
    data(){
        return{
            isSpinShow:false,
        }
    }
}
</script>
<style>
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