import {
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
  Stack,
  StackProps,
  useBreakpointValue,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { LuMenu } from "react-icons/lu";

import { Logo } from "@/components/Logo";
import { useDashboardLayoutContext } from "@/features/dashboard/DashboardLayout";
import { LinkDashboard } from "@/features/dashboard/LinkDashboard";
import { DASHBOARD_PATH } from "@/features/dashboard/constants";

export const DASHBOARD_NAV_BAR_HEIGHT = `calc(4rem + env(safe-area-inset-top))`;

const DashboardNavBarMainMenu = ({ ...rest }: StackProps) => {
  return (
    <Stack direction="row" spacing="1" {...rest}>
      <DashboardNavBarMainMenuItem href="/movies">
        {"Movies"}
      </DashboardNavBarMainMenuItem>
      <DashboardNavBarMainMenuItem href="/actors">
        {"Actors"}
      </DashboardNavBarMainMenuItem>
    </Stack>
  );
};

export const DashboardNavBar = (props: BoxProps) => {
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
        h={DASHBOARD_NAV_BAR_HEIGHT}
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
        <DashboardNavBarDrawerButton
          display={{ base: "flex", md: "none" }}
          ms="-0.5rem"
        />
        <Box as={LinkDashboard} href="/" mx={{ base: "auto", md: 0 }}>
          <Logo />
        </Box>
        <DashboardNavBarMainMenu
          me="auto"
          ms="4"
          display={{ base: "none", md: "flex" }}
        />
      </Flex>
      <Box h={DASHBOARD_NAV_BAR_HEIGHT} />
      {showDrawer && <DashboardNavBarDrawer />}
    </Box>
  );
};

const DashboardNavBarMainMenuItem = ({
  href,
  ...rest
}: BoxProps & { href: string }) => {
  const { navDrawer } = useDashboardLayoutContext();
  const pathname = usePathname() ?? "";
  const isActive =
    href === "/"
      ? pathname === (DASHBOARD_PATH || "/")
      : pathname.startsWith(`${DASHBOARD_PATH}${href}`);

  return (
    <Box
      as={LinkDashboard}
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

const DashboardNavBarDrawerButton = (props: Partial<IconButtonProps>) => {
  const { navDrawer } = useDashboardLayoutContext();

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

const DashboardNavBarDrawer = ({ ...rest }) => {
  const { navDrawer } = useDashboardLayoutContext();
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
            <DashboardNavBarMainMenu direction="column" />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
