import React, { FC } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AuthProvider } from "@/features/auth/AuthProvider";
import { isAxiosError } from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry(failureCount, error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 401) return false;
          if (error.response?.status === 404) return false;
        }

        // retry 3 times
        return failureCount <= 3;
      },
    },
  },
});

export const Providers: FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>{children}</AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};
