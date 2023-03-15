<script lang="ts">
    export let show: Boolean;
    export let hint: string;
</script>

{#if show}
    <fieldset class="hint" style="border:1px solid #ddd;border-radius: 5px;margin-bottom: 0.5em;margin-top: 0.5em">
        💡 {@html hint}
    </fieldset>
{/if}

