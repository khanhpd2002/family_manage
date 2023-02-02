export class AdministrativeModels {
  code: number;
  people_id: number;
  register_phone: string | null;
  dateFrom: string | null;
  dateTo: string | null;
  reason: string | null;
  type: 'TEMPORARY' | 'ABSENT' | '';
}
