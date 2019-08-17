import lazy from "./lazy";

/**
 * Predefined sequence of [..., 0.01, 0.1, 1, 10, 100, ...]
 */
const powerOfTen = lazy(sequence, [1]);
/**
 * Predefined sequence of [..., 1/4, 1/2, 1, 2, 4, ...]
 */
const powerOfTwo = lazy(sequence, [1], 2);
/**
 * Predefined sequence of [..., 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, ...]
 */
const oneTwoFive = lazy(sequence, [1, 2, 5]);

/**
 * Create a custom sequence
 *
 * @param {Number[]} numbers list of preferred numbers between 0 and base by convention
 * @param base the number base by which we will multiply for each repetition
 *
 * @return {Object}
 */
function sequence (numbers, base = 10) {
    const logNums = numbers.map(num => ({ num, logNum: Math.log(num) }));
    const logBase = Math.log(base);

    function snapInternal (value, logValue, numExponents, roundFn) {
        let best = null;
        let bestDiff = null;

        for (const { num, logNum } of logNums) {
            const targetExponent = (logValue - logNum) / logBase;
            const exponent = roundFn(targetExponent);
            const candidate = num * Math.pow(base, exponent);

            const diff = Math.abs(value - candidate);

            if (best === null || diff < bestDiff) {
                best = candidate;
                bestDiff = diff;
            }
        }

        return best;
    }

    function prepareNumExponents (logValue) {
        return logNums.map(({ num, logNum }) => ({ num, targetExp: (logValue - logNum) / logBase }))
    }

    function snap (value, roundFn) {
        const logValue = Math.log(value);
        return snapInternal(value, logValue, prepareNumExponents(logValue), roundFn);
    }

    return {
        /**
         * Get the highest number in the sequence where number <= value
         *
         * @param {Number} value
         * @return Number
         */
        floor (value) {
            return snap(value, Math.floor);
        },
        /**
         * Get the lowest number in the sequence where number >= value
         *
         * @param {Number} value
         * @return Number
         */
        ceil (value) {
            return snap(value, Math.ceil);
        },
        /**
         * Get both the floor and ceil of a value
         * This is a bit more efficient than calling floor and ceil separately
         *
         * @param {Number} value
         * @return Object with floor and ceil properties
         */
        bounds (value) {
            const logValue = Math.log(value);
            const exp = prepareNumExponents(logValue);

            return {
                floor: snapInternal(value, logValue, exp, Math.floor),
                ceil: snapInternal(value, logValue, exp, Math.ceil)
            }
        },
        /**
         * Round a value to the nearest number in the sequence
         * By default, distance is calculated in linear number space, however, a transformation may be optionally
         * supplied to compare in a projected space. Comparing in log space for example may be more appropriate due to
         * the exponential nature of these sequences.
         *
         * @param {Number} value
         * @param {Function|null} transform optional transformation function to apply before distance comparison
         * @return Number
         */
        round (value, transform = null) {
            const { floor, ceil } = this.bounds(value);

            const cmpFloor = transform === null ? floor : transform(floor);
            const cmpCeil = transform === null ? ceil : transform(ceil);
            const cmpValue = transform === null ? value : transform(value);

            const dFloor = Math.abs(cmpValue - cmpFloor);
            const dCeil = Math.abs(cmpValue - cmpCeil);

            return dCeil <= dFloor ? ceil : floor;
        }
    }
}

export default {
    sequence,
    powerOfTwo,
    powerOfTen,
    oneTwoFive
}
