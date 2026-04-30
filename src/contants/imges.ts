
// =========================
// ASSETS — update paths to match your Vite/CRA public or src structure.
// =========================
import a151 from "../assets/hovuzlar/klassikcam/a151.png";
import a151gece from "../assets/hovuzlar/klassikcam/a151gece.png";
import a155 from "../assets/hovuzlar/klassikcam/a155.png";
import a155gece from "../assets/hovuzlar/klassikcam/a155gece.png";
import a158 from "../assets/hovuzlar/klassikcam/a158.png";
import a158gece from "../assets/hovuzlar/klassikcam/a158gece.png";
import a159 from "../assets/hovuzlar/klassikcam/a159.png";
import a159gece from "../assets/hovuzlar/klassikcam/a159gece.png";
import a161 from "../assets/hovuzlar/klassikcam/a161.png";
import a161gece from "../assets/hovuzlar/klassikcam/a161gece.png";
import a161l from "../assets/hovuzlar/klassikcam/a161l.png";
import a161lgece from "../assets/hovuzlar/klassikcam/a161lgece.png";
import a218 from "../assets/hovuzlar/klassikcam/a218.png";
import a218gece from "../assets/hovuzlar/klassikcam/a218gece.png";
import a231 from "../assets/hovuzlar/klassikcam/a231.png";
import a231gece from "../assets/hovuzlar/klassikcam/a231gece.png";
import a236 from "../assets/hovuzlar/klassikcam/a236.png";
import a236gece from "../assets/hovuzlar/klassikcam/a236gece.png";
import a276 from "../assets/hovuzlar/klassikcam/a276.png";
import a276gece from "../assets/hovuzlar/klassikcam/a276gece.png";
import bali from "../assets/hovuzlar/kare/bali.png";
import baligece from "../assets/hovuzlar/kare/baligece.png";
import floralblue from "../assets/hovuzlar/kare/floralBlue.png";
import floralblueGece from "../assets/hovuzlar/kare/floralBlueGece.png";
import floralgreen from "../assets/hovuzlar/kare/floralGreen.png";
import floralgreenGece from "../assets/hovuzlar/kare/floralGreenGece.png";
import judiGreyKare from "../assets/hovuzlar/kare/judiGrey.png";
import judiGreyKareGece from "../assets/hovuzlar/kare/judiGreyGece.png";
import light from "../assets/kenarkafeller/light.png";
import lightGece from "../assets/kenarkafeller/lightgece.png";
import superstone from "../assets/kenarkafeller/superstonegpt.png";
import superstoneGece from "../assets/kenarkafeller/superstonegptgece.png";
import judiGrey from "../assets/kenarkafeller/judigrey.png";
import judiGreyGece from "../assets/kenarkafeller/judigreygece.png";
import lucaGrey from "../assets/kenarkafeller/lucaGrey.png";
import lucaGreyGece from "../assets/kenarkafeller/lucaGreyGece.png";
import lightorta from "../assets/ortakafeller/lightorta.png";
import lightortaGece from "../assets/ortakafeller/lightortaGece.png";
import judiGreyorta from "../assets/ortakafeller/judiGreyorta.png";
import judiGreyortaGece from "../assets/ortakafeller/judiGreyortaGece.png";
import lucaGreyOrta from "../assets/ortakafeller/lucaGreyOrta.png";
import lucaGreyOrtaGece from "../assets/ortakafeller/lucaGreyOrtaGece.png";
import terasLight from "../assets/teraslar/villa3.webp";
import terasLightGece from "../assets/teraslar/villa3gece.webp";
import terasJudi from "../assets/teraslar/villa2.webp";
import terasJudiGece from "../assets/teraslar/villa3gecee.webp";
import terasLuca from "../assets/teraslar/hovuz.webp";
import terasLucaGece from "../assets/teraslar/hovuzgece.webp";
import mavivilla from "../assets/teraslar/mavivilla.webp";
import mavivillagece from "../assets/teraslar/mavivillagece.webp";
import villa4 from "../assets/teraslar/villa4.webp";
import gpt from "../assets/teraslar/mavihovuz.webp";
import gptgece from "../assets/teraslar/mavihovuzgece.webp";
import type { Category, Option } from "../types";

export const HOVUZLAR: Option[] = [
  { key: "a151", label: "A151", gunduz: a151, gece: a151gece },
  { key: "a155", label: "A155", gunduz: a155, gece: a155gece },
  { key: "a158", label: "A158", gunduz: a158, gece: a158gece },
  { key: "a159", label: "A159", gunduz: a159, gece: a159gece },
  { key: "a161", label: "A161", gunduz: a161, gece: a161gece },
  { key: "a161l", label: "A161L", gunduz: a161l, gece: a161lgece },
  { key: "a218", label: "A218", gunduz: a218, gece: a218gece },
  { key: "a231", label: "A231", gunduz: a231, gece: a231gece },
  { key: "a236", label: "A236", gunduz: a236, gece: a236gece },
  { key: "a276", label: "A276", gunduz: a276, gece: a276gece },
  { key: "bali", label: "Bali", gunduz: bali, gece: baligece },
  {
    key: "floralblue",
    label: "Floral Blue",
    gunduz: floralblue,
    gece: floralblueGece,
  },
  {
    key: "floralgreen",
    label: "Floral Green",
    gunduz: floralgreen,
    gece: floralgreenGece,
  },
  {
    key: "judiGrey",
    label: "Judi Grey",
    gunduz: judiGreyKare,
    gece: judiGreyKareGece,
  },
  { key: "gpt", label: "GPT", gunduz: gpt, gece: gptgece },
];

export const KENAR_KAFELLER: Option[] = [
  { key: "light", label: "Light", gunduz: light, gece: lightGece },
  { key: "judi", label: "Judi Grey", gunduz: judiGrey, gece: judiGreyGece },
  { key: "luca", label: "Luca Grey", gunduz: lucaGrey, gece: lucaGreyGece },
  {
    key: "superstone",
    label: "Superstone",
    gunduz: superstone,
    gece: superstoneGece,
  },
];

export const ORTA_KAFELLER: Option[] = [
  { key: "light", label: "Light", gunduz: lightorta, gece: lightortaGece },
  {
    key: "judi",
    label: "Judi Grey",
    gunduz: judiGreyorta,
    gece: judiGreyortaGece,
  },
  {
    key: "luca",
    label: "Luca Grey",
    gunduz: lucaGreyOrta,
    gece: lucaGreyOrtaGece,
  },
  {
    key: "superstone",
    label: "Superstone",
    gunduz: superstone,
    gece: superstoneGece,
  },
];

export const TERASLAR: Option[] = [
  { key: "judi", label: "Judi", gunduz: terasJudi, gece: terasJudiGece },
  { key: "boz", label: "Boz", gunduz: villa4, gece: terasJudiGece },
  { key: "light", label: "Light", gunduz: terasLight, gece: terasLightGece },
  { key: "luca", label: "Luca", gunduz: terasLuca, gece: terasLucaGece },
  {
    key: "mavivilla",
    label: "Mavi Villa",
    gunduz: mavivilla,
    gece: mavivillagece,
  },
  { key: "gpt", label: "GPT Villa", gunduz: gpt, gece: gptgece },
];

export const CATEGORIES: Category[] = [
  { id: "hovuz", label: "Hovuz", icon: "🏊", options: HOVUZLAR },
  { id: "kenar", label: "Kenar", icon: "🪨", options: KENAR_KAFELLER },
  { id: "orta", label: "Orta", icon: "⬛", options: ORTA_KAFELLER },
  { id: "teras", label: "Teras", icon: "🏡", options: TERASLAR },
];
