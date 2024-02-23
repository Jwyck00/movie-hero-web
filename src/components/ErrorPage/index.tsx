import React, { ReactElement } from "react";
import { Center, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export const ErrorPage = ({ errorCode }: { errorCode?: number }) => {
  return (
    <Center flex="1" p="8">
      <Stack
        direction={{ base: "column-reverse", md: "row" }}
        align="center"
        spacing={4}
      >
        <Stack
          textAlign={{ base: "center", md: "left" }}
          alignItems={{ base: "center", md: "flex-start" }}
        >
          <Link href="/">
            <Logo my={4} />
          </Link>
          <Heading>{"Error"}</Heading>
          <Text>{""}</Text>
          {!!errorCode && (
            <Text color="text-dimmed" fontSize="sm" mt={4}>
              {"Something went wrong 😞"}
            </Text>
          )}
        </Stack>
      </Stack>
    </Center>
  );
};
