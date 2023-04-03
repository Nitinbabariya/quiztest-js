<script lang="ts">
    import type { Quiz } from '../quiz';
    import { beforeUpdate } from 'svelte';

    export let quiz: Quiz;
    let emojis = ['❌', '✅'];
    import { _ } from 'svelte-i18n';
    import Loading from './Loading.svelte';
    import { get } from 'svelte/store';

    let waitTime = 800;
    if (get(quiz.isEvaluated)) {
        // only wait longer for the first time
        waitTime = 300;
    }
    let points = 0;
    beforeUpdate(() => {
        points = quiz.evaluate();
        quiz.activateReviewMode()
    });

    function format(n: number) {
        return n.toLocaleString('en-US', {
            minimumIntegerDigits: 1,
        });
    }

    function formatPercentage(n: number) {
        return n.toLocaleString('en-US', {
            minimumIntegerDigits: 1,
            style: 'percent'
        });
    }

    function stringInterpolation(text:string,vars: object)
    {
        Object.keys(vars).map((k) => {
            const regex = new RegExp(`{{${k}}}`, "g");
            text = text.replace(regex, vars[k]);
        });
        return text;
    }
</script>
<div class="result">
<h3 style="color:#D80159"><i class="fa-shake fa fa-id-card-o" aria-hidden="true"></i>
    {$_('resultsTitle')}</h3>
<Loading ms="{waitTime}" minHeight="{150}">

        <div class="centerParent">
            <h1 class="center">
                {format(points)}/{format(quiz.questions.length)}
            </h1>
        </div>
        <p class="highlight-circle-sketch">{stringInterpolation( $_('resultsText'),{'percentage' : formatPercentage(points/quiz.questions.length)})}  </p>
        <hr/>


    <h3 style="color:#79455A">This is how you answered each of the questions</h3>
        <ol>
            {#each quiz.questions as question, i}
                <li class="top-list-item" on:click="{() => quiz.jump(i)}">
                    {$_('questionLetter')} {i+1} :
                        <span class="list-question">
                            {emojis[+question.solved]}
                            {@html question.text}
                        </span>
                    <ol>
                        <!-- answer comments when selected and available -->
                        {#each question.selected as selected}
                                <li class="list-comment">
                                    <i>{@html question.answers[selected]
                                            .html}</i>:
                                    {#if question.answers[selected].comment !== ''}
                                     {@html question.answers[selected].comment}
                                    {/if}
                                </li>
                        {/each}
                    </ol>
                </li>
            {/each}
        </ol>

    <h3 style="color:#D5407D">
        We recommend you to reflect on answers, please conduct a self review by browsing through the quizzes!
    </h3>
</Loading>
</div>

<style>
    ol {
        padding-left: 0;
        display: block;
    }

    .top-list-item {
        margin-bottom: 0.2rem;
        list-style-type: none;
        list-style: none;
    }

    .top-list-item:hover {
        cursor: pointer;
        background-color: var(--quiztest-color-secondary);
    }

    .top-list-item:hover .list-question {
        text-decoration: underline;
    }

    .list-comment {
        margin-left: 2em;
        list-style-type: initial;
        display: list-item;
    }

    .centerParent {
        text-align: center;
        align-content: space-around;
        align-items: baseline;
        justify-content: space-around;
    }
    .center {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border-color: #FF7A59;
        border-width: 2rem;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: space-around;
        color:#ffffff !important;
        background-image: linear-gradient(to top, #0250c5 0%, #d43f8d 100%);
    }

    .result
    {
        padding:1rem;
        background: linear-gradient(180deg, rgba(255,255,255,0) -8.81%, #fff 34.08%),linear-gradient(270deg, rgba(42,240,228,0.4) 0%, rgba(140,51,255,0.4) 37.5%, rgba(255,39,118,0.4) 68.75%, rgba(255,188,15,0.4) 100%),#fff;
    }


</style>
