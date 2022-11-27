import { renderHook } from "@testing-library/react";
import {
  EquivalenceInputSource,
  SourceConfiguration,
  SourceTypes,
} from "../../../types";
import { useDataSources } from "./useDataSources";

describe(`useDataSources`, () => {
  const mockSources = new Array(13).fill({}).map((_, index) => ({
    data: new Array(17).fill("").map(
      (_, index) =>
        ({
          type: SourceTypes.EQUIVALENCE,
          value: {
            [`data ${index}`]: `data ${index}`,
          },
        } as EquivalenceInputSource)
    ),
    id: `source ${index}`,
  }));

  it(`renders without configuration`, () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.5);
    const expectedSource = mockSources[Math.floor(0.5 * 13)];
    const resultIndex = Math.floor(0.5 * 17);

    const { result } = renderHook(() => useDataSources(mockSources));
    expect(result.current).toEqual({
      id: expectedSource.id,
      type: expectedSource.data[resultIndex].type,
      choice: Object.entries(expectedSource.data[resultIndex].value)[0],
    });
  });
  it(`Renders no choice if there is no availabel choice`, () => {
    const configuration: SourceConfiguration = {
      deactivatedMap: mockSources.reduce(
        (acc, { id }) => ({ ...acc, [id]: true }),
        {}
      ),
    };
    const { result } = renderHook(() =>
      useDataSources(mockSources, configuration)
    );
    expect(result.current).toEqual({
      type: SourceTypes.STATEMENT,
      choice: "No sources, go to options to select them",
      id: "__NO_CHOICE__",
    });
  });
  it(`renders with configuration`, () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.5);

    const activeSourceId = mockSources[0].id;
    const configuration: SourceConfiguration = {
      deactivatedMap: mockSources.reduce(
        (acc, { id }) => ({ ...acc, [id]: id !== activeSourceId }),
        {}
      ),
    };
    const expectedSource = mockSources[0];
    const resultIndex = Math.floor(0.5 * 17);

    const { result } = renderHook(() =>
      useDataSources(mockSources, configuration)
    );

    expect(result.current).toEqual({
      id: expectedSource.id,
      type: expectedSource.data[resultIndex].type,
      choice: Object.entries(expectedSource.data[resultIndex].value)[0],
    });
  });
});
