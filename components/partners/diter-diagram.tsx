"use client"

// DITER 2026 node-graph visual — inline SVG, no external file needed
export function DiterArchitectureDiagram() {
  const pillars = [
    { label: "Diaspora\n+ Nómadas", angle: -90 },
    { label: "Inteligencia\nExportadora", angle: -30 },
    { label: "Retención\ny Valor", angle: 30 },
    { label: "Puente\nTransnacional", angle: 90 },
    { label: "Interoperabilidad\nOperacional", angle: 150 },
    { label: "Arquitectura\nde Innovación", angle: 210 },
  ]

  const cx = 220
  const cy = 220
  const r = 140

  return (
    <div className="relative w-full flex items-center justify-center py-4">
      <svg
        viewBox="0 0 440 440"
        className="w-full max-w-[420px] h-auto"
        aria-hidden="true"
      >
        {/* Outer decorative ring */}
        <circle cx={cx} cy={cy} r={r + 40} fill="none" stroke="rgba(255,87,87,0.06)" strokeWidth="1" strokeDasharray="4 6" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,87,87,0.12)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={r - 40} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="2 4" />

        {/* Spokes and node dots */}
        {pillars.map((p, i) => {
          const rad = (p.angle - 90) * (Math.PI / 180) + (Math.PI / 2)
          const nx = cx + r * Math.cos((p.angle - 90) * (Math.PI / 180))
          const ny = cy + r * Math.sin((p.angle - 90) * (Math.PI / 180))
          const tx = cx + (r + 58) * Math.cos((p.angle - 90) * (Math.PI / 180))
          const ty = cy + (r + 58) * Math.sin((p.angle - 90) * (Math.PI / 180))
          return (
            <g key={i}>
              <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="rgba(255,87,87,0.2)" strokeWidth="1" />
              <circle cx={nx} cy={ny} r={5} fill="#FF5757" opacity="0.8" />
              <circle cx={nx} cy={ny} r={10} fill="rgba(255,87,87,0.1)" />
              <text
                x={tx}
                y={ty}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(255,255,255,0.55)"
                fontSize="8"
                fontFamily="system-ui, sans-serif"
                fontWeight="600"
              >
                {p.label.split("\n").map((line, li) => (
                  <tspan key={li} x={tx} dy={li === 0 ? "-0.5em" : "1.2em"}>{line}</tspan>
                ))}
              </text>
            </g>
          )
        })}

        {/* Central node */}
        <circle cx={cx} cy={cy} r={48} fill="rgba(255,87,87,0.05)" stroke="rgba(255,87,87,0.25)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={36} fill="rgba(10,10,10,0.9)" stroke="rgba(255,87,87,0.4)" strokeWidth="1.5" />
        <text x={cx} y={cy - 8} textAnchor="middle" fill="#FF5757" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="900" letterSpacing="2">DITER</text>
        <text x={cx} y={cy + 6} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="700">2026</text>
        <text x={cx} y={cy + 20} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="system-ui, sans-serif">Framework</text>
      </svg>
    </div>
  )
}
