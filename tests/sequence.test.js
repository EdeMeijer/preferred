const deepClose = require('jest-matcher-deep-close-to');
expect.extend({ toBeDeepCloseTo: deepClose.toBeDeepCloseTo });

const preferred = require('../dist/preferred');

test('sequence', () => {
    const seq = preferred.sequence([3, 7.8]);

    expect(seq.ceil(1)).toBeCloseTo(3);
    expect(seq.floor(1)).toBeCloseTo(0.78);

    expect(seq.bounds(0.5)).toBeDeepCloseTo({ floor: 0.3, ceil: 0.78 });
    expect(seq.bounds(1)).toBeDeepCloseTo({ floor: 0.78, ceil: 3 });
    expect(seq.bounds(3)).toBeDeepCloseTo({ floor: 3, ceil: 3 });
    expect(seq.bounds(4)).toBeDeepCloseTo({ floor: 3, ceil: 7.8 });
    expect(seq.bounds(79)).toBeDeepCloseTo({ floor: 78, ceil: 300 });
});

test('power of 2', () => {
    const seq = preferred.powerOfTwo();

    expect(seq.bounds(0.4)).toBeDeepCloseTo({ floor: 0.25, ceil: 0.5 });
    expect(seq.bounds(0.7)).toBeDeepCloseTo({ floor: 0.5, ceil: 1 });
    expect(seq.bounds(1.0)).toBeDeepCloseTo({ floor: 1, ceil: 1 });
    expect(seq.bounds(1.001)).toBeDeepCloseTo({ floor: 1, ceil: 2 });
    expect(seq.bounds(1.999)).toBeDeepCloseTo({ floor: 1, ceil: 2 });
    expect(seq.bounds(2)).toBeDeepCloseTo({ floor: 2, ceil: 2 });
    expect(seq.bounds(100)).toBeDeepCloseTo({ floor: 64, ceil: 128 });
});

test('round linearly', () => {
    const seq = preferred.oneTwoFive();

    expect(seq.round(1.49)).toBeCloseTo(1.0);
    expect(seq.round(1.5)).toBeCloseTo(2.0);
    expect(seq.round(1.51)).toBeCloseTo(2.0);
});

test('round logarithmically', () => {
    // Base 100 makes this easy to test
    const seq = preferred.sequence([1], 100);

    // Check that close values properly round
    expect(seq.round(99.99, Math.log)).toBeCloseTo(100);
    expect(seq.round(100.01, Math.log)).toBeCloseTo(100);

    // Check that the decision boundary is now defined in log space
    expect(seq.round(9.99, Math.log)).toBeCloseTo(1);
    expect(seq.round(10.01, Math.log)).toBeCloseTo(100);
});
