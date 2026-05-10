import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { HELLO } from '../graphql.queries';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  // private waypointQueryRef: QueryRef<{ hello: string }>

  constructor(private apollo: Apollo) {
    // this.waypointQueryRef = this.apollo.watchQuery<{ hello: string }>({
    //   query: HELLO,
    // });
  }

  hello(): Observable<string> {
    return this.apollo.query<{ helloQuery: string }>({
      query: HELLO,
    }).pipe(map((result) => result.data?.helloQuery || ''));
  }
}

