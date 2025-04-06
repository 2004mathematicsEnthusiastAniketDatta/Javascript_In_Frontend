var PromiseState;
(function (PromiseState) {
    PromiseState["PENDING"] = "pending";
    PromiseState["FULFILLED"] = "fulfilled";
    PromiseState["REJECTED"] = "rejected";
})(PromiseState || (PromiseState = {}));
var OurPromise = /** @class */ (function () {
    function OurPromise(executor) {
        this._state = PromiseState.PENDING;
        this._successCallbackHandlers = [];
        this._failureCallbackHandlers = [];
        this._finallyCallbackHandlers = undefined;
        executor(this._resolve.bind(this), this._reject.bind(this));
    }
    OurPromise.prototype.then = function (handlerFunction) {
        if (this._state === PromiseState.FULFILLED) {
            handlerFunction(this._value);
        }
        else if (this._state === PromiseState.PENDING) {
            this._successCallbackHandlers.push(handlerFunction);
        }
        return this;
    };
    OurPromise.prototype.catch = function (handlerFunction) {
        if (this._state === PromiseState.REJECTED) {
            handlerFunction(this._reason);
        }
        else {
            this._failureCallbackHandlers.push(handlerFunction);
        }
        return this;
    };
    OurPromise.prototype.finally = function (handlerFunction) {
        if (this._state !== PromiseState.PENDING)
            return handlerFunction();
        this._finallyCallbackHandlers = handlerFunction;
    };
    OurPromise.prototype._resolve = function (value) {
        if (this._state === PromiseState.FULFILLED)
            return;
        this._state = PromiseState.FULFILLED;
        this._value = value;
        this._successCallbackHandlers.forEach(function (callback) { return callback(value); });
        //   this._finallyCallbackHandlers?.();
        if (this._finallyCallbackHandlers)
            this._finallyCallbackHandlers();
    };
    OurPromise.prototype._reject = function (reason) {
        if (this._state === PromiseState.REJECTED)
            return;
        this._state = PromiseState.REJECTED;
        this._reason = reason;
        this._failureCallbackHandlers.forEach(function (callback) { return callback(reason); });
        // this._finallyCallbackHandlers?.();
        if (this._finallyCallbackHandlers)
            this._finallyCallbackHandlers();
    };
    return OurPromise;
}());
//Example:
var testPromise = new OurPromise(function (resolve, reject) { setTimeout(function (cb) { resolve(cb); console.log("Hello TS"); }, 1.5 * 1000); });
