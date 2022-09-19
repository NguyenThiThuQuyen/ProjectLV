import { configureStore } from "@reduxjs/toolkit";
import UserRedux from "./userRedux";
import GoiKhamRedux from "./goiKhamRedux";
import LoaiThuocRedux from "./loaiThuocRedux";
import ThuocRedux from "./thuocRedux";
import ParentRedux from "./parentRedux";
import PatientRedux from "./patientRedux";
import AdminRedux from "./Auth/adminRedux";
export const store = configureStore({
  reducer: {
    datten: UserRedux,
    goikham: GoiKhamRedux,
    loaithuoc: LoaiThuocRedux,
    thuoc: ThuocRedux,
    login: AdminRedux,
    parent: ParentRedux,
    patient: PatientRedux,
  },
});
