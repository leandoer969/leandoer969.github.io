import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr({
      include: ['**/src/assets/flow/**/*.svg?react'], // only the art lines
      svgrOptions: {
        // Make components colorable + crisp
        svgProps: {
          stroke: 'currentColor',
          fill: 'none',
          vectorEffect: 'non-scaling-stroke',
        },
        // If some files hardcode colors (e.g. #000), rewrite them:
        replaceAttrValues: {
          '#000': 'currentColor',
          '#000000': 'currentColor',
        },
        // Run SVGO with targeted transforms
        svgo: true,
        svgoConfig: {
          plugins: [
            // Inline style="stroke:..." to attrs so we can strip them next
            'convertStyleToAttrs',
            // DO NOT remove viewBox
            { name: 'removeViewBox', active: false },
            // Strip any hard-coded stroke/fill so our svgProps win
            { name: 'removeAttrs', params: { attrs: ['stroke', 'fill', 'stroke-width'] } },
            // Re-add desired attributes at the root
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
     tailwindcss()],
});
