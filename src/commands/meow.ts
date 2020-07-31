import { botCache } from "../../mod.ts";

botCache.commands.set('meow', {
    callback: (message) => {
        return message.channel.sendMessage(
            'MEOWWW!!!',
        );
    },
});
