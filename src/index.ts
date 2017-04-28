import { IDefferObject, deferred } from 'deferred-factory';
import { loadScript } from './loadScript';
import { generatorCallbackName } from './common';
import addQueryParam from './common/addQueryParam';

export enum SCRIPT_LOAD_STATE {
  SUCCESS,
  FAILD,
  LOADING,
  WAITING
}

export enum NOTIFY_TYPE {
  CALLBACK,
  ONLOAD
}

export class ScriptLoader {
  public readonly src: string;
  public readonly notifyType: NOTIFY_TYPE;

  private _currentState: SCRIPT_LOAD_STATE = SCRIPT_LOAD_STATE.WAITING;
  private _defferr: IDefferObject<boolean> = null;
  private _callbaceName: string;
  private _timeout: number;

  public get currentState() {
    return this._currentState;
  }

  public constructor(src: string, { notifyType = NOTIFY_TYPE.ONLOAD, timeout = 0 } = {}) {
    this.src = src;
    this.notifyType = notifyType;
    this._timeout = timeout;
  }
  public load() {
    const timeout = this._timeout;
    switch (this._currentState) {
      case SCRIPT_LOAD_STATE.WAITING:
      case SCRIPT_LOAD_STATE.FAILD: {
        this._defferr = deferred<boolean>();
        this._currentState = SCRIPT_LOAD_STATE.LOADING;
        if (this.notifyType === NOTIFY_TYPE.CALLBACK) {
          const externalString = `callback=${this._callbaceName = generatorCallbackName()}`;
          (window as any)[this._callbaceName] = this.onScriptLoadSuccess;
          loadScript(addQueryParam(this.src, externalString), { timeout, onError: this.onScriptLoadFaild });
        } else {
          loadScript(this.src, {
            timeout,
            onError: this.onScriptLoadFaild,
            onSuccess: this.onScriptLoadSuccess
          });
        }
      }
    }
    return this._defferr.promise;
  }
  private onScriptLoadSuccess() {
    this._currentState = SCRIPT_LOAD_STATE.SUCCESS;
    this.clearSideEffect();
  }
  private onScriptLoadFaild() {
    this._currentState = SCRIPT_LOAD_STATE.FAILD;
    this.clearSideEffect();
  }
  private clearSideEffect() {
    if (this.notifyType === NOTIFY_TYPE.CALLBACK) {
      delete (window as any)[this._callbaceName];
    }
  }
}

export default ScriptLoader;
