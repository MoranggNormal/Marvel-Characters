import type { NextPage } from "next";
import { useState, useEffect, useRef } from "react";

import getMarvelData from "../utils/getCharacterData";

import useOnScreen from "../hooks/useOnScreen";

import CharacterCard from "../components/CharacterCard/Index";
import SearchByName from "../components/SearchByName/Index";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import { character } from "../models/characterType";

const Characters: NextPage = ({ data, error }: any) => {
  const [results, setResults] = useState(data);
  const [resultss, setResultss] = useState(data);
  const [currentData, setCurrentData] = useState(25);

  const isAtBottom = useRef<HTMLDivElement>(null);

  const onScreen = useOnScreen(isAtBottom, "300px");

  useEffect(() => {
    if (onScreen) {
      const getNewData = async () => {
        const data = await getMarvelData("/characters", 25, currentData);
        const newData = data.data.results;

        setResults((prevState: []) => [...prevState.concat(newData)]);
        setCurrentData((prevState) => prevState + 25);
      };

      getNewData();
    }
  }, [onScreen]);

  return (
    <div>
      <Grid
        container
        sx={{
          display: "flex",
          marginTop: "3em",
          px: { xs: 3, md: 8 },
        }}
      >
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <SearchByName />
        </Grid>

        {results && !error && results.map(({ id, name, thumbnail }: character) => {
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
      <Grid
        container
        sx={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Grid item component="div" ref={isAtBottom} sx={{ m: 2 }}>
          {onScreen && (
            <Button
              variant="contained"
              sx={{ backgroundColor: "primary.med", color: "#fff" }}
            >
              Loading more content...
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Characters;

export const getStaticProps = async () => {
  try {
    const data = await getMarvelData("/characters", 25);

    return {
      props: {
        data: data.data.results,
      },
    };
  } catch (error) {
    return {
      props: {
        error: "error",
      },
    };
  }
};
