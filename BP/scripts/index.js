import { world, DynamicPropertiesDefinition, MinecraftEntityTypes } from '@minecraft/server'

import './run.js'
import './use/head.js'
// import './break/head.js'

world.events.worldInitialize.subscribe((data) => {
    let player = new DynamicPropertiesDefinition()
    player.defineNumber("de") // Modern Energy
    player.defineNumber("battery")
    data.propertyRegistry.registerEntityTypeDynamicProperties(player, MinecraftEntityTypes.player)

    //let world = new DynamicPropertiesDefinition()
    //data.propertyRegistry.registerWorldDynamicProperties(world)
})