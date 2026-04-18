import { Globe, Code, Palette } from 'lucide-react';

export default function Products() {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium mb-4">Nos Services</h2>
          <p className="text-gray-400 text-lg">Une suite complète de solutions pour moderniser votre entreprise.</p>
        </div>

        <div className="grid md:grid-cols-3 border-t border-b border-white/15 bg-white/[0.02] backdrop-blur-xl">
          {/* Product 1 */}
          <div className="p-10 border-b md:border-b-0 md:border-r border-white/15 hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative p-[1.5px] rounded-full bg-gradient-to-br from-[#5eb1ff] to-[#0a1930]">
                <div className="w-12 h-12 rounded-full bg-[#0a0a0a] flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5 w-24">
                <div className="h-[2px] w-full bg-gradient-to-r from-white/20 to-transparent"></div>
                <div className="h-[2px] w-full bg-gradient-to-r from-white/20 to-transparent"></div>
                <div className="h-[2px] w-full bg-gradient-to-r from-white/20 to-transparent"></div>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Création de Sites Web</h3>
            <p className="text-gray-400 text-[15px] leading-relaxed">Sites vitrines, e-commerce, landing pages. Nous concevons des sites rapides, responsives et optimisés pour le référencement.</p>
          </div>

          {/* Product 2 */}
          <div className="p-10 border-b md:border-b-0 md:border-r border-white/15 hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative p-[1.5px] rounded-full bg-gradient-to-br from-[#5eb1ff] to-[#0a1930]">
                <div className="w-12 h-12 rounded-full bg-[#0a0a0a] flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5 w-24">
                <div className="h-[2px] w-full bg-gradient-to-r from-white/20 to-transparent"></div>
                <div className="h-[2px] w-full bg-gradient-to-r from-white/20 to-transparent"></div>
                <div className="h-[2px] w-full bg-gradient-to-r from-white/20 to-transparent"></div>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Applications SaaS</h3>
            <p className="text-gray-400 text-[15px] leading-relaxed">Développement d'applications web sur-mesure pour automatiser vos processus métier et offrir de nouveaux services à vos clients.</p>
          </div>

          {/* Product 3 */}
          <div className="p-10 hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative p-[1.5px] rounded-full bg-gradient-to-br from-[#5eb1ff] to-[#0a1930]">
                <div className="w-12 h-12 rounded-full bg-[#0a0a0a] flex items-center justify-center">
                  <Palette className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5 w-24">
                <div className="h-[2px] w-full bg-gradient-to-r from-white/20 to-transparent"></div>
                <div className="h-[2px] w-full bg-gradient-to-r from-white/20 to-transparent"></div>
                <div className="h-[2px] w-full bg-gradient-to-r from-white/20 to-transparent"></div>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Design Graphique</h3>
            <p className="text-gray-400 text-[15px] leading-relaxed">Logos, flyers, chartes graphiques, filtres Snapchat. Nous créons une identité visuelle forte et mémorable pour votre marque.</p>
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
