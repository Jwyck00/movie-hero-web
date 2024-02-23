import { Stack } from "@chakra-ui/react";
import { FieldInput } from "@/components/FieldInput";

export type MovieFormFields = {
  name: string;
};

export const MovieForm = () => {
  return (
    <Stack spacing={4}>
      <FieldInput name="name" required={"Required"} label={"Name"} />
    </Stack>
  );
};
