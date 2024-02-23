import React from "react";

import { Button, Heading } from "@chakra-ui/react";
import { Formiz, useForm } from "@formiz/core";
import { useRouter } from "next/navigation";

import { useToastError, useToastSuccess } from "@/components/Toast";
import { DashboardBackButton } from "@/features/dashboard/DashboardBackButton";
import { DashboardCancelButton } from "@/features/dashboard/DashboardCancelButton";
import {
  DashboardLayoutPage,
  DashboardLayoutPageContent,
  DashboardLayoutPageTopBar,
} from "@/features/dashboard/DashboardLayoutPage";
import { MovieForm, MovieFormFields } from "@/features/movies/MovieForm";
import { useCreateMovie } from "@/features/movies/useCreateMovie";

export default function PageAdminMovieCreate() {
  const router = useRouter();

  const toastError = useToastError();
  const toastSuccess = useToastSuccess();

  const createMovie = useCreateMovie({
    onSuccess: async () => {
      toastSuccess({
        title: "Movie Created Successfully",
      });
      router.back();
    },
    onError: (error) => {
      toastError({
        title: "Movie Creation Failed!",
        description: error.response?.data.detail,
      });
    },
  });

  const form = useForm<MovieFormFields>({
    onValidSubmit: (values) => {
      createMovie.mutate(values);
    },
  });

  return (
    <Formiz connect={form} autoForm>
      <DashboardLayoutPage containerMaxWidth="container.md" showNavBar={false}>
        <DashboardLayoutPageTopBar
          leftActions={<DashboardBackButton withConfrim={!form.isPristine} />}
          rightActions={
            <>
              <DashboardCancelButton withConfrim={!form.isPristine} />
              <Button
                type="submit"
                variant="@primary"
                isLoading={createMovie.isPending || createMovie.isSuccess}
                isDisabled={!form.isValid && form.isSubmitted}
              >
                {"Save"}
              </Button>
            </>
          }
        >
          <Heading size="sm">{"Create Movie"}</Heading>
        </DashboardLayoutPageTopBar>
        <DashboardLayoutPageContent>
          <MovieForm />
        </DashboardLayoutPageContent>
      </DashboardLayoutPage>
    </Formiz>
  );
}
