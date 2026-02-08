import CompButton from "../src/components/CompButton";
import { render } from "@testing-library/react-native";
import { Text } from "react-native-svg";

jest.mock("contexts/PlantsData/PlantsDataContext", () => {
  const actual = jest.requireActual("contexts/PlantsData/PlantsDataContext");

  return {
    ...actual,
    usePlantsData: () => {
      return {
        plantsData: [{
            name: "jamie",
            description: "testing this",
          },
          {
            name: "michael",
            description: "testing this",
        }],
        selectedPlant: {
          name: "jamie",
          description: "testing this",
        },
        selectPlant: jest.fn(),
  }
    },
  };
});

// const { plantsData, selectedPlant, updatePlantsData, resetPlantsData, refreshPlantsData, selectPlant } = usePlantsData();
describe("testing whether you get context", () => {
  it("checks that the provider works", () => {
    const screen = render(<CompButton />);
    // const screen = render(<Text>jamie</Text>);
    const buttonName = screen.getByText("click for plants");
    expect(buttonName).toBeTruthy();
  });
} )

