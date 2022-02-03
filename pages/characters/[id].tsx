import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";

import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import getMarvelData from "../../utils/getCharacterData";
import getCharacterById from "../../utils/getCharacterById";

const Character = ({ id }: any) => {
  const { name, thumbnail, description } = id.data.results[0];

  return (
    <>
      <Head>
        <title>{name} - PP Challenge</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid container sx={{ p: 4 }}>
        <Grid item xs={12} md={5}>
          <Avatar
            alt={name}
            src={`${thumbnail.path}/standard_fantastic.${thumbnail.extension}`}
            sx={{ width: 350, height: 350 }}
          />
        </Grid>

        <Grid item xs={12} md={7}>
          <Typography
            component="h1"
            variant="h4"
            color="text.link"
            fontWeight={800}
            sx={{ marginTop: "1em" }}
          >
            {name}
          </Typography>

          <Typography
            component="h4"
            color="primary.main"
            sx={{ marginTop: "2em" }}
          >
            {description ||
              "This characters doesnt have a property description yet."}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Character;

export const getStaticPaths: GetStaticPaths | any = async () => {
  let paths = [];

  try {
    const data = await getMarvelData("/characters", 100);

    if (data.data.results.length) {
      paths = data.data.results.map(({ id }: any) => {
        return { params: { id: id.toString() } };
      });
    }
  } catch (error) {}

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { id }: any = ctx.params;

  const data = await getCharacterById("/characters", id);

  return {
    props: { id: data },
  };
};
