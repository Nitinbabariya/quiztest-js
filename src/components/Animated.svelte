<script lang="ts">
    import { fade } from 'svelte/transition';
    export let update: any;
</script>

{#key update}
    <div class="animated" in:fade="{{ duration: 500 }}">
        <slot />
    </div>
{/key}

<style>
</style>
