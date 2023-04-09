import { world, BlockBreakEvent, Container, Player, Dimension, Vector3, Block, system } from '@minecraft/server'
import * as config from './config.js'
import { tickTimeout } from '../libs/delay.js';
/**
 * @param {BlockBreakEvent} data 
 */
export function veinminer(data) {
    /**
     * @type {Container}
     */
    let container = data.player.getComponent("minecraft:inventory").container;
    if (!container.getItem(data.player.selectedSlot).hasComponent("minecraft:pickaxe")
        || !container.getItem(data.player.selectedSlot).hasComponent("minecraft:axe")) return;
    if (!config.all.includes(data.block.typeId)) return;
    let player = data.player;
    if (!container.getItem(data.player.selectedSlot).hasComponent("minecraft:pickaxe") || !container.getItem(data.player.selectedSlot).hasComponent("minecraft:axe")) return;
    
    breaker(data, container, player)
}

/**
 * 
 * @param {Vector3} initialPos 
 * @param {Dimension} dim
 */
function breaker(initialPos, dim) {
    /**
     * @type Block[]
     */
    let adjacentBlocks = [];

    for (let x = initialPos.x - 1; x <= initialPos.x + 1; x++) {
        for (let y = initialPos.y - 1; y <= initialPos.y + 1; y++) {
            for (let z = initialPos.z - 1; z <= initialPos.z + 1; z++) {
                // Skip the initial block itself
                if (x === initialPos.x && y === initialPos.y && z === initialPos.z) {
                    continue;
                }

                // Get the block at the current position
                const block = dim.getBlock({ "x": x, "y": y, "z": z });

                // If the block is not air, add its position to the array
                if (block.id !== 0) {
                    adjacentBlocks.push({ "x": x, "y": y, "z": z });
                }
            }
        }
    }

    for (let i = 0; i < adjacentBlocks.length; i++) {
        const adjBlock = adjacentBlocks[i];

        for (let dx = -1; dx <= 1; dx += 2) {
            for (let dz = -1; dz <= 1; dz += 2) {
                const diagBlock = { "x": adjBlock.x + dx, "y": adjBlock.y, "z": adjBlock.z + dz };
                const block = dim.getBlock({ "x": diagBlock.x, "y": diagBlock.y, "z": diagBlock.z });

                if (block.typeId == dim.getBlock(initialPos).typeId && !adjacentBlocks.some(b => b.x === diagBlock.x && b.y === diagBlock.y && b.z === diagBlock.z)) {
                    adjacentBlocks.push(diagBlock);
                }
            }
        }
    }

    adjacentBlocks.forEach(block => {
        tickTimeout(() => {
            dim.runCommandAsync("setblock ~~~ air [] destroy")
        }, 1)
    });
    return adjacentBlocks;
}