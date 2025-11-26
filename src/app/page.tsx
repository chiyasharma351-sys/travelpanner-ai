
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const heroImage = PlaceHolderImages.find((p) => p.id === 'travel-hero');

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

       <footer className="py-6 text-center text-sm text-muted-foreground bg-background">
        © {new Date().getFullYear()} TravelGenAI. All rights reserved.
      </footer>
    </div>
  );
}
