import { Player, Container, Items, ItemStack, world } from '@minecraft/server'
import * as ui from '@minecraft/server-ui';

/**
 * @param {number} size
 * @param {number} de
 * @param {Player} player
 */
export function equipment(size, de, player) {
    let equip = new ui.ActionFormData()
    let info;
    equip.title("§3Equipment")
    equip.body("§3Click to unequip")
    if ((size == undefined) || (size == 0)) { equip.button("§7You don't have a battery", "textures/items/batteries/battery_cell") }
    else if (size == -1) {
        equip.button(`§dInfinite Battery`, "textures/items/batteries/infinite_battery")
        info = ["darknessandstealth:infinite_battery"]
    } else if (size == 1) {
        if (de == 0) {
            equip.button(`§cSmall Battery\n§3${de} [DE]`, "textures/items/batteries/small_battery_empty")
            info = ["darknessandstealth:small_battery_empty"]
        } else {
            equip.button(`§cSmall Battery\n§3${de} [DE]`, "textures/items/batteries/small_battery")
            info = ["darknessandstealth:small_battery"]
        }
    } else if (size == 2) {
        if (de == 0) {
            equip.button(`§6Larger Battery\n§3${de} [DE]`, "textures/items/batteries/larger_battery_empty")
            info = ["darknessandstealth:larger_battery_empty"]
        } else {
            equip.button(`§6Larger Battery\n§3${de} [DE]`, "textures/items/batteries/larger_battery")
            info = ["darknessandstealth:larger_battery"]
        }
    } else if (size == 3) {
        if (de == 0) {
            equip.button(`§2Large Battery\n§3${de} [DE]`, "textures/items/batteries/large_battery_empty")
            info = ["darknessandstealth:large_battery_empty"]
        } else {
            equip.button(`§2Large Battery\n§3${de} [DE]`, "textures/items/batteries/large_battery")
            info = ["darknessandstealth:large_battery"]
        }
    }
    equip.show(player).then((result) => {
        /**
         * @type {Container}
         */
        let container = player.getComponent("inventory").container
        player.sendMessage(`${result.selection}`)
        if (result.selection === 0) {
            if (de == -1) {
                container.addItem(new ItemStack(Items.get(info[0]), 1))
                player.setDynamicProperty("de", 0)
                player.setDynamicProperty("battery", 0)
                world.playSound("mob.horse.leather", {"location": player.location, "volume": 0.8})
            } else {
                let item = new ItemStack(Items.get(info[0]), 1)
                item.setLore([`§r§3${de} Dark Energy [DE]`])
                container.addItem(item)
                player.setDynamicProperty("de", 0)
                player.setDynamicProperty("battery", 0)
                world.playSound("mob.horse.leather", {"location": player.location, "volume": 0.8})
            }
        }
    })
}