import SectionPanel from '@/components/sections/SectionPanel';
import ArtFigure from '@/components/ui/ArtFigure';
import TextBlock from '@/components/ui/TextBlock';
import { PILLARS } from '@/data/pillars';
import { useShuffledSvgs } from '@/hooks/useShuffledSvgs';
import type { PillarContent } from '@/types';
import * as React from 'react';

export const PillarsSection: React.FC = () => {
  const svgs = useShuffledSvgs();

  return (
    <>
      {PILLARS.map((p: PillarContent, i) => {
        const Svg = svgs[i % svgs.length];
        const textSide: 'left' | 'right' = i % 2 === 0 ? 'left' : 'right';

        return (
          <SectionPanel
            key={p.id}
            id={p.id}
            tone={p.id as 'data' | 'product' | 'people' | 'neutral'}
            textSide={textSide}
            ariaLabel={p.title}
            // slots:
            text={
              <TextBlock
                title={p.title}
                subtitle={p.subtitle}
                paragraph={p.paragraph}
                bullets={p.bullets}
                badges={p.badges}
                variant="soft"
                align="left"
                maxWidthClassName="max-w-prose"
              />
            }
            art={
              <ArtFigure
                svg={Svg}
                fit="contain"
                rotateMobile={false}
                decorative
                className="h-full w-auto"
              />
            }
          />
        );
      })}
    </>
  );
};
