import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { GiftCardData } from "./GiftCardGrid";
import { Link } from "react-router-dom";

interface GiftCardProps {
  card: GiftCardData;
}

export const GiftCard = ({ card }: GiftCardProps) => {
  return (
    <Card className="gift-card overflow-hidden group cursor-pointer">
      <Link to={`/product/${card.id}`}>
        <div className="relative">
          <img
            src={card.image}
            alt={card.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {card.featured && (
            <Badge className="absolute top-3 left-3 bg-gradient-primary text-white border-0">
              Featured
            </Badge>
          )}
        </div>
        
        <CardContent className="p-6">
          <div className="space-y-3">
            <div>
              <h3 className="text-xl font-semibold text-foreground">
                {card.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {card.description}
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                ${card.minAmount} - ${card.maxAmount}
              </div>
              <Badge variant="secondary" className="text-xs">
                {card.category}
              </Badge>
            </div>
            
            <Button 
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
              size="sm"
            >
              View Details
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};