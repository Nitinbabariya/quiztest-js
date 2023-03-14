<script lang="ts">
    import { fade } from 'svelte/transition';
    export let show: Boolean;
    export let hint: string;
</script>

{#if show}
    <div class="hint" in:fade|local="{{ duration: 200  }}">
        💡 {@html hint}
    </div>
{/if}

<style>
    .hint{
        display: block;
        padding: 6px;
        margin: 6px;
        border-radius: 3px;
        border: 1px solid #E7E9EB;
        background: rgb(239,244,152);
        background: linear-gradient(90deg, rgba(239,244,152,0.327249649859944) 0%, rgba(187,240,243,0.4981179971988795) 5%);
    }
</style>