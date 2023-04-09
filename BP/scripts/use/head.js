import { world } from '@minecraft/server'

import { battery } from './lib/battery.js'
//import { scroll } from './lib/scroll.js'

world.events.beforeItemUse.subscribe((data) => {
    battery(data)
    //scroll(data)
})