<template>
    <div class="test-box">
        <TESTEST></TESTEST>
    </div>
</template>

<script>
import TESTEST from '@/components/TestTest.vue';

export default {
    components: ['TESTEST'],
    data(){
        return{
            loading: false,
        }
    },

    methods:{
        toggleLoading(){
            this.loading = !loading;
        }
    }
}
</script>

<style scoped lang="scss">

.test-box{
    width: 100vw;
    height: 100vh;
}
</style>