import { CgArrowsExpandUpRight } from "react-icons/cg";
import { useQuery } from "react-query";
import { axios } from "../authContext/index";

const fetchChampions = async () => {
  const { data } = await axios.get(`champions`);
  return data;
};

const fetchChampion = async (name) => {
  const { data } = await axios.get(`champions/name-${name}`);
  return data;
};

export const fetchUserChampions = async (user) => {
  const { data } = await axios.get(`users/${user}/champions`);
  return data;
};

export const addChampion = async (user, { name, disc, type }) => {
  const { data } = await axios.post(`users/${user}/champions`, {
    name: name,
    disc: disc,
    type: type,
  });
  return data;
};

export const deleteChampion = async (user, champ) => {
  const { data } = await axios.delete(`users/${user}/champions/${champ}`);
  return data;
};

export const updateChampion = async (user, champ, { disc, type }) => {
  const { data } = await axios.put(`users/${user}/champions/${champ}`, {
    disc: disc,
    type: type,
  });
  return data;
};

export const upvoteChamp = async (name) => {
  const { data } = await axios.put(`champions/${name}`);
  return data;
};

export const useChampions = () => {
  return useQuery("champions", fetchChampions);
};

export const useChampion = (name) => {
  return useQuery("champion", () => fetchChampion(name));
};

export const useUserChampions = (user) => {
  return useQuery("userChampions", () => fetchUserChampions(user));
};
