import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private http: HttpClient) {
  }

  updateColor(color, userId) {
    return this.http.patch(`http://127.0.0.1:8000/api/users/${userId}/color`, {
      color,
    }, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  getUserColors(userId: number) {
    return this.http.get(`http://127.0.0.1:8000/api/users/${userId}/color`, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
}
