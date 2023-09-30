<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="main-box">
    <Header />
    <RouterView v-slot="{ Component, route }">
      <Transition name="swipe">
        <KeepAlive>
          <component :is="Component" :key="route.path" />
        </KeepAlive>
      </Transition>
    </RouterView>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
@import './assets/variables.scss';
  .main-box{
      width: 100vw;
      min-height: 100vh;

      display: flex;
      flex-direction: column;
  }

  .swipe-enter-active{
    transition: all 0.3s ease-out;
  }

  .swipe-enter-from{
    opacity: 0;
    transform: translateX(100px);
  }
  .swipe-leave-to {
    opacity: 0;
    transform: translateX(-100px);
  }
</style>