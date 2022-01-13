export const NumberCommas = num => {
  // console.log(num)
  // console.log(num.toString())

  return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : num;
};
