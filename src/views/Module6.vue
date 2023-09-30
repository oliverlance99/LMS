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
                :done="module.animations.jumpstart" title="Module 6: FACT AND OPINION" 
                :target="targets" @close-button="nextContent"
            />

            <Transition name="left">
                <Content 
                    :last="false"
                    v-show="module.animations.jumpstart"  :done="module.doneQuiz.jumpstart" :questions="jumpstartQuestions"
                    n-id="figure" label="Figure it out" :ind="0"  :active="module.jumpstartQuiz.active" :score="module.jumpstartQuiz.score"
                    title="Make a Jumpstart" id="jumpstart" content="Jumpstart" @trigger-done="doneContent"
                    body=" Let us check your prior knowledge. Read the description or the selection then choose the letter of the correct answer. Tick the button that corresponds to the letter of the correct answer. <br><br> PRE-TEST "  @update-quiz="updateQuiz"
                />
            </Transition>

            <Transition name="top">
                <Figure :done="module.animations.drill" v-show="module.animations.figure" :module="6" @close-button="nextContent" />
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
                    title="Gauge your understanding" id="gauge" content="Excercise" :last="false" 
                    body="
            <h3>Don't be so quick to dismiss lab-grown meat</h3><br>
            <p>
                Brian Kateman<br><br>
                <sup>1</sup> Cell-cultured meat has been the subject of suspicion from organizations working to protect human health. <sup>2</sup> Some members of the general public are squeamish about cell-cultured meat. <sup>3</sup> Public opinion surveys have found that consumers hesitate to accept cell-cultured meat as a viable food option.
                <br><sup>4</sup> Caution isn’t necessarily a bad thing, but these critiques of cell-cultured meat are just thinly disguised neophobia. <sup>5</sup> Cell-cultured meat indeed comes from labs, not farms. <sup>6</sup> But what these critics fail to realize is that there’s nothing “natural” about the vast majority of the meat already eaten in the U.S. <sup>7</sup> Ninety-nine percent (99%) of animals raised for food live in factory farms. <sup>8</sup> On these farms, livestock is given doses of antibiotics regularly as a pre-emptive measure against illnesses. <sup>9</sup> Then there’s the fact that these animals eat an abnormal diet. <sup>10</sup> For example, instead of grass, cows are fed corn in feedlots, where they are fattened up before being sent to slaughter. <sup>11</sup> Even the animals themselves are drastically different from what our grandparents ate growing up: <sup>12</sup> the chickens, cows, pigs and even the fish we eat today are the product of intense genetic engineering. <sup>13</sup> Turkeys and chickens nowadays can no longer mate on their own, relying on artificial insemination to exist.   
                <br><sup>14</sup> Cell-cultured meat also faces criticism from some animal rights activists. Cell cultivation requires starter cells taken from actual animals. <sup>15</sup> Because of this, they emphasize that cell-cultured meat isn’t completely cruelty-free. <sup>16</sup> There’s truth to this. <sup>17</sup> Fetal bovine serum (FBS), extracted from unborn cow fetuses after the mother is slaughtered is used by many companies at the forefront of cell-cultured meat experimentation. <sup>18</sup> For the chicken, cells are extracted from the muscle and fertilized eggs of actual chickens.
                <br><sup>19</sup> The cell-cultured meat industry that currently uses FBS is still vastly kinder to animals than traditional livestock production and slaughter. <sup>20</sup> While FBS is harvested from slaughtered animals, extraction from the muscle or a fertilized egg is analogous to a biopsy done on humans
            </p>
            <br>Furthermore, according to the company’s website, its process of establishing a cell line from a biopsy can produce enough meat “for years — if not decades — to come, reducing the need to take additional cell samples from animals.”
            <br><br>Given that cell-cultured meat at scale could reduce the number of animals confined and slaughtered from billions each year to just a fraction of that, there’s an ethical imperative to make the switch.
            <br><br>Still, others argue that in order to improve human health, people need to cut back on meat altogether and eat more whole, plant-based foods. These health-conscious critics point out that the average American ate about 225 pounds of meat in 2021 — the highest in recorded history. Plus, according to the Centers for Disease Control and Prevention, only 1 in 10 Americans get the recommended amount of fruits and vegetables in their diet.
            <br><br>It’s true that people would reduce their risk of diet-related illnesses like heart disease, certain types of cancers, diabetes and obesity if they switched from eating bacon and wings to apples and kale. The reality, however, is that people don’t want to. Public health authorities have been advising citizens for decades to cut back on meat and to eat more fruits, vegetables, whole grains and legumes. I even founded a nonprofit organization, Reducetarian Foundation, with exactly that goal in mind.  
            <br><br>But I’ve accepted that taste preferences, habits and cultural traditions are nearly impossible to overcome. If they weren’t, and consumers made purely rational food choices based on health, salads would be the classic American dish — not burgers. Given that there are other public health benefits to ending factory farming, like reducing air and water pollution as well as antibiotic resistance and zoonotic disease — health advocates should do no harm by supporting cell-cultured meat.
            <br><br>And with time, cell-cultured meat may become nutritionally superior to meat from slaughtered animals anyway. As a group of scientists noted in a 2022 paper, “Control over cell biology… allows for the fine tuning of nutritional properties to improve human health, where muscle and fat cells can be engineered to produce vital nutrients such as anti-oxidative carotenoids that would otherwise not be found (or only at low concentrations) in conventional meat.”
            <br><br>As with any new technology, the trajectory of cell-cultured meat is likely to face a number of obstacles. But at the end of the day, many of the critiques are weak, illogical or just naive. No, cell-cultured meat, as we currently know it, isn’t perfect. But since it could save billions of animals from suffering and even improve public health, it’s well worth a shot.

"
                />
            </Transition>

            <Transition name="left">
                <div v-show="module.doneQuiz.gauge" >
                    
                    <p style="margin-top: 2rem;"><b>References</b></p>

                    <p>
                        Samaniego, R. Ookla Report: Philippines among top countries with fast Internet. (March 
2023). Manila Bulletin. <a href="https://mb.com.ph/2023/03/07/ookla-report-philippines-among-top-countries-with-fast-internet/" target="_blank">https://mb.com.ph/2023/03/07/ookla-report-philippines-among-top-countries-with-fast-internet/</a>
                    </p>

                    <p>Lamentillo, A. A move to fast track universal connectivity. (July 2023). Manila Bulletin.  <a href="https://mb.com.ph/2023/7/6/a-move-to-fast-track-universal-connectivity" target="_blank">https://mb.com.ph/2023/7/6/a-move-to-fast-track-universal-connectivity</a></p>

                    <p>What is the Difference Between Fact and Opinion? [Video].  <a href="https://www.mometrix.com/academy/fact-or-opinion/" target="_blank">https://www.mometrix.com/academy/fact-or-opinion/</a></p>
                    
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

const moduleName = 'module6'

const targets = [
    'A.	Distinguish fact from opinion.',
    'B.	React to assertion or expression made by the author in the text using fact or opinion',
]; 

const jumpstartQuestions: {
    num: number,
    question: string,
    choices?: {
        label: string,
        answer: boolean,
        error: boolean,
        success: boolean,
        black: boolean,
    }[],
    answer?: string,
    hint?: string,
    type?: number
}[]  = [
    {
        question: 'What is a specific data or information that can be proven as true or false based on objective evidence.   ',
        choices: [
            { label: 'point', answer: false, success: false, error: false, black: false },
            { label: 'fact	', answer: true, success: false, error: false, black: false },
            { label: 'opinion', answer: false, success: false, error: false, black: false },
            { label: 'argument', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 1,
    },
    {
        question: 'which of the following is a feeling, judgement, belief or conclusion that cannot be verified true or false by objective evidence. ',
        choices: [
            { label: 'detail', answer: false, success: false, error: false, black: false },
            { label: 'fact	', answer: false, success: false, error: false, black: false },
            { label: 'opinion', answer: true, success: false, error: false, black: false },
            { label: 'argument', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 2,
    },
    {
        question: 'Which of the following is NOT objective evidence?',
        choices: [
            { label: 'research finding', answer: false, success: false, error: false, black: false },
            { label: 'physical evidence ', answer: false, success: false, error: false, black: false },
            { label: 'personal point of view', answer: true, success: false, error: false, black: false },
            { label: 'conclusion based on experiment ', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 3,
    },
    {
        question: 'Which of the following best describes a fact? ',
        choices: [
            { label: 'Something that can be proven ', answer: true, success: false, error: false, black: false },
            { label: 'Something that can’t be proven ', answer: false, success: false, error: false, black: false },
            { label: 'The feelings of the main character  ', answer: false, success: false, error: false, black: false },
            { label: 'How much the main character likes something ', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 4,
    },
    {
        question: 'Which of the following best describes an opinion? ',
        choices: [
            { label: 'A good choice  ', answer: true, success: false, error: false, black: false },
            { label: 'A scientific investigation ', answer: false, success: false, error: false, black: false },
            { label: 'A statement that can be proven', answer: false, success: false, error: false, black: false },
            { label: 'Physical evidence from a crime scene     ', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 5,
    },
    {
        question: 'Which of the following is an opinion? ',
        choices: [
            { label: 'Toby is wearing a blue tie.  ', answer: false, success: false, error: false, black: false },
            { label: 'Jason won the race at field day.  ', answer: false, success: false, error: false, black: false },
            { label: 'Vince was unhappy that his team lost. ', answer: true, success: false, error: false, black: false },
            { label: 'Yvette woke up at 7:30 in the morning. ', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 6,
    },
    {
        question: 'Which of the following is a fact? ',
        choices: [
            { label: 'Reading is very easy. ', answer: false, success: false, error: false, black: false },
            { label: 'Gary Paulsen is my favorite author.  ', answer: false, success: false, error: false, black: false },
            { label: 'I received a 98% on the reading test.', answer: true, success: false, error: false, black: false },
            { label: 'I’m the smartest student in the tenth grade.  ', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 7,
    },
    {
        question: 'Which of the following is NOT a fact? ',
        choices: [
            { label: 'A karate expert can use his hands as deadly weapon. ', answer: false, success: false, error: false, black: false },
            { label: 'It is too risky for rich people to go to crowded places. ', answer: true, success: false, error: false, black: false },
            { label: 'A national flag symbolizes the independence of a country.  ', answer: false, success: false, error: false, black: false },
            { label: 'Dengue is an illness caused by a virus that is spread through mosquito bites.', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 8,
    },
    //---
    {
        question: `
Many believe that digital connectivity these days is no longer a luxury but an essential. Learning, employment, livelihood, business, accessing essential services can all now be done online. Unfortunately, almost half of the world’s population still do not have access to the Internet. Correspondingly, more than half of the Philippine population cannot afford a minimum package of mobile internet. There are over 58 million Filipinos who cannot afford a 1-GB-per-month internet package. This put the country the seventh in the world with the largest number of internet poor.

<br><br>This is contrary, however, to the report from Ookla, a global internet testing firm. A report from Ookla shows that the Philippines is now among the top countries in the world for fast Internet. According to the firm, the demand for high-speed Internet in the country has grown rapidly in recent years as the number of Filipinos using the Internet to work, study, and connect with others increased steadily. Their report, released in January 2023, indicates that the median download speed for fixed broadband Internet in the country has risen from 49.48 Mbps to 88.13 Mbps. Hence, the country's internet infrastructure has marked a significant improvement. 

<br><br> <p><b>Which of these statements from the passage is NOT a fact?</b></p>
`,
        choices: [
            { label: 'Almost half of the world’s population still do not have access to the Internet.', answer: false, success: false, error: false, black: false },
            { label: 'Many believe that digital connectivity these days is no longer a luxury but an essential.', answer: true, success: false, error: false, black: false },
            { label: 'There are over 58 million Filipinos who cannot afford a 1-GB-per-month internet package.', answer: false, success: false, error: false, black: false },
            { label: 'Learning, employment, livelihood, business, accessing essential services can all now be done online.', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 9,
        hint: 'Read the paragraph to answer questions 9 and 10',
    },
    {
        question: `
 Many believe that digital connectivity these days is no longer a luxury but an essential. Learning, employment, livelihood, business, accessing essential services can all now be done online. Unfortunately, almost half of the world’s population still do not have access to the Internet. Correspondingly, more than half of the Philippine population cannot afford a minimum package of mobile internet. There are over 58 million Filipinos who cannot afford a 1-GB-per-month internet package. This put the country the seventh in the world with the largest number of internet poor.

<br><br>This is contrary, however, to the report from Ookla, a global internet testing firm. A report from Ookla shows that the Philippines is now among the top countries in the world for fast Internet. According to the firm, the demand for high-speed Internet in the country has grown rapidly in recent years as the number of Filipinos using the Internet to work, study, and connect with others increased steadily. Their report, released in January 2023, indicates that the median download speed for fixed broadband Internet in the country has risen from 49.48 Mbps to 88.13 Mbps. Hence, the country's internet infrastructure has marked a significant improvement. 

<br><br> <p><b>Which of the following is a statement of opinion?</b></p>
`,
        choices: [
            { label: 'The demand for high-speed Internet in the country has grown rapidly in recent years.', answer: true, success: false, error: false, black: false },
            { label: 'The Philippines ranks seventh in the world with the largest number of “internet poor” people.', answer: false, success: false, error: false, black: false },
            { label: 'The number of Filipinos using the Internet to work, study, and connect with others increased steadily.', answer: false, success: false, error: false, black: false },
            { label: 'The median download speed for fixed broadband Internet in the country has risen from 49.48 Mbps to 88.13 Mbps.', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 10,
        hint: 'Read the paragraph to answer questions 9 and 10',
    }
];

const drillQuestions: {
    num: number,
    question: string,
    hint?: string,
    feedback?: string,
    answer?: string,
    options?: string[],
    type?: number,
}[]  = [
    {
        question: `
            Filipinos are warm, fun-loving people with a great sense of humor.
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Opinion',
        type: 9,
        num: 1,
    },
    {
        question: `
            A Filipino patented the invention of the yo-yo toy, which dates its origin back to 440 BC.
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Fact',
        type: 9,
        num: 2,
    },
    {
        question: `
            One can get muscle cramps by swimming after eating.
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Fact',
        type: 9,
        num: 3,
    },
    {
        question: `
            We believe that we should celebrate Christmas as soon as the “Ber” months begin.
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Opinion',
        type: 9,
        num: 4,
    },
    {
        question: `
            CAR, where Baguio City is located, is the least populated region in the Philippines. 
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Fact',
        type: 9,
        num: 5,
    },
    {
        question: `
            Karaoke is a popular social activity among the Filipinos.
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Opinion',
        type: 9,
        num: 6,
    },
    {
        question: `
            The eruption of Mount Pinatubo in 1991 was the most horrid experience in the history of time.
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Opinion',
        type: 9,
        num: 7,
    },
    {
        question: `
            The mindset of many Filipinos is corrupted with colonial mentality.
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Opinion',
        type: 9,
        num: 8,
    },
    {
        question: `
            Annually, around 19 typhoons enter the Philippines and about six to nine make landfall.
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Fact',
        type: 9,
        num: 9,
    },
    {
        question: `
            Our country holds the record for having 5 of the largest shopping malls in the world.
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Fact',
        type: 9,
        num: 10,
    },
];

const gaugeQuestions: {
    num: number,
    question: string,
    hint?: string,
    feedback?: string,
    identification?: {
        input: string,
        answer: string,
        opinion: boolean,
        error: boolean,
        success: boolean,
        black: boolean,
    },
    answer?: string,
    options?: string[],
    type?: number,
}[]  = [
    {
        question: `
            Philippine government
        `,
        identification: {
            input: '',
            answer: '',
            opinion: true,
            success: false, error: false, black: false
        },
        type: 2,
        hint: 'A.	Write one statement of fact related to the following topics:',
        num: 1,
    },
    {
        question: `
            Philippine history
        `,
        identification: {
            input: '',
            answer: '',
            opinion: true,
            success: false, error: false, black: false
        },
        type: 2,
        hint: 'A.	Write one statement of fact related to the following topics:',
        num: 2,
    },
    {
        question: `
            Literature 
        `,
        identification: {
            input: '',
            answer: '',
            opinion: true,
            success: false, error: false, black: false
        },
        type: 2,
        hint: 'A.	Write one statement of fact related to the following topics:',
        num: 3,
    },
    {
        question: `
            The English Language
        `,
        identification: {
            input: '',
            answer: '',
            opinion: true,
            success: false, error: false, black: false
        },
        type: 2,
        hint: 'A.	Write one statement of fact related to the following topics:',
        num: 4,
    },
    {
        question: `
            Your hometown 
        `,
        identification: {
            input: '',
            answer: '',
            opinion: true,
            success: false, error: false, black: false
        },
        type: 2,
        hint: 'A.	Write one statement of fact related to the following topics:',
        num: 5,
    },
    //--
    {
        question: `
            There are about 120-187 languages spoken in the Philippines. 
        `,
        identification: {
            input: '',
            answer: '',
            opinion: true,
            success: false, error: false, black: false
        },
        type: 2,
        hint: 'B.	Write an opinion for each given statement of fact.',
        num: 1,
    },
    {
        question: `
            Unlike other Asian countries, the Philippines is predominantly Catholic.
        `,
        identification: {
            input: '',
            answer: '',
            opinion: true,
            success: false, error: false, black: false
        },
        type: 2,
        hint: 'B.	Write an opinion for each given statement of fact.',
        num: 2,
    },
    {
        question: `
            The Philippines supplies more nurses globally than anywhere else.
        `,
        identification: {
            input: '',
            answer: '',
            opinion: true,
            success: false, error: false, black: false
        },
        type: 2,
        hint: 'B.	Write an opinion for each given statement of fact.',
        num: 3,
    },
    {
        question: `
            Only 1% of the earth’s water is safe for human consumption.
        `,
        identification: {
            input: '',
            answer: '',
            opinion: true,
            success: false, error: false, black: false
        },
        type: 2,
        hint: 'B.	Write an opinion for each given statement of fact.',
        num: 4,
    },
    {
        question: `
            The El Nino phenomenon, a climate pattern that describes the unusual warming of surface waters in the eastern tropical Pacific Ocean, is caused by climate change. 
        `,
        identification: {
            input: '',
            answer: '',
            opinion: true,
            success: false, error: false, black: false
        },
        type: 2,
        hint: 'B.	Write an opinion for each given statement of fact.',
        num: 5,
    },
    //--
    {
        question: `
            <h3>Don't be so quick to dismiss lab-grown meat</h3><br>
            <p>
                Brian Kateman<br>
                <sup>1</sup> Cell-cultured meat has been the subject of suspicion from organizations working to protect human health. <sup>2</sup> Some members of the general public are squeamish about cell-cultured meat. <sup>3</sup> Public opinion surveys have found that consumers hesitate to accept cell-cultured meat as a viable food option.
                <br><sup>4</sup> Caution isn’t necessarily a bad thing, but these critiques of cell-cultured meat are just thinly disguised neophobia. <sup>5</sup> Cell-cultured meat indeed comes from labs, not farms. <sup>6</sup> But what these critics fail to realize is that there’s nothing “natural” about the vast majority of the meat already eaten in the U.S. <sup>7</sup> Ninety-nine percent (99%) of animals raised for food live in factory farms. <sup>8</sup> On these farms, livestock is given doses of antibiotics regularly as a pre-emptive measure against illnesses. <sup>9</sup> Then there’s the fact that these animals eat an abnormal diet. <sup>10</sup> For example, instead of grass, cows are fed corn in feedlots, where they are fattened up before being sent to slaughter. <sup>11</sup> Even the animals themselves are drastically different from what our grandparents ate growing up: <sup>12</sup> the chickens, cows, pigs and even the fish we eat today are the product of intense genetic engineering. <sup>13</sup> Turkeys and chickens nowadays can no longer mate on their own, relying on artificial insemination to exist.   
                <br><sup>14</sup> Cell-cultured meat also faces criticism from some animal rights activists. Cell cultivation requires starter cells taken from actual animals. <sup>15</sup> Because of this, they emphasize that cell-cultured meat isn’t completely cruelty-free. <sup>16</sup> There’s truth to this. <sup>17</sup> Fetal bovine serum (FBS), extracted from unborn cow fetuses after the mother is slaughtered is used by many companies at the forefront of cell-cultured meat experimentation. <sup>18</sup> For the chicken, cells are extracted from the muscle and fertilized eggs of actual chickens.
                <br><sup>19</sup> The cell-cultured meat industry that currently uses FBS is still vastly kinder to animals than traditional livestock production and slaughter. <sup>20</sup> While FBS is harvested from slaughtered animals, extraction from the muscle or a fertilized egg is analogous to a biopsy done on humans
            </p>
            <br>
            <p><b>1</b></p>
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Fact',
        type: 9,
        hint: 'C.	Read the article. Then analyze each sentence numbered sentence and classify it as FACT or OPINION. Write the number under the correct classification.',
        num: 1,
    },
    {
        question: `
            <h3>Don't be so quick to dismiss lab-grown meat</h3><br>
            <p>
                Brian Kateman<br>
                <sup>1</sup> Cell-cultured meat has been the subject of suspicion from organizations working to protect human health. <sup>2</sup> Some members of the general public are squeamish about cell-cultured meat. <sup>3</sup> Public opinion surveys have found that consumers hesitate to accept cell-cultured meat as a viable food option.
                <br><sup>4</sup> Caution isn’t necessarily a bad thing, but these critiques of cell-cultured meat are just thinly disguised neophobia. <sup>5</sup> Cell-cultured meat indeed comes from labs, not farms. <sup>6</sup> But what these critics fail to realize is that there’s nothing “natural” about the vast majority of the meat already eaten in the U.S. <sup>7</sup> Ninety-nine percent (99%) of animals raised for food live in factory farms. <sup>8</sup> On these farms, livestock is given doses of antibiotics regularly as a pre-emptive measure against illnesses. <sup>9</sup> Then there’s the fact that these animals eat an abnormal diet. <sup>10</sup> For example, instead of grass, cows are fed corn in feedlots, where they are fattened up before being sent to slaughter. <sup>11</sup> Even the animals themselves are drastically different from what our grandparents ate growing up: <sup>12</sup> the chickens, cows, pigs and even the fish we eat today are the product of intense genetic engineering. <sup>13</sup> Turkeys and chickens nowadays can no longer mate on their own, relying on artificial insemination to exist.   
                <br><sup>14</sup> Cell-cultured meat also faces criticism from some animal rights activists. Cell cultivation requires starter cells taken from actual animals. <sup>15</sup> Because of this, they emphasize that cell-cultured meat isn’t completely cruelty-free. <sup>16</sup> There’s truth to this. <sup>17</sup> Fetal bovine serum (FBS), extracted from unborn cow fetuses after the mother is slaughtered is used by many companies at the forefront of cell-cultured meat experimentation. <sup>18</sup> For the chicken, cells are extracted from the muscle and fertilized eggs of actual chickens.
                <br><sup>19</sup> The cell-cultured meat industry that currently uses FBS is still vastly kinder to animals than traditional livestock production and slaughter. <sup>20</sup> While FBS is harvested from slaughtered animals, extraction from the muscle or a fertilized egg is analogous to a biopsy done on humans
            </p>
            <br>
            <p><b>2</b></p>
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Opinion',
        type: 9,
        hint: 'C.	Read the article. Then analyze each sentence numbered sentence and classify it as FACT or OPINION. Write the number under the correct classification.',
        num: 2,
    },
    {
        question: `
            <h3>Don't be so quick to dismiss lab-grown meat</h3><br>
            <p>
                Brian Kateman<br>
                <sup>1</sup> Cell-cultured meat has been the subject of suspicion from organizations working to protect human health. <sup>2</sup> Some members of the general public are squeamish about cell-cultured meat. <sup>3</sup> Public opinion surveys have found that consumers hesitate to accept cell-cultured meat as a viable food option.
                <br><sup>4</sup> Caution isn’t necessarily a bad thing, but these critiques of cell-cultured meat are just thinly disguised neophobia. <sup>5</sup> Cell-cultured meat indeed comes from labs, not farms. <sup>6</sup> But what these critics fail to realize is that there’s nothing “natural” about the vast majority of the meat already eaten in the U.S. <sup>7</sup> Ninety-nine percent (99%) of animals raised for food live in factory farms. <sup>8</sup> On these farms, livestock is given doses of antibiotics regularly as a pre-emptive measure against illnesses. <sup>9</sup> Then there’s the fact that these animals eat an abnormal diet. <sup>10</sup> For example, instead of grass, cows are fed corn in feedlots, where they are fattened up before being sent to slaughter. <sup>11</sup> Even the animals themselves are drastically different from what our grandparents ate growing up: <sup>12</sup> the chickens, cows, pigs and even the fish we eat today are the product of intense genetic engineering. <sup>13</sup> Turkeys and chickens nowadays can no longer mate on their own, relying on artificial insemination to exist.   
                <br><sup>14</sup> Cell-cultured meat also faces criticism from some animal rights activists. Cell cultivation requires starter cells taken from actual animals. <sup>15</sup> Because of this, they emphasize that cell-cultured meat isn’t completely cruelty-free. <sup>16</sup> There’s truth to this. <sup>17</sup> Fetal bovine serum (FBS), extracted from unborn cow fetuses after the mother is slaughtered is used by many companies at the forefront of cell-cultured meat experimentation. <sup>18</sup> For the chicken, cells are extracted from the muscle and fertilized eggs of actual chickens.
                <br><sup>19</sup> The cell-cultured meat industry that currently uses FBS is still vastly kinder to animals than traditional livestock production and slaughter. <sup>20</sup> While FBS is harvested from slaughtered animals, extraction from the muscle or a fertilized egg is analogous to a biopsy done on humans
            </p>
            <br>
            <p><b>3</b></p>
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Fact',
        type: 9,
        hint: 'C.	Read the article. Then analyze each sentence numbered sentence and classify it as FACT or OPINION. Write the number under the correct classification.',
        num: 3,
    },
    {
        question: `
            <h3>Don't be so quick to dismiss lab-grown meat</h3><br>
            <p>
                Brian Kateman<br>
                <sup>1</sup> Cell-cultured meat has been the subject of suspicion from organizations working to protect human health. <sup>2</sup> Some members of the general public are squeamish about cell-cultured meat. <sup>3</sup> Public opinion surveys have found that consumers hesitate to accept cell-cultured meat as a viable food option.
                <br><sup>4</sup> Caution isn’t necessarily a bad thing, but these critiques of cell-cultured meat are just thinly disguised neophobia. <sup>5</sup> Cell-cultured meat indeed comes from labs, not farms. <sup>6</sup> But what these critics fail to realize is that there’s nothing “natural” about the vast majority of the meat already eaten in the U.S. <sup>7</sup> Ninety-nine percent (99%) of animals raised for food live in factory farms. <sup>8</sup> On these farms, livestock is given doses of antibiotics regularly as a pre-emptive measure against illnesses. <sup>9</sup> Then there’s the fact that these animals eat an abnormal diet. <sup>10</sup> For example, instead of grass, cows are fed corn in feedlots, where they are fattened up before being sent to slaughter. <sup>11</sup> Even the animals themselves are drastically different from what our grandparents ate growing up: <sup>12</sup> the chickens, cows, pigs and even the fish we eat today are the product of intense genetic engineering. <sup>13</sup> Turkeys and chickens nowadays can no longer mate on their own, relying on artificial insemination to exist.   
                <br><sup>14</sup> Cell-cultured meat also faces criticism from some animal rights activists. Cell cultivation requires starter cells taken from actual animals. <sup>15</sup> Because of this, they emphasize that cell-cultured meat isn’t completely cruelty-free. <sup>16</sup> There’s truth to this. <sup>17</sup> Fetal bovine serum (FBS), extracted from unborn cow fetuses after the mother is slaughtered is used by many companies at the forefront of cell-cultured meat experimentation. <sup>18</sup> For the chicken, cells are extracted from the muscle and fertilized eggs of actual chickens.
                <br><sup>19</sup> The cell-cultured meat industry that currently uses FBS is still vastly kinder to animals than traditional livestock production and slaughter. <sup>20</sup> While FBS is harvested from slaughtered animals, extraction from the muscle or a fertilized egg is analogous to a biopsy done on humans
            </p>
            <br>
            <p><b>4</b></p>
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Opinion',
        type: 9,
        hint: 'C.	Read the article. Then analyze each sentence numbered sentence and classify it as FACT or OPINION. Write the number under the correct classification.',
        num: 4,
    },
    {
        question: `
            <h3>Don't be so quick to dismiss lab-grown meat</h3><br>
            <p>
                Brian Kateman<br>
                <sup>1</sup> Cell-cultured meat has been the subject of suspicion from organizations working to protect human health. <sup>2</sup> Some members of the general public are squeamish about cell-cultured meat. <sup>3</sup> Public opinion surveys have found that consumers hesitate to accept cell-cultured meat as a viable food option.
                <br><sup>4</sup> Caution isn’t necessarily a bad thing, but these critiques of cell-cultured meat are just thinly disguised neophobia. <sup>5</sup> Cell-cultured meat indeed comes from labs, not farms. <sup>6</sup> But what these critics fail to realize is that there’s nothing “natural” about the vast majority of the meat already eaten in the U.S. <sup>7</sup> Ninety-nine percent (99%) of animals raised for food live in factory farms. <sup>8</sup> On these farms, livestock is given doses of antibiotics regularly as a pre-emptive measure against illnesses. <sup>9</sup> Then there’s the fact that these animals eat an abnormal diet. <sup>10</sup> For example, instead of grass, cows are fed corn in feedlots, where they are fattened up before being sent to slaughter. <sup>11</sup> Even the animals themselves are drastically different from what our grandparents ate growing up: <sup>12</sup> the chickens, cows, pigs and even the fish we eat today are the product of intense genetic engineering. <sup>13</sup> Turkeys and chickens nowadays can no longer mate on their own, relying on artificial insemination to exist.   
                <br><sup>14</sup> Cell-cultured meat also faces criticism from some animal rights activists. Cell cultivation requires starter cells taken from actual animals. <sup>15</sup> Because of this, they emphasize that cell-cultured meat isn’t completely cruelty-free. <sup>16</sup> There’s truth to this. <sup>17</sup> Fetal bovine serum (FBS), extracted from unborn cow fetuses after the mother is slaughtered is used by many companies at the forefront of cell-cultured meat experimentation. <sup>18</sup> For the chicken, cells are extracted from the muscle and fertilized eggs of actual chickens.
                <br><sup>19</sup> The cell-cultured meat industry that currently uses FBS is still vastly kinder to animals than traditional livestock production and slaughter. <sup>20</sup> While FBS is harvested from slaughtered animals, extraction from the muscle or a fertilized egg is analogous to a biopsy done on humans
            </p>
            <br>
            <p><b>5</b></p>
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Fact',
        type: 9,
        hint: 'C.	Read the article. Then analyze each sentence numbered sentence and classify it as FACT or OPINION. Write the number under the correct classification.',
        num: 5,
    },
    {
        question: `
            <h3>Don't be so quick to dismiss lab-grown meat</h3><br>
            <p>
                Brian Kateman<br>
                <sup>1</sup> Cell-cultured meat has been the subject of suspicion from organizations working to protect human health. <sup>2</sup> Some members of the general public are squeamish about cell-cultured meat. <sup>3</sup> Public opinion surveys have found that consumers hesitate to accept cell-cultured meat as a viable food option.
                <br><sup>4</sup> Caution isn’t necessarily a bad thing, but these critiques of cell-cultured meat are just thinly disguised neophobia. <sup>5</sup> Cell-cultured meat indeed comes from labs, not farms. <sup>6</sup> But what these critics fail to realize is that there’s nothing “natural” about the vast majority of the meat already eaten in the U.S. <sup>7</sup> Ninety-nine percent (99%) of animals raised for food live in factory farms. <sup>8</sup> On these farms, livestock is given doses of antibiotics regularly as a pre-emptive measure against illnesses. <sup>9</sup> Then there’s the fact that these animals eat an abnormal diet. <sup>10</sup> For example, instead of grass, cows are fed corn in feedlots, where they are fattened up before being sent to slaughter. <sup>11</sup> Even the animals themselves are drastically different from what our grandparents ate growing up: <sup>12</sup> the chickens, cows, pigs and even the fish we eat today are the product of intense genetic engineering. <sup>13</sup> Turkeys and chickens nowadays can no longer mate on their own, relying on artificial insemination to exist.   
                <br><sup>14</sup> Cell-cultured meat also faces criticism from some animal rights activists. Cell cultivation requires starter cells taken from actual animals. <sup>15</sup> Because of this, they emphasize that cell-cultured meat isn’t completely cruelty-free. <sup>16</sup> There’s truth to this. <sup>17</sup> Fetal bovine serum (FBS), extracted from unborn cow fetuses after the mother is slaughtered is used by many companies at the forefront of cell-cultured meat experimentation. <sup>18</sup> For the chicken, cells are extracted from the muscle and fertilized eggs of actual chickens.
                <br><sup>19</sup> The cell-cultured meat industry that currently uses FBS is still vastly kinder to animals than traditional livestock production and slaughter. <sup>20</sup> While FBS is harvested from slaughtered animals, extraction from the muscle or a fertilized egg is analogous to a biopsy done on humans
            </p>
            <br>
            <p><b>6</b></p>
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Opinion',
        type: 9,
        hint: 'C.	Read the article. Then analyze each sentence numbered sentence and classify it as FACT or OPINION. Write the number under the correct classification.',
        num: 6,
    },
    {
        question: `
            <h3>Don't be so quick to dismiss lab-grown meat</h3><br>
            <p>
                Brian Kateman<br>
                <sup>1</sup> Cell-cultured meat has been the subject of suspicion from organizations working to protect human health. <sup>2</sup> Some members of the general public are squeamish about cell-cultured meat. <sup>3</sup> Public opinion surveys have found that consumers hesitate to accept cell-cultured meat as a viable food option.
                <br><sup>4</sup> Caution isn’t necessarily a bad thing, but these critiques of cell-cultured meat are just thinly disguised neophobia. <sup>5</sup> Cell-cultured meat indeed comes from labs, not farms. <sup>6</sup> But what these critics fail to realize is that there’s nothing “natural” about the vast majority of the meat already eaten in the U.S. <sup>7</sup> Ninety-nine percent (99%) of animals raised for food live in factory farms. <sup>8</sup> On these farms, livestock is given doses of antibiotics regularly as a pre-emptive measure against illnesses. <sup>9</sup> Then there’s the fact that these animals eat an abnormal diet. <sup>10</sup> For example, instead of grass, cows are fed corn in feedlots, where they are fattened up before being sent to slaughter. <sup>11</sup> Even the animals themselves are drastically different from what our grandparents ate growing up: <sup>12</sup> the chickens, cows, pigs and even the fish we eat today are the product of intense genetic engineering. <sup>13</sup> Turkeys and chickens nowadays can no longer mate on their own, relying on artificial insemination to exist.   
                <br><sup>14</sup> Cell-cultured meat also faces criticism from some animal rights activists. Cell cultivation requires starter cells taken from actual animals. <sup>15</sup> Because of this, they emphasize that cell-cultured meat isn’t completely cruelty-free. <sup>16</sup> There’s truth to this. <sup>17</sup> Fetal bovine serum (FBS), extracted from unborn cow fetuses after the mother is slaughtered is used by many companies at the forefront of cell-cultured meat experimentation. <sup>18</sup> For the chicken, cells are extracted from the muscle and fertilized eggs of actual chickens.
                <br><sup>19</sup> The cell-cultured meat industry that currently uses FBS is still vastly kinder to animals than traditional livestock production and slaughter. <sup>20</sup> While FBS is harvested from slaughtered animals, extraction from the muscle or a fertilized egg is analogous to a biopsy done on humans
            </p>
            <br>
            <p><b>7</b></p>
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Fact',
        type: 9,
        hint: 'C.	Read the article. Then analyze each sentence numbered sentence and classify it as FACT or OPINION. Write the number under the correct classification.',
        num: 1,
    },
    {
        question: `
            <h3>Don't be so quick to dismiss lab-grown meat</h3><br>
            <p>
                Brian Kateman<br>
                <sup>1</sup> Cell-cultured meat has been the subject of suspicion from organizations working to protect human health. <sup>2</sup> Some members of the general public are squeamish about cell-cultured meat. <sup>3</sup> Public opinion surveys have found that consumers hesitate to accept cell-cultured meat as a viable food option.
                <br><sup>4</sup> Caution isn’t necessarily a bad thing, but these critiques of cell-cultured meat are just thinly disguised neophobia. <sup>5</sup> Cell-cultured meat indeed comes from labs, not farms. <sup>6</sup> But what these critics fail to realize is that there’s nothing “natural” about the vast majority of the meat already eaten in the U.S. <sup>7</sup> Ninety-nine percent (99%) of animals raised for food live in factory farms. <sup>8</sup> On these farms, livestock is given doses of antibiotics regularly as a pre-emptive measure against illnesses. <sup>9</sup> Then there’s the fact that these animals eat an abnormal diet. <sup>10</sup> For example, instead of grass, cows are fed corn in feedlots, where they are fattened up before being sent to slaughter. <sup>11</sup> Even the animals themselves are drastically different from what our grandparents ate growing up: <sup>12</sup> the chickens, cows, pigs and even the fish we eat today are the product of intense genetic engineering. <sup>13</sup> Turkeys and chickens nowadays can no longer mate on their own, relying on artificial insemination to exist.   
                <br><sup>14</sup> Cell-cultured meat also faces criticism from some animal rights activists. Cell cultivation requires starter cells taken from actual animals. <sup>15</sup> Because of this, they emphasize that cell-cultured meat isn’t completely cruelty-free. <sup>16</sup> There’s truth to this. <sup>17</sup> Fetal bovine serum (FBS), extracted from unborn cow fetuses after the mother is slaughtered is used by many companies at the forefront of cell-cultured meat experimentation. <sup>18</sup> For the chicken, cells are extracted from the muscle and fertilized eggs of actual chickens.
                <br><sup>19</sup> The cell-cultured meat industry that currently uses FBS is still vastly kinder to animals than traditional livestock production and slaughter. <sup>20</sup> While FBS is harvested from slaughtered animals, extraction from the muscle or a fertilized egg is analogous to a biopsy done on humans
            </p>
            <br>
            <p><b>8</b></p>
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Fact',
        type: 9,
        hint: 'C.	Read the article. Then analyze each sentence numbered sentence and classify it as FACT or OPINION. Write the number under the correct classification.',
        num: 8,
    },
    {
        question: `
            <h3>Don't be so quick to dismiss lab-grown meat</h3><br>
            <p>
                Brian Kateman<br>
                <sup>1</sup> Cell-cultured meat has been the subject of suspicion from organizations working to protect human health. <sup>2</sup> Some members of the general public are squeamish about cell-cultured meat. <sup>3</sup> Public opinion surveys have found that consumers hesitate to accept cell-cultured meat as a viable food option.
                <br><sup>4</sup> Caution isn’t necessarily a bad thing, but these critiques of cell-cultured meat are just thinly disguised neophobia. <sup>5</sup> Cell-cultured meat indeed comes from labs, not farms. <sup>6</sup> But what these critics fail to realize is that there’s nothing “natural” about the vast majority of the meat already eaten in the U.S. <sup>7</sup> Ninety-nine percent (99%) of animals raised for food live in factory farms. <sup>8</sup> On these farms, livestock is given doses of antibiotics regularly as a pre-emptive measure against illnesses. <sup>9</sup> Then there’s the fact that these animals eat an abnormal diet. <sup>10</sup> For example, instead of grass, cows are fed corn in feedlots, where they are fattened up before being sent to slaughter. <sup>11</sup> Even the animals themselves are drastically different from what our grandparents ate growing up: <sup>12</sup> the chickens, cows, pigs and even the fish we eat today are the product of intense genetic engineering. <sup>13</sup> Turkeys and chickens nowadays can no longer mate on their own, relying on artificial insemination to exist.   
                <br><sup>14</sup> Cell-cultured meat also faces criticism from some animal rights activists. Cell cultivation requires starter cells taken from actual animals. <sup>15</sup> Because of this, they emphasize that cell-cultured meat isn’t completely cruelty-free. <sup>16</sup> There’s truth to this. <sup>17</sup> Fetal bovine serum (FBS), extracted from unborn cow fetuses after the mother is slaughtered is used by many companies at the forefront of cell-cultured meat experimentation. <sup>18</sup> For the chicken, cells are extracted from the muscle and fertilized eggs of actual chickens.
                <br><sup>19</sup> The cell-cultured meat industry that currently uses FBS is still vastly kinder to animals than traditional livestock production and slaughter. <sup>20</sup> While FBS is harvested from slaughtered animals, extraction from the muscle or a fertilized egg is analogous to a biopsy done on humans
            </p>
            <br>
            <p><b>9</b></p>
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Opinion',
        type: 9,
        hint: 'C.	Read the article. Then analyze each sentence numbered sentence and classify it as FACT or OPINION. Write the number under the correct classification.',
        num: 1,
    },
    {
        question: `
            <h3>Don't be so quick to dismiss lab-grown meat</h3><br>
            <p>
                Brian Kateman<br>
                <sup>1</sup> Cell-cultured meat has been the subject of suspicion from organizations working to protect human health. <sup>2</sup> Some members of the general public are squeamish about cell-cultured meat. <sup>3</sup> Public opinion surveys have found that consumers hesitate to accept cell-cultured meat as a viable food option.
                <br><sup>4</sup> Caution isn’t necessarily a bad thing, but these critiques of cell-cultured meat are just thinly disguised neophobia. <sup>5</sup> Cell-cultured meat indeed comes from labs, not farms. <sup>6</sup> But what these critics fail to realize is that there’s nothing “natural” about the vast majority of the meat already eaten in the U.S. <sup>7</sup> Ninety-nine percent (99%) of animals raised for food live in factory farms. <sup>8</sup> On these farms, livestock is given doses of antibiotics regularly as a pre-emptive measure against illnesses. <sup>9</sup> Then there’s the fact that these animals eat an abnormal diet. <sup>10</sup> For example, instead of grass, cows are fed corn in feedlots, where they are fattened up before being sent to slaughter. <sup>11</sup> Even the animals themselves are drastically different from what our grandparents ate growing up: <sup>12</sup> the chickens, cows, pigs and even the fish we eat today are the product of intense genetic engineering. <sup>13</sup> Turkeys and chickens nowadays can no longer mate on their own, relying on artificial insemination to exist.   
                <br><sup>14</sup> Cell-cultured meat also faces criticism from some animal rights activists. Cell cultivation requires starter cells taken from actual animals. <sup>15</sup> Because of this, they emphasize that cell-cultured meat isn’t completely cruelty-free. <sup>16</sup> There’s truth to this. <sup>17</sup> Fetal bovine serum (FBS), extracted from unborn cow fetuses after the mother is slaughtered is used by many companies at the forefront of cell-cultured meat experimentation. <sup>18</sup> For the chicken, cells are extracted from the muscle and fertilized eggs of actual chickens.
                <br><sup>19</sup> The cell-cultured meat industry that currently uses FBS is still vastly kinder to animals than traditional livestock production and slaughter. <sup>20</sup> While FBS is harvested from slaughtered animals, extraction from the muscle or a fertilized egg is analogous to a biopsy done on humans
            </p>
            <br>
            <p><b>10</b></p>
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Fact',
        type: 9,
        hint: 'C.	Read the article. Then analyze each sentence numbered sentence and classify it as FACT or OPINION. Write the number under the correct classification.',
        num: 10,
    },
    {
        question: `
            <h3>Don't be so quick to dismiss lab-grown meat</h3><br>
            <p>
                Brian Kateman<br>
                <sup>1</sup> Cell-cultured meat has been the subject of suspicion from organizations working to protect human health. <sup>2</sup> Some members of the general public are squeamish about cell-cultured meat. <sup>3</sup> Public opinion surveys have found that consumers hesitate to accept cell-cultured meat as a viable food option.
                <br><sup>4</sup> Caution isn’t necessarily a bad thing, but these critiques of cell-cultured meat are just thinly disguised neophobia. <sup>5</sup> Cell-cultured meat indeed comes from labs, not farms. <sup>6</sup> But what these critics fail to realize is that there’s nothing “natural” about the vast majority of the meat already eaten in the U.S. <sup>7</sup> Ninety-nine percent (99%) of animals raised for food live in factory farms. <sup>8</sup> On these farms, livestock is given doses of antibiotics regularly as a pre-emptive measure against illnesses. <sup>9</sup> Then there’s the fact that these animals eat an abnormal diet. <sup>10</sup> For example, instead of grass, cows are fed corn in feedlots, where they are fattened up before being sent to slaughter. <sup>11</sup> Even the animals themselves are drastically different from what our grandparents ate growing up: <sup>12</sup> the chickens, cows, pigs and even the fish we eat today are the product of intense genetic engineering. <sup>13</sup> Turkeys and chickens nowadays can no longer mate on their own, relying on artificial insemination to exist.   
                <br><sup>14</sup> Cell-cultured meat also faces criticism from some animal rights activists. Cell cultivation requires starter cells taken from actual animals. <sup>15</sup> Because of this, they emphasize that cell-cultured meat isn’t completely cruelty-free. <sup>16</sup> There’s truth to this. <sup>17</sup> Fetal bovine serum (FBS), extracted from unborn cow fetuses after the mother is slaughtered is used by many companies at the forefront of cell-cultured meat experimentation. <sup>18</sup> For the chicken, cells are extracted from the muscle and fertilized eggs of actual chickens.
                <br><sup>19</sup> The cell-cultured meat industry that currently uses FBS is still vastly kinder to animals than traditional livestock production and slaughter. <sup>20</sup> While FBS is harvested from slaughtered animals, extraction from the muscle or a fertilized egg is analogous to a biopsy done on humans
            </p>
            <br>
            <p><b>11</b></p>
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Opinion',
        type: 9,
        hint: 'C.	Read the article. Then analyze each sentence numbered sentence and classify it as FACT or OPINION. Write the number under the correct classification.',
        num: 11,
    },
    {
        question: `
            <h3>Don't be so quick to dismiss lab-grown meat</h3><br>
            <p>
                Brian Kateman<br>
                <sup>1</sup> Cell-cultured meat has been the subject of suspicion from organizations working to protect human health. <sup>2</sup> Some members of the general public are squeamish about cell-cultured meat. <sup>3</sup> Public opinion surveys have found that consumers hesitate to accept cell-cultured meat as a viable food option.
                <br><sup>4</sup> Caution isn’t necessarily a bad thing, but these critiques of cell-cultured meat are just thinly disguised neophobia. <sup>5</sup> Cell-cultured meat indeed comes from labs, not farms. <sup>6</sup> But what these critics fail to realize is that there’s nothing “natural” about the vast majority of the meat already eaten in the U.S. <sup>7</sup> Ninety-nine percent (99%) of animals raised for food live in factory farms. <sup>8</sup> On these farms, livestock is given doses of antibiotics regularly as a pre-emptive measure against illnesses. <sup>9</sup> Then there’s the fact that these animals eat an abnormal diet. <sup>10</sup> For example, instead of grass, cows are fed corn in feedlots, where they are fattened up before being sent to slaughter. <sup>11</sup> Even the animals themselves are drastically different from what our grandparents ate growing up: <sup>12</sup> the chickens, cows, pigs and even the fish we eat today are the product of intense genetic engineering. <sup>13</sup> Turkeys and chickens nowadays can no longer mate on their own, relying on artificial insemination to exist.   
                <br><sup>14</sup> Cell-cultured meat also faces criticism from some animal rights activists. Cell cultivation requires starter cells taken from actual animals. <sup>15</sup> Because of this, they emphasize that cell-cultured meat isn’t completely cruelty-free. <sup>16</sup> There’s truth to this. <sup>17</sup> Fetal bovine serum (FBS), extracted from unborn cow fetuses after the mother is slaughtered is used by many companies at the forefront of cell-cultured meat experimentation. <sup>18</sup> For the chicken, cells are extracted from the muscle and fertilized eggs of actual chickens.
                <br><sup>19</sup> The cell-cultured meat industry that currently uses FBS is still vastly kinder to animals than traditional livestock production and slaughter. <sup>20</sup> While FBS is harvested from slaughtered animals, extraction from the muscle or a fertilized egg is analogous to a biopsy done on humans
            </p>
            <br>
            <p><b>12</b></p>
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Fact',
        type: 9,
        hint: 'C.	Read the article. Then analyze each sentence numbered sentence and classify it as FACT or OPINION. Write the number under the correct classification.',
        num: 12,
    },
    {
        question: `
            <h3>Don't be so quick to dismiss lab-grown meat</h3><br>
            <p>
                Brian Kateman<br>
                <sup>1</sup> Cell-cultured meat has been the subject of suspicion from organizations working to protect human health. <sup>2</sup> Some members of the general public are squeamish about cell-cultured meat. <sup>3</sup> Public opinion surveys have found that consumers hesitate to accept cell-cultured meat as a viable food option.
                <br><sup>4</sup> Caution isn’t necessarily a bad thing, but these critiques of cell-cultured meat are just thinly disguised neophobia. <sup>5</sup> Cell-cultured meat indeed comes from labs, not farms. <sup>6</sup> But what these critics fail to realize is that there’s nothing “natural” about the vast majority of the meat already eaten in the U.S. <sup>7</sup> Ninety-nine percent (99%) of animals raised for food live in factory farms. <sup>8</sup> On these farms, livestock is given doses of antibiotics regularly as a pre-emptive measure against illnesses. <sup>9</sup> Then there’s the fact that these animals eat an abnormal diet. <sup>10</sup> For example, instead of grass, cows are fed corn in feedlots, where they are fattened up before being sent to slaughter. <sup>11</sup> Even the animals themselves are drastically different from what our grandparents ate growing up: <sup>12</sup> the chickens, cows, pigs and even the fish we eat today are the product of intense genetic engineering. <sup>13</sup> Turkeys and chickens nowadays can no longer mate on their own, relying on artificial insemination to exist.   
                <br><sup>14</sup> Cell-cultured meat also faces criticism from some animal rights activists. Cell cultivation requires starter cells taken from actual animals. <sup>15</sup> Because of this, they emphasize that cell-cultured meat isn’t completely cruelty-free. <sup>16</sup> There’s truth to this. <sup>17</sup> Fetal bovine serum (FBS), extracted from unborn cow fetuses after the mother is slaughtered is used by many companies at the forefront of cell-cultured meat experimentation. <sup>18</sup> For the chicken, cells are extracted from the muscle and fertilized eggs of actual chickens.
                <br><sup>19</sup> The cell-cultured meat industry that currently uses FBS is still vastly kinder to animals than traditional livestock production and slaughter. <sup>20</sup> While FBS is harvested from slaughtered animals, extraction from the muscle or a fertilized egg is analogous to a biopsy done on humans
            </p>
            <br>
            <p><b>13</b></p>
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Fact',
        type: 9,
        hint: 'C.	Read the article. Then analyze each sentence numbered sentence and classify it as FACT or OPINION. Write the number under the correct classification.',
        num: 13,
    },
    {
        question: `
            <h3>Don't be so quick to dismiss lab-grown meat</h3><br>
            <p>
                Brian Kateman<br>
                <sup>1</sup> Cell-cultured meat has been the subject of suspicion from organizations working to protect human health. <sup>2</sup> Some members of the general public are squeamish about cell-cultured meat. <sup>3</sup> Public opinion surveys have found that consumers hesitate to accept cell-cultured meat as a viable food option.
                <br><sup>4</sup> Caution isn’t necessarily a bad thing, but these critiques of cell-cultured meat are just thinly disguised neophobia. <sup>5</sup> Cell-cultured meat indeed comes from labs, not farms. <sup>6</sup> But what these critics fail to realize is that there’s nothing “natural” about the vast majority of the meat already eaten in the U.S. <sup>7</sup> Ninety-nine percent (99%) of animals raised for food live in factory farms. <sup>8</sup> On these farms, livestock is given doses of antibiotics regularly as a pre-emptive measure against illnesses. <sup>9</sup> Then there’s the fact that these animals eat an abnormal diet. <sup>10</sup> For example, instead of grass, cows are fed corn in feedlots, where they are fattened up before being sent to slaughter. <sup>11</sup> Even the animals themselves are drastically different from what our grandparents ate growing up: <sup>12</sup> the chickens, cows, pigs and even the fish we eat today are the product of intense genetic engineering. <sup>13</sup> Turkeys and chickens nowadays can no longer mate on their own, relying on artificial insemination to exist.   
                <br><sup>14</sup> Cell-cultured meat also faces criticism from some animal rights activists. Cell cultivation requires starter cells taken from actual animals. <sup>15</sup> Because of this, they emphasize that cell-cultured meat isn’t completely cruelty-free. <sup>16</sup> There’s truth to this. <sup>17</sup> Fetal bovine serum (FBS), extracted from unborn cow fetuses after the mother is slaughtered is used by many companies at the forefront of cell-cultured meat experimentation. <sup>18</sup> For the chicken, cells are extracted from the muscle and fertilized eggs of actual chickens.
                <br><sup>19</sup> The cell-cultured meat industry that currently uses FBS is still vastly kinder to animals than traditional livestock production and slaughter. <sup>20</sup> While FBS is harvested from slaughtered animals, extraction from the muscle or a fertilized egg is analogous to a biopsy done on humans
            </p>
            <br>
            <p><b></b></p>
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Fact',
        type: 9,
        hint: 'C.	Read the article. Then analyze each sentence numbered sentence and classify it as FACT or OPINION. Write the number under the correct classification.',
        num: 14,
    },
    {
        question: `
            <h3>Don't be so quick to dismiss lab-grown meat</h3><br>
            <p>
                Brian Kateman<br>
                <sup>1</sup> Cell-cultured meat has been the subject of suspicion from organizations working to protect human health. <sup>2</sup> Some members of the general public are squeamish about cell-cultured meat. <sup>3</sup> Public opinion surveys have found that consumers hesitate to accept cell-cultured meat as a viable food option.
                <br><sup>4</sup> Caution isn’t necessarily a bad thing, but these critiques of cell-cultured meat are just thinly disguised neophobia. <sup>5</sup> Cell-cultured meat indeed comes from labs, not farms. <sup>6</sup> But what these critics fail to realize is that there’s nothing “natural” about the vast majority of the meat already eaten in the U.S. <sup>7</sup> Ninety-nine percent (99%) of animals raised for food live in factory farms. <sup>8</sup> On these farms, livestock is given doses of antibiotics regularly as a pre-emptive measure against illnesses. <sup>9</sup> Then there’s the fact that these animals eat an abnormal diet. <sup>10</sup> For example, instead of grass, cows are fed corn in feedlots, where they are fattened up before being sent to slaughter. <sup>11</sup> Even the animals themselves are drastically different from what our grandparents ate growing up: <sup>12</sup> the chickens, cows, pigs and even the fish we eat today are the product of intense genetic engineering. <sup>13</sup> Turkeys and chickens nowadays can no longer mate on their own, relying on artificial insemination to exist.   
                <br><sup>14</sup> Cell-cultured meat also faces criticism from some animal rights activists. Cell cultivation requires starter cells taken from actual animals. <sup>15</sup> Because of this, they emphasize that cell-cultured meat isn’t completely cruelty-free. <sup>16</sup> There’s truth to this. <sup>17</sup> Fetal bovine serum (FBS), extracted from unborn cow fetuses after the mother is slaughtered is used by many companies at the forefront of cell-cultured meat experimentation. <sup>18</sup> For the chicken, cells are extracted from the muscle and fertilized eggs of actual chickens.
                <br><sup>19</sup> The cell-cultured meat industry that currently uses FBS is still vastly kinder to animals than traditional livestock production and slaughter. <sup>20</sup> While FBS is harvested from slaughtered animals, extraction from the muscle or a fertilized egg is analogous to a biopsy done on humans
            </p>
            <br>
            <p><b>15</b></p>
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Opinion',
        type: 9,
        hint: 'C.	Read the article. Then analyze each sentence numbered sentence and classify it as FACT or OPINION. Write the number under the correct classification.',
        num: 15,
    },
    {
        question: `
            <h3>Don't be so quick to dismiss lab-grown meat</h3><br>
            <p>
                Brian Kateman<br>
                <sup>1</sup> Cell-cultured meat has been the subject of suspicion from organizations working to protect human health. <sup>2</sup> Some members of the general public are squeamish about cell-cultured meat. <sup>3</sup> Public opinion surveys have found that consumers hesitate to accept cell-cultured meat as a viable food option.
                <br><sup>4</sup> Caution isn’t necessarily a bad thing, but these critiques of cell-cultured meat are just thinly disguised neophobia. <sup>5</sup> Cell-cultured meat indeed comes from labs, not farms. <sup>6</sup> But what these critics fail to realize is that there’s nothing “natural” about the vast majority of the meat already eaten in the U.S. <sup>7</sup> Ninety-nine percent (99%) of animals raised for food live in factory farms. <sup>8</sup> On these farms, livestock is given doses of antibiotics regularly as a pre-emptive measure against illnesses. <sup>9</sup> Then there’s the fact that these animals eat an abnormal diet. <sup>10</sup> For example, instead of grass, cows are fed corn in feedlots, where they are fattened up before being sent to slaughter. <sup>11</sup> Even the animals themselves are drastically different from what our grandparents ate growing up: <sup>12</sup> the chickens, cows, pigs and even the fish we eat today are the product of intense genetic engineering. <sup>13</sup> Turkeys and chickens nowadays can no longer mate on their own, relying on artificial insemination to exist.   
                <br><sup>14</sup> Cell-cultured meat also faces criticism from some animal rights activists. Cell cultivation requires starter cells taken from actual animals. <sup>15</sup> Because of this, they emphasize that cell-cultured meat isn’t completely cruelty-free. <sup>16</sup> There’s truth to this. <sup>17</sup> Fetal bovine serum (FBS), extracted from unborn cow fetuses after the mother is slaughtered is used by many companies at the forefront of cell-cultured meat experimentation. <sup>18</sup> For the chicken, cells are extracted from the muscle and fertilized eggs of actual chickens.
                <br><sup>19</sup> The cell-cultured meat industry that currently uses FBS is still vastly kinder to animals than traditional livestock production and slaughter. <sup>20</sup> While FBS is harvested from slaughtered animals, extraction from the muscle or a fertilized egg is analogous to a biopsy done on humans
            </p>
            <br>
            <p><b>16</b></p>
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Opinion',
        type: 9,
        hint: 'C.	Read the article. Then analyze each sentence numbered sentence and classify it as FACT or OPINION. Write the number under the correct classification.',
        num: 16,
    },
    {
        question: `
            <h3>Don't be so quick to dismiss lab-grown meat</h3><br>
            <p>
                Brian Kateman<br>
                <sup>1</sup> Cell-cultured meat has been the subject of suspicion from organizations working to protect human health. <sup>2</sup> Some members of the general public are squeamish about cell-cultured meat. <sup>3</sup> Public opinion surveys have found that consumers hesitate to accept cell-cultured meat as a viable food option.
                <br><sup>4</sup> Caution isn’t necessarily a bad thing, but these critiques of cell-cultured meat are just thinly disguised neophobia. <sup>5</sup> Cell-cultured meat indeed comes from labs, not farms. <sup>6</sup> But what these critics fail to realize is that there’s nothing “natural” about the vast majority of the meat already eaten in the U.S. <sup>7</sup> Ninety-nine percent (99%) of animals raised for food live in factory farms. <sup>8</sup> On these farms, livestock is given doses of antibiotics regularly as a pre-emptive measure against illnesses. <sup>9</sup> Then there’s the fact that these animals eat an abnormal diet. <sup>10</sup> For example, instead of grass, cows are fed corn in feedlots, where they are fattened up before being sent to slaughter. <sup>11</sup> Even the animals themselves are drastically different from what our grandparents ate growing up: <sup>12</sup> the chickens, cows, pigs and even the fish we eat today are the product of intense genetic engineering. <sup>13</sup> Turkeys and chickens nowadays can no longer mate on their own, relying on artificial insemination to exist.   
                <br><sup>14</sup> Cell-cultured meat also faces criticism from some animal rights activists. Cell cultivation requires starter cells taken from actual animals. <sup>15</sup> Because of this, they emphasize that cell-cultured meat isn’t completely cruelty-free. <sup>16</sup> There’s truth to this. <sup>17</sup> Fetal bovine serum (FBS), extracted from unborn cow fetuses after the mother is slaughtered is used by many companies at the forefront of cell-cultured meat experimentation. <sup>18</sup> For the chicken, cells are extracted from the muscle and fertilized eggs of actual chickens.
                <br><sup>19</sup> The cell-cultured meat industry that currently uses FBS is still vastly kinder to animals than traditional livestock production and slaughter. <sup>20</sup> While FBS is harvested from slaughtered animals, extraction from the muscle or a fertilized egg is analogous to a biopsy done on humans
            </p>
            <br>
            <p><b>17</b></p>
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Fact',
        type: 9,
        hint: 'C.	Read the article. Then analyze each sentence numbered sentence and classify it as FACT or OPINION. Write the number under the correct classification.',
        num: 17,
    },
    {
        question: `
            <h3>Don't be so quick to dismiss lab-grown meat</h3><br>
            <p>
                Brian Kateman<br>
                <sup>1</sup> Cell-cultured meat has been the subject of suspicion from organizations working to protect human health. <sup>2</sup> Some members of the general public are squeamish about cell-cultured meat. <sup>3</sup> Public opinion surveys have found that consumers hesitate to accept cell-cultured meat as a viable food option.
                <br><sup>4</sup> Caution isn’t necessarily a bad thing, but these critiques of cell-cultured meat are just thinly disguised neophobia. <sup>5</sup> Cell-cultured meat indeed comes from labs, not farms. <sup>6</sup> But what these critics fail to realize is that there’s nothing “natural” about the vast majority of the meat already eaten in the U.S. <sup>7</sup> Ninety-nine percent (99%) of animals raised for food live in factory farms. <sup>8</sup> On these farms, livestock is given doses of antibiotics regularly as a pre-emptive measure against illnesses. <sup>9</sup> Then there’s the fact that these animals eat an abnormal diet. <sup>10</sup> For example, instead of grass, cows are fed corn in feedlots, where they are fattened up before being sent to slaughter. <sup>11</sup> Even the animals themselves are drastically different from what our grandparents ate growing up: <sup>12</sup> the chickens, cows, pigs and even the fish we eat today are the product of intense genetic engineering. <sup>13</sup> Turkeys and chickens nowadays can no longer mate on their own, relying on artificial insemination to exist.   
                <br><sup>14</sup> Cell-cultured meat also faces criticism from some animal rights activists. Cell cultivation requires starter cells taken from actual animals. <sup>15</sup> Because of this, they emphasize that cell-cultured meat isn’t completely cruelty-free. <sup>16</sup> There’s truth to this. <sup>17</sup> Fetal bovine serum (FBS), extracted from unborn cow fetuses after the mother is slaughtered is used by many companies at the forefront of cell-cultured meat experimentation. <sup>18</sup> For the chicken, cells are extracted from the muscle and fertilized eggs of actual chickens.
                <br><sup>19</sup> The cell-cultured meat industry that currently uses FBS is still vastly kinder to animals than traditional livestock production and slaughter. <sup>20</sup> While FBS is harvested from slaughtered animals, extraction from the muscle or a fertilized egg is analogous to a biopsy done on humans
            </p>
            <br>
            <p><b>18</b></p>
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Fact',
        type: 9,
        hint: 'C.	Read the article. Then analyze each sentence numbered sentence and classify it as FACT or OPINION. Write the number under the correct classification.',
        num: 18,
    },
    {
        question: `
            <h3>Don't be so quick to dismiss lab-grown meat</h3><br>
            <p>
                Brian Kateman<br>
                <sup>1</sup> Cell-cultured meat has been the subject of suspicion from organizations working to protect human health. <sup>2</sup> Some members of the general public are squeamish about cell-cultured meat. <sup>3</sup> Public opinion surveys have found that consumers hesitate to accept cell-cultured meat as a viable food option.
                <br><sup>4</sup> Caution isn’t necessarily a bad thing, but these critiques of cell-cultured meat are just thinly disguised neophobia. <sup>5</sup> Cell-cultured meat indeed comes from labs, not farms. <sup>6</sup> But what these critics fail to realize is that there’s nothing “natural” about the vast majority of the meat already eaten in the U.S. <sup>7</sup> Ninety-nine percent (99%) of animals raised for food live in factory farms. <sup>8</sup> On these farms, livestock is given doses of antibiotics regularly as a pre-emptive measure against illnesses. <sup>9</sup> Then there’s the fact that these animals eat an abnormal diet. <sup>10</sup> For example, instead of grass, cows are fed corn in feedlots, where they are fattened up before being sent to slaughter. <sup>11</sup> Even the animals themselves are drastically different from what our grandparents ate growing up: <sup>12</sup> the chickens, cows, pigs and even the fish we eat today are the product of intense genetic engineering. <sup>13</sup> Turkeys and chickens nowadays can no longer mate on their own, relying on artificial insemination to exist.   
                <br><sup>14</sup> Cell-cultured meat also faces criticism from some animal rights activists. Cell cultivation requires starter cells taken from actual animals. <sup>15</sup> Because of this, they emphasize that cell-cultured meat isn’t completely cruelty-free. <sup>16</sup> There’s truth to this. <sup>17</sup> Fetal bovine serum (FBS), extracted from unborn cow fetuses after the mother is slaughtered is used by many companies at the forefront of cell-cultured meat experimentation. <sup>18</sup> For the chicken, cells are extracted from the muscle and fertilized eggs of actual chickens.
                <br><sup>19</sup> The cell-cultured meat industry that currently uses FBS is still vastly kinder to animals than traditional livestock production and slaughter. <sup>20</sup> While FBS is harvested from slaughtered animals, extraction from the muscle or a fertilized egg is analogous to a biopsy done on humans
            </p>
            <br>
            <p><b>19</b></p>
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Fact',
        type: 9,
        hint: 'C.	Read the article. Then analyze each sentence numbered sentence and classify it as FACT or OPINION. Write the number under the correct classification.',
        num: 19,
    },
    {
        question: `
            <h3>Don't be so quick to dismiss lab-grown meat</h3><br>
            <p>
                Brian Kateman<br>
                <sup>1</sup> Cell-cultured meat has been the subject of suspicion from organizations working to protect human health. <sup>2</sup> Some members of the general public are squeamish about cell-cultured meat. <sup>3</sup> Public opinion surveys have found that consumers hesitate to accept cell-cultured meat as a viable food option.
                <br><sup>4</sup> Caution isn’t necessarily a bad thing, but these critiques of cell-cultured meat are just thinly disguised neophobia. <sup>5</sup> Cell-cultured meat indeed comes from labs, not farms. <sup>6</sup> But what these critics fail to realize is that there’s nothing “natural” about the vast majority of the meat already eaten in the U.S. <sup>7</sup> Ninety-nine percent (99%) of animals raised for food live in factory farms. <sup>8</sup> On these farms, livestock is given doses of antibiotics regularly as a pre-emptive measure against illnesses. <sup>9</sup> Then there’s the fact that these animals eat an abnormal diet. <sup>10</sup> For example, instead of grass, cows are fed corn in feedlots, where they are fattened up before being sent to slaughter. <sup>11</sup> Even the animals themselves are drastically different from what our grandparents ate growing up: <sup>12</sup> the chickens, cows, pigs and even the fish we eat today are the product of intense genetic engineering. <sup>13</sup> Turkeys and chickens nowadays can no longer mate on their own, relying on artificial insemination to exist.   
                <br><sup>14</sup> Cell-cultured meat also faces criticism from some animal rights activists. Cell cultivation requires starter cells taken from actual animals. <sup>15</sup> Because of this, they emphasize that cell-cultured meat isn’t completely cruelty-free. <sup>16</sup> There’s truth to this. <sup>17</sup> Fetal bovine serum (FBS), extracted from unborn cow fetuses after the mother is slaughtered is used by many companies at the forefront of cell-cultured meat experimentation. <sup>18</sup> For the chicken, cells are extracted from the muscle and fertilized eggs of actual chickens.
                <br><sup>19</sup> The cell-cultured meat industry that currently uses FBS is still vastly kinder to animals than traditional livestock production and slaughter. <sup>20</sup> While FBS is harvested from slaughtered animals, extraction from the muscle or a fertilized egg is analogous to a biopsy done on humans
            </p>
            <br>
            <p><b>20</b></p>
        `,
        options: ['Fact', 'Opinion'],
        answer: 'Opinion',
        type: 9,
        hint: 'C.	Read the article. Then analyze each sentence numbered sentence and classify it as FACT or OPINION. Write the number under the correct classification.',
        num: 20,
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

            data.module6 = true;
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