import Shore from "@/components/home/Shore";
import Doors from "@/components/home/Doors";
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
    return (<><Shore /><Doors locked /><ComingSoon /><InstagramFeed tone="cream" /></>);
  }
  return (<><Shore /><Doors locked={false} /><HeroProduct /><PhotoBand src="/assets/photos/stock-sunset-silhouette.jpg" alt="A surfer walking the shore at sunset, board under his arm" eyebrow="Paradise Cove Surf Club" title="Locals since forever." line="Born in Paradise Cove, sold in La Jolla." position="35% 55%" /><Riviera /><SizeBySwell /><InstagramFeed /><Story /></>);
}
