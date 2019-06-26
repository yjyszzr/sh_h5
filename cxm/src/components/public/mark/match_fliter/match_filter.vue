<template>
            <!-- 赛事筛选 -->
            <div class="matchFilter">
                <div class="match_f" v-if='$store.state.mark_showObj.mark_show_type == 2'>
                    <div class="ft_title">
                        赛事筛选
                    </div>
                    <ul class="ft_selected">
                        <li @click="allFilter()">全选</li>
                        <li @click="reserveFilter()">反选</li>
                        <li @click="hotFilter()">仅五大联赛</li>
                    </ul>
                    <ul class="matchTeam">
                        <div class="nullStatus" v-if="matchFilterList.length<=0">
                                <mt-spinner type="snake" color="#ea5504"></mt-spinner>
                        </div>
                        <li :class="$store.state.mark_showObj.leagueIds.split(',').indexOf(item.leagueId)!=-1?'filterActive':''" v-for='(item,i) in matchFilterList' :key='i' ref='match_name' @click="team(i)">{{item.leagueAddr}}</li>
                    </ul>
                    <div class="confim_btn">
                        <p @click='confim()'>确定</p>
                        <p @click="cancel()">取消</p>
                    </div>
                </div>
                <v-time v-if="$store.state.mark_showObj.mark_show_type == 1"></v-time>
            </div>
</template>


<script src='./script.js'>

</script>


<style lang='scss' src='./style.scss'>

</style>

