
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const OrderSummary = ({ cartItems, cartTotal, isSubmitting, onSubmit }) => {
  const serviceFee = 20; // Service fee in INR
  const total = cartTotal + serviceFee;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="space-y-3 mb-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>
              {item.quantity} × {item.name}
            </span>
            <span className="font-medium">
              ₹{(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      <Separator className="my-4" />
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>₹{cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Service Fee</span>
          <span>₹{serviceFee.toFixed(2)}</span>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex justify-between mb-6">
        <span className="font-semibold">Total</span>
        <span className="font-bold text-lg">
          ₹{total.toFixed(2)}
        </span>
      </div>
      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isSubmitting}
        onClick={onSubmit}
      >
        {isSubmitting ? "Processing..." : "Place Order"}
      </Button>
      <p className="text-xs text-center text-muted-foreground mt-4">
        By placing your order, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};

export default OrderSummary;
