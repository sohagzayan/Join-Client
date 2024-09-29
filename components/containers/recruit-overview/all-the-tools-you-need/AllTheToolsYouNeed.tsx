'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

let review = [
  {
    id: 1,
    image: 'Message.png',
    title: 'Message candidates as much as you need',
    details:
      'Reach out and pitch your opportunity to candidates or respond to applications, all for free. Messages are unlimited.',
  },
  {
    id: 2,
    image: 'Message.png',
    title: 'Message candidates as much as you need',
    details:
      'Reach out and pitch your opportunity to candidates or respond to applications, all for free. Messages are unlimited.',
  },
  {
    id: 3,
    image: 'Message.png',
    title: 'Message candidates as much as you need',
    details:
      'Reach out and pitch your opportunity to candidates or respond to applications, all for free. Messages are unlimited.',
  },
  {
    id: 4,
    image: 'Message.png',
    title: 'Message candidates as much as you need',
    details:
      'Reach out and pitch your opportunity to candidates or respond to applications, all for free. Messages are unlimited.',
  },
  {
    id: 5,
    image: 'Message.png',
    title: 'Message candidates as much as you need',
    details:
      'Reach out and pitch your opportunity to candidates or respond to applications, all for free. Messages are unlimited.',
  },
  {
    id: 6,
    image: 'Message.png',
    title: 'Message candidates as much as you need',
    details:
      'Reach out and pitch your opportunity to candidates or respond to applications, all for free. Messages are unlimited.',
  },
];

const AllTheToolsYouNeed = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );
  return (
    <div className="p-6">
      <div className="container px-5 lg:px-16 xl:px-20">
        <div className="text-center">
          <h2 className="text-blue-midnight_blue mb-2 text-2xl font-medium tracking-[-1.5px] sm:text-3xl xl:text-4xl">
            All the tools you need to hire, all in one place.
          </h2>
          <p className="text-blue-midnight_blue mb-5">
            Get everything set up within
            <strong> 10 minutes or less</strong>
          </p>
        </div>
        <div className="">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            plugins={[plugin.current]}
            className="border-light_gray w-full rounded-lg border"
          >
            <CarouselContent className="">
              {review.map((review, index) => (
                <CarouselItem key={index} className="">
                  <div className="p-1">
                    <div className="text-blue-midnight_blue relative grid grid-cols-2 items-center px-10 py-24">
                      <div>
                        <Image
                          id="unique_candidate_details_image"
                          src={`/assets/images/${review.image}`}
                          width={450}
                          height={450}
                          sizes="100wv"
                          alt="Ranch Investor"
                        />
                      </div>
                      <div>
                        <h2 className="text-blue-midnight_blue mb-8 text-2xl font-medium tracking-[-1.5px] sm:text-3xl xl:text-4xl">
                          {review.title}
                        </h2>
                        <p>{review.details}</p>
                        <div className="mt-8 flex items-center gap-6">
                          <Button className="bg-blue-midnight_blue hover:bg-blue-midnight_blue/80">
                            Sign up
                          </Button>
                          <Button
                            variant="outline"
                            className="border-blue-midnight_blue"
                          >
                            Learn more
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default AllTheToolsYouNeed;
