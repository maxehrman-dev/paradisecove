import Shore from "@/components/home/Shore";
import FirstWave from "@/components/home/FirstWave";
import HeroProduct from "@/components/home/HeroProduct";
import Riviera from "@/components/home/Riviera";
import SizeBySwell from "@/components/home/SizeBySwell";
import Story from "@/components/home/Story";
import ComingSoon from "@/components/home/ComingSoon";
import { LAUNCHED } from "@/lib/site";

/** Home: a walk from the sand into the water. Starts on paper, ends in navy (the footer). */
export default function Home() {
  if (!LAUNCHED) {
    return (<><Shore /><FirstWave locked /><ComingSoon /></>);
  }
  return (<><Shore /><FirstWave locked={false} /><HeroProduct /><Riviera /><SizeBySwell /><Story /></>);
}
