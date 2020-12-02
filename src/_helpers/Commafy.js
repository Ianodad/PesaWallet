export const commafy = (num) => {
  num.toString().replace(/\B(?=(?:\d{3})+)$/g, ',');
};
