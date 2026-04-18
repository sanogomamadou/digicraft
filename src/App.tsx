/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CollaborativeAgents from './components/CollaborativeAgents';
import Features from './components/Features';
import Action from './components/Action';
import Projects from './components/Projects';
import Steps from './components/Steps';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

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
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/30 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <CollaborativeAgents />
        <Features />
        <Action />
        <Projects />
        <Steps />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
