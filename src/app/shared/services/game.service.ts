import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Game } from '../../models/Game';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private firestore: AngularFirestore) { }

  uploadGame(game: Game): Promise<void> {
    const firebaseUser = JSON.parse(localStorage.getItem('user') as string);
    if (!firebaseUser) {
      throw new Error('User not logged in');
    }
    return new Promise<void>(async (resolve, reject) => {
      const userDoc = this.firestore.collection('Users').doc(firebaseUser.uid);
      const userSnapshot = await userDoc.get().toPromise();
      if (userSnapshot) {
        const user = userSnapshot.data() as User;
        userDoc.update({ games: [...user.games, game]})
        .then(() => {
          console.log('Game uploaded successfully!');
          resolve();
        })
        .catch((error) => {
          console.error('Error uploading game:', error);
          reject(error);
        });
      }
    });
  }

  getGames(): Promise<Game[]> {
    return new Promise<Game[]>(async (resolve, reject) => {
      const usersSnapshot = await this.firestore.collection('Users').get().toPromise();
      if (usersSnapshot) {
        const games: Game[] = [];
        usersSnapshot.forEach(user => {
          const userData = user.data() as User;
          userData.games.forEach(game => {
            games.push(game);
          });
        });
        resolve(games);
      } else {
        reject('No games found');
      }
    });
  }
}
