import { usePlantsData } from "contexts/PlantsData/PlantsDataContext";
import CustomButton from "./UI/CustomButton";

const CompButton = () => {
  const { plantsData, selectedPlant, updatePlantsData, resetPlantsData, refreshPlantsData, selectPlant } = usePlantsData();

  return (
    <CustomButton
      label="click for plants"
      onPress={() => {
        selectPlant(1);

      }}
    />
  );
};

export default CompButton;