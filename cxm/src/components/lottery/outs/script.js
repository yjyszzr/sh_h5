import api from "../../../fetch/api"
    export default {
        name: "outs",
        props:[
            'matchInfo',
            'matchLiveStatisticsDTO',
            'res',
            'eventList'
        ],
        data(){
            return{
                
            }
        },
        created(){
            
        },
        methods:{
            //计算个数比例
           filt(item,num){

               if(item.dataType=="0"){
                   if(num!=''){
                       return ((num/(Number(item.teamAData)+Number(item.teamHData)))*100+'%')+""
                   }else {
                       return '0%'
                   }
               }else {
                   if(num == ''){
                     return '0%'
                   }
                   return num+""
               }
           }
        }
    }