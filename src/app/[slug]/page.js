import { notFound } from "next/navigation";
import TutorialPage from "@/components/TutorialPage";
import { topics, topicBySlug } from "@/tutorials/topics";

// One static page per tutorial
export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const topic = topicBySlug(slug);
  return topic ? { title: topic.title, description: topic.summary } : {};
}

export default async function Page({ params }) {
  const { slug } = await params;
  if (!topicBySlug(slug)) notFound();
  return <TutorialPage key={slug} slug={slug} />;
}
