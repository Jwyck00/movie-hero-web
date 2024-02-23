import { Heading, useTheme, type HeadingProps } from "@chakra-ui/react";

export const Logo = (props: HeadingProps) => {
  const theme = useTheme();

  return (
    <Heading color="whiteAlpha" {...props}>
      Movie Hero
    </Heading>
  );
};
