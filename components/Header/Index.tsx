import { useRouter } from "next/router";

import Link from "next/link";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import paths from "./paths";

export default function Header() {
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        elevation={1}
        sx={{ backgroundColor: "primary.dark" }}
      >
        <Toolbar>
          {paths.map(({ path, name }) => {
            return (
              <Link key={path} href={path} passHref>
                <Typography
                  component="a"
                  className={router.pathname === path ? "link-active" : "link"}
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
