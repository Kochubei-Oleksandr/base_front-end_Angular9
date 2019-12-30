import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ICrud } from '../interfaces/crud.interface';
import { map, catchError } from "rxjs/operators"
import * as _ from 'lodash';

@Injectable()
export abstract class CrudService extends ApiService implements ICrud {
  protected abstract namespace: string;
  protected abstract ModelClass: any;
  protected namespaceSingular: string;

  public get singularEndpoint(): string {
    return this.namespaceSingular ? this.namespaceSingular : this.namespace;
  }

  public get<T>(params?: any): Observable<any> {
    return this
      .sendGet(this.getEndpoint(this.namespace), {params: params})
      .pipe(
        map((res: Response | any) => res.map((item: T) => this.buildModel<T>(_.pickBy(item)))),
        catchError((err) => this.onError(err))
      );
  }

  public view<T>(id?: number, query?: any): Observable<any> {
    let separate = id ? '/' + id : '';
    return this
      .sendGet(this.getEndpoint(this.singularEndpoint + separate), {search: query})
      .pipe(
        map((res: Response |any) => this.buildModel<T>(_.pickBy(res))),
        catchError((err) => this.onError(err))
      )
  }

  public create<T>(data: T): Observable<any> {
    return this
      .sendPost(this.getEndpoint(this.singularEndpoint), data)
      .pipe(
        map((res: Response) => this.buildModel<T>(res)),
        catchError((err) => this.onError(err))
      )
  }

  public update<T>(id: number, data: T): Observable<any> {
    return this
      .sendPut(this.getEndpoint(this.singularEndpoint + '/' + id), data)
      .pipe(
        map((res: Response) => this.buildModel<T>(_.pickBy(res))),
        catchError((err) => this.onError(err))
      )
  }

  public remove<T>(id: number): Observable<any> {
    return this
      .sendDelete(this.getEndpoint(this.singularEndpoint + '/' + id))
      .pipe(
        map((res: Response | any) => <T> _.pickBy(res)),
        catchError((err) => this.onError(err))
      )
  }

  public buildModel<T>(data: any): T {
    return new this.ModelClass(data);
  }
}
