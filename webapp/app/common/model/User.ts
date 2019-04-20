export interface User {
  authorities: Authorities[];
  email: string;
  enabled: boolean;
  firstName: string;
  id: number;
  lastName: string;
  phoneNumber: string;
  username: string;
  lastPasswordResetDate: Date;
  idSucursal: number;
}

interface Authorities {
  authority: string;
}
