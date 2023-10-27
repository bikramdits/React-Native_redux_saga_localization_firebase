import i18n from "i18n-js";

export enum MOOD_ITEMS {
  VERRY_HAPPY = "VERRY_HAPPY",
  HAPPY = "HAPPY",
  OKAY = "OKAY",
  UNHAPPY = "UNHAPPY",
  VERRY_UNHAPPY = "VERRY_UNHAPPY",
}

const MOOD_LIST = [
  MOOD_ITEMS.VERRY_UNHAPPY,
  MOOD_ITEMS.HAPPY,
  MOOD_ITEMS.OKAY,
  MOOD_ITEMS.UNHAPPY,
  MOOD_ITEMS.VERRY_UNHAPPY,
] as const;

export default MOOD_LIST;

export type MoodType = typeof MOOD_LIST[number];

export function getMoodTitles() {
  return {
    [MOOD_ITEMS.VERRY_HAPPY]: i18n.t("mood_modal_verry_happy"),
    [MOOD_ITEMS.HAPPY]: i18n.t("mood_modal_happy"),
    [MOOD_ITEMS.OKAY]: i18n.t("mood_modal_okay"),
    [MOOD_ITEMS.UNHAPPY]: i18n.t("mood_modal_unhappy"),
    [MOOD_ITEMS.VERRY_UNHAPPY]: i18n.t("mood_modal_verry_unhappy"),
  };
}
