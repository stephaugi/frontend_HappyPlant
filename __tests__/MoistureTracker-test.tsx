import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MoistureTracker from '../src/components/MoistureTracker/MoistureTracker';
import { Alert } from 'react-native';
import { getMoistureFromApi, getPlantsFromApi, getWaterFromApi } from "../src/utils/api/apiCalls";
import { getFromStorage, saveToStorage } from "../src/utils/storage";

const testPlantData = [
  {
    averageWaterCycle: 4,
    currentMoistureLevel: 3,
    description: "Likes to live on the edge. It gets real dry",
    desiredMoistureLevel: 1,
    id: 1,
    name: "Danger",
    nextWaterDate: "2026-02-05",
    photo: null,
  },
];

// jest.mock(apiCalls);
jest.mock("../src/utils/storage");
jest.mock('../src/utils/api/apiCalls.tsx', () => ({
  ...(jest.requireActual('../src/utils/api/apiCalls.tsx')),
  getPlantsFromApi: jest.fn(),
}));

jest.mock('react-native-calendars', () => ({
  CalendarProvider: ({ children }: any) => children,
  ExpandableCalendar: () => null,
}));

// // Prevent animation crashes
// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Make focus effects opt-in
jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useFocusEffect: jest.fn(), // NO-OP by default
  };
});

jest.spyOn(Alert, 'alert').mockImplementation(jest.fn());

describe('MoistureTracker', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Resets mock calls/implementations after each test
  });
  it("checks that my test runs at all", () => {
    expect(5).toEqual(5);
  });
  it("checks that my test runs with one button", () => {
    // const testButton = render(<CustomButton />);
    getPlantsFromApi.mockReturnValue("Hello");
    expect(getPlantsFromApi()).toBe("Hello");
  });

  // it('renders and allows saving moisture data', () => {
  //   const screen = render(<MoistureTracker />);
  //   const dryButton = screen.getByText('Dry');
  //   const wetButton = screen.getByText('Wet');
  //   const normalButton = screen.getByText('Normal');
  //   const unselectedState = normalButton.props.style.backgroundColor;

  //   // Select moisture level
  //   fireEvent.press(dryButton);
  //   expect(dryButton.props.style.backgroundColor).not.toEqual(unselectedState);
  //   expect(wetButton.props.style.backgroundColor).toEqual(unselectedState);

  //   // Toggle water
  //   fireEvent.press(screen.getByText('Water'));

  //   // Save
  //   fireEvent.press(screen.getByText('Save'));

  //   // Nothing crashes = success
  //   expect(screen.getByText('Save')).toBeTruthy();
  // });
});
