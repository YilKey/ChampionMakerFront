import { useQuery } from "react-query";
import {axios} from "../authContext/index";

const fetchTypes = async () => {
  const { data } = await axios.get("types");
  return data;
};

const fetchType = async (name) => {
  const { data } = await axios.get(`types/${name}`);
  return data;
};

export const useTypes = () => {
  return useQuery("types", fetchTypes);
};

export const useType = (name) => {
  return useQuery("type", () => fetchType(name));
};
