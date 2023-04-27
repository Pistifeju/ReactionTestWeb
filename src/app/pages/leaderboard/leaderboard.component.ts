import { Component } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../models/User';
import { Game } from '../../models/Game';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {
  displayedColumns: string[] = ['NAME', 'BEST', 'DATE'];
  games: Map<String, Game> = new Map<String, Game>(); //String is the NAME, Game is a {BEST, DATE}
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAll().subscribe(users => {
      this.users = users;
      this.sortGames();
    });
  }

  sortGames() {
    this.users.forEach(user => {
      let bestGame: Game = {
        time: 99999999999,
        date: new Date(),
      };
      user.games.forEach(game => {
        if (game.time < bestGame.time) {
          bestGame = game;
        }
      });
      if (bestGame.time != 99999999999) {
        this.games.set(user.username, bestGame);  
      }
    });
  }

  getSortedGames() {
    const sortedGamesArray = Array.from(this.games.entries()).map(([name, game]) => ({name, ...game}));
    sortedGamesArray.sort((a, b) => a.time - b.time);
    const dataSource = new MatTableDataSource(sortedGamesArray);
    return dataSource;
  }
}
