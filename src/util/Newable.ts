export function isNewable<T>(arg: any): arg is new (...args: any[]) => T {
    return typeof arg === 'function' && !!arg.prototype && !!arg.prototype.constructor.name;
}
