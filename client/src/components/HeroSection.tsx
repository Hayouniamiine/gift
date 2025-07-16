import { Button } from "./ui/button";
import { Gift, Clock, Shield, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Premium Digital{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Gift Cards
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Instant delivery, secure payments, and the best brands. 
            Send the perfect gift in seconds.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8 py-6"
            >
              <Gift className="w-5 h-5 mr-2" />
              Browse Gift Cards
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6 border-border/50 hover:border-primary transition-smooth"
            >
              Learn More
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl glass-effect">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Instant Delivery</h3>
              <p className="text-muted-foreground text-sm">
                Get your gift card codes delivered instantly via email
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl glass-effect">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
              <p className="text-muted-foreground text-sm">
                Protected by industry-leading security and encryption
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl glass-effect">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground text-sm">
                Round-the-clock customer support for any questions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;