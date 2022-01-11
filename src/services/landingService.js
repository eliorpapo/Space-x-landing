import { storageService } from './storageService.js';
import axios from 'axios';

export const landingService = {
  query,
  getById,
  pageDecrease,
  pageIncrease,
};

var gPage = 0;

async function query(filterBy) {
  await loadgLandings();
  let landingsToReturn = gLandings;
  if (filterBy) {
    var { name, success } = filterBy;
    landingsToReturn = gLandings.filter((landing) =>
      landing.name.toLowerCase().includes(name.toLowerCase())
    );
    if (success !== '')
      landingsToReturn = gLandings.filter(
        (landing) => landing.success === success
      );
  }
  const twenty = landingsToReturn.slice(gPage, gPage + 20);
  return Promise.resolve([...twenty]);
}

function getById(id) {
  const landing = gLandings.find((landing) => landing.id === id);
  return Promise.resolve({ ...landing });
}

function _loadLandings() {
  let landings = storageService.load(STORAGE_KEY);
  if (!landings || !landings.length) landings = gLandings;
  storageService.store(STORAGE_KEY, landings);
  return landings;
}

var gLandings = [];
async function loadgLandings() {
  const { data } = await axios.get(`https://api.spacexdata.com/v4/launches`);
  gLandings = data;
  _loadLandings();
}

function pageIncrease() {
  if (gPage === 140) return 8;
  gPage += 20;
  return (gPage + 20) / 20;
}

function pageDecrease() {
  if (gPage === 0) return 1;
  gPage -= 20;
  return (gPage + 20) / 20;
}

const STORAGE_KEY = 'landings';
