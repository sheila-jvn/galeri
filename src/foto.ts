const vertical = ["1080x1080", "720x1280", "1080x1350", "600x900", "750x1000"];
const horizontal = [
  "1280x720",
  "1440x900",
  "1024x768",
  "1200x800",
  "2560x1080",
  "2048x1107",
];

const resolutions = [...vertical, ...horizontal];

const getRandomResolution = () => {
  return resolutions[Math.floor(Math.random() * resolutions.length)];
};

export const getRandomImageUrl = () => {
  return `https://placehold.co/${getRandomResolution()}`;
};