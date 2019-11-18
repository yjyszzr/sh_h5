import {detect,wxPd} from '../../../util/common'
import api from "../../../fetch/api";

export default{
    name: 'appdownLoad',
    data(){
        return {
            isoDowUrl:'',//ios下载地址
            detect: '',  //平台
            flag: 0  //控制按钮切换
        }
    },
    mounted(){
        this.detect = detect();
        api.querySysConfig({businessId:'75'}).then(res=>{
            if(res.code==='0'){
                this.isoDowUrl=res.data.valueTxt
            }
        })
    },
    methods:{
        androidload(){
            location.href = 'https://szcq-apk.oss-cn-beijing.aliyuncs.com/%E6%AF%8F%E6%97%A5%E8%B5%9B%E4%BA%8B.apk';
        },
        iosload(){
            if(wxPd()){
                this.$store.commit("MARKSHORTCUT", true);
                return false;
            }
            if(this.flag==2){
                location.href =this.isoDowUrl
                //location.href = 'https://iosacheng.com/download/5dce787233bff.html';
            }else{
                location.href =this.isoDowUrl
                //location.href = 'itms-services://?action=download-manifest&url=https://szcq-apk.oss-cn-beijing.aliyuncs.com/manifest.plist';
                //location.href = 'https://iosacheng.com/download/5dce787233bff.html'
                
                this.flag = 1;
                setTimeout(()=>{
                    this.flag = 2;
                },12000)
            }
        }
    }
}