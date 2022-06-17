import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  registerUser(values) {
    return this.http
      .post('http://127.0.0.1:8000/api/register', values, {
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': 'application/json'
        }
      });

  }

  loginUser(body) {
    return this.http.post('http://127.0.0.1:8000/api/token', body);
  }

  getUsers() {
    return this.http.get('http://127.0.0.1:8000/api/users', {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  deleteUser() {
    return this.http.delete('http://127.0.0.1:8000/api/users/me/delete', {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
}
