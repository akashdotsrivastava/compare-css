import { any, all } from "ramda";

const styleRulesList = rule => {
  const ruleStyles = rule.style;
  const { cssText } = ruleStyles;
  const cssRulesMarkedImportant = cssText
    .split(";")
    .filter(propName => propName.includes("!important"))
    .map(broadPropName => broadPropName.split(":")[0].trim().split("-"));

  const isImportant = propName => {
    const propNameBreakdown = propName.split("-");
    return any(
      importantRuleBreakDown =>
        importantRuleBreakDown[0] === propNameBreakdown[0] &&
        all(propChunk => propNameBreakdown.includes(propChunk))(
          importantRuleBreakDown
        )
    )(cssRulesMarkedImportant);
  };

  const rulesList = {};
  for (const ruleName of ruleStyles) {
    rulesList[ruleName] = ruleStyles[ruleName];
    if (isImportant(ruleName)) {
      rulesList[ruleName] += " !important";
    }
  }
  return rulesList;
};

const evaluateCSS = cssCode => {
  const styleList = {};
  let error = false;
  try {
    const doc = document.implementation.createHTMLDocument("");
    const styleElement = document.createElement("style");
    styleElement.textContent = cssCode;
    doc.body.appendChild(styleElement);

    for (const rule of Array.from(styleElement.sheet.cssRules)) {
      switch (rule.type) {
        case 1: // CSSStyleRule
          rule.selectorText.split(",").forEach(individualSelector => {
            styleList[individualSelector.trim()] = {
              ...(styleList[individualSelector.trim()] || {}),
              ...styleRulesList(rule),
            };
          });
          break;
        case 4: //CSSMediaRule
          styleList[`media: ${rule.conditionText}`] = {};
          for (const mediaCssRule of Array.from(rule.cssRules)) {
            mediaCssRule.selectorText.split(",").forEach(individualSelector => {
              styleList[`media: ${rule.conditionText}`][
                individualSelector.trim()
              ] = {
                ...(styleList[`media: ${rule.conditionText}`][
                  individualSelector.trim()
                ] || {}),
                ...styleRulesList(mediaCssRule),
              };
            });
          }
          break;
        default:
        // do nothing
      }
    }
  } catch (err) {
    error = err;
  }
  return [error, styleList];
};

export default evaluateCSS;