import { notFound } from "next/navigation";
import TutorialPage from "@/components/TutorialPage";
import { topics, topicBySlug } from "@/tutorials/topics";
import { pageKeywords } from "@/tutorials/tags";

// One static page per tutorial; any other address is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const topic = topicBySlug(slug);
  if (!topic) return {};
  // the tutorial's own tags first (src/tutorials/tags.js), its address as the canonical one, and a link preview
  return {
    title: topic.title,
    description: topic.summary,
    keywords: pageKeywords(topic),
    alternates: { canonical: `/${slug}` },
    openGraph: { type: "article", url: `/${slug}`, title: `${topic.title} · rcube-html examples`, description: topic.summary },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  if (!topicBySlug(slug)) notFound();
  return <TutorialPage key={slug} slug={slug} />;
}
