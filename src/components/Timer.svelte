<script lang="ts">
    import { onMount } from 'svelte';
    let startDate =  undefined
    let elapsedTime;

    let isActive= true;
    export const start = () => {
        startDate = new Date();
        return "";
    }
    export function stop(){
        isActive = false;
        return ""; //a workaround due to my limited knowledge on svelte, without this it was causing a object jsonified output to result page in main app
    }

    onMount( () => {
        start();

        setInterval(() => {
            if(isActive)
            {
                let elapsedTimeMS = (new Date().valueOf() - startDate.valueOf());
                elapsedTime= convertMsToHM(elapsedTimeMS);
            }
        }, 1000);
    });

    function convertMsToHM(milliseconds) {
        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        minutes = seconds >= 30 ? minutes + 1 : minutes;
        return `${minutes.toLocaleString('en', {minimumIntegerDigits:2})}:${seconds.toLocaleString('en', {minimumIntegerDigits:2})}`;
    }
</script>
{#if elapsedTime}
     <span title="Quiz test's elapsed time">
         ⏰ {elapsedTime}
    </span>
{/if}

<style>
    span{
        color: #5C3317;
        float:right;
    }
</style>
