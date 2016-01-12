function pluralize(time, label) {
  if (time === 1) {
    return `${ time }${ label }`;
  }

  return `${ time }${ label }s`;
}


export function fromNow(time) {
  const between = Date.now() / 1000 - Number(time);

  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute');
  }

  if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour');
  }

  return pluralize(~~(between / 86400), ' day');
}
