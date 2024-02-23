import { FieldInput } from "@/components/FieldInput";
import { FieldSelect } from "@/components/FieldSelect";
import type { ActorResponse } from "@/features/actors/common.types";
import { useGetActors } from "@/features/actors/useGetActors";
import { useAuthContext } from "@/features/auth/AuthProvider";
import { Stack } from "@chakra-ui/react";
import { debounce } from "lodash";
import { useCallback, useState } from "react";

export type MovieFormFields = {
  name: string;
  actorIds: string[];
};

export const MovieForm = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dbcQuery, setDbcQuery] = useState(searchQuery);
  const { isLoggedIn } = useAuthContext();

  const actors = useGetActors({
    pageSize: 10,
    pageNumber: 1,
    q: dbcQuery,
  });

  const changeDebouncedQuery = (value: string) => {
    setDbcQuery(value);
  };

  const debounceFn = useCallback(debounce(changeDebouncedQuery, 300), []);

  function handleChange(value: string) {
    debounceFn(value);
    setSearchQuery(value);
  }

  return (
    <Stack spacing={4}>
      <FieldInput
        isDisabled={!isLoggedIn}
        name="name"
        required={"Required"}
        label={"Name"}
      />
      <FieldSelect
        name="actorIds"
        inputValue={searchQuery}
        onInputChange={handleChange}
        label={"Actors"}
        required={"Required"}
        isLoading={actors.isLoading}
        isDisabled={!isLoggedIn}
        // Disable the default filter, so we can use our api
        filterOption={() => true}
        options={
          actors.data?.pages
            .flatMap((p) => p.items)
            .map((actor) => ({
              value: actor.id,
              label: actor.name,
            })) ?? []
        }
        isMulti
        isSearchable
      />
    </Stack>
  );
};
