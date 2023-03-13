<script lang="ts">
    export let isActive=false
    import { onMount } from 'svelte';

    //timer
    const startDate : Date=  new Date();
    let dateNow : Date =new Date(startDate - startDate)
    $: hours = dateNow.getHours();
    $: minutes = dateNow.getMinutes();
    $: seconds = dateNow.getSeconds();
    onMount( () => {
        setInterval(() => {
            if(isActive)
                dateNow = new Date(new Date() - startDate);
        }, 1000);
    });
</script>

<span>
    ⏳ {hours-1}:{minutes}:{seconds}
</span>

<style>
    div{
        color: #27ae60;
        float:right;
    }
</style>
