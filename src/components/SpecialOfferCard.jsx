
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";

const SpecialOfferCard = ({ offer }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: `offer-${offer.id}`,
      name: offer.name,
      description: offer.description,
      price: offer.price,
      image: offer.image,
      isSpecialOffer: true,
    });
  };

  const discount = Math.round(((offer.regularPrice - offer.price) / offer.regularPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-orange-50 to-white">
        <div className="relative pt-[56.25%] overflow-hidden">
          <img  
            alt={offer.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
           src="https://images.unsplash.com/photo-1441986060468-324610e6e6a8" />
          
          <div className="absolute top-2 right-2">
            <Badge variant="default" className="bg-primary text-white font-bold">
              Save {discount}%
            </Badge>
          </div>
        </div>
        
        <CardHeader className="p-4 pb-0">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold text-primary">{offer.name}</CardTitle>
          </div>
          <div className="mt-1 flex items-center">
            <span className="text-lg font-bold">₹{offer.price.toFixed(2)}</span>
            <span className="ml-2 text-sm line-through text-muted-foreground">₹{offer.regularPrice.toFixed(2)}</span>
          </div>
          <CardDescription className="mt-2">
            {offer.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-4 pt-2 flex-grow">
          {offer.validHours && (
            <p className="text-xs text-muted-foreground mt-2">
              Available: {offer.validHours}
            </p>
          )}
          {offer.validUntil && (
            <p className="text-xs text-muted-foreground">
              Valid until: {new Date(offer.validUntil).toLocaleDateString()}
            </p>
          )}
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button 
            onClick={handleAddToCart}
            className="w-full"
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default SpecialOfferCard;
