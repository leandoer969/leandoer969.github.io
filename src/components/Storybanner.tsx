// ExamplePage.tsx
import * as React from 'react';
import { useShuffledSvgs } from '../hooks/useShuffledSvgs';
import { SubsectionBanner } from './ui/SubsectionBanner';
import { StoryTextElement } from './ui/StoryTextElement';
import { ArtSection } from './ui/ArtSection';

const ExamplePage: React.FC = () => {
  const [SvgA, SvgB] = useShuffledSvgs();

  return (
    <>
      <SubsectionBanner
        textSide="left" // desktop: text left, art right
        bgColor="bg-indigo-50"
        height="h-[100svh]"
        art={
          <ArtSection
            svg={SvgA}
            className="text-yellow-500"
            mobileRotateAndStretch // rotate + stretch on mobile
            preserveAspectRatio="xMidYMid meet"
            unsetWidthHeight
          />
        }
      >
        <StoryTextElement
          title="Our Mission"
          paragraph="We build amazing experiences that scale across devices."
          bullets={[
            'Responsive Design',
            'High Performance',
            'Scalable Architecture',
          ]}
          badges={['Responsive', 'Scalable', 'Modern']}
        />
      </SubsectionBanner>

      <SubsectionBanner
        textSide="right" // desktop: text right, art left
        bgColor="bg-emerald-50"
        height="h-[100svh]"
        art={
          <ArtSection
            svg={SvgB}
            className="text-pink-500"
            mobileRotateAndStretch
            preserveAspectRatio="xMidYMid meet"
            unsetWidthHeight
          />
        }
      >
        <StoryTextElement
          title="Our Vision"
          paragraph="Empowering teams to ship products faster with confidence."
          badges={['Fast', 'Reliable']}
        />
      </SubsectionBanner>
    </>
  );
};

export default ExamplePage;
