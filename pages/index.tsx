import type { NextPage } from "next";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import ironMan from "../assets/images/iron-man.png";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>PP CHALLENGE</title>
        <meta
          name="description"
          content="Challenge required to get a chance at Pedido Pago"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid container sx={{ height: "100vh" }}>
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            p: 3,
          }}
        >
          <Typography
            component="h1"
            variant="h3"
            color="text.link"
            fontWeight={800}
            sx={{ marginTop: "4em" }}
          >
            Are you ready for an epic journey?
          </Typography>
          <br />
          <Typography
            component="h4"
            variant="h6"
            color="text.link"
            fontWeight={800}
          >
            Discover many Marvel&apos;s characters in one click
          </Typography>
          <br />
          <Link href="/characters" passHref>
            <Button
              component="a"
              variant="outlined"
              sx={{ borderColor: "secondary.main", color: "text.light" }}
            >
              Get started
            </Button>
          </Link>
        </Grid>

        <Grid
          item
          md={7}
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <Image
            className="iron-man-pic"
            src={ironMan.src}
            width="700"
            height="500"
            alt=""
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
