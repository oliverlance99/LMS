<template>
    <div>
        
        <div class="question-box">
            <div class="header">
                <h4>Question {{ props.num }}:</h4>
                <h4 style="margin-top: 1.25rem;" v-if="props.hint" v-html="props.hint"></h4>
            </div>

            <div class="body">
                <div v-html="props.question"></div>

                <div class="similarity-box">
                    <div class="subject-box">
                        <div>{{ label?.subject1 }}</div>
                            <div class="d-flex">
                                <input type="text" v-model="curr[0]">
                                <Button label="Add" color="green" style="margin: 0px; margin-left: .5rem;" @click="addFunc(0)"></Button>
                            </div>

                        <TransitionGroup name="left">
                            <ul  v-for="(label, ind) in answer.subject1" class="d-flex" :key="'subject1'+ind">
                                <li>{{ label }}</li>
                                <button class="close-button" @click="delFunc(ind)" ><i class="fa-solid fa-x"></i></button>
                            </ul>
                        </TransitionGroup>
                    </div>

                    <div class="subject-box">
                        <div>{{ label?.subject2 }}</div>
                            <div class="d-flex">
                                <input type="text" v-model="curr[1]">
                                <Button label="Add" color="green" style="margin: 0px; margin-left: .5rem;" @click="addFunc(1)"></Button>
                            </div>

                        <TransitionGroup name="left">
                            <ul  v-for="(label, ind) in answer.subject2" class="d-flex" :key="'subject2'+ind">
                                <li>{{ label }}</li>
                                <button class="close-button" @click="delFunc(ind)" ><i class="fa-solid fa-x"></i></button>
                            </ul>
                        </TransitionGroup>
                    </div>

                    <div class="subject-box">
                        <div> Similarities </div>
                            <div class="d-flex">
                                <input type="text" v-model="curr[2]">
                                <Button label="Add" color="green" style="margin: 0px; margin-left: .5rem;" @click="addFunc(2)"></Button>
                            </div>

                        <TransitionGroup name="left">
                            <ul  v-for="(label, ind) in answer.similarities" class="d-flex" :key="'similarities'+ind">
                                <li>{{ label }}</li>
                                <button class="close-button" @click="delFunc(ind)" ><i class="fa-solid fa-x"></i></button>
                            </ul>
                        </TransitionGroup>
                    </div>
                </div>


                <div style="margin-top: 2rem; padding: .5rem; background-color: #e3e3e3; box-sizing: content-box;" v-if="props.feedback && hasAnswer" v-html="props.feedback"></div>
            </div>

            <div class="footer">
                <Button class="question-btn" v-if="last" v-show="hasAnswer" @click="doneQuiz" label="Finish" color="orange"></Button>
                <Button class="question-btn" v-else v-show="hasAnswer" @click="nextQuestion" label="Next"  color="darkblue"></Button>
            </div>
        </div>

        <div class="answers-box">
            <Button label="Submit" @click="$emit('getAnswer', myAnswer())" color="darkblue" :disabled="hasAnswer"></Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import Button from '../Button.vue';

const emits = defineEmits(['getAnswer', 'doneJumpstartQuiz', 'nextJumpstartQuiz'])

interface VenDiagram{
    num: number,
    question: string,
    hint?: string,
    feedback?: string,
    label?: {subject1: string, subject2: string},
    last: boolean,
}

let hasAnswer = ref(false);

const props = withDefaults( defineProps<VenDiagram>(), {
})

let curr: string[] = reactive(['', '', '']);

let answer: {subject1: string[], subject2: string[], similarities: string[]} = reactive({subject1: [], subject2: [], similarities: []})

const addFunc = (ind: number) => {
    if(ind == 0){
        answer.subject1.push(curr[ind])
    }
    else if(ind == 1){
        answer.subject2.push(curr[ind])
    }
    else{
        answer.similarities.push(curr[ind])
    }
    curr[ind] = '';
}

const delFunc = (ind: number) => {
    if(ind == 0){
        answer.subject1.splice(ind, 1);
    }
    else if(ind == 1){
        answer.subject2.splice(ind, 1);
    }
    else{
        answer.similarities.splice(ind, 1);
    }
}

const myAnswer = () => {
    hasAnswer.value = true
    
    return answer;
}

const nextQuestion = () => {
    hasAnswer.value = false
    emits('nextJumpstartQuiz');
}

const doneQuiz = () => {
    emits('doneJumpstartQuiz')
}
</script>

<style scoped lang="scss">

.question-box{
    padding: .75rem;
    background-color: #F5F5F5;

    // box-shadow: 0rem 0rem .5rem rgba($color: #000000, $alpha: .35);
    border-radius: 3px;

    .header{
        h4{
            margin: 0px;
        }
    }

    .body{
        font-weight: normal;
        margin-top: 1.25rem;
        padding: .75rem 1.25rem .75rem 1.25rem;
    
        .similarity-box{
            margin-top: 1.5rem;
            .subject-box{
                margin-top: 1.5rem;

                input[type=text]{
                    padding: .25rem 1rem .25rem 1rem;
                    border-radius: 2px;
                    border: 1px solid black;
                    min-width: 400px;
                }
                .d-flex{
                    display: flex;
                    margin-top: 1rem;
                    p{
                        margin: 0px;
                    }
                }

                .close-button{
                    height: 25px;
                    width: 25px;
                    border: 1px solid red;
                    color: white;
                    background-color: red;
                    font-weight: bold;
                    border-radius: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-left: .75rem;
                    cursor: pointer;
                }
            }
        }
    }

    .footer{
        display: flex;
        justify-content: flex-end;
        // padding: .75rem 1.25rem .75rem 1.25rem;
        .question-btn{
            border-radius: 3px !important;
            padding: .2rem 1.5rem .2rem 1.5rem !important;
            margin: 0px !important;
        }
    }

}
.answers-box{
    display: flex;
    justify-content: flex-end;
    margin-top: 1.5rem;
}

.left-enter-active,
.left-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.left-enter-from,
.left-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

</style>