import { BufferGeometry, Material } from 'three';

export type UseGLTFProps = {
  nodes: {
    [key: string]: {
      geometry: BufferGeometry;
    };
  };
  materials: {
    [key: string]: Material;
  };
};

export const defaultControls = (
  position: number[],
  rotation: number[],
  scale: number[]
) => ({
  'position.x': {
    value: position[0],
    min: 0,
    max: Math.PI * 2,
    step: 0.01
  },
  'position.y': {
    value: position[1],
    min: 0,
    max: Math.PI * 2,
    step: 0.01
  },
  'position.z': {
    value: position[2],
    min: 0,
    max: Math.PI * 2,
    step: 0.01
  },
  'rotation.x': {
    value: rotation[0],
    min: 0,
    max: Math.PI * 2,
    step: 0.01
  },
  'rotation.y': {
    value: rotation[1],
    min: 0,
    max: Math.PI * 2,
    step: 0.01
  },
  'rotation.z': {
    value: rotation[2],
    min: 0,
    max: Math.PI * 2,
    step: 0.01
  },
  'scale.x': {
    value: scale[0],
    min: 0,
    max: 100,
    step: 0.001
  },
  'scale.y': {
    value: scale[1],
    min: 0,
    max: 100,
    step: 0.001
  },
  'scale.z': {
    value: scale[2],
    min: 0,
    max: 100,
    step: 0.001
  }
});
