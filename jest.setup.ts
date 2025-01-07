import "@testing-library/jest-dom";

// Establece la configuración regional a "es-AR" para todos los tests
const originalNumberFormat = Intl.NumberFormat;

const mockNumberFormat = jest.fn().mockImplementation((locales, options) => {
  if (
    locales === "es-AR" &&
    options?.style === "currency" &&
    options?.currency === "ARS"
  ) {
    return new originalNumberFormat(locales, options);
  }
  return new originalNumberFormat(locales, options);
});

global.Intl.NumberFormat =
  mockNumberFormat as unknown as typeof Intl.NumberFormat;
