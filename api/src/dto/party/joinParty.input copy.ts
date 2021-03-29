import {
  IsNumber, Min,
} from 'class-validator';
import { IJoinPartyInput } from '_types/party.type';

export default class CreatePartyInput {
  @IsNumber()
  @Min(1)
  readonly userId: number;

  @IsNumber()
  @Min(1)
  readonly partyId: number;

  constructor({
    userId,
    partyId,
  }: IJoinPartyInput) {
    this.userId = userId;
    this.partyId = partyId;
  }
}
