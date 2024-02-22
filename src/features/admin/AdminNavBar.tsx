import {
  Avatar,
  Box,
  BoxProps,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  IconButtonProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  MenuProps,
  Spinner,
  Stack,
  StackProps,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import {
  LuBookOpen,
  LuLogOut,
  LuMenu,
  LuMoon,
  LuSun,
  LuUser,
} from "react-icons/lu";

import { Icon } from "@/components/Icons";
import { Logo } from "@/components/Logo";
import { useAdminLayoutContext } from "@/features/admin/AdminLayout";
import { LinkAdmin } from "@/features/admin/LinkAdmin";
import { ADMIN_PATH } from "@/features/admin/constants";

export const ADMIN_NAV_BAR_HEIGHT = `calc(4rem + env(safe-area-inset-top))`;

const AdminNavBarMainMenu = ({ ...rest }: StackProps) => {
  return (
    <Stack direction="row" spacing="1" {...rest}>
      <AdminNavBarMainMenuItem href="/movies">
        {"Movies"}
      </AdminNavBarMainMenuItem>
      <AdminNavBarMainMenuItem href="/actors">
        {"Actors"}
      </AdminNavBarMainMenuItem>
    </Stack>
  );
};

export const AdminNavBar = (props: BoxProps) => {
  const showDrawer = useBreakpointValue({
    base: true,
    md: false,
  });

  return (
    <Box {...props}>
      <Flex
        zIndex="sticky"
        position="fixed"
        top="0"
        insetStart="0"
        insetEnd="0"
        color="gray.50"
        align="center"
        pt="safe-top"
        px="4"
        h={ADMIN_NAV_BAR_HEIGHT}
        bg="gray.800"
        boxShadow="layout"
        borderBottom="1px solid transparent"
        _dark={{
          bg: "gray.900",
          color: "white",
          borderBottomColor: "gray.800",
          boxShadow: "layout-dark",
        }}
      >
        <AdminNavBarDrawerButton
          display={{ base: "flex", md: "none" }}
          ms="-0.5rem"
        />
        <Box as={LinkAdmin} href="/" mx={{ base: "auto", md: 0 }}>
          <Logo />
        </Box>
        <AdminNavBarMainMenu
          me="auto"
          ms="4"
          display={{ base: "none", md: "flex" }}
        />
      </Flex>
      <Box h={ADMIN_NAV_BAR_HEIGHT} />
      {showDrawer && <AdminNavBarDrawer />}
    </Box>
  );
};

const AdminNavBarMainMenuItem = ({
  href,
  ...rest
}: BoxProps & { href: string }) => {
  const { navDrawer } = useAdminLayoutContext();
  const pathname = usePathname() ?? "";
  const isActive =
    href === "/"
      ? pathname === (ADMIN_PATH || "/")
      : pathname.startsWith(`${ADMIN_PATH}${href}`);

  return (
    <Box
      as={LinkAdmin}
      href={href}
      bg="transparent"
      justifyContent="flex-start"
      position="relative"
      opacity={isActive ? 1 : 0.8}
      fontWeight="semibold"
      borderRadius="md"
      px="4"
      py="2"
      _active={{ bg: "gray.700" }}
      _hover={{
        bg: "gray.900",
        _after: {
          opacity: 1,
          w: "2rem",
        },
      }}
      _focusVisible={{
        outline: "none",
        bg: "gray.900",
        _after: {
          opacity: 1,
          w: "2rem",
        },
      }}
      _after={{
        opacity: isActive ? 1 : 0,
        content: '""',
        position: "absolute",
        insetStart: { base: 8, md: "50%" },
        bottom: "0.2em",
        transform: "translateX(-50%)",
        transition: "0.2s",
        w: isActive ? "2rem" : 0,
        h: "2px",
        borderRadius: "full",
        bg: "currentColor",
      }}
      onClick={navDrawer.onClose}
      {...rest}
    />
  );
};

const AdminNavBarDrawerButton = (props: Partial<IconButtonProps>) => {
  const { navDrawer } = useAdminLayoutContext();

  return (
    <IconButton
      aria-label="Navigation"
      icon={<LuMenu size="1.5em" />}
      onClick={navDrawer.onOpen}
      variant="unstyled"
      _active={{ bg: "gray.700" }}
      _hover={{ bg: "gray.900" }}
      {...props}
    />
  );
};

const AdminNavBarDrawer = ({ ...rest }) => {
  const { navDrawer } = useAdminLayoutContext();
  return (
    <Drawer
      isOpen={navDrawer.isOpen ?? false}
      placement="left"
      onClose={navDrawer.onClose ?? (() => undefined)}
      {...rest}
    >
      <DrawerOverlay>
        <DrawerContent
          bg="gray.800"
          color="white"
          pt="safe-top"
          pb="safe-bottom"
        >
          <DrawerCloseButton mt="safe-top" />
          <DrawerHeader>
            <Logo />
          </DrawerHeader>
          <DrawerBody p="2">
            <AdminNavBarMainMenu direction="column" />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
