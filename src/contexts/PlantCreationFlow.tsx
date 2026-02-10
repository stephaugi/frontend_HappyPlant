import { useState, useContext, createContext } from "react";

const PlantCreationFlowContext = createContext();

const kDefaultForm = {
  name: "",
  description: "",
  desiredMoistureLevel: null,
  plantSpecies: "",
};

const PlantCreationFlowProvider = ({ children }) => {
  const [plantForm, setPlantForm] = useState(kDefaultForm);
  const [plantFlowStep, setPlantFlowStep] = useState(1);

  const updatePlantForm = ({ inputName, inputValue }) => {
    setPlantForm((prevPlantForm) => {
      return {
        ...prevPlantForm,
        [inputName]: inputValue,
      }
    })
  };

  const nextStep = () => {
    setPlantFlowStep((currStep) => {
      return currStep + 1;
    });
  };

  const previousStep = () => {
    setPlantFlowStep((currStep) => {
      return currStep - 1;
    });
  };

  return (
    <PlantCreationFlowContext.Provider value={{plantForm, plantFlowStep, updatePlantForm, nextStep, previousStep}}>
      {children}
    </PlantCreationFlowContext.Provider>
  );
};

const usePlantCreationFlow = () => useContext(PlantCreationFlowContext);

export { PlantCreationFlowProvider, usePlantCreationFlow };