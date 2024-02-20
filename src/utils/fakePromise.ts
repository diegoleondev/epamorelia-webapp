interface FakePromiseProps {
  delay?: number;
  resolve?: boolean;
  response?: any;
}

export default async function fakePromise(props: FakePromiseProps) {
  const { delay, resolve, response } = props;
  return await new Promise((_resolve, _reject) => {
    setTimeout(() => {
      if (resolve === undefined || resolve) {
        _resolve(response);
      } else {
        _reject(response);
      }
    }, delay);
  });
}
