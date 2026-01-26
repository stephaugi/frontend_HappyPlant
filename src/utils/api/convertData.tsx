const convertToAPI = (objToConvert: object) => {
  const converted = {};
  for (const [key, value] of Object.entries(objToConvert)) {
    const newKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    converted[newKey] = value;
  }
  return converted;
};

const convertFromAPI = (objToConvert: object) => {
  const converted = {};
  for (const [key, value] of Object.entries(objToConvert)) {
    const newKey = key.replace(/([_][a-z])/g, (match) =>
      match[1].toUpperCase()
    );
    converted[newKey] = value;
  }
  return converted;
};

export { convertFromAPI, convertToAPI };
