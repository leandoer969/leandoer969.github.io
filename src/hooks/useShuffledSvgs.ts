// src/hooks/useShuffledSvgs.ts
import { useMemo } from 'react';
import type { ComponentType, SVGProps } from 'react';
import SampleSVG from '../assets/sample.svg?react';
import LoopRiseSVG from '../assets/flow/loop-rise.svg?react';
import BroadUndulationSVG from '../assets/flow/broad-undulation.svg?react';
import DoubleSCurveSVG from '../assets/flow/double-s-curve.svg?react';
import GentleWaveSVG from '../assets/flow/gentle-wave.svg?react';
import LoftySpiralSVG from '../assets/flow/lofty-spiral.svg?react';
import SingleLoopSVG from '../assets/flow/single-loop.svg?react';
import SquigleOneSVG from '../assets/flow/squigle-one.svg?react';
import TripleLoopSpiralSVG from '../assets/flow/triple-loop-spiral.svg?react';
import WindingMeanderSVG from '../assets/flow/winding-meander.svg?react';
import { shuffleArray } from '../utils/shuffle';

export type SvgComp = ComponentType<SVGProps<SVGSVGElement>>;

const SVGS = [
  SampleSVG,
  LoopRiseSVG,
  BroadUndulationSVG,
  DoubleSCurveSVG,
  GentleWaveSVG,
  LoftySpiralSVG,
  SingleLoopSVG,
  SquigleOneSVG,
  TripleLoopSpiralSVG,
  WindingMeanderSVG,
] as const satisfies readonly SvgComp[];

export function useShuffledSvgs(): SvgComp[] {
  // shuffles once per mount; if you want it stable across route changes, swap to useRef
  return useMemo(() => shuffleArray([...SVGS]), []);
}
