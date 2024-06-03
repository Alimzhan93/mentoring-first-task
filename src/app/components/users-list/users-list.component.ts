import { Component, OnInit } from '@angular/core';
import { UsersApiService } from '../../users-api.service';
import { UsersService } from '../../users.service';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../../create-edit-user/create-edit-user.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UserCardComponent, CommonModule, ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  public readonly users$ = this.usersService.users$;

  constructor(
    private usersApiService: UsersApiService,
    private usersService: UsersService,
    private dialog: MatDialog
  ) {};

  ngOnInit(): void {
    this.usersApiService.getUsers().subscribe((users) => {
      this.usersService.setUsers(users);
    });
  };

  onUserDeleted(userId: number): void {
    this.usersService.deleteUser(userId);
  };

  // openAddUserDialog(): void {
  //   const dialogRef = this.dialog.open(CreateEditUserComponent, {
  //     data: { isEdit: false }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
         
  //     }
  //   });
  // }

  loadUsers(): void {
    this.usersApiService.getUsers().subscribe(users => {
      this.usersService.setUsers(users);
    });
  }

  deleteUser(id: number): void {
    this.usersService.deleteUser(id);
  }
  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.addUser(result);
      }
    });
  }

  openEditUserDialog(user: any): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      width: '300px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.editUser(result);
      }
    });
  }
};
