import * as React from 'react';
import Queue from './queue';
import { fromEventPattern } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
const DEFAULT_RETRY = 2;
export default class LazyImage extends React.Component<LazyImageProps, LazyImageState> {
    public state = {
        visible: false,
        loaded: false
    }
    private observer: null | IntersectionObserver = null;

    public refs: {
        [key: string]: (HTMLElement);
    } = {}
    public watchedDom: HTMLElement[] = [];

    public componentDidMount() {
        if (Object.getOwnPropertyNames(window).find(k => k === 'IntersectionObserver')) {
            this.signUpObserver();
        } else {
            this.signUpQueue();
        }
    }

    public load = () => {
        const src = this.props.src;
        const image = new Image();
        image.onloadstart = () => {
            this.props.onLoadStart && this.props.onLoadStart();
        }
        image.onload = () => {
            this.observer && this.observer.disconnect();
            this.setState({
                loaded: true
            });
        }
        image.onerror = (err) => {
            this.retry(this.props.retry || DEFAULT_RETRY);
        }
        image.src = src;
    }

    public render() {
        const p: any = { ...this.props };
        delete p.src;
        return (
            <div style={{ ...p.style, position: 'relative' }}>
                <div ref={'scout'} style={{ top: `-${p.offset || 0}px`, position: 'absolute' }} />
                <img {...p} ref={'img'} className={p.className} src={this.state.loaded ? this.props.src : null}></img>
            </div >
        );
    }

    private retry(chance: number = 0, deep: number = 0) {
        const src = this.props.src.replace('https', 'http');
        const image = new Image();
        image.onloadstart = () => {
            this.props.onLoadStart && this.props.onLoadStart();
        }
        image.onload = () => {
            this.setState({
                loaded: true
            });
        }
        image.onerror = (err) => {
            if (chance <= 0) {
                this.props.onLoadFailed && this.props.onLoadFailed(err);
            } else {
                this.retry(chance - 1, deep === 0 ? deep + 1 : deep);
            }
        }
        image.src = src;
    }

    private signUpObserver = () => {
        this.watchedDom = this.props.offset ? [this.refs['scout'], this.refs['img']] : [this.refs['img']];
        const handler = (h: IntersectionObserverCallback) => {
            const o = new IntersectionObserver(h);
            this.watchedDom.forEach(dom => { o.observe(dom); })
            this.observer = o;
        };
        fromEventPattern<[Array<IntersectionObserverEntry>, IntersectionObserver]>(handler)
            .pipe(
                map(args => args[0]),
                map(entries => entries.filter(entry => entry.isIntersecting)),
                map(entries => entries.length > 0)
            )
            .subscribe(shouldLoad => shouldLoad && this.load());
    }
    private signUpQueue = () => {
        this.watchedDom = this.props.offset ? [this.refs['scout'], this.refs['img']] : [this.refs['img']];
        Queue().add(this);
    }
}

export interface LazyImageProps {
    src: string;
    tag?: string;
    retry?: number;
    onLoadStart?: () => any;
    onLoadSuccess?: () => any;
    onLoadFailed?: (err: Event | string) => any;
    placeholder?: string;
    offset?: number;
}
export interface LazyImageState {
    visible: boolean;
    loaded: boolean;
}