import type { NextPage } from "next";
import CharacterCard from "../components/CharacterCard/Index";

import Grid from "@mui/material/Grid";
const mockData = require("../mock/marvelMockData.json");

type character = {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
};

const Characters: NextPage = () => {
  return (
    <div>
      <Grid
        container
        xs={12}
        sx={{
          display: "flex",
          marginTop: "3em",
          px: { xs: 3, md: 8 },
        }}
      >
        {mockData.map(({ id, name, description, thumbnail }: character) => {
          return (
            <Grid item key={id} xs={12} sm={6} md={4} lg={3}>
              <CharacterCard
                image={`${thumbnail.path}/standard_fantastic.${thumbnail.extension}`}
                description={description}
                name={name}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Characters;
