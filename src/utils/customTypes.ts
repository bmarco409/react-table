import { Dispatch, SetStateAction } from 'react';

export type Maybe<T> = undefined | T;
export type Setter<T> = Dispatch<SetStateAction<T>>;
export type Nullable<T> = null | T;
export type primitive = string | number;
export type idEntity<T> = T & { id: string };

export type primitiveArray = string[] | number[];