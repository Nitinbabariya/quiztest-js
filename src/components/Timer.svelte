<script lang="ts">
    import { onMount } from 'svelte';

    let startDate =  undefined
    let elapsedTime;
    export const trigger = (timerOn=true) => startDate = timerOn ? new Date() : undefined;

    onMount( () => {
        setInterval(() => {
            if(startDate)
            {
                let elapsedTimeMS = (new Date().valueOf() - startDate.valueOf());
                elapsedTime= convertMsToHM(elapsedTimeMS);
            }
        }, 1000);
    });

    function convertMsToHM(milliseconds) {
        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        seconds = seconds % 60;
        minutes = seconds >= 30 ? minutes + 1 : minutes;
        return `${minutes.toLocaleString('en', {minimumIntegerDigits:2})}:${seconds.toLocaleString('en', {minimumIntegerDigits:2})}`;
    }

</script>
{#if elapsedTime}
     <span title="Quiz test's elapsed time">
         {elapsedTime}
    </span>
{/if}

<style>
    span{
        color: #5C3317;
        float:right;
    }
</style>
