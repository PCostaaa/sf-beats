// `price` is in USD. Set to 0 for free beats.
// `purchaseUrl` is optional per-track; when omitted, paid beats link to
// the producer's BeatStars channel root.
export const beats = [
  {
    id: 1,
    title: "Changes",
    genre: ["Hip-Hop", "Boom Bap", "Lo-Fi"],
    bpm: 90,
    youtubeId: "-7ghRgiLNtI",
    price: 10,
  },
  {
    id: 2,
    title: "Random Bap",
    genre: ["Hip-Hop", "Boom Bap", "Old School"],
    bpm: 100,
    youtubeId: "fgVT1byBK0U",
    price: 0,
  },
  {
    id: 3,
    title: "Mellow MEAL",
    genre: ["Hip-Hop", "Chill", "Boom Bap", "Lo-Fi"],
    bpm: 95,
    youtubeId: "JGy-Jg4hj74",
    price: 20,
  },
  {
    id: 4,
    title: "B2B",
    genre: ["Hip-Hop", "Boom Bap", "Old School", "Freestyle"],
    bpm: 85,
    youtubeId: "80XSlVFmgNQ",
    price: 30,
  },
  {
    id: 5,
    title: "78G",
    genre: ["Hip-Hop", "Chill", "Boom Bap", "Freestyle"],
    bpm: 78,
    youtubeId: "oNlHe8ED-w8",
    price: 0,
  },
  {
    id: 6,
    title: "Sunny Days",
    genre: ["Hip-Hop", "Boom Bap", "Freestyle"],
    bpm: 88,
    youtubeId: "-0lxTu1lvfw",
    price: 40,
  },
];

export const BEATSTARS_ROOT = "https://www.beatstars.com/sfbeatss";
