<template>
    <div class="yq-bouns">
        <div class="yq-top">
            <img src="../img/bg.jpg" alt="">
        </div>
        <div class="bouns">
            <img src="../img/bouns.jpg" alt="">
            <div class="yq-news">
                <p>
                    成功邀请
                    <span v-for="(item,i) in oldObj.invitationNum.split('')" :key='i'>{{item}}</span>
                    人 
                </p>
                <p>
                    赚取现金
                     <span v-for="(item,i) in oldObj.reward.split('')" :key='i'>{{item}}</span>
                    元 
                </p>
            </div>
            <div class="yq-text">
                <p>
                    每邀请一人可得20元现金奖励
                </p>
                <p>
                    还有额外奖励等着您
                </p>
            </div>
        </div>
        <div class="bounsSm">
            <div class="bounsSm-title">
                奖励说明
            </div>
            <ul>
                <li>
                    <img src="../img/hbouns.jpg" alt="">
                    <p>
                        <span>好友注册</span>
                        <span>好友获得100元红包</span>
                    </p>
                </li>
                <li>
                    <img src="../img/twobouns.jpg" alt="">
                    <p>
                        <span>好友购彩后</span>
                        <span>您可得20元奖励</span>
                    </p>
                </li>
                <li>
                    <img src="../img/otherbouns.jpg" alt="">
                    <p>
                        <span>多多益善</span>
                        <span>邀请越多奖励越多</span>
                    </p>
                </li>
            </ul>
        </div>
        <div class="bouns-progress">
            <div class="pbtitle"> 
                邀请越多 额外奖励越多
            </div>
            <div class="pbcontent">
                <div class="bounsNum">
                    <div class="num-item" v-for="(item,i) in nums" :key='i'>
                        <img src="../img/pbouns.png" alt="">
                        <span>{{item}}</span>
                    </div>
                </div>
                <div class="pro-step">
                    <div class="range">
                        <div class="range-item" v-for="(item,i) in nums" :key='i'>
                            <span ref="numsItem"></span>
                        </div>
                    </div>
                    <div class="gs-num">
                        <el-progress v-for="(item,i) in numList" :key='i' :text-inside="true" :stroke-width="18" :percentage="Number(item)"></el-progress>
                    </div>
                </div>
                <div class="pro-pop">
                    <span>10人</span>
                    <span>20人</span>
                    <span>30人</span>
                    <span>40人</span>
                    <span>50人</span>
                    <span>100人</span>
                </div>
            </div>
        </div>
        <div class="rule-descr">
            <div class="rule-title">
                规则说明
            </div>
            <div class="rule-content">
                1. 分享到微信、朋友圈或直接分享链接，好友点击注册，并有30元累计购彩行为，邀请人即可获得20元红包，邀请人数不限。<br />
                2. 好友注册后立即获得100元优惠券，累计购彩满30元后，邀请人可立即获得奖励红包，奖励红包直接发放账户余额内。<br />
                3. 邀请人数达到对应级别即可获得额外奖励，额外奖励明细如下：<br />
                额外奖励 <br />
                10人 20人 30人 40人 50人 100人 <br />
                15元 35元 50元 70元 80元 200元 <br />
                额外奖励最高为100人，奖励区间可兼得。<br />
                例如：A用户邀请10人并且邀请的10人均有购彩满30元，A用户将获得15元额外奖励加邀请奖励为215元，以此类推，如果A用户邀请满100人且均有购彩满30元，A用户将获得所有额外奖励及邀请人数奖励为2450元。<br />
                4. 邀请好友所得现金红包仅限于购彩不可提现，中奖奖金可以提现。<br />
                5. 邀请的好友仅限新注册用户（手机号未注册过） 同一设备仅能参与一次。<br />
                6. 如发现恶意注册等作弊行为，将冻结该账户。<br />
                7.本活活动最终解释权归平台所有。
            </div>
        </div>
        <div class="lqbth" @click="fx()">
            <img src="../img/lqbtn.png" alt="">
        </div>
        <transition name="fade">
            <div @click="markflag=!markflag" class="yq-mark" @touchmove.prevent v-if="markflag">
                <img src="../img/yqmb.jpg" alt="">
            </div>
            <div class="zdl zdl-mark" @touchmove.prevent v-if="zdlflag">
                <div class="zdl-text">
                    <div class="zdl-title">请手动复制链接</div>
                    <p>{{geturl()}}</p>
                    <div @click="zdlflag=!zdlflag" class="zl-btn">我知道了</div>
                </div>
            </div>
        </transition>
    </div>
</template>
<style lang='scss' src='./style.scss'>

</style>
<script src='./script.js'>

</script>


