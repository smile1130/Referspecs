import { useTheme } from "@/context/Theme";
import ToogleTheme from "./ToogleTheme";
import { Typography } from "@mui/material";
import styled from "styled-components";
import GeneralTitle from "./GeneralTitle";
import { useMemo } from "react";
import FavoriteResult from "./FavoriteList";

export default function TopBar() {
  const { theme } = useTheme();

  return useMemo(
    () => (
      <TopBarRoot bg={theme?.colors.bg}>
        <GeneralTitle variant="h4" />

        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <FavoriteResult />
          <ToogleTheme />
        </div>
      </TopBarRoot>
    ),
    [theme]
  );
}

const TopBarRoot = styled.div<{
  bg: string;
}>`
  position: relative;
  top: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 50px;
  background-color: ${({ bg }) => bg};
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
`;
