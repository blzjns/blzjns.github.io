import { useGLTF } from '@react-three/drei';

import retroComputer from '../../3dModels/retro_computer.glb';

import { useControls } from 'leva';
import { defaultControls, UseGLTFProps } from './constants';
import { RefObject, useState } from 'react';
import { useFrame } from '@react-three/fiber';
// import { useGSAP } from '@gsap/react';
// import gsap from 'gsap';

export function RetroComputer({ selfRef }: { selfRef: RefObject<null> }) {
  // const controls = useControls(
  //   defaultControls([0.7, 1.15, 0], [5, 0, 0], [0.01, 0.01, 0.01])
  // );
  const { nodes, materials } = useGLTF(
    retroComputer
  ) as unknown as UseGLTFProps;

  useFrame(({ clock }) => {
    if (!selfRef?.current) {
      return;
    }

    (selfRef.current as any).rotation.z = clock.elapsedTime / 2;
  });

  return (
    <>
      <group
        ref={selfRef}
        dispose={null}
        scale={[0.01, 0.01, 0.01]}
        position={[0.7, 1.15, 0]}
        rotation={[5, 0, 0]}
        // scale={[controls['scale.x'], controls['scale.y'], controls['scale.z']]}
        // position={[
        //   controls['position.x'],
        //   controls['position.y'],
        //   controls['position.z']
        // ]}
        // rotation={[
        //   controls['rotation.x'],
        //   controls['rotation.y'],
        //   controls['rotation.z']
        // ]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes.retro_computer_setup_retro_computer_setup_Mat_0.geometry
          }
          material={materials.retro_computer_setup_Mat}
        />
      </group>
    </>
  );
}

useGLTF.preload(retroComputer);
