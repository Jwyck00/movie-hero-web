import { ResponsiveIconButton } from "@/components/ResponsiveIconButton";
import { SearchInput } from "@/components/SearchInput";
import {
  DashboardLayoutPage,
  DashboardLayoutPageContent,
} from "@/features/dashboard/DashboardLayoutPage";
import { LinkDashboard } from "@/features/dashboard/LinkDashboard";
import {
  Avatar,
  Flex,
  HStack,
  Heading,
  Stack,
  Tag,
  Tooltip,
} from "@chakra-ui/react";
import { useQueryState } from "nuqs";
import { LuPlus } from "react-icons/lu";

import {
  DataList,
  DataListCell,
  DataListEmptyState,
  DataListErrorState,
  DataListLoadingState,
  DataListRow,
  DataListText,
} from "@/components/DataList";
import { DashboardMovieActions } from "@/features/movies/DashboardMovieActions";
import { useGetMovies } from "@/features/movies/useGetMovies";
import { Button, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";

export default function PageDashboardMovies() {
  const [searchTerm, setSearchTerm] = useQueryState("q", { defaultValue: "" });

  const movies = useGetMovies({
    pageNumber: 1,
    pageSize: 10,
    q: searchTerm,
  });

  return (
    <DashboardLayoutPage containerMaxWidth="container.xl">
      <DashboardLayoutPageContent>
        <Stack spacing={4}>
          <HStack spacing={4} alignItems={{ base: "end", md: "center" }}>
            <Flex
              direction={{ base: "column", md: "row" }}
              rowGap={2}
              columnGap={4}
              alignItems={{ base: "start", md: "center" }}
              flex={1}
            >
              <Heading flex="none" size="md">
                Movies
              </Heading>
              <SearchInput
                size="sm"
                value={searchTerm}
                onChange={(value) => setSearchTerm(value || null)}
                maxW={{ base: "none", md: "20rem" }}
              />
            </Flex>
            <ResponsiveIconButton
              as={LinkDashboard}
              href="/movies/create"
              variant="@primary"
              size="sm"
              icon={<LuPlus />}
            >
              {"Create Movie"}
            </ResponsiveIconButton>
          </HStack>

          <DataList>
            {movies.isLoading && <DataListLoadingState />}
            {movies.isError && (
              <DataListErrorState
                title={"Failed to load movies"}
                retry={() => movies.refetch()}
              />
            )}
            {movies.isSuccess &&
              !movies.data.pages.flatMap((p) => p.items).length && (
                <DataListEmptyState searchTerm={searchTerm} />
              )}
            {movies.data?.pages
              .flatMap((p) => p.items)
              .map((movie) => (
                <DataListRow as={LinkBox} key={movie.id} withHover>
                  <DataListCell flex={2}>
                    <DataListText fontWeight="bold">
                      <LinkOverlay
                        as={LinkDashboard}
                        href={`/movies/${movie.id}`}
                      >
                        {movie.name}
                      </LinkOverlay>
                    </DataListText>
                  </DataListCell>
                  <DataListCell
                    flexDirection="row"
                    w="auto"
                    display={{ base: "none", sm: "flex" }}
                  >
                    {movie.actors.map((actor) => (
                      <Tooltip key={actor.id} label={actor.name}>
                        <Avatar size="sm" name={actor.name ?? ""} />
                      </Tooltip>
                    ))}
                  </DataListCell>
                  <DataListCell w="auto">
                    <DashboardMovieActions movie={movie} />
                  </DataListCell>
                </DataListRow>
              ))}
            {movies.isSuccess && (
              <DataListRow mt="auto">
                <DataListCell w="auto">
                  <Button
                    size="sm"
                    onClick={() => movies.fetchNextPage()}
                    isLoading={movies.isFetchingNextPage}
                    isDisabled={!movies.hasNextPage}
                  >
                    {"Load more"}
                  </Button>
                </DataListCell>
                <DataListCell>
                  {movies.isSuccess && !!movies.data.pages[0]?.totalCount && (
                    <Text fontSize="xs" color="text-dimmed">
                      {`Showing ${
                        movies.data.pages.flatMap((p) => p.items).length
                      } of ${movies.data.pages[0].totalCount} movies`}
                    </Text>
                  )}
                </DataListCell>
              </DataListRow>
            )}
          </DataList>
        </Stack>
      </DashboardLayoutPageContent>
    </DashboardLayoutPage>
  );
}
