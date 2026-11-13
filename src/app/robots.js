// /robots.txt: every page may be indexed; where the sitemap is
import { SITE_URL } from "@/tutorials/tags";

export const dynamic = "force-static";

export default function robots() {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
