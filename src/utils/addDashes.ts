export const addDashes = (number: string): string => {
  const value = number.replace('-', '');
  let result = '';
  switch (value.length) {
    case 0:
    case 1:
    case 2:
      result = value;
      break;
    case 3:
    case 4:
    case 5:
      result = value.slice(0, 2) + '-' + value.slice(2);
      break;
    case 6:
    case 7:
      result =
        value.slice(0, 2) + '-' + value.slice(2, 5) + '-' + value.slice(5);
      break;
    case 8:
      result =
        value.slice(0, 3) + '-' + value.slice(3, 5) + '-' + value.slice(5);
      break;
    default:
      result = value;
      break;
  }

  return result;
};
