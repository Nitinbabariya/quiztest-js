<script lang="ts">
    export let show: Boolean;
    export let hint: string;
</script>

{#if show}
<div class="hint" style=";margin-bottom: 0.5em;margin-top: 0.5em">
    Hint: <br/>
    💡 {@html hint}
</div>
{/if}

