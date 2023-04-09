import { BeforeItemUseEvent, PlayerInventoryComponentContainer, Player, ItemEnchantsComponent } from "@minecraft/server";

/**
 * @param {BeforeItemUseEvent} data 
 */
export function scroll(data) {
    /**
     * @type {Player}
     */
    let player = data.source
    /**
     * @type {PlayerInventoryComponentContainer}
     */
    let container = player.getComponent("minecraft:inventory").container
    if (!container?.getItem()?.typeId == "darknessandstealth:scroll") return; // rework
    if ((!container?.getItem(player.selectedSlot)?.typeId.endsWith("sword"))
        || (!container?.getItem(player.selectedSlot)?.typeId.endsWith("axe"))
        || (!container?.getItem(player.selectedSlot)?.typeId.endsWith("shovel"))
        || (!container?.getItem(player.selectedSlot)?.typeId.endsWith("hoe"))) return;
    let scroll = container?.getItem()?.getLore()[0] // rework
    /**
     * @type {ItemEnchantsComponent}
     */
    let itemEnchant = container?.getItem(player.selectedSlot)?.getComponent("minecraft:enchantments")
    for (const enchant of itemEnchant.enchantments) {
        if (enchant.type.maxLevel != enchant.level) continue;
        if (enchant.type.id != scroll.replace(scroll[2], scroll[2].toLowerCase()).replace(`${scroll[0] + scroll[1]}`, "")) continue;
        enchant.level = enchant.type.maxLevel + 1
        //player.playSound("") // Enchanting Table Enchant sound
        break;
    }
    return;
}