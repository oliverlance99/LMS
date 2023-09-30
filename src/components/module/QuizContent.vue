<template>
    <div class="content-box" :id="props.id">
        <h3>{{ props.title }}</h3>

        <p v-html="props.body"></p>

        <Button :label="btnLabel" color="orange" v-if="!props.done" @click="toggleModal()"></Button>

        <div v-if="question">

            <div :class="[{pl0: props.done}, 'content']" :id="props.id"> 
                <!-- <div class="d-flex"> -->
                <Transition name="left">
                    <div class="done-box" v-show="props.done">
                        <i class="fa-solid fa-circle-check"></i> <h4>{{ props.content }} Done!</h4>
                    </div>
                </Transition>
                <!-- </div> -->
                <Transition name="fade">
                    <Modal v-show="!props.done && showModal" @close-modal="showModal=false">
                        <Transition name="left">
                            <div v-show="showQuestion" >
                                <MultipleChoice
                                    v-if="question.type == 1"
                                    :question="question.question" :num="question.num" :hint="question.hint" :choice2="question.choice2"
                                    :choices="question.choices" :type="question.type" :last="last" :feedback="question.feedback"
                                    @get-answer="processAnswer" @next-jumpstart-quiz="nextJumpstartQuiz" @done-jumpstart-quiz="doneJumpstartQuiz"
                                />
                                <Identification 
                                    v-else-if="question.type == 2"
                                    :question="question.question" :num="question.num" :identification="question.identification"
                                    :last="last" :feedback="question.feedback" :hint="question.hint"
                                    @get-answer="processIdentification" @next-jumpstart-quiz="nextJumpstartQuiz" @done-jumpstart-quiz="doneJumpstartQuiz"
                                />
                                <Essay 
                                    v-else-if="question.type == 3"
                                    :question="question.question" :num="question.num" :essay="question.essay"
                                    :last="last" :feedback="question.feedback" :hint="question.hint"
                                    @get-answer="processIdentification" @next-jumpstart-quiz="nextJumpstartQuiz" @done-jumpstart-quiz="doneJumpstartQuiz"
                                />
                                <Riddle 
                                    v-else-if="question.type == 4"
                                    :question="question.question" :num="question.num" :riddle="question.riddle"
                                    :last="last" :feedback="question.feedback" :hint="question.hint"
                                    @get-answer="processIdentification" @next-jumpstart-quiz="nextJumpstartQuiz" @done-jumpstart-quiz="doneJumpstartQuiz"
                                />
                                <Question 
                                    v-else-if="question.type == 5"
                                    :question="question.question" :num="question.num" :riddle="question.riddle"
                                    :last="last" :feedback="question.feedback" :hint="question.hint"
                                    @get-answer="processIdentification" @next-jumpstart-quiz="nextJumpstartQuiz" @done-jumpstart-quiz="doneJumpstartQuiz"
                                />
                                <DragAndDrop 
                                    v-else-if="question.type == 6"
                                    :question="question.question" :num="question.num" :texts="question.texts"
                                    :last="last" :feedback="question.feedback" :hint="question.hint" :emptys="question.emptys"
                                    @get-answer="processDragAndDrop" @next-jumpstart-quiz="nextJumpstartQuiz" @done-jumpstart-quiz="doneJumpstartQuiz"
                                />
                                <Thesis 
                                    v-else-if="question.type == 7"
                                    :question="question.question" :num="question.num"
                                    :last="last" :feedback="question.feedback" :hint="question.hint"
                                    @get-answer="processDragAndDrop" @next-jumpstart-quiz="nextJumpstartQuiz" @done-jumpstart-quiz="doneJumpstartQuiz"
                                />
                                <VenDiagram 
                                    v-else-if="question.type == 8"
                                    :question="question.question" :num="question.num" :label="question.label"
                                    :last="last" :feedback="question.feedback" :hint="question.hint"
                                    @get-answer="processDragAndDrop" @next-jumpstart-quiz="nextJumpstartQuiz" @done-jumpstart-quiz="doneJumpstartQuiz"
                                />
                                <DropDown 
                                    v-else-if="question.type == 9"
                                    :question="question.question" :num="question.num" :options="question.options"
                                    :last="last" :feedback="question.feedback" :hint="question.hint" :answer="question.answer"
                                    @get-answer="processDragAndDrop" @next-jumpstart-quiz="nextJumpstartQuiz" @done-jumpstart-quiz="doneJumpstartQuiz"
                                />
                            </div>
                        </Transition>
                    </Modal>
                </Transition>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import MultipleChoice from './MultipleChoice.vue';
import Identification from './Identification.vue';
import Modal from '../Modal.vue';
import Button from '../Button.vue';
import Essay from './Essay.vue';
import Riddle from './Riddle.vue';
import Question from './Riddle.vue';
import DragAndDrop from './DragAndDrop.vue';
import Thesis from './Thesis.vue';
import { ref, reactive } from 'vue';
import VenDiagram from './VenDiagram.vue';
import DropDown from './DropDown.vue';

const emits = defineEmits(['updateQuiz', 'triggerDone'])

interface QuestionForm{
    questions ?: {
        num: number,
        question: string,
        label?: {subject1: string, subject2: string},
        choices?: {
            label: string,
            answer: boolean,
            error: boolean,
            success: boolean,
            black: boolean,
        }[],
        essay?: {
            black: boolean,
            answer?: string,
        },
        identification?: {
            input: string,
            answer: string,
            opinion: boolean,
            error: boolean,
            success: boolean,
            black: boolean,
        },
        riddle?: {
            answer: string,
            error: boolean,
            success: boolean,
            clues: string[]
        },
        options?: string[],
        texts?: string[],
        emptys?: {cause: string, effect: string}[],
        choice2?: string,
        feedback?: string,
        type?: number
        hint?: string,
        answer?: string,
    }[],
    paper?: boolean,
    done: boolean,
    content: string,
    id: string,
    title: string,
    body?: string,

    nId: string,
    label: string,
    ind: number,

    last?: boolean, //temporary

    score: number,
    active: number,
}

const props = withDefaults( defineProps<QuestionForm>(), {
    questions: () => [],
    last: true,
})

const length = props.questions.length;
let showQuestion = ref(!props.done);
let showModal = ref(false);
let active = ref(props.active);
let last = ref(active.value == length -1);
let btnLabel = ref("Start");
let currAnswer: any = '';
let score = props.score;
let question = reactive(props.questions[active.value])

const quizAnimations = () => {
    showQuestion.value = false;
    setTimeout(() => {
        showQuestion.value = true;
    }, 250)
}

const toggleModal = () => {
    showModal.value = true
    btnLabel.value = "Resume"
}

const processAnswer = ( {ind, choice2}: {ind: number, choice2: string}) =>{
    if(question.choices){
        if(question.choices[ind].answer){
            question.choices[ind].success = true;
            score++;
        }
        else{
            question.choices[ind].error = true;
        }
        
        for(let i = 0; i < 4; i++){
            if(i != ind) question.choices[i].black = true;
        }
    }

    if(choice2){
        currAnswer = {ind: 0, choice2: choice2};
    }
    else{
        currAnswer = ind
    }
}

const processDragAndDrop = (answer: {cause: string, effect: string}[] ) => {
    currAnswer = answer;
}

const processIdentification = (answer: string) =>{
    if(question.identification){
        
        if(question.identification.opinion){
            question.identification.black = true
        }
        else if(answer.trim().toLowerCase() == question.identification.answer.trim().toLowerCase()){
            question.identification.success = true
            score++;
        }
        else{
            question.identification.error = true
        }
    }
    else if(question.essay){
        question.essay.black = true;
    }
    else if(question.riddle){
        if(answer.trim().toLowerCase() == question.riddle.answer.trim().toLowerCase()){
            question.riddle.success = true
            score++;
        }
        else{
            question.riddle.error = true
        }
    }

    currAnswer = answer;
}

const nextJumpstartQuiz = () =>{
    emits('updateQuiz',  {ind: props.ind, answer: currAnswer, score: score});
    
    setTimeout(() => {
        active.value++;

        if(active.value < length) question = reactive(props.questions[active.value]);
        if(active.value == length -1) last.value = true
    }, 250)

    quizAnimations();
}

const doneJumpstartQuiz = () =>{
    quizAnimations();

    setTimeout(() => {
        emits('triggerDone', { ind: props.ind, id: props.nId, label: props.label, score: score, answer: currAnswer});
    }, 250)
}
</script>

<style scoped lang="scss">
.content-box{
    margin-top: 3rem;
    
    .content{
        margin-top: 2rem;
        font-family: Arial;
        font-weight: bold;

        padding-left: 3rem;
        padding-right: 3rem;

        .done-box{
            background-color: #F5F5F5;
            display: flex;
            align-items: center;
            padding: 1rem;
            border-radius: 2px;
            max-width: 400px;

            box-shadow: 0rem 0rem .25rem rgba($color: #000000, $alpha: .6);

            i{
                color: #080;
                font-size: 30px;
                margin-right: 1.5rem;
            }

            h4{
                margin: 0px;
            }
        }
    }
}

.pl0{
    padding-left: 0px !important;
}

.pl0{
    padding-left: 0px !important;
}
    
.left-enter-active{
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.left-enter-from,
.left-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.fade-enter-active{
    transition: all 0.35s ease
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}


</style>