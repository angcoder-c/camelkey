import chalk from "chalk";

export function green (text) {
    let [r, g, b] = [95,255,175];
    return chalk.rgb(r, g, b).bold(text);
}

export function bgGreen (text) {
    let [r, g, b] = [95,255,175];
    return chalk.bgRgb(r, g, b).hex('#000').bold(text)
}

export function red (text) {
    let [r, g, b] = [255,95,135]
    return chalk.rgb(r, g, b).bold(text);
}

export function blue (text) {
    let [r, g, b] = [135,175,255]
    return chalk.rgb(r, g, b).bold(text);
}