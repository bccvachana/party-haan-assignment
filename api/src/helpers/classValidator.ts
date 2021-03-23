import { validate, ValidationError } from 'class-validator';
import { toPairs } from 'lodash';
import {
  compose, join, map, reduce,
} from 'lodash/fp';
import { TClassDTO } from '_dto';
import { ApiError } from './error';

const extractValidateErrMessages = async (
  validateErr: ValidationError[],
): Promise<string> => compose(
  join(', '),
  reduce(
    (
      msg: string[],
      { constraints }: ValidationError,
    ) => {
      map(
        (
          constraint: string[],
        ) => msg.push(constraint[1]), toPairs(constraints),
      );
      return msg;
    }, [],
  ),
)(validateErr);

export const validateClassDTO = async (
  classDTO: TClassDTO,
): Promise<void> => {
  const validateErr = await validate(classDTO);
  if (validateErr.length) {
    throw new ApiError(await extractValidateErrMessages(validateErr));
  }
};
