import { HeroSection } from "./components/ui/hero-section-with-smooth-bg-shader";

export default function App() {
  return (
    <div className="size-full">
      <HeroSection 
        distortion={1.2}
        speed={0.8}
      />
    </div>
  );
}