import { world, Player, BeforeItemUseEvent, Container, BeforeChatEvent } from '@minecraft/server';

/**
 * @param {BeforeItemUseEvent} data 
 * @param {number} size
 */
function setBattery(data, size) {
    let player = world.getAllPlayers().find(player => player == data.source)
    /**
     * @type {Container}
     */
    let container = player.hasComponent("minecraft:inventory")
    let lore = container.getItem(player.selectedSlot).getLore()[0]
    let me = parseInt(lore.replace(`${lore[0]}${lore[1]}`, ""))
    container.clearItem(player.selectedSlot)
    if (size == -1) { player.setDynamicProperty("me", -1) }
    else { player.setDynamicProperty("me", me) }
    player.setDynamicProperty("battery", size)
}

/**
 * @param {BeforeChatEvent} data
 */
export function battery(data) {
    if ((!data.source.getDynamicProperty("battery") == 0) || (data.source.getDynamicProperty("battery") == undefined)) {
        /**
         * @type Player
         */
        let player = data.source;
        player.sendMessage("§cYou can't equip two Batteries");
    }
    else if (data.item.typeId.startsWith("darknessandstealth:") &&
        data.item.typeId.endsWith("_battery_empty")) {
        /**
         * @type Player
         */
        let player = data.source;
        player.sendMessage("§cYou can't equip an Empty Battery");
    }
    else if (!data.item.typeId.startsWith("darknessandstealth:") &&
        !data.item.typeId.endsWith("_battery")) { return };

    if (data.item.typeId == "darknessandstealth:small_battery") {
        setBattery(data, 1)
    } else if (data.item.typeId == "darknessandstealth:larger_battery") {
        setBattery(data, 2)
    } else if (data.item.typeId == "darknessandstealth:large_battery") {
        setBattery(data, 3)
    } else if (data.item.typeId == "darknessandstealth:infinite_battery") {
        setBattery(data, -1)
    }
}