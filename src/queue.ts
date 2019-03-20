import LazyImage from ".";
import { fromEvent } from 'rxjs';
import { throttleTime, map } from 'rxjs/operators';

class LoadingQueue {
    static instance: LoadingQueue | null = null;
    private lazyList: LazyImage[] = [];
    private constructor() {
        fromEvent<MouseEvent>(document, 'scroll')
            .pipe(
                throttleTime(40),
                map(() => window.scrollY),
                map(currentY => {
                    return this.filtVisibleLazies(this.lazyList, currentY);
                })
            ).subscribe(data => {
                data.forEach(lazy => lazy.load());
                this.lazyList = this.lazyList.filter(lazy => {
                    return data.findIndex(d => {
                        console.log(d === lazy);
                        return d === lazy;
                    }) < 0;
                })
            })
    }
    public static getInstance() {
        return LoadingQueue.instance || (LoadingQueue.instance = new LoadingQueue());
    }

    public add(lazy: LazyImage): void {
        this.lazyList.push(lazy);
    }

    private filtVisibleLazies(lazyList: LazyImage[], currentY: number) {
        return lazyList.filter(lazy => {
            return lazy.watchedDom.findIndex(dom => {
                const r = dom.getBoundingClientRect();
                return r.top - window.innerHeight <= currentY
            }) >= 0;
        })
    }
}

export default LoadingQueue.getInstance;