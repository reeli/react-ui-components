import { isEmpty, some } from "lodash";

export function must<TPrepares extends Readonly<Array<any>>>(usePrepares: (props: unknown) => TPrepares) {
  return function <TProps>(render: (props: TProps, ...prepares: TPrepares) => JSX.Element | null) {
    const C: any = ({ "data-prepares": dataPrepares, ...props }: { "data-prepares": TPrepares } & TProps) =>
      render(props as any, ...dataPrepares);

    return function Must(props: TProps) {
      const prepares = usePrepares(props);

      if (some(prepares, isEmpty)) {
        return null;
      }

      return <C {...props} data-prepares={prepares} />;
    };
  };
}
