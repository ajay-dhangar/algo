// import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import AdsComponent from "@site/src/components/AdsComponent";
// import BrowserWindow from "@site/src/components/BrowserWindow";
import ArrayVisualizations from "@site/src/components/DSA/arrays/ArrayVisualizations";
import BubbleSortVisualization from "@site/src/components/DSA/arrays/BubbleSortVisualization";
import InsertionSortVisualization from "@site/src/components/DSA/arrays/InsertionSortVisualization";
import SelectionSortVisualization from "@site/src/components/DSA/arrays/SelectionSortVisualization";
import Highlight from "@site/src/components/Highlight";
import MDXComponents from "@theme-original/MDXComponents";
// import Image from "@theme/IdealImage";
import TabItem from "@theme/TabItem";
import Tabs from "@theme/Tabs";
import { FaReact } from "react-icons/fa";
// import LiteYouTubeEmbed from "react-lite-youtube-embed";
import GiscusComponent from "../components/GiscusComponent";
import Ads from "@site/src/components/AdsComponent/Ads";

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // custom
  Tabs,
  TabItem,
  Highlight,
  ArrayVisualizations,
  BubbleSortVisualization,
  SelectionSortVisualization,
  FaReact,
  InsertionSortVisualization,
//   Image,
//   LiteYouTubeEmbed,
//   LinearSearchVisualizer,
  AdsComponent,
  GiscusComponent,
  Ads,
};
