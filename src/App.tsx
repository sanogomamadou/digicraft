/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Lazy loading de toutes les sections non-critiques (sous le fold)
// Elles sont téléchargées en arrière-plan après le chargement du hero
const CollaborativeAgents = lazy(() => import('./components/CollaborativeAgents'));
const Features = lazy(() => import('./components/Features'));
const Action = lazy(() => import('./components/Action'));
const Projects = lazy(() => import('./components/Projects'));
const Steps = lazy(() => import('./components/Steps'));
const Pricing = lazy(() => import('./components/Pricing'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Footer = lazy(() => import('./components/Footer'));
const Chatbot = lazy(() => import('./components/Chatbot'));

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function App() {
  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Force scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen text-white font-sans selection:bg-[#5eb1ff]/30 overflow-x-hidden">
      <Navbar />
      <main>
        {/* Hero chargé immédiatement — critique pour le LCP */}
        <Hero />
        {/* Sections chargées en lazy — visibles seulement en scrollant */}
        <Suspense fallback={null}>
          <CollaborativeAgents />
          <Features />
          <Action />
          <Projects />
          <Steps />
          <Pricing />
          <Testimonials />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      {/* Chatbot en dernier — chargé uniquement quand le reste est prêt */}
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
    </div>
  );
}
