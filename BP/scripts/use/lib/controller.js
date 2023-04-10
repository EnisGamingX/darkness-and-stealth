import { BeforeItemUseEvent } from '@minecraft/server';
import * as module from './ui/controller.js'
import * as ui from '@minecraft/server-ui';

/**
 * @param {BeforeItemUseEvent} data 
 */
export function controller(data) {
    if (data.item.typeId !== "darknessandstealth:controller") return;
    let player = data.source
    let size = player.getDynamicProperty("battery")
    let de = player.getDynamicProperty("de")
    let main = new ui.ActionFormData()
    main.title("§cController")
    main.button("§3Equipment", "textures/items/batteries/infinite_battery")
    main.show(player).then((result) => {
        if (result.selection === 0) {
            module.equipment(size, de, player)
        }
    })
}
