<template>
    <header>
        <router-link to="/">Home</router-link>
        <router-link to="/module/1">module 1</router-link>
        <router-link to="/module/2">module 2</router-link>
        <router-link to="/module/3">module 3</router-link>
        <router-link to="/module/4">module 4</router-link>
        <router-link to="/module/5">module 5</router-link>
        <router-link to="/module/6">module 6</router-link>
    </header>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
@import '../assets/variables.scss';

    
header{
    background: $green;
    color: white;

    width: 100%;
    height: 100px;
    padding-bottom: .5rem;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 0px 1rem 1rem 0px;

    box-sizing: border-box;

    a{
        color: black;
        display: inline-block;
        font-size: 20px;
        padding: 0 20px 0 0;
        text-decoration: none;
        font-family: $inria-regular;

        &:hover{
            color: $white;
        }
    }
    }
</style>