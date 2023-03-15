<script lang="ts">
    import { tweened } from 'svelte/motion';

    export let value: number;
    export let max: number;

    const progress = tweened(0, {
        duration: 0
    });
    $: progress.set(Math.min(max, value) + 0.5);
    $: progressPercent = String(($progress / (max + 0.5)) * 100) + '%';
</script>

<div class="progress" data-label="">
    <div class="progress-slider" style="width:{progressPercent}"></div>
</div>

<style>
    .progress {
        grid-area: auto;
        height: 5px;
        width: 100%;
        position: relative;
        margin-bottom: 0.5rem;
    }

    .progress .progress-slider {
        height: 100%;
        display: block;

        justify-content: center;
        align-items: center;
        position: relative;
        background: #ff00cc;
        background-color: #FBDA61;
        background-image: linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%);
        border-radius:1rem;
    }
</style>
