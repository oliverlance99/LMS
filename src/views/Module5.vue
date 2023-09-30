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
                :done="module.animations.jumpstart" title="Module 5: PROBLEM AND SOLUTION" 
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
                <Figure :done="module.animations.drill" v-show="module.animations.figure" :module="5" @close-button="nextContent" />
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
                <Content 
                    v-show="module.animations.gauge"  :done="module.doneQuiz.gauge" @trigger-done="doneContent" :questions="gaugeQuestions"
                    n-id="test" label="Test yourself" :ind="2" @update-quiz="updateQuiz" :active="module.gaugeQuiz.active" :score="module.gaugeQuiz.score"
                    title="Gauge your understanding" id="gauge" content="Excercise" body="" :last="false" 
                />

            </Transition>

            <Transition name="left">
                <div v-show="module.doneQuiz.gauge" >
                    
                    <p style="margin-top: 2rem;"><b>References</b></p>

                    <p>
                        Problem Solution Paragraphs - University of Houston-Victoria. Www.uhv.edu. <a href="https://www.uhv.edu/curriculum-student-achievement/student-success/tutoring/student-resources/e-p/problem-solution-paragraphs" target="_blank">https://www.uhv.edu/curriculum-student-achievement/student-success/tutoring/student-resources/e-p/problem-solution-paragraphs</a>
                    </p>

                    <p>‌International Labor Organization. (2019). Child labor in the Philippines (ILO in the Philippines). Ilo.org. <a href="https://www.ilo.org/manila/areasofwork/child-labour/lang--en/index.htm" target="_blank">https://www.ilo.org/manila/areasofwork/child-labour/lang--en/index.htm</a></p>

                    <p>Top 8 Problem Solution Short Paragraph Examples -English Luv. (2021, November 9). Englishluv.com. <a href="https://englishluv.com/top-8-problem-solution-short-paragraph-examples/" target="_blank">https://englishluv.com/top-8-problem-solution-short-paragraph-examples/</a></p>
                    <p>Problem Solution Essay with Examples and Pro Writing Help. Kingessays.com. <a href="https://kingessays.com/problem-solution-essay.php" target="_blank">https://kingessays.com/problem-solution-essay.php</a></p>
                    
                    <Button style="float: right; margin: 0px; margin-bottom: 1.5rem;">
                        <router-link class="link-btn" to="/module/4">Module 6</router-link>
                        <template v-slot:icon>
                            <i class="fa-solid fa-caret-right"></i>
                        </template>
                    </Button>
                </div>
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

const moduleName = 'module5'

const targets = [
    'A.	Recommend plausible solutions to certain problems.  ',
    'B.	Manifest sufficient amount of awareness on the real world problems.',
    'C.	Write paragraphs using problem-solution relationship.',
]; 

const jumpstartQuestions: {
    num: number,
    question: string,
    hint?: string,
    feedback?: string,
    options?: string[],
    type?: number,
}[]  = [
    {
        question: `
            I don't understand what we are doing in class.
        `,
        options: ['Problem', 'Solution'],
        type: 9,
        num: 1,
    },
    {
        question: `
        Distractions at school can result in poor academic performance.
        `,
        options: ['Problem', 'Solution'],
        type: 9,
        num: 2,
    },
    {
        question: `
        Parents need to closely monitor the activities of their children and restrict their access to certain sites, which can now be done through various computer programs
        `,
        options: ['Problem', 'Solution'],
        type: 9,
        num: 3,
    },
    {
        question: `
        The government should inflict severe fines and jail terms to those who are found to be destroying the environment with their toxic waste.
        `,
        options: ['Problem', 'Solution'],
        type: 9,
        num: 4,
    },
    {
        question: `
        These governments are providing financial support to ensure that habitats are restored and safeguarded
        `,
        options: ['Problem', 'Solution'],
        type: 9,
        num: 5,
    },
    {
        question: `
        Millions of people all over the world live in coastal areas and if the sea rises by even a few feet, they will be inundated with water and lose their property.
        `,
        options: ['Problem', 'Solution'],
        type: 9,
        num: 6,
    },
    {
        question: `
        During the transition from childhood to adulthood, while their bodies are morphing into new shapes and sizes, teens are struggling to come to terms with their bodies and get comfortable inside their own skins. The cherubic child is gone, and they are left looking at a stranger in the mirror: gawky, gangly, hairy, zitty, and unfamiliar.
        `,
        options: ['Problem', 'Solution'],
        type: 9,
        num: 7,
    },
    {
        question: `
        In many parts of the world, crocodiles have become endangered that there are not too many them now as there used to be.
        `,
        options: ['Problem', 'Solution'],
        type: 9,
        num: 8,
    },
    {
        question: `
        The English teachers have made each class put up a mini library corner in the classroom in order to encourage the reluctant readers to read more frequently. 
        `,
        options: ['Problem', 'Solution'],
        type: 9,
        num: 9,
    },
    {
        question: `
        Parents who are quite anxious about their children being too shy and low on confidence enroll their kids in extra-curricular activities and interests outside school to keep them motivated and help them succeed at school.
        `,
        options: ['Problem', 'Solution'],
        type: 9,
        num: 10,
    },
];

const drillQuestions: {
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
        Drive Against Illiteracy<br>
        Illiteracy is the biggest curse in our social life. Without higher education, no person can succeed socially and economically. Every responsible citizen should then participate in the campaign against Illiteracy. Various organizations can play a good role in this regard. Government should actively promote education in rural and backward areas. Education centers should be established in different parts of the country and this responsibility should be taken directly by students and teachers.

        <br><br>
        Indicate the Problem and Solution.
        `,
        paper: false,
        essay:{
            black: false,
            answer: `
Problem: 
Solution: 
`
        },
        type: 3,
        num: 1,
        hint: 'A.	Identify the problem and the solution in each paragraph. Write your answer in the box provided below the item.'
    },
    {
        question: `
        Child Labor
        <br><br>
        <br>There are many children in our country who are deprived of education and the normal joyous experiences of childhood. While upper-middle-class boys and girls attend school, they work in farms and plantations, in dangerous mines, on streets, and in factories. Others work as private child domestic workers in middle-class and upper-class households. Parents are very poor, so children are forced to take up all these occupations.
        <br>Government should come up with strict laws to solve this problem. Along with the law, the government should introduce some economic reforms which will bring down the poverty line to some extent. Apart from this, to solve this problem, illiteracy needs to be eliminated and the birth rate must be controlled.

        <br><br>
        Indicate the Problem and Solution.
        `,
        paper: false,
        essay:{
            black: false,
            answer: `
Problem: 
Solution: 
`
        },
        type: 3,
        num: 2,      
        hint: 'A.	Identify the problem and the solution in each paragraph. Write your answer in the box provided below the item.'
    },
    {
        question: `
        Sound Pollution
        <br>Noise pollution has a very harmful effect on people’s normal living and health. Whether we go to schools, colleges, offices, and hospitals, sound pollution chases us. Hearing loss, cardiovascular disease and urban sleeping disturbance are some of the harmful effects of noise pollution on humans. The government should formulate strict rules and monitor how they are implemented. People need to be made aware of the negative aspects of sound pollution.

        <br><br>
        Indicate the Problem and Solution.
        `,
        essay:{
            black: false,
            answer: `
                Problem: 
                Solution: 
            `
        },
        type: 3,
        num: 3,
        hint: 'A.	Identify the problem and the solution in each paragraph. Write your answer in the box provided below the item.'
    },
    {
        question: `
        Some dogs and cats do not have homes. People started animal shelters to take care of these animals and solve the problem of homeless animals. At the shelters, dogs and cats get food and water. They get to play with other dogs and cats. Sometimes, people bring a lost animal to the shelter. Some of these dogs and cats get a new home! People come to animal shelters to get a new pet.
        <br><br>
        Indicate the Problem and Solution.
        `,
        essay:{
            black: false,
            answer: `
Problem: 
Solution: 
`
        },
        type: 3,
        num: 4,
        hint: 'A.	Identify the problem and the solution in each paragraph. Write your answer in the box provided below the item.'
    },
    {
        question: `
        Millions of Filipinos have been victims of identity theft. Their identity was used in various scams: to open a financial account fraudulently, to make payments or transfer money, withdrawals, and others. The victim’s identity and other personal information may be taken from debit or credit cards, licenses and personal IDs, emails, online shopping accounts and others. While this is becoming a rampant problem, this can be resolved by keeping personal information secure, by keeping documents and important ID cards in a safe place, monitoring own bank accounts, by using different and strong passwords for each account, and others.
        <br><br>
        Indicate the Problem and Solution.
        `,
        essay:{
            black: false,
            answer: `
Problem: 
Solution: 
`
        },
        type: 3,
        num: 5,
        hint: 'A.	Identify the problem and the solution in each paragraph. Write your answer in the box provided below the item.'
    },
];

const gaugeQuestions: {
    num: number,
    question: string,
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
    hint?: string,
    answer?: string,
    type?: number
}[]  = [
    // Start Random
    {
        question: `
        One of the most serious issues facing the majority of large urban areas is traffic jams. The main reason for this is that there are too many private cars on the roads these days, and a viable solution is to introduce more park-and-ride schemes.
        <br<br>
        <br>The number of people owning cars is increasing year on year, with most families now having more than one car. Most people like the convenience of traveling at the time they want to rather than being restricted to public transport timetables, so they prefer to drive themselves around rather than taking the bus or train. This is despite the fact that they frequently have to sit in long traffic queues as they near the city center. 
        <br>A solution that is proving successful in many areas is park-and-ride schemes. This is where you park your car free on the outskirts of the city and take a bus for the final part of your journey. The fee you have to pay for the bus trip is usually very small, and this public transport system is generally very regular, running every ten minutes or so. 
        <br>To conclude, the major urban problem of traffic congestion caused by the excessive number of private cars on city roads can be partly alleviated by the introduction of park-and-ride systems on city fringes.
        <br<br>
        
        <p><b>What problem is presented in the passage?</b></p>
        `,
        choices: [
            { label: 'Traffic jams', answer: true, success: false, error: false, black: false },
            { label: 'Sitting in long traffic cues', answer: false, success: false, error: false, black: false },
            { label: 'Too many cars on the roads', answer: false, success: false, error: false, black: false },
            { label: 'Number of people owning cars', answer: false, success: false, error: false, black: false },
        ],
        hint: 'A.	Answer the questions below each passage. Tick the button that corresponds to the letter of the correct answer.',
        type: 1,
        num: 1,
    },
    {
        question: `
        One of the most serious issues facing the majority of large urban areas is traffic jams. The main reason for this is that there are too many private cars on the roads these days, and a viable solution is to introduce more park-and-ride schemes.
        <br<br>
        <br>The number of people owning cars is increasing year on year, with most families now having more than one car. Most people like the convenience of traveling at the time they want to rather than being restricted to public transport timetables, so they prefer to drive themselves around rather than taking the bus or train. This is despite the fact that they frequently have to sit in long traffic queues as they near the city center. 
        <br>A solution that is proving successful in many areas is park-and-ride schemes. This is where you park your car free on the outskirts of the city and take a bus for the final part of your journey. The fee you have to pay for the bus trip is usually very small, and this public transport system is generally very regular, running every ten minutes or so. 
        <br>To conclude, the major urban problem of traffic congestion caused by the excessive number of private cars on city roads can be partly alleviated by the introduction of park-and-ride systems on city fringes.
        <br<br>

        <p><b>What solution is proposed?</b></p>
        `,
        choices: [
            { label: 'Sitting in long traffic cues', answer: false, success: false, error: false, black: false },
            { label: 'Introduction of park-and-ride schemes', answer: true, success: false, error: false, black: false },
            { label: 'Using public transport instead of private cars', answer: false, success: false, error: false, black: false },
            { label: 'Decreasing the number of people owning cars', answer: false, success: false, error: false, black: false },
        ],
        hint: 'A.	Answer the questions below each passage. Tick the button that corresponds to the letter of the correct answer.',
        type: 1,
        num: 2,
    },
    {
        question: `
        One of the most serious issues facing the majority of large urban areas is traffic jams. The main reason for this is that there are too many private cars on the roads these days, and a viable solution is to introduce more park-and-ride schemes.
        <br<br>
        <br>The number of people owning cars is increasing year on year, with most families now having more than one car. Most people like the convenience of traveling at the time they want to rather than being restricted to public transport timetables, so they prefer to drive themselves around rather than taking the bus or train. This is despite the fact that they frequently have to sit in long traffic queues as they near the city center. 
        <br>A solution that is proving successful in many areas is park-and-ride schemes. This is where you park your car free on the outskirts of the city and take a bus for the final part of your journey. The fee you have to pay for the bus trip is usually very small, and this public transport system is generally very regular, running every ten minutes or so. 
        <br>To conclude, the major urban problem of traffic congestion caused by the excessive number of private cars on city roads can be partly alleviated by the introduction of park-and-ride systems on city fringes.
        <br<br>

        <p><b>What is the main cause of the problem?</b></p>
        `,
        choices: [
            { label: 'Having more than one car', answer: false, success: false, error: false, black: false },
            { label: 'Lack of parking spaces in the city', answer: false, success: false, error: false, black: false },
            { label: 'Increasing number of people owning cars', answer: false, success: false, error: false, black: false },
            { label: 'Excessive number of private cars on city roads ', answer: true, success: false, error: false, black: false },
        ],
        hint: 'A.	Answer the questions below each passage. Tick the button that corresponds to the letter of the correct answer.',
        type: 1,
        num: 3,
    },
    {
        question: `
        One of the most serious issues facing the majority of large urban areas is traffic jams. The main reason for this is that there are too many private cars on the roads these days, and a viable solution is to introduce more park-and-ride schemes.
        <br<br>
        <br>The number of people owning cars is increasing year on year, with most families now having more than one car. Most people like the convenience of traveling at the time they want to rather than being restricted to public transport timetables, so they prefer to drive themselves around rather than taking the bus or train. This is despite the fact that they frequently have to sit in long traffic queues as they near the city center. 
        <br>A solution that is proving successful in many areas is park-and-ride schemes. This is where you park your car free on the outskirts of the city and take a bus for the final part of your journey. The fee you have to pay for the bus trip is usually very small, and this public transport system is generally very regular, running every ten minutes or so. 
        <br>To conclude, the major urban problem of traffic congestion caused by the excessive number of private cars on city roads can be partly alleviated by the introduction of park-and-ride systems on city fringes.
        <br<br>

        <p><b>Which paragraph provides the description of the solution?</b></p>
        `,
        choices: [
            { label: 'First paragraph ', answer: false, success: false, error: false, black: false },
            { label: 'Second paragraph', answer: false, success: false, error: false, black: false },
            { label: 'Third paragraph', answer: true, success: false, error: false, black: false },
            { label: 'Fourth paragraph', answer: false, success: false, error: false, black: false },
        ],
        hint: 'A.	Answer the questions below each passage. Tick the button that corresponds to the letter of the correct answer.',
        type: 1,
        num: 4,
    },
    //
    {
        question: `
        Effective communication is one of the aspects in building a family where every member is happy and peaceful at home and has a good relationship with the rest of the house folks. Yet, one of the most common problems of many families today is poor or lack of communication with one another. Family members do not talk to one another as often as possible. Members disregard the points of view and perspectives of their loved ones. Unnecessary arguments always occur which resolves nothing, thus making the problems bigger. It may also include keeping secrets and holding grudges with each other. 
        <br>Poor or lack of proper communication may be caused by everyone's busy schedule. Another reason is not paying too much attention when someone is talking; sentiments are being ignored. This   may   lead   to   misunderstandings   and   conflict   within   family   members. When this prolongs or continues, the members become distant with the family. 
        <br>So, how can this problem within the family be resolved? Establishing a more open and honest communication is the key. First of all, parents should set the example; they should listen and be open when expressing their feeling and thoughts to the children. If parents are doing this, the children are likely to follow the same practice. It is also a good idea to take some conscious effort and ask a member of the family if something seems wrong or troubling him or her. It may be true that everyone is having a busy schedule, but it is important to make time to talk with loved ones in trying times and inconveniences. Spending some quality time is another strategy; it is very important, for this can make very significant circumstances in one another’s individual lives emerge or come into view. Even when everything seems all right, asking questions like “How was your day?”, “Where have you been?”, “Are you okay?”, or “You can tell me your problem” is just a simple way to keep in touch and connected between and among the members. It may not be proven effective in the beginning, but in the long run, everybody else in the family will certainly realize its importance and will soon become more open and more understanding of one another. 

        <br<br>

        <p><b>What problem is stated in the essay?</b></p>
        `,
        choices: [
            { label: 'Poor communication within the family', answer: true, success: false, error: false, black: false },
            { label: 'Distrust and disrespect to one another', answer: false, success: false, error: false, black: false },
            { label: 'Busy schedules of the family members', answer: false, success: false, error: false, black: false },
            { label: 'Ignoring some members of the family', answer: false, success: false, error: false, black: false },
        ],
        hint: 'A.	Answer the questions below each passage. Tick the button that corresponds to the letter of the correct answer.',
        type: 1,
        num: 5,
    },
    {
        question: `
        Effective communication is one of the aspects in building a family where every member is happy and peaceful at home and has a good relationship with the rest of the house folks. Yet, one of the most common problems of many families today is poor or lack of communication with one another. Family members do not talk to one another as often as possible. Members disregard the points of view and perspectives of their loved ones. Unnecessary arguments always occur which resolves nothing, thus making the problems bigger. It may also include keeping secrets and holding grudges with each other. 
        <br>Poor or lack of proper communication may be caused by everyone's busy schedule. Another reason is not paying too much attention when someone is talking; sentiments are being ignored. This   may   lead   to   misunderstandings   and   conflict   within   family   members. When this prolongs or continues, the members become distant with the family. 
        <br>So, how can this problem within the family be resolved? Establishing a more open and honest communication is the key. First of all, parents should set the example; they should listen and be open when expressing their feeling and thoughts to the children. If parents are doing this, the children are likely to follow the same practice. It is also a good idea to take some conscious effort and ask a member of the family if something seems wrong or troubling him or her. It may be true that everyone is having a busy schedule, but it is important to make time to talk with loved ones in trying times and inconveniences. Spending some quality time is another strategy; it is very important, for this can make very significant circumstances in one another’s individual lives emerge or come into view. Even when everything seems all right, asking questions like “How was your day?”, “Where have you been?”, “Are you okay?”, or “You can tell me your problem” is just a simple way to keep in touch and connected between and among the members. It may not be proven effective in the beginning, but in the long run, everybody else in the family will certainly realize its importance and will soon become more open and more understanding of one another. 

        <br<br>

        <p><b>How is the problem described?</b></p>
        `,
        choices: [
            { label: 'By giving reasons', answer: false, success: false, error: false, black: false },
            { label: 'By giving examples', answer: true, success: false, error: false, black: false },
            { label: 'Through causes and effects', answer: false, success: false, error: false, black: false },
            { label: 'By enumerating the consequences ', answer: false, success: false, error: false, black: false },
        ],
        hint: 'A.	Answer the questions below each passage. Tick the button that corresponds to the letter of the correct answer.',
        type: 1,
        num: 6,
    },
    {
        question: `
        Effective communication is one of the aspects in building a family where every member is happy and peaceful at home and has a good relationship with the rest of the house folks. Yet, one of the most common problems of many families today is poor or lack of communication with one another. Family members do not talk to one another as often as possible. Members disregard the points of view and perspectives of their loved ones. Unnecessary arguments always occur which resolves nothing, thus making the problems bigger. It may also include keeping secrets and holding grudges with each other. 
        <br>Poor or lack of proper communication may be caused by everyone's busy schedule. Another reason is not paying too much attention when someone is talking; sentiments are being ignored. This   may   lead   to   misunderstandings   and   conflict   within   family   members. When this prolongs or continues, the members become distant with the family. 
        <br>So, how can this problem within the family be resolved? Establishing a more open and honest communication is the key. First of all, parents should set the example; they should listen and be open when expressing their feeling and thoughts to the children. If parents are doing this, the children are likely to follow the same practice. It is also a good idea to take some conscious effort and ask a member of the family if something seems wrong or troubling him or her. It may be true that everyone is having a busy schedule, but it is important to make time to talk with loved ones in trying times and inconveniences. Spending some quality time is another strategy; it is very important, for this can make very significant circumstances in one another’s individual lives emerge or come into view. Even when everything seems all right, asking questions like “How was your day?”, “Where have you been?”, “Are you okay?”, or “You can tell me your problem” is just a simple way to keep in touch and connected between and among the members. It may not be proven effective in the beginning, but in the long run, everybody else in the family will certainly realize its importance and will soon become more open and more understanding of one another. 

        <br<br>

        <p><b>What solution is suggested to solve the problem?</b></p>
        `,
        choices: [
            { label: 'Setting good examples by the parents', answer: false, success: false, error: false, black: false },
            { label: 'Calling one another every now and then', answer: false, success: false, error: false, black: false },
            { label: 'Establishing open and honest communication', answer: true, success: false, error: false, black: false },
            { label: 'Asking questions to know what’s going in each other’s life', answer: false, success: false, error: false, black: false },
        ],
        hint: 'A.	Answer the questions below each passage. Tick the button that corresponds to the letter of the correct answer.',
        type: 1,
        num: 7,
    },
    {
        question: `
        Effective communication is one of the aspects in building a family where every member is happy and peaceful at home and has a good relationship with the rest of the house folks. Yet, one of the most common problems of many families today is poor or lack of communication with one another. Family members do not talk to one another as often as possible. Members disregard the points of view and perspectives of their loved ones. Unnecessary arguments always occur which resolves nothing, thus making the problems bigger. It may also include keeping secrets and holding grudges with each other. 
        <br>Poor or lack of proper communication may be caused by everyone's busy schedule. Another reason is not paying too much attention when someone is talking; sentiments are being ignored. This   may   lead   to   misunderstandings   and   conflict   within   family   members. When this prolongs or continues, the members become distant with the family. 
        <br>So, how can this problem within the family be resolved? Establishing a more open and honest communication is the key. First of all, parents should set the example; they should listen and be open when expressing their feeling and thoughts to the children. If parents are doing this, the children are likely to follow the same practice. It is also a good idea to take some conscious effort and ask a member of the family if something seems wrong or troubling him or her. It may be true that everyone is having a busy schedule, but it is important to make time to talk with loved ones in trying times and inconveniences. Spending some quality time is another strategy; it is very important, for this can make very significant circumstances in one another’s individual lives emerge or come into view. Even when everything seems all right, asking questions like “How was your day?”, “Where have you been?”, “Are you okay?”, or “You can tell me your problem” is just a simple way to keep in touch and connected between and among the members. It may not be proven effective in the beginning, but in the long run, everybody else in the family will certainly realize its importance and will soon become more open and more understanding of one another. 

        <br<br>

        <p><b>How is the solution elaborated?</b></p>
        `,
        choices: [
            { label: 'By giving reasons', answer: false, success: false, error: false, black: false },
            { label: 'By comparing and contrasting', answer: false, success: false, error: false, black: false },
            { label: 'By giving instances or examples', answer: false, success: false, error: false, black: false },
            { label: 'By enumerating the consequences ', answer: false, success: false, error: false, black: false },
        ],
        hint: 'A.	Answer the questions below each passage. Tick the button that corresponds to the letter of the correct answer.',
        type: 1,
        num: 8,
    },
    //
    {
        question: `
        Deforestation is one of the major environmental problems in the Philippines for a number of reasons. First, it has a negative impact on the environment. Deforestation can cause climate change, desertification, soil erosion, fewer crops, flooding, and increased greenhouse gases in the atmosphere. Additionally, deforestation negatively impacts indigenous people who often rely on forests for their livelihoods. Finally, deforestation contributes to poverty and hunger as it decreases the amount of land available for food production. In sum, deforestation is a major problem in the Philippines that must be addressed urgently.
        <br>What can be done to stop deforestation in the Philippines? First, it is important to raise awareness about the issue and its negative impacts. Second, laws and regulations against illegal logging and slash-and-burn farming practices need to be enforced more stringently. Third, alternative livelihoods for people who rely on forests for their income need to be developed. Finally, large-scale reforestation projects should be implemented to help restore lost forests.

        <br<br>

        <p><b>What problem is stated in the passage that needs to be addressed?</b></p>
        `,
        choices: [
            { label: 'Climate change', answer: false, success: false, error: false, black: false },
            { label: 'Deforestation', answer: true, success: false, error: false, black: false },
            { label: 'Indigenous people', answer: false, success: false, error: false, black: false },
            { label: 'Poverty and hunger', answer: false, success: false, error: false, black: false },
        ],
        hint: 'A.	Answer the questions below each passage. Tick the button that corresponds to the letter of the correct answer.',
        type: 1,
        num: 9,
    },
    {
        question: `
        Deforestation is one of the major environmental problems in the Philippines for a number of reasons. First, it has a negative impact on the environment. Deforestation can cause climate change, desertification, soil erosion, fewer crops, flooding, and increased greenhouse gases in the atmosphere. Additionally, deforestation negatively impacts indigenous people who often rely on forests for their livelihoods. Finally, deforestation contributes to poverty and hunger as it decreases the amount of land available for food production. In sum, deforestation is a major problem in the Philippines that must be addressed urgently.
        <br>What can be done to stop deforestation in the Philippines? First, it is important to raise awareness about the issue and its negative impacts. Second, laws and regulations against illegal logging and slash-and-burn farming practices need to be enforced more stringently. Third, alternative livelihoods for people who rely on forests for their income need to be developed. Finally, large-scale reforestation projects should be implemented to help restore lost forests.

        <br<br>

        <p><b>What solution/s are suggested?</b></p>
        `,
        choices: [
            { label: 'Raise awareness about the issue and its negative impacts.', answer: false, success: false, error: false, black: false },
            { label: 'Develop alternative livelihoods for people who rely on forests for their income.', answer: false, success: false, error: false, black: false },
            { label: 'Strictly enforce laws and regulations against illegal logging and slash-and-burn farming practices', answer: false, success: false, error: false, black: false },
            { label: 'All of the above', answer: true, success: false, error: false, black: false },
        ],
        hint: 'A.	Answer the questions below each passage. Tick the button that corresponds to the letter of the correct answer.',
        type: 1,
        num: 10,
    },
    //
    {
        question: `
        The number of Filipino families who live in poverty continues to rise.
        `,
        essay:{
            black: false,
        },
        type: 3,
        num: 1,
        hint: 'B.	Suggest one possible solution to the given real world problem. Write your answer in a complete sentence.'
    },
    {
        question: `
            Climate change is one of the most serious challenges facing humanity. 
        `,
        essay:{
            black: false,
        },
        type: 3,
        num: 2,
        hint: 'B.	Suggest one possible solution to the given real world problem. Write your answer in a complete sentence.'
    },
    {
        question: `
        Almost one billion people around the world have some form of mental disorder, and it has been worsened by the pandemic. 
        `,
        essay:{
            black: false,
        },
        type: 3,
        num: 3,
        hint: 'B.	Suggest one possible solution to the given real world problem. Write your answer in a complete sentence.'
    },
    {
        question: `
        Corruption in the Philippines remains a huge concern as many government officials who implement the anti-corruption laws are the ones violating them. 
        `,
        essay:{
            black: false,
        },
        type: 3,
        num: 4,
        hint: 'B.	Suggest one possible solution to the given real world problem. Write your answer in a complete sentence.'
    },
    {
        question: `
        The national debt of the Philippines has been continuously and consistently getting bigger through the years.
        `,
        essay:{
            black: false,
        },
        type: 3,
        num: 5,
        hint: 'B.	Suggest one possible solution to the given real world problem. Write your answer in a complete sentence.'
    },
    //
    {
        question: `
        `,
        essay:{
            black: false,
        },
        type: 3,
        num: 1,
        hint: 'C.	Choose one of the five presented problems above. Compose a short problem-solution essay of 3-4 paragraphs.'
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

            data.module5 = true;
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