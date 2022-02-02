import { useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import getMarvelData from "../../utils/getCharacterData";
import getCharacterById from "../../utils/getCharacterById";
import Typography from "@mui/material/Typography";

import Avatar from "@mui/material/Avatar";

import Grid from "@mui/material/Grid";

const Character = ({ id }: any) => {
  const [character, setCharacter] = useState(id.data.results[0]);

  return (
    <>
      <Grid container sx={{ p: 4 }}>
        <Grid item xs={5}>
          <Avatar
            alt={character.name}
            src={`${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}`}
            sx={{ width: 350, height: 350 }}
          />
        </Grid>

        <Grid item xs={7}>
          <Typography
            component="h1"
            variant="h4"
            color="text.link"
            fontWeight={800}
            sx={{ marginTop: "1em" }}
          >
            {character.name}
          </Typography>

          <Typography
            component="h4"
            color="primary.main"
            sx={{ marginTop: "2em" }}
          >
            {character.description ||
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
