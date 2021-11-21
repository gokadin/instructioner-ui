export const numStarsForScore = (score: number) => {
    if (score >= 90) {
        return 3
    }

    if (score >= 50) {
        return 2
    }

    if (score >= 1) {
        return 1
    }

    return 0
}
