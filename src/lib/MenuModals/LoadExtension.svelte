<script>
    import { createEventDispatcher } from "svelte";
    import fileDialog from "../../resources/fileDialog";

    let URL = "";
    let Text = "";
    let File = "";
    let selected = "URL";
    let btnText = "No file selected.";

    const dispatch = createEventDispatcher();

    function event() {
        dispatch("completed", {
            selected,
            URL,
            Text,
            File,
        });
    }
    function cancel() {
        dispatch("cancel");
    }
    function file() {
        fileDialog({ accept: ".js" }).then((files) => {
            if (!files) return;
            File = files[0];
            btnText = "Selected: " + File.name;
        })
    }
</script>

<div class="bg">
    <div class="modal">
        <div class="modal-title">
            <p>Load Custom Extension</p>
        </div>
        <div class="modal-content">
            <div class="tabs">
                <div class="tab {(selected == "URL" ? "selected" : "")}" on:click={() => {selected = "URL"}}>URL</div>
                <div class="tab {(selected == "Files" ? "selected" : "")}" on:click={() => {selected = "Files"}}>Files</div>
                <div class="tab {(selected == "Text" ? "selected" : "")}" on:click={() => {selected = "Text"}}>Text</div>
            </div>
            {#if selected == "URL"}
                <p>Enter the extension's URL:</p>
                <input
                    class="extension-import-input"
                    type="text"
                    placeholder="https://eaglerforge-builder.vercel.app/extensions/..."
                    style=""
                    bind:value={URL}
                />
            {:else if selected == "Files"}
                <p>Select or drop an extension's JavaScript file:</p>
                <button class="file-selector-button" on:click={file}>{btnText}</button>
            {:else if selected == "Text"}
                <p>Paste the extension's JavaScript source code:</p>
                <textarea
                    class="extension-import-input"
                    type="text"
                    placeholder="{`class Extension {
    // ...
}
EaglerBuilder.extensions.register(new Extension());`}"
                    style="resize: vertical;height:100px;"
                    bind:value={Text}
                />
            {/if}
        </div>
        <div class="modal-buttons">
            <button class="button-cancel" on:click={cancel}>Cancel</button>
            <div style="margin-left:6px" />
            <button class="button-accept" on:click={event}>Load</button>
            <div style="margin-left:24px" />
        </div>
    </div>
</div>

<style>
    .button-cancel {
        border: 1px solid rgba(0, 0, 0, 0.15);
        background: white;
        color: black;
        font-weight: bold;
        padding: 0.75rem 1rem;
        border-radius: 0.25rem;
        font-size: 0.85rem;
        cursor: pointer;
    }
    .button-accept {
        border: 1px solid rgb(86, 114, 205);
        background: rgb(86, 114, 205);
        color: white;
        font-weight: bold;
        padding: 0.75rem 1rem;
        border-radius: 0.25rem;
        font-size: 0.85rem;
        cursor: pointer;
    }

    input[type="text"] {
        margin-left: 3px;
    }

    .file-selector-button {
        padding: 0.35rem 1.65rem;
        font-size: 1rem;
        width: 100%;
        height: 50px;
        color: black;
        background: transparent;
        cursor: pointer;
        border: 3px dashed rgba(0, 0, 0, 0.15);
        border-radius: 4px;
    }
    .file-selector-button:focus,
    .file-selector-button:hover,
    .file-selector-button:active {
        background: white;
    }

    :global(body.dark) .file-selector-button {
        color: white;
        border-color: #2e2e2e;
    }
    :global(body.dark) .file-selector-button:focus,
    :global(body.dark) .file-selector-button:hover,
    :global(body.dark) .file-selector-button:active {
        background: #111;
    }

    .tabs {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
    }

    .tab {
        height: 40px;
        width: 100px;
        border-bottom: 5px hsla(215, 50%, 90%, 1) solid;
        font-size: 20px;
        text-align: center;
        margin-right: 10px;
        margin-left: 10px;
        cursor: pointer;
        transition-duration: 0.25s;
    }

    :global(body.dark) .tab {
        border-bottom: 5px #2e2e2e solid;
    }

    .tab.selected, :global(body.dark) .tab.selected {
        border-bottom: 5px rgb(86, 114, 205) solid;
    }

    :global(body.dark) input[type="text"], :global(body.dark) textarea {
        background: inherit;
        border: 1px solid rgba(255, 255, 255, 0.7);
        color: white;
    }
    :global(body.dark) input[type="text"]:hover, :global(body.dark) textarea:hover {
        background: inherit;
        border: 1px solid dodgerblue;
    }
    .extension-import-input {
        font-size: 20px;
        border-radius: 6px;
        outline: 1px dashed rgba(0, 0, 0, 0.15);
        border: 0;
        font-size: 1rem;
        padding: 0.5rem;
        transition: 0.25s;
        margin-left:4px;
        margin-right:4px;
        margin-bottom:4px;
        width:calc(100% - 25px);
    }
    .extension-import-input:hover {
        transition: 0.25s;
    }
    .extension-import-input:active,
    .extension-import-input:focus {
        box-shadow: 0 0 0 calc(0.5rem * 0.5) hsla(0, 100%, 100%, 0.25);
        transition: 0.25s;
    }
    .extension-import-input:active,
    .extension-import-input:focus {
        box-shadow: 0 0 0 calc(0.5rem * 0.5) hsla(0, 100%, 100%, 0.25);
        transition: 0.25s;
    }

    .bg {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        background: rgba(86, 114, 205, 0.69019607843);
        z-index: 999999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .modal {
        width: 60%;
        height: 50%;
        outline: 4px solid hsla(0, 100%, 100%, 0.25);
        border-radius: 0.5rem;
        background: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
    }
    :global(body.dark) .bg {
        background-color: #333333b0;
    }
    :global(body.dark) .modal {
        background-color: #111;
    }

    .modal-title {
        width: 100%;
        height: 10%;
        background: rgb(86, 114, 205);
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    :global(body.dark) .modal-title {
        background-color: #333;
    }
    .modal-content {
        width: calc(100% - 50px);
        height: 75%;
        overflow: auto;
        padding: 25px;
    }
    .modal-buttons {
        width: 100%;
        height: 15%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: right;
    }
</style>
