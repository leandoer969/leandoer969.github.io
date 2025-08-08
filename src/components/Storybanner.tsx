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
        textSide="left"
        bgColor="bg-surface-data"
        height="h-[90svh]"
        art={
          <ArtSection
            svg={SvgA}
            className="text-primary"
            mobileRotateAndStretch
            preserveAspectRatio="xMidYMid meet"
            unsetWidthHeight
          />
        }
        ariaLabel="Our mission"
      >
        <StoryTextElement
          title="Our Mission"
          paragraph="We build amazing experiences that scale across devices."
          bullets={[
            'Responsive design',
            'High performance',
            'Scalable architecture',
          ]}
          badges={['Responsive', 'Scalable', 'Modern']}
        />
      </SubsectionBanner>

      <SubsectionBanner
        textSide="right"
        bgColor="bg-surface-health"
        height="h-[90svh]"
        art={
          <ArtSection
            svg={SvgB}
            className="text-people"
            mobileRotateAndStretch
            preserveAspectRatio="xMidYMid meet"
            unsetWidthHeight
          />
        }
        ariaLabel="Our vision"
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
