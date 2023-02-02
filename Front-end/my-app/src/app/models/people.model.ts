export class People {
  id: number;
  name: string;
  otherName: string;
  birthday: string;
  province: string;
  district: string;
  ward: string;
  address: string;
  placeOfBirth: string;
  ethnic: string;
  placeOfJob: string;
  identityCard: string;
  family_number: string;
  relationshipWithOwner: 'OWNER' | 'WIFE' | 'SON' | 'DAUGHTER' | null | string;
  status: "PERMANENT" | "TEMPORARY" | "ABSENT" | "DIED" | null | string;
  note: string;
}
