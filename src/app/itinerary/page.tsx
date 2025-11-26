
"use client";

import { useState } from "react";
import Image from "next/image";
import { ItineraryForm, type ItineraryFormValues } from "@/components/itinerary-form";
import { ItineraryDisplay } from "@/components/itinerary-display";
import { generateItineraryAction } from "@/app/itinerary/actions";
import { useToast } from "@/hooks/use-toast";
import type { Itinerary } from "@/lib/types";
import { format } from "date-fns";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { GenerateDetailedItineraryInput } from "@/ai/flows/generate-detailed-itinerary";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const heroImage = PlaceHolderImages.find((p) => p.id === "travel-hero");

export default function ItineraryPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [destination, setDestination] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFormSubmit = async (values: ItineraryFormValues) => {
    setIsGenerating(true);
    setItinerary(null);
    setDestination(values.destination);

    const { dates, ...rest } = values;
    if (!dates.from || !dates.to) {
        toast({
            title: "Error",
            description: "Please select travel dates.",
            variant: "destructive"
        });
        setIsGenerating(false);
        return;
    }
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
       <header className="bg-card border-b py-4">
        <div className="container mx-auto max-w-7xl px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-foreground hover:text-primary">
            <ArrowLeft className="h-5 w-5"/>
            Back to Home
          </Link>
          <h1 className="text-2xl font-bold font-headline text-primary">
            Itinerary Planner
          </h1>
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
