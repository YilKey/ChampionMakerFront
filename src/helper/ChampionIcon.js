import ListIcons from "./ListIcons";

function ChampionIcon(id, type) {
  const icons = ListIcons(type);
  return `/${type}/${icons[id % icons.length]}`;
}

export default ChampionIcon;
