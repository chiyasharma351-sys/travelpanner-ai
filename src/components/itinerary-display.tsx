
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import type { Itinerary, ItineraryDay } from "@/lib/types";
import { Sunrise, Sun, Moon, Utensils, TramFront, NotebookText, Lightbulb, Map, Hotel, Plane, Briefcase } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ItineraryDisplayProps = {
  itinerary: Itinerary | null;
  isGenerating: boolean;
  destination: string | null;
};

const iconMap = {
  morning: <Sunrise className="h-5 w-5 text-primary" />,
  afternoon: <Sun className="h-5 w-5 text-primary" />,
  evening: <Moon className="h-5 w-5 text-primary" />,
  commute: <TramFront className="h-5 w-5 text-primary" />,
  food: <Utensils className="h-5 w-5 text-primary" />,
  notes: <NotebookText className="h-5 w-5 text-primary" />,
};

function ItineraryDayView({ dayData }: { dayData: ItineraryDay }) {
  return (
    <div className="space-y-6 pt-2 text-sm">
      <div className="flex items-start gap-4">
        <div className="mt-1 flex-shrink-0">{iconMap.morning}</div>
        <div>
          <h4 className="font-semibold text-foreground">Morning</h4>
          <p className="text-muted-foreground">{dayData.morning}</p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="mt-1 flex-shrink-0">{iconMap.afternoon}</div>
        <div>
          <h4 className="font-semibold text-foreground">Afternoon</h4>
          <p className="text-muted-foreground">{dayData.afternoon}</p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="mt-1 flex-shrink-0">{iconMap.evening}</div>
        <div>
          <h4 className="font-semibold text-foreground">Evening</h4>
          <p className="text-muted-foreground">{dayData.evening}</p>
        </div>
      </div>
      
      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-start gap-4">
           <div className="mt-1 flex-shrink-0">{iconMap.food}</div>
          <div>
            <h4 className="font-semibold text-foreground">Food</h4>
            <p className="text-muted-foreground">{dayData.food}</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
           <div className="mt-1 flex-shrink-0">{iconMap.commute}</div>
          <div>
            <h4 className="font-semibold text-foreground">Commute</h4>
            <p className="text-muted-foreground">{dayData.commute}</p>
          </div>
        </div>
      </div>

      {dayData.notes && (
        <>
          <Separator />
          <div className="flex items-start gap-4">
             <div className="mt-1 flex-shrink-0">{iconMap.notes}</div>
            <div>
              <h4 className="font-semibold text-foreground">Notes</h4>
              <p className="text-muted-foreground">{dayData.notes}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ItinerarySkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-3/4 rounded-md" />
                <Skeleton className="mt-2 h-4 w-1/2 rounded-md" />
            </CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-10 w-full rounded-md" />
                <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                    {[...Array(3)].map((_, i) => (
                        <AccordionItem value={`item-${i}`} key={i}>
                            <AccordionTrigger>
                                <Skeleton className="h-6 w-1/3 rounded-md" />
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <Skeleton className="h-5 w-5 rounded-full" />
                                        <div className="w-full space-y-2">
                                            <Skeleton className="h-4 w-1/4 rounded-md" />
                                            <Skeleton className="h-4 w-full rounded-md" />
                                            <Skeleton className="h-4 w-3/4 rounded-md" />
                                        </div>
                                    </div>
                                    <Separator/>
                                    <div className="flex items-start gap-4">
                                        <Skeleton className="h-5 w-5 rounded-full" />
                                        <div className="w-full space-y-2">
                                            <Skeleton className="h-4 w-1/4 rounded-md" />
                                            <Skeleton className="h-4 w-full rounded-md" />
                                        </div>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
            <CardFooter>
                 <Skeleton className="h-20 w-full rounded-md" />
            </CardFooter>
        </Card>
    );
}

export function ItineraryDisplay({ itinerary, isGenerating, destination }: ItineraryDisplayProps) {
  if (isGenerating) {
    return <ItinerarySkeleton />;
  }

  if (!itinerary) {
    return (
      <Card className="flex h-full min-h-[400px] flex-col items-center justify-center border-2 border-dashed bg-card/50 lg:min-h-full">
        <div className="text-center">
            <Map className="mx-auto h-16 w-16 text-muted-foreground" />
            <h3 className="mt-4 font-headline text-xl font-semibold">Your Adventure Awaits</h3>
            <p className="mt-2 text-center text-muted-foreground">
              Your generated itinerary will appear here.
            </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="animate-in fade-in-50 duration-500">
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
                <CardTitle className="font-headline text-3xl capitalize">{destination ? `Your Trip to ${destination}` : 'Your Trip Itinerary'}</CardTitle>
                <CardDescription className="mt-2">{itinerary.trip_summary}</CardDescription>
            </div>
            <Badge variant="secondary" className="mt-1 w-fit shrink-0 sm:mt-0">{itinerary.total_days} Days</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="itinerary">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="hotels">Hotels</TabsTrigger>
            <TabsTrigger value="flights">Flights</TabsTrigger>
            <TabsTrigger value="packing">Packing List</TabsTrigger>
          </TabsList>
          <TabsContent value="itinerary" className="mt-4">
            <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
              {itinerary.itinerary.map((day, index) => (
                <AccordionItem value={`item-${index}`} key={day.day}>
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    <span className="truncate">Day {day.day}: {day.title}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ItineraryDayView dayData={day} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
          <TabsContent value="hotels" className="mt-4">
            <div className="space-y-4">
              {itinerary.hotel_recommendations.map((hotel, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl flex items-center gap-2"><Hotel className="h-5 w-5" />{hotel.name}</CardTitle>
                        <CardDescription>{hotel.price_range}</CardDescription>
                      </div>
                      <Button asChild>
                        <Link href={hotel.booking_link} target="_blank">Book Now</Link>
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="flights" className="mt-4">
             <div className="space-y-4">
              {itinerary.flight_recommendations.map((flight, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl flex items-center gap-2"><Plane className="h-5 w-5" />{flight.airline}</CardTitle>
                        <CardDescription>{flight.price_range}</CardDescription>
                      </div>
                      <Button asChild>
                        <Link href={flight.booking_link} target="_blank">Book Now</Link>
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="packing" className="mt-4">
            <Card>
              <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2"><Briefcase className="h-5 w-5" />Packing List</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {itinerary.packing_list.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>Travel Tips</AlertTitle>
          <AlertDescription>
            <p className="whitespace-pre-wrap">{itinerary.tips}</p>
          </AlertDescription>
        </Alert>
      </CardFooter>
    </Card>
  );
}
