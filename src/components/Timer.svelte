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

<table style="text-align: center; border:0px">
    <tr>
        <td>
            {hours-1}
        </td>
        <td>
            :
        </td>
        <td>
            {minutes}
        </td>
        <td>
            :
        </td>
        <td>
            {seconds}
        </td>
    </tr>
    <tr style="color:#808080; font-size:0.8em">
        <td>
            hh
        </td>
        <td>
            :
        </td>
        <td>
            mm
        </td>
        <td>
            :
        </td>
        <td>
            ss
        </td>
    </tr>
</table>