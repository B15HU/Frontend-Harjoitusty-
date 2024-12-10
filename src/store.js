import { writable } from 'svelte/store';

// Nykyinen näkymä
export const nykyinenNakyma = writable('etusivu'); //oletusnäkymä

// Käyttäjän tiedot (nimi, sposti ja salasana)
export const kayttaja = writable({
  nimi: '',
  sposti: '',
  salasana: '',
});
