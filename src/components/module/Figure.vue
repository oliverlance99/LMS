<template>
    <div id="figure">
        <h3>Figure It Out</h3>

        <div v-if="props.module == 1">
            <p>
                <strong>A. The Main Idea</strong>
            </p>
            
            <p class="main-text">
                The main idea of a paragraph is the main point, the gist of a piece of writing, the point of the article, or what the author is trying to tell the reader. It does not include the specific details. It gives the all-encompassing summary of the paragraph.
            </p>
        
            <p class="main-text">
                The main idea is more specific than the topic. Unlike the topic which is usually a word or a short phrase, the main idea is usually written as a full sentence.
            </p>

            <p class="main-text">
                The main idea can be stated or implied.
            </p>

            <p class="text-types">
                A <strong><em>stated main idea</em></strong> is expressed directly in the topic sentence which is found most often in the beginning of the paragraph, sometimes at the end, and rarely in the middle.
            </p>
            <p class="text-types">
                An <strong><em>implied main idea</em></strong> is not directly stated in the paragraph or article, but it is strongly suggested or inferred. The reader needs to read between the lines in order to figure it out. Because it can be daunting at times to identify a main idea that is implied, here are some techniques that may be used to figure out an implied main idea.
            </p>

            <div class="sub-text">
                <p>&#10146; Find the topic.</p>
                <p>&#10146; Sharpen the focus of the topic; look at where the details are pointing you.</p>
                <p>&#10146; Ask yourself, "What is the author really trying to say here?"</p>
                <p>&#10146; Use your background knowledge about the topic to help you figure out what the author is trying to get across.</p>
                <p>&#10146; Limit the focus of the topic, and write out the main idea in a full sentence. Make sure it is broad enough to encompass the entire piece, but focused enough to be about what the author is trying to get across.</p>
            </div>

            <p class="main-text">
                In a multi-paragraph article, the main idea is expressed in the thesis statement, which is then supported by individual smaller points.
            </p>

            <br>

            <p>
                <strong>B. The Supporting Details</strong>
            </p>

            
            <p class="main-text">
                Supporting details are reasons, examples, facts, steps, or other kinds of evidence that explain the main idea. Major details explain and develop the main idea. Minor details help make the major details clear. They come in later sentences or paragraphs and add some distinctions and context; the main idea will need these details to support its statement.
            </p>
        </div>

        <div v-else-if="props.module == 2">
            
            <p>
                <strong>A.  Inference</strong>
            </p>
            
            <p class="main-text">
                Inference is a conclusion that has been reached by way of evidence and reasoning. We figure things out by applying our own knowledge and experience to the situation at hand. While inferring, the information available in the text is used to make informed guesses about what is not yet known. It is a guess that a reader makes by combining details from a text and personal knowledge. A reader makes an inference about what is happening.
            </p>
            
            <p>
                <strong>B.  Conclusion</strong>
            </p>

            <p class="main-text">
                A conclusion is a judgment about what something means based on facts and details.
            </p>

            <p>
                <strong>C.  Prediction</strong>
            </p>

            <p class="main-text">
                A prediction is a reasonable or logical guess about what might happen next in a story. This reading strategy encourages students to use details and clues from the text to anticipate what happens next in the story. This prompts them to actively think ahead while reading to help them better comprehend the text.
            </p>
        </div>

        <div v-else-if="props.module == 3">
            
            <p>
                <strong>A.  Cause-Effect Relationship</strong>
            </p>
            
            <p class="main-text">
                Cause-effect is a relationship between events or ideas in which one makes the other happen. Understanding the relationship between cause and effect is a vital critical thinking skill used in all aspects of life.
            </p>

            <p class="main-text">
                A cause is a stimulus, a motive, a means, or an action that brings about a reaction/s. It instigates an effect.
            </p>

            <p class="main-text">
                An effect is a condition, occurrence, or result generated by one or more causes. Effects are outcomes.
            </p>

            <p class="main-text">
                There can be no effect without a cause, nor can there be a cause without an effect.
            </p>
            
            <p>
                <strong>B.  Signal Words and Phrases Showing Cause-Effect Relationship</strong>
            </p>


            <div style="display: flex; padding-left: 3rem; padding-top: 2rem; padding-bottom: 2rem;">
                <div style="padding: .5rem; border: 1px solid black; margin-right: 1.5rem; max-width: 250px;">
                    <p>The following expressions are used TO INTRODUCE THE CAUSE:</p>
    
                    <ul>
                        <li>as</li>
                        <li>if</li>
                        <li>for</li>
                        <li>since</li>
                        <li>due to </li>
                        <li>cause</li>
                        <li>because</li>
                        <li>because of</li>
                        <li>owing to</li>
                        <li>for the reason that</li>
                        <li>as a result of</li>
                        <li>resulted from</li>
                        <li>effect of</li>
                    </ul>
                </div>

                <div style="padding: .5rem; border: 1px solid black; margin-right: 1.5rem;  max-width: 250px;" >
                    <p>The following expressions are used TO INTRODUCE THE EFFECT:</p>
    
                    <ul>
                        <li>as</li>
                        <li>if</li>
                        <li>for</li>
                        <li>since</li>
                        <li>due to </li>
                        <li>cause</li>
                        <li>because</li>
                        <li>because of</li>
                        <li>owing to</li>
                        <li>for the reason that</li>
                        <li>as a result of</li>
                        <li>resulted from</li>
                        <li>effect of</li>
                    </ul>
                </div>
            </div>

            <p>
                <strong>The Cause-Effect Patterns</strong>  
            </p>
            
            <div>
                <p class="sub-text">
                    1.  <ins>“Multiple Causes, One Effect” Pattern</ins>
                    This pattern is used in developing a paragraph with one effect and three or more causes. In this structure, the effect is stated first in the main idea while the causes are placed in the supporting details or statements.
                </p>

                <img width="500" src="/MulCause.png" alt="Multiple Causes, One Effect">
            </div>

            <div>
                <p class="sub-text">
                    2.  <ins>“One Cause, Multiple Effects” Pattern</ins>
                    This pattern is used in an essay or paragraph with one cause leading to multiple effects. The cause becomes part of the thesis statement or main idea, and the effects are clearly stated and described in detail. To organize an essay this way, the major effects are further explained and supported with the minor effects or some examples to add clarity to the text.
                </p>

                <img width="500" src="/OneCause.png" alt="One Cause, Multiple Effects">
            </div>

            <div>
                <p class="sub-text">
                    3.  <ins>Causal Chain or Domino Pattern</ins>
                    In a composition developed through this pattern, the details of the text are begun with the description of a cause and its effect. The effect then becomes a cause of another event and so on such that it looks like a chain of cause and effect. Similar to the other patterns, additional details, examples or descriptions may be given to add meaning and definition to the writing.
                </p>

                <img class="cause-chain" src="/CausalChain.jpg" alt="Causal Chain or Domino Pattern">
            </div>

            <p class="main-text">
                A conclusion is a judgment about what something means based on facts and details.
            </p>

            <p>
                <strong>C.  Prediction</strong>
            </p>

            <p class="main-text">
                A prediction is a reasonable or logical guess about what might happen next in a story. This reading strategy encourages students to use details and clues from the text to anticipate what happens next in the story. This prompts them to actively think ahead while reading to help them better comprehend the text.
            </p>
        </div>

        <div v-else-if="props.module == 4">
            <p>
                COMPARISON AND CONTRAST
            </p>
            
            <p class="main-text">
                The ability to compare and contrast has its uses far beyond the classroom. With practical applications in everything from choosing which clothes to pack for a holiday or what books to read during your free time, comparing and contrasting are requirements for much of our everyday decision-making. However, when we discuss these terms in relation to reading skills, they have much more specific meanings.
            </p>

            <p class="main-text">
                <strong>Comparison and Contrast</strong> in reading is identifying the similarities and/or differences between two subjects. While comparing is the enumeration of similar features or characteristics, contrasting is the giving of conflicting or opposite descriptions. Exposure to various texts along with discussion is the best way to use this strategy to improve comprehension. 
            </p>

            <p class="main-text">
                Developing a skill on comparative thinking helps us focus closely on the details in a text while improving our comprehension in the process. As a result, we enable ourselves to better retain the information we are reading. Likewise, this helps us understand how to organize information, think more clearly, and express ideas more effectively in their own writing.
            </p>

            <p class="main-text">
                Comparing is the giving of ideas, 
            </p>

            <p class="main-text">
                A comparison and contrast text usually uses signal words.  
            </p>

            <p class="main-text">
                When enumerating similarities, the following signal words are used:
            </p>

            <div style="min-width: 300px; padding: .5rem; display: flex; justify-content: space-evenly;">
                <div>
                    <p><b>also</b></p>
                    <p><b>in the same way</b></p>
                    <p><b>same</b></p>
                    <p><b>as</b></p>
                </div>
                <div>
                    <p><b>similarly	</b></p>
                    <p><b>like		</b></p>
                    <p><b>too		</b></p>
                    <p><b>the same as</b></p>
                </div>
                <div>
                    <p><b>likewise</b></p>
                    <p><b>both</b></p>
                    <p><b>alike</b></p>
                    <p><b>similar</b></p>
                </div>
            </div>

            <p class="main-text">
                To show the differences, the following signal words are often used: 
            </p>

            <p class="main-text">
                Sorting out similarities and differences are helpful in understanding a text. Keywords and phrases may be used to determine the similarities and difference between two or more things. 
            </p>

            <p class="main-text">
                A Venn diagram and other similar graphic organizers can be used to better understand a text of comparison and contrast. 
            </p>

        </div>

        <div v-else-if="props.module == 5">
             
            <p class="main-text">
                <strong>Problem and Solution</strong> is a method of organizing a written text or a paragraph where information is expressed as an alarming issue (a problem) and something that should be done to remedy this problem (solution or attempted solution). In other words, it identifies a problem or problems and recommends a plausible solution(s).
            </p>
            
            <p class="main-text">
                The problem and solution text structure can be moderately difficult to identify because it is frequently confused with the cause and effect pattern of organization, as they both have relational structures; however, if you read the passage and look specifically for both a problem and a solution to the problem, you should find it rather easy to distinguish from cause and effect, as cause and effect passages do not propose solutions to any negative occurrences within the passage but rather just explain the reason/s or the effect/s of an occurrence.
            </p>

            <p class="main-text">
                Signal Words Commonly Used in Problem-Solution Structure
            </p>

            <div style="min-width: 300px; padding: .5rem; display: flex; justify-content: space-evenly;">
                <div>
                    <p><b>problem</b></p>
                    <p><b>to resolve</b></p>
                </div>
                <div>
                    <p><b>issue</b></p>
                    <p><b>to address this</b></p>
                </div>
                <div>
                    <p><b>dilemma</b></p>
                    <p><b>remedy</b></p>
                </div>
                <div>
                    <p><b>challenges</b></p>
                </div>
            </div>

            <p class="main-text">
                A problem-solution paragraph 
            </p>

            <p class="main-text">
                This method of internal organization splits the paragraph, or paragraph block, into four easily-recognizable parts:
            </p>

            <div class="sub-text">
                <p>&#10146; Use a topic sentence to explore the paragraph's main idea, or claim (the problem that will be explored).</p>
                <p>&#10146; Provide a description of the problem for the reader.<br> The description of the problem may be presented through examples or evidence of the existence of the problem. At other times, causes and effects of the problem may be given before solution or solutions are proposed.</p>
                <p>&#10146; Provide a description of the solution(s) for the reader.<br> This should explain the efficiency and/or effectiveness of each of the solutions. In this section you may also wish to arrive at a conclusion as to why one solution may be better than another solution.</p>
                <p>&#10146; Include a concluding sentence to describe whether all solutions are applicable or whether one solution is better than the others.</p>
            </div>

            <p class="main-text">
                Example:
            </p>

            <p class="main-text" style="text-align: center;">
                Effect of Climate change on global food security
            </p>

            <p class="sub-text" style="text-align: center;">
                Climate change is altering weather patterns, making events such as droughts and floods more severe and frequent. These events can have a significant impact on global food production resulting in crop failure, livestock mortality and food shortages. One possible solution to this problem is to practice climate-friendly agriculture practices. These practices will help farmers adapt to changing weather patterns and also help reduce greenhouse gas emissions. Crop rotation, intercropping, agroforestry, and the use of drought-resistant crops are examples of such techniques.
            </p>

            <br>
            <br>

            <table>
                <tr>
                    <th class="left">Problem</th>
                    <th class="right">Solution</th>
                </tr>
                <tr>
                    <td class="left">Due to climate change, the weather is changing and therefore has a lot of impact on global food production.</td>
                    <td class="right">Practice climate-friendly agriculture practices.</td>
                </tr>
            </table>
        </div>

        <div v-else-if="props.module == 6">
            <p style="margin-top: 2rem;">
                <strong>FACT</strong>
            </p>
            
            <p class="main-text"  style="max-width: 800px; margin-right: auto;">
                A statement of <b>fact</b> expresses and idea that can be proven or verified true or false based on evidence. It is not debatable. The proofs of evidence can be found in the following:
            </p>

            <div class="sub-text" style="max-width: 800px; margin-right: auto;">
                <p>&nbsp; &nbsp; &nbsp; &#10146; Official or legal documents (birth certificate, marriage certificate, power of attorney, witness statement…)</p>
                <p>&nbsp; &nbsp; &nbsp; &#10146; Photographs and Videos</p>
                <p>&nbsp; &nbsp; &nbsp; &#10146; Data</p>
                <p>&nbsp; &nbsp; &nbsp; &#10146; Observation</p>
                <p>&nbsp; &nbsp; &nbsp; &#10146; Research</p>
                <p>&nbsp; &nbsp; &nbsp; &#10146; Studies</p>
                <p>&nbsp; &nbsp; &nbsp; &#10146; Reports</p>
                <p>&nbsp; &nbsp; &nbsp; &#10146; Statistics</p>
                <p>&nbsp; &nbsp; &nbsp; &#10146; Eyewitnesses</p>
            </div>
            
            <p class="main-text">
                Examples:
            </p>

            <div class="sub-text">
                <p>&nbsp; &nbsp; &nbsp; &#10146;Humans belong to the animal kingdom.</p>
                <p>&nbsp; &nbsp; &nbsp; &#10146;Africa is the continent with the most countries</p>
                <p>&nbsp; &nbsp; &nbsp; &#10146;Greenland, however, belongs to Denmark, a country in Europe.</p>
                <p>&nbsp; &nbsp; &nbsp; &#10146;There are no major roads in Greenland; travel between towns is done by plane, boat, helicopter, snowmobile or dogsled.</p>
            </div>

            <p style="margin-top: 2rem;">
                <strong>OPINION</strong>
            </p>

            <p class="main-text">
                An <strong>opinion</strong>, unlike fact, is neither true nor false. It expresses a belief, attitude, value, judgment, or feeling; it is subjective.
            </p>

            <p class="main-text">
                An <strong>opinion</strong> may also be a statement of a prediction or conclusion which is based on evidence. It is called an “informed opinion”; it remains an opinion. 
            </p>

            <p class="main-text">
                A descriptive adjective or qualitative word as part of the key words in a statement makes it an <strong>opinion</strong>. 
            </p>

            <p class="main-text">
                Examples:
            </p>

            <div class="sub-text">
                <p>Dogs are a man's best friends.</p>
                <p>Marikina is the cleanest city in Metro Manila.</p>
                <p>World War II was a terrible war.</p>
            </div>
        </div>
    
        <Button v-show="showBtn" @click="$emit('closeButton', onButtonClose() )" color="blue" label="Proceed" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from '@/components/Button.vue';

interface Figure{
    module: number
    done: boolean
}

const props = withDefaults( defineProps<Figure>(), {

})

let showBtn = ref(!props.done)

const onButtonClose = () =>{
    showBtn.value = false;

    return 1;
}
</script>

<style scoped lang="scss">
table{
    border-collapse: collapse;
    display: flex;
    justify-content: center;

    td, th {
        text-align: center;
        border: 1px solid #979797;
        padding: 8px;
    }

    td{
        max-width: 500px;
    }

    .left{
        background-color: #FFE599;
    }
    .right{
        background-color: #C5E0B3;
    }
}
</style>