class NorExample {
    info() {
      return {
        id: 'norexample',
        name: 'Nor',
        blocks: [
          {
            id: 'nor',
            type: EaglerBuilder.BlockType.BOOLEAN,
            text: '[A] nor [B]',
            arguments: {
              A: {
                type: EaglerBuilder.ArgumentType.BOOLEAN
              },
              B: {
                type: EaglerBuilder.ArgumentType.BOOLEAN,
              }
            },
            func: (args) => {
                return `!(${args.A} || ${args.B})`;
            }
          }
        ]
      };
    }
}

EaglerBuilder.extensions.register(new NorExample());