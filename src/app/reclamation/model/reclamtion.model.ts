import {User} from './user.model';

export class Reclamation {
    title: string;
    content: string;
    id: number;
    sujet: string;
    libelle: string;
    message: string;
    etat: string;
    claimtype: string;
    date;
     user: User;
}
