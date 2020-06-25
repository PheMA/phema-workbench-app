import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_PHENOTYPE_LIST,
  fetchPhenotypeListSuccess,
  fetchPhenotypeListFailed,
} from "./actions";
import PhemaWorkbenchApi from "../../api/phema-workbench";

const phemaWorkbenchApi = new PhemaWorkbenchApi();

function* fetchPhenotypeList() {
  try {
    const phenotypes = yield phemaWorkbenchApi.getPhenotypeList();
    yield put(fetchPhenotypeListSuccess(phenotypes));
  } catch (err) {
    console.log(err);

    yield put(fetchPhenotypeListFailed(err));
  }
}

export default function* phenotypeSaga() {
  yield takeLatest(FETCH_PHENOTYPE_LIST, fetchPhenotypeList);
}
