import {useEffect} from 'react';
import {atom, useAtom} from 'jotai';

const REACT_NATIVE_EU_DATE = '2023-03-26T00:00:00.000Z';
const countDownDate = new Date(REACT_NATIVE_EU_DATE).getTime();

const deriveValue = (calculate: (countdown: number) => number) =>
  atom(get => {
    const value = Math.floor(calculate(get(countDownAtom)));

    return (value < 10 ? '0' : '') + value;
  });

const countDownAtom = atom(countDownDate - new Date().getTime());
const days = deriveValue(v => v / (1000 * 60 * 60 * 24));
const hours = deriveValue(v => (v % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutes = deriveValue(v => (v % (1000 * 60 * 60)) / (1000 * 60));
const seconds = deriveValue(v => (v % (1000 * 60)) / 1000);

export const Days = () => useAtom(days)[0];
export const Hours = () => useAtom(hours)[0];
export const Minutes = () => useAtom(minutes)[0];
export const Seconds = () => useAtom(seconds)[0];

export const useStartCountdown = () => {
  const [, setCountDown] = useAtom(countDownAtom);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [setCountDown]);
};
