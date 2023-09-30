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
                <Button class="question-btn" v-if="last" v-show="hasAnswer" @click="doneQuiz" label="Finish" color="orange"></Button>
                <Button class="question-btn" v-else v-show="hasAnswer" @click="nextQuestion" label="Next"  color="darkblue"></Button>
            </div>
        </div>
        <div class="answers-box">
            <button :disabled="choice.success || choice.error || choice.black" :class="{ success: choice.success, error: choice.error, black: choice.black }" v-for="(choice, ind) in props.choices" @click="$emit('getAnswer', myAnswer(ind) )">
                {{ letter[ind] }} {{ choice.label }}
            </button>
        </div>

        <div class="identification-box" v-if="choice2">
            <p>{{ choice2 }}</p>
            <input type="text" v-model="identification">
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from '../Button.vue';

const emits = defineEmits(['getAnswer', 'doneJumpstartQuiz', 'nextJumpstartQuiz'])

interface MultipleChoice{
    num: number,
    question: string,
    choices?: {
        label: string,
        answer: boolean
        error: boolean,
        success: boolean,
        black: boolean,
    }[],
    hint?: string,
    feedback?: string,
    last: boolean,
    choice2?: string,
}

const letter = ['A.', 'B.', 'C.', 'D.'];
let hasAnswer = ref(false);

let identification = ref('')

const props = withDefaults( defineProps<MultipleChoice>(), {
})

const myAnswer = (ind: number) => {
    hasAnswer.value = true
    
    return{ind: ind, choice2: identification.value};
}

const nextQuestion = () => {
    hasAnswer.value = false
    identification.value = ''
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

.identification-box{
    
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