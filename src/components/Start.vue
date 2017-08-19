<template>
    <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3">
        <div class="start panel panel-default">
            <form>
                <div class="panel-header text-center">
                    <h4>Wie spelen er?</h4>
                </div>
                <div class="panel-body">
                    <label>Team 1</label>
                    <div class="form-group">
                        <input class="form-control red" id="player1" type="text" v-model="player1"
                               placeholder="Speler 1">
                    </div>
                    <div class="form-group">
                        <input class="form-control red" id="player3" type="text" v-model="player3"
                               placeholder="Speler 3">
                    </div>

                    <label>Team 2</label>
                    <div class="form-group">
                        <input class="form-control blue" id="player2" type="text" v-model="player2"
                               placeholder="Speler 2">
                    </div>
                    <div class="form-group">
                        <input class="form-control blue" id="player4" type="text" v-model="player4"
                               placeholder="Speler 4">
                    </div>
                </div>
                <div class="panel-footer text-center">
                    <button class="btn btn-danger" type="submit" @click.prevent="startGame">Spel Starten</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                player1: '',
                player2: '',
                player3: '',
                player4: '',
            };
        },
        methods: {
            startGame(){
                this.$emit('startGame', this.players);
            },
        },
        computed: {
            players() {
                return {
                    player1: this.player1 === '' ? 'Speler 1' : this.player1,
                    player2: this.player2 === '' ? 'Speler 2' : this.player2,
                    player3: this.player3 === '' ? 'Speler 3' : this.player3,
                    player4: this.player4 === '' ? 'Speler 4' : this.player4,
                };
            }
        },
    }
</script>

<style scoped>
    button {
        width: 100%;
    }

    .red {
        border: 1px solid red;
    }

    .blue {
        border: 1px solid blue;
    }
</style>