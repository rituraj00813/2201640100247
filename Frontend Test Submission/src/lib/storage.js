// src/lib/storage.js
const STORAGE_KEY = "affordmed_shortener_data";

export function getData() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
