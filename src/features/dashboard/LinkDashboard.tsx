"use client";

import { forwardRef } from "@chakra-ui/react";
import Link, { LinkProps } from "next/link";

import { DASHBOARD_PATH } from "@/features/dashboard/constants";

export const LinkDashboard = forwardRef(
  (
    {
      href: _href,
      ...rest
    }: LinkProps &
      Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>,
    ref
  ) => {
    const href = `${DASHBOARD_PATH}${_href}`;

    return <Link ref={ref} href={href} {...rest} />;
  }
);
