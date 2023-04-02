<script lang="ts">
    import type { BaseQuestion } from '../quiz';
    export let question: BaseQuestion;
    export let reviewModeActivated: boolean;
</script>
{#each question.answers as answer, i}
    <label>
        {#if question.questionType === 'MultipleChoice'}
            <input
                    type="checkbox"
                    bind:group="{question.selected}"
                    value="{i}"
                    disabled="{reviewModeActivated}"
            />
        {:else}
            <input
                type="radio"
                bind:group="{question.selected[0]}"
                value="{i}"
                disabled="{reviewModeActivated}"
            />
        {/if}

        <span>{@html answer.html}
        </span>

        {#if reviewModeActivated}
            {#if answer.correct && question.selected.includes(i)}
                <blockquote class="userResponseIsCorrect">
                    <b> ✔ You answered correctly</b><br/> Correct choice<br/> {@html answer.comment}
                </blockquote>
            {:else if question.selected.includes(i)}
                <blockquote class="userResponseIsInCorrect">
                    <b> ❌ You answered incorrectly</b> <br/> Incorrect choice <br/> {@html answer.comment}
                </blockquote>
            {:else if answer.correct}
                 <blockquote class="correctAnswer">
                     Correct choice <br/> {@html answer.comment}
                </blockquote>
            {:else }
                <blockquote class="incorrectAnswer">
                    Incorrect choice <br/> {@html answer.comment}
                </blockquote>
            {/if}

        {/if}
    </label>
{/each}

<style>
    label{
        border-radius: 5px;
        border:1px solid #E7E9EB;
        padding:5px;
        margin:1px;
    }

    label:hover {
        background: linear-gradient(180deg, rgba(255,255,255,0) -8.81%, #fff 34.08%),linear-gradient(270deg, rgba(42,240,228,0.4) 0%, rgba(140,51,255,0.4) 37.5%, rgba(255,39,118,0.4) 68.75%, rgba(255,188,15,0.4) 100%),#fff;
    }

    [type='radio'] {
        position: fixed;
        opacity: 0;
    }

    [type='radio']:hover + span,
    [type='radio']:focus + span {
        filter: brightness(0.9);
    }

    label input[type='radio']:checked + span:before {
        box-shadow: inset 0 0 0 0.4375em #45B4FF;
    }

    label span {
        display: -webkit-box;
        transition: 0.25s ease;
        position:relative;
    }

    label [type='radio']+span:before {
        display: flex;
        flex-shrink: 0;
        content: "";
        border:1px solid #808B96;
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
        border-radius: 0.15em;
        transform: translateY(-0.075em);
        display: grid;
        place-content: center;
        border:1px solid #808B96;
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
        box-shadow: inset 1em 1em var(--form-control-color);
        /* Windows High Contrast Mode */
        border: 0.15em solid currentColor;
    }

    [type='checkbox'] + span,
    [type='radio'] + span {
        transition-duration: 0.3s;
        color: var(--quiztest-color-text);
        padding: 0.5rem;
        margin:1px 0 1px 0;
        cursor: pointer;
    }

    [type='checkbox']:hover + span,
    [type='checkbox']:focus + span,
    [type='radio']:hover + span,
    [type='radio']:focus + span {
    }

    [type='checkbox']:checked + span,
    [type='radio']:checked + span {
    }

    label [type='checkbox']+span:before {
        display: grid;
        flex-shrink: 0;
        place-content: center;

        content: "";
        width: 1.3em;
        height: 1.3em;
        border-radius: 10%;
        margin-right: 0.375em;
        transition: 0.25s ease;
        box-shadow: inset 0 0 0 0.1em #B2BABB;
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

    /**/
    @import url(https://fonts.googleapis.com/css?family=Open+Sans:400italic);
    blockquote{
        font-family:Open Sans;
        font-style:italic;
        color: #555555;
        padding:0.5em;
        border:1px dashed #78C0A8;
        border-radius: 5px;
        border-left:8px solid #78C0A8 ;
        line-height:1.6;
        position: relative;
        word-wrap: break-word;
    }

    blockquote.userResponseIsCorrect{
        border-left:8px solid #73DC1C;
    }

    blockquote.userResponseIsInCorrect {
        border-left: 8px solid #FF5945;
    }

    blockquote.correctAnswer{
        border-left:8px solid #73DC1C;
    }

    blockquote.incorrectAnswer{
        border-left:8px solid #B2BABB;
    }


    blockquote::before{
        font-family:Arial;
        color:#78C0A8;
        font-size:4em;
        position: absolute;
        left: 10px;
        top:-10px;
    }

    blockquote::after{
        content: '';
    }

    blockquote span{
        display:inline;
        color:#333333;
        font-style: normal;
        font-weight: bold;
        margin-top:1em;
    }
</style>