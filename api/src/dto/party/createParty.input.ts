import {
  IsNumber, IsString, Min,
} from 'class-validator';
import { ICreatePartyInput } from '_types/party.type';

export default class CreatePartyInput {
  @IsNumber()
  @Min(1)
  readonly userId: number;

  @IsString()
  readonly name: string;

  @IsNumber()
  @Min(1)
  readonly numPeople: number;

  @IsString()
  readonly imgUrl: string;

  constructor({
    userId,
    name,
    numPeople,
    imgUrl,
  }: ICreatePartyInput) {
    this.userId = userId;
    this.name = name;
    this.numPeople = numPeople;
    this.imgUrl = imgUrl;
  }
}
