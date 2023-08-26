import { __, add, equals, find, subtract } from 'ramda';
import { Maybe } from './customTypes';

export const add1 = add(1);

export const subtract1 = subtract(__, 1);

export const found = <T>(value: T, array: T[]): Maybe<T> => find(equals(value), array);
