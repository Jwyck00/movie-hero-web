import { ActionsButton } from "@/components/ActionsButton";
import { Icon } from "@/components/Icons";
import { useAuthContext } from "@/features/auth/AuthProvider";
import { LinkDashboard } from "@/features/dashboard/LinkDashboard";
import type { MovieResponse } from "@/features/movies/common.types";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuProps,
  Portal,
} from "@chakra-ui/react";
import { LuPenLine } from "react-icons/lu";

export type DashboardMovieActionProps = Omit<MenuProps, "children"> & {
  movie: MovieResponse;
};

export const DashboardMovieActions = ({
  movie,
  ...rest
}: DashboardMovieActionProps) => {
  const { isLoggedIn } = useAuthContext();

  return (
    <Menu placement="left-start" {...rest}>
      <MenuButton as={ActionsButton} />
      <Portal>
        <MenuList>
          <MenuItem
            as={LinkDashboard}
            href={`/movies/${movie.id}`}
            disabled={!isLoggedIn}
            icon={<Icon icon={LuPenLine} fontSize="lg" color="gray.400" />}
          >
            {"Edit"}
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};
