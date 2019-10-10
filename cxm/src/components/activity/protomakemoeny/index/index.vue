<template>
  <div id="protomakemoeny">
    <div class="bx">
      <!-- 头部 -->
      <header class="proto_head"></header>
      <!-- 模块body -->
      <section class="module-body">
        <!-- 模块1 -->
        <div class="m1">
          <div class="m1-l" @click="goInvitedFriends()">
            <img src="../img/touxiang@2x.png" alt />
            <p>邀请总人数(个)</p>
            <p>{{activityUserInfo.history_invitation_number?activityUserInfo.history_invitation_number>=10?activityUserInfo.history_invitation_number:activityUserInfo.history_invitation_number=='0'?'0':'0'+activityUserInfo.history_invitation_number:'0'}}</p>
          </div>
          <div class="m1-line"></div>
          <div class="m1-r" @click="goMygroincome()">
            <img src="../img/qian.png" alt />
            <p>我的总奖励金(元)</p>
            <p>{{activityUserInfo.history_total_withdrawable_reward||'0.0'}}</p>
            <transition name="fadeMovedown">
              <div class="moveBouns" v-show="bounsStatus==2||rybounsStatus">+{{totalMoneyAdd}}</div>
            </transition>
          </div>
        </div>
        <!-- 模块2 -->
        <div class="m2" v-if="acitvityBl.length>0">
          <div class="m-t" @click="ts('bl')">
            <img src="../img/zq-l.png" alt />
            <span>伯乐奖</span>
            <img src="../img/wen.png" alt />
          </div>
          <div class="m2-c">
            <div class="m2-progress" v-if="dq_pos.gear_position>0">
              <div class="m2-kuai-box">
                <div
                  class="m2-kuai"
                  :style="{left: `${activityUserInfo.invitation_number/dq_pos.gear_position>1?100:activityUserInfo.invitation_number/dq_pos.gear_position*100}%`}"
                >
                  <p>({{`${activityUserInfo.invitation_number}/${dq_pos.gear_position}`}})</p>
                  <img src="../img/wz.png" alt />
                </div>
              </div>
              <el-progress
                :percentage="activityUserInfo.invitation_number/dq_pos.gear_position>1?100:(activityUserInfo.invitation_number/dq_pos.gear_position)*100"
                status="exception"
              ></el-progress>
            </div>
            <img
              class="hb openBouns"
              @click="openBouns(dq_pos,'bl')"
              src="../img/hb.png"
              alt
              v-show="bounsStatus==1"
            />
            <img class="hb" src="../img/wzhb.jpg" alt v-show="bounsStatus==0" />
            <img class="hb" src="../img/kaij.jpg" alt v-show="bounsStatus==2" />
            <transition name="fadeMoveup">
              <div class="moveBouns" v-show="bounsStatus==2">+{{dq_pos.gear_position_money}}</div>
            </transition>
          </div>
          <div class="m2-b">
            <p
              v-if="bounsStatus==0"
            >已邀请{{activityUserInfo.invitation_number}}人,再邀请{{gear_pos.gear_position-activityUserInfo.invitation_number}}人可打开红包</p>
            <p
              v-if="bounsStatus==1||bounsStatus==2"
            >已邀请{{activityUserInfo.invitation_number}}人,可以打开红包</p>
            <p v-show="bounsStatus!=0">{{dq_pos.gear_position_money}}元</p>
          </div>
        </div>
        <!-- 模块3 -->
        <div class="m3" v-if="acitvityRy.length>0">
          <div class="m-t" @click="ts('ry')">
            <img src="../img/zq-l.png" alt />
            <span>荣耀奖</span>
            <img src="../img/wen.png" alt />
          </div>
          <div class="m3-c">
            <div class="m3-progress" v-if="acitvityRy.length>0">
              <div class="m3-kuai-box">
                <div class="m3-kuai" :style="{left: `${ryBfb}%`}">
                  <p>好友累计</p>
                  <p>购彩{{activityUserInfo.invitation_add_reward}}元</p>
                  <img src="../img/wz.png" alt />
                </div>
              </div>
              <el-progress :percentage="ryBfb" status="exception"></el-progress>
              <div class="m3-jdt">
                <div class="jdt-item" v-for="(item,i) of acitvityRy" :key="i">
                  <div class="jdt-item-t"></div>
                  <div
                    class="jdt-item-c"
                    :style="{color:Number(activityUserInfo.invitation_add_reward)>=Number(item.gear_position)?'#DF313F':'#979797'}"
                  >
                    <p>满{{rmbGsh(item.gear_position)}}元</p>
                    <p>奖{{item.gear_position_money}}元</p>
                  </div>
                  <div class="jdt-item-b">
                    <transition name="fadeMoveup">
                      <div class="moveBouns" v-show="item.show">+{{item.gear_position_money}}</div>
                    </transition>
                    <p v-show="item.is_status=='1'">已领取</p>
                    <img
                      class="openBouns"
                      @click="openBouns(item,'ry')"
                      v-show="!item.show&&item.is_status=='0'&&Number(activityUserInfo.invitation_add_reward)>=Number(item.gear_position)"
                      src="../img/dhb.png"
                      alt
                    />
                    <img class="hb" src="../img/kaij.jpg" alt v-show="item.show" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="m3-b">
            受邀好友累计购彩给您已带来
            <span>{{activityUserInfo.buy_add_reward}}元</span>奖励金
          </div>
        </div>
        <!-- 模块4 -->
        <div class="m4" v-if="flShow>0">
          <div class="m-t" @click="ts('fl')">
            <img src="../img/zq-l.png" alt />
            <span>返利奖</span>
            <img src="../img/wen.png" alt />
          </div>
          <div class="m4-c">
            <img src="../img/hb3.png" alt />
            <p>
              累计获得返利金额:
              <span>{{activityUserInfo.month_return_reward}} 元</span>
            </p>
          </div>
        </div>
        <!-- 模块5 -->
        <!-- <div class="m5">
                    
        </div>-->
        <!-- 模块6 -->
        <div class="m6" v-show="acitvityBl.length>0||acitvityRy.length>0||flShow>0">
          <div class="ml-t">
            <img src="../img/qr.png" alt />
            <p>温馨提示</p>
            <img src="../img/zq-l.png" alt />
          </div>
          <div class="m6-c">
            <p>*参与本次活动的用户请详细查阅单个活动奖励规则；</p>
            <p>*参与本活动的用户若发现作弊行为（如：虚假刷量，机器作弊，恶意套现等），将则视为作弊用户，平台有权取消用户参与资格，同时会冻结奖励和讨回已发奖金；</p>
            <p>*本活动最终解释权归圣和彩店所有</p>
          </div>
        </div>
        <!-- 暂无活动展示 -->
        <div class="nullAcStatus" v-show="acitvityBl.length<=0&&acitvityRy.length<=0&&flShow<=0">
          <img src="../img/zwhd.jpg" alt />
          <p>活动筹备中，敬请期待</p>
        </div>
      </section>
    </div>
    <!-- 底部 -->
    <footer class="proto_foot">
      <div class="pro-ft-l">
        <p @click="myercode()">我的二维码</p>
      </div>
      <div class="pro-ft-r">
        <p @click="share()">分享好友</p>
      </div>
    </footer>
    <!-- mark弹窗 -->
    <div class="pro-mark" v-show="markShow">
      <div class="ct-box">
        <div class="ct" v-if="jtype=='bl'">
          <div class="bl-m">
            <h3>伯乐奖规则说明</h3>
            <h4>* 活动介绍</h4>在活动期间内，邀请好友注册下载圣和彩店APP，
            <span>并且好友完成首充103元</span>，您可获得38现金奖励，被邀请好友同时可以获得68元购彩大礼包；
            <br />活动时间：
            <span>2019.08.29～2019.09.28</span>
            <br />
            <h4>* 奖励明细</h4>1.固定奖励：每成功邀请一人可获得38元现金奖励
            <br />2.额外奖励
            <br />
            <table>
              <tr>
                <td>累计邀请人数(人)</td>
                <td>额外加送奖励(元)</td>
              </tr>
              <tr v-for="(item,i) of acitvityBl" :key="i">
                <td>{{item.gear_position}}</td>
                <td>{{item.gear_position_money}}</td>
              </tr>
            </table>
            <i>例：假设邀请100人，可获得38x100+38+68+138+888+1888=6820元</i>
            <br />
            <h4>* 派奖说明</h4>1.邀请单个好友单笔充值103元，38元自动发放至您的总收益金账户，累计额外奖励需手动领取；
            <br />2.邀请好友获得的奖励可直接转入到APP可提现账户，用于购彩或提现；
            <br />3.累计人数奖励必须在活动时间内手动领取，过期未领则视为弃奖，系统予以清除，不予补发；
            <br />4.当累计邀请人数达到500人上限时，之后邀请的好友只有固定邀请奖励，额外奖励将不再派发；
            <br />
            <p>温馨提示：若有疑问，请联系官方客服咨询；</p>
            <p>微信号：wx13942240747</p>
            <p>本活动最终解释权归圣和彩店所有</p>
          </div>
        </div>
        <div class="ct" v-if="jtype=='ry'">
          <div class="ry-m">
            <h3>荣耀奖规则说明</h3>
            <h4>* 活动介绍</h4>在活动期间内，<span>邀请好友完成首充103元</span>，并且
            所有好友购彩金额达到以下档位时，可领取对应
            奖励；
            <br />活动时间：
            <span>2019.08.29～2019.09.28</span>
            <br />
            <h4>* 奖励明细</h4>
            <table>
              <tr>
                <td>好友累计购彩（元）</td>
                <td>额外对应奖励（元）</td>
              </tr>
              <tr v-for="(item,i) of acitvityRy" :key="i">
                <td>{{item.gear_position}}</td>
                <td>{{item.gear_position_money}}</td>
              </tr>
            </table><i>例：假设活动期间内您受邀的好友总计购彩金额达到100000元，您总计可领取30+158+318+1600+3500=5606元</i>
            <br />
            <h4>* 派奖说明</h4>1.好友累计购彩金额每达到对应奖励档位，您可领取对应现金奖励；
            <br />2.好友购彩奖励金必须在活动时间内手动领取，过期未领则视为弃奖，系统予以清除，不予补发；
            <br />3.若好友累计购彩金额达到奖励上限时，超出金额不再给予奖励；
            <br />
            <p>温馨提示：若有疑问，请联系官方客服咨询；</p>
            <p>微信号：wx13942240747</p>
            <p>本活动最终解释权归圣和彩店所有</p>
          </div>
        </div>
        <div class="ct" v-if="jtype=='fl'">
          <div class="fl-m">
            <h3>返利奖规则说明</h3>
            <h4>* 活动介绍</h4>在活动期间内，<span>邀请好友完成首充103元</span>，之后好
            友每次购彩，您可获得好友购彩金额的<span>2%</span>返利，
            返利无限制，好友购彩次数越多，您的返利奖励越多；
            <br />活动时间：
            <span>2019.08.29～2019.09.28</span>
            <br />
            <h4>* 派奖说明</h4>1.返利奖励实时到账，您可在我的累计收益(账户明细)中查看详情；
            <br />2.返利奖励只限于活动期内；
            <br />
            <p>温馨提示：若有疑问，请联系官方客服咨询；</p>
            <p>微信号：wx13942240747</p>
            <p>本活动最终解释权归圣和彩店所有</p>
          </div>
        </div>
        <div class="close" @click="close()">关闭</div>
      </div>
    </div>
  </div>
</template>

<script src='./script.js'>
</script>

<style lang='scss' src='./style.scss'>
</style>
