import { useState } from "react";
import { GiftCard } from "./GiftCard";
import netflixCard from "@/assets/netflix-card.jpg";
import amazonCard from "@/assets/amazon-card.jpg";
import googleCard from "@/assets/google-card.jpg";
import spotifyCard from "@/assets/spotify-card.jpg";
import steamCard from "@/assets/steam-card.jpg";
import playstationCard from "@/assets/playstation-card.jpg";

export interface GiftCardData {
  id: string;
  name: string;
  image: string;
  minAmount: number;
  maxAmount: number;
  category: string;
  description: string;
  featured?: boolean;
}

const giftCards: GiftCardData[] = [
  {
    id: "netflix",
    name: "Netflix",
    image: netflixCard,
    minAmount: 15,
    maxAmount: 100,
    category: "Entertainment",
    description: "Stream unlimited movies and TV shows",
    featured: true,
  },
  {
    id: "amazon",
    name: "Amazon",
    image: amazonCard,
    minAmount: 10,
    maxAmount: 500,
    category: "Shopping",
    description: "Everything you need, delivered to your door",
    featured: true,
  },
  {
    id: "google",
    name: "Google Play",
    image: googleCard,
    minAmount: 5,
    maxAmount: 200,
    category: "Apps & Games",
    description: "Apps, games, movies and more on Google Play",
    featured: true,
  },
  {
    id: "spotify",
    name: "Spotify",
    image: spotifyCard,
    minAmount: 10,
    maxAmount: 60,
    category: "Music",
    description: "Listen to millions of songs and podcasts",
  },
  {
    id: "steam",
    name: "Steam",
    image: steamCard,
    minAmount: 5,
    maxAmount: 100,
    category: "Gaming",
    description: "The ultimate gaming platform",
  },
  {
    id: "playstation",
    name: "PlayStation",
    image: playstationCard,
    minAmount: 10,
    maxAmount: 100,
    category: "Gaming",
    description: "Games, add-ons and more for PlayStation",
  },
  {
    id: "apple",
    name: "Apple iTunes",
    image: "/placeholder.svg",
    minAmount: 5,
    maxAmount: 200,
    category: "Apps & Games",
    description: "Apps, music, movies and more from Apple",
    featured: true,
  },
  {
    id: "xbox",
    name: "Xbox",
    image: "/placeholder.svg",
    minAmount: 10,
    maxAmount: 100,
    category: "Gaming",
    description: "Xbox games and Live Gold membership",
  },
  {
    id: "uber",
    name: "Uber",
    image: "/placeholder.svg",
    minAmount: 10,
    maxAmount: 100,
    category: "Transportation",
    description: "Rides and food delivery with Uber",
  },
  {
    id: "starbucks",
    name: "Starbucks",
    image: "/placeholder.svg",
    minAmount: 5,
    maxAmount: 100,
    category: "Food & Drinks",
    description: "Coffee, tea and snacks at Starbucks",
  },
  {
    id: "nike",
    name: "Nike",
    image: "/placeholder.svg",
    minAmount: 25,
    maxAmount: 200,
    category: "Fashion",
    description: "Athletic wear and sneakers from Nike",
  },
  {
    id: "target",
    name: "Target",
    image: "/placeholder.svg",
    minAmount: 10,
    maxAmount: 200,
    category: "Shopping",
    description: "Everything you need at Target",
  },
  {
    id: "walmart",
    name: "Walmart",
    image: "/placeholder.svg",
    minAmount: 10,
    maxAmount: 200,
    category: "Shopping",
    description: "Save money, live better at Walmart",
  },
  {
    id: "airbnb",
    name: "Airbnb",
    image: "/placeholder.svg",
    minAmount: 25,
    maxAmount: 500,
    category: "Travel",
    description: "Unique stays and experiences worldwide",
  },
  {
    id: "doordash",
    name: "DoorDash",
    image: "/placeholder.svg",
    minAmount: 10,
    maxAmount: 100,
    category: "Food & Drinks",
    description: "Food delivery from your favorite restaurants",
  },
  {
    id: "sephora",
    name: "Sephora",
    image: "/placeholder.svg",
    minAmount: 10,
    maxAmount: 200,
    category: "Beauty",
    description: "Beauty products and cosmetics",
  },
  {
    id: "bestbuy",
    name: "Best Buy",
    image: "/placeholder.svg",
    minAmount: 10,
    maxAmount: 500,
    category: "Electronics",
    description: "Technology and electronics at Best Buy",
  },
  {
    id: "roblox",
    name: "Roblox",
    image: "/placeholder.svg",
    minAmount: 10,
    maxAmount: 100,
    category: "Gaming",
    description: "Robux for Roblox games and experiences",
  },
];

interface GiftCardGridProps {
  title?: string;
  showFeaturedOnly?: boolean;
  limit?: number;
}

const GiftCardGrid = ({ title, showFeaturedOnly = false, limit }: GiftCardGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  let filteredCards = showFeaturedOnly 
    ? giftCards.filter(card => card.featured)
    : giftCards;

  if (selectedCategory) {
    filteredCards = filteredCards.filter(card => card.category === selectedCategory);
  }

  if (limit) {
    filteredCards = filteredCards.slice(0, limit);
  }

  const categories = [...new Set(giftCards.map(card => card.category))];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {title && (
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            {!showFeaturedOnly && (
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth ${
                    selectedCategory === null
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCards.map((card, index) => (
            <div
              key={card.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <GiftCard card={card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiftCardGrid;