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

const convertMoistureFromAPI = (toConvert) => {
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
const convertAllMoistureFromAPI = (toConvert) => {
  try {
    let converted = new Object();
    for (const eachLog of toConvert) {
      const moistureInfo = {
        id: eachLog.id,
        plantName: eachLog.plant_name,
        plantId: eachLog.plant_id,
        moistureLevel: eachLog.moisture_level,
      };
      if (eachLog.timestamp in converted) {
        converted[eachLog.timestamp].push(moistureInfo);
      } else {
        converted = { ...converted, [eachLog.timestamp]: [moistureInfo] };
      }
    };
    return converted;
  } catch (error) {
    console.log(error);
  }
};

const convertAllWaterFromAPI = (toConvert) => {
  try {
    let converted = new Object();
    for (const eachLog of toConvert) {
      const waterInfo = {
        id: eachLog.id,
        plantName: eachLog.plant_name,
        plantId: eachLog.plant_id,
        watered: eachLog.moisture_level,
      };
      if (eachLog.timestamp in converted) {
        converted[eachLog.timestamp].push(waterInfo);
      } else {
        converted = { ...converted, [eachLog.timestamp]: [waterInfo] };
      }
    };
    return converted;
  } catch (error) {
    console.log(error);
  }
};

const convertMoistureToAPI = (toConvert) => {
  const converted = Object.keys(toConvert).map(entryDate => {
    return {
      timestamp: entryDate,
      id: toConvert[entryDate].id,
      moisture_level: toConvert[entryDate].moistureLevel,
    };
  });
  return converted;
};

const convertWaterFromAPI = (toConvert) => {
  try {
    const entries = toConvert.map((eachLog) => {
      const new_dict = [
        eachLog.timestamp, {
          id: eachLog.id,
          watered: eachLog.watered,
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

const convertWaterToAPI = (toConvert: object) => {
  const converted = Object.keys(toConvert).map(entryDate => {
    return {timestamp: entryDate,
      id: toConvert[entryDate].id,
      watered: toConvert[entryDate].watered}
  });
  return converted;
};

export {
  convertFromAPI,
  convertToAPI,
  convertMoistureFromAPI,
  convertAllMoistureFromAPI,
  convertMoistureToAPI,
  convertWaterFromAPI,
  convertAllWaterFromAPI,
  convertWaterToAPI,
};
