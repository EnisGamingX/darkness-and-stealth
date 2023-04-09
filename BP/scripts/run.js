import { world } from "@minecraft/server";

world.events.beforeChat.subscribe((data) => {
    if (!data.message.toLocaleLowerCase().startsWith("#runscript")) return;
    data.cancel = true;
    let player = data.sender;
    try { player.sendMessage(JSON.stringify(eval(data.message))) }
    catch (e) { player.sendMessage("§cError:§r\n" + JSON.stringify(e)) }
})