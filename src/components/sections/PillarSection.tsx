// src/components/sections/PillarsSection.tsx
import { ArtSection } from '@/components/ui/ArtSection';
import { StoryTextElement } from '@/components/ui/StoryTextElement';
import { SubsectionBanner } from '@/components/ui/SubsectionBanner';
import { PILLARS } from '@/contents/pillars';
import { useShuffledSvgs } from '@/hooks/useShuffledSvgs';
import type { PillarContent } from '@/types';
import * as React from 'react';

// align with SubsectionBanner’s accepted tones
type BannerTone = 'data' | 'health' | 'people' | 'neutral';
const mapPillarToBannerTone = (id: PillarContent['id']): BannerTone =>
  id === 'product' ? 'health' : id; // map product → health, others pass through //TODO: update mapping

export const PillarsSection: React.FC = () => {
  const svgs = useShuffledSvgs();

  return (
    <>
      {PILLARS.map((p, i) => {
        const Svg = svgs[i % svgs.length];
        const textSide: 'left' | 'right' = i % 2 === 0 ? 'right' : 'left';
        const tone = mapPillarToBannerTone(p.id);

        return (
          <SubsectionBanner
            key={p.id}
            id={p.id}
            textSide={textSide}
            tone={tone}
            ariaLabel={p.title}
            art={
              <ArtSection
                svg={Svg}
                mobileRotateAndStretch
                preserveAspectRatio="xMidYMid meet"
                unsetWidthHeight
                strokeWidth={`${1 + i * 2}px`}
              />
            }
          >
            <StoryTextElement
              title={p.title}
              paragraph={p.paragraph}
              bullets={p.bullets}
              badges={p.badges}
            />
          </SubsectionBanner>
        );
      })}
    </>
  );
};
