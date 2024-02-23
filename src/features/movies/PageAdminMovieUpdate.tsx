import { Button, Flex, Heading, SkeletonText } from "@chakra-ui/react";
import { Formiz, useForm } from "@formiz/core";
import { useParams, useRouter } from "next/navigation";
import { ErrorPage } from "@/components/ErrorPage";
import { LoaderFull } from "@/components/LoaderFull";
import { useToastError, useToastSuccess } from "@/components/Toast";
import { DashboardBackButton } from "@/features/dashboard/DashboardBackButton";
import { DashboardCancelButton } from "@/features/dashboard/DashboardCancelButton";
import {
  DashboardLayoutPage,
  DashboardLayoutPageContent,
  DashboardLayoutPageTopBar,
} from "@/features/dashboard/DashboardLayoutPage";
import { useGetMovie } from "@/features/movies/useGetMovie";
import { MovieForm, MovieFormFields } from "@/features/movies/MovieForm";
import { useUpdateMovie } from "@/features/movies/useUpdateMovie";
import { useAuthContext } from "@/features/auth/AuthProvider";

export default function PageAdminMovieUpdate() {
  const params = useParams();
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();

  const movie = useGetMovie(params?.id?.toString() ?? "", {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const toastSuccess = useToastSuccess();
  const toastError = useToastError();

  const movieUpdate = useUpdateMovie({
    onSuccess() {
      toastSuccess({
        title: "Movie Updated Successfully",
      });
      router.back();
    },
    onError(error) {
      toastError({
        title: "Movie Updated Failed!",
        description: error.response?.data.detail,
      });
    },
  });

  const isReady = !movie.isFetching;

  const form = useForm<MovieFormFields>({
    ready: isReady,
    initialValues: {
      name: movie.data?.name ?? undefined,
      actorIds: movie.data?.actors.map((x) => x.id) ?? undefined,
    },
    onValidSubmit: (values) => {
      if (!movie.data?.id) return;

      movieUpdate.mutate({
        id: movie.data.id,
        payload: values,
      });
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
                isDisabled={(!form.isValid && form.isSubmitted) || !isLoggedIn}
                isLoading={movieUpdate.isPending || movieUpdate.isSuccess}
              >
                {"Save"}
              </Button>
            </>
          }
        >
          {movie.isLoading || movie.isError ? (
            <SkeletonText maxW="6rem" noOfLines={2} />
          ) : (
            <Flex
              flexDirection={{ base: "column", md: "row" }}
              alignItems={{ base: "start", md: "center" }}
              rowGap={1}
              columnGap={4}
            >
              <Heading size="sm">{movie.data?.name}</Heading>
            </Flex>
          )}
        </DashboardLayoutPageTopBar>
        {!isReady && <LoaderFull />}
        {isReady && movie.isError && <ErrorPage />}
        {isReady && movie.isSuccess && (
          <DashboardLayoutPageContent>
            <MovieForm />
          </DashboardLayoutPageContent>
        )}
      </DashboardLayoutPage>
    </Formiz>
  );
}
