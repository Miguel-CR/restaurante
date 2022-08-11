import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
// Servicios
import { GenericService } from 'src/app/share/generic.service';
@Component({
  selector: 'app-producto-update',
  templateUrl: './producto-update.component.html',
  styleUrls: ['./producto-update.component.css'],
})
export class ProductoUpdateComponent implements OnInit {
  producto: any;
  imageURL: string;
  categoriasList: any;
  error: any;
  makeSubmit: boolean = false;
  formUpdate: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  isAvailable = false;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService
  ) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getProducto(id);
    this.getCategorias();
  }

  getProducto(id: number) {
    this.gService.get('/producto/show', id).subscribe((respuesta: any) => {
      this.producto = respuesta;
      // if (this.room.available == 1) {
      //   this.isAvailable = true;
      // }
      console.log(this.producto);
      this.reactiveForm();
    });
  }
  onBack() {
    this.router.navigate(['']);
  }
  getCategorias() {
    return this.gService.list('/producto/categoria').subscribe(
      (respuesta: any) => {
        this.categoriasList = respuesta;
      },
      (error) => {
        this.error = error;
      }
    );
  }

  reactiveForm() {
    if (this.producto) {
      this.formUpdate = this.fb.group({
        id: [this.producto.id, [Validators.required]],
        nombre: [
          this.producto.nombre,
          [Validators.required, Validators.min(2)],
        ],
        detalle: [
          this.producto.detalle,
          [Validators.required, Validators.min(5)],
        ],
        precio: [
          this.producto.precio,
          [Validators.required, Validators.pattern('[0-9]+')],
        ],
        promocion: [this.producto.promocion, Validators.required],
        categoria_id: [this.producto.categoria_id, [Validators.required]],
        img: [''],
      });
      this.imageURL = this.producto.imagePath;
      // if (this.room.available===1) {
      //   this.room.available = true;
      // }
    }
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formUpdate.get('img').setValue(file);
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  submitForm() {
    this.makeSubmit = true;
    let formData = new FormData();
    formData = this.gService.toFormData(this.formUpdate.value);
    formData.append('_method', 'PATCH');
    this.gService
      .update_formdata('/producto/update', formData)
      .subscribe((respuesta: any) => {
        this.producto = respuesta;
        this.router.navigate(['/room/indexAdm'], {
          queryParams: { register: 'true' },
        });
      });
  }

  ngOnInit(): void {}

  public errorHandling = (control: string, error: string) => {
    return (
      this.formUpdate.controls[control].hasError(error) &&
      this.formUpdate.controls[control].invalid &&
      (this.makeSubmit || this.formUpdate.controls[control].touched)
    );
  };
}
