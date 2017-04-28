import isFunction = require('lodash/isFunction');

export const loadScriptDefaultOptions = {
  onSuccess: () => null as void,
  onError: () => null as void,
  timeout: 0
};

export function loadScript(src: string, { onSuccess, onError, timeout }: Partial<typeof loadScriptDefaultOptions> = loadScriptDefaultOptions) {
  let wasEmitted = false;
  const scriptElement = document.createElement('script') as HTMLScriptElement;
  const headElement = document.getElementsByTagName('head')[0];
  const emitSuccess = () => {
    if (!wasEmitted && isFunction(onSuccess)) {
      onSuccess();
      wasEmitted = true;
    }
  };
  const emitError = () => {
    if (!wasEmitted && isFunction(onError)) {
      onError();
      wasEmitted = true;
    }
  };
  scriptElement.onload = emitSuccess;
  scriptElement.onerror = emitError;
  scriptElement.src = src;
  if (timeout > 0) {
    setTimeout(emitError, timeout);
  }
  headElement.appendChild(scriptElement);
}
