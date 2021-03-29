export interface ICreatePartyInput {
  userId: number;
  name: string;
  numPeople: number;
  imgUrl: string;
}

export interface IJoinPartyInput {
  userId: number;
  partyId: number;
}
