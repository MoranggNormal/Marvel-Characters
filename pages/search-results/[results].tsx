import { GetServerSideProps } from "next";

import { useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CharacterCard from "../../components/CharacterCard/Index";

import getCharacterData from "../../utils/getCharacterData";

import { character } from "../../models/characterType";

const Results = ({ data, title }: any) => {
  const [results] = useState(data);

  return (
    <>
      <Grid container>
        <Grid item xs={12} sx={{ m: 3, display: "grid", placeItems: "center" }}>
          <Typography
            component="h4"
            variant="h6"
            color="text.link"
            fontWeight={800}
          >
            {results.length > 0
              ? `Here are some results for: ${title}...`
              : `There are no results for ${title}`}
          </Typography>
        </Grid>
        {results &&
          results.map(({ id, name, thumbnail }: character) => {
            return (
              <Grid item key={id} xs={12} sm={6} md={4} lg={3}>
                <CharacterCard
                  image={
                    `${thumbnail.path}/standard_fantastic.${thumbnail.extension}` ||
                    ""
                  }
                  name={name}
                  id={id}
                />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default Results;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = await getCharacterData(
    `characters?nameStartsWith=${params?.results}`,
    50
  );
  const newData = data.data.results;

  return {
    props: {
      data: newData || [],
      title: params?.results,
    },
  };
};
