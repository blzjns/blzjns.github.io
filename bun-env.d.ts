declare module '*.svg' {
  const path: `${string}.svg`; // path to the svg file
  export = path;
}

declare module '*.jpg' {
  const path: `${string}.jpg`; //path to the jpg file
  export = path;
}

declare module '*.jpeg' {
  const path: `${string}.jpeg`; // path to the jpeg file
  export = path;
}

declare module '*.md' {
  const content: string;
  export default content;
}

declare module "*.glb";


declare module '*.module.css' {
  /**
   * A record of class names to their corresponding CSS module classes
   */
  const classes: { readonly [key: string]: string };
  export = classes;
}
