import { Heading, useTheme } from "@chakra-ui/react";

export const Logo = () => {
  const theme = useTheme();

  return <Heading color="whiteAlpha">Movie Hero</Heading>;
};
