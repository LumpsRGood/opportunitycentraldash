import React from 'react';

/**
 * Super friendly Syrup Avatar based on the friendly stacked pancake character:
 * Stack of fluffy golden pancakes with warm maple syrup dripping down, 
 * melted square of butter on top, big cartoon eyes, cheerful wide smile,
 * and waving hand with white glove.
 */
interface SyrupAvatarProps {
  size?: number;
  className?: string;
}

export function SyrupAvatar({ size = 36, className = '' }: SyrupAvatarProps) {
  return (
    <div 
      className={`relative shrink-0 rounded-full flex items-center justify-center overflow-visible select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="w-full h-full drop-shadow-sm overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Butter gradient */}
          <linearGradient id="butterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff5a5" />
            <stop offset="50%" stopColor="#ffd84d" />
            <stop offset="100%" stopColor="#e5a900" />
          </linearGradient>

          {/* Syrup gradient */}
          <linearGradient id="syrupGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d46e15" />
            <stop offset="40%" stopColor="#b34e06" />
            <stop offset="100%" stopColor="#7a3002" />
          </linearGradient>

          {/* Golden pancake gradient */}
          <linearGradient id="pancakeGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffe6a8" />
            <stop offset="60%" stopColor="#f5be64" />
            <stop offset="100%" stopColor="#d48c26" />
          </linearGradient>

          <linearGradient id="pancakeGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f7c87c" />
            <stop offset="100%" stopColor="#cf7e1b" />
          </linearGradient>

          {/* Syrup drip shine */}
          <linearGradient id="shineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
          </linearGradient>

          {/* Blue sneaker gradient */}
          <linearGradient id="shoeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>

        {/* --- BLUE SNEAKERS & LEGS --- */}
        {/* Left leg & sneaker */}
        <path d="M 36 80 L 34 88" stroke="#f5be64" strokeWidth="4.5" strokeLinecap="round" />
        <ellipse cx="30" cy="91" rx="9" ry="5.5" fill="url(#shoeGrad)" />
        <path d="M 22 93 C 24 96 36 96 38 93 C 38 91 22 91 22 93 Z" fill="#ffffff" />
        <path d="M 28 89 L 34 89 M 29 87 L 33 87" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />

        {/* Right leg & sneaker */}
        <path d="M 64 80 L 66 88" stroke="#f5be64" strokeWidth="4.5" strokeLinecap="round" />
        <ellipse cx="70" cy="91" rx="9" ry="5.5" fill="url(#shoeGrad)" />
        <path d="M 62 93 C 64 96 76 96 78 93 C 78 91 62 91 62 93 Z" fill="#ffffff" />
        <path d="M 66 89 L 72 89 M 67 87 L 71 87" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />

        {/* --- BOTTOM PANCAKE --- */}
        <ellipse cx="50" cy="74" rx="35" ry="12.5" fill="#a75d10" />
        <ellipse cx="50" cy="71" rx="35" ry="12.5" fill="url(#pancakeGrad2)" />
        <ellipse cx="50" cy="69" rx="34" ry="10" fill="#fce4a6" />

        {/* --- MIDDLE PANCAKE --- */}
        <ellipse cx="50" cy="57" rx="36" ry="13.5" fill="#a75d10" />
        <ellipse cx="50" cy="54" rx="36" ry="13.5" fill="url(#pancakeGrad1)" />
        <ellipse cx="50" cy="52" rx="35" ry="11" fill="#fff0be" />

        {/* --- TOP PANCAKE --- */}
        <ellipse cx="50" cy="38" rx="37" ry="15" fill="#a75d10" />
        <ellipse cx="50" cy="35" rx="37" ry="15" fill="url(#pancakeGrad1)" />
        <ellipse cx="50" cy="32" rx="35" ry="12.5" fill="#fff4cf" />

        {/* --- SYRUP DRIPPING DOWN --- */}
        {/* Main top syrup pool */}
        <path 
          d="M 18 33 
             C 17 38 21 44 26 44 
             C 28 44 29 39 33 40 
             C 36 41 37 49 42 49 
             C 45 49 46 42 50 42 
             C 54 42 56 52 61 52 
             C 65 52 67 43 72 43 
             C 77 43 83 38 82 32 
             C 80 23 66 21 50 21 
             C 32 21 19 25 18 33 Z" 
          fill="url(#syrupGrad)" 
        />

        {/* Long syrup drip on left */}
        <path 
          d="M 23 37 
             C 21 45 22 55 24 58 
             C 26 61 28 59 27 54 
             C 26 49 27 42 27 38 Z" 
          fill="url(#syrupGrad)" 
        />
        {/* Shiny drop at the tip of the drip */}
        <ellipse cx="25" cy="57" rx="2" ry="2.5" fill="#e07a1b" />
        <circle cx="24.2" cy="56" r="0.8" fill="#ffffff" opacity="0.8" />

        {/* Gentle syrup drip on right */}
        <path 
          d="M 75 35 
             C 77 41 78 48 76 52 
             C 74 54 73 51 73 47 
             C 73 43 74 38 74 35 Z" 
          fill="url(#syrupGrad)" 
        />

        {/* Syrup highlights / gloss */}
        <path 
          d="M 33 26 C 44 22 58 22 67 26 C 63 24 49 23 33 26 Z" 
          fill="#ffffff" 
          opacity="0.6" 
        />
        <ellipse cx="43" cy="27" rx="4" ry="1.5" fill="#ffffff" opacity="0.5" />

        {/* --- MELTING PAT OF BUTTER ON TOP --- */}
        <path 
          d="M 40 18 
             L 53 14 
             C 56 13 60 14 62 16 
             L 63 21 
             C 62 25 57 27 50 27 
             L 39 24 
             C 37 23 37 20 40 18 Z" 
          fill="url(#butterGrad)" 
          stroke="#c98a00" 
          strokeWidth="0.8" 
        />
        {/* Butter highlight */}
        <path d="M 44 17 L 54 14 C 56 13 58 14 59 16 L 50 18 Z" fill="#ffffff" opacity="0.75" />

        {/* --- FRIENDLY FACE ON MIDDLE PANCAKE --- */}
        {/* Left eye (big cute cartoon eye) */}
        <ellipse cx="41" cy="48" rx="4.5" ry="6.5" fill="#1e150a" />
        <ellipse cx="42.5" cy="46" rx="1.8" ry="2.5" fill="#ffffff" />
        <circle cx="39.5" cy="51.5" r="0.9" fill="#ffffff" />

        {/* Right eye */}
        <ellipse cx="59" cy="48" rx="4.5" ry="6.5" fill="#1e150a" />
        <ellipse cx="60.5" cy="46" rx="1.8" ry="2.5" fill="#ffffff" />
        <circle cx="57.5" cy="51.5" r="0.9" fill="#ffffff" />

        {/* Cheerful Eyebrows */}
        <path d="M 36 39 C 39 36 44 38 46 40" stroke="#7a3002" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M 54 40 C 56 38 61 36 64 39" stroke="#7a3002" strokeWidth="1.8" strokeLinecap="round" fill="none" />

        {/* Rosy cheeks */}
        <ellipse cx="33" cy="55" rx="3.5" ry="2" fill="#f87171" opacity="0.5" />
        <ellipse cx="67" cy="55" rx="3.5" ry="2" fill="#f87171" opacity="0.5" />

        {/* Happy Open Smile with pink tongue */}
        <path 
          d="M 41 56 
             C 43 65 57 65 59 56 
             C 55 57 45 57 41 56 Z" 
          fill="#5c1d06" 
          stroke="#451403" 
          strokeWidth="1.2" 
        />
        {/* Tongue */}
        <path 
          d="M 46 60 
             C 48 64 53 64 55 60 
             C 53 59 48 59 46 60 Z" 
          fill="#f472b6" 
        />

        {/* --- WAVING RIGHT HAND WITH WHITE GLOVE --- */}
        <path d="M 76 56 C 82 55 86 51 90 47" stroke="#f5be64" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        {/* White cartoon 4-finger glove waving */}
        <g transform="translate(86, 38) rotate(15)">
          {/* Palm */}
          <ellipse cx="5" cy="7" rx="5" ry="5.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
          {/* Thumb */}
          <ellipse cx="0" cy="4" rx="2.2" ry="3.2" transform="rotate(-30 0 4)" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
          {/* Index */}
          <ellipse cx="3" cy="0" rx="1.8" ry="3.8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
          {/* Middle */}
          <ellipse cx="6.5" cy="0" rx="1.8" ry="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
          {/* Pinky */}
          <ellipse cx="9.5" cy="1.5" rx="1.6" ry="3.2" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
        </g>

        {/* --- LEFT HAND ON HIP --- */}
        <path d="M 23 58 C 17 60 14 66 18 70" stroke="#f5be64" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <ellipse cx="18" cy="70" rx="4" ry="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
      </svg>
    </div>
  );
}
