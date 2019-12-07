import {User} from './user.model';

export class Reclamation {
    id: number;
    sujet: string;
    libelle: string;
    message: string;
    etat: string;
    claimtype: string;
    date;
    dateDeTraitement;
    reponse: string;
     user: User;
}
