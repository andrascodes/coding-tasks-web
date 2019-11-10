import { from, of } from "rxjs";
import { ofType, Epic } from "redux-observable";
import { map, catchError, switchMap, tap } from "rxjs/operators";
import {
  ApiServiceError,
  FetchCountryDetailActionTypes,
  CountryShortlistState,
  FETCH_COUNTRY_DETAIL_REQUEST
} from "../../types";
import { Services } from "../../services";
import {
  fetchCountryDetailFulfilled,
  fetchCountryDetailFailed
} from "../actions";

const fetchCountryDetail: Epic<
  FetchCountryDetailActionTypes,
  FetchCountryDetailActionTypes,
  CountryShortlistState,
  Services
> = (action$, _, { apiService }) =>
  action$.pipe(
    ofType(FETCH_COUNTRY_DETAIL_REQUEST),
    tap(res => console.log("Request", res)),
    switchMap(action =>
      from(apiService.getCountryDetail(action.payload as string)).pipe(
        map(fetchCountryDetailFulfilled),
        catchError((error: ApiServiceError) =>
          of(fetchCountryDetailFailed(error))
        )
      )
    )
  );

export default fetchCountryDetail;
