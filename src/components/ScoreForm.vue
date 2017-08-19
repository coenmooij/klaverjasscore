<template>
    <div class="scoreForm panel panel-default">
        <div class="panel-body">
            <div class="alert alert-danger" v-if="error">
                Je hebt geen geldige score ingevuld!
            </div>
            <form>
                <table>
                    <thead>
                    <tr>
                        <th class="text-center">Roem</th>
                        <th class="text-center">Team 1</th>
                        <th class="text-center">Team 2</th>
                        <th class="text-center">Roem</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><input class="form-control" type="number" v-model="roemTeam1"></td>
                        <td><input class="form-control" type="number" v-model="scoreTeam1"></td>

                        <td><input class="form-control" type="number" v-model="scoreTeam2"></td>
                        <td><input class="form-control" type="number" v-model="roemTeam2"></td>
                    </tr>
                    </tbody>
                </table>
                <br>
                <button class="btn btn-danger" type="submit" @click.prevent="addScore"><span
                        class="glyphicon glyphicon-plus"></span> Voeg toe
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                roemTeam1: '',
                roemTeam2: '',
                scoreTeam1: '',
                scoreTeam2: '',
                error: false,
            };
        },
        methods: {
            addScore(){
                if (this.validate()) {
                    this.$emit('addScore', this.score);
                    this.resetForm();
                } else {
                    this.error = true;
                }
            },
            validate(){
                if (this.scoreTeam1 === '' || this.scoreTeam2 === '') {
                    return false;
                }
                return true;
            },
            resetForm(){
                this.roemTeam1 = '';
                this.roemTeam2 = '';
                this.scoreTeam1 = '';
                this.scoreTeam2 = '';
                this.error = false;
            },
            getScore(string){
                return parseInt(string);
            }
        },
        computed: {
            score(){
                return {
                    roemTeam1: this.getScore(this.roemTeam1),
                    roemTeam2: this.getScore(this.roemTeam2),
                    scoreTeam1: this.getScore(this.scoreTeam1),
                    scoreTeam2: this.getScore(this.scoreTeam2),
                };
            },
        },

    }
</script>

<style scoped>
    table {
        color: #f2f2f3;
    }

    input {
        font-size: 17px;
    }

    button {
        font-size: 17px;
        width: 100%;
    }
</style>