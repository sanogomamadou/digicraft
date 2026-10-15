/**
 * Avatars illustrés (style graphique, sans traits du visage) pour les témoignages.
 * Chaque client se règle dans content.ts via `avatar`.
 */
export type AvatarSpec = {
  skin: string;
  hair: 'fade' | 'curly' | 'wrap' | 'bald' | 'locs';
  hairColor?: string;
  wrapColor?: string;
  beard?: boolean;
  glasses?: boolean;
  earrings?: boolean;
  outfit: string;
  collar?: 'shirt' | 'crew' | 'blazer';
  bg?: string;
};

/** Assombrit une couleur hex (ombres du cou, oreilles). */
function shade(hex: string, amt = 0.82) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.round(((n >> 16) & 255) * amt);
  const g = Math.round(((n >> 8) & 255) * amt);
  const b = Math.round((n & 255) * amt);
  return `rgb(${r},${g},${b})`;
}

export default function Avatar({ spec, className = '', framing = 'center', title }: { spec: AvatarSpec; className?: string; framing?: 'center' | 'low'; title?: string }) {
  const hc = spec.hairColor ?? '#17181c';
  const dark = shade(spec.skin);
  // 'low' descend le buste pour les médaillons coupés par le haut de la carte
  const viewBox = framing === 'low' ? '0 -46 200 200' : '0 0 200 200';
  const id = `av-${spec.skin.slice(1)}-${spec.hair}-${spec.outfit.slice(1)}`;

  return (
    <svg viewBox={viewBox} className={className} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <defs>
        <clipPath id={id}><rect x="0" y={framing === 'low' ? -46 : 0} width="200" height="200" /></clipPath>
      </defs>
      <rect x="0" y={framing === 'low' ? -46 : 0} width="200" height="200" fill={spec.bg ?? '#e9e9e9'} />
      <g clipPath={`url(#${id})`}>
        {/* Locks / cheveux longs derrière */}
        {spec.hair === 'locs' && (
          <g fill={hc}>
            {[-30, -20, -10, 10, 20, 30].map((dx, i) => (
              <rect key={i} x={100 + dx * 1.15 - 5} y="70" width="10" height={i % 2 ? 66 : 58} rx="5" />
            ))}
          </g>
        )}

        {/* Buste */}
        <path d="M24 200 C24 152 58 134 100 134 C142 134 176 152 176 200 Z" fill={spec.outfit} />
        {spec.collar === 'shirt' && (
          <g fill="#ffffff">
            <path d="M82 136 L100 160 L92 170 L74 142 Z" />
            <path d="M118 136 L100 160 L108 170 L126 142 Z" />
          </g>
        )}
        {spec.collar === 'blazer' && (
          <g>
            <path d="M84 136 L100 176 L116 136 Z" fill="#f4f4f4" />
            <path d="M84 136 L100 176 L90 200 L66 146 Z" fill={shade(spec.outfit, 0.8)} />
            <path d="M116 136 L100 176 L110 200 L134 146 Z" fill={shade(spec.outfit, 0.8)} />
          </g>
        )}
        {spec.collar === 'crew' && <path d="M80 136 C86 148 114 148 120 136" fill="none" stroke={shade(spec.outfit, 0.75)} strokeWidth="4" />}

        {/* Cou */}
        <rect x="86" y="104" width="28" height="38" rx="12" fill={dark} />

        {/* Oreilles */}
        {spec.hair !== 'wrap' && (
          <g fill={dark}>
            <ellipse cx="66" cy="90" rx="6" ry="9" />
            <ellipse cx="134" cy="90" rx="6" ry="9" />
          </g>
        )}
        {spec.earrings && (
          <g fill="#5cb6f9">
            <circle cx="66" cy="104" r="4" />
            <circle cx="134" cy="104" r="4" />
          </g>
        )}

        {/* Tête */}
        <ellipse cx="100" cy="86" rx="34" ry="40" fill={spec.skin} />

        {/* Cheveux */}
        {spec.hair === 'fade' && (
          <path d="M66 84 C64 54 80 44 100 44 C122 44 137 56 134 84 C131 70 120 62 100 62 C82 62 70 70 66 84 Z" fill={hc} />
        )}
        {spec.hair === 'curly' && (
          <g fill={hc}>
            {[[72, 62, 13], [86, 51, 14], [102, 47, 15], [118, 52, 14], [130, 64, 12], [66, 76, 9], [134, 78, 9]].map(([cx, cy, r], i) => (
              <circle key={i} cx={cx} cy={cy} r={r} />
            ))}
          </g>
        )}
        {spec.hair === 'locs' && (
          <path d="M64 86 C60 52 80 42 100 42 C122 42 140 54 136 86 C130 66 118 58 100 58 C82 58 70 66 64 86 Z" fill={hc} />
        )}
        {spec.hair === 'wrap' && (
          <g fill={spec.wrapColor ?? '#086eba'}>
            <path d="M60 92 C52 52 76 30 102 30 C130 30 150 52 140 92 C134 72 120 62 100 62 C80 62 66 72 60 92 Z" />
            <ellipse cx="126" cy="38" rx="18" ry="13" transform="rotate(-24 126 38)" />
            <path d="M60 92 C60 74 66 62 76 56 L72 92 Z" opacity="0.85" />
          </g>
        )}
        {spec.hair === 'bald' && <ellipse cx="112" cy="62" rx="9" ry="5" fill="#ffffff" opacity="0.12" transform="rotate(-20 112 62)" />}

        {/* Barbe */}
        {spec.beard && (
          <path d="M68 90 C70 118 86 128 100 128 C114 128 130 118 132 90 C128 106 116 112 100 112 C84 112 72 106 68 90 Z" fill={hc} />
        )}

        {/* Lunettes */}
        {spec.glasses && (
          <g fill="none" stroke="#17181c" strokeWidth="3">
            <rect x="74" y="80" width="22" height="14" rx="6" />
            <rect x="104" y="80" width="22" height="14" rx="6" />
            <path d="M96 86 L104 86" />
          </g>
        )}
      </g>
    </svg>
  );
}
