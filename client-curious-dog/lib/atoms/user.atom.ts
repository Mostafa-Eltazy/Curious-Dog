import { atom } from 'jotai';
import { User } from '../interfaces/user.interface';

export const userAtom = atom<User | null>(null);
