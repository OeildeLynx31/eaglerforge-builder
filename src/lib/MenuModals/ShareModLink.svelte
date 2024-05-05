<script>
    let link;
    import { createEventDispatcher } from "svelte";
    import StyledButton from "$lib/StyledComponents/ToolboxButton.svelte";


    const dispatch = createEventDispatcher();

    function event() {
        dispatch("completed", {});
    }

    function onPopupOpened() {
        link = sessionStorage.getItem('lastSharedLink');
        if ((link.length/7+100) < 500) {
            document.getElementById('QRcode').setAttribute('src', `https://api.qrserver.com/v1/create-qr-code/?size=${link.length/7+100}x${link.length/7+100}&data=${link}`);
            document.getElementById('QRcodeDiv').style.height = (link.length/7+100)+"px";
            document.getElementById('QRcodeDiv').style.width = (link.length/7+100)+"px";
            document.getElementById('modalShareMod').style.height = `calc(30% + ${(link.length/7+100)}px)`;
        } else {
            document.getElementById('QRcode').setAttribute('src', 'https://static.thenounproject.com/png/2452282-200.png');
            document.getElementById('QRcodeDiv').style.height = "200px";
            document.getElementById('QRcodeDiv').style.width = "200px";
            document.getElementById('modalShareMod').style.height = `calc(30% + 200px)`;
        }
            //document.getElementById('QRcodeDiv').appendChild(linkURL)
    
        document.getElementById('bgShareLink').addEventListener("click", function (ev) {
            if (ev.composedPath()[0] === this) {
                event();
            }
        })
    }
</script>
<div class="bg" id="bgShareLink">
    <div class="modal" on:load={onPopupOpened()} id="modalShareMod">
        <div class="modal-title">
            <p>Share link</p>
        </div>
        <div class="modal-content">
            <div style="padding:15px 50px 0 10px;display:flex;flex-direction:column;align-items:center;justify-content:center;">
                <div id="QRcodeDiv">
                    <img alt="[QRCode]" id="QRcode" style="width: 100%; height: 100%"/>
                </div>
                <br>
                <div style="display: inline">
                    <a href={sessionStorage.getItem('lastSharedLink')}><StyledButton>Open link</StyledButton></a>
                    <StyledButton on:click={navigator.clipboard.writeText(sessionStorage.getItem('lastSharedLink'))}>Copy link</StyledButton>
                </div>
            </div>
        </div>
        <div class="modal-buttons">
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
        width: 60%;
        height: 50%;
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
        align-items: center;
        display: flex;
        justify-content: center;
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

    #QRcodeDiv {
        /*height: 10rem;*/
        /*width: 10rem;*/
        background-image: url('https://i.gifer.com/VAyR.gif');
        background-size: 33%;
        background-repeat: no-repeat;
        background-position-x: center;
        background-position-y: center;
        -webkit-box-shadow: 0px 0px 0px 5px #FFFFFF; 
        box-shadow: 0px 0px 0px 5px #FFFFFF;
    }

    #QRcode {
        background-color: #fff;
    }
</style>
