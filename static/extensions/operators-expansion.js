class OperatorsExpansion {
    info() {
      return {
        id: 'operatorsexpansion',
        name: 'Operators Expansion',
        color: "#59C059",
        blocks: [
          {
            id: 'nand',
            type: EaglerBuilder.BlockType.BOOLEAN,
            text: '[A] nand [B]',
            arguments: {
              A: {
                type: EaglerBuilder.ArgumentType.BOOLEAN
              },
              B: {
                type: EaglerBuilder.ArgumentType.BOOLEAN,
              }
            },
            func: (args) => {
                return `!(${args.A} && ${args.B})`;
            }
          },
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
          },
          {
            id: 'xor',
            type: EaglerBuilder.BlockType.BOOLEAN,
            text: '[A] xor [B]',
            arguments: {
              A: {
                type: EaglerBuilder.ArgumentType.BOOLEAN
              },
              B: {
                type: EaglerBuilder.ArgumentType.BOOLEAN,
              }
            },
            func: (args) => {
                return `(${args.A} || ${args.B}) && !(${args.A} && ${args.B})`;
            }
          },
          {
            id: 'lessthanorequalto',
            type: EaglerBuilder.BlockType.BOOLEAN,
            text: '[A] <= [B]',
            arguments: {
              A: {
                type: EaglerBuilder.ArgumentType.BOOLEAN
              },
              B: {
                type: EaglerBuilder.ArgumentType.BOOLEAN,
              }
            },
            func: (args) => {
                return `${args.A} <= ${args.B}`;
            }
          },
          {
            id: 'greaterthanorequalto',
            type: EaglerBuilder.BlockType.BOOLEAN,
            text: '[A] >= [B]',
            arguments: {
              A: {
                type: EaglerBuilder.ArgumentType.BOOLEAN
              },
              B: {
                type: EaglerBuilder.ArgumentType.BOOLEAN,
              }
            },
            func: (args) => {
                return `${args.A} >= ${args.B}`;
            }
          },
          
          {
            id: 'contains',
            type: EaglerBuilder.BlockType.BOOLEAN,
            text: '[A] contains [B]?',
            arguments: {
              A: {
                type: EaglerBuilder.ArgumentType.STRING,
                default: "Apple"
              },
              B: {
                type: EaglerBuilder.ArgumentType.STRING,
                default: "Banana"
              }
            },
            func: (args) => {
                return `${args.A}.includes(${args.B})`;
            }
          }
        ]
      };
    }
}

EaglerBuilder.extensions.register(new OperatorsExpansion());