export function valuePercent(value){
    return Math.round((valueAdjust(value) * 100) / 1024);
}
export function valueAdjust(value){
return (1024 - value);
}
