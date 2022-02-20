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

console.log(isEquivalentCss("p { border: 1px; }", "p { border: 2px; }"));
// => false

const css1 = `
  .a {
      color: red;
      height: 100px;
  }
  .b {
      color: red;
      background-color: white;
      height: 30px;
  }
`;

const css2 = `
  .b {
      height: 30px;
      background-color: white;
  }
  .a {
      height: 100px;
  }
  .b,
  .a {
      color: red;
  }
`;

console.log(isEquivalentCss(css1, css2));
// => true
```
