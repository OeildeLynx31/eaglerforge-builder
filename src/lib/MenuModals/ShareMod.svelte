<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function event() {
        let jsonData = {};
        const chosenValue = (document.getElementById('RadioModLink').checked?1:2);
        let title = document.getElementById('projectName').value.replaceAll(' ', "-");
        let id = "0000";
        let type = "mod";
        let version = "0"

        if (chosenValue === 2) {
            version = document.getElementById("version-select").value
            type = "instance";
        }

        id = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
        if (title.length > 0) {
            title = title + id;
        } else {
            title = id;
        }

        dispatch("completed", {
            type,
            version,
            title,
        });
    }

    function cancel() {
        let openLastLink = false;
        dispatch("cancel", {
            openLastLink,
        });
    }

    function openLastLink() {
        let openLastLink = true;
        dispatch("cancel", {
            openLastLink,
        });
    }

    function changeRadio(){
        const chosenValue = (document.getElementById('RadioModLink').checked?1:2);
        if (chosenValue === 1) {
            document.querySelector('radioElement1').style.display = "block";
            document.querySelector('radioElement2').style.display = "none";
        } else if (chosenValue === 2) {
            document.querySelector('radioElement2').style.display = "block";
            document.querySelector('radioElement1').style.display = "none";
        }
    }

    function changeMenu() {
        const chosenMenuValue = document.getElementById('version-select').value;
        if (chosenMenuValue === "custom") {
            document.querySelector('#customInstanceLink').style.display = "block";
        } else {
            document.querySelector('#customInstanceLink').style.display = "none";
        }
    }

    function onPopupOpened() {
        document.getElementById('RadioModLink').addEventListener("click", changeRadio);
        document.getElementById('RadioInstanceLink').addEventListener("click", changeRadio);
        document.querySelector('#customInstanceLink').style.display = "none";
        document.getElementById('version-select').addEventListener("change", changeMenu);
        document.getElementById('RadioModLink').click();
        document.getElementById('bgShareMod').addEventListener("click", function (ev) {
        if (ev.composedPath()[0] === this) {
            cancel();
        }
    })
    }

    const projectName = document.getElementsByClassName('project-name')[0].value;
</script>
<div class="bg" id="bgShareMod">
    <div class="modal" on:load={onPopupOpened()}>
        <div class="modal-title">
            <p>Share mod</p>
        </div>
        <div class="modal-content">
            <div style="padding: 15px 50px 15px 20px">
                <h3 style="text-align: center">Share your mod by a link</h3>
                <p>What do you want to share?</p>
                <label class="checkbox-container">
                    <input type="radio" id="RadioModLink" name="fav_language" value="modLink">
                    Share the mod text only
                    <span class="checkmark"></span>
                </label>
                <label class="checkbox-container">
                    <input type="radio" id="RadioInstanceLink" name="fav_language" value="instanceLink">
                    Share game instance with mod loaded
                    <span class="checkmark"></span>
                </label>
                <hr/>
                <radioElement1>
                    The link generated will be a large one, which unfortunately can't be reduced.
                </radioElement1>
                <radioElement2>
                    <br/>
                    <label for="projectName">Link title:</label>
                    <br/>
                    <input type="text" id="projectName" name="name" required minlength="4" maxlength="15" size="10" value={projectName}/>
                    <br/>
                    <br/>
                    <label for="version-select">Instance version:</label>
                    <br/>
                    <div class="custom-select" style="width:40%;">
                        <select name="version" id="version-select">
                            <option value="1.3">Latest - EaglerForge 1.3 (u27)</option>
                            <option value="custom">Custom</option>
                        </select>
                        <span class="focus"></span>
                    </div>
                    <input type="text" id="customInstanceLink" name="instanceURL" minlength="0" maxlength="15" size="10" placeholder="URL of the custom EaglerForge instance"/>
                </radioElement2>
            </div>
        </div>
        <div class="modal-buttons">
            <button class="button-lastLink" on:click={openLastLink}>See last link</button>
            <button class="button-cancel" on:click={cancel}>Cancel</button>
            <div style="margin-left:6px" />
            <button class="button-accept" on:click={event}>OK</button>
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
        border: 1px solid #5672cd;
        background: #5672cd;
        color: white;
        font-weight: bold;
        padding: 0.75rem 1rem;
        border-radius: 0.25rem;
        font-size: 0.85rem;
        cursor: pointer;
    }

    .button-lastLink {
        border: none;
        background: transparent;
        position: absolute;
        left: 20px;
        color: #888888aa;
        text-decoration: none;
        font-size: 0.9rem;
    }

    .button-lastLink:hover {
        color: #888888;
        text-decoration: underline;
    }

    label {
        font-weight: bold;
        font-size: 0.8rem;
        user-select: none;
    }
    input[type="color"] {
        margin-left: 3px;
    }
    img {
        cursor: not-allowed;
    }

    /* color picker */
    input[type="color"] {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        width: 40px;
        height: 40px;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }
    input[type="color"]::-webkit-color-swatch {
        border-radius: 4px;
        border: 1px solid rgba(0, 0, 0, 0.25);
    }
    input[type="color"]::-moz-color-swatch {
        border-radius: 4px;
        border: 1px solid rgba(0, 0, 0, 0.25);
    }

    :global(body.dark) input[type="color"]::-webkit-color-swatch {
        border-color: rgba(255, 255, 255, 0.5);
    }
    :global(body.dark) input[type="color"]::-moz-color-swatch {
        border-color: rgba(255, 255, 255, 0.5);
    }

    .bg {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        background: #5672cdb0;
        z-index: 999999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .modal {
        width: 50%;
        height: 75%;
        outline: 4px solid hsla(0, 100%, 100%, 0.25);
        border-radius: 0.5rem;
        background: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        position: relative;
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
        background: #5672cd;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        max-height: 3rem;
    }
    :global(body.dark) .modal-title {
        background-color: #333;
    }
    .modal-content {
        width: 100%;
        height: 75%;
        overflow: auto;
    }
    .modal-buttons {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: right;
        position: absolute;
        bottom: 1rem;
    }

    .extensionMenuPreview {
        width: 60px;
        position: relative;
        cursor: pointer;
        color: #575e75;
        user-select: none;
    }
    .extensionMenuPreview:hover {
        color: #4c97ff !important;
    }
    .extensionMenuPreview:focus,
    .extensionMenuPreview:active {
        background-color: #e9eef2;
    }

    .tbBubbleIcon {
        width: 16px;
        height: 16px;
        background: #0006;
        backdrop-filter: blur(2px);
        border-radius: 8px;
        position: absolute;
        top: -3px;
        right: -3px;
    }

    :global(body.dark) .extensionMenuPreview {
        color: #ccc;
    }
    :global(body.dark) .extensionMenuPreview:focus,
    :global(body.dark) .extensionMenuPreview:active {
        background-color: #1e1e1e;
    }
    .extensionBubbleIcon {
        width: 20px;
        height: 20px;
        background-size: 100%;
        border-radius: 100%;
        margin: 0 auto 0.125rem;
        border: 1px rgba(0, 0, 0, 0.2) solid;
        position: relative;
    }
    .extensionBubbleName {
        font-size: 0.65rem;
    }

    radioElement1, radioElement2 {
        display: none;
    }

    hr {
        border-top: 1px solid 1px solid #7d7d7dbd;
        border-bottom: none;
    }


    input[type="text"] {
        width: 40%;
        border-radius: 6px;
        border: 1px solid hsla(0, 0%, 59%, 0.863);
        color: #464646;
        font-weight: bold;
        font-size: 0.75rem;
        padding: 0.5rem;
        transition: 0.25s;
        margin-top: 0.25rem;
    }

    :global(body.dark) input[type="text"] {
        background-color: #333;
        color: #fff;
    }

    input[type="text"]::placeholder {
        font-weight: normal;
        color: hsla(0, 0%, 59%, 0.863);
        opacity: 1;
    }

    input[type="text"]:hover {
        border: 1px solid hsla(0, 0%, 42%, 0.863);
        transition: 0.25s;
    }

    input[type="text"]:active,
    input[type="text"]:focus {
        outline: none;
        box-shadow: 0 0 0 3px #4c97ff59;
        transition: 0.25s;
    }

    :global(body.dark) input[type="text"]:active,
    :global(body.dark) input[type="text"]:focus {
        background-color: #444;
    }

    input[type="text"][data-invalid="true"] {
        background-color: #ffabab;
        text-decoration: red underline;
    }
    :global(body.dark) input[type="text"][data-invalid="true"] {
        background-color: #9b0000 !important;
        text-decoration: red underline;
    }

    label.checkbox-container {
        font-weight: unset;
        display: block;
        position: relative;
        padding-left: 1.5rem;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 0.9rem;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    input[type=radio] {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 1rem;
        width: 1rem;
        background-color: #eee;
        border-radius: 50%;
    }

    label.checkbox-container:hover input[type=radio] ~ .checkmark {
        background-color: #ccc;
    }

    label.checkbox-container input[type=radio]:checked ~ .checkmark {
        background-color: #5672cd;
    }

    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    label.checkbox-container input[type=radio]:checked ~ .checkmark:after {
        display: block;
    }

    label.checkbox-container .checkmark:after {
        top: 0.25rem;
        left: 0.25rem;
        width: 0.5rem;
        height: 0.5rem;
        transform: scale(0.85);
        border-radius: 50%;
        background: white;
    }

    select {
        outline: none;
        height: 2rem;
        background-color: #fff;
        border: 1px solid hsla(0,0%,42%,.863);
        border-radius: 5px;
        padding-left: 10px;
        padding-right: 10px;
        margin-top: 0.25rem;
    }

    :global(body.dark) select {
        background-color: #333;
        color: #fff;
        border: 1px solid hsla(0,0%,42%,.863);
    }
</style>
