<template>
    <div class="run-chart">
        <!--头部开始-->
        <div class="head">
            <span class="back-img" @click="goBack()"><img src="../../../assets/img/ret.png" alt=""></span>
            <div class="head-text">
                <span>彩小秘·走势图</span>
            </div>
            <div>
                <span class="memu-btn" @click="runsetflag=!runsetflag"><img src="../images/TrendSetting@3x.png" alt=""></span>
            </div>
        </div>
        <ul class="runc-title">
            <li @click="tabClick(i)" :class="{active: i+1==daletouActive}" v-for="(item,i) in runchartTab" :key='i'>
                <span>{{item}}</span>
            </li>
        </ul>
        <section class="runc-box">
            <div class="kjhm" v-show="daletouActive==1">
                <div class="box-head">
                    <p>期号</p>
                    <p>开奖号码</p>
                </div>
                <ul class="box-content">
                    <li v-for="(item,i) in runchartData.lottoNums" :key='i'>
                        <p>{{item.termNum}}</p>
                        <p>
                            <span v-for="(data,index) in item.numList" :key='index'>
                                {{data}}
                            </span>
                        </p>
                    </li>
                </ul>
            </div>
            <div class="hqzs" v-show="daletouActive==2||daletouActive==3">
                <div class="hq-left">
                    <div class="hql-top">
                        期号
                    </div>
                    <div ref='hqlist' class="hql-list">
                        <div v-if="runchartData.preLottoDrop&&daletouActive==2">
                            <div class="hql-item" v-for="(item,i) in runchartData.preLottoDrop.drop" :key='i'>
                                {{item.termNum}}
                            </div>
                            <div class="hql-item countNum" v-show="runchartData.preLottoDrop.countNum.length>0">出现次数</div>
                            <div class="hql-item averageData" v-show="runchartData.preLottoDrop.averageData.length>0">平均遗漏</div>
                            <div class="hql-item maxData" v-show="runchartData.preLottoDrop.maxData.length>0">最大遗漏</div>
                            <div class="hql-item maxContinue" v-show="runchartData.preLottoDrop.maxContinue.length>0">最大连出</div>
                        </div>
                        <div v-if="runchartData.postLottoDrop&&daletouActive==3">
                            <div class="hql-item" v-for="(item,i) in runchartData.postLottoDrop.drop" :key='i'>
                                {{item.termNum}}
                            </div>
                            <div class="hql-item countNum" v-show="runchartData.postLottoDrop.countNum.length>0">出现次数</div>
                            <div class="hql-item averageData" v-show="runchartData.postLottoDrop.countNum.length>0">平均遗漏</div>
                            <div class="hql-item maxData" v-show="runchartData.postLottoDrop.countNum.length>0">最大遗漏</div>
                            <div class="hql-item maxContinue" v-show="runchartData.postLottoDrop.countNum.length>0">最大连出</div>
                        </div>
                    </div>
                </div>
                <div class="hq-right">
                    <table class="hqr-top" ref='hqrtop'>
                        <tr v-if="daletouActive==2">
                            <th class="hqr-nums" v-for="(item,i) in 35" :key='i'>
                                {{smjs(item)}}
                            </th>
                        </tr>
                        <tr v-if="daletouActive==3">
                            <th class="hqr-nums" v-for="(item,i) in 12" :key='i'>
                                {{smjs(item)}}
                            </th>
                        </tr>
                    </table>
                    <div class="hqr-content" ref='hqrct'>
                        <!-- 红球走势 -->
                        <table class="hqrctcontent" ref="hqrctcontent" v-if="runchartData.preLottoDrop&&daletouActive==2">
                            <tr v-for="(item,i) in runchartData.preLottoDrop.drop" :key='i'>
                                <td class="hqrct-item" v-for="(data,index) in item.numList" :key='index'>
                                    <span :class="{ylActive: data=='0'}">{{data=='0'?smjs(index+1):data}}</span>
                                </td>
                            </tr>
                            <tr class="countNum">
                                <td class="hqrct-item" v-for="(item,i) in runchartData.preLottoDrop.countNum" :key='i'>
                                    {{item}}
                                </td>
                            </tr>
                            <tr class="averageData">
                                <td class="hqrct-item" v-for="(item,i) in runchartData.preLottoDrop.averageData" :key='i'>
                                    {{item}}
                                </td>
                            </tr>
                            <tr class="maxData">
                                <td class="hqrct-item" v-for="(item,i) in runchartData.preLottoDrop.maxData" :key='i'>
                                    {{item}}
                                </td>
                            </tr>
                            <tr class="maxContinue">
                                <td class="hqrct-item" v-for="(item,i) in runchartData.preLottoDrop.maxContinue" :key='i'>
                                    {{item}}
                                </td>
                            </tr>
                        </table>
                        <!-- 蓝球走势 -->
                        <table class="hqrctcontent lqrctcontent" ref="hqrctcontent" v-if="runchartData.postLottoDrop&&daletouActive==3">
                            <tr v-for="(item,i) in runchartData.postLottoDrop.drop" :key='i'>
                                <td class="hqrct-item" v-for="(data,index) in item.numList" :key='index'>
                                    <span :class="{dlActive: data=='0'}">{{data=='0'?smjs(index+1):data}}</span>
                                </td>
                            </tr>
                            <tr class="countNum">
                                <td class="hqrct-item" v-for="(item,i) in runchartData.postLottoDrop.countNum" :key='i'>
                                    {{item}}
                                </td>
                            </tr>
                            <tr class="averageData">
                                <td class="hqrct-item" v-for="(item,i) in runchartData.postLottoDrop.averageData" :key='i'>
                                    {{item}}
                                </td>
                            </tr>
                            <tr class="maxData">
                                <td class="hqrct-item" v-for="(item,i) in runchartData.postLottoDrop.maxData" :key='i'>
                                    {{item}}
                                </td>
                            </tr>
                            <tr class="maxContinue">
                                <td class="hqrct-item" v-for="(item,i) in runchartData.postLottoDrop.maxContinue" :key='i'>
                                    {{item}}
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div class="hq_hot" v-show="daletouActive==4||daletouActive==5">
                <ul class="hq_hotTitle">
                    <li>号码</li>
                    <li>30期</li>
                    <li>50期</li>
                    <li>100期</li>
                    <li>遗漏</li>
                </ul>
                <div class="hq_hotContent">
                    <div class="hq_hotList"  v-if="daletouActive==4">
                        <div class="hq_item" v-for="(item,i) in runchartData.preHeatColds" :key='i'>
                            <p>{{smjs(item.num)}}</p>
                            <p>{{item.countA}}</p>
                            <p>{{item.countB}}</p>
                            <p>{{item.countC}}</p>
                            <p>{{item.drop}}</p>
                        </div>
                    </div>
                    <div class="hq_hotList" v-if="daletouActive==5" style="border-bottom:1px solid #f0f0f0;">
                        <div class="hq_item" v-for="(item,i) in runchartData.postHeatColds" :key='i'>
                            <p style="color:#0081cc;">{{smjs(item.num)}}</p>
                            <p>{{item.countA}}</p>
                            <p>{{item.countB}}</p>
                            <p>{{item.countC}}</p>
                            <p>{{item.drop}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <footer class="runc-foot">
            <div class="kj-foot" v-if="daletouActive==1&&runchartData.stopTime">
                第{{runchartData.stopTime.split('|')[0]}}期&nbsp;&nbsp;&nbsp;截止时间 {{runchartData.stopTime.split('|')[1]}}
            </div>
            <div class="hz-foot" v-show="daletouActive==2||daletouActive==3||daletouActive==4||daletouActive==5">
                <div class="hz-footTop">
                    <div class="tab-box">
                        <div class="xh">选号</div>
                        <div class="tab" ref="tab">
                            <div class="tab_content" ref="tabcontent">
                                <div @click="tabsClick($event,'h')" class="tab_item" v-for="item in 35" :key='item'>
                                    {{smjs(item)}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-box">
                        <div class="xh">选号</div>
                        <div class="tab" ref="stab">
                            <div class="tab_content" ref="stabcontent">
                                <div @click="tabsClick($event,'l')" class="tab_item" v-for="(item,i) in 12" :key='i'>
                                    {{smjs(item)}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hz-footBottom">
                    <div class="hz-fbleft">
                        <div class="hz-delete" @click="clearNums()">
                            <i class="iconfont icon-icon-26"></i>
                        </div>
                        <div class="hz-text" v-html="text">
                            
                        </div>
                    </div>
                    <button @click="goTouzhu()" class="hz-fbright" :disabled='disabled' :style="{'background':disabled?'#ccc':'#ea5504'}">
                        确定
                    </button>
                </div>
            </div>
        </footer>
        <transition name='fade'>
            <div class="runchart-mark" v-if="runsetflag" @touchmove.prevent>
                <div class="runchart-set">
                    <div class="run-setTitle">
                        彩小秘·走势图设置 
                    </div>
                    <div class="run-setContent">
                        <mt-radio
                        title="期数"
                        v-model="qsValue"
                        :options="['30期', '50期', '100期']">
                        </mt-radio>
                        <mt-radio
                        title="遗漏"
                        v-model="ylValue"
                        :options="['显示遗漏', '隐藏遗漏']">
                        </mt-radio>
                        <mt-radio
                        title="统计"
                        v-model="tjValue"
                        :options="['显示统计', '隐藏统计']">
                        </mt-radio>
                        <mt-radio
                        title="排序"
                        v-model="pxValue"
                        :options="['正序排列', '倒序排列']">
                        </mt-radio>
                        <p>走势图底部出现次数等于统计数</p>
                    </div>
                    <div class="run-setFooter">
                        <p @click="confirmClick()">确定</p>
                        <p @click="runsetflag=!runsetflag">取消</p>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<style lang='scss' src='./style.scss'>

</style>
<script src='./script.js'>

</script>

