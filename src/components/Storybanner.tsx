import * as React from 'react';
import { useShuffledSvgs } from '../hooks/useShuffledSvgs';
import { SubsectionBanner } from './ui/SubsectionBanner';
import { StoryTextElement } from './ui/StoryTextElement';
import { ArtSection } from './ui/ArtSection';

const ExamplePage: React.FC = () => {
  const [SvgA, SvgB, SvgC] = useShuffledSvgs();

  return (
    <>
      <SubsectionBanner
        id="people"
        textSide="right"
        tone="people"
        // height="h-[90svh]"
        art={
          <ArtSection
            svg={SvgA}
            mobileRotateAndStretch
            preserveAspectRatio="xMidYMid meet"
            unsetWidthHeight
            strokeWidth="1px"
          />
        }
        ariaLabel="Our People"
      >
        <StoryTextElement
          title="Our People"
          paragraph="We have great People. They are:"
          bullets={['Strong', 'Beautiful', 'Kind']}
          badges={['Social Engagement', 'Team-Work', 'Love']}
        />
      </SubsectionBanner>
      <SubsectionBanner
        id="mission"
        textSide="left"
        tone="health"
        art={
          <ArtSection
            svg={SvgB}
            mobileRotateAndStretch
            preserveAspectRatio="xMidYMid meet"
            unsetWidthHeight
            strokeWidth="3px"
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
        id="vision"
        textSide="right"
        tone="data"
        art={
          <ArtSection
            svg={SvgC}
            mobileRotateAndStretch
            preserveAspectRatio="xMidYMid meet"
            unsetWidthHeight
            strokeWidth="5px"
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
