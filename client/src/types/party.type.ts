export interface IParty {
  id: number,
  createdAt: string,
  createdBy: number,
  updatedAt: string,
  name: string,
  totalParticipant: number,
  participant: number,
  imgUrl: string,
  isFull: boolean;
}

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
