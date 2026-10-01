import type { JSX } from "react";
import { Header } from "@/components/layout/Header";
import { Faq } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { Preorder } from "@/components/sections/Preorder";
import { Specs } from "@/components/sections/Specs";
import { Testimonials } from "@/components/sections/Testimonials";

const HomePage = (): JSX.Element => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Specs />
        <Testimonials />
        <Preorder />
        <Faq />
      </main>
    </>
  );
};

export default HomePage;
