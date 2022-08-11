import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
@Component({
  selector: 'app-producto-create',
  templateUrl: './producto-create.component.html',
  styleUrls: ['./producto-create.component.css'],
})
export class ProductoCreateComponent implements OnInit {
  producto: any;
  categoriasList: any;
  imageURL: string;
  error: any;
  makeSubmit: boolean = false;
  formCreate: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService
  ) {
    this.reactiveForm();
  }
  reactiveForm() {
    this.formCreate = this.fb.group({
      nombre: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      categoria_id: ['', [Validators.required]],
      img: [''],
    });
    this.getCategorias();
  }

  getCategorias() {
    return this.gService.list('/producto/categoria').subscribe(
      (respuesta: any) => {
        (this.categoriasList = respuesta)
      },
      (error) => {
        this.error = error;
      }
    );
  }
  // get categoria(): FormArray {
  //   return this.formCreate.get('categoria') as FormArray;
  // }

  // get categoria_id(): FormArray {
  //   return this.formCreate.get('categoria_id') as FormArray;
  // }

  //   private checkboxFeatures() {
  //   this.categoriasList.forEach(() => {
  //     const control = new FormControl();
  //     (this.formCreate.controls.categoria as FormArray).push(control);
  //   });


  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formCreate.get('img').setValue(file);
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
    formData = this.gService.toFormData(this.formCreate.value);
    formData.append('_method', 'POST');
    this.gService
      .create_formdata('/producto/create', formData)
      .subscribe((respuesta: any) => {
        this.producto = respuesta;
        this.router.navigate([''], {
          queryParams: { register: 'true' },
        });
      });
  }

  onReset() {
    this.formCreate.reset();
  }

  onBack() {
    this.router.navigate(['']);
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  };

  ngOnInit(): void {}
}
