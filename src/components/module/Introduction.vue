<template>
    <div class="intro-box" href="intro">
        <h2>{{ props.title }}</h2>

        <h3 style="margin-top: 2.5rem;">Know Your Target</h3>

        <p v-for="target in props.target"> {{ target }} </p>
        <Button @click="$emit('closeButton', onButtonClose() )" v-show="!props.done" color="blue" label="Proceed" />
        
        <!-- <Transition name="top">
            <div style="margin-top: 3rem;" v-show="!showBtn">
                <h3>Make a Jumpstart</h3>
                
                <p>
                    <strong><em>Diagnostic Test:</em></strong> Read the passage carefully, and then answer the question that follows. Tick the button that corresponds to the letter of the correct answer.
                </p>
            </div>
        </Transition> -->
    </div>
</template>
<script setup lang="ts">
import Button from '@/components/Button.vue';

interface Introduction{
    title ?: string,
    target?: string[],
    done: boolean
}

const emits = defineEmits(['closeButton'])

const props = withDefaults( defineProps<Introduction>(), {
    title:  "",
});

const onButtonClose = () =>{
    return 0;
}
</script>

<style scoped lang="scss">
    .intro-box{
        h2{
            letter-spacing: 1px;
        }
        
    }
    
    .top-enter-active,
    .top-leave-active {
        transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .top-enter-from,
    .top-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }

</style>