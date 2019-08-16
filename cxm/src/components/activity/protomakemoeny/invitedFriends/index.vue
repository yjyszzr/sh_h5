<template>
    <div id='invitedFriends'>
        <!-- 头部 -->
        <div class="inv-head">
            <div class="inv-h-l">
                <p>邀请总人数(个)</p>
                <p>{{invData.history_invitation_number?invData.history_invitation_number>=10?invData.history_invitation_number:invData.history_invitation_number=='0'?'0':'0'+invData.history_invitation_number:'0'}}</p>
            </div>
            <div class="inv-h-r" @click="hd_alert()">
                <p>累计总收益(元)<img src='../img/wenh.png' /></p>
                <p>{{invData.history_total_return_reward||'0.0'}}</p>
            </div>
        </div>
        <!-- 主体 -->
        <div class="inv-body">
            <div class="inv-b-box">
                <div class="inv-b-t">
                    受邀好友
                </div>
                <div class="inv-b-b">
                    <div class="inv-b-item" v-for="(item,i) of invData.accountList" :key='i'>
                        <dl>
                            <dt>
                                <img src="../img/txx.png" alt="">
                            </dt>
                            <dd>
                                <span>{{item.mobile}}</span>
                                <span>{{dateGsh(item.add_time)}}</span>
                            </dd>
                        </dl>
                        <p>+{{item.reward_money}}元</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 线 -->
        <div class="blx2">
            <span v-for="(item,i) of 28" :key="i"></span>
        </div>
    </div>
</template>

<script src='./script.js'>

</script>

<style lang='scss' src='./style.scss'>

</style>
