import api from '../../../../fetch/api'
import {Indicator, Toast} from 'mint-ui'
export default {
    name: 'popupLeft',
    data(){
        return {
            value: '',
            list: []
        }
    },
    beforeCreate() {
        Indicator.open()
    },
    methods:{
        popClick(c){
            this.$router.go(-1)
            this.$store.state.pop = c
            // sessionStorage.setItem('pop',JSON.stringify(c))
        },
        fetchData(){
            api.getChannelList({
                channelName: this.value
            })
            .then(res => {
                if (res.code == 0) {
                    res.data.forEach(item => {
                        let obj = {}
                        obj.name = item.channelName
                        obj.id = item.channelId
                        this.list.push(obj)
                    });
                }
            })
        }
    },
    mounted(){
        document.title='选择所在店铺'
        this.fetchData()
    },  
    watch:{
        value(a,b){
            if(a!==''){
                this.list = []
                this.fetchData()
            }else{
                if(b.split('').length==1){
                    this.list = []
                    this.fetchData()
                }
            }
        }
    }
    // computed: {  
    //     filteredData: function () {  
    //         var self = this;  
    //         return this.list.filter(function (item) {  
    //             return item.name.indexOf(self.value) !== -1;  
    //         }) 
    //     }  
    // }  
}