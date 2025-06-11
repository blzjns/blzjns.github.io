import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { Glasses } from './Glasses';
import { RefObject, useRef } from 'react';
import { RetroComputer } from './Computer';

interface _3dViewProps {
  targetViewRef: RefObject<HTMLDivElement | null>;
  callbackFn: Function;
  selfRef: RefObject<HTMLDivElement | null>;
}

export default function _3dView({ targetViewRef, callbackFn }: _3dViewProps) {
  const glassRef = useRef(null);
  const computerRef = useRef(null);

  return (
    <div className="xl:h-[300vh] md:h-[calc(100vh-15%)] h-screen">
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 55, position: [0, 0, 6] }}>
        <Environment preset="city" />
        <RetroComputer selfRef={computerRef} />
        <Glasses
          callbackFn={callbackFn}
          selfRef={glassRef}
          targetViewRef={targetViewRef}
        />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
