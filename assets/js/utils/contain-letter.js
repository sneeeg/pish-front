const containLetter = (str) => {
  const regExp = /[a-zA-Zа-яА-я]/g;

  return regExp.test(str);
};

export default containLetter;
