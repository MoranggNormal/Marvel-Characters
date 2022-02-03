import type { NextPage } from "next";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

import getMarvelData from "../utils/getCharacterData";

import useOnScreen from "../hooks/useOnScreen";

import CharacterCard from "../components/CharacterCard/Index";
import SearchBox from "../components/SearchBox/Index";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";

import { character } from "../models/characterType";

const Characters: NextPage = ({ data, error }: any) => {
  const router = useRouter();

  const [results, setResults] = useState(data);
  const [currentData, setCurrentData] = useState(25);
  const [userType, setUserType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isAtBottom = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(isAtBottom, "300px");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userType) return;

    setIsLoading(true);
    router.push(`/search-results/${userType}`);
  };

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
      {isLoading && <LinearProgress />}
      <Grid
        container
        sx={{
          display: "flex",
          marginTop: "3em",
          px: { xs: 3, md: 8 },
        }}
      >
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <SearchBox
            placeholder={"Search for any Marvel character..."}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </Grid>

        {results &&
          !error &&
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
      <Grid
        container
        sx={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        {!error && (
          <Grid item xs={12} component="div" ref={isAtBottom} sx={{ m: 2 }}>
            {onScreen && <LinearProgress />}
          </Grid>
        )}
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
