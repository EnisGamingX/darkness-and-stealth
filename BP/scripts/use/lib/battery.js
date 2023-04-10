import { world, Player, BeforeItemUseEvent, Container } from '@minecraft/server';

class loreItem {
    constructor(id, lore) {
        this.id = id;
        this.lore = lore;
    }
}

const items = [
    new loreItem("id", ["lore"])
]

let batteries = [
    [
        "darknessandstealth:small_battery_empty",
        "darknessandstealth:larger_battery_empty",
        "darknessandstealth:large_battery_empty"
    ],
    [
        "darknessandstealth:infinite_battery",
        "darknessandstealth:large_battery",
        "darknessandstealth:larger_battery",
        "darknessandstealth:small_battery"
    ]
]

/**
 * @param {BeforeItemUseEvent} data 
 * @param {number} size
 */
function setBattery(data, size) {
    let player = world.getAllPlayers().find(player => player == data.source)
    /**
     * @type {Container}
     */
    let container = player.getComponent("minecraft:inventory").container
    let lore = container.getItem(player.selectedSlot).getLore()[0]
    if (lore == undefined && data.item.typeId !== "darknessandstealth:infinite_battery") return;
    let de; try { de = parseInt(lore.replace(`${lore[0]}${lore[1]}${lore[2]}${lore[3]}`, "").replace("Dark Energy [DE]")) } catch (e) { }
    container.clearItem(player.selectedSlot)
    if (size == -1) { player.setDynamicProperty("de", -1) }
    else { player.setDynamicProperty("de", de) }
    player.setDynamicProperty("battery", size)
    world.playSound("mob.horse.armor", {"location": player.location, "volume": 0.8})
}

/**
 * @param {BeforeItemUseEvent} data
 */
export function battery(data) {
    let size = data.source.getDynamicProperty("battery")
    let de = data.source.getDynamicProperty("de")
    /**
     * @type {Player}
     */
    let player = data.source;
    if (!batteries[0].includes(data.item.typeId) && !batteries[1].includes(data.item.typeId)) {
        return;
    }
    else if (size !== undefined && size !== 0) {
        return player.sendMessage("§cYou can't equip two Batteries");
    }
    else if (batteries[0].includes(data.item.typeId)) {
        return player.sendMessage("§cYou can't equip an Empty Battery");
    }

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