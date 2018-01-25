<template>
    <div id="klaverjassen">
        <app-header></app-header>
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1">
                    <component :is="activeComponent" :players="players" @startGame="startGame"></component>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from './Header.vue';

    import Start from'./Start.vue';
    import Score from './Score.vue';

    export default {
        data(){
            return {
                players: {},
                activeComponent: 'app-start',
            };
        },
        components: {
            'app-header': Header,
            'app-start': Start,
            'app-score': Score,
        },
        methods: {
            startGame(players){
                this.players = players;
                this.activeComponent = 'app-score';
            },
        },
    }
</script>

<style>
    .container {
        color: #232323;
    }
</style>