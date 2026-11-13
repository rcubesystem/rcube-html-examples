// /sitemap.xml: every page, for search engines (made at build time)
import { SITE_URL } from "@/tutorials/tags";
import { topics } from "@/tutorials/topics";

export const dynamic = "force-static";

export default function sitemap() {
  return topics.map((topic) => ({
    url: topic.slug === "introduction" ? `${SITE_URL}/` : `${SITE_URL}/${topic.slug}`,
    changeFrequency: "monthly",
    priority: topic.slug === "introduction" ? 1 : 0.7,
  }));
}
