import malkDeKoijn from "./src/assets/malkDeKoijn.png";
import littleSimz from "./src/assets/littleSimz.png";
import gorillaz from "./src/assets/gorillaz.png";
import tobiasRahim from "./src/assets/tobiasRahim.png";
import mikuna from "./src/assets/mikuna.png";
import newArctic from "./src/assets/newArctic.png";
import kopan from "./src/assets/kopan.png";
import shirt from "./src/assets/shirt.png";
import hoodie from "./src/assets/hoodie.png";
import cap from "./src/assets/cap.png";

export const infoData = {
  stage_orange: {
    type: "stage",
    title: "Orange Stage",
    description: "WHO'S PLAYING TODAY",
    items: [
      {
        name: "Malk de Koijn",
        time: "16:00",
        image: malkDeKoijn,
      },
      {
        name: "Little Simz",
        time: "18:00",
        image: littleSimz,
      },
      { name: "Gorillaz", time: "22:00", image: gorillaz },
      {
        name: "Tobias Rahim",
        time: "01:00",
        image: tobiasRahim,
      },
    ],
    url: "https://maps.apple.com/directions?source=56.119379%2C10.158382&destination=Roskilde+Drive+In+Bio%2C+Darupvej+21%2C+4000+Roskilde%2C+Danmark&destination-place-id=I8BB31B488B3AEB7D&mode=walking",
  },
  stand_food: {
    type: "stand",
    title: "Food Court",
    description:
      "The Food Court is the culinary heart of the festival – a lively street-food hub packed with great vibes, bold flavours, and mouth-watering aromas. ",
    open: "Food Court is open every day from 10:00 to 03:00. ",
    items: [
      {
        name: "Mikuna",
        description: "Burgers and Fries",
        image: mikuna,
      },
      {
        name: "New Arctic",
        description: "Burgers and Fish & Chips",
        image: newArctic,
      },
      {
        name: "Kopan",
        description: "Korean Cuisine",
        image: kopan,
      },
    ],
    url: "https://maps.apple.com/directions?source=56.119379%2C10.158382&destination=Roskilde+Festival+Food+Court%2C+Darupvej+19+4000+Roskilde+Danmark&destination-place-id=I489DB94BA54F4440&mode=walking",
  },
  stand_merch: {
    type: "stand",
    title: "Merch",
    description: "Buy your merch for RF26#",
    open: "The merch shop is open every day from 15:00 to 17:00 ",
    items: [
      {
        name: "Shirt",
        description: "Small - Large",
        image: shirt,
      },
      {
        name: "Hoodie",
        description: "Small - Large",
        image: hoodie,
      },
      { name: "Cap", description: "One size", image: cap },
    ],
    url: "https://maps.apple.com/directions?source=56.119379%2C10.158382&destination=Roskilde+Festival+Merch+Shop%2C+Darupvej+19+4000+Roskilde+Danmark&destination-place-id=I5BA76FD58C24B158&mode=walking",
  },

  festival_site: {
    type: "area",
    title: "Happenings at the Festival Site today",
    items: [
      {
        activity: "Morning Yoga",
        place: "The Yard",
        time: "09:30",
      },
      { activity: "aaiun nin", place: "RE:ACT", time: "10:00" },
      { activity: "face masks", place: "Camp 2", time: "13:00" },
      { activity: "bonfire and song", place: "Camp 23", time: "16:00" },
      { activity: "bonfire and song", place: "Camp 23", time: "19:00" },
      { activity: "bonfire and song", place: "Camp 23", time: "21:00" },
    ],
  },
};
