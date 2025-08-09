import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/

// 1) FLOW ART — stroke-only
const svgrFlow = svgr({
  include: ['**/src/assets/flow/**/*.svg?react'],
  svgrOptions: {
    svgProps: {
      stroke: 'currentColor',
      fill: 'none',
      vectorEffect: 'non-scaling-stroke',
    },
    replaceAttrValues: {
      '#000': 'currentColor',
      '#000000': 'currentColor',
    },
    svgo: true,
    svgoConfig: {
      plugins: [
        'convertStyleToAttrs',
        { name: 'removeViewBox', active: false },
        // keep fills/strokes removable here (line art only)
        { name: 'removeAttrs', params: { attrs: ['stroke-width'] } },
      ],
    },
  },
});

// 2) ICONS — keep fills (logos rely on fill)
const svgrIcons = svgr({
  include: ['**/src/assets/icons/*.svg?react'],
  svgrOptions: {
    // important: DO NOT force fill:none here
    svgProps: { fill: 'currentColor', focusable: 'false' },
    svgo: true,
    svgoConfig: {
      plugins: [
        { name: 'removeViewBox', active: false },
        // don't strip 'fill' or 'stroke' on icons
      ],
    },
  },
});

// then in your export default defineConfig({ plugins: [react(), svgrFlow, svgrIcons] })
export default defineConfig({
  plugins: [react(), svgrFlow, svgrIcons, tailwindcss()],
});
