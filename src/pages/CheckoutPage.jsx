
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import ContactInformationForm from "@/components/checkout/ContactInformationForm";
import PickupTimeSelector from "@/components/checkout/PickupTimeSelector";
import PickupLocationInfo from "@/components/checkout/PickupLocationInfo";
import PaymentMethodSelector from "@/components/checkout/PaymentMethodSelector";
import OrderSummary from "@/components/checkout/OrderSummary";

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [pickupTime, setPickupTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const serviceFee = 20; // Service fee in INR

  // Effect to redirect if cart becomes empty
  useEffect(() => {
    if (cartItems.length === 0 && !isSubmitting) {
      // Only navigate if the cart is truly empty and we are not in the middle of submitting
      toast({
        title: "Cart is empty",
        description: "Redirecting you back to the cart.",
        variant: "destructive",
        duration: 3000,
      });
      navigate("/cart");
    }
  }, [cartItems, isSubmitting, navigate, toast]);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !pickupTime) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate order processing
    setTimeout(() => {
      const orderDetails = {
        orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
        items: cartItems,
        total: cartTotal + serviceFee, // Use INR total
        name,
        email,
        phone,
        pickupTime,
        paymentMethod,
        orderDate: new Date().toISOString(),
      };

      localStorage.setItem("lastOrder", JSON.stringify(orderDetails));
      clearCart();
      // Navigate is called *after* state updates and async operations
      navigate("/order-confirmation");
      // No need to set isSubmitting back to false here, as the component will unmount
    }, 1500);
  };

  // Render null or a loading state if cart is empty but submission is in progress
  if (cartItems.length === 0 && !isSubmitting) {
     // This prevents rendering the form momentarily before the effect redirects
     return null; 
  }


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/cart" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Cart
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Checkout</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Checkout Form Sections */}
              <div className="lg:col-span-2">
                <ContactInformationForm
                  name={name}
                  setName={setName}
                  email={email}
                  setEmail={setEmail}
                  phone={phone}
                  setPhone={setPhone}
                />
                <PickupTimeSelector
                  pickupTime={pickupTime}
                  setPickupTime={setPickupTime}
                />
                <PickupLocationInfo />
                <PaymentMethodSelector
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                />
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <OrderSummary
                  cartItems={cartItems}
                  cartTotal={cartTotal}
                  isSubmitting={isSubmitting}
                  onSubmit={handleSubmit} // Pass the handler directly
                />
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
