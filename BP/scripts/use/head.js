import { world } from '@minecraft/server'

import { controller } from './lib/controller.js'
import { battery } from './lib/battery.js'
//import { scroll } from './lib/scroll.js'

world.events.beforeItemUse.subscribe((data) => {
    controller(data)
    battery(data)
    //scroll(data)
})