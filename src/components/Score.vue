<template>
    <div id="score" class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3">
        <div class="panel panel-default">
            <div class="panel-header text-center">
                <h4>Scorebord</h4>
            </div>
            <div class="panel-body">
                <table class="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th width="50%" colspan="2" class="text-center red">{{ team1 }}</th>
                        <th width="50%" colspan="2" class="text-center blue">{{ team2 }}</th>
                    </tr>
                    </thead>
                    <tbody v-if="!gameStarted">
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    </tbody>
                    <tbody v-if="gameStarted">
                    <tr v-for="(round,key) in rounds">
                        <td>
                            {{ round.roemTeam1 > 0 ? round.roemTeam1 : '-' }}
                        </td>
                        <td class="text-right padding-right">
                            {{ round.scoreTeam1 == 0 && key % 2 == 0 ? 'Nat' : round.scoreTeam1 }}
                        </td>
                        <td class="padding-left">
                            {{ round.scoreTeam2 == 0 && key % 2 == 1 ? 'Nat' : round.scoreTeam2 }}
                        </td>
                        <td class="text-right">
                            {{ round.roemTeam2 > 0 ? round.roemTeam2 : '-' }}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="total">
                    <h4 class="text-center">
                        {{ gameEnded ? 'Eindstand' : 'Tussenstand' }}
                    </h4>
                    <div class="text-center score red col-xs-6 border-right">{{ totalTeam1 }}</div>
                    <div class="text-center score blue col-xs-6">{{ totalTeam2 }}</div>
                    <div class="clearfix"></div>
                </div>
                <br>
                <app-score-form v-if="!gameEnded" @addScore="addScore"></app-score-form>
            </div>
            <div class="panel-footer text-center" v-if="!gameEnded">
                <p>Ronde van {{ activePlayer }}</p>
                <p>{{ previousPlayer }} moet schudden</p>
            </div>
            <div class="panel-footer" v-if="gameEnded">
                <h4>Statistieken</h4>
                <p>Beste team: {{ winningTeam }}</p>
                <p>Beste speler: {{ bestPlayer }}</p>
                <p>Meest nat gegaan: {{ natPlayer }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import ScoreForm from './ScoreForm.vue';

    export default {
        props: [
            'players'
        ],
        data(){
            return {
                rounds: [],
            };
        },
        computed: {
            gameStarted(){
                return this.rounds.length > 0;
            },
            gameEnded(){
                return this.rounds.length > 15;
            },
            team1(){
                return this.players.player1 + ' & ' + this.players.player3;
            },
            team2(){
                return this.players.player2 + ' & ' + this.players.player4;
            },
            totalTeam1(){
                let total = 0;
                let x;
                for (x in this.rounds) {
                    total += this.rounds[x].scoreTeam1;
                }
                return total;
            },
            totalTeam2(){
                let total = 0;
                let x;
                for (x in this.rounds) {
                    total += this.rounds[x].scoreTeam2;
                }
                return total;
            },
            winningTeam(){
                if (this.totalTeam1 > this.totalTeam2) {
                    return this.team1;
                } else if (this.totalTeam2 > this.totalTeam1) {
                    return this.team2;
                }
                return '-';
            },
            bestPlayer(){
                let scores = [];
                let x;
                for (x in [1, 2, 3, 4]) {
                    scores.push({x: this.totalPlayer(x)});
                }
                const winningScore = Math.max(scores);
                let player = '';
                for (x in scores) {
                    if (scores[x] === winningScore) {
                        player += (player === '') ? this.getPlayer(x) : ' & ' + this.getPlayer(x);
                    }
                }
                return player;

            },
            natPlayer(){
                return 'me';
            },
            activePlayer(){
                switch (this.rounds.length % 4) {
                    case 0:
                        return this.players.player1;
                    case 1:
                        return this.players.player2;
                    case 2:
                        return this.players.player3;
                    case 3:
                        return this.players.player4;
                }
            },
            previousPlayer(){
                switch (this.rounds.length % 4) {
                    case 0:
                        return this.players.player4;
                    case 1:
                        return this.players.player1;
                    case 2:
                        return this.players.player2;
                    case 3:
                        return this.players.player3;
                }
            },
        },
        methods: {
            addScore(score){
                this.rounds.push(score);
            },
            getPlayer(x){
                switch (x) {
                    case 1:
                        return this.players.player1;
                    case 2:
                        return this.players.player2;
                    case 3:
                        return this.players.player3;
                    case 4:
                        return this.players.player4;
                }
            },
            totalPlayer(playerNumber){
                let total = 0;
                if (playerNumber === 1 || playerNumber === 3) {
                    for (let n = 0; n < 4; n++) {
                        total += this.rounds[playerNumber - 1 + n].scoreTeam1 - this.rounds[playerNumber - 1].scoreTeam2;
                    }
                }
                return total;
            },
        },
        components: {
            'app-score-form': ScoreForm,
        }
    }
</script>

<style scoped>
    tbody tr:nth-of-type(4n + 4) {
        border-bottom: 2px solid #232323;
    }

    .total h4 {
        background-color: #232323;
        color: #f2f2f3;
        border-bottom: 1px solid #f2f2f3;
        padding-bottom: 10px;
        margin-bottom: 0;
    }

    .total {
        font-size: 30px;
        line-height: 1.7em;
        border: 1px solid #f2f2f3;
    }

    .border-right {
        border-right: 1px solid #f2f2f3;
    }

    .panel {
        background-color: #232323;
    }

    .panel-header {
        margin-bottom: -10px;
        background-color: #232323;
        color: white;
    }

    .panel-footer {
        background-color: #232323;
        color: #fff;
    }

    table {
        background-color: #fff;
    }

    .red {
        background-color: #bc2912;
        color: #f2f2f3;
    }

    .blue {
        background-color: #1850d1;
        color: #f2f2f3;
    }

    .padding-right {
        padding-right: 15px !important;
    }

    .padding-left {
        padding-left: 15px !important;
    }
</style>