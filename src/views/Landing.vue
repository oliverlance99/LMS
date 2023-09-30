<template>
    <section>
        <div>
            <div class="blackboard">
                <h1>Modules</h1>
                <p :class="{ complete: completeModules.module1 }">Module No. 1 Main Idea and Supporting Details</p>
                <p :class="{ complete: completeModules.module2 }">Module No. 2 Making Inferences and Conclusions</p>
                <p :class="{ complete: completeModules.module3 }">Module No. 3 Cause Effect Relationship</p>
                <p :class="{ complete: completeModules.module4 }">Module No. 4 COMPARISON AND CONTRAST</p>
                <p :class="{ complete: completeModules.module5 }">Module No. 5 Problem Solution</p>
                <p :class="{ complete: completeModules.module6 }">Module No.6 Fact and Oipnion</p>
            </div>

            <Button color="orange" label="Start" style="float: right;">
                <template v-slot:icon>
                    <i class="fa-solid fa-caret-right"></i>
                </template>
            </Button>
        </div>
        <div class="teacher">
            <div class="large"></div>
            <div class="medium"></div>
            <div class="small"></div>

            <img src="/Teacher-img.png" alt="teacher">
        </div>
    </section>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue';
import Button from '../components/Button.vue'

interface Modules {
    module1: boolean,
    module2: boolean,
    module3: boolean,
    module4: boolean,
    module5: boolean,
    module6: boolean,
}

let completeModules: Modules = {
} = reactive({
    module1: false,
    module2: false,
    module3: false,
    module4: false,
    module5: false,
    module6: false,
})

onBeforeMount( () => {
    let storage = localStorage.getItem('completeModules');

    if(storage){
        let data: Modules = JSON.parse(storage)

        completeModules = reactive(data)
    }
    else{
        localStorage.setItem('completeModules', JSON.stringify(completeModules))
    }
})
</script>

<style lang="scss">
@import '../assets/variables.scss';

section{
        flex: 1;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin-top: .75rem;
        margin-bottom: .75rem;

        .blackboard{
            box-sizing: border-box;
            background-color: $dark-green;
            border: 8px solid $brown;
            border-radius: 3px;
            width: 600px;
            padding: 1rem;
            font-family: $chalk-regular;
            color: white;

            h1{
                margin-top: 5px;
            }

            .complete{
                color: #C080F1;
            }
        }
        

        .teacher{
            position: relative;
            .large{
                position: absolute;
                bottom: 5px;
                right: 0px;
                background-color: #CCCCCC;
                @include circle(300px);
                left: 55%;
                transform: translate(-50%);
            }
            .medium{
                position: absolute;
                bottom: 5px;
                right: 0px;
                background-color: #D9D9D9;
                @include circle(200px);
                left: 55%;
                transform: translate(-50%);
            }
            .small{
                position: absolute;
                bottom: 0px;
                right: 0px;
                background-color: white;
                @include circle(130px);
                left: 55%;
                transform: translate(-50%);
            }

            img{
                position: relative;
                z-index: 1;
                height: 400px;
            }

        }
    }
</style>
