"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState, useEffect } from 'react';

export function PromoBanners() {
  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 8,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              } else {
                // Reset to some future date when it hits zero
                days = 2;
                hours = 8;
                minutes = 45;
                seconds = 30;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <section className="py-12">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Flash Sale Banner */}
          <Card className="overflow-hidden border-0 shadow-lg">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-gradient-to-tr from-blue-600 to-indigo-700 p-8 text-white flex flex-col justify-center">
                  <h3 className="text-xl font-bold mb-2">FLASH SALE</h3>
                  <p className="text-3xl font-bold mb-4">Até 50% OFF</p>
                  <p className="text-sm opacity-80 mb-6">As melhores ofertas em equipamentos gamers. Aproveite enquanto durar!</p>
                  
                  <div className="mb-6">
                    <p className="text-xs mb-2">Oferta termina em:</p>
                    <div className="flex space-x-2 font-mono">
                      <div className="bg-white/10 backdrop-blur-sm rounded py-1 px-3 text-center">
                        <span className="text-xl font-bold block">{formatTime(timeLeft.days)}</span>
                        <span className="text-xs">Dias</span>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded py-1 px-3 text-center">
                        <span className="text-xl font-bold block">{formatTime(timeLeft.hours)}</span>
                        <span className="text-xs">Horas</span>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded py-1 px-3 text-center">
                        <span className="text-xl font-bold block">{formatTime(timeLeft.minutes)}</span>
                        <span className="text-xs">Min</span>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded py-1 px-3 text-center">
                        <span className="text-xl font-bold block">{formatTime(timeLeft.seconds)}</span>
                        <span className="text-xs">Seg</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-fit bg-white text-blue-700 hover:bg-blue-50">
                    Ver Ofertas
                  </Button>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-900/50 flex items-center justify-center p-6">
                  <img 
                    src="https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Gaming Equipment on Sale" 
                    className="max-h-64 object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Free Shipping Banner */}
          <Card className="overflow-hidden border-0 shadow-lg">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-gradient-to-tr from-orange-500 to-amber-600 p-8 text-white flex flex-col justify-center">
                  <h3 className="text-xl font-bold mb-2">FRETE GRÁTIS</h3>
                  <p className="text-3xl font-bold mb-4">Em compras acima de R$499</p>
                  <p className="text-sm opacity-80 mb-6">Válido para todo o Brasil. Aproveite esta oportunidade e economize no frete!</p>
                  
                  <Button className="w-fit bg-white text-orange-600 hover:bg-orange-50">
                    Saiba Mais
                  </Button>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-900/50 flex items-center justify-center p-6">
                  <img 
                    src="https://images.pexels.com/photos/4393668/pexels-photo-4393668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Free Shipping" 
                    className="max-h-64 object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}