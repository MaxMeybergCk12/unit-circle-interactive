export function getAngle(angle: number) {
    const degrees = angle * 180 / Math.PI;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return { angle, degrees, cos, sin };
}