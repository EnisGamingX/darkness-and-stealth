//!   Wood   !//////////////////////////////////////////////
export const overworld_wood = [
    "minecraft:log" + ":0", // Oak Log
    "minecraft:log" + ":1", // Spruce
    "minecraft:log" + ":2", // Birch
    "minecraft:log" + ":3", // Jungle
    "minecraft:log2" + ":0", // Acacia
    "minecraft:log2" + ":1", // Dark Oak
    "minecraft:mangrove_log"
]

export const nether_wood = [
    "minecraft:warped_stem",
    "minecraft:crimson_stem"
]

export const end_wood = [
    // Currently None
]

//!   Ores   !//////////////////////////////////////////////
export const overworld_ores = [
    "minecraft:coal_ore",
    "minecraft:copper_ore",
    "minecraft:iron_ore",
    "minecraft:gold_ore",
    "minecraft:lapis_ore",
    "minecraft:emerald_ore",
    "minecraft:diamond_ore"
]

export const raw_ores = [
    "minecraft:raw_copper_blokc",
    "minecraft:raw_iron_blokc",
    "minecraft:raw_gold_blokc"
]

export const deepslate_ores = [
    "minecraft:deepslate_coal_ore",
    "minecraft:deepslate_copper_ore",
    "minecraft:deepslate_iron_ore",
    "minecraft:deepslate_gold_ore",
    "minecraft:deepslate_lapis_ore",
    "minecraft:deepslate_emerald_ore",
    "minecraft:deepslate_diamond_ore"
]

export const nether_ores = [
    "minecraft:quartz_ore",
    "minecraft:glowstone"
]

export const end_ores = [
    // Currently None
]

//!   Group   !//////////////////////////////////////////////
export const wood = [overworld_wood + nether_wood + end_wood]
export const ores = [overworld_ores + deepslate_ores + raw_ores + nether_ores + end_ores]
export const all = [wood + ores]