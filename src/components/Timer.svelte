<script lang="ts">
    export let isActive=false
    import { onMount } from 'svelte';

    //timer
    let startDate =  new Date();
    let dateNow=new Date(startDate - startDate)
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
<div>
    {hours-1} : {minutes} : {seconds}
</div>

