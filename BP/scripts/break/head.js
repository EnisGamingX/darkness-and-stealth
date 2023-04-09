import { world } from '@minecraft/server'
import { veinminer } from './veinminer.js';

world.events.blockBreak.subscribe((data) => {
    veinminer(data);
})