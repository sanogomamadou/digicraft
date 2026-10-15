/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { prefersReducedMotion } from './components/ui';

// Lazy loading de toutes les sections non-critiques (sous le fold)
const Services = lazy(() => import('./components/Services'));
const TextMarquee = lazy(() => import('./components/Marquee').then(m => ({ default: m.TextMarquee })));
const CtaMarquee = lazy(() => import('./components/Marquee').then(m => ({ default: m.CtaMarquee })));
const Work = lazy(() => import('./components/Work'));
const Reviews = lazy(() => import('./components/Reviews'));
const Action = lazy(() => import('./components/Action'));
const Process = lazy(() => import('./components/Process'));
const Pricing = lazy(() => import('./components/Pricing'));
const Footer = lazy(() => import('./components/Footer'));
const Chatbot = lazy(() => import('./components/Chatbot'));

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function App() {
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    // Défilement fluide (désactivé si l'utilisateur préfère moins d'animations)
    if (prefersReducedMotion()) return;
    // allowNestedScroll : une zone interne (chat) ne prend la main que si elle peut encore défiler
    const lenis = new Lenis({ duration: 1.15, easing: t => 1 - Math.pow(1 - t, 4), allowNestedScroll: true });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Les sections lazy changent la hauteur de page : on recalcule les déclencheurs
    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    ro.observe(document.body);

    return () => {
      ro.disconnect();
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return (
    <div className="min-h-screen bg-paper text-text font-sans overflow-x-clip">
      <Navbar />
      <main>
        {/* Hero chargé immédiatement — critique pour le LCP */}
        <Hero />
        <Suspense fallback={null}>
          <Services />
          <TextMarquee />
          <Work />
          <CtaMarquee />
          <Reviews />
          <Action />
          <Process />
          <Pricing />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
    </div>
  );
}
