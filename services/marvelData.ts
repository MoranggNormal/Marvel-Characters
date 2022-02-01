import axios from "axios";
import md5 from "md5";

const timeStamp = new Date().getTime();
const hash = md5(
  `${timeStamp}${process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY}${process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY}`
);

const marvelData = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MARVEL_BASE_URL,
  params: {
    ts: timeStamp,
    apikey: process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY,
    hash: hash,
  },
});

export default marvelData;
