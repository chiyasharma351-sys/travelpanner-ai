
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, CalendarDays, Hotel, Plane } from 'lucide-react';

const heroImage = PlaceHolderImages.find((p) => p.id === 'travel-hero');

const features = [
  {
    icon: <CalendarDays className="h-10 w-10 text-accent" />,
    title: 'AI-Powered Itineraries',
    description: 'Generate detailed, day-by-day travel plans tailored to your destination and dates, powered by generative AI.',
  },
  {
    icon: <Hotel className="h-10 w-10 text-accent" />,
    title: 'Hotel Recommendations',
    description: 'Get hotel suggestions that fit your budget, whether you\'re looking for economical, standard, or luxury stays.',
  },
  {
    icon: <Plane className="h-10 w-10 text-accent" />,
    title: 'Flight Suggestions',
    description: 'Find flight options with pricing guidance to help you book the best deals for your trip.',
  },
  {
    icon: <Briefcase className="h-10 w-10 text-accent" />,
    title: 'Smart Packing Lists',
    description: 'Receive a custom packing list based on your destination\'s climate and planned activities.',
  },
];


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="relative h-screen w-full">
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
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            TravelGenAI
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-gray-200 md:text-xl">
            Your personal AI-powered travel itinerary generator. Create detailed plans, get recommendations, and pack smarter.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/itinerary">
                Start Planning Your Adventure
              </Link>
            </Button>
          </div>
        </div>
      </header>

       <main className="flex-1 bg-background">
        <section className="container mx-auto max-w-7xl px-4 py-16 sm:py-24 lg:py-32">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything You Need for the Perfect Trip
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From planning to packing, TravelGenAI handles all the details so you can focus on the adventure.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                    {feature.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

       <footer className="py-6 text-center text-sm text-muted-foreground bg-background">
        © {new Date().getFullYear()} TravelGenAI. All rights reserved.
      </footer>
    </div>
  );
}
