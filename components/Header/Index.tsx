import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";

const routes = [
  { route: "/", name: "Home" },
  { route: "/characters", name: "Characters" },
  {
    route: "https://github.com/MoranggNormal/pp-challenge-web",
    name: "Repository",
  },
];

export default function Header() {
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        elevation={1}
        sx={{ backgroundColor: "secondary.main" }}
      >
        <Toolbar>
          {routes.map(({ route, name }) => {
            return (
              <Link key={route} href={route} passHref>
                <Typography
                  component="a"
                  className={router.pathname === route ? "link-active" : "link"}
                  sx={{ p: 1, mx: 1 }}
                >
                  {name}
                </Typography>
              </Link>
            );
          })}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
