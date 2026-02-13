// components/WeatherIcon.js
import React from 'react';

export default function WeatherIcon({ icon, size = 24 }) {
  const styles = { width: size, height: size, viewBox: `0 0 ${size} ${size}`, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };

  switch (icon) {
    case 'cloud-sun':
      return (
        <svg {...styles}>
          <path d="M8 19a4 4 0 1 1 0-8 5 5 0 0 1 0 10z"/>
          <line x1="20" y1="8" x2="20" y2="2"/>
          <line x1="20" y1="16" x2="20" y2="22"/>
          <line x1="26" y1="10" x2="22" y2="6"/>
          <line x1="18" y1="22" x2="14" y2="18"/>
          <line x1="14" y1="10" x2="10" y2="6"/>
          <line x1="22" y1="22" x2="18" y2="18"/>
        </svg>
      );
    case 'cloud-rain':
      return (
        <svg {...styles}>
          <path d="M8 19a4 4 0 1 1 0-8 5 5 0 0 1 0 10z"/>
          <line x1="8" y1="19" x2="8" y2="23"/>
          <line x1="14" y1="19" x2="14" y2="23"/>
        </svg>
      );
    case 'sun':
      return (
        <svg {...styles}>
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      );
    case 'cloud':
      return (
        <svg {...styles}>
          <path d="M18 10h-1.26A6 6 0 1 0 9 20h9a5 5 0 0 0 5-5 5.5 5.5 0 0 0-.29-.71"/>
        </svg>
      );
    default:
      return null;
  }
}
