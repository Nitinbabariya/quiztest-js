<script lang="ts">
    import type { Quiz } from './quiz';
    import ProgressBar from './components/ProgressBar.svelte';
    import { onMount } from 'svelte';
    import registerLanguages from './languages/i18n';
    import Card from './components/Card.svelte';
    import SmoothResize from './components/SmoothResize.svelte';
    import QuestionView from './components/QuestionView.svelte';
    import Button from './components/Button.svelte';
    import { _ } from 'svelte-i18n';
    import ResultsView from './components/ResultsView.svelte';
    import Animated from './components/Animated.svelte';
    import registerIcons from './registerIcons.js';
    import Icon from './components/Icon.svelte';
    import Hint from './components/Hint.svelte';

    import Container from './components/Container.svelte';
    import Loading from './components/Loading.svelte';
    import Timer from './components/Timer.svelte';
    import Dialog from './components/Dialog.svelte';
    let dialog
    let timer;
    export let quiz: Quiz;
    // https://github.com/sveltejs/svelte/issues/4079
    $: question = quiz.active;
    $: showHint = $question.showHint;
    $: index = quiz.index;
    $: onLast = quiz.onLast;
    $: onFirst = quiz.onFirst;
    $: onResults = quiz.onResults;
    $: isEvaluated = quiz.isEvaluated;
    $: allVisited = quiz.allVisited;


    registerLanguages(quiz.config.locale);
    registerIcons();

    let node: HTMLElement;
    let minHeight = 150;
    let reloaded = false;

    let props;

    onMount(async () => {
        let primaryColor: string = quiz.config.primaryColor;
        let secondaryColor: string = quiz.config.secondaryColor;
        let textColor: string = quiz.config.textColor;

        node.style.setProperty('--quiztest-color-primary', primaryColor);
        node.style.setProperty('--quiztest-color-secondary', secondaryColor);
        node.style.setProperty('--quiztest-color-text', textColor);
        node.style.minHeight = `${minHeight}px`;

        dialog.showModal();
    });

    let triggerTimer;

    function onCloseDialog() {
        triggerTimer(true);
        dialog.close();
    }
</script>
<div class="quiztest-content" bind:this="{node}">
    <Card>
            <Dialog bind:dialog on:close={onCloseDialog}>
                {#if quiz.config.introduction}
                    {@html quiz.config.introduction}
                {/if}
                <p>
                    <button class="button-68" on:click={onCloseDialog}> Start the quiz 🚀</button>
                </p>
            </Dialog>

        <Loading update="{reloaded}" ms="{800}" minHeight="{minHeight}">
            <Container>
                <SmoothResize minHeight="{minHeight}">

                    <div class="pagination" style=";width:100%">
                        {#each quiz.questions as q, i}
                            <button  on:click="{() => quiz.jump(i)}" class="{$index === i ? 'active' : ''}">{i+1} </button>
                        {/each}


                        {#if !quiz.isReviewModeActivated()}
                            <Timer bind:trigger={triggerTimer}></Timer>
                        {/if}
                    </div>
                    <Animated update="{$index}">
                        {#if $onResults}
                            <ResultsView quiz="{quiz}" />
                        {:else}
                            {#if quiz.isReviewModeActivated()}
                                <div style="border-radius:0.5rem; margin:1rem;padding:1rem;" class="gradient-background">
                                    Please keep it calm and review your answers. To practice the quiz once again please restart the test.
                                    <button style="margin-right: 1rem" title="{$_('reset')}" class="button-68"
                                        on:click="{() => {
                                            reloaded=!reloaded
                                            quiz.reset();
                                            triggerTimer(true);
                                        }}"><Icon name="redo" /> Restart</button>
                                </div>
                            {/if}

                            <QuestionView
                                    question="{$question}"
                                    n="{$index + 1}"
                                    questionType="{$question.questionType}"
                                    countOfQuestions="{quiz.questions.length}"
                                    reviewModeActivated="{quiz.isReviewModeActivated()}"
                                />


                            <Hint hint="{$question.hint}" show="{$showHint || ($question.hint.length && quiz.isReviewModeActivated())}" />
                            <div class="pagination" style="margin-top:10px">
                                <button class="active" on:click="{() => quiz.next()}"> Next</button>
                                <button on:click="{$question.enableHint}" title="Hint" class="hint" disabled="{!$question.hint || $showHint || $onResults}"><Icon name="lightbulb" solid="{false}" /></button>
                                <button title="{$_('evaluate')}"
                                        on:click="{() => quiz.jump(quiz.questions.length)}"><Icon name="check-double" size="sm" />End Test</button>
                            </div>
                            {#if !$onResults}
                                <ProgressBar value="{$index}" max="{quiz.questions.length - 1}" />
                            {/if}

                        {/if}
                    </Animated>
                </SmoothResize>
                <!-- <Modal show="{showModal}">Are you sure?</Modal> -->
            </Container>
        </Loading>
    </Card>
</div>

<!-- global styles applied to all elements in the app -->
<style type="text/scss" global>
    @import 'highlight.js/styles/github';
    @import 'katex/dist/katex';
    @import '@fortawesome/fontawesome-svg-core/styles';

    hr { border: 0; border-top: 1px solid #dee2e6; }

    img {
        max-height: 400px;
        border-radius: 4px;
        max-width: 100%;
        height: auto;
    }

    code {
        font-size: 85%;
        color: #333;
        white-space: pre-wrap;
        border-radius: 4px;
        padding: 0.2em 0.4em;
        background-color: #f8f8f8;
        font-family: Consolas, Monaco, monospace;
    }

    a {
        color: var(--quiztest-color-primary);
    }

    .pagination button {
        padding: 0.5rem 1rem;
        border-radius: 4px;
        border: 1px solid #f6f7f0;
        line-height: 1;
        text-align: center;
        display: inline-block;
        cursor: pointer;
        margin-bottom: 5px;
    }

    .pagination button.active {
        background-color: #4CAF50;
        color: white;
        border: 1px solid #4CAF50;
    }

   .button-68 {
       appearance: none;
       backface-visibility: hidden;
       background-color: #27ae60;
       border-radius: 8px;
       border-style: none;
       box-shadow: rgba(39, 174, 96, .15) 0 4px 9px;
       box-sizing: border-box;
       color: #fff;
       cursor: pointer;
       display: inline-block;
       font-size: 16px;
       font-weight: 600;
       outline: none;
       overflow: hidden;
       position: relative;
       text-align: center;
       text-decoration: none;
       transform: translate3d(0, 0, 0);
       transition: all .3s;
       user-select: none;
       -webkit-user-select: none;
       touch-action: manipulation;
       vertical-align: top;
       white-space: nowrap;
       padding: 1em;
   }

    .button-68:hover {
        background-color: #1e8449;
    }

    .button-68:hover {
        box-shadow: rgba(39, 174, 96, .2) 0 6px 12px;
    }

    .gradient-background {
        background: linear-gradient(37deg,#a18ef3,#fcd15f,#7cf5d9,#60d3ff);
        background-size: 240% 240%;
        animation: gradient-animation 32s ease infinite;
    }

    @keyframes gradient-animation {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    button:hover:not(:checked):not(:active):not(:disabled) {
        background-color: #4CAF50;
        color: white;
        border: 1px solid #4CAF50;
    }
</style>
