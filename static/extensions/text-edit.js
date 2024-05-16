class TextEdit {
    info() {
      return {
        id: 'textedit',
        name: 'Text Edit',
        color: "#00ff00",
        blocks: [
          {
            id: 'replaceinwith',
            type: EaglerBuilder.BlockType.REPORTER,
            text: 'replace [string] in [text] with [replace]',
            arguments: {
                string: {
                    type: EaglerBuilder.ArgumentType.STRING,
                    default: "Hello"
                },
                text: {
                    type: EaglerBuilder.ArgumentType.STRING,
                    default: "Hello, world!"
                },
                replace: {
                    type: EaglerBuilder.ArgumentType.STRING,
                    default: "Goodbye"
                }
            },
            func: (args) => {
                return `${args.text}.replace(new RegExp(${args.string},'g'),${args.replace})`;
            }
          },
          {
            id: 'lettersfromtoof',
            type: EaglerBuilder.BlockType.REPORTER,
            text: 'letters from [start] to [end] of [text]',
            arguments: {
                start: {
                    type: EaglerBuilder.ArgumentType.NUMBER,
                    default: 1
                },
                end: {
                    type: EaglerBuilder.ArgumentType.NUMBER,
                    default: 3
                },
                text: {
                    type: EaglerBuilder.ArgumentType.STRING,
                    default: "Banana"
                }
            },
            func: (args) => {
                return `${args.text}.substring(${args.start}-1,${args.end})`;
            }
          },
          {
            id: 'removeletterof',
            type: EaglerBuilder.BlockType.REPORTER,
            text: 'remove letter [index] of [text]',
            arguments: {
                index: {
                    type: EaglerBuilder.ArgumentType.NUMBER,
                    default: 3
                },
                text: {
                    type: EaglerBuilder.ArgumentType.STRING,
                    default: "Pineapple"
                }
            },
            func: (args) => {
                return `${args.text}.slice(0, ${args.index} - 1) + ${args.text}.slice(${args.index})`;
            }
          },
          {
            id: 'removelettersfromtoof',
            type: EaglerBuilder.BlockType.REPORTER,
            text: 'remove letters from [start] to [end] of [text]',
            arguments: {
                start: {
                    type: EaglerBuilder.ArgumentType.NUMBER,
                    default: 1
                },
                end: {
                    type: EaglerBuilder.ArgumentType.NUMBER,
                    default: 3
                },
                text: {
                    type: EaglerBuilder.ArgumentType.STRING,
                    default: "Grape"
                }
            },
            func: (args) => {
                return `${args.text}.slice(0, ${args.start} - 1) + ${args.text}.slice(${args.end})`;
            }
          },
          {
            id: 'convert',
            type: EaglerBuilder.BlockType.REPORTER,
            text: 'convert [text] to [format]',
            arguments: {
                text: {
                    type: EaglerBuilder.ArgumentType.STRING,
                    default: "Apple"
                },
                format: {
                  type: EaglerBuilder.ArgumentType.MENU,
                  menu: 'FORMAT_MENU'
                }
            },
            func: (args) => {
                return `${args.text}.${args.format}()`;
            }
          }
        ],
        menus: {
            FORMAT_MENU: [
                {
                    text: "uppercase",
                    value: "toUpperCase"
                },
                {
                    text: "lowercase",
                    value: "toLowerCase"
                }
            ]
        }
      };
    }
}
  
EaglerBuilder.extensions.register(new TextEdit());