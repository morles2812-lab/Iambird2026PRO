
'use client';

import { useState, useMemo, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FolderKanban, Syringe, Crown, Ticket, Send, CheckCircle2, Youtube, MessageCircle, Diamond, Landmark, Store, Smartphone, Star } from 'lucide-react';
import Link from 'next/link';

const baseFeatures = [
  'Vip Paid Features 🔥',
  'ID principal seguro 🔘',
  'Máx Tiro a la cabeza',
  'Tiro a la cabeza sin escope',
  'Máx Aimassit',
  'Menor reculso',
  'Ayuda de punto de max Vip',
  'Bala mágica real',
  'Bala de acertar en cobertura',
  'Daño alto máx',
  'Bloqueo de punto máx',
  'Punto automático',
  'Seguimiento de bala máx',
  '60-140 fps en todos los dispositivos',
  'Soporte para todas las versiones',
];

const androidFeatures = [
  'Plataforma: Android',
  'No requiere PC',
]

const productsData = [
  {
    name: 'Archivos VIP',
    icon: (props: any) => <FolderKanban {...props} />,
    options: [
      { duration: '20 dias', price: 5, aim: 'AIM 45%' },
      { duration: '25 dias', price: 10, aim: 'AIM 50%' },
      { duration: '2 meses', price: 15, aim: 'AIM 60%' },
      { duration: '3 meses', price: 20, aim: 'AIM 70%' },
      { duration: 'Permanente', price: 50, aim: 'AIM 80%' },
    ],
    features: [...baseFeatures, ...androidFeatures],
  },
  {
    name: 'Inyector VIP',
    icon: (props: any) => <Syringe {...props} />,
    options: [
      { duration: '1 mes', price: 10 },
    ],
    features: [...baseFeatures, ...androidFeatures],
  },
  {
    name: 'Aimbot VIP',
    icon: (props: any) => <Crown {...props} />,
    options: [{ duration: 'Permanente', price: 70 }],
    description: 'Incluye Inyector + Archivos VIP',
    features: ['Plataforma: Android', 'No requiere PC', ...baseFeatures, 'AIM 100%'],
  },
  {
    name: 'IOS VIP',
    icon: (props: any) => <Smartphone {...props} />,
    options: [{ duration: '1 mes', price: 10, aim: 'AIM 50%' }],
    features: [
      'Plataforma: iOS',
      'Requiere PC para instalación',
      ...baseFeatures.slice(0, 5), // Only some base features
    ],
  },
];

const coupons: { [key: string]: number } = {
  'DESCUENTO10': 0.10,
  'PROMO20': 0.20,
  'IAMBIRD5': 5,
};

type ProductOption = {
  duration: string;
  price: number;
  aim?: string;
};

type Product = {
    name: string;
    icon: (props: any) => JSX.Element;
    options: ProductOption[];
    features: string[];
    description?: string;
};

function PaymentModal({ product, selectedOption, finalPrice }: { product: Product, selectedOption: ProductOption, finalPrice: number }) {
  const telegramMessage = useMemo(() => {
    const message = `Hola, quiero adquirir el producto: ${product.name} (${selectedOption.duration}) por un precio de $${finalPrice.toFixed(2)} USD.`;
    return encodeURIComponent(message);
  }, [product, selectedOption, finalPrice]);

  const whatsappOroIDMessage = useMemo(() => {
    const message = `pagaré por Oro Por ID Pasame la ID será el paquete de ${product.name} (${selectedOption.duration})`;
    return encodeURIComponent(message);
  }, [product, selectedOption]);

  const whatsappTransferenciaMessage = useMemo(() => {
    const message = `Soy de México, pagaré con transferencia. Pásame los datos. Será el paquete ${product.name} (${selectedOption.duration})`;
    return encodeURIComponent(message);
  }, [product, selectedOption]);

  const whatsappOxxoMessage = useMemo(() => {
    const message = `Pagaré por OXXO depósito. Será el paquete ${product.name} (${selectedOption.duration})`;
    return encodeURIComponent(message);
  }, [product, selectedOption]);
  
  const whatsappLinkOroID = `https://wa.me/526651497461?text=${whatsappOroIDMessage}`;
  const whatsappLinkTransferencia = `https://wa.me/526651497461?text=${whatsappTransferenciaMessage}`;
  const whatsappLinkOxxo = `https://wa.me/526651497461?text=${whatsappOxxoMessage}`;


  return (
    <DialogContent className="bg-background/95 backdrop-blur-sm border-primary/20 text-foreground">
      <DialogHeader>
        <DialogTitle className="text-center text-3xl font-bold neon-glow">Seleccionar método de pago</DialogTitle>
        <DialogDescription className="text-center text-muted-foreground">
          Elige cómo te gustaría completar tu compra para <span className="font-bold text-primary neon-glow">{product.name.toUpperCase()} ({selectedOption.duration})</span>.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-3 pt-4">
        <Button asChild className="w-full text-xl font-bold text-white animated-gradient animate-button-pulse button-glow" size="lg" style={{paddingTop: '1.5rem', paddingBottom: '1.5rem'}}>
          <Link href="https://www.paypal.me/MORALESARREDONDO161" target="_blank" rel="noopener noreferrer">
            Pagar con PayPal
          </Link>
        </Button>
        <Button asChild className="w-full text-lg font-semibold text-white animated-gradient" size="lg">
           <Link href={whatsappLinkTransferencia} target="_blank" rel="noopener noreferrer">
            <Landmark className="mr-2"/> Transferencia MX
          </Link>
        </Button>
        <Button asChild className="w-full text-lg font-semibold text-white animated-gradient" size="lg">
           <Link href={whatsappLinkOxxo} target="_blank" rel="noopener noreferrer">
            <Store className="mr-2"/> Depósito OXXO MX
          </Link>
        </Button>
         <Button asChild className="w-full text-lg font-semibold text-white animated-gradient" size="lg">
          <Link href={whatsappLinkOroID} target="_blank" rel="noopener noreferrer">
            <Diamond className="mr-2" /> Oro por ID
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full text-lg font-semibold border-primary text-primary hover:bg-primary/10" size="lg">
          <Link href={`https://t.me/IamBiird?text=${telegramMessage}`} target="_blank" rel="noopener noreferrer">
            Contáctame
          </Link>
        </Button>
      </div>
    </DialogContent>
  );
}


function ProductCard({ product }: { product: Product }) {
  const [selectedOption, setSelectedOption] = useState<ProductOption>(product.options[0]);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleOptionChange = (value: string) => {
    const option = product.options.find((opt) => opt.duration === value);
    if (option) {
      setSelectedOption(option);
      applyCoupon(coupon, option.price);
    }
  };

  const applyCoupon = (couponCode: string, price: number) => {
    const code = couponCode.toUpperCase();
    const foundDiscount = coupons[code];
    if (foundDiscount) {
      if (foundDiscount < 1) { // Percentage discount
        setDiscount(price * foundDiscount);
      } else { // Fixed amount discount
        setDiscount(foundDiscount);
      }
    } else {
      setDiscount(0);
    }
  };

  const handleCouponChange = (e: ChangeEvent<HTMLInputElement>) => {
    const couponCode = e.target.value;
    setCoupon(couponCode);
    applyCoupon(couponCode, selectedOption.price);
  };
  
  const finalPrice = useMemo(() => {
    let price = selectedOption.price - discount;
    return price > 0 ? price : 0;
  }, [selectedOption, discount]);
  
  const features = useMemo(() => {
    let currentFeatures = [...product.features];
    
    // Always remove any existing AIM feature to start fresh
    currentFeatures = currentFeatures.filter(f => !f.startsWith('AIM'));

    if (selectedOption.aim) {
      currentFeatures.push(selectedOption.aim);
    } else if (product.name === 'Aimbot VIP') {
      currentFeatures.push('AIM 100%');
    }

    // Sort to bring "Plataforma" to the top
    return currentFeatures.sort((a, b) => {
      if (a.startsWith('Plataforma:')) return -1;
      if (b.startsWith('Plataforma:')) return 1;
      return 0;
    });
  }, [product.features, selectedOption, product.name]);


  return (
    <Dialog>
      <Card className="flex flex-col overflow-hidden rounded-xl border-primary/20 bg-card/80 shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/30">
        <CardHeader className="items-center p-6 text-center">
          {product.icon({ className: 'h-16 w-16 text-primary animated-icon' })}
          <CardTitle className="mt-4 text-3xl font-bold text-card-foreground neon-glow animate-text-pulse">{product.name}</CardTitle>
          {product.description && <CardDescription className="text-sm text-muted-foreground mt-1">{product.description}</CardDescription>}
        </CardHeader>
        <CardContent className="flex flex-1 flex-col items-center justify-start gap-6 px-6 text-center">
          <ul className="text-left space-y-2 text-muted-foreground">
            {features.map(feature => (
              <li key={feature} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="neon-glow">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-baseline mt-auto pt-6">
            <p className="text-6xl font-extrabold text-foreground neon-glow animate-text-pulse">${finalPrice.toFixed(2)}</p>
            <span className="ml-2 text-2xl font-semibold text-muted-foreground">USD</span>
          </div>
          
          {product.options.length > 1 ? (
            <ToggleGroup
              type="single"
              defaultValue={selectedOption.duration}
              onValueChange={handleOptionChange}
              className="flex-wrap justify-center"
            >
              {product.options.map((option) => (
                <ToggleGroupItem
                  key={option.duration}
                  value={option.duration}
                  aria-label={`Seleccionar ${option.duration}`}
                  className="capitalize"
                >
                  {option.duration}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          ) : (
            <p className="text-base font-semibold text-muted-foreground">{selectedOption.duration}</p>
          )}
        </CardContent>
        <CardFooter className="flex-col gap-4 p-6">
          <div className="w-full flex items-center gap-2">
             <Ticket className="text-primary animated-icon"/>
             <Input 
               type="text" 
               placeholder="Código de cupón" 
               className="bg-input/50"
               value={coupon}
               onChange={handleCouponChange}
              />
          </div>
          <DialogTrigger asChild>
            <Button className="w-full text-2xl font-bold animated-gradient text-white hover:opacity-90 transition-opacity duration-300 animate-button-pulse button-glow" size="lg" style={{paddingTop: '1.75rem', paddingBottom: '1.75rem'}}>
                Comprar Ahora por ${finalPrice.toFixed(2)}
            </Button>
          </DialogTrigger>
        </CardFooter>
      </Card>
      <PaymentModal product={product} selectedOption={selectedOption} finalPrice={finalPrice} />
    </Dialog>
  );
}

export default function Home() {
  const telegramMessageContact = encodeURIComponent("Hola, estoy interesado en tus productos y quisiera más información.");
  const whatsappMessage = encodeURIComponent("hola estoy interesado vengo de la página eres iambird?");
  const whatsappLink = `https://wa.me/526651497461?text=${whatsappMessage}`;

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background antialiased selection:bg-primary/20">
      <main className="container mx-auto flex flex-col items-center justify-center px-4 py-16">
        <header className="text-center mb-12 flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-3">
              <h2 className="font-headline text-5xl md:text-6xl font-bold tracking-tighter text-white neon-glow animate-text-pulse">
                IAMBIRD WEEBSHOOP
              </h2>
              <Crown className="text-yellow-400 h-12 w-12 animated-icon" />
          </div>
          <h1 className="font-headline text-6xl md:text-8xl font-black tracking-tighter text-primary neon-glow animate-text-pulse">
            BLOODSTRIKE MOBILE
          </h1>
          <p className="text-green-400 font-semibold text-lg animate-pulse neon-glow">producto disponible</p>
        </header>

        <div className="grid w-full max-w-sm gap-8 md:max-w-4xl lg:max-w-7xl md:grid-cols-2 lg:grid-cols-4">
          {productsData.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
        
        <div className="mt-12 w-full max-w-sm flex flex-col gap-4">
            <Button asChild className="w-full text-lg font-semibold text-white animated-gradient" size="lg">
              <Link href={`https://t.me/IamBiird?text=${telegramMessageContact}`} target="_blank" rel="noopener noreferrer">
                <Send className="mr-2"/> Contáctame por Telegram
              </Link>
            </Button>
            <Button asChild className="w-full text-lg font-semibold text-white animated-gradient" size="lg">
                <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2"/> WhatsApp
                </Link>
            </Button>
             <Button asChild className="w-full text-lg font-semibold text-white animated-gradient" size="lg">
              <Link href="https://t.me/+ms9tmkM-PqAzMmIx" target="_blank" rel="noopener noreferrer">
                <Star className="mr-2"/> Referencias
              </Link>
            </Button>
            <div className="flex gap-4">
              <Button asChild className="w-full text-lg font-semibold text-white animated-gradient" size="lg">
                <Link href="https://youtube.com/@iambirdvip?si=jdB4HjChl0TdgVzl" target="_blank" rel="noopener noreferrer">
                  <Youtube className="mr-2"/> YouTube
                </Link>
              </Button>
              <Button asChild className="w-full text-lg font-semibold text-white animated-gradient" size="lg">
                <Link href="https://www.tiktok.com/@iambirdbs?_r=1&_t=ZS-92nHHWSxcme" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2.019c-1.756-.25-3.243-1.32-4-2.85v4.51c0 1.944-1.564 3.5-3.5 3.5S4 11.514 4 9.57V2.85C2.756 1.32 1.26.25 0 0v2.019c1.235.992 2.252 2.32 2.5 4h2.019C4.25 3.01 5.56 1.5 7 1.5v-1.5z"/>
                  </svg>
                   TikTok
                </Link>
              </Button>
            </div>
        </div>


        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p className="neon-glow">&copy; 2026 Iambird. Todos los derechos reservados.</p>
        </footer>
      </main>
    </div>
  );
}

    

    