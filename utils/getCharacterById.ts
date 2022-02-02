import marvelData from "../services/marvelData";

const getCharacterById = async (route: string, id: number | string) => {
  const result = await marvelData.get(route, {
    params: {
      id: id,
    },
  });

  const data = result.data;
  return data;
};

export default getCharacterById;
