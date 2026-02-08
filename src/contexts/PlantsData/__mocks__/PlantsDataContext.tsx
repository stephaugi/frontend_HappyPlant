jest.mock("contexts/PlantsData/PlantsDataContext", () => ({
  usePlantsData: jest.fn(),
}));

jest.mock("contexts/Tracker", () => ({
  useTracker: jest.fn(),
}));
