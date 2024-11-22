export function adjustCount(count: number): number {
    if (count <= 9) {
        return count;
    }

    let divisor = 2
    while (divisor <= count) {
        const result = Math.floor(count / divisor);
        if (result <= 9) {
            return result;
        }
        divisor += 1
    }

    return 9;
}

export function isBiasSettable(lastBiasTime: number) {
    const currentTime = Date.now();
    const timeSinceLastBias = currentTime - lastBiasTime;

    return timeSinceLastBias < 4000 ? null : currentTime
}

export function isSingleAlphabeticalChar(str: string) {
    return /^[a-zA-Z]$/.test(str);
}