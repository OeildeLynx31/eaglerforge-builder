class GameSettings {
    info() {
      return {
        id: 'gamesettings',
        name: 'Game Settings',
        color: '#999999',
        blocks: [
          {
            id: 'setnumsetting',
            type: EaglerBuilder.BlockType.COMMAND,
            text: 'set [setting] (number) to [value]',
            arguments: {
              setting: {
                type: EaglerBuilder.ArgumentType.MENU,
                menu: "ALL_NUMBER_GAME_SETTINGS"
              },
              value: {
                type: EaglerBuilder.ArgumentType.NUMBER,
                default: 10
              }
            },
            func: (args) => {
                return `ModAPI.settings.${args.setting} = ${args.value}`;
            }
          },
          {
            id: 'setboolsetting',
            type: EaglerBuilder.BlockType.COMMAND,
            text: 'set [setting] (boolean) to [value]',
            arguments: {
              setting: {
                type: EaglerBuilder.ArgumentType.MENU,
                menu: "ALL_BOOLEAN_GAME_SETTINGS"
              },
              value: {
                type: EaglerBuilder.ArgumentType.BOOLEAN
              }
            },
            func: (args) => {
                return `ModAPI.settings.${args.setting} = ${args.value}`;
            }
          },
          {
            id: 'getsetting',
            type: EaglerBuilder.BlockType.REPORTER,
            text: 'get [setting]',
            arguments: {
              setting: {
                type: EaglerBuilder.ArgumentType.MENU,
                menu: "ALL_TEXTUAL_GAME_SETTINGS"
              }
            },
            func: (args) => {
                return `ModAPI.settings.${args.setting}`;
            }
          },
          {
            id: 'settingisenabled',
            type: EaglerBuilder.BlockType.BOOLEAN,
            text: '[setting] is enabled?',
            arguments: {
              setting: {
                type: EaglerBuilder.ArgumentType.MENU,
                menu: "ALL_BOOLEAN_GAME_SETTINGS"
              }
            },
            func: (args) => {
                return `ModAPI.settings.${args.setting}`;
            }
          },
        ],
        menus: {
          ALL_NUMBER_GAME_SETTINGS: [
            {
              text: "Render Distance",
              value: "renderDistanceChunks"
            },
            {
              text: "Mouse Sensitivity",
              value: "mouseSensitivity"
            },
            {
              text: "FOV",
              value: "fovSetting"
            },
          ],
          ALL_BOOLEAN_GAME_SETTINGS: [
            {
              text: "Inverted Mouse",
              value: "invertMouse"
            },
            {
              text: "Hidden Gui",
              value: "hideGUI"
            }
          ],
          ALL_TEXTUAL_GAME_SETTINGS: [
            {
              text: "Render Distance",
              value: "renderDistanceChunks"
            },
            {
              text: "Mouse Sensitivity",
              value: "mouseSensitivity"
            },
            {
              text: "FOV",
              value: "fovSetting"
            },
          ]
        }
      };
    }
}
  
EaglerBuilder.extensions.register(new GameSettings());