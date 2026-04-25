import { Globe, Code, Palette } from 'lucide-react';

export default function Products() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium mb-4">Nos Services</h2>
          <p className="text-gray-400 text-lg">Une suite complète de solutions pour moderniser votre entreprise.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Product 1 */}
          <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl hover:border-[#5eb1ff]/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#111] flex items-center justify-center mb-6 border border-white/5">
              <Globe className="w-6 h-6 text-[#5eb1ff]" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Visibilité Digitale</h3>
            <p className="text-gray-400 text-[15px] leading-relaxed">Attirez plus de clients avec des sites web professionnels, rapides et optimisés pour le référencement (SEO).</p>
          </div>

          {/* Product 2 */}
          <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl hover:border-[#5eb1ff]/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#111] flex items-center justify-center mb-6 border border-white/5">
              <Code className="w-6 h-6 text-[#5eb1ff]" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Applications Métiers</h3>
            <p className="text-gray-400 text-[15px] leading-relaxed">Développement d'applications web sur-mesure pour automatiser vos processus métier et gagner du temps.</p>
          </div>

          {/* Product 3 */}
          <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl hover:border-[#5eb1ff]/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#111] flex items-center justify-center mb-6 border border-white/5">
              <Palette className="w-6 h-6 text-[#5eb1ff]" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Design Graphique</h3>
            <p className="text-gray-400 text-[15px] leading-relaxed">Logos, chartes graphiques, supports de communication. Nous créons une identité visuelle forte pour votre marque.</p>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <button className="bg-white text-black px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors whitespace-nowrap">
            Voir tous nos services
          </button>
        </div>
      </div>
    </section>
  );
}
