<script lang="ts">
    import { fade } from 'svelte/transition';
    export let show: Boolean;
    export let hint: string;
</script>

{#if show}
    <div class="alert simple-alert hint" in:fade|local="{{ duration: 400 }}">
        💡 {@html hint}
    </div>
{/if}
