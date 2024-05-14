class HelloWorld {
    info() {
      return {
        id: 'helloworld',
        name: 'It works!',
        blocks: [
          {
            id: 'hello',
            type: EaglerBuilder.BlockType.REPORTER,
            text: 'Hello!',
            func: () => {
                return '"World!"';
            }
          }
        ]
      };
    }
}
  
EaglerBuilder.extensions.register(new HelloWorld());