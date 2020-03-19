/**
 * Internal dependencies.
 */
import Observable from '@/utils/Observable';

class ImmutableObservable<T> {
    protected observable: Observable<T>;

    constructor(observable: Observable<T>) {
        this.observable = observable;
    }

    subscribe(callback: (value?: T) => void) {
        this.observable.subscribe(callback);
    }

    unsubscribe(callback: (value?: T) => void) {
        this.observable.unsubscribe(callback);
    }
}

export default ImmutableObservable;
