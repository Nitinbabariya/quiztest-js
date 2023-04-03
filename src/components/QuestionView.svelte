<script lang="ts" xmlns="http://www.w3.org/1999/html">
    import type { QuestionType, BaseQuestion } from '../quiz';
    import type { SvelteComponent } from 'svelte';

    import SequenceView from './SequenceView.svelte';
    import ChoiceView from './ChoiceView.svelte';
    import { _ } from 'svelte-i18n';

    export let question: BaseQuestion;
    export let questionType: string;
    export let n: number;
    export let countOfQuestions: number;
    export let reviewModeActivated: boolean;

    // a mapping from quiz types to svelte components
    let componentMap: Record<QuestionType, typeof SvelteComponent> = {
        Sequence: SequenceView,
        MultipleChoice: ChoiceView,
        SingleChoice: ChoiceView,
    };


</script>
<h3 class="badge">{$_('questionLetter')} {n} {$_('outOf')} {countOfQuestions} <span class="qtype"> ({questionType})</span></h3>
<div style="border:1px solid #ddd;border-radius: 5px;margin-bottom: 0.5rem;padding:0.5em">
    {@html question.text}
    {#if question.explanation}
        <p>{@html question.explanation}</p>
    {/if}
</div>
<h3 class="badge">Options</h3>
<svelte:component
        this="{componentMap[question.questionType]}"
        question="{question}"
        reviewModeActivated="{reviewModeActivated}"
/>
<style>
    .badge{display:inline-block; font-weight: 400}
    .qtype {
        color:#566573;
        font-size: 0.7em;
    }
</style>