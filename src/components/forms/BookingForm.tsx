"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const bookingSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().regex(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  tripType: z.string().min(1, "Please select a trip type"),
  pickup: z.string().min(2, "Please enter pickup location"),
  drop: z.string().min(2, "Please enter drop location"),
  date: z.string().min(1, "Please select date and time"),
  carType: z.string().min(1, "Please select a car type"),
  message: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export function BookingForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      tripType: "",
      carType: "",
    }
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      // NOTE: Using dummy keys for Phase 0. These will fail gracefully or send if configured.
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_dummy";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_dummy";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "public_dummy";

      // If keys are dummy, just simulate success for Phase 0 demonstration
      if (serviceId === "service_dummy") {
        console.log("Simulating email send with data:", data);
        await new Promise(resolve => setTimeout(resolve, 1500));
        router.push("/thank-you");
        return;
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          to_name: "Marla Cabs Team",
          from_name: data.fullName,
          mobile: data.mobile,
          email: data.email,
          trip_type: data.tripType,
          pickup: data.pickup,
          drop: data.drop,
          date: data.date,
          car_type: data.carType,
          message: data.message,
        },
        publicKey
      );

      router.push("/thank-you");
    } catch (error) {
      console.error("Failed to send booking enquiry:", error);
      setErrorMsg("Failed to submit your request. Please try calling us instead.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-2xl border shadow-sm">
      {errorMsg && (
        <div className="p-4 bg-red-50 text-red-600 rounded-md text-sm font-medium">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Full Name *</label>
          <input
            {...register("fullName")}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="John Doe"
          />
          {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Mobile Number *</label>
          <input
            {...register("mobile")}
            type="tel"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="9876543210"
          />
          {errors.mobile && <p className="text-xs text-red-500">{errors.mobile.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Email Address</label>
          <input
            {...register("email")}
            type="email"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Trip Type *</label>
          <select
            {...register("tripType")}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="" disabled>Select Trip Type</option>
            <option value="Airport Transfer">Airport Transfer</option>
            <option value="Outstation Drop">Outstation Drop (One Way)</option>
            <option value="Outstation Round Trip">Outstation Round Trip</option>
            <option value="Local City Rental">Local City Rental</option>
            <option value="Corporate Booking">Corporate Booking</option>
            <option value="Wedding Car">Wedding Car</option>
          </select>
          {errors.tripType && <p className="text-xs text-red-500">{errors.tripType.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Pickup Location *</label>
          <input
            {...register("pickup")}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="E.g., Airport Terminal 2 or Home Address"
          />
          {errors.pickup && <p className="text-xs text-red-500">{errors.pickup.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Drop Location *</label>
          <input
            {...register("drop")}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="E.g., Destination City or Hotel Name"
          />
          {errors.drop && <p className="text-xs text-red-500">{errors.drop.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Date & Time *</label>
          <input
            {...register("date")}
            type="datetime-local"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.date && <p className="text-xs text-red-500">{errors.date.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Preferred Car Type *</label>
          <select
            {...register("carType")}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="" disabled>Select Car Type</option>
            <option value="Sedan (Dzire/Etios)">Sedan (Dzire/Etios)</option>
            <option value="SUV (Innova/Ertiga)">SUV (Innova/Ertiga)</option>
            <option value="Tempo Traveller">Tempo Traveller</option>
            <option value="Luxury Vehicle">Luxury Vehicle</option>
          </select>
          {errors.carType && <p className="text-xs text-red-500">{errors.carType.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">Additional Message (Optional)</label>
        <textarea
          {...register("message")}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Any specific requirements or flight details..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center h-12 rounded-md bg-accent px-8 py-2 text-base font-bold text-accent-foreground shadow-sm hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-70 disabled:cursor-not-allowed transition-all"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Submitting Request...
          </>
        ) : (
          "Confirm Booking Request"
        )}
      </button>
      <p className="text-xs text-center text-muted-foreground">
        * No advance payment required. We will call you to confirm your booking and final fare.
      </p>
    </form>
  );
}
