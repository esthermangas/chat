const displayName = (name) => {
  const arrName = name.split(' ');
  if (arrName.length > 0) {
    const letter1 = arrName[0][0];
    const letter2 = arrName[1] !== undefined ? arrName[1][0] : '';
    const dName = letter1 + letter2;
    return dName.toUpperCase();
  }
  return '';
};

export default displayName;
