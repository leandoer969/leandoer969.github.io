// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    svgr({
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
            {
              name: 'removeAttrs',
              params: { attrs: ['stroke', 'fill', 'stroke-width'] },
            },
            {
              name: 'addAttributesToSVGElement',
              params: {
                attributes: [
                  { stroke: 'currentColor' },
                  { fill: 'none' },
                  { 'vector-effect': 'non-scaling-stroke' },
                ],
              },
            },
          ],
        },
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
});
