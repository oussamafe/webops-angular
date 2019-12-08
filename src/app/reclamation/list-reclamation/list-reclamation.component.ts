import {Component, OnInit, ViewChild} from '@angular/core';
import {ReclamationService} from '../services/reclamation.service';
import {Reclamation} from '../model/reclamtion.model';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ReclamationComponent} from '../reclamation.component';
import {SendReclamationComponent} from '../send-reclamation/send-reclamation.component';
import Swal from 'sweetalert2';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-list-reclamation',
  templateUrl: './list-reclamation.component.html',
  styleUrls: ['./list-reclamation.component.css']
})
export class ListReclamationComponent implements OnInit {

  constructor(private auth: AuthService, public reclamationService: ReclamationService, private dialog: MatDialog) { }
  claims: Reclamation[];
  userclaims: Reclamation[];
  isLoading = false;
  displayedColumns: string[] = ['etat', 'sujet', 'message', 'date', 'action'];
  dataSource: MatTableDataSource<Reclamation>;
  // @ts-ignore
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  const; swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });
  admins() {
    return this.auth.isAdmin();
  }
  ngOnInit() {
    this.isLoading = true;
    if (this.admins()) {
    this.reclamationService.getReclamations().subscribe(
        (recl: Reclamation[]) => {this.claims = recl;
          this.isLoading = false;
          this.dataSource = new MatTableDataSource(this.claims);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
    } else {
      this.reclamationService.getUserReclamations().subscribe(
          (recl: Reclamation[]) => {this.userclaims = recl;
            this.isLoading = false;
          });
    }
  }
  reclamationDialog(rec: Reclamation[]) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.panelClass = 'dialog';
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.maxHeight = '90vh';
    this.dialog.open(SendReclamationComponent, {
      data: {rec}
    });
    this.dialog.afterAllClosed.subscribe(() => { this.reclamationService.getReclamations().subscribe(
        (recl: Reclamation[]) => {this.claims = recl;
        }); });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  delete() {

    this.swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
        );
      } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
      ) {
        this.swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
        );
      }
    });
  }
}
