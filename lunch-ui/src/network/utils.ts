const toCamel = (s: string): string => {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
        .replace('_', '');
  });
};

const isObject = function (o: any): Boolean {
  return o === Object(o) && !Array.isArray(o) && typeof o !== 'function';
};

export const keysToCamel = function (o: {[key: string]: any}): {[key: string]: any} {
  if (isObject(o)) {
    const n: {[key: string]: any} = {};

    Object.keys(o)
        .forEach((k: string) => {
          n[toCamel(k)] = keysToCamel(o[k]);
        });

    return n;
  } else if (Array.isArray(o)) {
    return o.map((i) => {
      return keysToCamel(i);
    });
  }

  return o;
};
