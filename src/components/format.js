export default function formatDecimal(value, decimals, keepZero) {
    var mul = new String("1");
    var zero = new String("0");
    for (let i = decimals; i > 0; i--) {
      mul += zero;
    }
    value = Math.round(value * mul);
    value = value / mul;
    var strVal = new String(value);
    if (!keepZero) {
      return strVal;
    }
  
    var nowDecimals = 0;
    var dot = strVal.indexOf(".");
    if (dot == -1) {
      strVal += ".";
    } else {
      nowDecimals = strVal.length - dot - 1;
    }
    for (let i = nowDecimals; i < decimals; i++) {
      strVal = strVal + zero;
    }
  
    return strVal;
  }