export function generateDoctorNumber(id: number) {
  return String(id).padStart(10, '0');
}
