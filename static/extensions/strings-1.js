class Strings1 {
    info() {
      return {
        id: 'strings1example',
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
                if (args.FORMAT === 'uppercase') {
                  return `${args.TEXT}.toUpperCase()`;
                } else {
                  return `${args.TEXT}.toLowerCase()`;
                }
            }
          }
        ],
        menus: {
          FORMAT_MENU: ['uppercase', 'lowercase']
        }
      };
    }
}

EaglerBuilder.extensions.register(new Strings1());