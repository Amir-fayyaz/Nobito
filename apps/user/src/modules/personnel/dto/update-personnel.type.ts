export interface UpdatePersonnel {
  id: number;
  name: string;
  salary_amount: number;
  resume?: string;
  positionId?: number;
}
