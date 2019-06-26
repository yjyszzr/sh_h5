<template>
    <div class="lineup">
        <div class="field">
            <img src="./img/filed.jpg" alt="">
            <div class="fieldTable">
                <div class="field_title">
                    <p>主裁: {{lineupinfo.refereeName}}</p>
                    <!-- <p>场地: {{lineupinfo.refereeName}}</p> -->
                </div>
                <table v-if="lineupinfo.hlineupPersons&&lineupinfo.hlineupPersons.length>0">
                    <th>
                        <p>{{lineupinfo.homeTeamAbbr}}</p>
                        <p>{{lineupinfo.formationTeamH}}</p>
                    </th>
                    <tr>
                        <td v-for="(item,i) in h_goalkeeper" :key='i'>
                            <div class="teamer">
                                {{item.shirtNumber}}
                            </div>
                            <div class="team_name">
                                {{item.personName}}
                            </div>
                        </td>
                    </tr>
                    <tr v-if="h_guard.length>0">
                        <td v-for="(item,i) in h_guard" :key='i'>
                            <div class="teamer">
                                {{item.shirtNumber}}
                            </div>
                            <div class="team_name">
                                {{item.personName}}
                            </div>
                        </td>
                    </tr>
                    <tr v-if="h_halfback.length>0">
                        <td v-for="(item,i) in h_halfback" :key='i'>
                            <div class="teamer">
                                {{item.shirtNumber}}
                            </div>
                            <div class="team_name">
                                {{item.personName}}
                            </div>
                        </td>
                    </tr>
                    <tr v-if="h_centreHalfback.length>0">
                        <td v-for="(item,i) in h_centreHalfback" :key='i'>
                            <div class="teamer">
                                {{item.shirtNumber}}
                            </div>
                            <div class="team_name">
                                {{item.personName}}
                            </div>
                        </td>
                    </tr>
                    <tr v-if="h_tackle.length>0">
                        <td v-for="(item,i) in h_tackle" :key='i'>
                            <div class="teamer">
                                {{item.shirtNumber}}
                            </div>
                            <div class="team_name">
                                {{item.personName}}
                            </div>
                        </td>
                    </tr>
                </table>
                <table v-if="lineupinfo.hlineupPersons&&lineupinfo.alineupPersons.length>0">
                    <th>
                        <p>{{lineupinfo.visitingTeamAbbr}}</p>
                        <p>{{lineupinfo.formationTeamA}}</p>
                    </th>
                    <tr v-if="v_tackle.length>0">
                        <td v-for="(item,i) in v_tackle" :key='i'>
                            <div class="teamer">
                                {{item.shirtNumber}}
                            </div>
                            <div class="team_name">
                                {{item.personName}}
                            </div>
                        </td>
                    </tr>
                    <tr v-if="v_centreHalfback.length>0">
                        <td v-for="(item,i) in v_centreHalfback" :key='i'>
                            <div class="teamer">
                                {{item.shirtNumber}}
                            </div>
                            <div class="team_name">
                                {{item.personName}}
                            </div>
                        </td>
                    </tr>
                    <tr v-if="v_halfback.length>0">
                        <td v-for="(item,i) in v_halfback" :key='i'>
                            <div class="teamer">
                                {{item.shirtNumber}}
                            </div>
                            <div class="team_name">
                                {{item.personName}}
                            </div>
                        </td>
                    </tr>
                    <tr v-if="v_guard.length>0">
                        <td v-for="(item,i) in v_guard" :key='i'>
                            <div class="teamer">
                                {{item.shirtNumber}}
                            </div>
                            <div class="team_name">
                                {{item.personName}}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td v-for="(item,i) in v_goalkeeper" :key='i'>
                            <div class="teamer">
                                {{item.shirtNumber}}
                            </div>
                            <div class="team_name">
                                {{item.personName}}
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="subst_lineup">
            <div class="title">
                替补阵容 
            </div>
            <div class="team-info">
                <div class="left">
                    <div class="h-teamname">{{lineupinfo.homeTeamAbbr}}</div>
                    <div class="team-item" v-for="(item,i) in lineupinfo.hbenchPersons" :key='i'>
                        <div class="team-number">
                            {{item.shirtNumber}}
                        </div>
                        <div class="teamer-name">
                            {{item.personName}}
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="k-teamname">{{lineupinfo.visitingTeamAbbr}}</div>
                    <div class="team-item" v-for="(item,i) in lineupinfo.abenchPersons" :key='i'>
                        <div class="team-number">
                            {{item.shirtNumber}}
                        </div>
                        <div class="teamer-name">
                            {{item.personName}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="nullSt" v-if="lineupinfo.hbenchPersons&&lineupinfo.hbenchPersons.length<=0&&lineupinfo.hInjureiesPersons.length<=0">
                暂无替补
            </div>
        </div>
        <div class="subst_lineup">
            <div class="title">
                伤停
            </div>
            <div class="team-info">
                <div class="left">
                    <div class="h-teamname">{{lineupinfo.homeTeamAbbr}}</div>
                    <div class="team-item" v-for="(item,i) in lineupinfo.hInjureiesPersons" :key='i'>
                        <div class="team-number">
                            {{item.shirtNumber}}
                        </div>
                        <div class="teamer-name">
                            {{item.personName}}
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="k-teamname">{{lineupinfo.visitingTeamAbbr}}</div>
                    <div class="team-item" v-for="(item,i) in lineupinfo.aInjureiesPersons" :key='i'>
                        <div class="team-number">
                            {{item.shirtNumber}}
                        </div>
                        <div class="teamer-name">
                            {{item.personName}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="nullSt" v-if="lineupinfo.hInjureiesPersons&&lineupinfo.aInjureiesPersons.length<=0&&lineupinfo.hInjureiesPersons.length<=0">
                暂无伤停 
            </div>
        </div>
    </div>
</template>
<style src='./style.scss' lang='scss' scoped>

</style>
<script src='./script.js'>

</script>


