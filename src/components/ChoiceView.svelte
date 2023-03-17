<script lang="ts">
    import type { BaseQuestion } from '../quiz';
    export let question: BaseQuestion;
    export let reviewModeActivated: boolean;
</script>
    {#if question.questionType === 'MultipleChoice'}
        {#each question.answers as answer, i}
            <label>
                <input
                    type="checkbox"
                    bind:group="{question.selected}"
                    value="{i}"
                    disabled="{reviewModeActivated}"
                />
                <span>{@html answer.html}
                    {#if reviewModeActivated}
                        {#if answer.correct && question.selected.includes(i)}
                            <span class="reviewAnswer givenAnswerIsCorrect">
                               ✔️ Your answer
                            </span>
                        {:else if question.selected.includes(i)}
                            <span class="reviewAnswer givenAnswerIsInCorrect">
                                ❌ Your answer
                            </span>

                        {:else if answer.correct}
                             <span class="reviewAnswer correctAnswer">
                                Correct answer
                            </span>
                        {/if}
                    {/if}
                </span>
            </label>
        {/each}
    {:else}
        {#each question.answers as answer, i}
            <label>
                <input
                    type="radio"
                    bind:group="{question.selected[0]}"
                    value="{i}"
                    disabled="{reviewModeActivated}"
                />

                <span>{@html answer.html}

                    {#if reviewModeActivated}
                        {#if answer.correct && question.selected.includes(i)}
                            <span class="reviewAnswer givenAnswerIsCorrect">
                                ✔️ Your answer
                            </span>
                        {:else if question.selected.includes(i)}
                            <span class="reviewAnswer givenAnswerIsInCorrect">
                                ❌ Your answer
                            </span>

                        {:else if answer.correct}
                             <span class="reviewAnswer correctAnswer">
                                💡Correct answer
                            </span>
                        {/if}
                    {/if}
                </span>
            </label>
        {/each}
    {/if}


<style>
    .reviewAnswer{
        position: absolute;
        right: 10px;
        top:10px;
        padding:0 1em 0 1em;
        border-radius: 5px;
        border-style: solid;
    }
    .givenAnswerIsCorrect{
        background-color: #27ae60 !important;
        color:#fff;
        border-color:#27ae60;
    }

    .givenAnswerIsInCorrect{
        background-color: #D73D3D !important;
        border-color: #D73D3D;
    }

    .correctAnswer{
        background-color: #F9F8ED !important;
        border-color: #F0E552;
        color:#2C3E50;
    }


    [type='radio'] {
        position: fixed;
        opacity: 0;
    }

    [type='radio']:hover + span,
    [type='radio']:focus + span {
        filter: brightness(0.9);
    }

    [type='radio']:checked + span {
        background-color: #ddd;
    }

    label input[type='radio']:checked + span {
        background-color: #d6d6e5;
    }
    label input[type='radio']:checked + span:before {
        box-shadow: inset 0 0 0 0.4375em #2196F3;
    }

    label span {
        display: flex;
        transition: 0.25s ease;
        position:relative;
    }
    label span:hover {
        background-color: #d6d6e5;
    }
    label [type='radio']+span:before {
        display: flex;
        flex-shrink: 0;
        content: "";
        background-color: #fff;
        width: 1.3em;
        height: 1.3em;
        border-radius: 50%;
        margin-right: 0.375em;
        transition: 0.25s ease;
        box-shadow: inset 0 0 0 0.14375em #fff;
    }


    /**/
    [type='checkbox']{
        position: fixed;
        opacity: 0;
        /* Add if not using autoprefixer */
        -webkit-appearance: none;
        /* Remove most all native input styles */
        appearance: none;
        /* For iOS < 15 */
        background-color: var(--form-background);
        /* Not removed via appearance */

        font: inherit;
        width: 1.15em;
        height: 1.15em;
        border: 0.15em solid currentColor;
        border-radius: 0.15em;
        transform: translateY(-0.075em);
        display: grid;
        place-content: center;
    }
    input[type="checkbox"]:checked::before {
        transform: scale(1);
    }

    input[type="checkbox"]::before {
        content: "";
        width: 0.65em;
        height: 0.65em;
        clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
        transform: scale(0);
        transform-origin: bottom left;
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em var(--form-control-color);
        /* Windows High Contrast Mode */
        background-color: CanvasText;
    }

    [type='checkbox'] + span,
    [type='radio'] + span {
        transition-duration: 0.3s;
        background-color: #E7E9EB;
        color: var(--quiztest-color-text);
        padding: 0.5rem;
        margin:1px 0 1px 0;
        border: 3px solid transparent;
        cursor: pointer;
    }

    [type='checkbox']:hover + span,
    [type='checkbox']:focus + span,
    [type='radio']:hover + span,
    [type='radio']:focus + span {
        background-color: #ddd;
    }

    [type='checkbox']:checked + span,
    [type='radio']:checked + span {
        background-color: #ddd;
    }

    label [type='checkbox']+span:before {
        display: grid;
        flex-shrink: 0;
        place-content: center;

        content: "";
        background-color: #fff;
        width: 1.3em;
        height: 1.3em;
        border-radius: 10%;
        margin-right: 0.375em;
        transition: 0.25s ease;
        box-shadow: inset 0 0 0 0.14375em #fff;
    }

    label [type='checkbox']:checked+span:before {
        display: flex;
        flex-shrink: 0;
        content: "";
        width: 1.3em;
        height: 1.3em;
        background-color: #2196f3;
        border-radius: 10%;
        transition: 0.25s ease;
        box-shadow: inset 0 0 0 0.14375em #2196f3;
        transform-origin: bottom left;
        clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    }
    input[type="checkbox"]:checked::before {
        transform: scale(1);
    }
</style>