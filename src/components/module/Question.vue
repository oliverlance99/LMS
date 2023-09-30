<template>
    <div class="question-box">
        <div class="header">
            <h4>Question {{ props.num }}:</h4>
            <h4 v-if="props.hint" v-html="props.hint"></h4>
        </div>

        <div class="body">
            <div v-html="props.question"></div>

            <div style="margin-top: 2rem;" v-if="props.feedback && hasAnswer" v-html="props.feedback"></div>
        </div>

        <div class="footer">
            <Button class="question-btn" v-if="last" @click="doneQuiz" label="Finish" color="orange"></Button>
            <Button class="question-btn" v-else @click="nextQuestion" label="Next"  color="darkblue"></Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from '../Button.vue';

const emits = defineEmits(['getAnswer', 'doneJumpstartQuiz', 'nextJumpstartQuiz'])

interface Question{
    num: number,
    question: string,
    hint?: string,
    feedback?: string,
    type?: number,
    last: boolean
}

const letter = ['A.', 'B.', 'C.', 'D.'];
let hasAnswer = ref(false);

const props = withDefaults( defineProps<Question>(), {})

const myAnswer = (ind: number) => {
    hasAnswer.value = true
    return ind;
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

    box-shadow: 0rem 0rem .5rem rgba($color: #000000, $alpha: .35);
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
    flex-wrap: wrap;
    margin-top: 1.5rem;
    button{
        font-size: 13px;
        font-weight: bold;
        background-color: #E4E4E4;
        border: 1px solid black;
        border-radius: 3px;

        outline: none;
        padding: .35rem 1.5rem .35rem 1.5rem;
        cursor: pointer;
        margin-right: 1.5rem;
        transition: .35s ease;
        margin-bottom: .5rem;

        &:hover{
            background-color: #F5F5F5;
            border-color: #242424 !important;
        }

        &.black, &.error, &.success{
            color: white;
            border: none;
            cursor: default;
        }

        &.black{
            background-color: #666666;
        }
        &.error{
            background-color: #D92E2E;
        }
        &.success{
            background-color: #2EB86D;
        }
    }
}
</style>