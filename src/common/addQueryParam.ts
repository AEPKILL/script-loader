export function addQueryParam(origin: string, paramString: string) {
  if (origin.indexOf('?') === -1) {
    return `${origin}?${paramString}`;
  } else {
    return `${origin}${paramString}`;
  }
}

export default addQueryParam;
