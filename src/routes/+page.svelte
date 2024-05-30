<script>
    import { onMount } from "svelte";

    // Components
    import NavigationBar from "$lib/NavigationBar/NavigationBar.svelte";
    import NavigationDivider from "$lib/NavigationBar/Divider.svelte";
    import NavigationButton from "$lib/NavigationBar/Button.svelte";
    import StyledButton from "$lib/StyledComponents/ToolboxButton.svelte";
    import ControlBar from "$lib/ControlBar/ControlBar.svelte";
    import StartButton from "$lib/ControlBar/StartButton.svelte";
    import StopButton from "$lib/ControlBar/StopButton.svelte";
    import OpenButton from "$lib/ControlBar/OpenButton.svelte";
    import FullscreenButton from "$lib/ControlBar/FullscreenButton.svelte";
    import EaglerCraft from "$lib/EaglerCraft/EaglerCraft.svelte";
    import Documentation from "$lib/Documentation/Documentation.svelte";

    // Modals
    import ExtensionColorsModal from "$lib/MenuModals/ExtensionColors.svelte";
    import CreateBlockModal from "$lib/MenuModals/CreateBlock.svelte";

    // Modal Scripts
    import CreateBlockModalScript from "$lib/MenuModals/createblock.js";

    // Toolbox
    import Toolbox from "$lib/Toolbox/Toolbox.xml?raw";

    import JSZip from "jszip";
    import beautify from "js-beautify";
    import Prism from "prismjs";
    import * as FileSaver from "file-saver";
    import fileDialog from "../resources/fileDialog";
    import EventManager from "../resources/events";

    import Blockly from "blockly/core";
    import * as ContinuousToolboxPlugin from "@blockly/continuous-toolbox";
    import "@blockly/field-colour-hsv-sliders";

    const Theme = Blockly.Theme.defineTheme("BasicTheme", {
        base: Blockly.Themes.Classic,
        fontStyle: {
            family: '"Source Code Pro", monospace',
            weight: "700",
            size: 12,
        },
        startHats: true,
    });

    import En from "blockly/msg/en";
    import "blockly/blocks";

    import BlocklyComponent from "svelte-blockly";

    import Compiler from "../resources/compiler";
    import preload from "../resources/preload";

    // Blocks
    import registerGeneric from "../resources/blocks/generic.js";
    registerGeneric();

    import registerCore from "../resources/blocks/core.js";
    import registerEvents from "../resources/blocks/events.js";
    import registerControl from "../resources/blocks/control.js";
    import registerSensing from "../resources/blocks/sensing.js";
    import registerSound from "../resources/blocks/sound.js";
    import registerLiterals from "../resources/blocks/literals.js";
    import registerOperators from "../resources/blocks/operators.js";
    import registerConversions from "../resources/blocks/conversions.js";
    import registerVariables from "../resources/blocks/variables.js";
    import registerJSON from "../resources/blocks/json.js";
    import registerBlocks from "../resources/blocks/blocks.js";
    import registerFunctions from "../resources/blocks/functions.js";
    import registerDebug from "../resources/blocks/debug.js";
    import registerPlayer from "../resources/blocks/player.js";
    import registerDisplay from "../resources/blocks/display.js";
    import registerinterface from "../resources/blocks/interface.js";
    
    Blockly.BlockSvg.prototype.showHelp_ = function ( ) {
        alert('test')
    };

    registerCore();
    registerControl();
    registerEvents();
    registerSound();
    registerSensing();
    registerLiterals();
    registerOperators();
    registerConversions();
    registerVariables();
    registerJSON();
    registerBlocks();
    registerFunctions();
    registerDebug();
    registerPlayer();
    registerDisplay();
    registerinterface();

    const EaglerCraftVersion = "1.3.2";

    const en = {
        rtl: false,
        msg: {
            ...En,
        },
    };

    import customRenderer from "../resources/renderer"
    Blockly.blockRendering.unregister('custom_renderer') //weird bug
    Blockly.blockRendering.register('custom_renderer', customRenderer)

    const config = {
        toolbox: Toolbox,
        collapse: true,
        comments: true,
        scrollbars: true,
        disable: false,
        theme: Theme,
        renderer: "custom_renderer",
        grid: {
            spacing: 25,
            length: 3,
            colour: "#00000011",
            snap: false,
        },
        zoom: {
            controls: true,
            wheel: false,
            startScale: 0.8,
            maxScale: 4,
            minScale: 0.25,
            scaleSpeed: 1.1,
        },
        plugins: {
            toolbox: ContinuousToolboxPlugin.ContinuousToolbox,
            flyoutsVerticalToolbox: ContinuousToolboxPlugin.ContinuousFlyout,
            metricsManager: ContinuousToolboxPlugin.ContinuousMetrics,
        },
        move: {
            scrollbars: {
                horizontal: true,
                vertical: true,
            },
            drag: true,
            wheel: true,
        },
    };

    let workspace;
    let compiler;
    let projectName = "";
    let projectID = "";
    let lastGeneratedCode = "";

    let windowObjectReference = null;

    const extensionImageStates = {
        icon: {
            failed: false,
            square: false,
            loading: false,
            image: "",
        },
        menuicon: {
            failed: false,
            square: false,
            loading: false,
            image: "",
        },
    };
    const extensionMetadata = {
        id: "extensionID",
        name: "Extension",
        docsURL: "",
        color1: "#0088ff",
        color2: "#0063ba",
        color3: "",
        tbShow: true
    };

    function updateGeneratedCode() {
        extensionMetadata.name = "Extension";
        extensionMetadata.id = "extensionID";
        if (projectName) {
            extensionMetadata.name = projectName;
        }
        if (projectID) {
            extensionMetadata.id = projectID;
        }
        const code = compiler.compile(
            workspace,
            extensionMetadata,
            extensionImageStates
        );
        lastGeneratedCode = code;
    }

    import pkg from '@blockly/workspace-minimap';
    const { PositionedMinimap } = pkg;
    onMount(() => {
        console.log("ignore the warnings above we dont care about those");

        window.onbeforeunload = () => "";
        compiler = new Compiler(workspace);
        // workspace was changed
        workspace.addChangeListener(updateGeneratedCode);

        EventManager.allowAttachment();
        EventManager.on(EventManager.EVENT_THEME_CHANGED, () => {
            workspace.refreshTheme();
        });

        const minimap = new PositionedMinimap(workspace);
        minimap.init();
    });

    function downloadProject() {
        // generate file name
        let filteredProjectName = (projectName || projectID).replace(/[^a-z0-9\-]+/gim, "_");
        let fileName = filteredProjectName + ".tb";
        if (!filteredProjectName) {
            fileName = "MyProject.tb";
        }

        // data
        let projectData = Blockly.serialization.workspaces.save(workspace)

        // modify data by me wow
        projectData = {
            blockly: projectData,
            metadata: extensionMetadata,
            images: extensionImageStates
        }

        // zip
        const zip = new JSZip();
        zip.file(
            "README.txt",
            "This file is not meant to be opened!" +
                "\nBe careful as you can permanently break your project!"
        );

        // data
        const data = zip.folder("data");
        data.file("project.json", JSON.stringify(projectData));

        // download
        zip.generateAsync({ type: "blob" }).then((blob) => {
            FileSaver.saveAs(blob, fileName);
        });
    }
    function loadProject() {
        fileDialog({ accept: ".tb" }).then((files) => {
            if (!files) return;
            const file = files[0];

            const projectNameIdx = file.name.lastIndexOf(".tb");

            JSZip.loadAsync(file.arrayBuffer()).then(async (zip) => {
                console.log("loaded zip file...");

                // get project json from the data folder
                const dataFolder = zip.folder("data");
                const projectJsonString = await dataFolder
                    .file("project.json")
                    .async("string");
                const projectJson = JSON.parse(projectJsonString);

                // do your thing
                projectName = projectJson.metadata.name
                projectID = projectJson.metadata.id
                for (var i in projectJson.metadata) {
                    var v = projectJson.metadata[i]
                    extensionMetadata[i] = v
                }
                for (var i in projectJson.images) {
                    var v = projectJson.images[i]
                    extensionImageStates[i] = v
                }

                // get project workspace xml stuffs
                const workspacesFolder = zip.folder("workspaces");
                const fileNames = [];
                workspacesFolder.forEach((_, file) => {
                    const fileName = file.name.replace("workspaces/", "");
                    fileNames.push(fileName);
                });
                // console.log(fileNames); // debug
                const idWorkspacePairs = {};
                for (const fileName of fileNames) {
                    const idx = fileName.lastIndexOf(".xml");
                    const id = fileName.substring(0, idx);
                    // assign to pairs
                    idWorkspacePairs[id] = await workspacesFolder
                        .file(fileName)
                        .async("string");
                }
                // console.log(idWorkspacePairs); // debug

                // laod
                console.log(projectJson); // debug
                Blockly.serialization.workspaces.load(projectJson.blockly, workspace);

                updateGeneratedCode()
            });
        });
    }

    // code display & handling
    function beautifyGeneratedCode(code) {
        const beautified = beautify.js(code, {
            indent_size: 4,
            space_in_empty_paren: true,
        });
        return beautified;
    }
    function displayGeneratedCode(code) {
        const beautified = beautifyGeneratedCode(code);
        const highlighted = Prism.highlight(
            beautified,
            Prism.languages.javascript
        );
        return highlighted;
    }

    // image importing
    function extensionIconAdded(event) {
        console.log(event);
        const filePicker = event.target;
        // check if we have a file
        if (!filePicker.files || !filePicker.files[0]) {
            // remove the image
            extensionImageStates.icon.failed = false;
            extensionImageStates.icon.square = false;
            extensionImageStates.icon.loading = false;
            extensionImageStates.icon.image = "";
            updateGeneratedCode();
            return;
        }
        const file = filePicker.files[0];

        extensionImageStates.icon.loading = true;
        const fileReader = new FileReader();
        fileReader.onload = () => {
            // file finished loading
            const url = fileReader.result;
            extensionImageStates.icon.image = url;
            updateGeneratedCode();
            // start checking the other stuff
            const image = new Image();
            image.onload = () => {
                extensionImageStates.icon.failed = false;
                extensionImageStates.icon.square = image.width === image.height;
                // mark as loading finished
                extensionImageStates.icon.loading = false;
            };
            image.onerror = () => {
                extensionImageStates.icon.failed = true;
                extensionImageStates.icon.square = false;
                // mark as loading finished
                extensionImageStates.icon.loading = false;
            };
            image.src = url;
        };
        fileReader.readAsDataURL(file);
    }

    // validation
    function isExtensionIDInvalid(id) {
        return Boolean(String(id).match(/[^a-z0-9]/gim));
    }

    // Modals
    const ModalState = {
        extensionColors: false,
    };

    function discordInvite() {
        window.open("https://discord.gg/KGstyUEQpR")
    }

    function github() {
        window.open("https://github.com/OeildeLynx31/eaglerforge-builder")
    }

    function startInstance() {
        let mod = encodeURIComponent(btoa(lastGeneratedCode));
        console.log(lastGeneratedCode);
        if (windowObjectReference == null || windowObjectReference.closed) {
            document.getElementById('EaglerCraftInstance').innerHTML = `
            <iframe src="/eaglerforge/${EaglerCraftVersion}/?Mod=data:text/plain;charset=utf-8;base64,${mod}#embed" title="EaglerForge loader" width="100%" height="100%" style="border: 0px;"></iframe>`
        } else {
            windowObjectReference.focus();
            windowObjectReference.location.href = `${window.location.origin}/eaglerforge/${EaglerCraftVersion}/?Mod=data:text/plain;charset=utf-8;base64,${mod}`;
            document.getElementById('EaglerCraftInstance').innerHTML = `
            <div style="height: 100%; width: 100%; display: flex; align-items: center; justify-content: center;">
                <div style="text-align: center" class="popupOpened">
                    <svg width="50px" height="50px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/></svg>
                    <p>The EaglerCraft instance is opened in a popup</p>
                </div>
            </div>`;
            document.getElementById('open').style.display = "none";
        }

    }

    function stopInstance() {
        if (windowObjectReference == null || windowObjectReference.closed) {
            document.getElementById('EaglerCraftInstance').innerHTML = '';
        } else {
            windowObjectReference.close();
            document.getElementById('open').style.display = "initial";
            document.getElementById('EaglerCraftInstance').innerHTML = '';
        }
    }

    function openInstancePopup() {
        let mod = encodeURIComponent(btoa(lastGeneratedCode));
        if (windowObjectReference == null || windowObjectReference.closed) {
            document.getElementById('EaglerCraftInstance').innerHTML = `
            <div style="height: 100%; width: 100%; display: flex; align-items: center; justify-content: center;">
                <div style="text-align: center" class="popupOpened">
                    <svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/></svg>
                    <p>The EaglerCraft instance is opened in a popup</p>
                </div>
            </div>`;
            windowObjectReference = window.open(
                `${window.location.origin}/eaglerforge/${EaglerCraftVersion}/?Mod=data:text/plain;charset=utf-8;base64,${mod}`,
                "EaglerForge Mod Preview",
                "popup",
            );
            /*windowObjectReference.addEventListener('beforeunload', () => {
                document.getElementById('EaglerCraftInstance').innerHTML = '';
                document.getElementById('open').style.display = "initial";
            })*/ //better but doesn't work with WebKit
            let timer = setInterval(function() { 
                if(windowObjectReference.closed) {
                    clearInterval(timer);
                    document.getElementById('EaglerCraftInstance').innerHTML = '';
                    document.getElementById('open').style.display = "initial";
                }
            }, 100);
            window.addEventListener('beforeunload', () => {
                windowObjectReference.close();
            })
            if (location.hash === "#fullscreen") {
                document.getElementById('fullscreenButton').click();
            }
        } else {
            windowObjectReference.focus();
            windowObjectReference.location.reload();
            document.getElementById('EaglerCraftInstance').innerHTML = `
            <div style="height: 100%; width: 100%; display: flex; align-items: center; justify-content: center;">
                <div style="text-align: center" class="popupOpened">
                    <svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/></svg>
                    <p>The EaglerCraft instance is opened in a popup</p>
                </div>
            </div>`;
        }
        document.getElementById('open').style.display = "none";
    }

    function switchFullscreen() {
        if (location.hash === "") {
            location.hash = "#fullscreen";
            document.querySelector('.assetsWrapper').classList.add('assetsWrapperFullscreen');
        } else if (location.hash === "#fullscreen"){
            history.replaceState(null, null, ' ');
            document.querySelector('.assetsWrapper').classList.remove('assetsWrapperFullscreen');
        }
        setFullscreenIcon()
    }

    function setFullscreenIcon() {
        document.getElementById('fullscreenButton').innerHTML = `<i class="${(location.hash === ""?"fa fa-expand":"fa fa-compress")}"></i>`;
    }
</script>

<CreateBlockModal
    color1={extensionMetadata.color1}
    color2={extensionMetadata.color2}
    color3={extensionMetadata.color3}
/>
{#if ModalState.extensionColors}
    <ExtensionColorsModal
        color1={extensionMetadata.color1}
        color2={extensionMetadata.color2}
        color3={extensionMetadata.color3}
        tbShow={extensionMetadata.tbShow}
        on:completed={(colors) => {
            ModalState.extensionColors = false;
            extensionMetadata.color1 = colors.detail.color1;
            extensionMetadata.color2 = colors.detail.color2;
            extensionMetadata.color3 = colors.detail.color3;
            extensionMetadata.tbShow = colors.detail.tbShow;
            updateGeneratedCode();
        }}
        on:cancel={() => {
            ModalState.extensionColors = false;
            updateGeneratedCode();
        }}
    />
{/if}
<NavigationBar>
    <NavigationButton on:click={discordInvite}>Discord</NavigationButton>
    <NavigationButton on:click={github}>Github</NavigationButton>
    <NavigationDivider />
    <NavigationButton on:click={downloadProject}>Save</NavigationButton>
    <NavigationButton on:click={loadProject}>Load</NavigationButton><!--
    <NavigationDivider />
    <input
        class="project-name"
        type="text"
        placeholder="Extension ID (ex: extensionID)"
        style="margin-left:4px;margin-right:4px"
        data-invalid={isExtensionIDInvalid(projectID)}
        bind:value={projectID}
        on:change={updateGeneratedCode}
    />
    {#if isExtensionIDInvalid(projectID)}
        <p style="color:white;margin-left:4px">
            <b>Extension ID must be only letters and numbers.</b>
        </p>
    {/if}
    <NavigationDivider />
    <input
        class="project-name"
        type="text"
        placeholder="Extension Name (ex: Extension)"
        style="margin-left:4px;margin-right:4px"
        bind:value={projectName}
        on:change={updateGeneratedCode}
    />-->
</NavigationBar>
<div class="main">
    <div class="row-menus">
        <div class="row-first-submenus">
            <div class="blockMenuButtons">
            </div>
            <div class="blocklyWrapper">
                <BlocklyComponent {config} locale={en} bind:workspace />
            </div>
        </div>
        <div class="row-submenus">
            <div class="assetsWrapper">
                <ControlBar>
                    <StartButton
                        on:click={startInstance}/>
                    <StopButton
                        on:click={stopInstance}/>
                    <OpenButton
                        on:click={openInstancePopup}/>
                    <FullscreenButton
                        on:click={switchFullscreen}>
                        <i class="fa fa-expand"></i>
                    </FullscreenButton>
                </ControlBar>
                <EaglerCraft>
                </EaglerCraft>
            </div>
            <Documentation/>
            <div class="row-subsubmenus">
                <div class="codeActionsWrapper">
                    <p style="margin-right: 12px"><b>Mod Code</b></p>
                    <StyledButton
                        on:click={() => {
                            // copy code
                            const code =
                                beautifyGeneratedCode(lastGeneratedCode);
                            navigator.clipboard.writeText(code);
                        }}
                    >
                        Copy
                    </StyledButton>
                    <div style="margin-right: 4px" />
                    <StyledButton
                        on:click={() => {
                            // download
                            const code =
                                beautifyGeneratedCode(lastGeneratedCode);
                            const filteredProjectName = projectName.replace(
                                /[^a-z0-9\-]+/gim,
                                "_"
                            );
                            const blob = new Blob([code], {
                                type: "text/javascript;charset=UTF-8",
                            });
                            FileSaver.saveAs(blob, filteredProjectName + ".js");
                        }}
                    >
                        Download
                    </StyledButton>
                </div>
                <div class="codeWrapper">
                    <div class="codeDisplay">
                        {@html displayGeneratedCode(lastGeneratedCode)}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    :root {
        --nav-height: 3rem;
    }
    input[type="file"]::file-selector-button {
        padding: 0.35rem 1.65rem;

        font-size: 0.75rem;
        color: black;
        background: transparent;
        cursor: pointer;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 4px;
    }
    input[type="file"]::file-selector-button:focus,
    input[type="file"]::file-selector-button:hover,
    input[type="file"]::file-selector-button:active {
        background: white;
    }

    :global(body.dark) input[type="file"]::file-selector-button {
        color: #ccc;
        border-color: #c6c6c6;
    }
    :global(body.dark) input[type="file"]::file-selector-button:focus,
    :global(body.dark) input[type="file"]::file-selector-button:hover,
    :global(body.dark) input[type="file"]::file-selector-button:active {
        background: #111;
    }

    :global(body.dark) input[type="text"],
    :global(body.dark) input[type="number"] {
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.7);
        color: white;
    }
    :global(body.dark) input[type="text"]:hover,
    :global(body.dark) input[type="number"]:hover {
        background: transparent;
        border: 1px solid dodgerblue;
    }

    .main {
        position: absolute;
        left: 0px;
        top: var(--nav-height);
        width: 100%;
        height: calc(100% - var(--nav-height));

        min-width: 870px;
    }

    .project-name {
        width: 236px;

        font-size: 20px;

        border-radius: 6px;
        outline: 1px dashed rgba(0, 0, 0, 0.15);
        border: 0;
        background: rgba(255, 255, 255, 0.25);
        color: white;

        font-weight: bold;
        font-size: 1rem;
        padding: 0.5rem;
        transition: 0.25s;
    }
    .project-name::placeholder {
        font-weight: normal;
        color: white;
        opacity: 1;
        font-style: italic;
    }
    .project-name:hover {
        background-color: hsla(0, 100%, 100%, 0.5);
        transition: 0.25s;
    }
    .project-name:active,
    .project-name:focus {
        outline: none;
        border: 1px solid hsla(0, 100%, 100%, 0);
        box-shadow: 0 0 0 calc(0.5rem * 0.5) hsla(0, 100%, 100%, 0.25);
        background-color: hsla(0, 100%, 100%, 1);
        color: black;
        transition: 0.25s;
    }

    .project-name[data-invalid="true"] {
        background-color: #ffabab;
        text-decoration: red underline;
    }
    :global(body.dark) .project-name[data-invalid="true"] {
        background-color: #9b0000 !important;
        text-decoration: red underline;
    }

    .extensionIcon {
        width: 96px;
        height: 96px;
        object-fit: contain;
    }

    .row-menus {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .row-submenus {
        display: flex;
        flex-direction: column;
        width: 35%;
        height: 100%;
    }
    .row-first-submenus {
        display: flex;
        flex-direction: column;
        width: 65%;
        height: 100%;
    }
    .row-subsubmenus {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 50%;
    }

    .extensionMenuPreview {
        width: 60px;
        cursor: pointer;
        overflow: hidden;
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
    }
    .extensionBubbleName {
        font-size: 0.65rem;
    }

    .blockMenuButtons {
        position: relative;
        width: 100%;
        height: 48px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        background: #f9f9f9;
    }
    :global(body.dark) .blockMenuButtons {
        background-color: #111;
    }

    .blocklyWrapper {
        position: relative;
        width: 100%;
        height: calc(100% - 48px);
    }
    .assetsWrapper:not(.assetsWrapperFullscreen) {
        position: relative;
        width: calc(100% - 16px);
        height: calc(50% - 16px);
        padding: 8px;
        overflow: auto;
    }

    :global(.assetsWrapperFullscreen) {
        position: fixed;
        left: 0px;
        width: 100%;
        height: 100%;
        z-index: 70;
        padding: 0px;
        top: 0px;
    }

    .codeActionsWrapper {
        position: relative;
        width: 100%;
        height: 48px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        background: #f9f9f9;
    }
    :global(body.dark) .codeActionsWrapper {
        background-color: #111;
    }
    .codeWrapper {
        position: relative;
        width: 100%;
        height: calc(100% - 55px);
        padding-bottom: 5px;
    }

    .codeDisplay {
        width: 100%;
        height: 100%;

        border: 0;
        padding: 0;
        padding-left: 8px;
        overflow: auto;

        background: #f9f9f9;
        white-space: pre-wrap;
        font-family: monospace !important;
    }
    :global(body.dark) .codeDisplay {
        background-color: #111;
    }

    .warning {
        background-color: yellow;
        color: black;
    }

    :global(.popupOpened) {
        fill: rgb(50, 50, 50);
        color: rgb(50, 50, 50);
    }

    :global(body.dark) :global(.popupOpened) {
        fill: white;
        color: white;
    }

    :global(.blocklyScrollbarBackground:hover + .blocklyScrollbarHandle, .blocklyScrollbarHandle:hover) {
        fill: #575E75; /* fix strange scrollbar issue */
    }

    :global(.blocklyToolboxDiv) {
        overflow-x: hidden;
        scrollbar-color: #797e8e80 transparent;
        scrollbar-width: thin;
    }
</style>
