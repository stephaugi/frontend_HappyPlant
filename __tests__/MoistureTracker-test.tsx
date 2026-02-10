import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import MoistureTracker from "../src/components/MoistureTracker/MoistureTracker";

import { usePlantsData } from "contexts/PlantsData/PlantsDataContext";
import { useTracker } from "contexts/TrackerContext";

const mockSelectPlant = jest.fn();
const mockChangeDate = jest.fn();
const mockUpdateMoisture = jest.fn();
const mockUpdateWater = jest.fn();
const mockSubmit = jest.fn();

const mockUsePlantsData = jest.fn();
const mockUseTracker = jest.fn();

jest.mock("contexts/PlantsData/PlantsDataContext", () => {
  return {
    usePlantsData: () => {
      return {
        plantsData: [
          { id: 1, name: "Fern" },
          { id: 2, name: "Cactus" },
        ],
        selectedPlant: { id: 1, name: "Fern" },
        selectPlant: mockSelectPlant,
    }
    }
  }
  }
);

jest.mock("contexts/TrackerContext", () => {
  return {
    useTracker: (() => {
      return {
        waterFormData: { watered: false },
        moistureFormData: { moistureLevel: null },
        selectedDay: "2026-02-01",
        trackedDates: {},
        updateWaterForm: mockUpdateWater,
        updateMoistureForm: mockUpdateMoisture,
        changeDate: mockChangeDate,
        submitData: mockSubmit,
      };
    })
  }
});

jest.mock("@expo/vector-icons/Ionicons", () => "Ionicons");

describe("testing whether you get context", () => {

  it("shows plant options", () => {
    const screen = render(<MoistureTracker />);

    expect(screen.getByText("Fern")).toBeTruthy();
    expect(screen.getByText("Cactus")).toBeTruthy();
  });
  it("selects plant from picker", () => {
    const screen = render(<MoistureTracker />);

    fireEvent.press(screen.getByText("Cactus"));

    expect(mockSelectPlant).toHaveBeenCalledWith(2);
  });

  it("changes date when calendar pressed", () => {
    const screen = render(<MoistureTracker />);

    fireEvent.press(screen.getByTestId("calendar"));

    expect(mockChangeDate).toHaveBeenCalledWith("2026-02-01");
  });

  it("updates moisture level", () => {
    const screen = render(<MoistureTracker />);

    fireEvent.press(screen.getByText("Dry"));

    expect(mockUpdateMoisture).toHaveBeenCalledWith("moistureLevel", 2);
  });

  it("toggles watered state", () => {
    const screen = render(<MoistureTracker />);

    fireEvent.press(screen.getByText("Water"));

    expect(mockUpdateWater).toHaveBeenCalledWith("watered", true);
  });

  it("submits data", () => {
    const screen = render(<MoistureTracker />);

    fireEvent.press(screen.getByText("Save"));

    expect(mockSubmit).toHaveBeenCalledWith("2026-02-01");
  });
});