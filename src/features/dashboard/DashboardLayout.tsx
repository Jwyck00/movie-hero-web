"use client";

import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import { Flex, UseDisclosureProps, useDisclosure } from "@chakra-ui/react";
import { Viewport } from "@/components/Viewport";
import { DashboardNavBar } from "@/features/dashboard/DashboardNavBar";

export type DashboardLayoutContextNavDisplayed = boolean | "desktop";

type DashboardLayoutContextValue = {
  navDisplayed: DashboardLayoutContextNavDisplayed;
  setNavDisplayed: React.Dispatch<
    React.SetStateAction<DashboardLayoutContextNavDisplayed>
  >;
  navDrawer: UseDisclosureProps;
};

export const DashboardLayoutContext =
  React.createContext<DashboardLayoutContextValue | null>(null);

export const useDashboardLayoutContext = () => {
  const ctx = useContext(DashboardLayoutContext);
  if (ctx === null) {
    throw new Error("Missing parent <DashboardLayout> component");
  }
  return ctx;
};

export const useDashboardLayoutHideNav = (
  displayed: DashboardLayoutContextNavDisplayed = true
) => {
  const { setNavDisplayed } = useDashboardLayoutContext();

  useEffect(() => {
    setNavDisplayed(displayed);
    return () => setNavDisplayed(true);
  }, [setNavDisplayed, displayed]);
};

export const DashboardLayout: FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [navDisplayed, setNavDisplayed] =
    useState<DashboardLayoutContextNavDisplayed>(true);
  const navDrawer = useDisclosure();

  const providerValue = useMemo(
    () => ({
      navDisplayed,
      setNavDisplayed,
      navDrawer,
    }),
    [navDisplayed, setNavDisplayed, navDrawer]
  );

  return (
    <DashboardLayoutContext.Provider value={providerValue}>
      <Viewport
        data-testid="Dashboard-layout"
        bg="gray.50"
        _dark={{ bg: "gray.900" }}
      >
        {!!navDisplayed && (
          <DashboardNavBar
            display={
              navDisplayed === "desktop"
                ? { base: "none", md: "block" }
                : undefined
            }
          />
        )}
        <Flex flex="1" direction="column">
          {children}
        </Flex>
      </Viewport>
    </DashboardLayoutContext.Provider>
  );
};
