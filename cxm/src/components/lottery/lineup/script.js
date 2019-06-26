import api from '../../../fetch/api'
export default {
    name: 'lineup',
    data(){
        return {
            lineupinfo: {},
            h_goalkeeper: [],
            h_guard:[],
            h_halfback:[],
            h_centreHalfback: [],
            h_tackle: [],
            v_goalkeeper: [],
            v_guard:[],
            v_halfback:[],
            v_centreHalfback: [],
            v_tackle: [],
            defaultList: ['L','CL','C','CR','R']
        }
    },
    mounted(){
        let data = {
            "matchId":this.$route.query.id
        }
        api.lineupinfo(data)
        .then(res => {
            if (res.code == 0) {
                this.lineupinfo = res.data
                let h_guard = [],h_halfback=[],h_centreHalfback=[],h_tackle=[],
                    v_guard = [],v_halfback=[],v_centreHalfback=[],v_tackle=[]
                let that = this
                function lt(list,frt,type){
                    that.defaultList.forEach(item=>{
                        list.forEach(elememt=>{
                            if(item==elememt.positionY){
                                if(type=='h'){
                                    frt.unshift(elememt)
                                }else{
                                    frt.push(elememt)
                                }
                            }
                        })
                    })
                }
                res.data.hlineupPersons.forEach(item => {
                    if(item.positionX=='GK'){
                        this.h_goalkeeper.push(item)
                    }else if(item.positionX=='D1'||item.positionX=='D2'){
                        h_guard.push(item)
                    }else if(item.positionX=='DM'||item.positionX=='M'){
                        h_halfback.push(item)
                    }else if(item.positionX=='AM'){
                        h_centreHalfback.push(item)
                    }else if(item.positionX=='A'){
                        h_tackle.push(item)
                    }
                });
                lt(h_guard,this.h_guard,'h')
                lt(h_halfback,this.h_halfback,'h')
                lt(h_centreHalfback,this.h_centreHalfback,'h')
                lt(h_tackle,this.h_tackle,'h')
                res.data.alineupPersons.forEach(item => {
                    if(item.positionX=='GK'){
                        this.v_goalkeeper.push(item)
                    }else if(item.positionX=='D1'||item.positionX=='D2'){
                        v_guard.push(item)
                    }else if(item.positionX=='DM'||item.positionX=='M'){
                        v_halfback.push(item)
                    }else if(item.positionX=='AM'){
                        v_centreHalfback.push(item)
                    }else if(item.positionX=='A'){
                        v_tackle.push(item)
                    }
                });
                lt(v_guard,this.v_guard,'k')
                lt(v_halfback,this.v_halfback,'k')
                lt(v_centreHalfback,this.v_centreHalfback,'k')
                lt(v_tackle,this.v_tackle,'k')
            }
        })
    }
}