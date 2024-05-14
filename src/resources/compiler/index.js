import javascriptGenerator from '../javascriptGenerator';

class Compiler {
    /**
     * Generates JavaScript code from the provided workspace & info.
     * @param {Blockly.Workspace} workspace 
     * @param {object} extensionMetadata 
     * @param {object} imageStates 
     * @returns {string} Generated code.
     */
    compile(workspace) {
        const code = javascriptGenerator.workspaceToCode(workspace);
        let start = '';
        if (code.indexOf('ModAPI.player') > -1) {
            start+= "ModAPI.require('player');";
        }
        if (code.indexOf('ModAPI.settings') > -1) {
            start+= "ModAPI.require('settings');";
        }
        if (code.indexOf('sendData(') > -1) {
            start+= `function sendData(message,url) {
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Content-type", "application/json");

    var params = {
        content: message
    };

    request.send(JSON.stringify(params));
}`;
        }
        if (code.indexOf('variables[') > -1) {
            start+= 'let variables = [];';
        }
        if (code.indexOf('pressedKeys[') > -1) {
            start+= `var pressedKeys = {};
            window.onkeyup = function(e) { pressedKeys[e.keyCode] = false; }
            window.onkeydown = function(e) { pressedKeys[e.keyCode] = true; }`;
        }
        if (code.indexOf('document.createElement("eaglerpage")') > -1) {
            let style = "width:100%; height: 100%; position: fixed; top: 0; left: 0; z-index: 10; color: white; font-family: Minecraftia, sans-serif; overflow-y: scroll; overflow-x: hidden; background-image: url(data:image/png;base64,UklGRhoBAABXRUJQVlA4TA0BAAAvn8AnAIWjtpEECdnA2N0DsTROy7xUqfrWw0jbyLkJKTz0+I20jTT/Bo89e1YR/Wfktm0Y+wNKLobT7QP/n/B7Z/naW26QHoTpHB7LFouyKHlzeHxfCStSuj9KdbC8z1IJ5iWiyQed48vtYJ+lUu0t4VwranS1XMIutSiLYlbb8G54uf2p3VPSfRZtSrlsPFjOzZZrd/us3B3uK+HcHJQql+xbLMrS/WqNpm6DeZ/VIPVYaN/KzUbp91nd9xl5pYu50dU2W417nbdTj5l2Ne92uM9qXNpyf6+oXkabHKXaZ1HS4Iaqpim+1KIJ+0M49/LjNbTGP5mrrMZEuc7Uzcb1ViOJ6TuOt4NGJs+zDgA=); background-color: rgb(60,60,60); background-blend-mode: multiply; background-size: 64px; ".replaceAll('; ', ';\n ')
            start+= `
            const sheet = window.document.styleSheets[0];
            sheet.insertRule(\`\neaglerpage {\n ${style}}\n\`, sheet.cssRules.length);
            `;
        }
        
        const headerCode = start;
        const classRegistry = {
            top: [],
            extensionInfo: {},
            bottom: [
            ]
        }
        let end = '';
        if (code.indexOf('function onload() {') > -1) {
            end+= 'onload();';
        }
        const footerCode = end;
        return [].concat(headerCode, classRegistry.top, [], classRegistry.bottom, code, footerCode).join('\n');
    }
}

export default Compiler;
