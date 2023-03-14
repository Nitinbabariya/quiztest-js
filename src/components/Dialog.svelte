<script>
    export let dialog

    function handleMessage(event) {
        alert("dialog close");
    }
</script>
<dialog bind:this={dialog} on:close>
    <slot/>
</dialog>
<style>
    dialog {
        border-radius: 5px;
        border-width: 1px;
        transition: all 2s;
        margin:1rem;
    }
    dialog::backdrop {
        background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
        background-size: 400% 400%;
        animation: gradient 15s ease infinite;
        height: 100vh;
    }

    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

</style>