// customCss.ts
// Injectable Angular service for managing custom CSS classes

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomCssService {
  // Local config: class name and CSS variable to use
  private readonly classConfigs = [
    { className: 'dynamic-bg-alt1', cssVar: '--color-sf-content-bg-color-alt1', alpha: 0.2 },
    { className: 'dynamic-bg-primary', cssVar: '--color-sf-content-bg-color', alpha: 0.2 },
    { className: 'dynamic-bg-brand', cssVar: '--color-sf-primary', alpha: 0.2 }
    // Add more as needed
  ];

  /**
   * Converts a hex color string to an {r, g, b} object.
   */
  private hexToRgb(hex: string): { r: number, g: number, b: number } | null {
    hex = hex.trim();
    if (hex.startsWith('#')) hex = hex.slice(1);
    if (hex.length === 3) {
      hex = hex.split('').map(x => x + x).join('');
    }
    if (hex.length !== 6) return null;
    const num = parseInt(hex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  }

  /**
   * Generates and injects all dynamic background classes into the first <style> tag in index.html.
   * Call this once on app startup (e.g., in AppComponent).
   */
  create(): void {

  }
  //create(): void {
  //  // Find or create the first <style> tag in <head>
  //  let styleTag = document.querySelector('style');
  //  if (!styleTag) {
  //    styleTag = document.createElement('style');
  //    document.head.appendChild(styleTag);
  //  }

  //  // Get computed styles from :root
  //  const rootStyles = getComputedStyle(document.documentElement);

  //  // Build CSS for all classes
  //  const css = this.classConfigs.map(cfg => {
  //    let colorValue = rootStyles.getPropertyValue(cfg.cssVar).trim();
  //    let rgba = '';
  //    if (colorValue) {
  //      // Support for rgb(), hex, etc.
  //      if (colorValue.startsWith('#')) {
  //        const rgb = this.hexToRgb(colorValue);
  //        if (rgb) {
  //          rgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${cfg.alpha})`;
  //        }
  //      } else if (colorValue.startsWith('rgb')) {
  //        // Already in rgb or rgba format
  //        const rgbMatch = colorValue.match(/rgba?\(([^)]+)\)/);
  //        if (rgbMatch) {
  //          const rgbParts = rgbMatch[1].split(',').map(x => x.trim());
  //          rgba = `rgba(${rgbParts[0]}, ${rgbParts[1]}, ${rgbParts[2]}, ${cfg.alpha})`;
  //        }
  //      } else {
  //        // Fallback: try to use as is (may not work for named colors)
  //        rgba = colorValue;
  //      }
  //    } else {
  //      // Fallback color if variable is not set
  //      rgba = `rgba(35, 41, 55, ${cfg.alpha})`;
  //    }
  //    return `.${cfg.className} { background-color: ${rgba};}`;
  //  }).join('\n');

  //  // Append the generated CSS (do not overwrite existing styles)
  //  styleTag.appendChild(document.createTextNode(css));
  //}
}
