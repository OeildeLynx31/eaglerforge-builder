import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';
import Blockly from 'blockly/core'

const categoryPrefix = 'sensing_';
const categoryColor = '#5CB1D6';

function register() {
    // when key pressed
    registerBlock(`${categoryPrefix}keypress`, {
        message0: 'when key %1 is pressed %2 %3',
        args0: [
            {
                "type": "field_input",
                "name": "KEY",
                "spellcheck": false
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor,
        extensions: [
          'single_character_validation',
        ],
    }, (block) => {
        const KEY = block.getFieldValue('KEY')
        const BLOCKS = javascriptGenerator.statementToCode(block, 'BLOCKS');
        const code = `document.addEventListener("keypress", event => {
            if (event.key == '${KEY}') { ${BLOCKS} }
        });`;
        return `${code}\n`;
    })

    // alert
    registerBlock(`${categoryPrefix}alert`, {
        message0: 'alert %1',
        args0: [
            {
                "type": "input_value",
                "name": "ALERT"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const ALERT = javascriptGenerator.valueToCode(block, 'ALERT', javascriptGenerator.ORDER_ATOMIC);
        const code = `alert(${ALERT || '""'})`;
        return `${code}\n`;
    })
    
    // confirm
    registerBlock(`${categoryPrefix}confirm`, {
        message0: 'confirm %1',
        args0: [
            {
                "type": "input_value",
                "name": "ALERT"
            }
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const ALERT = javascriptGenerator.valueToCode(block, 'ALERT', javascriptGenerator.ORDER_ATOMIC);
        return [`confirm(${ALERT || '""'})`, javascriptGenerator.ORDER_ATOMIC];
    })
    
    // prompt
    registerBlock(`${categoryPrefix}prompt`, {
        message0: 'prompt %1',
        args0: [
            {
                "type": "input_value",
                "name": "ALERT"
            }
        ],
        output: "String",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const ALERT = javascriptGenerator.valueToCode(block, 'ALERT', javascriptGenerator.ORDER_ATOMIC);
        return [`prompt(${ALERT || '""'})`, javascriptGenerator.ORDER_ATOMIC];
    })
    
    // time
    registerBlock(`${categoryPrefix}time`, {
        message0: 'time (ms) since 1970',
        args0: [],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        return [`Date.now()`, javascriptGenerator.ORDER_ATOMIC];
    })
    
    // year
    registerBlock(`${categoryPrefix}year`, {
        message0: 'current year',
        args0: [],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        return [`(new Date(Date.now()).getFullYear())`, javascriptGenerator.ORDER_ATOMIC];
    })
    
    // leap year or not
    registerBlock(`${categoryPrefix}leapyear`, {
        message0: 'is leap year?',
        args0: [],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        return [`((new Date(new Date(Date.now()).getYear(), 1, 29)).getDate() === 29)`, javascriptGenerator.ORDER_ATOMIC];
    })

    registerBlock(`${categoryPrefix}fps`, {
        message0: 'current FPS',
        args0: [],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        return [`ModAPI.getFPS()`, javascriptGenerator.ORDER_ATOMIC];
    })

    registerBlock(`${categoryPrefix}keypressed`, {
        message0: "is key %1 pressed?",
        args0: [
            {
                "type": "field_dropdown",
                "name": "KEY2",
                "options": keyBoard
            },
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const KEY2 = block.getFieldValue('KEY2');
        return [`pressedKeys[${KEY2}]===true?true:false`, javascriptGenerator.ORDER_ATOMIC];
    })
}

const keyBoard = [
    ["SPACE", "32"],
    ["UP ARROW", "38"],
    ["DOWN ARROW", "40"],
    ["LEFT ARROW", "37"],
    ["RIGHT ARROW", "39"],
    ["A", "65"],
    ["B", "66"],
    ["C", "67"],
    ["D", "68"],
    ["E", "69"],
    ["F", "70"],
    ["G", "71"],
    ["H", "72"],
    ["I", "73"],
    ["J", "74"],
    ["K", "75"],
    ["L", "76"],
    ["M", "77"],
    ["N", "78"],
    ["O", "79"],
    ["P", "80"],
    ["Q", "81"],
    ["R", "82"],
    ["S", "83"],
    ["T", "84"],
    ["U", "85"],
    ["V", "86"],
    ["W", "87"],
    ["X", "88"],
    ["Y", "89"],
    ["Z", "90"],
    ["0", "48"],
    ["1", "49"],
    ["2", "50"],
    ["3", "51"],
    ["4", "52"],
    ["5", "53"],
    ["6", "54"],
    ["7", "55"],
    ["8", "56"],
    ["9", "57"],
    ["F1", "112"],
    ["F2", "113"],
    ["F3", "114"],
    ["F4", "115"],
    ["F5", "116"],
    ["F6", "117"],
    ["F7", "118"],
    ["F8", "119"],
    ["F9", "120"],
    ["F10", "121"],
    ["F11", "122"],
    ["F12", "123"],
];

try {
Blockly.Extensions.register('single_character_validation', function() {
    this.getField('KEY').setValidator(function(newValue) {
        return newValue.substring(Math.max(newValue.length - 1, 0),newValue.length);
    });
});
} catch {
    console.log("Reload")
}

export default register;
