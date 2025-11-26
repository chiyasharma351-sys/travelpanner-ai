"use client";

import { useState } from "react";
import Image from "next/image";
import { ItineraryForm, type ItineraryFormValues } from "@/components/itinerary-form";
import { ItineraryDisplay } from "@/components/itinerary-display";
import { generateItineraryAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import type { Itinerary } from "@/lib/types";
import { format } from "date-fns";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { GenerateDetailedItineraryInput } from "@/ai/flows/generate-detailed-itinerary";

const heroImage = PlaceHolderImages.find((p) => p.id === "travel-hero");

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [destination, setDestination] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFormSubmit = async (values: ItineraryFormValues) => {
    setIsGenerating(true);
    setItinerary(null);
    setDestination(values.destination);

    const { dates, ...rest } = values;
    const inputForAI: GenerateDetailedItineraryInput = {
      ...rest,
      from_date: format(dates.from, "yyyy-MM-dd"),
      to_date: format(dates.to, "yyyy-MM-dd"),
    };

    const result = await generateItineraryAction(inputForAI);

    if (result.error) {
      toast({
        title: "Error Generating Itinerary",
        description:
          result.error ||
          "There was a problem creating your travel plan. Please check your inputs or try again later.",
        variant: "destructive",
      });
    } else {
      setItinerary(result.data as Itinerary);
    }

    setIsGenerating(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="relative h-64 w-full md:h-80">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            TravelGenAI
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-200">
            Your personal AI-powered travel itinerary generator
          </p>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 xl:grid-cols-4 lg:gap-12">
            <aside className="lg:col-span-1 xl:col-span-1">
              <div className="sticky top-8">
                <ItineraryForm
                  onSubmit={handleFormSubmit}
                  isGenerating={isGenerating}
                />
              </div>
            </aside>
            <section className="lg:col-span-2 xl:col-span-3">
              <ItineraryDisplay
                itinerary={itinerary}
                isGenerating={isGenerating}
                destination={destination}
              />
            </section>
          </div>
        </div>
      </main>

       <footer className="py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} TravelGenAI. All rights reserved.
      </footer>
    </div>
  );
}
