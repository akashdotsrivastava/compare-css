import { isNil, equals } from "ramda";
import evaluateCSS from "./evaluateCss";

const isEquivalentCss = (css1, css2) => {
  if (isNil(css1) || isNil(css2)) {
    throw new Error(
      "isEquivalentCss: css1 and css2 must not be null or undefined"
    );
  }

  const [css1ParsingError, styleList1] = evaluateCSS(css1);
  if (css1ParsingError) {
    throw new Error(`isEquivalentCss: css1 parsing error: ${css1ParsingError}`);
  }

  const [css2ParsingError, styleList2] = evaluateCSS(css2);
  if (css2ParsingError) {
    throw new Error(`isEquivalentCss: css2 parsing error: ${css2ParsingError}`);
  }

  return equals(styleList1, styleList2);
};

export default isEquivalentCss;
