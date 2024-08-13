// app/providers.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    "flame-pea": {
      "50": "#fdf4f3",
      "100": "#fbe8e5",
      "200": "#f8d6d0",
      "300": "#f2b9af",
      "400": "#e99080",
      "500": "#d9614c",
      "600": "#c7503b",
      "700": "#a7402e",
      "800": "#8b3829",
      "900": "#743328",
      "950": "#3e1811",
    },
    "card-bg": "#D9614C",
    "primary-text": "#403B36",
    "secondary-text": "#595550",
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
