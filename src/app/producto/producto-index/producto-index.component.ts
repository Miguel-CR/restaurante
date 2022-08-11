import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// Servicios
import { GenericService } from 'src/app/share/generic.service';
@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css'],
})
export class ProductoIndexComponent implements OnInit {
  datos: any;
  // productos: Array<any> = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private gService: GenericService) {
    this.productoList();
  }
  productoList() {
    this.gService
      .list('/producto/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
        console.log(this.datos);
      });
  }

  ngOnInit(): void {
    // this.gService.getProductos().subscribe((resp) => {
    //   this.productos = resp;
    //   console.log(resp);
    // });
    // this.destroy$.next(true);
    // this.destroy$.unsubscribe();
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
