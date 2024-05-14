class SampleExtension {
    info() {
      return {
        "name": "Sample Extension",
        "id": "sample",
        "blocks": [{
            "type": EaglerBuilder.BlockType.COMMAND,
            "id": "cool",
            "text": "My Cool Block [cooly]",
            "arguments": {
                cooly: {
                    "type": EaglerBuilder.ArgumentType.STRING,
                    "default": "hi"
                }
            },
            "func": (args) => {
                return `console.log(${args.cooly})`;
            }
        },
        {
            "type": EaglerBuilder.BlockType.COMMAND,
            "id": "waitif",
            "text": "wait [time] seconds if [condition]",
            "arguments": {
                time: {
                    "type": EaglerBuilder.ArgumentType.NUMBER
                },
                condition: {
                    "type": EaglerBuilder.ArgumentType.BOOLEAN
                }
            },
            "func": (args) => {
                return `if (${args.condition}) {await new Promise(resolve => setTimeout(resolve, ${args.time * 1000}))}`;
            }
        },
        {
            "type": EaglerBuilder.BlockType.COMMAND,
            "id": "test",
            "text": "test menu [menu]",
            "arguments": {
                menu: {
                    "type": EaglerBuilder.ArgumentType.MENU,
                    "menu": "test",
                }
            },
            "func": (args) => {
                return `console.log("${args.menu}")`;
            }
        },
        {
            "type": EaglerBuilder.BlockType.BOOLEAN,
            "id": "getpropertyboolean",
            "text": "get player property [PROPERTIES]",
            "arguments": {
                PROPERTIES: {
                    "type": EaglerBuilder.ArgumentType.MENU,
                    "menu": "is",
                }
            },
            "func": (args) => {
                const PROPERTY = args.PROPERTIES;
                let code;
                if (PROPERTY === "isdead") {
                    code = 'ModAPI.player.isDead';
                } else if (PROPERTY === "isinvisible") {
                   code = `ModAPI.player.isInvisible()`
                } else if (PROPERTY === "isinweb") {
                    code = `ModAPI.player.isInWeb`
                } else if (PROPERTY === "issprinting") {
                    code = `ModAPI.player.isSprinting()`
                } else if (PROPERTY === "issneaking") {
                    code = `ModAPI.player.isSneaking()`
                } else if (PROPERTY === "issilent") {
                    code = `ModAPI.player.isSilent()`
                } else if (PROPERTY === "canedit") {
                    code = `ModAPI.player.isAllowEdit()`
                } else if (PROPERTY === "onground") {
                    code = `ModAPI.player.onGround`
                } else if (PROPERTY === "isdead") {
                    code = `ModAPI.player.isDead`
                } else if (PROPERTY === "ismoving") {
                    code = `ModAPI.player.isMoving()`
                }
                return code;
            }
        },
        {
            "type": EaglerBuilder.BlockType.EVENT,
            "id": "delayif",
            "text": "delay [time] seconds if [condition]",
            "arguments": {
                time: {
                    "type": EaglerBuilder.ArgumentType.NUMBER
                },
                condition: {
                    "type": EaglerBuilder.ArgumentType.BOOLEAN
                }
            },
            "func": (args,innercode) => {
                return `if (${args.condition}) {
                    setTimeout(() => {${innercode}}, ${args.time * 1000})
                }`;
            }
        }],
        "menus": {
            "test": [
                "test",
                {
                    "text": "different",
                    "value": "menu"
                }
            ],
            "is": [
                {
                    "text": "is dead",
                    "value": "isdead"
                },
                {
                    "text": "is invisible",
                    "value": "isinvisible"
                },
                {
                    "text": "is in web",
                    "value": "isinweb"
                },
                {
                    "text": "is sprinting",
                    "value": "issprinting"
                },
                {
                    "text": "is sneaking",
                    "value": "issneaking"
                },
                {
                    "text": "is silent",
                    "value": "issilent"
                },
                {
                    "text": "can edit",
                    "value": "canedit"
                },
                {
                    "text": "on ground",
                    "value": "onground"
                },
                {
                    "text": "is moving",
                    "value": "ismoving"
                },
            ]
        }
      };
    }
}

EaglerBuilder.extensions.register(new SampleExtension());