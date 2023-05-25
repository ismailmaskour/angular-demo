import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { SnackBarService } from './snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-with-spring';
  editMode: string = ''
  showAddForm: boolean = false;
  collaborator: Collaborateur = new Collaborateur();
  collaborators: Collaborateur[] = []

  constructor(
    private appService: AppService,
    private snackBarService: SnackBarService,
  ) { }

  ngOnInit(): void {
    this.getCollaborators()
  }

  onPreparAdd() {
    this.showAddForm = true;
    this.editMode = "add"
  }
  onCancelAdd() {
    this.showAddForm = false;
    this.collaborator = new Collaborateur();
  }

  selectedIndex: number = -1
  onPrapaeEdit(collaborator: Collaborateur, index: number) {
    this.collaborator = { ...collaborator }
    this.showAddForm = true;
    this.editMode = "edit"
    this.selectedIndex = index
  }


  createAbsenceDiv: boolean = false;
  onPrepareCreateAbsence(collaborator: Collaborateur) {
    this.collaborator = { ...collaborator }
    this.createAbsenceDiv = true
    this.getAbsencesByCollaborator(collaborator)
  }


  listeAbsances: any[] = []
  getAbsencesByCollaborator(collaborator: Collaborateur) {
    this.appService.getAbsencesByCollaborator(collaborator)
      .subscribe((response) => {
        console.log(response);
        this.listeAbsances = response.data
      }, (error) => {
        this.snackBarService.openErrorSnackBar({ message: error.error.message })
      }, () => {

      })
  }


  newAbsence: Absence = new Absence();

  saveAbsence() {
    this.newAbsence.matricule = this.collaborator.matricule;

    console.log(this.newAbsence);

    this.appService.saveAbsence(this.newAbsence)
      .subscribe((response) => {
        this.snackBarService.openSuccesSnackBar({ message: response.message })
        this.getAbsencesByCollaborator(this.collaborator)
      }, (error) => {
        this.snackBarService.openErrorSnackBar({ message: error.error.message })
      }, () => {

      })
  }


  saveCollaborator() {
    if (this.editMode == "add") {
      this.appService.saveCollaborator(this.collaborator)
        .subscribe((response) => {
          this.collaborators.push(response.data)
          this.snackBarService.openSuccesSnackBar({ message: response.message })
          this.showAddForm = false;
          this.collaborator = new Collaborateur()
        }, (error) => {
          this.snackBarService.openErrorSnackBar({ message: error.error.message })
        }, () => {

        })
    }
    if (this.editMode == "edit") {
      this.appService.updateCollaborator(this.collaborator)
        .subscribe((response) => {
          this.collaborators[this.selectedIndex] = response.data
          this.snackBarService.openSuccesSnackBar({ message: response.message })
          this.showAddForm = false;
          this.collaborator = new Collaborateur()
        }, (error) => {
          this.snackBarService.openErrorSnackBar({ message: error.error.message })
        }, () => {

        })
    }

  }

  deleteCollaborator(collaborator: Collaborateur, index: number) {
    this.snackBarService.openConfirmSnackBar({ message: "all", title: "" })
      .then((result) => {
        if (result.value == true) {
          this.appService.deleteCollaborator(collaborator)
            .subscribe((response) => {
              this.collaborators.splice(index, 1);
              this.snackBarService.openSuccesSnackBar({ message: response.message })
            }, (error) => {
              this.snackBarService.openErrorSnackBar({ message: error.error.message })
            }, () => {

            })
        }
      })
  }

  getCollaborators() {
    this.appService.getCollaborators()
      .subscribe((response) => {
        this.collaborators = response.data
      }, (error) => {
        this.snackBarService.openErrorSnackBar({ message: "error.error.message" })
      }, () => {

      })
  }

  login() {
    let req={
      email: "admin@ismail.com",
      password: "ismail"
  }
    this.appService.login(req)
      .subscribe((response) => {
        console.log(response);
        sessionStorage.setItem("AuthToken", response.token)
      }, (error) => {
        this.snackBarService.openErrorSnackBar({ message: "Error" })
      }, () => {

      })
  }




}

export class Collaborateur {
  matricule: number | undefined;
  nom: string | undefined;
  prenom: string | undefined;
  dateNaissance: Date | undefined;
  situationFamille: string | undefined;
  salaire: number | undefined;
}
export class Absence {
  matricule: number | undefined;
  dateDebut: Date | undefined;
  dateFin: Date | undefined;
  motif: number | undefined
}
export class MotifAbsence {
  code: number | undefined;
  libelle: string | undefined;
}
