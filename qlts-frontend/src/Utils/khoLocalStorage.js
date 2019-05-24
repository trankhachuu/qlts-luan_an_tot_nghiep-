
const key = 'dsThietBiKho';

export function getLstMaThietBi() {
  return localStorage.getItem(key);
}

export function setLstMaThietBi(value) {
  return localStorage.setItem(key, value);
}

export function removeLstMaThietBi() {
  return localStorage.removeItem(key);
}