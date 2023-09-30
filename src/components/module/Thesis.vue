<template>
    <div>
        
        <div class="question-box">
            <div class="header">
                <h4>Question {{ props.num }}:</h4>
                <h4 style="margin-top: 1.25rem;" v-if="props.hint" v-html="props.hint"></h4>
            </div>

            <div class="body">
                <div v-html="props.question"></div>

                <div class="thesis-box">
                    <p>Title</p>
                    <input type="text" v-model="answer.title">

                    <p>Statement</p>
                    <textarea name="" id="" cols="20" v-model="answer.statement" rows="10"></textarea>

                    <p>Cause and Effects</p>
                    <textarea name="" id="" cols="30" v-model="answer.causeEffect" rows="10"></textarea>

                    <p>Concluding Paragraph</p>
                    <textarea name="" id="" cols="20" v-model="answer.conclusion" rows="10"></textarea>
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

interface Thesis{
    num: number,
    question: string,
    hint?: string,
    feedback?: string,
    last: boolean,
}

let hasAnswer = ref(false);

const props = withDefaults( defineProps<Thesis>(), {
})

let answer: {title: string, statement: string, causeEffect: string, conclusion: string} = reactive({title: '', statement: '', causeEffect: '', conclusion: ''})

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

        .thesis-box{
            display: flex;
            flex-direction: column;

            p{
                margin-top: 1.5rem;
                margin-bottom: .5rem;
                font-weight: bold;
            }
            .center{
                align-self: center;
                text-align: center;
            }

            input[type=text]{
                padding: .35rem;
                border-radius: 3px;
                border: 1px solid black;
                text-align: center;
            }

            textarea{
                resize: none;
                padding: 1rem;
                border-radius: 3px;
                color: black;
                font-family: Arial, Helvetica, sans-serif;
            }

            textarea, input[type=text]{
                font-size: 18px;
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