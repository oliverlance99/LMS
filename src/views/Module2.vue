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
                :done="module.animations.jumpstart" title="Module 2: INFERENCES, CONCLUSIONS, AND PREDICTIONS" 
                :target="targets" @close-button="nextContent"
            />

            <Transition name="left">
                <Content 
                    :last="false"
                    v-show="module.animations.jumpstart"  :done="module.doneQuiz.jumpstart" 
                    n-id="figure" label="Figure it out" :ind="0"  :active="module.jumpstartQuiz.active" :score="module.jumpstartQuiz.score"
                    title="Make a Jumpstart" id="jumpstart" content="Jumpstart" @trigger-done="doneContent"
                    :body="jumpstartBody" :questions="jumpstartQuestions" @update-quiz="updateQuiz"

                />
                <!-- -->
            </Transition>

            <Transition name="top">
                <Figure :done="module.animations.drill" v-show="module.animations.figure" :module="2" @close-button="nextContent" />
            </Transition>
            
            <Transition name="top">
                <Content 
                    :last="false" :questions="drillQuestions"
                    v-show="module.animations.drill"  :done="module.doneQuiz.drill" @trigger-done="doneContent"
                    n-id="gauge" label="Gauge your understanding" :ind="1" @update-quiz="updateQuiz" :active="module.drillQuiz.active" :score="module.drillQuiz.score"
                    title="Do the Drill" id="drill" content="Drill"
                />
                <!-- :questions="drillQuestions" -->
            </Transition>

            <Transition name="top">
                <Content 
                    v-show="module.animations.gauge"  :done="module.doneQuiz.gauge" @trigger-done="doneContent" :questions="gaugeQuestions"
                    n-id="test" label="Test yourself" :ind="2" @update-quiz="updateQuiz" :active="module.gaugeQuiz.active" :score="module.gaugeQuiz.score"
                    title="Gauge your understanding" id="gauge" content="Excercise" :body="gaugeBody" :last="false" 
                />
            </Transition>

            <Transition name="left">
                <Button v-show="module.doneQuiz.gauge" style="float: right; margin: 0px; margin-bottom: 1.5rem;">
                    <router-link class="link-btn" to="/module/3">module 3</router-link>
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

const targets = [
    'A.	Use details and personal knowledge to make inference',
    'B.	Combine details and inferences to draw conclusions',
    'C.	Infer accurate ideas and statements based on the data provided in a text',
]; 

const jumpstartBody = `
        <strong><em>Diagnostic Test:</em></strong> Play this inference riddle game. Infer what is being described by the clues you read.
        <br><br>
        1)	Press the "Show a Clue" button below.   Notice that the clue is describing someone or something. 
        <br><br>
        2)	Press it again to read another clue.   
        <br><br>
        3)	 When you think you have figured out what is being described, type it in the "Make a Guess" box and press "Check!".
`

const gaugeBody = `
    <p> <em>Differentiated Activities:</em> </p> 
`

const jumpstartQuestions: {
    num: number,
    question: string,
    hint?: string,
    riddle?: {
        answer: string,
        error: boolean,
        success: boolean,
        clues: string[]
    }
    feedback?: string,
    type?: number,
    paper?: boolean,
}[]  = [
    // Start Random
    {
        question: `
            You can’t hear me…<br>
            I am the absence of sound…<br>
            I hate noise…I love peace and quiet…<br>
            I am there when you are muted…<br>
            I am broken when you speak…<br>
            What am I?<br>

        `,
            riddle: {
            success: false, error: false,
            answer: 'SILENCE', 
            clues: [
                'STOP',
                'CALM',
                'CURB',
                'HUSH',
                'SHH',
            ]
        },
        type: 4,
        num: 1,
    },
    {
        question: `
        I enjoy controversy…
        <br>I am violent…certainly you won’t like me…
        <br>When men partake in bloody exchange…
        <br>Surely, I celebrate with glee…
        <br>I am the absence of peace.
        <br>What am I?
                `,
            riddle: {
            success: false, error: false,
            answer: 'WAR', 
            clues: [
                'HOSTILITY',
                'BLITZKRIEG',
                'RUSSIA',
                'BATTLE',
            ]

        },
        type: 4,
        num: 2,
    },
    {
        question: `
        Some need me…everybody wants me.
        <br>In your speech, expression or religion…
        <br>Without me, you feel controlled and imprisoned…
        <br>Without me, you’re unable to do what you want…
        <br>Without me, you’re powerless to make a choice…
        <br>What am I?                                                 
                `,
            riddle: {
            success: false, error: false,
            answer: 'FREEDOM', 
            clues: [
                'LIBERTY',
                'INDEPENDENCE',
                'REST',
            ]

        },
        type: 4,
        num: 3,
    },
    {
        question: `
        A representation of peace…
        <br>a common sight in towns and cities…
        <br>Soft and calming… shy, warm, and welcoming…
        <br>Serene, empathetic, optimistic…
        <br>White as this bird is the heart of a gentlewoman.
        <br>What am I?

                `,
            riddle: {
            success: false, error: false,
            answer: 'DOVE', 
            clues: [
                'ANIMAL',
                'WHITE',
                'WEDDING',
                'BIRD',
            ]

        },
        type: 4,
        num: 4,
    },
    {
        question: `
        Waving up in the air
        <br>Blue on top, red beneath…
        <br>Signifying sovereignty and self-rule
        <br>A symbol of identity and uniqueness…
        <br>Of my dear country…
        <br>What am I?                                             

                `,
            riddle: {
            success: false, error: false,
            answer: 'PHILIPPINE FLAG', 
            clues: [
                'LUPANG HINIRANG'
            ]

        },
        type: 4,
        num: 5,
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
        As usual, Ms. Flores comes to her classes five minutes before time or at the exact time her class will start. Today she is in front of the Grade 6-Just classroom, waiting for her time to meet the class for English 6. As soon as the subject teacher before her leaves, she enters the room, puts the bundle of white sheets of paper she is holding onto the teacher’s table, and greeted the students “Good morning”. Without the teacher’s command a student went to the front and led the class in prayer. Immediately after praying, the pupils gathered all of their bags at the rear part of the classroom silently then went back to their seats, only with their pens on their desks. 
        <br><br>
        <b><em>What is going to happen next in Ms. Flores’s English class?</em></b>
        `,
        choices: [
            { label: 'The teacher will administer a long test or periodic examination.', answer: true, success: false, error: false, black: false },
            { label: 'The class will practice the readers’ theater in preparation for the incoming contest.', answer: false, success: false, error: false, black: false },
            { label: 'The teacher will discuss the guidelines in the performance tasks where students will draw images.', answer: false, success: false, error: false, black: false },
            { label: 'The students will do some paper mache artwork and paper cutting activity after the discussion of a story.', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 1,
        hint: 'A.	Read the short passages, and then answer the questions that follow.'
    },
    {
        question: `
        As usual, Ms. Flores comes to her classes five minutes before time or at the exact time her class will start. Today she is in front of the Grade 6-Just classroom, waiting for her time to meet the class for English 6. As soon as the subject teacher before her leaves, she enters the room, puts the bundle of white sheets of paper she is holding onto the teacher’s table, and greeted the students “Good morning”. Without the teacher’s command a student went to the front and led the class in prayer. Immediately after praying, the pupils gathered all of their bags at the rear part of the classroom silently then went back to their seats, only with their pens on their desks. 
        <br><br>
        <b><em>Which trait best describes Ms. Flores?</em></b>
        `,
        choices: [
            { label: 'punctual', answer: true, success: false, error: false, black: false },
            { label: 'reserved', answer: false, success: false, error: false, black: false },
            { label: 'serious', answer: false, success: false, error: false, black: false },
            { label: 'strict', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 2,
        hint: 'A.	Read the short passages, and then answer the questions that follow.'
    },
    {
        question: `
        As usual, Ms. Flores comes to her classes five minutes before time or at the exact time her class will start. Today she is in front of the Grade 6-Just classroom, waiting for her time to meet the class for English 6. As soon as the subject teacher before her leaves, she enters the room, puts the bundle of white sheets of paper she is holding onto the teacher’s table, and greeted the students “Good morning”. Without the teacher’s command a student went to the front and led the class in prayer. Immediately after praying, the pupils gathered all of their bags at the rear part of the classroom silently then went back to their seats, only with their pens on their desks. 
        <br><br>
        <b><em>Which inference is correct according to the details provided in the paragraph?</em></b>
        `,
        choices: [
            { label: 'Ms. Flores is a disciplinarian type of a teacher. ', answer: false, success: false, error: false, black: false },
            { label: 'The students are afraid of their English teacher.', answer: false, success: false, error: false, black: false },
            { label: 'The teacher must have established the class routines, so she does not need to tell the class what to do.', answer: true, success: false, error: false, black: false },
            { label: 'As usual, Ms. Flores comes to her classes five minutes before time or at the exact time her class will start.', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 3,
        hint: 'A.	Read the short passages, and then answer the questions that follow.'
    },
    // -----
    {
        question: `
        A group of Filipino friends was invited by President Quezon for lunch on board the Casiana. Advanced notice was given the steward who hastily prepared a good menu. The table set, the President and guests took their places around the dining table. The President, seeing the courses before him, instead of beginning to eat, asked for the steward. 
        <br>&emsp;&emsp;“What do you think we are, Americans?” the President bawled at the steward as the latter approached. Without waiting for an answer, the President continued, “Now, don’t just stand there. Give us itlog na maalat (salted eggs) with tomatoes, adobo and sinigang. And hurry.”
        <br><br>
        <b><em>Did the steward follow President Quezon’s order?</em></b>
        `,      
        choices: [
            { label: 'Yes, but not all President Quezon’s requests were granted.', answer: false, success: false, error: false, black: false },
            { label: 'Yes, right away! After all, he was the highest official of the land.', answer: true, success: false, error: false, black: false },
            { label: 'No. There was no way he could prepare the requested food immediately.', answer: false, success: false, error: false, black: false },
            { label: 'Yes, but he made the president wait a longer time as the dishes the latter requested were not readily available.', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 4,
        hint: 'A.	Read the short passages, and then answer the questions that follow.'
    },
    {
        question: `
        A group of Filipino friends was invited by President Quezon for lunch on board the Casiana. Advanced notice was given the steward who hastily prepared a good menu. The table set, the President and guests took their places around the dining table. The President, seeing the courses before him, instead of beginning to eat, asked for the steward. 
        <br>&emsp;&emsp;“What do you think we are, Americans?” the President bawled at the steward as the latter approached. Without waiting for an answer, the President continued, “Now, don’t just stand there. Give us itlog na maalat (salted eggs) with tomatoes, adobo and sinigang. And hurry.”
        <br><br>
        <b><em>Which of the following is a correct inference about the passage?</em></b>
        `,      
        choices: [
            { label: 'The steward offered poor service.', answer: false, success: false, error: false, black: false },
            { label: 'The steward prepared American dishes.', answer: true, success: false, error: false, black: false },
            { label: 'Manuel Quezon’s friends looked like Americans.', answer: false, success: false, error: false, black: false },
            { label: 'The president as so hungry he bawled at the steward.', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 5,
        hint: 'A.	Read the short passages, and then answer the questions that follow.'
    },
    {
        question: `
        A group of Filipino friends was invited by President Quezon for lunch on board the Casiana. Advanced notice was given the steward who hastily prepared a good menu. The table set, the President and guests took their places around the dining table. The President, seeing the courses before him, instead of beginning to eat, asked for the steward. 
        <br>&emsp;&emsp;“What do you think we are, Americans?” the President bawled at the steward as the latter approached. Without waiting for an answer, the President continued, “Now, don’t just stand there. Give us itlog na maalat (salted eggs) with tomatoes, adobo and sinigang. And hurry.”
        <br><br>
        <b><em>Which statement in the passage supports the inference that President Quezon preferred Filipino food over non-Filipino dishes?</em></b>
        `,      
        choices: [
            { label: '“What do you think we are, Americans?”', answer: true, success: false, error: false, black: false },
            { label: 'The President bawled at the steward.', answer: false, success: false, error: false, black: false },
            { label: 'Seeing the courses before him, the president asked for the steward.', answer: false, success: false, error: false, black: false },
            { label: 'Give us itlog na maalat (salted eggs) with tomatoes, adobo and sinigang.”', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 6,
        hint: 'A.	Read the short passages, and then answer the questions that follow.'
    },
    {
        question: `
        A group of Filipino friends was invited by President Quezon for lunch on board the Casiana. Advanced notice was given the steward who hastily prepared a good menu. The table set, the President and guests took their places around the dining table. The President, seeing the courses before him, instead of beginning to eat, asked for the steward. 
        <br>&emsp;&emsp;“What do you think we are, Americans?” the President bawled at the steward as the latter approached. Without waiting for an answer, the President continued, “Now, don’t just stand there. Give us itlog na maalat (salted eggs) with tomatoes, adobo and sinigang. And hurry.”
        <br><br>
        <b><em>Which of the following was most likely served on the dining table?</em></b>
        `,      
        choices: [
            { label: 'Dimsum and pansit', answer: false, success: false, error: false, black: false },
            { label: 'Pizza and spaghetti', answer: false, success: false, error: false, black: false },
            { label: 'Chicken and lasagna', answer: false, success: false, error: false, black: false },
            { label: 'Steak and mashed potatoes', answer: true, success: false, error: false, black: false },
        ],
        type: 1,
        num: 7,
        hint: 'A.	Read the short passages, and then answer the questions that follow.'
    },
    {
        question: `
        A group of Filipino friends was invited by President Quezon for lunch on board the Casiana. Advanced notice was given the steward who hastily prepared a good menu. The table set, the President and guests took their places around the dining table. The President, seeing the courses before him, instead of beginning to eat, asked for the steward. 
        <br>&emsp;&emsp;“What do you think we are, Americans?” the President bawled at the steward as the latter approached. Without waiting for an answer, the President continued, “Now, don’t just stand there. Give us itlog na maalat (salted eggs) with tomatoes, adobo and sinigang. And hurry.”
        <br><br>
        <b><em>What conclusion can you make about President Quezon?</em></b>
        `,      
        choices: [
            { label: 'He was a mean and cruel president.', answer: false, success: false, error: false, black: false },
            { label: 'His taste buds were not influenced by the Americans.', answer: true, success: false, error: false, black: false },
            { label: 'He despised the Americans and everything about them.', answer: false, success: false, error: false, black: false },
            { label: 'All of the above.', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 8,
        hint: 'A.	Read the short passages, and then answer the questions that follow.'
    },

    // ----- type 5 multi with identification
    {
        question: `
        The history of the Philippines dates from the earliest hominin activity in the archipelago at least 709,000 years ago. Homo luzonensis, a species of archaic humans, was present on the island of Luzon at least 67,000 years ago. The earliest known anatomically modern human was from Tabon Caves in Palawan dating about 47,000 years. Negrito groups were the first inhabitants to settle in the prehistoric Philippines. By around 3000 BC, seafaring Austronesians, who form the majority of the current population, migrated southward from Taiwan.
        <br><br>
        <b><em>It can be inferred that many Filipinos look like…</em></b>
        `,      
        choices: [
            { label: 'Negritos', answer: false, success: false, error: false, black: false },
            { label: 'Hispanic people', answer: false, success: false, error: false, black: false },
            { label: 'Tabon man', answer: false, success: false, error: false, black: false },
            { label: 'Taiwanese', answer: true, success: false, error: false, black: false },
        ],
        choice2: 'Copy the sentence in the passage that gives a clue to the correct answer.',
        type: 1,
        num: 1,
        hint: 'B.	Choose the correct inference and copy the sentence in the paragraph that gives the supporting information to your answer. Put the sentence in the box.'
    },
    {
        question: `
        Scholars generally believe that these ethnic and social groups eventually developed into various villages. These communities had varying degrees of economic knowledge, social classification, and political organization. Some of them achieved such a degree of social complexity that some researchers believe they should be considered early states. This includes Manila, Tondo, Pangasinan, Cebu, Panay, Bohol, Butuan, Cotabato, Lanao, Zamboanga, and Sulu as well as Mindoro or Laguna.
        <br><br>
        <b><em>The places mentioned in the paragraph were among the …</em></b>
        `,      
        choices: [
            { label: 'largest provinces in the country.', answer: false, success: false, error: false, black: false },
            { label: 'most easily accessed states in the country.', answer: false, success: false, error: false, black: false },
            { label: 'earliest established places in the Philippines.', answer: true, success: false, error: false, black: false },
            { label: 'most currently progressive places in the Philippines. ', answer: false, success: false, error: false, black: false },
        ],
        choice2: 'Copy the sentence in the passage that gives a clue to the correct answer.',
        type: 1,
        num: 2,
        hint: 'B.	Choose the correct inference and copy the sentence in the paragraph that gives the supporting information to your answer. Put the sentence in the box.'
    },
    {
        question: `
        During the Neolithic or New Stone Age, the established Philippine communities were influenced by Islamic, Indian, and Chinese cultures. Islam arrived from Arabia, while Indian Hindu-Buddhist religion, language, culture, literature, and philosophy arrived through expeditions from the South-East. Some communities were also assimilated into the Chinese in habits and thoughts. These villages traded with China, India, Japan, Thailand, Vietnam, and Indonesia. The remainder of the inhabited places were independent barangays allied with one of the larger communities. These small villages alternated between being part of or influenced by larger Asian empires or by rebelling and waging war against them.
        `,      
        choices: [
            { label: 'The religions of the Filipinos during the New Stone Age were Islam and Buddhism.', answer: false, success: false, error: false, black: false },
            { label: 'The Filipinos were influenced more by traders from the South-East than from the Middle East.', answer: true, success: false, error: false, black: false },
            { label: 'Through and through, the Philippine villagers had a very diplomatic relationship with the larger Asian empires. ', answer: false, success: false, error: false, black: false },
            { label: 'The Chinese empire tried to conquer the Philippines by assimilating the villages into them in habits and thoughts.', answer: false, success: false, error: false, black: false },
        ],
        choice2: 'Copy the sentence in the passage that gives a clue to the correct answer.',
        type: 1,
        num: 3,
        hint: 'B.	Choose the correct inference and copy the sentence in the paragraph that gives the supporting information to your answer. Put the sentence in the box.'
    },
    {
        question: `
        The first recorded visit by Europeans is Ferdinand Magellan's expedition which landed in Homonhon Island, Eastern Samar on March 17, 1521. Magellan’s troops lost a battle against the army of Lapulapu who killed Magellan. The Spanish colonial period in the Philippines began with the arrival of Miguel López de Legazpi's expedition on February 13, 1565. He established the first permanent settlement in Cebu. Much of the archipelago came under Spanish rule, creating the first unified political structure known as the Philippines. Spanish colonial rule saw the introduction of Christianity, the code of law, and the oldest modern university in Asia.
        `,      
        choices: [
            { label: 'The oldest modern university in Asia is the University of Santo Tomas, and it was built by Legaspi.', answer: false, success: false, error: false, black: false },
            { label: 'Magellan lost the battle in Mactan because his troop was outnumbered by Lapulapu’s group.', answer: false, success: false, error: false, black: false },
            { label: 'The Philippines became a colony of Spain; Christianity, rules, government, schools, and others were established.', answer: false, success: false, error: false, black: false },
            { label: 'Legaspi and his men must have prepared very well to ensure that they would be successful in colonizing the Philippines.', answer: true, success: false, error: false, black: false },
        ],
        choice2: 'Copy the sentence in the passage that gives a clue to the correct answer.',
        type: 1,
        num: 4,
        hint: 'B.	Choose the correct inference and copy the sentence in the paragraph that gives the supporting information to your answer. Put the sentence in the box.'
    },
    {
        question: `
        Spanish rule ended in 1898 with Spain's defeat in the Spanish–American War. The Philippines then became a territory of the United States. U.S. forces suppressed a revolution led by Emilio Aguinaldo. The United States established a government to rule the Philippines. Later on, the U.S. promised the Philippines independence. The Philippine Commonwealth was established in 1935, as a 10-year interim step prior to full independence. However, in 1942 during World War II, Japan occupied the Philippines. The U.S. military overpowered the Japanese in 1945. The Treaty of Manila in 1946 established the independent Philippine Republic.
        `,      
        choices: [
            { label: 'The US defeated Spain in a war in 1898 not to protect the Philippines from the abuses of Spain but to take over and colonize our country after the former. ', answer: true, success: false, error: false, black: false },
            { label: 'The Americans are liberal-minded, so the Filipinos lived freely while they were under American rule.', answer: false, success: false, error: false, black: false },
            { label: 'The promise of the United States to grant independence to the Philippines did not happen because of the Japanese.', answer: false, success: false, error: false, black: false },
            { label: 'The Japanese did not colonize the Philippines; there was simply World War II. ', answer: false, success: false, error: false, black: false },
        ],
        choice2: 'Copy the sentence in the passage that gives a clue to the correct answer.',
        type: 1,
        num: 5,
        hint: 'B.	Choose the correct inference and copy the sentence in the paragraph that gives the supporting information to your answer. Put the sentence in the box.'
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
        The following items are statements that directly and explicitly tell your feelings or situations, or they may be circumstances of some people you know. Revise the statements so that you show them instead of telling them. Describe and give details to each given situation. Number 1 is done as example and pattern.
        <br><br>
        <b><em> *Sample* Telling: You were so angry when your got my test back and realized you had failed.</em></b>
        <br>
        Showing:
        `,
        paper: false,
        essay:{
            black: true,
            answer: `When the teacher placed the test on my desk, I glanced down at 
the red circled number at the top of the page. My muscle tensed, and I felt my face grow hot. My eyes narrowed in on the page. Fuming, I realized that all the work I had done was for absolutely nothing.
`,
        },
        type: 3,
        num: 1,
        hint: 'A.	Telling vs Showing'
    },
    {
        question: `
            The following items are statements that directly and explicitly tell your feelings or situations, or they may be circumstances of some people you know. Revise the statements so that you show them instead of telling them. Describe and give details to each given situation. Number 1 is done as example and pattern.
            <br><br>
            <b><em>Telling: It was such an awkward moment when I mispronounced the coffee variant I was ordering in a popular coffee shop.</em></b>
            <br>
            Showing:
        `,
        paper: false,
        essay:{
            black: false,
        },
        type: 3,
        num: 2,
        hint: 'A.	Telling vs Showing'
    },
    {
        question: `
            The following items are statements that directly and explicitly tell your feelings or situations, or they may be circumstances of some people you know. Revise the statements so that you show them instead of telling them. Describe and give details to each given situation. Number 1 is done as example and pattern.
            <br><br>
            <b><em>Telling: Your teacher sprang out of fear when a wasp dart into the classroom out of nowhere.</em></b>
            <br>
            Showing:
        `,
        paper: false,
        essay:{
            black: false,
        },
        type: 3,
        num: 3,
        hint: 'A.	Telling vs Showing'
    },
    {
        question: `
            The following items are statements that directly and explicitly tell your feelings or situations, or they may be circumstances of some people you know. Revise the statements so that you show them instead of telling them. Describe and give details to each given situation. Number 1 is done as example and pattern.
            <br><br>
            <b><em>You felt quite embarrassed when you noticed the people you were passing by staring at you because you were thinking out loud or talking loudly to yourself while walking alone.</em></b>
            <br>
            Showing:
        `,
        paper: false,
        essay:{
            black: false,
        },
        type: 3,
        num: 4,
        hint: 'A.	Telling vs Showing'
    },
    {
        question: `
            The following items are statements that directly and explicitly tell your feelings or situations, or they may be circumstances of some people you know. Revise the statements so that you show them instead of telling them. Describe and give details to each given situation. Number 1 is done as example and pattern.
            <br><br>
            <b><em>You are worried that when you cough in class, you would be sent home and suspected to have COVID so you hold your breath to keep from coughing.</em></b>
            <br>
            Showing:
        `,
        paper: false,
        essay:{
            black: false,
        },
        type: 3,
        num: 5,
        hint: 'A.	Telling vs Showing'
    },
    // ----
    {
        question: `
            Beautiful, by Christina Aguilera 
        `,
        paper: false,
        essay:{
            black: false,
        },
        feedback: `<span style="color: red;">Answer</span>: “Beautiful” is about maintaining your sense of self-worth even when 
            others are trying to tear you down.
        `,
        type: 3,
        num: 1,
        hint: 'B.	Music: Listen to the lyrics of these songs then write a sentence that expresses a correct inference or conclusion about the meaning of the song. '
    },
    {
        question: `
            Mean, by Taylor Swift 
        `,
        paper: false,
        essay:{
            black: false,
        },
        type: 3,
        num: 2,
        feedback: `<span style="color: red;">Answer</span>: When a child is being bullied, it’s very difficult to keep perspective and 
            realize that this is a temporary phase.
        `,
        hint: 'B.	Music: Listen to the lyrics of these songs then write a sentence that expresses a correct inference or conclusion about the meaning of the song. '
    },
    {
        question: `
            Firework, by Katy Perry
        `,
        paper: false,
        essay:{
            black: false,
        },
        type: 3,
        num: 3,
        feedback: `<span style="color: red;">Answer</span>:“Firework” is about feeling good about yourself and shining bright for the world.
        `,
        hint: 'B.	Music: Listen to the lyrics of these songs then write a sentence that expresses a correct inference or conclusion about the meaning of the song. '
    },
    {
        question: `
            Count on Me, by Bruno Mars
        `,
        paper: false,
        essay:{
            black: false,
        },
        type: 3,
        num: 4,
        feedback: `<span style="color: red;">Answer</span>:“Count on Me” is a pretty strong exception. It’s explicitly about 
friendship and about counting on the people in your life you’re closest to.

        `,
        hint: 'B.	Music: Listen to the lyrics of these songs then write a sentence that expresses a correct inference or conclusion about the meaning of the song. '
    },
    {
        question: `
            Who Says, by Selena Gomez
        `,
        paper: false,
        essay:{
            black: false,
        },
        type: 3,
        num: 5,
        feedback: `<span style="color: red;">Answer</span>:"Who Says” discusses loving who you are, flaws and all."
        `,
        hint: 'B.	Music: Listen to the lyrics of these songs then write a sentence that expresses a correct inference or conclusion about the meaning of the song. '
    },
    
    // ----
    {
        question: `
        Riddle Task Cards
Make five riddles. The answers to your riddles should all be about things or ideas related to math and science. Have 5 clues (one clue in every line) in each riddle that you will make. 
        `,
        paper: true,
        type: 3,
        num: 1,
        hint: 'C.	Create task cards for inference. Upload your outputs in the LMS that the school is using. '
    },
    {
        question: `
        Picture Task Cards for Inference
Draw 5 images related to math or science or select 5 of your pictures with some clues or hints in the details of the images so that viewers can make sound inferences. Write two inferences that you expect viewers to give,  at the back of each task card.
        `,
        paper: true,
        type: 3,
        num: 2,
        hint: 'C.	Create task cards for inference. Upload your outputs in the LMS that the school is using. '
    },
];

const addNavigation = (id: string,  label: string) =>{

    module.navigations[module.navigations.length-1].active = false

    module.navigations.push({
        label: label,
        id: id,
        active: true,
    })

    localStorage.setItem('module2', JSON.stringify(module))
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

            data.module2 = true;
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

    localStorage.setItem('module2', JSON.stringify(module))
}

onBeforeMount(() => {

    let storage = localStorage.getItem('module2');

    if(storage){
        let data: Module = JSON.parse(storage)

        module = reactive(data)
    }
    else{
        localStorage.setItem('module2', JSON.stringify(module))
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