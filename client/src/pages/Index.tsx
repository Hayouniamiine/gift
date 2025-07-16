import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import GiftCardGrid from "@/components/GiftCardGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <GiftCardGrid 
        title="Featured Gift Cards" 
        showFeaturedOnly={true} 
      />
      <GiftCardGrid 
        title="All Products" 
        showFeaturedOnly={false} 
      />
      <Footer />
    </div>
  );
};

export default Index;
