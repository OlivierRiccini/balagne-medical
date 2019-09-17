import { Component, OnDestroy, ViewChild, AfterViewInit, ViewChildren } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserInterfaceService } from 'src/app/services/user-interface.service';
import { IUser } from 'src/app/models/user';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import * as _ from 'lodash';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnDestroy, AfterViewInit {
  public displayedColumns: string[] = ['organization', 'username', 'email', 'phone', 'isAdmin', 'action'];
  public users: IUser[] = [];
  public dataSource: any;
  public form: FormGroup;
  public isSending = false;
  private subscription = new Subscription();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<any>;

  constructor(
    private userService: UserService,
    private userInterfaceService: UserInterfaceService,
    private fb: FormBuilder,
    private authService: AuthService
    ) {
    this.getUsers();
    this.createForm();
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  public onSubmit(form: FormGroup, formDirective: FormGroupDirective): void {
    if (this.form.invalid) {
      return;
    }
    this.isSending = true;
    const subscription = this.userService.create(this.form.value).subscribe(
      user => {
        this.addRowData(user);
        this.userInterfaceService.success(`Le compte a été généré avec succèss`);
        this.isSending = false;
        formDirective.resetForm();
        form.reset();
      },
      () => {
        this.userInterfaceService.error(`Le compte n'a pas pu être généré`);
        this.isSending = false;
      },
      () => this.isSending = false
    );
    this.subscription.add(subscription);
  }

  public onDelete(userId: string): void {
    this.isSending = true;
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser.isAdmin) {
      alert('Seuls les administarteurs peuvent supprimer des comptes');
      this.isSending = false;
      return;
    }
    const agreed = confirm(`Vous êtes sur le point de supprimer un compte utilisateur, voulez-vous continuer?`);
    if (!agreed) {
      this.isSending = false;
      return;
    }
    if (currentUser.id === userId) {
      const agreed2 = confirm(`Vous êtes sur le point de supprimer votre un compte utilisateur, voulez-vous continuer?`);
      if (!agreed2) {
        this.isSending = false;
        return;
      }
    }
    const subscription = this.userService.delete(userId).subscribe(
      () => {
        if (currentUser.id === userId) {
          this.authService.doLogoutUser('admin-dashboard');
        }
        this.removeRowData(userId);
        this.userInterfaceService.success(`Le compte a été supprimé avec succèss`);
        this.isSending = false;
      },
      () => {
        this.userInterfaceService.error(`Le compte n'a pas pu être supprimé`);
        this.isSending = false;
      },
      () => this.isSending = false
    );
    this.subscription.add(subscription);
  }

  private getUsers(): void {
    const subscription = this.userService.getAll().subscribe(
      users => {
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.sort = this.sort;
      },
      () => this.userInterfaceService.error('Impossible de récupérer les utilisateurs dans la base de données'),
    );
    this.subscription.add(subscription);
  }

  private createForm(): void {
    this.form = this.fb.group({
      organizationName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      simplePhone: ['', []],
      isAdmin: [false, []]
    });
  }

  private addRowData(user: IUser): void {
    const data = this.dataSource.data;
    data.push(user);
    this.dataSource.data = data;
    this.table.renderRows();
  }

  private removeRowData(userId: string): void {
    const data = this.dataSource.data;
    _.remove(data, (user: IUser) => {
      return user.id === userId;
  });
    this.dataSource.data = data;
    this.table.renderRows();
  }

}
