import LazyImage from "./src/index";

export interface LazyImageProps {
    offset?: number;
    src: string;
}

declare class LazyImage extends React.Component<LazyImageProps> { }

export default LazyImage;