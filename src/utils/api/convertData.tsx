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

const convertMoistureFromAPI = (objToConvert: object) => {
  console.log("placeholder");
  const exampleResponse = [
    {
      id: 1,
      moisture_level: 6,
      timestamp: "2026-01-29",
    },
    {
      id: 3,
      moisture_level: 6,
      timestamp: "2026-01-28",
    },
  ];
  const entries = exampleResponse.map((eachLog) => {
    return {
      [eachLog.timestamp]: {
        id: eachLog.id,
        moistureLevel: eachLog.moisture_level,
      },
    };
  });
  const converted = Object.fromEntries(entries);
  return converted;
};

const convertMoistureToAPI = (objToConvert: object) => {
  
  console.log("placeholder");
};

export { convertFromAPI, convertToAPI };
