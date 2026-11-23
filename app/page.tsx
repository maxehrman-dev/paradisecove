import Shore from "@/components/home/Shore";
import FirstWave from "@/components/home/FirstWave";
import HeroProduct from "@/components/home/HeroProduct";
import Riviera from "@/components/home/Riviera";
import SizeBySwell from "@/components/home/SizeBySwell";
import Story from "@/components/home/Story";
import ComingSoon from "@/components/home/ComingSoon";
import InstagramFeed from "@/components/InstagramFeed";
import PhotoBand from "@/components/PhotoBand";
import { LAUNCHED } from "@/lib/site";

/** Home: a walk from the sand into the water. Starts on paper, ends in navy (the footer). */
export default function Home() {
  if (!LAUNCHED) {
    return (<><Shore /><FirstWave locked /><ComingSoon /><InstagramFeed tone="cream" /></>);
  }
  return (<><Shore /><FirstWave locked={false} /><HeroProduct /><PhotoBand src="/assets/photos/bluff-surfer.jpg" alt="A surfer on the bluff at sunset, board under his arm" eyebrow="Paradise Cove Surf Club" title="Locals since forever." line="Born in Paradise Cove, sold in La Jolla." position="60% 45%" /><Riviera /><SizeBySwell /><InstagramFeed /><Story /></>);
}
