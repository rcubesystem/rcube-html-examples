import TutorialPage from "@/components/TutorialPage";
import { pageKeywords } from "@/tutorials/tags";
import { topicBySlug } from "@/tutorials/topics";

// the Introduction's tags (the title and description are the site's)
export const metadata = { keywords: pageKeywords(topicBySlug("introduction")) };

// Home page = the first tutorial
export default function Home() {
  return <TutorialPage slug="introduction" />;
}
