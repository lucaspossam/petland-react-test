import { api } from "../api";

export async function getPlayingCards(pairs: number) {
  try {
    return await api
      .get(`/cards?_page=1&_per_page=${pairs}`)
      .then(res => res.data.data);
  } catch (err) {
    return { error: err };
  }
}
