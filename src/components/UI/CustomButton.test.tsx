import CustomButton from "./CustomButton";
import { render, fireEvent } from "@testing-library/react-native";
import { useState } from "react";

describe("Custom button test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("tests that my button calls function", () => {
    const mockOnPress = jest.fn();

    const { getByText } = render(<CustomButton label="Dry" onPress={mockOnPress}/>);
    const pressMyButton = getByText("Dry");
    fireEvent.press(pressMyButton);

    expect(mockOnPress).toHaveBeenCalled();
    expect(pressMyButton).toHaveTextContent("Dry");
  });

  it("checks that the color changes when selected", () => {
    const ButtonWrapper = () => {
      const [selectedState, setSelectedState] = useState(false);
      return (<CustomButton
          label="Wet"
          selected={selectedState}
          selectedColorTheme="selectedColorTheme1"
          onPress={() => {
            setSelectedState(true);
          }}
        />);
    };

    const { getByText } = render(<ButtonWrapper />);
    const myButton = getByText("Wet");
    expect(myButton).toHaveStyle({ backgroundColor: "#2a8692" });
    fireEvent.press(myButton);
    expect(myButton).toHaveStyle({ backgroundColor: "#a8f3e5" });
  }
  );
});