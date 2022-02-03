import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import useOnScreen from "../hooks/useOnScreen";

import CharacterCard from "../components/CharacterCard/Index";
import SearchBox from "../components/SearchBox/Index";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

import getMarvelData from "../utils/getCharacterData";

import { character } from "../models/characterType";

const Characters: NextPage = ({ data, error }: any) => {
  const router = useRouter();

  const [results, setResults] = useState(data);
  const [currentViews, setCurrentViews] = useState(25);
  const [isLoading, setIsLoading] = useState(false);
  const [userWillSearch, setUserWillSearch] = useState("");

  const isAtBottom = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(isAtBottom, "300px");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserWillSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userWillSearch) return;

    setIsLoading(true);
    router.push(`/search-results/${userWillSearch}`);
  };

  useEffect(() => {
    if (onScreen) {
      const getNewViews = async () => {
        const data = await getMarvelData("/characters", 25, currentViews);
        const newData = data.data.results;

        setResults((prevState: []) => [...prevState.concat(newData)]);
        setCurrentViews((prevState) => prevState + 25);
      };

      getNewViews();
    }
  }, [onScreen]);

  return (
    <>
      <Head>
        <title>Characters Parge - PP Challenge</title>
        <meta
          name="description"
          content="Main character page, here you find many characters by scrolling or just searching for it."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
          {!error ? (
            <SearchBox
              placeholder={"Search for any Marvel character..."}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          ) : (
            <Typography
              component="h1"
              variant="h3"
              color="text.link"
              fontWeight={800}
              sx={{ marginTop: "4em" }}
            >
              Whoops, something wrent wrong!
            </Typography>
          )}
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
    </>
  );
};

export default Characters;

export const getStaticProps: GetStaticProps = async () => {
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
