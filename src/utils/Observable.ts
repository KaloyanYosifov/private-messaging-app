class Observable<T> {
    protected subscriptions: Array<(value?: T) => void> = [];

    trigger(value?: T) {
        for (const subscriptionCallback of this.subscriptions) {
            subscriptionCallback(value);
        }
    }

    subscribe(callback: (value?: T) => void) {
        this.subscriptions.push(callback);
    }

    unsubscribe(callback: (value?: T) => void) {
        this.subscriptions = this.subscriptions.filter(subscriptionCallback => subscriptionCallback !== callback);
    }

    destroy() {
        this.subscriptions = [];
    }
}

export default Observable;
