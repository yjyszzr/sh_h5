export default {
    name: 'detail',
    data () {
      return {
          dFlag: '1',
          isFixed: false
      }
    },
    props:[
    	'leagueMatchAsias','leagueMatchEuropes','leagueMatchDaoxiaos'
    ],
    created(){
      
    },
    mounted(){
        // document.querySelector('#content').addEventListener('scroll',this.handleScroll)
    },
    methods:{
       deTailTab(c,s){
       	$('.odd_cur').removeClass('odd_cur')
       	c.target.parentElement.className = 'odd_cur'
       	this.dFlag = s
       },
    //    handleScroll(e){
    //        if(e.target.scrollTop>200){
    //         this.isFixed = true
    //        }else{
    //         this.isFixed = false
    //        }
    //    }
    },
}