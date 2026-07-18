declare module '@theme/IdealImage' {
  import { ComponentType, ImgHTMLAttributes } from 'react';

  export interface IdealImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    img: any;
  }

  const Image: ComponentType<IdealImageProps>;
  export default Image;
}
