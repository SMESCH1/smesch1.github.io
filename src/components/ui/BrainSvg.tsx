export function BrainSvg() {
  return (
    <div className="relative w-72 h-72 lg:w-[340px] lg:h-[340px] animate-float">
      <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(214,162,50,.16) 0%, transparent 70%)" }}></div>
      <div className="relative w-full h-full">
        <svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bgGrad" cx="50%" cy="50%" r="52%">
              <stop offset="0%" stopColor="#1E3A6E" />
              <stop offset="78%" stopColor="#0B1A30" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#0B1A30" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="200" height="200" fill="url(#bgGrad)" />

          <g id="brain-network" fill="none" strokeLinecap="round" transform="translate(0, -8)">
            {/* Outline silhouette */}
            <line className="edge-draw" stroke="#D6A232" strokeWidth="1.8" strokeOpacity="0.9" x1="32" y1="86" x2="66" y2="54" style={{ animationDelay: '.02s' }} />
            <line className="edge-draw" stroke="#D6A232" strokeWidth="1.65" strokeOpacity="0.9" x1="66" y1="54" x2="94" y2="50" style={{ animationDelay: '.06s' }} />
            <line className="edge-draw" stroke="#B9851D" strokeWidth="1.55" strokeOpacity="0.88" x1="94" y1="50" x2="120" y2="58" style={{ animationDelay: '.08s' }} />
            <line className="edge-draw" stroke="#F4F4F2" strokeWidth="1.3" strokeOpacity="0.6" x1="120" y1="58" x2="156" y2="78" style={{ animationDelay: '.10s' }} />
            <line className="edge-draw" stroke="#9AA4B2" strokeWidth="1.15" strokeOpacity="0.7" x1="156" y1="78" x2="162" y2="102" style={{ animationDelay: '.14s' }} />
            <line className="edge-draw" stroke="#CFD3DA" strokeWidth="1.3" strokeOpacity="0.7" x1="162" y1="102" x2="152" y2="122" style={{ animationDelay: '.16s' }} />
            <line className="edge-draw" stroke="#B9851D" strokeWidth="1.4" strokeOpacity="0.85" x1="152" y1="122" x2="133" y2="136" style={{ animationDelay: '.18s' }} />
            <line className="edge-draw" stroke="#D6A232" strokeWidth="1.55" strokeOpacity="0.88" x1="133" y1="136" x2="108" y2="146" style={{ animationDelay: '.20s' }} />
            <line className="edge-draw" stroke="#F4F4F2" strokeWidth="1.25" strokeOpacity="0.62" x1="108" y1="146" x2="87" y2="130" style={{ animationDelay: '.22s' }} />
            <line className="edge-draw" stroke="#D6A232" strokeWidth="1.5" strokeOpacity="0.85" x1="87" y1="130" x2="60" y2="125" style={{ animationDelay: '.24s' }} />
            <line className="edge-draw" stroke="#CFD3DA" strokeWidth="1.2" strokeOpacity="0.68" x1="60" y1="125" x2="38" y2="112" style={{ animationDelay: '.26s' }} />
            <line className="edge-draw" stroke="#9AA4B2" strokeWidth="1.05" strokeOpacity="0.7" x1="38" y1="112" x2="32" y2="86" style={{ animationDelay: '.28s' }} />

            {/* Sides into hubs */}
            <line className="edge-draw" stroke="#F4F4F2" strokeWidth="0.95" strokeOpacity="0.55" x1="32" y1="86" x2="72" y2="82" style={{ animationDelay: '.30s' }} />
            <line className="edge-draw" stroke="#9AA4B2" strokeWidth="1.1" strokeOpacity="0.65" x1="38" y1="112" x2="72" y2="82" style={{ animationDelay: '.32s' }} />
            <line className="edge-draw" stroke="#CFD3DA" strokeWidth="1.25" strokeOpacity="0.7" x1="38" y1="112" x2="88" y2="109" style={{ animationDelay: '.34s' }} />
            <line className="edge-draw" stroke="#B9851D" strokeWidth="1.3" strokeOpacity="0.85" x1="156" y1="78" x2="138" y2="94" style={{ animationDelay: '.36s' }} />
            <line className="edge-draw" stroke="#9AA4B2" strokeWidth="1.1" strokeOpacity="0.65" x1="162" y1="102" x2="138" y2="94" style={{ animationDelay: '.38s' }} />
            <line className="edge-draw" stroke="#CFD3DA" strokeWidth="1.25" strokeOpacity="0.7" x1="162" y1="102" x2="132" y2="119" style={{ animationDelay: '.40s' }} />
            <line className="edge-draw" stroke="#F4F4F2" strokeWidth="1.0" strokeOpacity="0.55" x1="152" y1="122" x2="132" y2="119" style={{ animationDelay: '.42s' }} />

            {/* Top outline to upper hubs */}
            <line className="edge-draw" stroke="#D6A232" strokeWidth="1.4" strokeOpacity="0.85" x1="66" y1="54" x2="72" y2="82" style={{ animationDelay: '.44s' }} />
            <line className="edge-draw" stroke="#F4F4F2" strokeWidth="1.25" strokeOpacity="0.6" x1="66" y1="54" x2="98" y2="80" style={{ animationDelay: '.46s' }} />
            <line className="edge-draw" stroke="#B9851D" strokeWidth="1.35" strokeOpacity="0.85" x1="94" y1="50" x2="98" y2="80" style={{ animationDelay: '.48s' }} />
            <line className="edge-draw" stroke="#F4F4F2" strokeWidth="0.95" strokeOpacity="0.5" x1="94" y1="50" x2="122" y2="85" style={{ animationDelay: '.50s' }} />
            <line className="edge-draw" stroke="#CFD3DA" strokeWidth="1.3" strokeOpacity="0.7" x1="120" y1="58" x2="122" y2="85" style={{ animationDelay: '.52s' }} />
            <line className="edge-draw" stroke="#B9851D" strokeWidth="1.35" strokeOpacity="0.82" x1="120" y1="58" x2="138" y2="94" style={{ animationDelay: '.54s' }} />

            {/* Hub-to-hub */}
            <line className="edge-draw" stroke="#D6A232" strokeWidth="1.05" strokeOpacity="0.78" x1="72" y1="82" x2="98" y2="80" style={{ animationDelay: '.56s' }} />
            <line className="edge-draw" stroke="#F4F4F2" strokeWidth="1.3" strokeOpacity="0.6" x1="98" y1="80" x2="122" y2="85" style={{ animationDelay: '.58s' }} />
            <line className="edge-draw" stroke="#B9851D" strokeWidth="1.3" strokeOpacity="0.85" x1="122" y1="85" x2="138" y2="94" style={{ animationDelay: '.60s' }} />
            <line className="edge-draw" stroke="#D6A232" strokeWidth="1.45" strokeOpacity="0.85" x1="122" y1="85" x2="115" y2="106" style={{ animationDelay: '.62s' }} />
            <line className="edge-draw" stroke="#D6A232" strokeWidth="1.8" strokeOpacity="0.9" x1="138" y1="94" x2="115" y2="106" style={{ animationDelay: '.64s' }} />
            <line className="edge-draw" stroke="#CFD3DA" strokeWidth="1.2" strokeOpacity="0.7" x1="72" y1="82" x2="88" y2="109" style={{ animationDelay: '.66s' }} />
            <line className="edge-draw" stroke="#D6A232" strokeWidth="1.45" strokeOpacity="0.85" x1="115" y1="106" x2="132" y2="119" style={{ animationDelay: '.68s' }} />

            {/* Lower outline to lower hubs */}
            <line className="edge-draw" stroke="#F4F4F2" strokeWidth="1.25" strokeOpacity="0.6" x1="60" y1="125" x2="88" y2="109" style={{ animationDelay: '.70s' }} />
            <line className="edge-draw" stroke="#B9851D" strokeWidth="1.35" strokeOpacity="0.85" x1="87" y1="130" x2="88" y2="109" style={{ animationDelay: '.72s' }} />
            <line className="edge-draw" stroke="#D6A232" strokeWidth="1.45" strokeOpacity="0.88" x1="87" y1="130" x2="115" y2="106" style={{ animationDelay: '.74s' }} />
            <line className="edge-draw" stroke="#D6A232" strokeWidth="1.7" strokeOpacity="0.9" x1="108" y1="146" x2="115" y2="106" style={{ animationDelay: '.76s' }} />
            <line className="edge-draw" stroke="#9AA4B2" strokeWidth="1.05" strokeOpacity="0.65" x1="108" y1="146" x2="132" y2="119" style={{ animationDelay: '.78s' }} />
            <line className="edge-draw" stroke="#CFD3DA" strokeWidth="1.3" strokeOpacity="0.72" x1="133" y1="136" x2="132" y2="119" style={{ animationDelay: '.80s' }} />

            {/* Brain stem */}
            <line className="edge-draw" stroke="#D6A232" strokeWidth="1.55" strokeOpacity="0.88" x1="108" y1="146" x2="118" y2="154" style={{ animationDelay: '.90s' }} />
            <line className="edge-draw" stroke="#B9851D" strokeWidth="1.4" strokeOpacity="0.85" x1="133" y1="136" x2="132" y2="152" style={{ animationDelay: '.92s' }} />
            <line className="edge-draw" stroke="#F4F4F2" strokeWidth="1.0" strokeOpacity="0.55" x1="118" y1="154" x2="132" y2="152" style={{ animationDelay: '.94s' }} />
            <line className="edge-draw" stroke="#D6A232" strokeWidth="1.6" strokeOpacity="0.88" x1="118" y1="154" x2="123" y2="174" style={{ animationDelay: '.96s' }} />
            <line className="edge-draw" stroke="#D6A232" strokeWidth="1.6" strokeOpacity="0.88" x1="132" y1="152" x2="138" y2="176" style={{ animationDelay: '.98s' }} />

            <g id="brain-nodes">
              <circle className="node-pulse" cx="32" cy="86" r="3.3" fill="#F4F4F2" style={{ animationDelay: '.02s' }} />
              <circle className="node-pulse" cx="66" cy="54" r="3.3" fill="#F4F4F2" style={{ animationDelay: '.06s' }} />
              <circle className="node-pulse" cx="94" cy="50" r="3.7" fill="#F4F4F2" style={{ animationDelay: '.08s' }} />
              <circle className="node-pulse" cx="120" cy="58" r="3.3" fill="#F4F4F2" style={{ animationDelay: '.10s' }} />
              <circle className="node-pulse" cx="156" cy="78" r="3.3" fill="#F4F4F2" style={{ animationDelay: '.14s' }} />
              <circle className="node-pulse" cx="162" cy="102" r="3.5" fill="#F4F4F2" style={{ animationDelay: '.16s' }} />
              <circle className="node-pulse" cx="152" cy="122" r="3.3" fill="#F4F4F2" style={{ animationDelay: '.18s' }} />
              <circle className="node-pulse" cx="133" cy="136" r="3.3" fill="#F4F4F2" style={{ animationDelay: '.20s' }} />
              <circle className="node-pulse" cx="108" cy="146" r="3.3" fill="#F4F4F2" style={{ animationDelay: '.22s' }} />
              <circle className="node-pulse" cx="87" cy="130" r="3.3" fill="#F4F4F2" style={{ animationDelay: '.24s' }} />
              <circle className="node-pulse" cx="60" cy="125" r="3.3" fill="#F4F4F2" style={{ animationDelay: '.26s' }} />
              <circle className="node-pulse" cx="38" cy="112" r="3.3" fill="#F4F4F2" style={{ animationDelay: '.28s' }} />

              <circle className="node-pulse" cx="72" cy="82" r="4.6" fill="#D6A232" style={{ animationDelay: '.30s' }} />
              <circle className="node-pulse" cx="98" cy="80" r="3.6" fill="#F4F4F2" style={{ animationDelay: '.34s' }} />
              <circle className="node-pulse" cx="122" cy="85" r="3.6" fill="#F4F4F2" style={{ animationDelay: '.38s' }} />
              <circle className="node-pulse" cx="138" cy="94" r="4.6" fill="#D6A232" style={{ animationDelay: '.42s' }} />
              <circle className="node-pulse" cx="88" cy="109" r="3.6" fill="#F4F4F2" style={{ animationDelay: '.58s' }} />
              <circle className="node-pulse" cx="115" cy="106" r="4.8" fill="#D6A232" style={{ animationDelay: '.62s' }} />
              <circle className="node-pulse" cx="132" cy="119" r="3.6" fill="#F4F4F2" style={{ animationDelay: '.66s' }} />

              <circle className="node-pulse" cx="118" cy="154" r="2.8" fill="#F4F4F2" style={{ animationDelay: '.92s' }} />
              <circle className="node-pulse" cx="132" cy="152" r="2.8" fill="#F4F4F2" style={{ animationDelay: '.94s' }} />
              <circle className="node-pulse" cx="123" cy="174" r="2.4" fill="#F4F4F2" style={{ animationDelay: '.98s' }} />
              <circle className="node-pulse" cx="138" cy="176" r="2.4" fill="#F4F4F2" style={{ animationDelay: '1.0s' }} />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
