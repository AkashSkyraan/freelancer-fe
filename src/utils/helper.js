// Keeps only digits (0-9) from any value – use it inside an onChange handler.
// Optional maxLength trims the result, e.g. onlyDigits(e.target.value, 10)
export const onlyDigits = (value = "", maxLength) => {
  const digits = String(value).replace(/\D/g, "");
  return maxLength ? digits.slice(0, maxLength) : digits;
};
