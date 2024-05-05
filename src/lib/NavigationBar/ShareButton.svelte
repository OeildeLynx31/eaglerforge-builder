<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function event() {
        dispatch("click");
    }
</script>

<button on:click={event}>
    <b>
        <slot />
    </b>
</button>

<style>
    button {
        position: relative;
        padding: 0 1rem;

        display: flex;
        flex-direction: row;
        align-items: center;

        font-weight: bold;
        font-size: 0.75rem;
        color: white;
        background-color: #ff8c2f;
        cursor: pointer;
        border: 0;
        height: 70%;
        border-radius: 6px;
        margin-left: 5px;
    }
</style>
