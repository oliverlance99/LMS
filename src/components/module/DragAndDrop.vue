<template>
    <div>
        
        <div class="question-box">
            <div class="header">
                <h4>Question {{ props.num }}:</h4>
                <h4 style="margin-top: 1.25rem;" v-if="props.hint" v-html="props.hint"></h4>
            </div>

            <div class="body">
                <div v-html="props.question"></div>

                <div class="game-box">
                    <div class="text-box">
                        <div v-for="(text, ind) in texts" class="box" draggable="true" @dragstart="onDrag(text, ind)" @dragend="onLeave()">{{ text }}</div>
                    </div>

                    <div class="empty-box">

                        <div class="answer-box" v-for="(empty, ind) in answer">
                            <div :class="[{highlight: highLight, enter: enter[ind].cause}, 'box']" @drop="onDrop(ind, true)" @dragenter.prevent="onEnter(ind, true)" @dragleave.prevent="onEnter(ind, true)" @dragover.prevent>
                                <p>Cause: {{ empty.cause }}</p>
                            </div>
                            <div :class="[{highlight: highLight, enter: enter[ind].effect}, 'box']" @drop="onDrop(ind, false)" @dragenter.prevent="onEnter(ind, false)" @dragleave.prevent="onEnter(ind, false)" @dragover.prevent>
                                <p>Effect: {{ empty.effect }}</p>
                            </div>
                        </div>
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

interface DragAndDrop{
    num: number,
    question: string,
    emptys?: {cause: string, effect: string}[], 
    texts?: string[],
    hint?: string,
    feedback?: string,
    last: boolean,
    choice2?: string,
}

let hasAnswer = ref(false);
let highLight = ref(false);

let curr: {label: string, ind: number} = {
    label: '',
    ind: 0,
}


const props = withDefaults( defineProps<DragAndDrop>(), {
})

let answer: {cause: string, effect: string}[] = reactive(props.emptys ? props.emptys : [])
let enter: {cause: boolean, effect: boolean}[] = reactive([])
const texts: string[] = reactive(props.texts ? props.texts : []);

const myAnswer = () => {
    hasAnswer.value = true
    
    return answer;
}

const populateAnswer = () => {
    let length = props.emptys ? props.emptys?.length : 0;

    for(let i = 0; i < length; i++){

        enter.push({
            cause: false,
            effect: false,
        })
    }

}

populateAnswer();

const onLeave = () => {
    highLight.value = !highLight.value
}

const onDrag = (label: string, ind: number) => {
    onLeave();

    curr.label = label;
    curr.ind = ind;
}

const onEnter = (ind: number, cause: boolean) => {
    if(cause){
        enter[ind].cause = !enter[ind].cause
    }
    else{
        enter[ind].effect = !enter[ind].effect
    }
}

const onDrop = (ind: number, cause: boolean) =>{
    onEnter(ind, cause);

    if(cause){
        if(answer[ind].cause != ''){
            texts.push(answer[ind].cause)
        }

        answer[ind].cause = curr.label
        texts.splice(curr.ind, 1)
    }
    else{
        if(answer[ind].effect != ''){
            texts.push(answer[ind].effect)
        }

        answer[ind].effect = curr.label
        texts.splice(curr.ind, 1)
    }
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

        .game-box{
            background-color: #d9d9d9;
            width: 100%;
            max-width: 900px;
            padding: .25rem;
            overflow-x: auto;
            margin-top: 1rem;

            .text-box, .empty-box{
                display: flex;

                .answers-box{
                    display: flex;
                    flex-direction: column;
                }
                
                .box{
                    margin-bottom: .5rem;
                    margin-right: .75rem;
                    padding: .5rem;
                    max-width: 300px;

                    background-color: #F5F5F5;
                    border: 2px black dashed;

                    transition: all .35s ease;

                    &.highlight{
                        background-color: #666666;
                        color: white;
                    }

                    &.enter{
                        background-color: #c9c9c9 !important;
                        border: 2px black dashed;
                        color: black !important;
                    }
                }

            }

            .text-box{
                flex-wrap: wrap;
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