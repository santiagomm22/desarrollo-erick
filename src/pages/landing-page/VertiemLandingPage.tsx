import { Header } from "../../components/landing-page/Header";
import { Hero } from "@/components/landing-page/Hero";
import { Gallery } from "@/components/landing-page/Gallery";
import { About } from "@/components/landing-page/About";

export default function VertiemLandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Gallery />
      <About />
    </div>
  );
}
