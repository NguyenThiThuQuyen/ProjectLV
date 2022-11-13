import { configureStore } from "@reduxjs/toolkit";
import UserRedux from "./userRedux";
import GoiKhamRedux from "./goiKhamRedux";
import LoaiThuocRedux from "./loaiThuocRedux";
import ThuocRedux from "./thuocRedux";
import ParentRedux from "./parentRedux";
import PatientRedux from "./patientRedux";
import TimeslotRedux from "./timeslotRedux";
import ScheduleRedux from "./scheduleRedux";
// import GiaGoiKhamRedux from "./giaGoiKhamRedux";
import AdminRedux from "./Auth/adminRedux";
import GuestRedux from "./Auth/guestRedux";
import PhieudatchoRedux from "./phieudatchoRedux";
import MenuRedux from "./menuRedux";
import NgayAnRedux from "./ngayanRedux";
import MonAnRedux from "./monanRedux";
import DanhMucMonAnRedux from "./danhmucmonanRedux";
import ChiTietAnRedux from "./chitietanRedux";
import PrescriptionRedux from "./prescriptionRedux";
import SessionRedux from "./sessionRedux";
import EatTimeslotRedux from "./eatTimeslotRedux";
export const store = configureStore({
  reducer: {
    datten: UserRedux,
    goikham: GoiKhamRedux,
    loaithuoc: LoaiThuocRedux,
    thuoc: ThuocRedux,
    login: AdminRedux,
    loginguest: GuestRedux,
    parent: ParentRedux,
    patient: PatientRedux,
    khunggio: TimeslotRedux,
    lichtuvan: ScheduleRedux,
    phieudatcho: PhieudatchoRedux,
    thucdon: MenuRedux,
    ngayan: NgayAnRedux,
    monan: MonAnRedux,
    danhmucmonan: DanhMucMonAnRedux,
    chitietan: ChiTietAnRedux,
    hoadon: PrescriptionRedux,
    buoian: SessionRedux,
    khunggioan: EatTimeslotRedux,
  },
});
