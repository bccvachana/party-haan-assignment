import { TNullableNumeric } from 'types/common.type';
import { IParty } from 'types/party.type';

export interface IUsePartyReturns {
  partyImgHeight: TNullableNumeric;
  party: IParty[];
  handleJoinParty: (partyId: number) => void;
}
