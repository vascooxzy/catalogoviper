import React from "react";

// Big coiled viper — monochrome, stylized, prominent for hero/side decor
export const CoiledViper = ({ className = "", stroke = 1.5 }) => (
    <svg
        className={className}
        viewBox="0 0 300 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <defs>
            <pattern id="v-scales" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M0 4 Q 2 0, 4 4 Q 6 8, 8 4" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.55" />
            </pattern>
        </defs>
        {/* Coil body */}
        <path
            d="M150 380 C 60 360, 40 300, 120 280 C 220 260, 260 200, 190 160 C 120 120, 70 150, 90 90 C 110 40, 180 30, 210 80 C 230 110, 215 135, 200 140"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="url(#v-scales)"
        />
        {/* Head */}
        <path
            d="M200 140 C 205 130, 225 125, 240 135 C 252 143, 252 158, 240 165 C 225 172, 205 165, 200 155 Z"
            fill="currentColor"
        />
        {/* Eye */}
        <circle cx="228" cy="147" r="2" fill="#050505" />
        {/* Tongue */}
        <path
            d="M252 150 L 268 146 M252 150 L 268 154 M260 148 L 264 150 L 260 152"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
        />
        {/* Rattle tail */}
        <path
            d="M150 380 L 155 392 L 147 394 L 152 404"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
        />
    </svg>
);

// Snake line — horizontal with fang
export const SnakeLine = ({ className = "", opacity = 0.5 }) => (
    <svg
        className={className}
        viewBox="0 0 800 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ opacity }}
    >
        <path
            d="M0 50 C 80 10, 160 90, 240 50 S 400 10, 480 50 S 640 90, 720 50 L 780 50"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
        />
        <path d="M780 50 L 795 44 L 795 56 Z" fill="currentColor" />
        <path
            d="M795 50 L 805 48 M795 50 L 805 52"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
        />
    </svg>
);

// Slithering vertical snake - good for side column accents
export const VerticalSnake = ({ className = "", opacity = 0.6 }) => (
    <svg
        className={className}
        viewBox="0 0 80 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ opacity }}
    >
        <path
            d="M40 10 C 10 60, 70 110, 40 160 C 10 210, 70 260, 40 310 C 10 360, 70 410, 40 460"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
        {/* Head */}
        <path
            d="M40 10 C 32 4, 22 6, 20 14 C 20 22, 30 24, 40 20 L 48 14 L 48 6 Z"
            fill="currentColor"
        />
        <circle cx="28" cy="12" r="1.5" fill="#050505" />
        {/* Scales accent */}
        {[60, 120, 180, 240, 300, 360, 420].map((y, i) => (
            <circle key={i} cx={i % 2 === 0 ? 38 : 42} cy={y} r="2" fill="currentColor" opacity="0.7" />
        ))}
    </svg>
);

export const ScaleTexture = ({ className = "" }) => (
    <svg
        className={className}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <defs>
            <pattern id="scales" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
                <path
                    d="M0 11 Q 5.5 0, 11 11 Q 16.5 22, 22 11"
                    stroke="currentColor"
                    strokeWidth="0.7"
                    fill="none"
                    opacity="0.6"
                />
            </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#scales)" />
    </svg>
);

// Side-view sports car silhouette — monochrome
export const SportsCar = ({ className = "" }) => (
    <svg
        className={className}
        viewBox="0 0 800 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        {/* Ground reflection */}
        <ellipse cx="400" cy="200" rx="360" ry="6" fill="currentColor" opacity="0.15" />
        {/* Body main */}
        <path
            d="M50 165 L 70 145 C 90 130, 130 115, 200 105 C 240 80, 300 60, 380 55 C 470 50, 540 60, 595 80 C 640 95, 680 110, 720 130 L 745 135 C 760 138, 770 145, 770 160 L 770 175 L 50 175 Z"
            fill="currentColor"
        />
        {/* Roof line accent */}
        <path
            d="M210 110 C 250 85, 310 68, 380 62 C 450 58, 510 65, 570 80"
            stroke="#0E0E0E"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
        />
        {/* Windows */}
        <path
            d="M220 110 C 255 88, 310 72, 375 68 L 375 105 L 220 110 Z"
            fill="#0E0E0E"
            opacity="0.85"
        />
        <path
            d="M385 68 C 445 64, 500 70, 555 82 L 555 105 L 385 105 Z"
            fill="#0E0E0E"
            opacity="0.85"
        />
        {/* Door line */}
        <line x1="380" y1="68" x2="380" y2="160" stroke="#0E0E0E" strokeWidth="1.5" opacity="0.4" />
        {/* Side skirt */}
        <path d="M120 165 L 700 165 L 690 175 L 130 175 Z" fill="#0E0E0E" opacity="0.5" />
        {/* Front grille / headlight */}
        <path d="M55 160 L 75 150 L 95 158 L 75 170 Z" fill="#0E0E0E" opacity="0.7" />
        {/* Wheel arches */}
        <path d="M170 170 A 50 50 0 0 1 270 170 L 170 170 Z" fill="#0E0E0E" />
        <path d="M520 170 A 50 50 0 0 1 620 170 L 520 170 Z" fill="#0E0E0E" />
        {/* Wheels */}
        <circle cx="220" cy="172" r="34" fill="#0E0E0E" stroke="currentColor" strokeWidth="2" />
        <circle cx="220" cy="172" r="22" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
        <circle cx="220" cy="172" r="6" fill="currentColor" />
        {/* spokes left */}
        {[0, 60, 120, 240, 300].map((a, i) => (
            <line
                key={`l${i}`}
                x1="220"
                y1="172"
                x2={220 + 22 * Math.cos((a * Math.PI) / 180)}
                y2={172 + 22 * Math.sin((a * Math.PI) / 180)}
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.7"
            />
        ))}
        <circle cx="570" cy="172" r="34" fill="#0E0E0E" stroke="currentColor" strokeWidth="2" />
        <circle cx="570" cy="172" r="22" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
        <circle cx="570" cy="172" r="6" fill="currentColor" />
        {[0, 60, 120, 240, 300].map((a, i) => (
            <line
                key={`r${i}`}
                x1="570"
                y1="172"
                x2={570 + 22 * Math.cos((a * Math.PI) / 180)}
                y2={172 + 22 * Math.sin((a * Math.PI) / 180)}
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.7"
            />
        ))}
        {/* Door handle */}
        <rect x="430" y="130" width="18" height="3" fill="#0E0E0E" opacity="0.5" />
    </svg>
);
    <svg
        className={className}
        viewBox="0 0 100 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <path
            d="M5 30 C 10 10, 40 8, 60 18 C 78 24, 92 30, 95 35 C 92 40, 78 44, 60 42 C 40 44, 10 42, 5 30 Z"
            fill="currentColor"
        />
        <circle cx="75" cy="28" r="2.5" fill="#050505" />
        <path
            d="M95 35 L 100 33 M95 35 L 100 37"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
        {/* Fangs */}
        <path d="M55 36 L 54 48 L 52 36 Z M 68 38 L 67 50 L 65 38 Z" fill="#050505" />
    </svg>
);
