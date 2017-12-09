<template>
    <label class="mo-upload">
        <input type="file" :accept="accepts" @change="upload">
        <slot></slot>
    </label>
</template>
<style lang="less">
    .mo-upload {
        display: inline-block;
        position: relative;
        margin-bottom: 0;
        input[type="file"] {
            display: none;
        }
        .mo-upload--label {
            display: inline-block;
            position: relative;
        }
    }
</style>
<script>
    export default {
        name: 'upload-img',
        props: {
            accepts: { //允许的上传类型
                type: String,
                default : 'image/jpeg,image/jpg,image/png,image/gif'
            },
            flag: [String, Number], //当前上传标识,以便于在同一个监听函数中区分不同的上传域
            maxSize: {
                type : Number,
                default : 0 //上传大小限制
            }, 
        },
        methods: {
            upload (event) {
                let file = event.target.files[0];
                const self = this;
                const flag = this.flag;
                if (file) {
                    if (this.maxSize) {
                        if (file.size > this.maxSize) {
                        }
                        //todo filter file
                    }
                    //filter file, 文件大小,类型等过滤
                    //如果是图片文件
                    // const reader = new FileReader()
                    // const imageUrl = reader.readAsDataURL(file)
                    // img.src = imageUrl //在预览区域插入图片

                    const formData = new FormData();
                    formData.append('file', file);
                }
            }
        }
    };
</script>