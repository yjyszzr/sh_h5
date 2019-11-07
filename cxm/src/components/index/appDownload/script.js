import {detect,wxPd} from '../../../util/common'
export default{
    name: 'appdownLoad',
    data(){
        return {
            detect: '',  //平台
            flag: 0  //控制按钮切换
        }
    },
    mounted(){
        this.detect = detect();
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
                location.href = 'http://www.jqdk168.com:3130/download/config?appId=ff2cb06a-ec15-4a5e-a723-60a5398c8cb8';
            }else{
                //location.href = 'itms-services://?action=download-manifest&url=https://szcq-apk.oss-cn-beijing.aliyuncs.com/manifest.plist';
                location.href = 'http://www.jqdk168.com:3130/download/config?appId=ff2cb06a-ec15-4a5e-a723-60a5398c8cb8'
                
                this.flag = 1;
                setTimeout(()=>{
                    this.flag = 2;
                },12000)
            }
        }
    }
}