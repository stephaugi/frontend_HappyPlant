import {Picker} from '@react-native-picker/picker';
import { usePlantsData } from 'contexts/PlantsData/PlantsDataContext';

const CustomPicker = () => {
  const { plantsData, selectedPlant, selectPlant } = usePlantsData();

  let plantOptions = null;
  if (plantsData?.length) {
    plantOptions = plantsData.map((plant, index) => {
      return (<Picker.Item
          key={`${index}${plant.id}`}
          label={plant.name}
          value={plant.id}
        />);
    });
  }

  return (
    <Picker
      testID='plantPicker:test'
      style={[{ marginTop: -30, height: 160, width: "100%", textAlign: "center" }]}
      selectedValue={selectedPlant ? selectedPlant.id : null}
      onValueChange={(itemValue, itemIndex) => {
        selectPlant(itemValue);
      }}
    >
      {plantOptions}
    </Picker>
  )
}

export default CustomPicker;