# Preferred

**Preferred** is a JavaScript library for working with 
[preferred numbers](https://en.wikipedia.org/wiki/Preferred_number).

Preferred numbers are sequences of numbers like the `1-2-5` series, which is a sequence of numbers repeating
in multiples of 10, so it would look like `1 2 5 10 20 50 100 200 500 ...` etc.

This library offers functionality for defining such a sequence and then efficiently finding the closest
number to a given query value.

## Installation

### Node JS
```bash
$ npm install preferred
```
```js
const preferred = require('preferred');

const seq = preferred.oneTwoFive();
```

### Browser

Download the 
[browser version](https://raw.githubusercontent.com/EdeMeijer/preferred/master/dist/preferred.bundle.js)

```html
<script src="preferred.bundle.js"></script>

<script>
    const seq = Preferred.oneTwoFive();
</script>
```

## Usage

### Create a sequence

There are a few predefined common sequences
```js
// ... 0.1 0.2 0.5 1 2 5 10 20 50 ...
const seq = preferred.oneTwoFive();

// ... 0.01 0.1 1 10 100 ...
const seq = preferred.powerOfTen();

// ... 1/8 1/4 1/2 1 2 4 8 ...
const seq = preferred.powerOfTwo();
```

But you can create your own sequences as you like
```js
// ... 0.1 0.25, 0.6 1 2.5 6 10 25 60 ...
const seq = preferred.sequence([1, 2.5, 6]);

// Fancy octal sequence
// ... 1 5 8 40 64 320  ...
// Or in octal: ... 01 05 010 050 0100 0500  ...
const seq = preferred.sequence([1, 5], 8); // Base 8

// Or hexadecimal sequence
// ... 1 3 11 16 48 176  ...
// Or in hex: ... 0x1 0x3 0xB 0x10 0x30 0xB0  ...
const seq = preferred.sequence([0x1, 0x3, 0xB], 0x10); // Base 16

```

### Use a created sequence

**Round a value to the nearest number**
```js
const seq = preferred.oneTwoFive();
console.log(seq.round(74)); // 50
console.log(seq.round(76)); // 100
```

**Round a value to the nearest number in log space**
```js
// Base 100 makes this easy to test
const seq = preferred.sequence([1], 100);
console.log(seq.round(9.99)); // 1
console.log(seq.round(10.01)); // 100
```

**Round a value down or up to the nearest number**
```js
const seq = preferred.oneTwoFive();
console.log(seq.floor(9.99)); // 5
console.log(seq.ceil(10.01)); // 20
```

**A slightly more efficient way to call both `floor` and `ceil` on the same number**
```js
const seq = preferred.oneTwoFive();
console.log(seq.bounds(7)); // { floor: 5, ceil: 10 }
```

# License

MIT - See LICENSE file
