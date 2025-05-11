import { Profile } from './profile.interface';

export interface User {
  id: number;
  nombre: string;
  correoElectronico: string;
  edad: number;
  perfil: Profile;
} 