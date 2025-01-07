import "@testing-library/jest-dom";

// Establece la configuración regional a "es-AR" para todos los tests
const mockNumberFormat = jest.fn().mockImplementation(() => {
  return {
    format: (value: number) =>
      new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
      })
        .format(value)
        .replace(/\s/g, ""),
  };
}) as unknown as typeof Intl.NumberFormat;

mockNumberFormat.supportedLocalesOf = jest.fn().mockReturnValue(["es-AR"]);

global.Intl.NumberFormat = mockNumberFormat;
