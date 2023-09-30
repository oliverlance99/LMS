<template>
    <div class="module-box">
        <TransitionGroup name="left" tag="div" class="navigation">
            <a v-for="(navigation, ind) in module.navigations" :class="{active: navigation.active}" :href="`#${navigation.id}`" :key="`${ind}navigation`">
                <i :class="`fa-${navigation.active ? 'solid active' : 'regular'} fa-square`"></i>
                {{ navigation.label }}
            </a>
        </TransitionGroup>

        <div class="module-content">
            <Introduction :done="module.animations.jumpstart" title="Module 1: MAIN IDEA AND SUPPORTING DETAILS" :target="targets" @close-button="nextContent" />

            <Transition name="left">
                <Content 
                    :last="false"
                    v-show="module.animations.jumpstart" :questions="questions" :done="module.doneQuiz.jumpstart" @trigger-done="doneContent"
                    n-id="figure" label="Figure it out" :ind="0" @update-quiz="updateQuiz" :active="module.jumpstartQuiz.active" :score="module.jumpstartQuiz.score"
                    title="Make a Jumpstart" id="jumpstart" content="Jumpstart" body="<strong><em>Diagnostic Test:</em></strong> Read the passage carefully, and then answer the question that follows. Tick the button that corresponds to the letter of the correct answer."
                />
            </Transition>

            <Transition name="top">
                <Figure :done="module.animations.figure" v-show="module.animations.figure" :module="1" @close-button="nextContent" />
            </Transition>
            
            <Transition name="top">
                <Content 
                    :last="false"
                    v-show="module.animations.drill" :questions="questionsDrill" :done="module.doneQuiz.drill" @trigger-done="doneContent"
                    n-id="gauge" label="Gauge your understanding" :ind="1" @update-quiz="updateQuiz" :active="module.drillQuiz.active" :score="module.drillQuiz.score"
                    title="Do the Drill" id="drill" content="Drill" body="Study these examples. Try to identify the main idea of the paragraphs."
                />
            </Transition>
            
            <Transition name="top">
                <Content 
                    v-show="module.animations.gauge" :questions="questionsGauge" :done="module.doneQuiz.gauge" @trigger-done="doneContent"
                    n-id="test" label="Test yourself" :ind="2" @update-quiz="updateQuiz" :active="module.gaugeQuiz.active" :score="module.gaugeQuiz.score"
                    title="Gauge your understanding" id="gauge" content="Excercise" body="" :last="false"
                />
            </Transition>
            
            <Transition name="top">
                <div id="test" v-show="module.doneQuiz.gauge">
                    <h3 style="margin-top: 3rem;">Test yourself</h3>
                    <p>Who deserves to be called a product's inventor: The first person to dream up a product? To produce the product? To patent a product? Or to commercialize it?</p>
                    <p><b>1</b> &emsp;Let's take the example of the yo-yo. We know from Greek vases that children played with yoyo-like toys 2500 years ago. The word itself comes from the Philippines where the toy was introduced in the early nineteenth century, y'yo being the Tagalog word supposedly meaning come and go. There is even <b>speculation</b> that versions of it with razor-sharp edges were used as weapons, almost like a <b>boomerang</b>.</p>
                    <p><b>2</b> &emsp;The first U.S. patent for a yo-yo like toy was issued in 1866, but it was not until 1928, that a Filipino immigrant named Pedro Flores popularized the toy. While working as a <b>porter</b> in a Santa Monica, California hotel, he demonstrated various yo-yo tricks to the guests. Flores made a key <b>innovation</b> in the yo-yo. Instead of tying a knot around the <b>axel</b>, he used a loop, which allowed the yo-yo to sleep or spin and to perform other tricks. Flores's demonstrations proved so popular that he opened the Yo-yo Manufacturing Company in Santa Barbara. Flores is also credited with promoting the yo-yo contests that helped fuel the craze.</p>
                    <p>&emsp;Then Donald Duncan — the <b>entrepreneur</b> who marketed the first successful parking meter — bought out Flores's company. Duncan succeeded in turning yo-yos into the first modern children toy craze using new mass advertising techniques. He sent out teams to demonstrate yo-yo tricks. In fact, Duncan hired Flores to serve as one of the first 42 original yo-yo demonstrators. </p>
                    <p>&emsp;Flores' and Duncan's yo-yo were among the very first toys marketed directly to children rather than to their parents. Unlike earlier toys, such as Lincoln Logs or dolls, yo-yos weren't intended to socialize boys and girls into distinctive gender roles. Nor were they sold as educational, even though yo-yos can illustrate such principles of physics as motion, friction, inertia, <b>acceleration</b>, <b>momentum</b>, and <b>velocity</b>.<br>
                        Not surprisingly, the yo-yo has had its ups-and-downs, only to bounce back. Today, it's possible to buy a yo-yo formed from magnesium alloy with a <b>precision</b> ball bearing axel for more than $400.<br>
                        In a children's world <b>dominated</b> by videogames, fewer kids know how to "walk the dog" or "rock the baby" or make the yo-yo go 'round the world.' Still, we might remember that today's highly commercialized world of mass manufactured children's toys began with the lowly yo-yo.
                    </p>

                    <p>
                        1 the origin of yoyo<br>
                        2 how the yoyo toy became popular<br>
                        3 
                    </p>

                    <p>The Yo-Yo | The Engines of Our Ingenuity. Engines.egr.uh.edu. </p>
                    <a target="_blank" href="https://engines.egr.uh.edu/episode/2796#:~:text=The%20first%20U.S.%20patent%20for">Reference Link</a>
                </div>
            </Transition>

            <Transition name="left">
                <Button v-show="module.doneQuiz.gauge" style="float: right; margin: 0px; margin-bottom: 1.5rem;">
                    <router-link class="link-btn" to="/module/2">module 2</router-link>
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
import Figure from '@/components/module/Figure.vue';
import Content from '@/components/module/QuizContent.vue';
import Button from '@/components/Button.vue'

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
    'A. Identify the main idea of a text.',
    'B. Enumerate details that support the main idea.',
]; 

const questions: {
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
    type?: number
}[]  = [
    // Start Random
    {
        question: 'An outbreak of a severe respiratory disease emerged in China in early 2020. The virus was first seen in December of 2019 when a cluster of viral pneumonia cases was reported in Wuhan, the capital city of Hubei Province. A novel coronavirus was identified as the causative agent of the pneumonia. The virus, temporarily named 2019-nCoV (now called COVID-19), caused a widespread epidemic throughout China. ',
        choices: [
            { label: 'How COVID-19 started', answer: true, success: false, error: false, black: false },
            { label: 'When COVID-19 started', answer: false, success: false, error: false, black: false },
            { label: 'How COVID-19 got its name', answer: false, success: false, error: false, black: false },
            { label: 'Where COVID-19 originated', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 1,
    },
    {
        question: 'Viruses, and the diseases they cause, often have different names.  For example, HIV is the virus that causes AIDS.  People often know the name of a disease, but not the name of the virus that causes it. There are different processes, and purposes, for naming viruses and diseases. Viruses are named based on their genetic structure to facilitate the development of diagnostic tests, vaccines and medicines. Virologists and the wider scientific community do this work, so viruses are named by the International Committee on Taxonomy of Viruses (ICTV). Diseases are named to enable discussion on disease prevention, spread, transmissibility, severity and treatment.',
        choices: [
            { label: 'Viruses, and the diseases they cause, often have different names.', answer: false, success: false, error: false, black: false },
            { label: 'There are different processes, and purposes, for naming viruses and diseases.', answer: true, success: false, error: false, black: false },
            { label: 'Viruses are named based on their genetic structure to facilitate the development of diagnostic tests, vaccines and medicines.', answer: false, success: false, error: false, black: false },
            { label: 'Diseases are named to enable discussion on disease prevention, spread, transmissibility, severity and treatment.', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 2,
    },
    {
        question: `When did coronavirus reach the Philippines? The first case of novel coronavirus (2019-nCoV, now COVID-19) in the Philippines was confirmed on 30 January 2020, in a 38-year old woman who arrived from Wuhan. Two days later, the Philippines recorded the first death outside China on 01 February 2020.
            <br>The Philippines holds the record of first confirmed COVID death outside of China. The first case in the Philippines was identified on January 30, 2020, and it involved a 38-year-old Chinese woman and a 44-year-old Chinese man from Wuhan who were both confined at San Lazaro Hospital in Metro Manila. Both were infected before their arrival in the Philippines. Two days later, Chinese man died, and the country recorded the first death outside China on 01 February 2020.
        `,
        choices: [
            { success: false, error: false, black: false, label: 'When did COVID-19 start in the Philippines?', answer: false },
            { success: false, error: false, black: false, label: 'A Chines couple started the spread of COVID-19 in the Philippines.', answer: false},
            { success: false, error: false, black: false, label: 'A 38-year-old Chinese woman and a 44-year-old Chinese man from Wuhan were the first COVID cases in the Philippines.', answer: false},
            { success: false, error: false, black: false, label: 'The first recorded COVID death outside of China took place in the Philippines, and it involved two Chinese couple who were infected before arrival in the country.', answer: true},
        ],
        type: 1,
        num: 3,
    },
    {
        question: 'A pandemic is large disease outbreak that affects several countries and poses major health, social, and economic risks. A quick-moving pathogen spreading across the globe has the potential to kill tens of millions of people, disrupt economies, and destabilize national security – just as COVID-19 has demonstrated.',
        choices: [
            { success: false, error: false, black: false, label: 'What is a pandemic?', answer: true },
            { success: false, error: false, black: false, label: 'What is COVID-19 pandemic?', answer: false},
            { success: false, error: false, black: false, label: 'How many people die in a pandemic?', answer: false},
            { success: false, error: false, black: false, label: 'What major risks are posed by a pandemic? ', answer: false},
        ],
        type: 1,
        num: 4,
    },
    {
        question: 'Coronaviruses are a large family of zoonotic viruses that cause illness ranging from the common cold to severe respiratory diseases. Zoonotic means these viruses are able to be transmitted from animals to humans. There are several coronaviruses known to be circulating in different animal populations that have not yet infected humans. COVID-19 is the most recent to make the jump to human infection.',
        choices: [
            { success: false, error: false, black: false, label: 'Kinds of coronaviruses ', answer: false },
            { success: false, error: false, black: false, label: 'Description of coronaviruses', answer: true},
            { success: false, error: false, black: false, label: 'Where COVID-19 came from', answer: false},
            { success: false, error: false, black: false, label: 'Meaning of zoonotic viruses', answer: false},
        ],
        type: 1,
        num: 5,
    },

    // End Random
    {
        question: `
            The COVID-19 virus spreads mainly between people who are in close contact with each other, for example at a conversational distance. The virus can spread from an infected person’s mouth or nose in small liquid particles when they cough, sneeze, speak, sing or breathe. Another person can then contract the virus when infectious particles that pass through the air are inhaled at short range or if infectious particles come into direct contact with the eyes, nose, or mouth. <br><br>
            
            Which of the sentences below is the most acceptable detail to that supports the main idea of the paragraph?
            `,
        choices: [
            { success: false, error: false, black: false, label: 'There are many things you can do to keep yourself and your loved ones safe from COVID-19.', answer: false },
            { success: false, error: false, black: false, label: 'Lastly, COVID-19 virus is transmitted through blood transfusion from a person who is infected with the virus.', answer: false},
            { success: false, error: false, black: false, label: 'Whether or not they have symptoms, infected people can be contagious and the virus can spread from them to other people.', answer: false},
            { success: false, error: false, black: false, label: 'People may also become infected when touching their eyes, nose or mouth after touching surfaces or objects that have been contaminated by the virus.', answer: true},
        ],
        type: 1,
        num: 6,
    },
    {
        question: `
            The COVID-19 virus spreads mainly between people who are in close contact with each other, for example at a conversational distance. The virus can spread from an infected person’s mouth or nose in small liquid particles when they cough, sneeze, speak, sing or breathe. Another person can then contract the virus when infectious particles that pass through the air are inhaled at short range or if infectious particles come into direct contact with the eyes, nose, or mouth. <br><br>
            
            What is the paragraph all about?
            `,
        choices: [
            { success: false, error: false, black: false, label: 'How COVID-19 spreads', answer: true },
            { success: false, error: false, black: false, label: 'How fast COVID-19 virus multiplies', answer: false},
            { success: false, error: false, black: false, label: 'What body parts are affected by COVID-19', answer: false},
            { success: false, error: false, black: false, label: 'Who are prone to getting infected with COVID-19', answer: false},
        ],
        type: 1,
        num: 7,
    },
    {
        question: `
            <b>A)</b> Although the state of public health emergency has been lifted by WHO, COVID-19 still poses global threat; hence, all forms of protection should still be done. <b>B)</b> There are many ways one’s actions can protect oneself, the household, and the community from COVID-19. <b>C)</b> Since close person-to-person contact appears to be the main source of transmission, social distancing remains a key way to mitigate the spread. <b>D)</b> In addition, studies have found that COVID-19 virus came from animals. <b>E)</b> Practicing good hygiene is an important habit that helps prevent the spread of the disease, so this should be made part of the routine. <b>F)</b> It is also recommended that people wear face coverings in public settings. 
            <br><br>
            
            Which sentence in the paragraph states the main idea?
            `,
        choices: [
            { success: false, error: false, black: false, label: 'Sentence A', answer: false },
            { success: false, error: false, black: false, label: 'Sentence B', answer: true},
            { success: false, error: false, black: false, label: 'Sentence E', answer: false},
            { success: false, error: false, black: false, label: 'Sentence F', answer: false},
        ],
        type: 1,
        num: 8,
    },
    {
        question: `
            <b>A)</b> Although the state of public health emergency has been lifted by WHO, COVID-19 still poses global threat; hence, all forms of protection should still be done. <b>B)</b> There are many ways one’s actions can protect oneself, the household, and the community from COVID-19. <b>C)</b> Since close person-to-person contact appears to be the main source of transmission, social distancing remains a key way to mitigate the spread. <b>D)</b> In addition, studies have found that COVID-19 virus came from animals. <b>E)</b> Practicing good hygiene is an important habit that helps prevent the spread of the disease, so this should be made part of the routine. <b>F)</b> It is also recommended that people wear face coverings in public settings. 
            <br><br>
            
            Which of these sentences can be an added supporting detail to the paragraph?
            `,
        choices: [
            { success: false, error: false, black: false, label: 'This highly contagious virus appears to be most commonly spread during close person-to-person contact.', answer: false },
            { success: false, error: false, black: false, label: 'With the COVID-19 pandemic now coinciding with flu season, it’s important to recognize the differences in symptoms.', answer: false},
            { success: false, error: false, black: false, label: 'Avoiding non-essential travel to many international destinations during the pandemic is likewise advised during the pandemic.', answer: true},
            { success: false, error: false, black: false, label: 'If you think you may have been exposed to a person with COVID-19 and have symptoms, call ahead to a doctor’s office to see if you can get tested.', answer: false},
        ],
        type: 1,
        num: 9,
    },
    {
        question: `
            <b>A)</b> Although the state of public health emergency has been lifted by WHO, COVID-19 still poses global threat; hence, all forms of protection should still be done. <b>B)</b> There are many ways one’s actions can protect oneself, the household, and the community from COVID-19. <b>C)</b> Since close person-to-person contact appears to be the main source of transmission, social distancing remains a key way to mitigate the spread. <b>D)</b> In addition, studies have found that COVID-19 virus came from animals. <b>E)</b> Practicing good hygiene is an important habit that helps prevent the spread of the disease, so this should be made part of the routine. <b>F)</b> It is also recommended that people wear face coverings in public settings. 
            <br><br>
            
            10.	Which of the sentences in the paragraph does not support the main idea?
            `,
        choices: [
            { success: false, error: false, black: false, label: 'Sentence A', answer: false },
            { success: false, error: false, black: false, label: 'Sentence C', answer: false},
            { success: false, error: false, black: false, label: 'Sentence D', answer: true},
            { success: false, error: false, black: false, label: 'Sentence E', answer: false},
        ],
        type: 1,
        num: 10,
    }
];

const questionsDrill: {
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
    feedback?: string,
    type?: number
}[]  = [
    // Start Random
    {
        question: `After a long, hard day at work, who could live without the welcoming barks of man's best friend? Millions of years ago, there were no domestic dogs. Believe it or not, today's domestic dogs are descended from a wild, wolfish ancestor. How did the snarling, man-eating wolf of millions of years ago become the loyal lapdog of today? There are two theories about how wolves evolved into dogs. One theory is that ancient people selected certain wolves to mate and thereby affected the traits that were passed down with the genes from the parents to the pups. Another, more recent theory is that the genes that made some wolves less shy (and therefore more easily domesticated) also triggered in wolves a whole series of changes that rapidly changed the wolf of the past to the tame creatures we call "man's best friend."

                <br><br>Which of the following best describes the main idea?
                `,
        choices: [
            { label: 'Wolves were dogs’ ancestors.', answer: false, success: false, error: false, black: false },
            { label: 'There are two theories about how wolves evolved into dogs.', answer: true, success: false, error: false, black: false },
            { label: 'Genetic makeup of wolves makes some less shy.', answer: false, success: false, error: false, black: false },
            { label: 'After a long, hard day at work, who could live without the welcoming barks of man\'s best friend?', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 1,
        feedback: `The correct answer is B. <i>There are two theories about how wolves evolved into dogs. </i>
            This is the main idea of the paragraph and it is directly stated. It is broad enough to cover all that is in the piece and specific enough to pinpoint the topic.
        `,
    },
    {
        question: `When someone mentions the word cockroach, what do you think of? If you are like most people, it is not a pleasant thought. However, despite the hatred that most people feel toward cockroaches, they do help humans in many ways. For example, they are perfect experimental animals and are used for scientific research in the laboratory. Scientists use roaches to help them study cancerous tumors because roaches grow tumors similar to those found in humans. Also, breeding them is easy because they thrive under almost any conditions. In fact, it is said that cockroaches could even survive a nuclear bomb. Since cockroaches will eat just about anything, they also make good test subjects to study food and nutrition. Long live "la cucaracha"!

            <br><br>The main idea is found in…
            `,
        choices: [
            { label: 'Sentence 1', answer: false, success: false, error: false, black: false },
            { label: 'Sentence 2', answer: false, success: false, error: false, black: false },
            { label: 'Sentence 3', answer: true, success: false, error: false, black: false },
            { label: 'Sentence 4', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 2,
        feedback: `In the example provided, the main idea is directly stated in the <b>third sentence (Despite the hatred that most people feel toward cockroaches, they do help humans in many ways).</b> 
            That is not always the case. Sometimes the main idea is not directly stated. Let's take a look at some examples where that is the case.
        `,
    },
    {
        question: `Now, try to figure out the main idea of this paragraph. <br>

            When I was a little girl, I took piano lessons every Monday after school. I walked to Ms. Santos's house with my tattered sheet music in my school lunch-stained hands. She taught me the scales, the proper way to hold my small fingers, and the theme song from The Pink Panther. She also taught me much more. From her I learned the necessity of practice, the importance of patience, and the joy of achieving a goal after hard work. She also gave me the gift of music. All of that was learned in a half hour lesson on Monday afternoons.

        <br>What is the implied main idea?
        `,
        choices: [
            { label: 'When I was a little girl, I took piano lessons every Monday after school.', answer: false, success: false, error: false, black: false },
            { label: 'Piano lessons can teach a person about music, the love of music, and many other life lessons.', answer: true, success: false, error: false, black: false },
            { label: 'The gift of music is nice.', answer: false, success: false, error: false, black: false },
            { label: 'None of the above', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 3,
        feedback: `The correct answer is B. <b>Piano lessons can teach a person about music, the love of music, and many other life lessons.</b>`,
    },
    {
        question: `Now, try to figure out the main idea of this paragraph. <br>
                Early scientists believed that all dinosaurs, like most reptiles, laid and then immediately abandoned their eggs. The newly hatched young were left to take care of themselves. However, the recent discovery of a group of nests has challenged this belief. The nests, which contained fossilized baby dinosaurs that were not newborn, provided evidence that dinosaur parents actually cared for their young. For some time after birth, the babies would stay at their nest while the parents brought back plant matter for food. The young stayed at home until they were large enough to roam safely on their own.

            <br>What is the main idea?
            `,
        choices: [
            { label: 'For some time after birth, the babies would stay at their nest while the parents brought back plant matter for food.', answer: false, success: false, error: false, black: false },
            { label: 'The recent discovery of a dinosaur nest has provided evidence that dinosaur parents cares for their young. ', answer: true, success: false, error: false, black: false },
            { label: 'Dinosaurs care for their young.', answer: false, success: false, error: false, black: false },
            { label: 'Dinosaurs take care of themselves after birth.', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 4,
        feedback: `The correct answer is B. <b>The recent discovery of a dinosaur nest has provided evidence that dinosaur parents care for their young.</b>`,
    },
];

// Ito yung latest
const questionsGauge: {
    num: number,
    question: string,
    choices?: {
        label: string,
        answer: boolean,
        error: boolean,
        success: boolean,
        black: boolean,
    }[],
    hint?: string,
    identification?: {
        input: string,
        answer: string,
        opinion: boolean,
        error: boolean,
        success: boolean,
        black: boolean,
    },
    essay?: {
        black: boolean,
    },
    feedback?: string,
    type?: number,
    paper?: boolean,
}[]  = [
    // Start Random
    {
        question: `There is a lot to learn about plants people eat, such as how to grow them and how to prepare them for eating. Scientists can learn how to keep them safe to eat. Sometimes people who don’t know something can make a mistake. For example, some mushrooms are poisonous, and people need to know which those are so they don’t eat them. People need to know about plants in order to stay healthy.
                `,
        choices: [
            { label: 'Mushrooms are poisonous.', answer: false, success: false, error: false, black: false },
            { label: 'People eat plants.', answer: false, success: false, error: false, black: false },
            { label: 'People cook plants', answer: false, success: false, error: false, black: false },
            { label: 'People need to know about plants and food.', answer: true, success: false, error: false, black: false },
        ],
        type: 1,
        num: 1,
        hint: 'A.	Read each paragraph below, and then choose the most appropriate main idea.'
    },
    {
        question: `If you don’t know about foods and plants, you can make a big mistake. You need to know which plants are safe to eat. At one time, people feared the tomato, because they believed it to be poisonous. They thought it was dangerous because it grows on a vine that looks like a poisonous plant called nightshade. Therefore, in the early 1800s, people were afraid to eat it. It took several years before the tomato was accepted as a food. Today, it is a big part of the people’s diet. It's found in things like soup and ketchup.`,
        choices: [
            { label: 'Tomatoes grow on vines.', answer: false, success: false, error: false, black: false },
            { label: 'You need to know what foods to eat.', answer: false, success: false, error: false, black: false },
            { label: 'People thought tomatoes were poison.', answer: true, success: false, error: false, black: false },
            { label: 'Some people do not eat tomatoes.', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 2,
        hint: 'A.	Read each paragraph below, and then choose the most appropriate main idea.'
    },
    {
        question: `3.	It’s a salty world in which we live. There is salt in the ocean. There is salt in the earth. There is salt inside you – in your blood, in your sweat, and even in your tears. It’s a good thing too. Without salt, you couldn’t live.
                <br>The passage mainly tells…
        `,
        choices: [
            { label: 'How salty the world is', answer: true, success: false, error: false, black: false },
            { label: 'What salt is like', answer: false, success: false, error: false, black: false },
            { label: 'Why people use salt', answer: false, success: false, error: false, black: false },
            { label: 'What salt is for', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 3,
        hint: 'A.	Read each paragraph below, and then choose the most appropriate main idea.'
    },
    {
        question: `Often when it rains, a particular dreariness descends upon the earth. Many people hide out in their houses sending glance of forlorn out their windows. Animals scamper off to nooks and crannies, poking their heads out to timidity, and sniff the air for signs of dry weather. Despite the pellets of water cascading from the sky, an occasional brave soul will venture out for a jog in the drizzle or a bird will chirp merrily in a mud puddle dismissing the downpour. Some people call these adventurers crazy, but others celebrate the willingness of these individuals to embrace negativity and turn it into something positive. `,
        choices: [
            { label: 'People who get out and bathe in the rain are crazy.', answer: false, success: false, error: false, black: false },
            { label: 'While rain brings sadness to many, it gives delight to others.', answer: true, success: false, error: false, black: false },
            { label: 'Animals, like people, can both feel pleased and gloomy when it rains.', answer: false, success: false, error: false, black: false },
            { label: 'Crazy people embrace the negativity brought about by the rain and turn it into something positive. ', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 4,
        hint: 'A.	Read each paragraph below, and then choose the most appropriate main idea.'
    },
    {
        question: `Reality TV shows are every so often portrayed as unscripted, but they are actually heavily edited and manipulated to create drama and conflict. It is not at all reflective of many people’s experiences. Most reality shows are rigged and the contestants are told what to do. Producers often control the behavior of participants and create scenarios for them to react to. Additionally, many reality TV shows use actors or people with pre-existing relationships to create a more interesting storyline. Contestants are not given scripts but rather scripted events are thrown at them and their genuine reactions are captured. Drama naturally ensues when contestants with clashing personalities get together. Actual reality is boring, so all of the reality shows do what they can to create some drama and a lot of tension on their respective shows. `,
        choices: [
            { label: 'Reality television has become a chief vehicle for propaganda.', answer: false, success: false, error: false, black: false },
            { label: 'Reality shows are more dramatic than real life experiences of people.', answer: false, success: false, error: false, black: false },
            { label: 'Reality shows are not real; they are a product of the producer’s imagination. ', answer: false, success: false, error: false, black: false },
            { label: 'The events in reality TV shows are mostly controlled, scripted and aren’t real. ', answer: true, success: false, error: false, black: false },
        ],
        type: 1,
        num: 5,
        hint: 'A.	Read each paragraph below, and then choose the most appropriate main idea.'
    },
    {
        question: `Did you know that the Philippines does not have an officially recognized national hero? Jose Rizal, whom most Filipinos believe he is, has never been proclaimed a national hero. According to the National Commission for Culture and the Arts, there is no law, executive order, or proclamation that has been enacted or issued proclaiming any Filipino historical figure as a national hero. The position Rizal holds in Philippine history is attributed to the continued veneration or acclamation of the people in recognition of his contribution to the significant social transformation that took place in our country. Although the National Heroes Committee was created and mandated to study, evaluate and recommend Filipino heroes in recognition of their exceptional character and remarkable achievements for the country and recommended nine Filipino historical figures to be national heroes, no action has been taken on these recommendations. This was probably because this might trigger a flood of requests for proclamations. Another possibility is that the proclamations can trigger bitter debates involving historical controversies about the heroes.`,
        identification: {
            input: '',
            answer: 'The Philippines does not have an officially recognized national hero.',
            opinion: false,
            success: false, error: false, black: false
        },
        type: 2,
        num: 1,
        hint: 'B.	The main idea of each paragraph below is either stated or implied. If it is <b style="color: #4472C4">stated</b>, copy the sentence expressing the main idea on the line provided below the paragraph. If it is <b style="color: #7030A0">implied</b>, figure out the main idea and construct it in a complete sentence then write it on the line. '
    },
    {
        question: `Have you ever met a fellow Filipino who does not speak the same language as you even if you both live in the Philippines? How many languages can you identify are spoken in this country? Why is this so? One of the reasons that there are multiple languages in the Philippines is the physical isolation of about two thousand inhabited islands in the country. The Philippine islands are separated by water so people develop their own culture and languages. Also, the people of the Philippines were not united under one government during the early part of its history but were under many smaller governments called barangays. The people then had many different dialects, and they traded openly with people from other countries like China, India, Malaysia, Indonesia, Borneo, Sumatra, Japan, Thailand, Cambodia, and other islands in the area which heavily influenced their languages. Another reason is that the Spanish colonizers didn't want the Filipino groups to have a means of common communication so that it would be easier to prevent unity, to destabilize the society, and to create war if necessary. `,
        identification: {
            input: '',
            answer: 'There are several reasons why the Philippines has multiple languages.',
            opinion: true,
            success: false, error: false, black: false
        },
        type: 2,
        num: 2,
        hint: 'B.	The main idea of each paragraph below is either stated or implied. If it is <b style="color: #4472C4">stated</b>, copy the sentence expressing the main idea on the line provided below the paragraph. If it is <b style="color: #7030A0">implied</b>, figure out the main idea and construct it in a complete sentence then write it on the line. '
    },
    {
        question: `
            The Pros and Cons of Distant Education <br><br>
            How does it feel to attend classes without going to school and without being with your teachers and classmates in person? Distance education is not a new idea and practice. In the latter part of the nineteenth century, it was already established although it was initially laughed off. When radio and television were developed and invented, many people began to believe in the possibility of having the teacher and the learner in two different locations. In the 1900s, it started to become popular as a means of obtaining a degree, especially for students who could not afford to stay full-time in school. It also became a means of getting formal training in the basic education curriculum. Recently during the COVID pandemic, distance education became the sole means of learning at all levels, from pre-elementary to tertiary, although it has not been bereft of both advantages and disadvantages.<br>
            <br><b>Main Idea: _____________</b><br>
            <ul>
                <li>In the latter part of the nineteenth century, it was already established.</li>
                <li>When radio and television were invented, many believed in the possibility of having the teacher and the learner in two different locations. </li>
                <li>In the 1900s, it started to become popular as a means of obtaining a degree.</li>
                <li>Recently during the COVID pandemic, distance education became the sole means of learning at all levels.</li>
            </ul>
            `,
        choices: [
            { label: 'Distant education has been in practice for many years.', answer: true, success: false, error: false, black: false },
            { label: 'Distant education has its advantages and disadvantages.', answer: false, success: false, error: false, black: false },
            { label: 'Formal school training can be done through distance education.', answer: false, success: false, error: false, black: false },
            { label: 'Attending classes without seeing teachers and classmates in person is weird.', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 1,
        hint: 'C.	Identify the main idea or the missing detail in the items below. '
    },
    {
        question: `
            The Pros and Cons of Distant Education <br><br>
            Throughout the years of its implementation, distance education has proven numerous advantages. With the great flexibility offered by the different distance learning programs, many people have obtained degrees without having to leave their places of work as they can accomplish their requirements any time of the day as long as they have an internet connection. They can access learning materials online even in the middle of the night. They can attend classes in the comfort of their living rooms, beds, kitchens, or gardens. It is also cost-effective, eliminating other expenses associated with commuting, renting a school dormitory, or getting meal plans. As online education provides e-learning materials, video conferencing, and online tutorials to deliver knowledge to the learners, they have brought so much convenience to the learners.<br>
            <br><b>Main Idea: Distance education has proven numerous advantages.</b><br>
            <ul>
                <li>Many people have obtained degrees without having to leave their places of work.</li>
                <li>They can access learning materials online even in the middle of the night.</li>
                <li>_______________</li>
                <li>It eliminates other expenses associated with commuting, renting a school dormitory, or getting meal plans</li>
            </ul>
            `,
        choices: [
            { label: 'Online education provides e-learning materials.', answer: false, success: false, error: false, black: false },
            { label: 'It offers a wide variety of distance learning programs.', answer: false, success: false, error: false, black: false },
            { label: 'Students can attend classes in the comfort of their homes.', answer: true, success: false, error: false, black: false },
            { label: 'Learners can multitask while attending online classes like playing and cooking while studying.', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 2,
        hint: 'C.	Identify the main idea or the missing detail in the items below. '
    },
    {
        question: `
            The Pros and Cons of Distant Education <br><br>
            Be that as it may, distance education is not bereft of disadvantages. Brick-and-mortar institutions and in-person classes provide opportunities for learners to meet and interact with others on a personal level. This is something that distance learning cannot give; although learners can interact with classmates through chat rooms, emails, and discussion boards, they can never match the experiences the learners get in face-to-face interactions. The chances of being distracted when attending online classes are quite great as well. Unless a learner is self-motivated and has a great sense of focus, their tendency will always be leaning toward forgetting and being unable to meet requirements on time. Last but not least of the disadvantages is the fact that technology can be very complicated. Aside from investing in the necessary equipment and devices to obtain a sufficient amount of learning, one needs to subscribe to huge bandwidth of internet connection. In case of software malfunctions and technical glitches, learning can be completely stifled, thereby developing too much dependence on technology.<br>
            <br><b>Main Idea: Distance education has also a lot of disadvantages.</b><br>
            <ul>
                <li>Learners do not have the chance to meet and interact with others on a personal level.</li>
                <li>The chances of being distracted when attending online classes are quite great.</li>
                <li>One needs to subscribe to huge bandwidth of internet connection</li>
                <li>_______________</li>
            </ul>
            `,
        choices: [
            { label: 'Brick-and-mortar institutions became useless.', answer: false, success: false, error: false, black: false },
            { label: 'It develops too much dependence on technology.', answer: true, success: false, error: false, black: false },
            { label: 'Self-motivated and focused learners still meet their requirements.', answer: false, success: false, error: false, black: false },
            { label: 'It is a big investment as one needs to buy the necessary device for learning.', answer: false, success: false, error: false, black: false },
        ],
        type: 1,
        num: 3,
        hint: 'C.	Identify the main idea or the missing detail in the items below. '
    },
    {
        question: `
            Write in your piece of paper <br><br>
            <b>Main Idea: </b><br>
            Traits and characteristics of youth of the present generation

            <b>Details: </b><br>
            <ul>
                <li>youth today possess talent and potential.</li>
                <li>They are determined, ambitious, and brave; however, they can also be seen as impatient and impulsive</li>
                <li>Although they may seek the counsel of their elders from time to time, they don’t want to follow their wisdom on every step.</li>
                <li>eager to learn and explore new things.</li>
                <li>are influenced by Smart Phones, TV images, and Social Media.</li>
                <li>they are in charge of making changes that matter and maintaining cultures that positively impact our communities.</li>
                <li>have adapted to a fast paced, competitive and often frightening world.</li>
            </ul>
            `,
        paper: false,
        essay:{
            black: false,
        },
        type: 3,
        num: 1,
        hint: 'D.	Use the given main idea and supporting details below in developing a coherent paragraph. Be sure to use complete sentences; use transition words too if necessary. Observe correct use of language conventions too.'
    },
    {
        question: `
            You are one of the 6th-grade students who are given an invitation to write for Greenpeace Magazine, an international publication for environment and conservation. You are instructed to write a 150-word composition (1 or 2 paragraphs) about an endangered plant or animal species in your country, its description, where it is specifically found in your country, and how it became endangered.  Your work will be featured in the magazine during Earth month.  Write on the space below the draft of your paragraph composition.
            `,
        paper: false,
        essay:{
            black: false,
        },
        type: 3,
        num: 1,
        hint: 'E.'
    },
];

const addNavigation = (id: string,  label: string) =>{

    module.navigations[module.navigations.length-1].active = false

    module.navigations.push({
        label: label,
        id: id,
        active: true,
    })

    localStorage.setItem('module1', JSON.stringify(module))
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

            data.module1 = true;
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

    localStorage.setItem('module1', JSON.stringify(module))
}

onBeforeMount(() => {

    let storage = localStorage.getItem('module1');

    if(storage){
        let data: Module = JSON.parse(storage)

        module = reactive(data)
    }
    else{
        localStorage.setItem('module1', JSON.stringify(module))
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

    #test{
        font-size: 16px;
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

        #figure{
            margin-top: 3rem;
            margin-bottom: 3rem;
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

    
}
</style>