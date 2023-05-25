import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class PanelMessageService {

    public messages: { code: string, title: string, message: string, btnOk: string, btnNon: string }[] = [
        { code: 'ajouter', title: 'Confirmation ajout', message: 'Voulez-vous confirmer l\'ajout ?', btnOk: 'Oui', btnNon: 'Non' },
        { code: 'affecter', title: 'Confirmation affectation', message: 'Voulez-vous confirmer l\'affectation ?', btnOk: 'Oui', btnNon: 'Non' }
        , { code: 'annuler', title: 'Confirmation annulation', message: 'Voulez-vous confirmer l\'annulation ?', btnOk: 'Oui', btnNon: 'Non' }
        , { code: 'supprimer', title: "Confirmation suppression", message: 'Voulez-vous confirmer la suppression ?', btnOk: 'Oui', btnNon: 'Non' }
        , { code: 'modifier', title: "Confirmation modification", message: 'Voulez-vous confirmer la modification ?', btnOk: 'Oui', btnNon: 'Non' }
        , { code: 'all', title: "Confirmation", message: 'Voulez-vous confirmer cette opération ?', btnOk: 'Oui', btnNon: 'Non' }
    ];

    getItem(code: string, title: string) {
        let mess = this.messages.filter(x => x.code === code.toLowerCase());
        if (mess && mess.length > 0) return mess[0];
        return { code: code, title: title, message: code, btnOk: 'Oui', btnNon: 'Non' }
    }
}

