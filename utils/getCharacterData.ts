import marvelData from "../services/marvelData";

const getCharacterData = async (
  route: string,
  limit: number,
  offset: number = 0
) => {
  const result = await marvelData.get(route, {
    params: {
      limit: limit,
      offset: offset,
    },
  });

  const data = result.data;
  return data;
};

export default getCharacterData;
