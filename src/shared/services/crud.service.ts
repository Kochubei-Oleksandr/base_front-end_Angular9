import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ICrud } from '../interfaces/crud.interface';
import { map, catchError } from "rxjs/operators"

@Injectable()
export abstract class CrudService extends ApiService implements ICrud {
  protected abstract namespace: string;
  protected abstract ModelClass: any;
  protected namespaceSingular: string;

  public get singularEndpoint(): string {
    return this.namespaceSingular ? this.namespaceSingular : this.namespace;
  }

  public get<T>(query?: any): Observable<any> {
    return this
      .sendGet(this.getEndpoint(this.namespace), {search: query})
      .pipe(
        map((res: Response | any) => res.json().map((item: T) => this.buildModel<T>(item))),
        catchError((err) => this.onError(err))
      );
  }

  public view<T>(id: number, query?: any): Observable<any> {
    return this
      .sendGet(this.getEndpoint(this.singularEndpoint + '/' + id), {search: query})
      .pipe(
        map((res: Response |any) => this.buildModel<T>(res.json())),
        catchError((err) => this.onError(err))
      )
  }

  public create<T>(data: T): Observable<any> {
    return this
      .sendPost(this.getEndpoint(this.namespace), data)
      .pipe(
        map((res: Response) => this.buildModel<T>(res.json())),
        catchError((err) => this.onError(err))
      )
  }

  public update<T>(id: number, data: T): Observable<any> {
    return this
      .sendPut(this.getEndpoint(this.namespace + '/' + id), data)
      .pipe(
        map((res: Response) => this.buildModel<T>(res.json())),
        catchError((err) => this.onError(err))
      )
  }

  public remove<T>(id: number): Observable<any> {
    return this
      .sendDelete(this.getEndpoint(this.singularEndpoint + '/' + id))
      .pipe(
        map((res: Response | any) => <T> res.json()),
        catchError((err) => this.onError(err))
      )
  }

  public buildModel<T>(data: any): T {
    return new this.ModelClass(data);
  }
}
