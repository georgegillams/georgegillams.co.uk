class CalculationHelpers {
  static calculateValue(
    percentage,
    startPercentage,
    endPercentage,
    startValue,
    endValue,
  ) {
    if (percentage < startPercentage) return startValue;
    if (percentage > endPercentage) return endValue;

    const range = endPercentage - startPercentage;
    const startValueProportion =
      (range - (percentage - startPercentage)) * startValue;
    const endValueProportion = (percentage - startPercentage) * endValue;
    const top = startValueProportion + endValueProportion;

    return top / range;
  }
}

module.exports = CalculationHelpers;
