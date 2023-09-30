<template>
    <div>
        <div class="question-box">
            <div class="header">
                <h4>Question {{ props.num }}:</h4>
                <h4 style="margin-top: 1.25rem;" v-if="props.hint" v-html="props.hint"></h4>
            </div>

            <div class="body">
                <div v-html="props.question"></div>

                <div style="margin-top: 2rem; padding: .5rem; background-color: #e3e3e3; box-sizing: content-box;" v-if="props.feedback && hasAnswer" v-html="props.feedback"></div>
            </div>

            <div class="footer">
                <Button v-if="last" v-show="hasAnswer" @click="doneQuiz" label="Finish" color="orange"></Button>
                <Button v-else v-show="hasAnswer" @click="nextQuestion" label="Next"  color="darkblue"></Button>
            </div>
        </div>
        <div class="answers-box">
            <input v-if="identification" :disabled="identification.success || identification.error || identification.black" :class="{ success: identification.success, error: identification.error, black: identification.black }" type="text" v-model="answer">
            <Button @click="$emit('getAnswer', myAnswer() )" label="Submit"></Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from '../Button.vue';

const emits = defineEmits(['getAnswer', 'doneJumpstartQuiz', 'nextJumpstartQuiz'])

interface Identification{
    num: number,
    question: string,
    identification?: {
        answer: string,
        input: string,
        opinion: boolean,
        error: boolean,
        success: boolean,
        black: boolean,
    }
    hint?: string,
    feedback?: string,
    last: boolean
}

let hasAnswer = ref(false);
let answer = ref("")

const props = withDefaults( defineProps<Identification>(), {
})

const myAnswer = () => {
    hasAnswer.value = true
    return answer.value;
}

const nextQuestion = () => {
    hasAnswer.value = false
    answer.value = ""
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
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;

    button{
        margin: 0px;
        float: right;
        padding: .25rem 1rem .25rem 1rem;
    }

    input[type=text]{
        flex: 1;
        font-size: 15px;
        background-color: #F5F5F5;
        border: 1px solid black;
        border-radius: 3px;
        margin-right: 1rem;

        outline: none;
        padding: .5rem 1rem .5rem 1rem;
        cursor: pointer;
        transition: .35s ease;

        &:hover{
            background-color: #fff;
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