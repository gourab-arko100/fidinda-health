import Link from "next/link";
import { PageHero } from "@/components/Blocks";

export default function NotFound() {
  return (
    <>
      <PageHero crumb="Page not found" kicker="404" title="We couldn't find that page" lede="The link may be old or mistyped." />
      <section className="band tight">
        <div className="wrap btns">
          <Link className="btn btn-navy" href="/">Go to the home page</Link>
          <Link className="btn btn-ghost" href="/contact">Contact us</Link>
        </div>
      </section>
    </>
  );
}
