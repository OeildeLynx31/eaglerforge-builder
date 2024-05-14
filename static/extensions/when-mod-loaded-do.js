class WhenModLoadedDo {
    info() {
      return {
        id: 'eventexample',
        name: 'Event Block Example',
        blocks: [
          {
            id: 'modload',
            type: EaglerBuilder.BlockType.EVENT,
            text: 'when mod loaded do',
            func: (args, innercode) => {
                return `${innercode.indexOf('await') > -1 ? 'async' : ''} function onload() {\n${innercode}}`;
            }
          }
        ]
      };
    }
}
  
EaglerBuilder.extensions.register(new WhenModLoadedDo());