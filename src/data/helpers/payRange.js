export const payRange = (start = null, end = null) => {
  if (start && end) {
    return `${start} - ${end}`;
  } else if (start) {
    return `${start}`;
  } else if (end) {
    return `${end}`;
  }
  return `-`;
};
