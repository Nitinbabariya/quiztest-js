<script lang="ts" xmlns="http://www.w3.org/1999/html">
    import type { QuestionType, BaseQuestion } from '../quiz';
    import type { SvelteComponent } from 'svelte';

    import SequenceView from './SequenceView.svelte';
    import ChoiceView from './ChoiceView.svelte';
    import { _ } from 'svelte-i18n';

    export let question: BaseQuestion;
    export let questionType: string;
    export let n: number;
    export let counfOfQuestions: number;

    // a mapping from quiz types to svelte components
    let componentMap: Record<QuestionType, typeof SvelteComponent> = {
        Sequence: SequenceView,
        MultipleChoice: ChoiceView,
        SingleChoice: ChoiceView,
    };
</script>
<h3 class="badge"> {$_('questionLetter')} {n} {$_('outOf')} {counfOfQuestions} : </h3> <span class="qtype"> It's a {questionType} question</span>
<br/>
{@html question.text}
<br/>
{#if question.explanation}
    <p>{@html question.explanation}</p>
{/if}

<svelte:component
        this="{componentMap[question.questionType]}"
        question="{question}"
/>
<style>
    .badge{display:inline-block;font-weight: 400}
    .qtype {
        color:#566573;
        font-size: 0.8em;
        text-space: 10px !important;
    }

    .highlight-simple{
        background-color:yellow;
        padding:0.1em 0.2em;
    }

    .highlight-ribbon{
        position:relative;
        margin:0.1em;
    }
    .highlight-ribbon:before{
        content:"";
        z-index:-1;
        left:-0.5em;
        top:0.1em;
        border-width:0.5em;
        border-style:solid;
        border-color:lightgreen;
        position:absolute;
        width:100%;
        border-left-color:transparent;
        border-right-color:transparent;
    }

    .highlight-arrow{
        position:relative;
        margin:0 0.5em;
        padding:0 0.2em;
    }
    .highlight-arrow:before{
        content:"";
        z-index:-1;
        left:-0.5em;
        top:0.1em;
        border-width:0.5em;
        border-style:solid;
        border-color:orange;
        position:absolute;
        width:calc(100% - 0.5em);
        border-left-color:transparent;
    }

    .highlight-arrow-highlight:after{
        content:"";
        z-index:-1;
        right:0;
        top:0.1em;
        border-width:0.5em;
        border-style:solid;
        border-color:orange;
        position:absolute;
        border-top-color:transparent;
        border-bottom-color:transparent;
        border-left-color:transparent;
        transform:rotate(180deg);
        transform-origin:center right;
    }

    .highlight-border{
        border:2px dashed red;
        padding:0.03em 0.25em;
    }

    .highlight-sketch{
        position:relative;
    }

    .highlight-sketch:before{
        content:"";
        z-index:-1;
        left:0em;
        top:0em;
        border-width:2px;
        border-style:solid;
        border-color:darkblue;
        position:absolute;
        border-right-color:transparent;
        width:100%;
        height:1em;
        transform:rotate(2deg);
        opacity:0.5;
        border-radius:0.25em;
    }

    .highlight-sketch:after{
        content:"";
        z-index:-1;
        left:0em;
        top:0em;
        border-width:2px;
        border-style:solid;
        border-color:darkblue;
        border-left-color:transparent;
        border-top-color:transparent;
        position:absolute;
        width:100%;
        height:1em;
        transform:rotate(-1deg);
        opacity:0.5;
        border-radius:0.25em;
    }


    .highlight-circle-sketch{
        position:relative;
    }

    .highlight-circle-sketch:before{
        content:"";
        z-index:-1;
        left:-0.5em;
        top:-0.1em;
        border-width:2px;
        border-style:solid;
        border-color:red;
        position:absolute;
        border-right-color:transparent;
        width:100%;
        height:1em;
        transform:rotate(2deg);
        opacity:0.7;
        border-radius:50%;
        padding:0.1em 0.25em;
    }

    .highlight-circle-sketch:after{
        content:"";
        z-index:-1;
        left:-0.5em;
        top:0.1em;
        padding:0.1em 0.25em;
        border-width:2px;
        border-style:solid;
        border-color:red;
        border-left-color:transparent;
        border-top-color:transparent;
        position:absolute;
        width:100%;
        height:1em;
        transform:rotate(-1deg);
        opacity:0.7;
        border-radius:50%;
    }



    .highlight-realistic-marker{
        position:relative;
    }

    .highlight-realistic-marker:before{
        content:"";
        background-color:#ff6db7;
        width:100%;
        height:1em;
        position:absolute;
        z-index:-1;
        filter:url(#marker-shape);
        left:-0.25em;
        top:0.1em;
        padding:0 0.25em;
    }

</style>