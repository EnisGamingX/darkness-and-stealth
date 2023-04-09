import { system } from "@minecraft/server";
/**
 * @param {() => void} callback A function that is called after the given tickDelay.
 * @param {number} tickDelay The delay in ticks to wait for.
 * @example
 * console.warn("Before") //executes immediately.
 * tickTimeout(() => {
 *     console.warn("After") //executes after the 10 ticks have passed.
 * }, 10)
 */
export const tickTimeout = (callback, tickDelay) => {
    const runId = system.runInterval(() => {
        callback();
        system.clearRun(runId);
    }, tickDelay);
};