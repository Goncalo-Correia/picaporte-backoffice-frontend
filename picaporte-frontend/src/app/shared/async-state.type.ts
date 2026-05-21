export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function loadingState<T>(): AsyncState<T> {
  return { data: null, loading: true, error: null };
}

export function successState<T>(data: T): AsyncState<T> {
  return { data, loading: false, error: null };
}

export function errorState<T>(error: string): AsyncState<T> {
  return { data: null, loading: false, error };
}
