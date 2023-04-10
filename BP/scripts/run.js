import { world, Container } from "@minecraft/server";

world.events.beforeChat.subscribe((data) => {
    data.cancel = true;
    let player = data.sender;
    /**
     * @type {Container}
     */
    let container = player.getComponent("inventory").container;
    let item = container.getItem(player.selectedSlot);
    item.setLore([`§r§3` + data.message + " Dark Energy [DE]"])
    container.setItem(player.selectedSlot, item)
})