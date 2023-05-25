import { Injectable } from "@angular/core";
import Swal from 'sweetalert2';
import { PanelMessageService } from "./panel-message-service";
@Injectable({ providedIn: "root" })
export class SnackBarService {
  data: { message: string } = { message: '' }

  constructor(private panelMessageService: PanelMessageService) { }

  openErrorSnackBar(data: { message: string }) {
    Swal.fire({
      customClass: {
        confirmButton: 'btn btn-danger',
      },
      buttonsStyling: false,
      title: 'Erreur !',
      text: data.message,
      icon: 'error',
      confirmButtonText: 'Fermer',
      confirmButtonColor: '#E30A17'
    })
  }

  openSuccesSnackBar(data: { message: string }) {
    Swal.fire({
      customClass: {
        confirmButton: 'btn btn-success',
      },
      buttonsStyling: false,
      title: '',
      text: data.message,
      icon: 'success',
      confirmButtonText: 'Fermer',
      confirmButtonColor: '#085F27'
    })
  }

  openConfirmSnackBar(data: { title: string, message: string }) {
    const constMessage = this.panelMessageService.getItem(data.message, data.title);
    return Swal.fire({
      customClass: {
        confirmButton: 'btn btn-danger mx-1',
        cancelButton: 'btn btn-primary mx-1'
      },
      buttonsStyling: false,
      title: constMessage.title,
      text: constMessage.message,
      icon: 'warning',
      showCancelButton: true,

      cancelButtonText: constMessage.btnNon,
      confirmButtonText: constMessage.btnOk
    })
  }

  openInfoSnackBar(data: { message: string }) {
    return Swal.fire({
      customClass: {
        confirmButton: 'btn btn-info',
      },
      buttonsStyling: false,
      title: '',
      text: data.message,
      icon: 'info',
      confirmButtonText: 'OK'
    })
  }

}
