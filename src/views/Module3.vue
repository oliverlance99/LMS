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
                :done="module.animations.jumpstart" title="Module 3: CAUSE-EFFECT RELATIONSHIP" 
                :target="targets" @close-button="nextContent"
            />

            <Transition name="left">
                <Content 
                    :last="false"
                    v-show="module.animations.jumpstart"  :done="module.doneQuiz.jumpstart"  :questions="jumpstartQuestions"
                    n-id="figure" label="Figure it out" :ind="0"  :active="module.jumpstartQuiz.active" :score="module.jumpstartQuiz.score"
                    title="Make a Jumpstart" id="jumpstart" content="Jumpstart" @trigger-done="doneContent"
                    body=""  @update-quiz="updateQuiz"
                />
                
            </Transition>

            <Transition name="top">
                <Figure :done="module.animations.drill" v-show="module.animations.figure" :module="3" @close-button="nextContent" />
            </Transition>
            
            <Transition name="top">
                <Content 
                    :last="false"
                    v-show="module.animations.drill"  :done="module.doneQuiz.drill" @trigger-done="doneContent" :questions="drillQuestions"
                    n-id="gauge" label="Gauge your understanding" :ind="1" @update-quiz="updateQuiz" :active="module.drillQuiz.active" :score="module.drillQuiz.score"
                    title="Do the Drill" id="drill" content="Drill" body="Read the passage and answer the question that follows. Choose and click the button that corresponds to the letter of the best answer."
                />
            </Transition>

            <Transition name="top">
                <Content 
                    v-show="module.animations.gauge"  :done="module.doneQuiz.gauge" @trigger-done="doneContent" :questions="gaugeQuestions"
                    n-id="test" label="Test yourself" :ind="2" @update-quiz="updateQuiz" :active="module.gaugeQuiz.active" :score="module.gaugeQuiz.score"
                    title="Gauge your understanding" id="gauge" content="Excercise" body="" :last="false" 
                />
            </Transition>

            <Transition name="left">
                <Button v-show="module.doneQuiz.gauge" style="float: right; margin: 0px; margin-bottom: 1.5rem;">
                    <router-link class="link-btn" to="/module/4">Module 4</router-link>
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

const moduleName = 'module3'

const targets = [
    'A.	Connect actions and events that show cause-effect relationship.',
    'B.	Identify cause-effect relationships in non-fiction texts.',
]; 

const jumpstartQuestions: {
    num: number,
    question: string,
    feedback?: string,
    type?: number,
    hint?: string,
    texts?: string[], 
    emptys?: {cause: string, effect: string}[],
}[] = [
    {
        question: `
            Matching Game: Drag the box of your answer next to the idea that it is most closely related to so that you form a correct and meaningful sentence. 
        `,
        texts: [
            'If people do not believe that mathematics is simple,',
            'Math is like going to the gym for your brain;',
            'Mathematics continues to be one of the most challenging subjects in schools,',
            'Students with good mathematical skills can think analytically and have better reasoning abilities.',
            'Poor performance across grades and subjects',
            'so the majority of students have a phobia of this subject.',
            'it sharpens your mind.',
            'That is why it is used as an essential entry requirement for most of the courses at higher education institutes.',
            'are deeply rooted in students’ limited proficiency in the language of instruction.',
            'it is only because they do not realize how complicated life is.',
        ],
        emptys: [
            {cause: '', effect: ''},
            {cause: '', effect: ''},
            {cause: '', effect: ''},
            {cause: '', effect: ''},
            {cause: '', effect: ''},
        ],
        type: 6,
        num: 1,
    },

];

const drillQuestions: {
    num: number,
    question: string,
    choices?: {
        label: string,
        answer: boolean,
        error: boolean,
        success: boolean,
        black: boolean,
    }[],
    choice2?: string,
    feedback?: string,
    type?: number,
    hint?: string,
}[] = [
    {
        question: `
        Parents and teachers are always advised to give children storybooks for sharing with playmates, read them bedtime tales before sleeping, and expose them to various printed materials at a very young age. 
        `,
        choices: [
            { label: 'They become nerds who bury themselves in books.', answer: false, success: false, error: false, black: false },
            { label: 'They become storytellers themselves when they grow up.', answer: false, success: false, error: false, black: false },
            { label: 'They develop genuine love for reading and a habit to read.', answer: true, success: false, error: false, black: false },
            { label: 'They lose opportunities to enjoy their childhood through play.', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 1,
    },
    {
        question: `
        Countless Filipino children still don’t have access to books, especially those in underprivileged, remote and conflicted areas across the country.

        <br><br>Which of the following is the most logical effect of the given statement?

        `,
        choices: [
            { label: 'They become nerds who bury themselves in books.', answer: false, success: false, error: false, black: false },
            { label: 'They become storytellers themselves when they grow up.', answer: false, success: false, error: false, black: false },
            { label: 'They develop genuine love for reading and a habit to read.', answer: true, success: false, error: false, black: false },
            { label: 'They lose opportunities to enjoy their childhood through play.', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 2,
    },
    {
        question: `
        According to World Bank data, learning poverty in the Philippines was already at 69.5 percent in 2019, quantum leaping to 90 percent in August 2021, and inching up to 90.9 percent by June 2022. Learning poverty is the inability to read or understand a simple text or story at 10, the age that children should be reading.

        Which of the following is the most probably the biggest cause of learning poverty among 10-year old learners in the Philippines?

        `,
        choices: [
            { label: 'Many Filipino children are not studying or are out of school.', answer: false, success: false, error: false, black: false },
            { label: 'Many educators are not able to teach well the subjects assigned to them.', answer: true, success: false, error: false, black: false },
            { label: 'Most students in public schools have fewer resources at home to complete school work.', answer: false, success: false, error: false, black: false },
            { label: 'The ability of the children’s brains to absorb learning is compromised due to poor nourishment.', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 3,
    },
    {
        question: `
        The shift to remote learning during the pandemic has exposed millions of students to an intensive integration of technology into their studies. The use of digital technologies in the Philippines, however, is still below its potential and trailing behind many of its neighbors.

        <br><br>What is the most evident effect of this technological circumstance of our country to the learners?

        `,
        choices: [
            { label: 'They learned more than enough since information is at their fingertips.', answer: false, success: false, error: false, black: false },
            { label: 'They felt the convenience of learning without having to get ready to go to school.', answer: false, success: false, error: false, black: false },
            { label: 'Many get frustrated being unable to access information and learning materials instantly.', answer: true, success: false, error: false, black: false },
            { label: 'They became multitaskers, studying online while playing online games and chatting with friends.', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 4,
    },
    {
        question: `
        The lack of classrooms in public schools has been a problem for many decades. Despite a continuing program to build more schools and classrooms, the infrastructure expansion cannot keep up with the booming student population.

        <br><br>Which of the following is NOT an immediate effect of this condition and reality?

        `,
        choices: [
            { label: 'Lack of classrooms brings a negative impact on academic achievement.', answer: false, success: false, error: false, black: false },
            { label: 'Students transfer from public to private schools for learning convenience.', answer: true, success: false, error: false, black: false },
            { label: 'Classes within one day are divided into two shifts – AM and PM sessions.', answer: false, success: false, error: false, black: false },
            { label: 'Students are forced to learn in cramped, uncomfortable spaces, making the classroom a poor learning environment.', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 5,
    },

];

const gaugeQuestions: {
    num: number,
    question: string,
    hint?: string,
    essay?: {
        black: boolean,
        answer?: string,
    },
    feedback?: string,
    type?: number,
    paper?: boolean,
}[]  = [
    {
        question: `
            Some school children have developed genuine love for reading.
            <br><br>
            Indicate the cause and effect.
        `,
        paper: false,
        essay:{
            black: false,
            answer: `
Cause: 
Effect: 
`
        },
        type: 3,
        num: 1,
        hint: 'A.	Give the direct or most immediate causes or effects of the following. Construct your answers in complete sentences. Number 1 has been done for you.'
    },
    {
        question: `
            Many children nowadays do not like reading physical books.
            <br><br>
            Indicate the cause and effect.
            `
        ,
        paper: false,
        essay:{
            black: false,
            answer: `
Cause: 
Effect: 
`
        },
        type: 3,
        num: 2,        
        hint: 'A.	Give the direct or most immediate causes or effects of the following. Construct your answers in complete sentences. Number 1 has been done for you.'

    },
    {
        question: `
            Reading books allows us to travel around the world without having to spend a single cent.
            <br><br>
            Indicate the two effects.
        `,
        paper: false,
        essay:{
            black: false,
        },
        type: 3,
        num: 3,
        hint: 'A.	Give the direct or most immediate causes or effects of the following. Construct your answers in complete sentences. Number 1 has been done for you.'
    },
    {
        question: `
            There are about 2 million adult Filipinos who are not able to read and write. 
            <br><br>
            Indicate the cause and effect.
        `,
        paper: false,
        essay:{
            black: false,
            answer: `
Cause: 
Effect: 
`
        },
        type: 3,
        num: 4,
        hint: 'A.	Give the direct or most immediate causes or effects of the following. Construct your answers in complete sentences. Number 1 has been done for you.'
    },
    {
        question: `
            The Philippines has one of the lowest standards for basic education among all developing countries
            <br><br>
            Indicate the cause and effect.
        `,
        paper: false,
        essay:{
            black: false,
            answer: `
Cause: 
Effect: 
`
        },
        type: 3,
        num: 5,
        hint: 'A.	Give the direct or most immediate causes or effects of the following. Construct your answers in complete sentences. Number 1 has been done for you.'
    },

    {
        question: `
            <img src="/causeandeffect.png" width="500" />
        `,
        paper: false,
        essay:{
            black: false,
        },
        type: 3,
        num: 1,
        hint: 'B.	Use the context of this statement and create a graphic organizer showing causes and effects of the situation given in the sentence. Write your answers in complete sentences.'
    },

    {
        question: `
        `,
        paper: false,
        essay:{
            black: false,
        },
        type: 7,
        num: 1,
        hint: 'C.	Use the following as your thesis statement or main idea in developing a two to three-paragraph essay. You may add additional minor details explaining or describing further the given causes and effects to improve the clarity of your composition. Also, give your essay a title.'
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
    if(ind == 0){
        module.doneQuiz.jumpstart=true
        module.jumpstartQuiz.answer.push(answer);
        module.jumpstartQuiz.score = score;
    }
    else if(ind == 1){
        module.doneQuiz.drill=true
        module.drillQuiz.answer.push(answer);
        module.drillQuiz.score = score;
    }
    else if (ind == 2){
        module.doneQuiz.gauge=true
        module.gaugeQuiz.answer.push(answer);
        module.gaugeQuiz.score = score;

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

            data.module3 = true;
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