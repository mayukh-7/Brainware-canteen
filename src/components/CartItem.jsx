
import React from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncreaseQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex items-center p-4 border-b border-gray-200 last:border-0"
    >
      <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
        <img  
          alt={item.name}
          className="w-full h-full object-cover"
         src="https://images.unsplash.com/photo-1568799716770-ffe2f1dc9902" />
      </div>
      
      <div className="ml-4 flex-grow">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
        <div className="mt-1 text-sm font-semibold">₹{(item.price * item.quantity).toFixed(2)}</div>
      </div>
      
      <div className="flex items-center space-x-2 ml-4">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full"
          onClick={handleDecreaseQuantity}
        >
          <Minus className="h-3 w-3" />
        </Button>
        
        <span className="w-6 text-center">{item.quantity}</span>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full"
          onClick={handleIncreaseQuantity}
        >
          <Plus className="h-3 w-3" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
          onClick={handleRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default CartItem;
