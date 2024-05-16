class Strings2 {
    info() {
      return {
        id: 'strings2example',
        name: 'Encoding',
        blocks: [
          {
            id: 'convert',
            type: EaglerBuilder.BlockType.REPORTER,
            text: 'convert [TEXT] to [FORMAT]',
            arguments: {
              TEXT: {
                type: EaglerBuilder.ArgumentType.STRING,
                default: 'Apple'
              },
              FORMAT: {
                type: EaglerBuilder.ArgumentType.MENU,
                menu: 'FORMAT_MENU'
              }
            },
            func: (args) => {
                if (args.FORMAT === 'up') {
                  return `${args.TEXT}.toUpperCase()`;
                } else {
                  return `${args.TEXT}.toLowerCase()`;
                }
            }
          }
        ],
        menus: {
          FORMAT_MENU: [
            {
                text: 'uppercase',
                value: 'up'
            },
            {
                text: 'lowercase',
                value: 'low'
            }  
          ]
        }
      };
    }
}

EaglerBuilder.extensions.register(new Strings2());