<template>
    <div class="module-box">
        <TransitionGroup name="left" tag="div" class="navigation">
            <a v-for="(navigation, ind) in module.navigations" :class="{active: navigation.active}" :href="`#${navigation.id}`" :key="`${ind}navigation`">
                <i :class="`fa-${navigation.active ? 'solid active' : 'regular'} fa-square`"></i>
                {{ navigation.label }}
            </a>
        </TransitionGroup>

        <div class="module-content">
            <Introduction 
                :done="module.animations.jumpstart" title="Module 4: COMPARISON AND CONTRAST" 
                :target="targets" @close-button="nextContent"
            />

            <Transition name="left">
                <Content 
                    :last="false"
                    v-show="module.animations.jumpstart"  :done="module.doneQuiz.jumpstart" :questions="jumpstartQuestions"
                    n-id="figure" label="Figure it out" :ind="0"  :active="module.jumpstartQuiz.active" :score="module.jumpstartQuiz.score"
                    title="Make a Jumpstart" id="jumpstart" content="Jumpstart" @trigger-done="doneContent"
                    body=""  @update-quiz="updateQuiz"
                />
            </Transition>

            <Transition name="top">
                <Figure :done="module.animations.drill" v-show="module.animations.figure" :module="4" @close-button="nextContent" />
            </Transition>
            
            <Transition name="top">
                <Content 
                    :last="false"
                    v-show="module.animations.drill"  :done="module.doneQuiz.drill" @trigger-done="doneContent" :questions="drillQuestions"
                    n-id="gauge" label="Gauge your understanding" :ind="1" @update-quiz="updateQuiz" :active="module.drillQuiz.active" :score="module.drillQuiz.score"
                    title="Do the Drill" id="drill" content="Drill"
                />
            </Transition>

            <Transition name="top">
                <div class="answer-key" v-show="module.doneQuiz.drill">
                    <p><b>Answer Key </b></p>
                    <img src="/saraandbongbonganswer.png" width="700" alt="Jumpstart 1 answer key">
                    <img src="/readinganswer.png" style="margin-top: 2rem;" width="550" alt="Drill 1 answer key">
                </div>
            </Transition>

            <Transition name="left">
                <Button v-show="module.doneQuiz.drill" style="float: right; margin: 0px; margin-bottom: 1.5rem;">
                    <router-link class="link-btn" to="/module/4">Module 5</router-link>
                    <template v-slot:icon>
                        <i class="fa-solid fa-caret-right"></i>
                    </template>
                </Button>
            </Transition>
        </div>

    </div>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount } from 'vue';
import Introduction from '@/components/module/Introduction.vue';
import Content from '@/components/module/QuizContent.vue';
import Figure from '@/components/module/Figure.vue';
import Button from '@/components/Button.vue';

interface Quiz{
    active: number,
    score: number,
    answer: any[],
}
        
interface Module{
    navigations:{
        label: string,
        id: string,
        active: boolean,
    }[],
    doneQuiz: {
        jumpstart: boolean,
        drill: boolean,
        gauge: boolean,
    },
    animations: {
        jumpstart: boolean,
        figure: boolean,
        drill: boolean,
        gauge: boolean,
    },
    jumpstartQuiz: Quiz,
    drillQuiz: Quiz,
    gaugeQuiz: Quiz,
}

let module: Module = reactive({
    navigations: [{
        label: "Introduction",
        id: "intro",
        active: true,
    }],
    doneQuiz: {
        jumpstart: false,
        drill: false,
        gauge: false,
    },
    animations: {
        jumpstart: false,
        figure: false,
        drill: false,
        gauge: false,
    },
    jumpstartQuiz:{
        active: 0,
        score: 0,
        answer: [],
    },
    drillQuiz: {
        active: 0,
        score: 0,
        answer: [],
    },
    gaugeQuiz: {
        active: 0,
        score: 0,
        answer: [],
    },
})

const moduleName = 'module4'

const targets = [
    'A.	Analyze and evaluate information by comparing and contrasting two different ideas.',
    'B.	Recognize and use compare-and-contrast text structure.',
]; 

const jumpstartQuestions: {
    num: number,
    question: string,
    feedback?: string,
    type?: number,
    hint?: string,
    label?: {subject1: string, subject2: string},
}[] = [
    {
        question: `
            Matching Game: Drag the box of your answer next to the idea that it is most closely related to so that you form a correct and meaningful sentence. 
            <br><br><img src="/saraandbongbong.png" width="450">
            <br>
        `,
        label: { subject1: 'President Bongbong Marcos', subject2: 'Vice President Sarah Duterte'},
        type: 8,
        num: 1,
        hint: 'How much do you know the two highest officials in our country?'
    },

];

const drillQuestions: {
    num: number,
    question: string,
    feedback?: string,
    type?: number,
    hint?: string,
    essay?: {
        black: boolean,
        answer?: string,
    },
    label?: {subject1: string, subject2: string},
}[] = [
    {
        question: `
        Reading a book and watching a movie of the same story have a number of similarities and differences. They are similar as they both tell a story and give details and information about the narrative. Reading books or watching movies gives the reader and the viewer the same feeling and emotions about the story. Both require reader to understand what is happening to get the story. Books and movies have their own importance and it completely depends on people whether they prefer reading books or watching movies. 
        <br><br>
        While reading books require readers to have a broad imagination and open their mind for thoughts and visions, movies give an image of the story to the viewers. Reading books requires dedication and time; on the other hand, watching movies can save time. While watching movies is easier, people still prefer reading books because they have more characters and suspense. Movie producers eliminate some characters and details about the story in order to squeeze everything into one to two hours. Also, watching movies provide superior picture about the story since it is visual and is within a short timeframe, so the audience can remember the story easier. Furthermore, you can do anything while watching movies. For instance, you can do your assignment while watching movies or cook food and watch movies. In contrast, you need to be fully focused on reading a book, or else you won’t understand what’s happening in the story. Reading books can not only enhance the readers’ vocabulary and creativity, but also increase their reading and writing skills unlike watching movies which only provides entertainment.
        <br><br>
        Books and movies have their own importance, and it completely depends on people whether they prefer reading books or watching movies. Their reasons can be different on their preference for books or movies, but whatever the reason is, reading books and watching movies have the same purpose in their life. Both tell a story and give details and information, and people read books or watch movies to entertain and utilize their leisure.
        `,
        label: { subject1: 'Reading Book', subject2: 'Watching Movies'},
        type: 8,
        num: 1,
        hint: 'A.	Below is a paragraph of comparison and contrast between books and movies. Try to enumerate the similarities and differences between books and movies by putting your answers in the graphic organizer.'
    },
    {
        question: `
            <img src="/covid.png" width="450">
            <br>
        `,
        essay:{
            black: false,
        },
        type: 3,
        num: 1,
        hint: 'B.	The similarities and differences of COVID-19 and flu or influenza are shown in the diagram below. Convert it into a paragraph format, and write the information in complete sentences so that you form a unified and coherent paragraph.'
    },
];

const addNavigation = (id: string,  label: string) =>{

    module.navigations[module.navigations.length-1].active = false

    module.navigations.push({
        label: label,
        id: id,
        active: true,
    })

    localStorage.setItem(moduleName, JSON.stringify(module))
}

const nextContent = (ind: number) => {
    if(ind == 0){
        module.animations.jumpstart=true
        addNavigation("jumpstart", "Jumpstart");
    }
    else if(ind == 1){
        module.animations.drill=true
        addNavigation("drill", "Drill");
    }
}

const doneContent = ( {ind, id, label, answer, score}: {ind: number, id: string, label: string, answer: any, score: number}) =>{
    console.log(answer)
    if(ind == 0){
        module.doneQuiz.jumpstart=true
        module.jumpstartQuiz.answer.push(answer);
        module.jumpstartQuiz.score = score;
    }
    else if(ind == 1){
        module.doneQuiz.drill=true
        module.drillQuiz.answer.push(answer);
        module.drillQuiz.score = score;

        let storage = localStorage.getItem('completeModules');

        if(storage){
            interface Modules {
                module1: boolean,
                module2: boolean,
                module3: boolean,
                module4: boolean,
                module5: boolean,
                module6: boolean,
            }

            let data: Modules = JSON.parse(storage)

            data.module4 = true;
            localStorage.setItem('completeModules', JSON.stringify(data))
        }
    }
    setTimeout(() => {
        if(ind == 0){
            module.animations.figure=true
        }
        else if(ind == 1){
            module.animations.gauge=true
        }
        else if (ind == 2){
            module.animations.gauge=true
        }

        addNavigation(id, label);
    }, 500)
}

const updateQuiz = ({ind, answer, score}:{ind: number, answer: any, score: number}) =>{
    if(ind == 0){
        module.jumpstartQuiz.active++;
        module.jumpstartQuiz.answer.push(answer);
        module.jumpstartQuiz.score = score;
    }
    else if(ind == 1){
        module.drillQuiz.active++;
        module.drillQuiz.answer.push(answer);
        module.drillQuiz.score = score;
    }
    else if (ind == 2){
        module.gaugeQuiz.active++;
        module.gaugeQuiz.answer.push(answer);
        module.gaugeQuiz.score = score;
    }

    localStorage.setItem(moduleName, JSON.stringify(module))
}

onBeforeMount(() => {

    let storage = localStorage.getItem(moduleName);

    if(storage){
        let data: Module = JSON.parse(storage)

        module = reactive(data)
    }
    else{
        localStorage.setItem(moduleName, JSON.stringify(module))
    }
})

</script>

<style scoped lang="scss">

.module-box{
    flex: 1;
    .link-btn{
        color: white;
        text-decoration: none;
        margin-right: .5rem;
    }
    .navigation{
        display: flex;
        align-items: center;
        padding-left: 1rem;
        padding-bottom: 1rem;
        background-color: #d4d4d4;

        a{
            display: flex;
            align-items: center;
            margin-bottom: 0px;
            margin-top: 1.5rem;
            text-decoration: none;
            color: black;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 18px;

            &.active{
                font-weight: bold;
            }
        }

        i{
            margin-right: 1rem;
            margin-left: 1rem;
            font-size: 11px;
            transform: rotate(0deg);
            transition: all .45s ease;

            &.active{
                transform: rotate(45deg);
            }
        }
    }

    .module-content{
        padding: 1rem 1.5rem 1rem 1.5rem;

        .answer-key{
            display: flex;
            flex-direction: column;
            margin-top: 2rem;
        }
        // #figure{
        //     margin-top: 3rem;
        //     margin-bottom: 3rem;
        // }
    }
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