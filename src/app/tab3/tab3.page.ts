import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

class DeleteAccountResponse {
  status: string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  private userId: number;

  constructor(private http: HttpClient, private router: Router, private toastController: ToastController) {
    this.userId = parseInt(localStorage.getItem('user_id'), 10);
  }

  delete() {
    this.http.delete('http://127.0.0.1:8000/api/users/me/delete', {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).subscribe(async (data: DeleteAccountResponse) => {
      if (data.status === 'success') {
        // potentially dangerous method to clear the login credentials.
        localStorage.clear();
        this.router.navigate(['']);
      }

      if (data.status === 'failed') {
        const toast = await this.toastController.create({
          message: 'Your account could not be deleted a this time',
          position: 'top',
        });
        await toast.present();

      }
    });
  }
}
