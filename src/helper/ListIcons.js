function ListIcons(type) {
  let images;
  switch (type) {
    case "Assasin":
      images = [
        "bomoBass.png",
        "1.png",
        "fireAss.png",
        "portal.png",
        "viperAss.png",
      ];
      break;
    case "Controller":
      images = ["zombieMage.png", "bluehandma.png", "dogMan.png", "1.png"];
      break;
    case "Diver":
      images = ["gobly.png", "1.png", "horses.png", "varkenDiver.png"];
      break;
    case "Enchanter":
      images = ["DeathMage.png", "hex.png", "soulHancer.png", "1.png"];
      break;
    case "Fighter":
      images = [
        "fireClawMage.png",
        "iceAlien.png",
        "NightDude.png",
        "skelF.png",
        "1.png",
      ];
      break;
    case "Healer":
      images = [
        "1.png",
        "schilder.png",
        "sheepf.png",
        "skeletron.png",
        "violing.png",
      ];
      break;
    case "Mage":
      images = [
        "electroMageBGI.png",
        "fireMageBGI.png",
        "1.png",
        "waterMages.png",
      ];
      break;
    case "Marksman":
      images = ["bowguys.png", "crossbowwydude.png", "1.png", "slag.png"];
      break;
    case "Tank":
      images = ["chainhorn.png", "skulgrave.png", "1.png", "snakeG.png"];
      break;
    default:
      images = [""];
      break;
  }
  return images;
}

export default ListIcons;
