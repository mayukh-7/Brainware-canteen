
import React from "react";
import { motion } from "framer-motion";
import { Plus, Info } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/use-toast";

const FoodCard = ({ item }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(item);
  };

  const showDetails = () => {
    toast({
      title: item.name,
      description: (
        <div className="mt-2 space-y-2">
          <p>{item.description}</p>
          <div className="text-xs text-muted-foreground mt-1">
            {item.nutritionalInfo && (
              <p>
                Calories: {item.nutritionalInfo.calories} • Protein: {item.nutritionalInfo.protein}
              </p>
            )}
            {item.allergens && item.allergens.length > 0 && (
              <p className="text-yellow-600">
                Allergens: {item.allergens.join(", ")}
              </p>
            )}
          </div>
        </div>
      ),
      duration: 5000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="food-card h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden border-2 hover:border-primary/50 transition-colors">
        <div className="relative pt-[56.25%] overflow-hidden bg-muted">
          <img  
            alt={item.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
           src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0" />
          
          {item.tags && item.tags.includes("popular") && (
            <div className="absolute top-2 right-2">
              <Badge variant="default" className="bg-primary text-white">
                Popular
              </Badge>
            </div>
          )}
        </div>
        
        <CardHeader className="p-4 pb-0">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-bold">{item.name}</CardTitle>
            <div className="text-lg font-bold text-primary">₹{item.price.toFixed(2)}</div>
          </div>
          <CardDescription className="mt-1 line-clamp-2 h-10">
            {item.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-4 pt-2 flex-grow">
          <div className="flex flex-wrap gap-1 mt-1">
            {item.tags && item.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-xs category-badge"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={showDetails}
            className="text-xs"
          >
            <Info className="h-3.5 w-3.5 mr-1" />
            Details
          </Button>
          
          <Button 
            onClick={handleAddToCart}
            size="sm"
            className="text-xs"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default FoodCard;
