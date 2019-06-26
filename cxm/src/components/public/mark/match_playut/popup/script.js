import {Toast} from 'mint-ui'
export default {
    name: 'popup',
    data(){
        return{
          mapArr: [5,10,20,50,100],
          numList: [1,2,3,4,5,6,7,8,9,'',0,''],
          mup: this.$store.state.mark_playObj.mupNum,
          firstNum: 0,
        }
    },
    methods:{
      closeMark(){
          this.firstNum = 0
          //this.mup = '5'  
         this.$emit('closeMarkCz')
      },
      mupNumber(c,s){
         this.mup = c+''
         this.firstNum = 0
         this.tapactive(s)
      },
      tapactive(s){
        s.target.className = 'tapActive'
        setTimeout(()=>{
          s.target.className = ''
        },150)
      },
      numClick(c,s){
        if(c!==''){
          if(c!==0){
            this.firstNum++
          }
          if(this.firstNum==1){
            if(c!==0){
              this.mup = c+''
              this.firstNum++
            }
          }else if(this.firstNum>1){
            if(this.mup.length>4){
              Toast('最大投注倍数为99999')
            }else{
              this.mup = this.mup+''+c
            }
          }
          this.tapactive(s)
        }
      },
      deleteNum(s){
        // basic = basic.substr(0, basic.length - 1);
        this.mup = this.mup.substr(0, this.mup.length - 1)
        if(this.mup===''){
        	this.firstNum = 0
        }
        this.tapactive(s)
      },
      confirm_num(){
        if(this.mup === ''){
          this.mup = '1'
        }
        this.$store.state.mark_playObj.mupNum = this.mup
          this.$emit('closeMarkCz')
      },
    },
    mounted(){
      
    }
  }