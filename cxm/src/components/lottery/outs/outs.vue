<template>
    <div class="main-body">
        <div class="event">
            <p class="title"> <i class="vertical-line"></i>事件</p>
            <div>
                <div class="event-box">
                    <!--进程图-->
                    <div class="event-list" v-if="res.eventList.length>0">
                        <div class="img-star-box">
                            <img class="img-star" src="./images/star@3x.png" alt="">
                        </div>
                        <div class="tree-ul" v-for="(item,index) in eventList" :key=index>
                            <p class="line-one"></p>
                            <div class="tree-li">
                                <div class="left-box">
                                    <template v-if='item.isHa == "h"'>
                                        <div class="event-card">
                                            <!--红盘-->
                                            <img v-show='item.eventCode == "RC"' class="card-img" src="./images/redcard_2@3x.png" alt="">
                                            <!--黄盘-->
                                            <img v-show='item.eventCode == "YC"' class="card-img" src="./images/Yellowcard_2@3x.png" alt="">
                                            <!--二黄变红-->
                                            <img v-show='item.eventCode == "Y2C"' class="card-img" src="./images/Redden@3x.png" alt="">
                                            <!--换上-->
                                            <img v-show='item.eventCode == "SI"' class="up-down-img " src="./images/Play_2@3x.png" alt="">
                                            <!--换下-->
                                            <img v-show='item.eventCode == "SO"' class="up-down-img" src="./images/final_2@3x.png" alt="">
                                            <!--进球-->
                                            <img v-show='item.eventCode == "G"' class="ball-img" src="./images/Goals_2@3x.png" alt="">
                                            <!--点球未进-->
                                            <img v-show='item.eventCode == "PSM"' class="ball-img" src="./images/Iost Penalty@3x.png" alt="">
                                            <!--点球进球-->
                                            <div class="poin-ball"  v-show='item.eventCode == "PSG"'>
                                                <img class="point-img" src="./images/Penalty@3x.png" alt="点">
                                                <img class="ball-img" src="./images/Goals_2@3x.png" alt="">
                                            </div>
                                            <!--乌龙球-->
                                            <img v-show='item.eventCode == "OG"' class="ball-img" src="./images/Owngoals_2@3x.png" alt="">
                                            <!--入球无效-->
                                            <img v-show='item.eventCode == ""' class="ball-img" src="./images/Invalid goal@3x.png" alt="">
                                            <!--助攻-->
                                            <img v-show='item.eventCode == "AS"' class="ball-img" src="./images/Assist@3x.png" alt="">
                                        </div>
                                        <!--比分-->
                                        <!--<div v-if="item.eventCode=='G'||-->
                                               <!--item.eventCode=='PSM'||-->
                                               <!--item.eventCode=='PSG'||-->
                                               <!--item.eventCode==''||-->
                                               <!--item.eventCode=='OG'" class="score">-->
                                            <!--<span class="score-text">{{res.fsH}}:{{res.fsA}}</span>-->
                                        <!--</div>-->
                                        <!--人-->
                                        <div class=person>
                                            <span class="person-text">{{item.person}}</span>
                                        </div>
                                    </template>
                                </div>
                                <div class="circle">
                                    {{item.minute}}'
                                </div>
                                <div class="right-box" >
                                    <template v-if='item.isHa == "a"'>
                                        <div class="event-card">
                                            <!--红盘-->
                                            <img v-show='item.eventCode == "RC"' class="card-img" src="./images/redcard_2@3x.png" alt="">
                                            <!--黄盘-->
                                            <img v-show='item.eventCode == "YC"' class="card-img" src="./images/Yellowcard_2@3x.png" alt="">
                                            <!--二黄变红-->
                                            <img v-show='item.eventCode == "Y2C"' class="card-img" src="./images/Redden@3x.png" alt="">
                                            <!--换上-->
                                            <img v-show='item.eventCode == "SI"' class="up-down-img " src="./images/Play_2@3x.png" alt="">
                                            <!--换下-->
                                            <img v-show='item.eventCode == "SO"' class="up-down-img" src="./images/final_2@3x.png" alt="">
                                            <!--进球-->
                                            <img v-show='item.eventCode == "G"' class="ball-img" src="./images/Goals_2@3x.png" alt="">
                                            <!--点球未进-->
                                            <img v-show='item.eventCode == "PSM"' class="ball-img" src="./images/Iost Penalty@3x.png" alt="">
                                            <!--点球进球-->
                                            <div class="poin-ball"  v-show='item.eventCode == "PSG"'>
                                                <img class="ball-img" src="./images/Goals_2@3x.png" alt="">
                                                <img class="point-img" src="./images/Penalty@3x.png" alt="点">
                                            </div>
                                            <!--乌龙球-->
                                            <img v-show='item.eventCode == "OG"' class="ball-img" src="./images/Owngoals_2@3x.png" alt="">
                                            <!--入球无效-->
                                            <img v-show='item.eventCode == ""' class="ball-img" src="./images/Invalid goal@3x.png" alt="">
                                            <!--助攻-->
                                            <img v-show='item.eventCode == "AS"' class="ball-img" src="./images/Assist@3x.png" alt="">
                                        </div>
                                        <!--点球-->
                                        <!--<div class="point-ball">-->
                                        <!--<img class="ball-img" src="./images/Owngoals_2@3x.png" alt="">-->
                                        <!--</div>-->
                                        <!--比分-->
                                        <!--<div v-if="item.eventCode=='G'||-->
                                               <!--item.eventCode=='PSM'||-->
                                               <!--item.eventCode=='PSG'||-->
                                               <!--item.eventCode==''||-->
                                               <!--item.eventCode=='OG'" class="score">-->
                                            <!--<span class="score-text">{{res.fsH}}:{{res.fsA}}</span>-->
                                        <!--</div>-->
                                        <!--人-->
                                        <div class=person>
                                            <span class="person-text">{{item.person}}</span>
                                        </div>
                                    </template>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="res.eventList.length<=0" class="no-data">
                        <p>暂无数据</p>
                    </div>
                    <!--图例-->
                    <div class="Legend">
                        <ul class="Legend-ul">
                            <li>
                                <div><img class='ball-img' src="./images/Goals_2@2x.png" alt=""></div>
                                <span>入球</span>
                            </li>
                            <li>
                                <div><img class="ball-img" src="./images/Owngoals_2@2x.png" alt=""></div>
                                <span>乌龙</span>
                            </li>
                            <li>
                                <div><img class="card-img" src="./images/Yellowcard_1@3x.png" alt=""></div>
                                <span>黄牌</span>
                            </li>
                            <li>
                                <div><img class="card-img" src="./images/redcard_1@3x.png" alt=""></div>
                                <span>红牌</span>
                            </li>
                            <li>
                                <div><img class="up-down-img" src="./images/Play_1@3x.png" alt=""></div>
                                <span>换上</span>
                            </li>
                            <li>
                                <div><img class="up-down-img" src="./images/final_1@3x.png" alt=""></div>
                                <span>换下</span>
                            </li>

                            <li>
                                <div><img class="ball-img" src="./images/Invalid goal@3x.png" alt=""></div>
                                <span>入球无效</span>
                            </li>
                            <li>
                                <div><img class="ball-img" src="./images/Iost Penalty@3x.png" alt=""></div>
                                <span>点球未进</span>
                            </li>
                            <li>
                                <div><img class="ball-img" src="./images/Redden@3x.png" alt=""></div>
                                <span>两黄变红</span>
                            </li>
                            <li>
                                <div><img class="ball-img" src="./images/Assist@3x.png" alt=""></div>
                                <span>助攻</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!--技术统计-->
        <div class="event">
            <p class="title"> <i class="vertical-line"></i>技术统计</p>
            <div class="skill-tongji">
                <div class="skill-box">
                    <div class="skill-box-head skill">
                        <div class="left-text-title">
                            <img class="tem-img"  :src="matchInfo.homeTeamPic" alt="">
                            <p class="name">{{matchInfo.homeTeamAbbr}}</p>
                        </div>
                        <div class="center-text">
                            <p>VS</p>
                        </div>
                        <div class="right-text-title">
                            <img class="tem-img" :src="matchInfo.visitingTeamPic" alt="">
                            <p class="name">{{matchInfo.visitingTeamAbbr}}</p>
                        </div>
                    </div>
                    <div class="skill-box">
                        <div v-if="res.matchLiveStatisticsDTO.length>0">
                            <div v-for="(item,index) in matchLiveStatisticsDTO" :key=index class="skill-box-body skill">
                                <div class="left-text">
                                    <div class="bar-out">
                                        <div :style="{width:filt(item,item.teamHData)}" class="bar-in" :class="parseInt(item.teamHData)>=parseInt(item.teamAData)?'hight-bar':'black-bar'"></div>
                                    </div>
                                    <span v-if="index=='0'" class="bar-text">{{item.teamHData==''?'0%':item.teamHData+'%'}}</span>
                                    <span v-if="index!='0'" class="bar-text">{{item.teamHData==''?'0':item.teamHData}}</span>
                                    <!--<span class="bar-text">{{item.teamHData==''&& index=='0'?'0%':item.teamHData}}</span>-->
                                </div>
                                <div class="center-text ">
                                    <p>{{item.dataName}}</p>
                                </div>
                                <div class="right-text">
                                    <div class="bar-out">
                                        <div :style="{width:filt(item,item.teamAData)}" class="bar-in" :class="parseInt(item.teamHData)<=parseInt(item.teamAData)?'hight-bar':'black-bar'"></div>
                                    </div>
                                    <span v-if="index=='0'" class="bar-text">{{item.teamAData==''?'0%':item.teamAData+'%'}}</span>
                                    <span v-if="index!='0'" class="bar-text">{{item.teamAData==''?'0':item.teamAData}}</span>
                                </div>
                            </div>
                        </div>


                        <div v-else>
                            <div class="skill-box-body skill">
                                <div class="left-text">
                                    <div class="bar-out"></div>
                                    <span class="bar-text">0%</span>

                                </div>
                                <div class="center-text ">
                                    <p>控球率</p>
                                </div>
                                <div class="right-text">
                                    <div class="bar-out"></div>
                                    <span class="bar-text">0%</span>
                                </div>
                            </div>
                            <div class="skill-box-body skill">
                                <div class="left-text">
                                    <div class="bar-out"></div>
                                    <span class="bar-text">0</span>
                                </div>
                                <div class="center-text ">
                                    <p>射正</p>
                                </div>
                                <div class="right-text">
                                    <div class="bar-out"></div>
                                    <span class="bar-text">0</span>
                                </div>
                            </div>
                            <div class="skill-box-body skill">
                                <div class="left-text">
                                    <div class="bar-out"></div>
                                    <span class="bar-text">0</span>
                                </div>
                                <div class="center-text ">
                                    <p>射偏</p>
                                </div>
                                <div class="right-text">
                                    <div class="bar-out"></div>
                                    <span class="bar-text">0</span>
                                </div>
                            </div>
                            <div class="skill-box-body skill">
                                <div class="left-text">
                                    <div class="bar-out"></div>
                                    <span class="bar-text">0</span>
                                </div>
                                <div class="center-text ">
                                    <p>被封堵</p>
                                </div>
                                <div class="right-text">
                                    <div class="bar-out"></div>
                                    <span class="bar-text">0</span>
                                </div>
                            </div>
                            <div class="skill-box-body skill">
                                <div class="left-text">
                                    <div class="bar-out"></div>
                                    <span class="bar-text">0</span>
                                </div>
                                <div class="center-text ">
                                    <p>角球</p>
                                </div>
                                <div class="right-text">
                                    <div class="bar-out"></div>
                                    <span class="bar-text">0</span>
                                </div>
                            </div>
                            <div class="skill-box-body skill">
                                <div class="left-text">
                                    <div class="bar-out"></div>
                                    <span class="bar-text">0</span>
                                </div>
                                <div class="center-text ">
                                    <p>任意球</p>
                                </div>
                                <div class="right-text">
                                    <div class="bar-out"></div>
                                    <span class="bar-text">0</span>
                                </div>
                            </div>
                            <div class="skill-box-body skill">
                                <div class="left-text">
                                    <div class="bar-out"></div>
                                    <span class="bar-text">0</span>
                                </div>
                                <div class="center-text ">
                                    <p>越位</p>
                                </div>
                                <div class="right-text">
                                    <div class="bar-out"></div>
                                    <span class="bar-text">0</span>
                                </div>
                            </div>
                            <div class="skill-box-body skill">
                                <div class="left-text">
                                    <div class="bar-out"></div>
                                    <span class="bar-text">0</span>
                                </div>
                                <div class="center-text ">
                                    <p>黄牌</p>
                                </div>
                                <div class="right-text">
                                    <div class="bar-out"></div>
                                    <span class="bar-text">0</span>
                                </div>
                            </div>
                            <div class="skill-box-body skill">
                                <div class="left-text">
                                    <div class="bar-out"></div>
                                    <span class="bar-text">0</span>
                                </div>
                                <div class="center-text ">
                                    <p>犯规</p>
                                </div>
                                <div class="right-text">
                                    <div class="bar-out"></div>
                                    <span class="bar-text">0</span>
                                </div>
                            </div>
                            <div class="skill-box-body skill">
                                <div class="left-text">
                                    <div class="bar-out"></div>
                                    <span class="bar-text">0</span>
                                </div>
                                <div class="center-text ">
                                    <p>有威胁攻势</p>
                                </div>
                                <div class="right-text">
                                    <div class="bar-out"></div>
                                    <span class="bar-text">0</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script src='./script.js'>

</script>

<style scoped lang="scss" src='./style.scss'>

</style>