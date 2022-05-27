export const payRange = (start = null, end = null) => {
  if (start) {
    start = numberToCurrency(start);
  }
  if (end) {
    end = numberToCurrency(end);
  }
  if (start && end) {
    return `${start} - ${end}`;
  } else if (start) {
    return `>= ${start}`;
  } else if (end) {
    return `<= ${end}`;
  }
  return `-`;
};

export const numberToCurrency = (number = 0) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};
