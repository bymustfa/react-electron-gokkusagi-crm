import axios from "axios";
export const setAuthorizationToken = (token) => {
  if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete axios.defaults.headers.common["Authorization"];
};

export const formatMoney = (raw) => {
  Number.prototype.formatMoney = function (fractionDigits, decimal, separator) {
    fractionDigits = isNaN((fractionDigits = Math.abs(fractionDigits)))
      ? 2
      : fractionDigits;
    decimal = typeof decimal === "undefined" ? "." : decimal;
    separator = typeof separator === "undefined" ? "," : separator;
    var number = this;
    var neg = number < 0 ? "-" : "";
    var wholePart =
      parseInt((number = Math.abs(+number || 0).toFixed(fractionDigits))) + "";
    var separtorIndex =
      (separtorIndex = wholePart.length) > 3 ? separtorIndex % 3 : 0;

    return (
      neg +
      (separtorIndex ? wholePart.substr(0, separtorIndex) + separator : "") +
      wholePart
        .substr(separtorIndex)
        .replace(/(\d{3})(?=\d)/g, "$1" + separator) +
      (fractionDigits
        ? decimal +
          Math.abs(number - wholePart)
            .toFixed(fractionDigits)
            .slice(2)
        : "")
    );
  };
  return parseFloat(raw).formatMoney(2, ",", ".");
};
