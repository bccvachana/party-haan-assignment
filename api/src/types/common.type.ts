export interface ICommonObject {
  [key: string]: any;
}

export type TNullableBoolean = boolean | null | undefined;
export type TNullableNumeric = number | null | undefined;
export type TNullableString = string | null | undefined;
export type TNotReturnFunction = () => void;
