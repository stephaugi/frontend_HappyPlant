const convertToAPI = (toConvert: object) => {
  const converted = {};
  for (const [key, value] of Object.entries(toConvert)) {
    const newKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    converted[newKey] = value;
  }
  return converted;
};

const convertFromAPI = (toConvert: object) => {
  const converted = {};
  for (const [key, value] of Object.entries(toConvert)) {
    const newKey = key.replace(/([_][a-z])/g, (match) =>
      match[1].toUpperCase()
    );
    converted[newKey] = value;
  }
  return converted;
};

const convertMoistureFromAPI = (toConvert: object[]) => {
  try {
    const entries = toConvert.map((eachLog) => {
      const new_dict = [
        eachLog.timestamp, {
          id: eachLog.id,
          moistureLevel: eachLog.moisture_level,
        },
      ];
      return new_dict;
    });
    const converted = Object.fromEntries(entries);
    return converted;
  } catch (error) {
    console.log(error);
  }
};

const convertMoistureToAPI = (toConvert: object) => {
  const converted = Object.keys(toConvert).map(entryDate => {
    return {timestamp: entryDate,
      id: toConvert[entryDate].id,
      moisture_level: toConvert[entryDate].moistureLevel}
  });
  return converted;
};

export { convertFromAPI, convertToAPI };
