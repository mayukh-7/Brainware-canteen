
import React from "react";
import { CreditCard } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const PaymentMethodSelector = ({ paymentMethod, setPaymentMethod }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center mb-4">
        <CreditCard className="h-5 w-5 text-primary mr-2" />
        <h2 className="text-xl font-semibold">Payment Method</h2>
      </div>
      <Tabs defaultValue="cash" value={paymentMethod} onValueChange={setPaymentMethod}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="cash">Pay at Pickup</TabsTrigger>
          <TabsTrigger value="card">Pay Online</TabsTrigger>
        </TabsList>
        <TabsContent value="cash" className="p-4 bg-gray-50 rounded-md">
          <p className="text-sm">
            You'll pay for your order when you pick it up at the canteen.
          </p>
        </TabsContent>
        <TabsContent value="card">
          <div className="space-y-4">
            <div>
              <label htmlFor="cardName" className="block text-sm font-medium mb-1">
                Name on Card
              </label>
              <Input id="cardName" placeholder="Enter name on card" />
            </div>
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                Card Number
              </label>
              <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiry" className="block text-sm font-medium mb-1">
                  Expiry Date
                </label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div>
                <label htmlFor="cvc" className="block text-sm font-medium mb-1">
                  CVC
                </label>
                <Input id="cvc" placeholder="123" />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentMethodSelector;
