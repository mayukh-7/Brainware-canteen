
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Clock, MapPin, Receipt, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const OrderConfirmationPage = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const serviceFee = 20; // Service fee in INR

  useEffect(() => {
    // Retrieve order details from localStorage
    const orderData = localStorage.getItem("lastOrder");
    
    if (!orderData) {
      // If no order data, redirect to home
      navigate("/");
      return;
    }
    
    try {
      const parsedOrder = JSON.parse(orderData);
      setOrder(parsedOrder);
    } catch (error) {
      console.error("Failed to parse order data:", error);
      navigate("/");
    }
  }, [navigate]);

  if (!order) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md border overflow-hidden"
          >
            <div className="bg-primary/10 p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="h-10 w-10 text-primary" />
              </motion.div>
              
              <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
              <p className="text-gray-600">
                Your order has been received and is being prepared.
              </p>
              <p className="text-lg font-semibold mt-2">
                Order #{order.orderId}
              </p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 text-primary mr-2" />
                    <h3 className="font-semibold">Pickup Time</h3>
                  </div>
                  <p>{order.pickupTime}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center mb-2">
                    <MapPin className="h-5 w-5 text-primary mr-2" />
                    <h3 className="font-semibold">Pickup Location</h3>
                  </div>
                  <p>Main Campus Canteen</p>
                  <p className="text-sm text-muted-foreground">
                    Brainware University Campus, Building C, Floor 1
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <Receipt className="h-5 w-5 text-primary mr-2" />
                  <h2 className="text-xl font-semibold">Order Details</h2>
                </div>
                
                <div className="space-y-3 mb-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
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
                    <span>₹{(order.total - serviceFee).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span>₹{serviceFee.toFixed(2)}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg">
                    ₹{order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <h3 className="font-semibold mb-2">Payment Method</h3>
                <p>
                  {order.paymentMethod === "cash"
                    ? "Pay at Pickup"
                    : "Paid Online"}
                </p>
              </div>

              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  A confirmation email has been sent to {order.email}
                </p>
                
                <Button asChild size="lg">
                  <Link to="/menu">
                    Order More Food <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
