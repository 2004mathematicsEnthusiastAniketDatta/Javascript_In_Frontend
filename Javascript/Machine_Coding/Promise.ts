type TPromiseResolve<T> = (value: T ) => void;
type TPromiseReject <T> = (reason: T) => void;

type TPromiseExecutor<T,K> = (
    resolve: TPromiseResolve<T>,
     reject: TPromiseReject<K>
) => void;

type TPromiseThenCallback<T> = (value: T| undefined) => void;
type TPromiseCatchCallback<T> = (reason: T | undefined) => void;
type TPromiseFinallyCallback = () => void;
//type TPromiseState = 'pending' | 'fulfilled' | 'rejected';
type TPromiseStatus = 'pending' | 'fulfilled' | 'rejected';
enum PromiseState {
    PENDING = 'pending',
    FULFILLED = 'fulfilled',
    REJECTED = 'rejected',
}

class OurPromise<T,K> {
    private _state: PromiseState = PromiseState.PENDING;
    private _successCallbackHandlers: TPromiseThenCallback<T>[] = [];
    private _failureCallbackHandlers: TPromiseCatchCallback<K>[] = [];
    private _finallyCallbackHandlers: TPromiseFinallyCallback | undefined = undefined;

    private _value: T | undefined;
    private _reason: K | undefined;
    constructor(executor: TPromiseExecutor<T,K>) {
          executor(this._resolve.bind(this), this._reject.bind(this));
    }
    public then(handlerFunction: TPromiseThenCallback<T>) {
        if (this._state === PromiseState.FULFILLED) {
            handlerFunction(this._value);
        } else if (this._state === PromiseState.PENDING) {
            this._successCallbackHandlers.push(handlerFunction);
        }
        return this;
    }
    public catch(handlerFunction: TPromiseCatchCallback<K>){
        if (this._state === PromiseState.REJECTED){
            handlerFunction(this._reason);
        } else {
            this._failureCallbackHandlers.push(handlerFunction);
        }
        return this;
    }
    public finally(handlerFunction: TPromiseFinallyCallback) {
       if (this._state !== PromiseState.PENDING) return handlerFunction(); 
        this._finallyCallbackHandlers = handlerFunction;
    }
    private _resolve(value: T) {
           if ( this._state === PromiseState.FULFILLED) return;
              this._state = PromiseState.FULFILLED;
              this._value = value;
              this._successCallbackHandlers.forEach((callback)=> callback(value));
            //   this._finallyCallbackHandlers?.();
              if(this._finallyCallbackHandlers) this._finallyCallbackHandlers();
        }
    private _reject(reason: K) {
        if ( this._state === PromiseState.REJECTED) return;
        this._state = PromiseState.REJECTED;
        this._reason = reason;
        this._failureCallbackHandlers.forEach((callback)=> callback(reason));
        // this._finallyCallbackHandlers?.();
        if(this._finallyCallbackHandlers) this._finallyCallbackHandlers();
    }
}

//Example:
 const testPromise = new OurPromise((resolve , reject)=>{ setTimeout((cb)=>{resolve(cb);console.log("Hello TS");},1.5*1000)});



