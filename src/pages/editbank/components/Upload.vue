<template>
<div>
    <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index">
        <template v-if="item.status === 'finished'">
            <img :src="item.url">
            <div class="demo-upload-list-cover">
                <!-- <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon> -->
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
            </div>
        </template>
        <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
    </div>
    <Upload
        ref="upload"
        :show-upload-list="false"
        :default-file-list="defaultList"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        multiple
        type="drag"
        action="http://aaadmin3.rong298.cn/bank/bank"
        style="display: inline-block;width:120px;">
        <div style="width: 120px;height:120px;">
            <!-- <Icon type="ios-camera" size="20"></Icon> -->
            <img class="addimg" :src="iSrc" />
        </div>
    </Upload>
    <Modal title="View Image" v-model="visible">
        <!-- <img :src="'https://o5wwk8baw.qnssl.com/' + imgName" v-if="visible" style="width: 100%"> -->
        <img :src="this.$qurl+ imgName" v-if="visible" style="width: 100%">
    </Modal>
</div>
</template>
<script>
    export default {
        name: 'ImgUpload',
        data () {
            return {
                iSrc:'/static/images/imgupload.png',
                defaultList: [],
                imgName: '',
                visible: false,
                uploadList: [],
                imgurl:'',
            }
        },
        methods: {
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
                console.log("上传成功："+ JSON.stringify(this.$refs.upload.fileList));
                file.url = this.imgurl;
                file.name = file.name;
                this.$emit('func',this.imgurl)
                
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleBeforeUpload (file) {
                this.file = file
                const FileExt = this.file.name.replace(/.+\./, "");//取得文件的后缀名
                const reader = new FileReader() //读取文件的字符流
                reader.readAsDataURL(file)//将文件读取为 DataURL 以data:开头的字符串
                reader.onload = e => {
                    // const code = e.target.result;
                    // this.algorithmData.videoFiles = code
                    this.iSrc= e.target.result
                    this.$emit('func',this.iSrc)
                    //console.log("这个："+e.target.result);
                }
                
                return false;
            }
        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList;
        }
    }
</script>
<style>
    .demo-upload-list{ width: 120px; height: 120px;
        display: inline-block;
        text-align: center;
        overflow: hidden;
        background: #fff;
        position: relative;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
    .addimg{ width: 120px; height: 120px;}
</style>
