<template>
    <div>
        <p>{{ loading ? 'LOADING' : "NOT LOADING" }}</p>
        <button @click="toggleLoading()">JABOL</button>
    </div>
</template>

<script>
    export default {
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

<style lang="scss" scoped>

</style>