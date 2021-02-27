export const solveSearchToObj = ( search) => {
  const obj = {};
  if (!search) {
    return obj;
  }
  const arr = search.slice(1).split("&");
  arr.forEach((item) => {
    const [key, value] = item.split("=");
    Object.assign(obj, { [key]: value });
  });

  return obj;
};
