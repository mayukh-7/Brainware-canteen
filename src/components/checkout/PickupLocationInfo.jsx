
import React from "react";
import { MapPin } from "lucide-react";

const PickupLocationInfo = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div className="flex items-center mb-4">
        <MapPin className="h-5 w-5 text-primary mr-2" />
        <h2 className="text-xl font-semibold">Pickup Location</h2>
      </div>
      <div className="p-4 bg-gray-50 rounded-md mb-4">
        <p className="font-medium">Main Campus Canteen</p>
        <p className="text-sm text-muted-foreground">
          Brainware University Campus, Building C, Floor 1
        </p>
      </div>
    </div>
  );
};

export default PickupLocationInfo;
