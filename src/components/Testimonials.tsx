import { Star } from 'lucide-react';
import { motion } from 'motion/react';

const testimonials = [
  {
    text: "DigiCraft a complètement transformé notre présence en ligne. La création de notre nouveau site web et l'application SaaS sur-mesure ont permis d'automatiser nos processus. Nous avons pu scaler notre activité sans effort. L'impact a été extraordinaire pour notre croissance.",
    name: "Sarah M. Harvey",
    role: "COO, TechFlow",
    image: "https://i.pravatar.cc/150?img=47"
  },
  {
    text: "Le niveau d'expertise technique de DigiCraft est impressionnant. Leurs agents IA gèrent désormais des workflows complexes qui nécessitaient auparavant une équipe dédiée. Ce qui prenait des jours est maintenant traité en quelques minutes avec une précision remarquable.",
    name: "Evelyn P. Blake",
    role: "Directrice des Opérations, Nexus",
    image: "https://i.pravatar.cc/150?img=32"
  },
  {
    text: "L'application SaaS développée par DigiCraft a divisé notre temps de traitement par trois. L'équipe a su comprendre nos besoins métiers complexes et les traduire en une solution intuitive et performante. Un partenariat vraiment précieux.",
    name: "Marcus T. Dubois",
    role: "CEO, InnovateX",
    image: "https://i.pravatar.cc/150?img=11"
  },
  {
    text: "Notre nouveau site e-commerce a fait bondir nos ventes de 40% en seulement deux mois. Le design est magnifique, l'expérience utilisateur est fluide, et l'intégration avec nos outils de gestion est parfaite. Merci DigiCraft !",
    name: "Sophie Laurent",
    role: "Fondatrice, RetailPlus",
    image: "https://i.pravatar.cc/150?img=5"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-5 md:px-8 mb-12 md:mb-16 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-4">Ils nous font confiance</h2>
        <p className="text-gray-400 text-base sm:text-lg">Découvrez ce que nos clients disent de nos solutions digitales.</p>
      </div>

      <div className="relative flex overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <motion.div 
          className="flex gap-8 w-max px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div key={index} className="w-[85vw] sm:w-[350px] md:w-[450px] shrink-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 relative hover:bg-white/10 transition-colors flex flex-col">
              <div className="absolute top-8 right-8 text-6xl text-white/10 font-serif leading-none">"</div>
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-[#5eb1ff] text-[#5eb1ff]" />)}
              </div>
              <p className="text-gray-300 leading-relaxed mb-10 relative z-10 flex-1">
                {testimonial.text}
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden shrink-0">
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <div className="font-medium text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
