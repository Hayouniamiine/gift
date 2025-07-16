import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Star, Shield, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

// Import gift card images
import netflixCard from "@/assets/netflix-card.jpg";
import amazonCard from "@/assets/amazon-card.jpg";
import googleCard from "@/assets/google-card.jpg";
import spotifyCard from "@/assets/spotify-card.jpg";
import steamCard from "@/assets/steam-card.jpg";
import playstationCard from "@/assets/playstation-card.jpg";

const giftCardData: Record<string, any> = {
  netflix: {
    id: "netflix",
    name: "Netflix",
    image: netflixCard,
    minAmount: 15,
    maxAmount: 100,
    category: "Entertainment",
    description: "Stream unlimited movies and TV shows with Netflix. Access thousands of titles across all genres.",
    features: [
      "Unlimited streaming",
      "No ads on standard plan",
      "Download for offline viewing",
      "Multiple device support"
    ],
    availableAmounts: [15, 25, 50, 100],
    rating: 4.8,
    reviews: 2456
  },
  amazon: {
    id: "amazon",
    name: "Amazon",
    image: amazonCard,
    minAmount: 10,
    maxAmount: 500,
    category: "Shopping",
    description: "Everything you need, delivered to your door. Shop millions of products with Amazon gift cards.",
    features: [
      "Millions of products",
      "Fast shipping",
      "Prime member benefits",
      "Digital and physical items"
    ],
    availableAmounts: [10, 25, 50, 100, 200, 500],
    rating: 4.9,
    reviews: 5432
  },
  google: {
    id: "google",
    name: "Google Play",
    image: googleCard,
    minAmount: 5,
    maxAmount: 200,
    category: "Apps & Games",
    description: "Apps, games, movies and more on Google Play. Perfect for Android users.",
    features: [
      "Apps and games",
      "Movies and TV shows",
      "Books and audiobooks",
      "In-app purchases"
    ],
    availableAmounts: [5, 10, 25, 50, 100, 200],
    rating: 4.7,
    reviews: 3241
  },
  spotify: {
    id: "spotify",
    name: "Spotify",
    image: spotifyCard,
    minAmount: 10,
    maxAmount: 60,
    category: "Music",
    description: "Listen to millions of songs and podcasts with Spotify Premium.",
    features: [
      "Ad-free music",
      "Download for offline",
      "High quality audio",
      "Unlimited skips"
    ],
    availableAmounts: [10, 30, 60],
    rating: 4.6,
    reviews: 1987
  },
  steam: {
    id: "steam",
    name: "Steam",
    image: steamCard,
    minAmount: 5,
    maxAmount: 100,
    category: "Gaming",
    description: "The ultimate gaming platform. Buy games, DLC, and in-game items.",
    features: [
      "Thousands of games",
      "Exclusive deals",
      "Workshop content",
      "Achievement system"
    ],
    availableAmounts: [5, 10, 20, 50, 100],
    rating: 4.8,
    reviews: 4123
  },
  playstation: {
    id: "playstation",
    name: "PlayStation",
    image: playstationCard,
    minAmount: 10,
    maxAmount: 100,
    category: "Gaming",
    description: "Games, add-ons and more for PlayStation. Perfect for PS4 and PS5 owners.",
    features: [
      "PS4 & PS5 games",
      "DLC and add-ons",
      "PlayStation Plus",
      "Digital movies"
    ],
    availableAmounts: [10, 25, 50, 100],
    rating: 4.7,
    reviews: 2876
  }
};

const ProductPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [quantity, setQuantity] = useState(1);

  const product = id ? giftCardData[id] : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    const amount = selectedAmount || (customAmount ? parseInt(customAmount) : null);
    if (!amount) {
      toast({
        title: "Please select an amount",
        description: "Choose a preset amount or enter a custom amount.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} $${amount} gift card${quantity > 1 ? 's' : ''} added to your cart.`,
    });
  };

  const total = (selectedAmount || (customAmount ? parseInt(customAmount) : 0)) * quantity;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary transition-smooth">
            Home
          </Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover"
              />
            </Card>
            
            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">What's Included</h3>
                <div className="space-y-2">
                  {product.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviews} reviews)</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mb-4">{product.name} Gift Card</h1>
              <p className="text-muted-foreground text-lg">{product.description}</p>
            </div>

            {/* Amount Selection */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label className="text-lg font-semibold">Select Amount</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {product.availableAmounts.map((amount: number) => (
                      <Button
                        key={amount}
                        variant={selectedAmount === amount ? "default" : "outline"}
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount("");
                        }}
                        className="h-12"
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="custom-amount">Or enter custom amount</Label>
                  <Input
                    id="custom-amount"
                    type="number"
                    placeholder={`$${product.minAmount} - $${product.maxAmount}`}
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    min={product.minAmount}
                    max={product.maxAmount}
                    className="mt-1"
                  />
                </div>

                <Separator />

                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <Input
                      id="quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="text-center w-20"
                      min={1}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                {total > 0 && (
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-primary hover:opacity-90 h-12 text-lg"
                  size="lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 glass-effect rounded-lg">
                <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-sm font-medium">Instant</div>
                <div className="text-xs text-muted-foreground">Delivery</div>
              </div>
              <div className="text-center p-4 glass-effect rounded-lg">
                <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-sm font-medium">Secure</div>
                <div className="text-xs text-muted-foreground">Payment</div>
              </div>
              <div className="text-center p-4 glass-effect rounded-lg">
                <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-sm font-medium">24/7</div>
                <div className="text-xs text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;