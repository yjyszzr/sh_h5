import api from '../../../fetch/api'
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
import Cropper from 'cropperjs'
import { MessageBox } from 'mint-ui'
export default {
    name: 'record',
    data () {
      return {
        headerImage:'',  
        picValue:'',  
        cropper:'',  
        croppable:false,  
        panel:false,  
        url:'',
        imgCropperData: {
            accept: "image/gif, image/jpeg, image/png, image/jpg"
        } 
      }
    },
    created(){
      
    },
    methods:{
        //取消上传
        cancel() {
            this.panel = false;
            var obj = document.getElementById('change') ; 
            obj.outerHTML=obj.outerHTML; 
        },
        //创建url路径
    getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) {
          // basic
          url = window.createObjectURL(file);
        } else if (window.URL != undefined) {
          // mozilla(firefox)
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
          // webkit or chrome
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
      },
      //input框change事件，获取到上传的文件
      change(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        let type = files[0].type; //文件的类型，判断是否是图片
        let size = files[0].size; //文件的大小，判断图片的大小
        if (this.imgCropperData.accept.indexOf(type) == -1) {
          Toast("请选择我们支持的图片格式！");
          return false;
        }
        if (size > 5242880) {
          Toast("请选择5M以内的图片！");
          return false;
        }
        this.picValue = files[0];
        this.url = this.getObjectURL(this.picValue);
        //每次替换图片要重新得到新的url
        if (this.cropper) {
          this.cropper.replace(this.url);
        }
        this.panel = true;
      },
      //确定提交
      commit() {
        this.panel = false;
        var croppedCanvas;
        var roundedCanvas;
        if (!this.croppable) {
          return;
        }
        // Crop
        croppedCanvas = this.cropper.getCroppedCanvas();
        // Round
        roundedCanvas = this.getRoundedCanvas(croppedCanvas);
        this.headerImage = roundedCanvas.toDataURL();
        //上传图片
        this.postImg();
      },
      //canvas画图
      getRoundedCanvas(sourceCanvas) {
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        var width = sourceCanvas.width;
        var height = sourceCanvas.height;
        canvas.width = width;
        canvas.height = height;
        context.imageSmoothingEnabled = true;
        context.drawImage(sourceCanvas, 0, 0, width, height);
        context.globalCompositeOperation = "destination-in";
        context.beginPath();
        context.arc(
          width / 2,
          height / 2,
          Math.min(width, height) / 2,
          0,
          2 * Math.PI,
          true
        );
        context.fill();
  
        return canvas;
      },
      //提交上传函数
      postImg() {
        Toast("上传成功");
        //这边写图片的上传
      },
        nickname(){
            MessageBox.prompt('',{
                title: '给自己取一个喜欢的昵称',
                message: '昵称取好后不能再修改',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                showCancelButton: true
            }).then(({ value, action }) => {
            },action => {

            })
        }
    },
    computed: {
        userInfo(){
            return this.$store.state.userInfo
        }
    },  
    watch: {
    },
    mounted(){
        //初始化这个裁剪框  
        var self = this;  
        var image = document.getElementById('image');  
        this.cropper = new Cropper(image, {  
        aspectRatio: 1,  
        viewMode: 1,  
        background:false,  
        zoomable:false,  
        ready: function () {  
            self.croppable = true;  
        }  
        });
    },
}