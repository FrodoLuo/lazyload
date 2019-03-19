import * as React from 'react';

export default class LazyImage extends React.Component<LazyImageProps, LazyImageState> {
    state = {
        visible: false,
    }
    observer: null | IntersectionObserver = null;
    refs: {
        [key: string]: (Element);
    } = {}
    componentDidMount() {
        if (IntersectionObserver) {
            this.observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    this.setState({
                        visible: true
                    });
                    if (this.observer){
                        this.observer.disconnect();
                    }
                }
            });
            this.observer.observe(this.props.offset ? this.refs['scout'] : this.refs['img']);
        }
    }
    show() {
        const src = this.props.src;
    }
    render() {
        const p:any = { ...this.props };
        delete p.src;
        return (
            <div style={{ ...p.style, position: 'relative' }}>
                <div ref={'scout'} style={{ top: `-${p.offset || 0}px`, position: 'absolute' }} />
                <img {...p} ref={'img'} className={p.className} src={this.state.visible ? this.props.src : null}></img>
            </div >
        );
    }
}

export interface LazyImageProps {
    src: string;
    tag?: string;
    onLoadStart?: () => any;
    onLoadSuccess?: () => any;
    onLoadFailed?: () => any;
    placeholder?: string;
    offset?: number;
}
export interface LazyImageState {
    visible: boolean;

}