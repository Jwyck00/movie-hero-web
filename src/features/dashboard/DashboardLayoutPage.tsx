import React, { ReactNode, useContext, useMemo } from "react";
import {
  Box,
  ButtonGroup,
  Container,
  ContainerProps,
  Flex,
  FlexProps,
  HStack,
  Stack,
} from "@chakra-ui/react";
import useMeasure from "react-use-measure";
import {
  DashboardLayoutContextNavDisplayed,
  useDashboardLayoutContext,
  useDashboardLayoutHideNav,
} from "@/features/dashboard/DashboardLayout";
import { DASHBOARD_NAV_BAR_HEIGHT } from "@/features/dashboard/DashboardNavBar";

type DashboardLayoutPageContextValue = {
  nav: React.ReactNode;
  noContainer: boolean;
  containerMaxWidth: ContainerProps["maxW"];
};

const DashboardLayoutPageContext =
  React.createContext<DashboardLayoutPageContextValue | null>(null);

const useDashboardLayoutPageContext = () => {
  const context = useContext(DashboardLayoutPageContext);
  if (context === null) {
    throw new Error("Missing parent <DashboardLayoutPage> component");
  }
  return context;
};

const PageContainer = ({ children, maxW, ...rest }: ContainerProps) => {
  const { noContainer, containerMaxWidth } = useDashboardLayoutPageContext();

  if (noContainer) return <>{children}</>;
  return (
    <Container
      display="flex"
      flexDirection="column"
      flex="1"
      w="full"
      maxW={maxW ?? containerMaxWidth}
      {...rest}
    >
      {children}
    </Container>
  );
};

type DashboardLayoutPageTopBarProps = FlexProps & {
  leftActions?: ReactNode;
  rightActions?: ReactNode;
  isFixed?: boolean;
  isConfirmDiscardChanges?: boolean;
  containerMaxWidth?: ContainerProps["maxW"];
};

export const DashboardLayoutPageTopBar = ({
  children,
  leftActions,
  rightActions,
  isFixed = true,
  containerMaxWidth,
  ...rest
}: DashboardLayoutPageTopBarProps) => {
  const { navDisplayed } = useDashboardLayoutContext();
  const [ref, { height }] = useMeasure();

  return (
    <>
      {isFixed && <Box h={`${height}px`} />}
      <Flex
        zIndex={2}
        direction="column"
        py={3}
        boxShadow="layout"
        bg="white"
        ref={ref}
        borderBottom="1px solid transparent"
        borderBottomColor="gray.100"
        _dark={{
          bg: "gray.900",
          color: "white",
          borderBottomColor: "gray.800",
          boxShadow: "layout-dark",
        }}
        {...(isFixed
          ? {
              top: navDisplayed
                ? navDisplayed === "desktop"
                  ? { base: 0, md: DASHBOARD_NAV_BAR_HEIGHT }
                  : DASHBOARD_NAV_BAR_HEIGHT
                : "0",
              position: "fixed",
              right: "0",
              left: "0",
            }
          : {})}
        {...rest}
      >
        <Box w="full" h="0" pb="safe-top" />
        <PageContainer maxW={containerMaxWidth}>
          <HStack spacing="4">
            {!!leftActions && (
              <ButtonGroup size="sm" spacing={3}>
                {leftActions}
              </ButtonGroup>
            )}
            <Box flex="1">{children}</Box>
            {!!rightActions && (
              <ButtonGroup size="sm" spacing={3}>
                {rightActions}
              </ButtonGroup>
            )}
          </HStack>
        </PageContainer>
      </Flex>
    </>
  );
};

type DashboardLayoutPageContentProps = FlexProps & {
  onBack?(): void;
  showBack?: boolean;
  containerMaxWidth?: ContainerProps["maxW"];
};

export const DashboardLayoutPageContent = ({
  children,
  containerMaxWidth,
  ...rest
}: DashboardLayoutPageContentProps) => {
  const { nav } = useDashboardLayoutPageContext();
  return (
    <Flex
      position="relative"
      zIndex="1"
      direction="column"
      flex="1"
      py="4"
      {...rest}
    >
      <PageContainer maxW={containerMaxWidth} pb={16}>
        <Stack
          direction={{ base: "column", lg: "row" }}
          spacing={{ base: "4", lg: "8" }}
          flex="1"
        >
          {nav && (
            <Flex direction="column" minW="0" w={{ base: "full", lg: "12rem" }}>
              {nav}
            </Flex>
          )}
          <Flex direction="column" flex="1" minW="0">
            {children}
          </Flex>
        </Stack>
      </PageContainer>
      <Box w="full" h="0" pb="safe-bottom" />
    </Flex>
  );
};

type DashboardLayoutPageBottomBarProps = FlexProps & {
  containerMaxWidth?: ContainerProps["maxW"];
};

export const DashboardLayoutPageBottomBar = ({
  children,
  containerMaxWidth,
  ...rest
}: DashboardLayoutPageBottomBarProps) => {
  const [ref, { height }] = useMeasure();

  return (
    <>
      <Box h={`${height}px`} />
      <Flex
        zIndex="3"
        ref={ref}
        direction="column"
        mt="auto"
        position="fixed"
        bottom="0"
        insetStart="0"
        insetEnd="0"
        py="2"
        boxShadow="layout"
        bg="white"
        borderTop="1px solid transparent"
        _dark={{
          bg: "gray.900",
          color: "white",
          borderTopColor: "gray.800",
          boxShadow: "layout-dark",
        }}
        {...rest}
      >
        <PageContainer maxW={containerMaxWidth}>{children}</PageContainer>
        <Box w="full" h="0" pb="safe-bottom" />
      </Flex>
    </>
  );
};

type DashboardLayoutPageProps = FlexProps & {
  showNavBar?: DashboardLayoutContextNavDisplayed;
  containerMaxWidth?: ContainerProps["maxW"];
  noContainer?: boolean;
  nav?: React.ReactNode;
};

export const DashboardLayoutPage = ({
  showNavBar = true,
  noContainer = false,
  containerMaxWidth = "container.lg",
  nav = null,
  ...rest
}: DashboardLayoutPageProps) => {
  useDashboardLayoutHideNav(showNavBar);

  const value = useMemo(
    () => ({
      nav,
      noContainer,
      containerMaxWidth,
    }),
    [containerMaxWidth, noContainer, nav]
  );

  return (
    <DashboardLayoutPageContext.Provider value={value}>
      <Flex direction="column" flex="1" position="relative" {...rest} />
    </DashboardLayoutPageContext.Provider>
  );
};
