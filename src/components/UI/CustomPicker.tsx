import {Picker} from '@react-native-picker/picker';
import { usePlantsData } from 'contexts/PlantsData/PlantsDataContext';

const CustomPicker = () => {
  const { plantsData, selectedPlant, selectPlant } = usePlantsData();

  let plantOptions = null;
  if (plantsData?.length) {
    plantOptions = plantsData.map((plant, index) => {
      return (<Picker.Item
          // style={{ textAlign: "center", alignSelf:"center", backgroundColor: "pink", }}
          key={`${index}${plant.id}`}
          // color='blue'
          label={plant.name}
          value={plant.id}
        />);
    });
  }

  return (
    <Picker
      testID='plantPicker:test'
      style={[{ marginTop: -30, height: 160, width: "100%", alignSelf: "center" }]}
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