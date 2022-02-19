# compare-css

Tests whether two pieces of CSS text are equivalent.

## Installation

Using npm:

    npm install compare-css

Using yarn:

    yarn add compare-css

## Usage

```javascript
import isEquivalentCss from "compare-css";

const css1 = `
.a {
    color: red;
    height: '100px';
}
.b {
    color: red;
    height: '30px';
}
`;

const css2 = `
.b {
    height: '30px';
}
.a {
    height: '100px';
}
.b,
.a {
    color: red;
}
`;

console.log(isEquivalentCss(css1, css2));
// => true
```
