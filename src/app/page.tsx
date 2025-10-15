import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';

function GridBackground() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full bg-background">
      {/* Base grid pattern */}
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      {/* Radial gradient mask */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      {/* Dot pattern */}
      <div className="absolute inset-0 z-0 h-full w-full bg-transparent bg-[radial-gradient(hsl(var(--primary)/.1)_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      {/* Animated scanning lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 animate-scan-horizontal" 
             style={{ top: '20%', animationDuration: '4s' }}></div>
        <div className="absolute h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-30 animate-scan-horizontal" 
             style={{ top: '60%', animationDuration: '6s', animationDelay: '1s' }}></div>
        <div className="absolute w-[2px] h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-40 animate-scan-vertical" 
             style={{ left: '30%', animationDuration: '5s' }}></div>
        <div className="absolute w-[2px] h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-30 animate-scan-vertical" 
             style={{ left: '70%', animationDuration: '7s', animationDelay: '2s' }}></div>
      </div>

      {/* Circuit pattern overlay - SVG */}
      <svg className="absolute inset-0 h-full w-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="2" fill="currentColor" className="text-primary" />
            <circle cx="90" cy="90" r="2" fill="currentColor" className="text-primary" />
            <path d="M10 10 L40 10 L40 40 M90 90 L60 90 L60 60" stroke="currentColor" strokeWidth="0.5" className="text-primary" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
    </div>
  );
}


export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-4">
      <GridBackground />
      <Card className="z-10 w-full max-w-md border-border/50 bg-card/60 backdrop-blur-sm shadow-cyan transition-all hover:shadow-primary/50 animate-fade-in">
        <CardHeader className="items-center text-center">
          <Logo className="h-12 w-12 text-primary mb-2" />
          <CardTitle className="text-2xl font-bold font-headline">AOI-Guard Interface</CardTitle>
          <CardDescription>Authenticate to access the QA control center.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Username</Label>
            <Input id="email" type="email" placeholder="qa-engineer@bel.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password or Token</Label>
            <Input id="password" type="password" required placeholder="••••••••" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button asChild className="w-full hover:shadow-cyan focus:shadow-cyan transition-shadow duration-300">
            <Link href="/dashboard">Sign In</Link>
          </Button>
          <div className="flex w-full justify-between text-xs text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Forgot Password?</Link>
            <span>AOI-Guard v1.0</span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Contact your administrator for access.
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
