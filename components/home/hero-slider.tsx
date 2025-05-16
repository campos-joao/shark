"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { deals } from '@/lib/data';

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % deals.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + deals.length) % deals.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000); // Resume auto-advance after 10 seconds
  };

  // Next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % deals.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000); // Resume auto-advance after 10 seconds
  };

  // Go to specific slide
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000); // Resume auto-advance after 10 seconds
  };

  return (
    <div className="relative overflow-hidden bg-black h-[280px] sm:h-[320px] md:h-[400px]">
      {/* Slides */}
      <div 
        className="h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)`, width: `${deals.length * 100}%`, display: 'flex' }}
      >
        {deals.map((deal, index) => (
          <div 
            key={deal.id}
            className="relative flex-shrink-0"
            style={{ width: `${100 / deals.length}%` }}
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-black">
              <img 
                src={deal.image} 
                alt={deal.title}
                className="w-full h-full object-cover opacity-70"
              />
            </div>
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white p-6 max-w-lg mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">{deal.title}</h2>
                <p className="text-base sm:text-lg mb-4 sm:mb-6 max-w-md mx-auto">{deal.description}</p>
                <Button size="lg" className="font-medium">
                  Ver Ofertas
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation buttons */}
      <Button 
        onClick={prevSlide}
        variant="ghost" 
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/30 backdrop-blur-sm hover:bg-background/50 text-white rounded-full"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button 
        onClick={nextSlide}
        variant="ghost" 
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/30 backdrop-blur-sm hover:bg-background/50 text-white rounded-full"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {deals.map((_, index) => (
          <button 
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-colors",
              index === currentSlide ? "bg-white" : "bg-white/40 hover:bg-white/60"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}