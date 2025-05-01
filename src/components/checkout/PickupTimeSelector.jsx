
import React from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const generateTimeOptions = () => {
  const options = [];
  const now = new Date();
  const startTime = new Date(now);
  startTime.setMinutes(Math.ceil(now.getMinutes() / 15) * 15);
  startTime.setSeconds(0);
  for (let i = 0; i < 12; i++) {
    const time = new Date(startTime);
    time.setMinutes(time.getMinutes() + (i * 15));
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const timeString = `${formattedHours}:${formattedMinutes} ${ampm}`;
    options.push(timeString);
  }
  return options;
};

const PickupTimeSelector = ({ pickupTime, setPickupTime }) => {
  const timeOptions = generateTimeOptions();

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div className="flex items-center mb-4">
        <Clock className="h-5 w-5 text-primary mr-2" />
        <h2 className="text-xl font-semibold">Pickup Time</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Select when you'd like to pick up your order from the canteen.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
        {timeOptions.map((time) => (
          <Button
            key={time}
            type="button"
            variant={pickupTime === time ? "default" : "outline"}
            className="justify-start"
            onClick={() => setPickupTime(time)}
          >
            {time}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PickupTimeSelector;
