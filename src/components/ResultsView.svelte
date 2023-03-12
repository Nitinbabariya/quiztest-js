<script lang="ts">
    import type { Quiz } from '../quiz';
    import { beforeUpdate } from 'svelte';

    export let quiz: Quiz;
    let emojis = ['❌', '✅'];
    import { _ } from 'svelte-i18n';
    import { fade } from 'svelte/transition';
    import Icon from './Icon.svelte';
    import Loading from './Loading.svelte';
    import { get } from 'svelte/store';

    let waitTime = 800;
    if (get(quiz.isEvaluated)) {
        // only wait longer for the first time
        waitTime = 300;
    }
    let points = 0;
    let percentage=0;
    let message=0;
    beforeUpdate(() => {
        points = quiz.evaluate();
        quiz.activateReviewMode()
        percentage = points/quiz.questions.length * 100;
    });

    function format(n: number) {
        return n.toLocaleString('en-US', {
            minimumIntegerDigits: 1,
        });
    }
    function stringInterpolation(text,vars)
    {
        Object.keys(vars).map((k) => {
            const regex = new RegExp(`{{${k}}}`, "g");
            text = text.replace(regex, vars[k]);
        });
        return text;
    }
</script>

<h3><i class="fa-shake fa fa-id-card-o" aria-hidden="true"></i>
    {$_('resultsTitle')}</h3>
<Loading ms="{waitTime}" minHeight="{150}">
    <div in:fade="{{ duration: 1000 }}">
        <div class="centerParent">
            <h1 class="center">
                {format(points)}/{format(quiz.questions.length)}
            </h1>
        </div>
        <h3 class="highlight-circle-sketch">{stringInterpolation( $_('resultsText'),{'percentage' : format(percentage)})}  </h3>
        <hr/>
        <div>This is how you answered each of the questions</div>
        <ol>
            {#each quiz.questions as question, i}
                <li class="top-list-item" on:click="{() => quiz.jump(i)}">
                    <span class="list-question">
                        {emojis[+question.solved]}
                        {@html question.text}
                    </span>
                    <ol>
                        <!-- answer comments when selected and available -->
                        {#each question.selected as selected}
                            {#if question.answers[selected].comment !== ''}
                                <li class="list-comment">
                                    <i>{@html question.answers[selected]
                                            .html}</i>:
                                    {@html question.answers[selected].comment}
                                </li>
                            {/if}
                        {/each}
                    </ol>
                </li>
            {/each}
        </ol>
    </div>
</Loading>

<style>
    ol {
        padding-left: 0;
        display: inline-block;
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

        background-image: linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%);
    }


</style>
