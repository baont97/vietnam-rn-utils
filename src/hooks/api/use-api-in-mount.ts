import { useEffect, useState } from 'react';
import { LayoutAnimation } from 'react-native';
import { enums } from '../../config';
import { delay } from '../../utils/delay';

export type UseApiInMountOptions<T, P> = {
  useAnimation?: boolean;
  delay?: number;
  initData: T;
  initParams?: P;
};

export type UseApiInMountResult<T, P> = {
  loading: boolean;
  refreshing: boolean;
  mounted: boolean;
  data: T;
  refresh: () => Promise<any>;
  updateParams: React.Dispatch<React.SetStateAction<P>>;
};

export function useApiInMount<T, P = any>(
  mountFunction: (params: P) => Promise<T>,
  deps: React.DependencyList,
  options: UseApiInMountOptions<T, P>
): UseApiInMountResult<T, P> {
  const _loading = useState<boolean>(false);
  const _refreshing = useState<boolean>(false);
  const _mounted = useState<boolean>(false);
  const _data = useState<T>(options?.initData);
  const _params = useState<P>(options?.initParams as P);

  const refresh = async () => {
    if (_refreshing[0]) return;

    _refreshing[1](true);
    await boostrapAsync(_params[0]);
    _refreshing[1](false);
  };

  const boostrapAsync = async (params: P) => {
    if (options?.delay) {
      await delay(options.delay);
    }

    if (options?.useAnimation) {
      enums.isIOS &&
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    const data = await mountFunction(params);

    _data[1](data || options?.initData);
    _mounted[1](true);
  };

  useEffect(() => {
    _loading[1](true);
    boostrapAsync(_params[0]).finally(() => _loading[1](false));
  }, [...deps, _params[0]]);

  return {
    data: _data[0],
    loading: _loading[0],
    refreshing: _refreshing[0],
    mounted: _mounted[0],
    updateParams: _params[1],
    refresh,
  };
}
