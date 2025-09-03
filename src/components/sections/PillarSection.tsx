import Section from '@/components/sections/Section';
import ArtFigure from '@/components/ui/ArtFigure';
import TextBlock from '@/components/ui/TextBlock';
import { PILLARS } from '@/data/pillars';
import { useShuffledSvgs } from '@/hooks/useShuffledSvgs';
import type { PillarContent } from '@/types';
import * as React from 'react';

const toneToBg: Record<'data' | 'product' | 'people', string> = {
  data: 'bg-surface-data',
  product: 'bg-surface-product',
  people: 'bg-surface-people',
};

// choose the text color you want the art to inherit
const toneToArtText: Record<'data' | 'product' | 'people', string> = {
  data: 'text-data',
  product: 'text-product', // or a dedicated product tone if you add one
  people: 'text-people',
};

export const PillarsSection: React.FC = () => {
  const svgs = useShuffledSvgs();

  return (
    <>
      {PILLARS.map((p: PillarContent, i) => {
        const Svg = svgs[i % svgs.length];
        const align = (i % 2 === 0 ? 'right' : 'left') as 'left' | 'right';
        const artTone = toneToArtText[p.id];

        return (
          <Section
            key={p.id}
            id={p.id}
            ariaLabel={p.title}
            align={align}
            bgClass={toneToBg[p.id]}
            text={
              <TextBlock
                title={p.title}
                subtitle={p.subtitle}
                paragraph={p.paragraph}
                bullets={p.bullets}
                badges={p.badges}
                variant="soft"
                maxWidthClassName="max-w-prose"
              />
            }
            visual={
              <div className={artTone}>
                <ArtFigure
                  svg={Svg}
                  className="h-auto w-full md:h-full md:w-auto"
                />
              </div>
            }
          />
        );
      })}
    </>
  );
};
