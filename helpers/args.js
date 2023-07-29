export function getArgs(args) {
  const result = {};
  const [_executer, _file, ...rest] = args;
  rest.forEach((arg, i, arr) => {
    if (arg.charAt(0) === "-") {
      if (i === arr.length - 1) {
        result[arg.substring(1)] = true;
      } else if (arr[i + 1].charAt(0) !== "-") {
        result[arg.substring(1)] = arr[i + 1];
      } else {
        result[arg.substring(1)] = true;
      }
    }
  });
  return result;
}
