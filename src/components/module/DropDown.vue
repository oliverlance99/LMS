<template>
    <div>
        
        <div class="question-box">
            <div class="header">
                <h4>Question {{ props.num }}:</h4>
                <h4 style="margin-top: 1.25rem;" v-if="props.hint" v-html="props.hint"></h4>
            </div>

            <div class="body">
                <div v-html="props.question"></div>

                <select :class="{error: error, black: black, success: success,}" :disabled="hasAnswer" v-model="answer">
                    <option disabled value="">Please select one</option>
                    <option v-for="option in options" :value="option">{{ option }}</option>
                </select>

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

interface DropDown{
    num: number,
    question: string,
    hint?: string,
    answer?: string,
    feedback?: string,
    last: boolean,
    options?: string[],
}

let hasAnswer = ref(false);

const props = withDefaults( defineProps<DropDown>(), {
})

let answer = ref('')

let  error = ref(false);
let  success = ref(false);
let  black = ref(false);

const myAnswer = () => {
    hasAnswer.value = true

    if(props.answer){
        if(answer.value == props.answer) success.value = true

        else error.value = true
    }
    else{
        black.value = true;
    }
    
    return answer.value;
}

const nextQuestion = () => {
    hasAnswer.value = false
    answer.value = ''

    black.value = false;
    success.value = false;
    error.value = false;

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

        sup{
            font-weight: bold !important;
        }

        select{
            padding: .5rem 1rem .5rem 1rem;
            min-width: 250px;
            margin-top: 1.75rem;
            font-weight: bold;
            border-radius: 2px;

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
</style>