/**
 * THIÊN BÀN — Tử Vi Đẩu Số Algorithm
 * Đã sửa triệt để theo sách Tử Vi Đẩu Số Toàn Thư
 * (Hi Di Trần Đoàn, dịch Vũ Tài Lục)
 */
'use strict';

var DIACHI = ['Tý','Sửu','Dần','Mão','Thìn','Tị','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
var THIENCAN = ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
var CUNG_CHUC = ['Mệnh','Huynh Đệ','Phu Thê','Tử Tức','Tài Bạch','Tật Ách','Thiên Di','Nô Bộc','Quan Lộc','Điền Trạch','Phúc Đức','Phụ Mẫu'];
var CUC_NAME = {2:'Thủy Nhị Cục',3:'Mộc Tam Cục',4:'Kim Tứ Cục',5:'Thổ Ngũ Cục',6:'Hỏa Lục Cục'};
var MENH_CUC_MAP = {'Thủy':2,'Mộc':3,'Kim':4,'Thổ':5,'Hỏa':6};

// ─── Âm Dương Lịch (Hồ Ngọc Đức) ───
function solarToJD(d,m,y){if(m<=2){y--;m+=12;}var A=Math.floor(y/100),B=2-A+Math.floor(A/4);return Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+d+B-1524.5;}
function getNewMoonDay(k,tz){var dr=Math.PI/180,T=k/1236.85,T2=T*T,T3=T2*T,Jd1=2415020.75933+29.53058868*k+0.0001178*T2-0.000000155*T3+0.00033*Math.sin((166.56+132.87*T-0.009173*T2)*dr);var M=359.2242+29.10535608*k-0.0000333*T2-0.00000347*T3,Mpr=306.0253+385.81691806*k+0.0107306*T2+0.00001236*T3,F=21.2964+390.67050646*k-0.0016528*T2-0.00000239*T3,C1=(0.1734-0.000393*T)*Math.sin(M*dr)+0.0021*Math.sin(2*dr*M)-0.4068*Math.sin(Mpr*dr)+0.0161*Math.sin(dr*2*Mpr)-0.0004*Math.sin(dr*3*Mpr)+0.0104*Math.sin(dr*2*F)-0.0051*Math.sin(dr*(M+Mpr))-0.0074*Math.sin(dr*(M-Mpr))-0.0004*Math.sin(dr*(2*F+M))+0.0008*Math.sin(dr*(2*F-M))-0.0006*Math.sin(dr*(2*F+Mpr))+0.0010*Math.sin(dr*(2*F-Mpr))+0.0005*Math.sin(dr*(M+2*Mpr));var dt=T<-11?0.001+0.000839*T+0.0002261*T2-0.00000845*T3:-0.000278+0.000265*T+0.000262*T2;return Math.floor(Jd1+C1-dt+0.5+tz/24);}
function getSunLong(jd,tz){var T=(jd-2451545.0-tz/24)/36525,T2=T*T,dr=Math.PI/180,M=357.52910+35999.05030*T-0.0001559*T2,L0=280.46645+36000.76983*T+0.0003032*T2,DL=(1.914600-0.004817*T-0.000014*T2)*Math.sin(dr*M)+(0.019993-0.000101*T)*Math.sin(dr*2*M)+0.000290*Math.sin(dr*3*M),theta=L0+DL,omega=125.04-1934.136*T,lam=theta-0.00569-0.00478*Math.sin(dr*omega);lam=lam-360*Math.floor(lam/360);return Math.floor(lam/30);}
function getLunarM11(y,tz){var off=solarToJD(31,12,y)-2415021.076998695,k=Math.floor(off/29.530588853),nm=getNewMoonDay(k,tz),sl=getSunLong(nm,tz);if(sl>=9)nm=getNewMoonDay(k-1,tz);return nm;}
function getLeapOff(a11,tz){var k=Math.round((a11-2415021.076998695)/29.530588853),last=0,i=1,arc=getSunLong(getNewMoonDay(k+i,tz),tz);do{last=arc;i++;arc=getSunLong(getNewMoonDay(k+i,tz),tz);}while(arc!==last&&i<14);return i-1;}

function solarToLunar(solarDay, solarMonth, solarYear, tz) {
  if (tz === undefined) tz = 7;
  var jd = solarToJD(solarDay, solarMonth, solarYear);
  var dayJD = Math.round(jd); // SỬA: round thay vì floor
  var k = Math.floor((dayJD - 2415021.076998695) / 29.530588853 + 0.5);
  var jd0 = getNewMoonDay(k, tz);
  if (jd0 > dayJD) jd0 = getNewMoonDay(k - 1, tz);
  var lunarDay = dayJD - jd0 + 1;
  var syear = solarYear;
  var a11 = getLunarM11(syear - 1, tz), b11 = getLunarM11(syear, tz);
  if (a11 >= jd0) { a11 = getLunarM11(syear - 2, tz); b11 = getLunarM11(syear - 1, tz); }
  var lunarYear = syear;
  if (a11 >= jd0) lunarYear = syear - 1;
  var diff = Math.round((jd0 - a11) / 29);
  var isLeap = false, lunarMonth = diff + 11;
  if (b11 - a11 > 365) {
    var lo = getLeapOff(a11, tz);
    if (diff >= lo) { lunarMonth = diff + 11; if (diff === lo) isLeap = true; }
  }
  if (lunarMonth > 12) lunarMonth -= 12;
  if (lunarMonth >= 11 && diff < 4) lunarYear = syear - 1;
  else if (lunarMonth < 4) lunarYear = syear;
  return { day: lunarDay, month: lunarMonth, year: lunarYear, isLeap: isLeap };
}


// ─── Can Chi ───
function getCanChiYear(y){var c=((y-4)%10+10)%10,ch=((y-4)%12+12)%12;return{can:c,chi:ch,tenCan:THIENCAN[c],tenChi:DIACHI[ch]};}
function getCanChiMonth(thang,yearCan){
  var offset=[2,4,6,8,0][yearCan%5];
  var monthCan=(offset+thang-1)%10;
  var monthChi=(thang+1)%12;
  return{can:monthCan,chi:monthChi,tenCan:THIENCAN[monthCan],tenChi:DIACHI[monthChi]};
}
function getCanGio(gioIndex,ngayCan){
  var base=[0,2,4,6,8][ngayCan%5];
  var gioCan=(base+gioIndex)%10;
  return{can:gioCan,tenCan:THIENCAN[gioCan],tenChi:DIACHI[gioIndex]};
}

// ─── Nạp Âm ───
function getNapAm(can, chi) {
  var n = ((6 * can - 5 * chi) % 60 + 60) % 60;
  var NA60 = [
    'Kim','Kim','Hỏa','Hỏa','Mộc','Mộc','Thổ','Thổ','Kim','Kim',
    'Hỏa','Hỏa','Thủy','Thủy','Thổ','Thổ','Kim','Kim','Mộc','Mộc',
    'Thủy','Thủy','Thổ','Thổ','Hỏa','Hỏa','Mộc','Mộc','Thủy','Thủy',
    'Kim','Kim','Hỏa','Hỏa','Mộc','Mộc','Thổ','Thổ','Kim','Kim',
    'Hỏa','Hỏa','Thủy','Thủy','Thổ','Thổ','Kim','Kim','Mộc','Mộc',
    'Thủy','Thủy','Thổ','Thổ','Hỏa','Hỏa','Mộc','Mộc','Thủy','Thủy'
  ];
  return NA60[n];
}

// ─── Cục & Cung Mệnh ───
function tinhCungMenh(amThang,gioIndex){return(2+amThang-1-gioIndex+120)%12;}
function tinhCungThan(amThang,gioIndex){return(2+amThang-1+gioIndex)%12;}
// ─── An Tử Vi theo ngày và cục ───
function anTuVi(amNgay, cuc) {
  // Mỗi cung được [cuc] ngày, khởi từ Dần, bỏ qua Sửu
  var path = [2,3,4,5,6,7,8,9,10,11,0]; // 11 cung, skip Sửu(1)
  var pos = Math.ceil(amNgay / cuc) - 1;
  return path[pos % 11];
}

// ─── 14 Chính Tinh (SỬA: Thiên Phủ đối xứng qua Dần) ───
function anChinhTinh(tuViCung) {
  var r = {};
  // VÒNG TỬ VI — đi NGHỊCH (lùi) từ Tử Vi
  // TV, TC(-1), [skip], TD(-3), VK(-4), TĐ(-5), [skip],[skip], LT(-8)
  r['Tử Vi']      = tuViCung;
  r['Thiên Cơ']   = (tuViCung - 1 + 12) % 12;
  r['Thái Dương'] = (tuViCung - 3 + 12) % 12;
  r['Vũ Khúc']    = (tuViCung - 4 + 12) % 12;
  r['Thiên Đồng'] = (tuViCung - 5 + 12) % 12;
  r['Liêm Trinh'] = (tuViCung - 8 + 12) % 12;

  // THIÊN PHỦ — đối xứng qua Dần
  var tp = (4 - tuViCung + 12) % 12;

  // VÒNG THIÊN PHỦ — đi THUẬN từ Thiên Phủ
  // TP, TÂm(+1), TL(+2), CM(+3), TTg(+4), TLg(+5), TS(+6), [skip x3], PQ(+10)
  r['Thiên Phủ']   = tp;
  r['Thái Âm']     = (tp + 1) % 12;
  r['Tham Lang']   = (tp + 2) % 12;
  r['Cự Môn']      = (tp + 3) % 12;
  r['Thiên Tướng'] = (tp + 4) % 12;
  r['Thiên Lương'] = (tp + 5) % 12;
  r['Thất Sát']    = (tp + 6) % 12;
  r['Phá Quân']    = (tp + 10) % 12;
  return r;
}

var MIEU_TABLE = {
  'Tử Vi':       {mieu:[2,5,6], vuong:[8,11,4,0,1,7], dac:[], binh:[3,9,10], ham:[]},
  'Thiên Cơ':    {mieu:[0,6,4,10], vuong:[], dac:[3,9], binh:[5,11], ham:[1,7]},
  'Thái Dương':  {mieu:[6,3], vuong:[2,4,5], dac:[7,8], binh:[1], ham:[10,11,0]},
  'Vũ Khúc':     {mieu:[1,7,10], vuong:[0,6], dac:[2,3,4,8,9,11], binh:[5,11], ham:[]},
  'Thiên Đồng':  {mieu:[5,11], vuong:[0,8], dac:[2,3,4,10], binh:[], ham:[6,1,7,9]},
  'Liêm Trinh':  {mieu:[2,8], vuong:[], dac:[], binh:[0,6,4,10,1,7], ham:[5,11,3,9]},
  'Thiên Phủ':   {mieu:[0,1,2,7], vuong:[6,3,4,10], dac:[11], binh:[9,5,8], ham:[]},
  'Thái Âm':     {mieu:[9,11,10], vuong:[0,1], dac:[], binh:[8,7], ham:[6,2,4,5,3]},
  'Tham Lang':   {mieu:[4,10,1,7], vuong:[0,6], dac:[2,8,9], binh:[3], ham:[5,11]},
  'Cự Môn':      {mieu:[3,9], vuong:[0,6,11,2,8], dac:[], binh:[], ham:[5,4,10,1,7]},
  'Thiên Tướng': {mieu:[0,6,2,8], vuong:[], dac:[5,11,1,7], binh:[], ham:[3,9,4,10]},
  'Thiên Lương': {mieu:[10,4,6], vuong:[1,7,0,3,2,8], dac:[], binh:[], ham:[5,11,9]},
  'Thất Sát':    {mieu:[2,8,0,6], vuong:[5,11], dac:[], binh:[3,9,1,7], ham:[]},
  'Phá Quân':    {mieu:[0,6], vuong:[4,10,1,7], dac:[], binh:[], ham:[5,11,2,8,3,9]}
};

function getMieuHam(name,cung){
  var t=MIEU_TABLE[name];
  if(!t)return'';
  if(t.mieu&&t.mieu.indexOf(cung)>=0)return'Miếu';
  if(t.vuong&&t.vuong.indexOf(cung)>=0)return'Vượng';
  if(t.dac&&t.dac.indexOf(cung)>=0)return'Đắc';
  if(t.binh&&t.binh.indexOf(cung)>=0)return'Bình';
  if(t.ham&&t.ham.indexOf(cung)>=0)return'Hãm';
  return'Đắc';
}
// ─── Lộc Tồn, Kình Dương, Đà La ───
function anLocTon(yearCan){
  var L=[2,3,5,6,5,6,8,9,11,0];
  var loc=L[yearCan];
  return{'Lộc Tồn':loc,'Kình Dương':(loc+1)%12,'Đà La':(loc-1+12)%12};
}

// ─── Thiên Mã ───
function anThienMa(yearChi){
  var M=[2,11,8,5,2,11,8,5,2,11,8,5];
  return{'Thiên Mã':M[yearChi]};
}

// ─── Hỏa Tinh, Linh Tinh ───
function anHoaLinh(yearChi,gioIndex){
  var HOA  = [2,3,1,7,2,3,1,7,2,3,1,7]; // Sửa: nhóm Hợi/Mão/Mùi khởi Mùi(7) thay 9
  var LINH = [10,10,3,10,10,10,3,10,10,10,3,10];
  return{
    'Hỏa Tinh':(HOA[yearChi]+gioIndex)%12,
    'Linh Tinh':(LINH[yearChi]+gioIndex)%12
  };
}

// ─── Văn Xương, Văn Khúc ───
function anVanXuongKhuc(gioIndex){
  return{'Văn Xương':(10-gioIndex+12)%12,'Văn Khúc':(4+gioIndex)%12};
}

// ─── Tả Phù, Hữu Bật ───
function anTaHuu(amThang){
  return{'Tả Phù':(amThang+3)%12,'Hữu Bật':(10-amThang+1+12)%12};
}

// ─── Thiên Khôi, Thiên Việt ───
function anKhoiViet(yearCan){
  var MAP=[
    {k:1,v:7},{k:0,v:8},{k:11,v:9},{k:11,v:9},{k:1,v:7},
    {k:0,v:8},{k:1,v:7},{k:6,v:2},{k:3,v:5},{k:3,v:5}
  ];
  return{'Thiên Khôi':MAP[yearCan].k,'Thiên Việt':MAP[yearCan].v};
}

// ─── Địa Không, Địa Kiếp ───
function anKhongKiep(gioIndex){
  return{'Địa Không':(11-gioIndex+12)%12,'Địa Kiếp':(11+gioIndex)%12};
}

// ─── Hồng Loan, Thiên Hỷ ───
function anHongLoan(yearChi){
  var hl=(yearChi-7+12)%12;
  return{'Hồng Loan':hl,'Thiên Hỷ':(hl+6)%12};
}

// ─── Thiên Hình (theo tháng ÂL) ───
function anThienHinh(amThang){return{'Thiên Hình':(9+amThang-1)%12};}

// ─── Thiên Đức (theo tháng ÂL) ───
function anThienDuc(amThang){
  var M=[9,1,7,3,11,5,0,6,2,10,4,8];
  return{'Thiên Đức':M[amThang-1]};
}

// ─── Long Trì, Phượng Các (theo chi NĂM) ───
function anLongPhong(yearChi){
  return{'Long Trì':(yearChi-8+12)%12,'Phượng Các':yearChi%12};
}

// ─── Thiên Khốc, Thiên Hư (theo ngày ÂL) ───
function anThienKhocHu(amNgay){
  return{'Thiên Khốc':(6-amNgay+1+60)%12,'Thiên Hư':(amNgay-5+12)%12};
}

// ─── Tam Thai, Bát Tọa (theo chi tháng ÂL) ───
// Tam Thai = (chiThang - 3 + 120) % 12
// Bát Tọa = (chiThang - 1 + 120) % 12
// chiThang: chi của tháng ÂL (tháng 1=Dần=2, tháng 2=Mão=3,...)
function anTamThaiBatToa(monthChi){
  return{'Tam Thai':(monthChi-3+120)%12,'Bát Tọa':(monthChi-1+120)%12};
}

// ─── Đào Hoa (theo chi năm) ───
function anDaoHoa(yearChi){
  var MAP=[9,6,3,0,9,6,3,0,9,6,3,0];
  return{'Đào Hoa':MAP[yearChi]};
}
// ─── Tứ Hóa theo Can năm ───
var TU_HOA_TABLE=[
  {loc:'Liêm Trinh', quyen:'Phá Quân',    khoa:'Vũ Khúc',     ki:'Thái Dương'},   // Giáp
  {loc:'Thiên Cơ',   quyen:'Thiên Lương',  khoa:'Tử Vi',       ki:'Thái Âm'},      // Ất
  {loc:'Thiên Đồng', quyen:'Thiên Cơ',     khoa:'Văn Xương',   ki:'Liêm Trinh'},   // Bính
  {loc:'Thái Âm',    quyen:'Thiên Đồng',   khoa:'Thiên Cơ',    ki:'Cự Môn'},       // Đinh
  {loc:'Tham Lang',  quyen:'Thái Âm',      khoa:'Hữu Bật',     ki:'Thiên Cơ'},     // Mậu
  {loc:'Vũ Khúc',    quyen:'Tham Lang',    khoa:'Thiên Lương',  ki:'Văn Khúc'},     // Kỷ
  {loc:'Thái Dương', quyen:'Vũ Khúc',      khoa:'Thái Âm',     ki:'Thiên Đồng'},   // Canh
  {loc:'Cự Môn',     quyen:'Thái Dương',   khoa:'Văn Khúc',    ki:'Văn Xương'},    // Tân SỬA
  {loc:'Thiên Lương',quyen:'Tử Vi',        khoa:'Tả Phù',      ki:'Vũ Khúc'},      // Nhâm
  {loc:'Phá Quân',   quyen:'Cự Môn',       khoa:'Thái Âm',     ki:'Tham Lang'},     // Quý SỬA
];

function anTuHoa(yearCan){
  var row=TU_HOA_TABLE[yearCan],result={};
  var add=function(n,t){if(!result[n])result[n]=[];result[n].push(t);};
  add(row.loc,'Lộc');add(row.quyen,'Quyền');add(row.khoa,'Khoa');add(row.ki,'Kị');
  return result;
}
// ─── Tuần Triệt ───
function anTuanTriet(yearCan,yearChi){
  var idx=((yearCan*12+yearChi)%60+60)%60;
  var ti=Math.floor(idx/10);
  var TUAN=[[10,11],[0,1],[2,3],[4,5],[6,7],[8,9]];
  var TRIET=[[8,9],[10,11],[0,1],[2,3],[4,5],[6,7]];
  return{tuanKhong:TUAN[ti],triet:TRIET[ti]};
}

// ─── Vòng Tràng Sinh ───
var TS_NAMES=['Tràng Sinh','Mộc Dục','Quan Đới','Lâm Quan','Đế Vượng','Suy','Bệnh','Tử','Mộ','Tuyệt','Thai','Dưỡng'];
function anTrangSinh(cuc){
  var S={2:8,3:11,4:5,5:8,6:2},D={2:-1,3:1,4:-1,5:-1,6:1};
  var r={};
  for(var i=0;i<12;i++)r[(S[cuc]+D[cuc]*i+120)%12]=TS_NAMES[i];
  return r;
}

// ─── Vòng Thái Tuế ───
var TT_NAMES=['Thái Tuế','Thiếu Dương','Tang Môn','Thiếu Âm','Quan Phù','Tử Phù','Tuế Phá','Long Đức','Bạch Hổ','Phúc Đức (TS)','Điếu Khách','Trực Phù'];
function anThaiTue(yearChi){
  var r={};for(var i=0;i<12;i++)r[(yearChi+i)%12]=TT_NAMES[i];return r;
}

// ─── Vòng Bác Sĩ ─── An tại Lộc Tồn, đi NGHỊCH
var BS_NAMES=['Bác Sĩ','Lực Sĩ','Thanh Long','Tiểu Hao','Tướng Quân','Tấu Thư','Phi Liêm','Hỉ Thần','Bệnh Phù','Đại Hao','Phục Binh','Quan Phủ'];
function anBacSi(locTon){
  var r={};for(var i=0;i<12;i++)r[(locTon-i+120)%12]=BS_NAMES[i];return r;
}

// ─── Đại Vận ───
function tinhDaiVan(cungMenh,gioiTinh,yearCan,cuc){
  var duong=(yearCan%2===0),thuan=(gioiTinh==='nam')?duong:!duong;
  var dir=thuan?1:-1;
  var dvs=[];
  for(var i=0;i<12;i++)dvs.push({cung:(cungMenh+dir*(i+1)+120)%12,tuoiDau:cuc+i*10,tuoiCuoi:cuc+i*10+9});
  return{daiVans:dvs,dir:dir,thuan:thuan};
}
// ─── Cô Thần, Quả Tú (theo Chi năm) ───
function anCoQuaNam(yearChi){
  var CO  =[2,2,5,5,5,8,8,8,11,11,11,2];
  var QUA =[11,11,1,1,1,4,4,4,7,7,7,10];
  return{'Cô Thần':CO[yearChi],'Quả Tú':QUA[yearChi]};
}

// ─── Thiên Đức + Nguyệt Đức (theo tháng ÂL) ───
function anThienNguyetDuc(amThang){
  var TD=[10,8,11,6,2,4,5,0,8,3,7,1];
  var ND=[0,4,8,0,4,8,0,4,8,0,4,8];
  return{'Thiên Đức':TD[amThang-1],'Nguyệt Đức':ND[amThang-1]};
}

// ─── Thiên Thương + Thiên Sứ ───
function anThuongSu(cungMenh){
  return{'Thiên Thương':(cungMenh-8+12)%12,'Thiên Sứ':(cungMenh-5+12)%12};
}

// ─── Phá Toái (theo Chi năm) ───
function anPhaToai(yearChi){
  var PT={0:5,1:1,2:9,3:5,4:1,5:9,6:5,7:1,8:9,9:5,10:1,11:9};
  return{'Phá Toái':PT[yearChi]};
}

// ─── Đẩu Quân (theo tháng + giờ) ───
function anDauQuan(amThang,gioIndex){
  var pos=(0+amThang-1)%12;
  pos=(pos-gioIndex+12)%12;
  return{'Đẩu Quân':pos};
}

// ─── Kiếp Sát (theo Chi năm) ───
function anKiepSat(yearChi){
  var KS={0:5,1:2,2:11,3:8,4:5,5:2,6:11,7:8,8:5,9:2,10:11,11:8};
  return{'Kiếp Sát':KS[yearChi]};
}

// ─── Hoa Cái (theo Chi năm) ───
function anHoaCai(yearChi){
  var HC={0:4,1:1,2:10,3:7,4:4,5:1,6:10,7:7,8:4,9:1,10:10,11:7};
  return{'Hoa Cái':HC[yearChi]};
}

// ─── Thiên Quan + Thiên Phúc (theo Can năm) ───
function anThienQuanPhuc(yearCan){
  var TQ={0:7,1:4,2:0,3:5,4:2,5:8,6:11,7:6,8:3,9:9};
  var TP={0:9,1:8,2:0,3:11,4:2,5:1,6:6,7:5,8:3,9:10};
  return{'Thiên Quan':TQ[yearCan],'Thiên Phúc':TP[yearCan]};
}

// ─── Ân Quang + Thiên Quý (theo ngày ÂL) ───
function anAnQuangThienQuy(amNgay){
  return{'Ân Quang':(10-amNgay+1+12)%12,'Thiên Quý':(4+amNgay-1)%12};
}
// ═══════════════════════════════════
// HÀM CHÍNH
// ═══════════════════════════════════
// ═══════════════════════════════════
// HÀM CHÍNH
// ═══════════════════════════════════
function tinhLaSo(input) {
  var ngay = input.ngay;
  var thang = input.thang;
  var nam = input.nam;
  var gioIndex = parseInt(input.gio) || 0;
  var gioiTinh = input.gioiTinh;
  var isAmLich = input.isAmLich;
  var ten = input.ten;
  var timezone = input.timezone || 7;

  // ─── 1. Chuyển đổi lịch ───
  var amLich;
  var solarNgay, solarThang, solarNam;
  if (isAmLich) {
    amLich = { day: ngay, month: thang, year: nam, isLeap: false };
    // Tính ngày DL tương ứng để lấy chi ngày (tìm JD của ngày ÂL)
    // Tháng 1 ÂL bắt đầu ở tháng 1-2 DL, ước tính: ngày ÂL → DL ± 30 ngày
    solarNam = nam;
    solarThang = thang + 1; if (solarThang > 12) { solarThang -= 12; solarNam++; }
    solarNgay = ngay;
    // Điều chỉnh bằng cách tìm ngày DL khớp AL
    for (var adj = -5; adj <= 35; adj++) {
      var td = ngay + adj;
      var tm = solarThang; var ty = solarNam;
      if (td < 1) { td += 30; tm--; if (tm < 1) { tm = 12; ty--; } }
      if (td > 31) { td -= 31; tm++; if (tm > 12) { tm = 1; ty++; } }
      var chk = solarToLunar(td, tm, ty, timezone);
      if (chk.day === ngay && chk.month === thang && chk.year === nam) {
        solarNgay = td; solarThang = tm; solarNam = ty; break;
      }
    }
  } else {
    amLich = solarToLunar(ngay, thang, nam, timezone);
    solarNgay = ngay; solarThang = thang; solarNam = nam;
  }
  var amNgay = amLich.day;
  var amThang = amLich.month;
  var amNam = amLich.year;

  // Chi ngày (dùng cho Thiên Riêu và các sao theo ngày)
  var jdNgaySolar = solarToJD(solarNgay, solarThang, solarNam);
  var ngayChiForStars = ((Math.floor(jdNgaySolar) + 40) % 12 + 12) % 12;

  // ─── 2. Can Chi năm, tháng ───
  var yChi = getCanChiYear(amNam);
  var yearCan = yChi.can;
  var yearChi = yChi.chi;
  var canNam = yChi.tenCan;
  var chiNam = yChi.tenChi;

  var banMenh = getNapAm(yearCan, yearChi);

  var mChi = getCanChiMonth(amThang, yearCan);
  var monthCan = mChi.can;
  var monthChi = mChi.chi;
  var canThang = mChi.tenCan;
  var chiThang = mChi.tenChi;

  // ─── 3. Cục số (Nạp Âm tháng) ───
  var napAmThang = getNapAm(monthCan, monthChi);
  var cuc = MENH_CUC_MAP[napAmThang] || 2;

  // ─── 4. Cung Mệnh, Cung Thân ───
  var cungMenh = tinhCungMenh(amThang, gioIndex);
  var cungThan = tinhCungThan(amThang, gioIndex);

  // ─── 5. 12 Cung Chức (từ Mệnh đi nghịch) ───
  var cungChucMap = {};
  var cungByChuc = {};
  var i;
  for (i = 0; i < 12; i++) {
    var ci = (cungMenh - i + 120) % 12;
    cungChucMap[ci] = CUNG_CHUC[i];
    cungByChuc[CUNG_CHUC[i]] = ci;
  }

  // ─── 6. An Tử Vi + 14 Chính Tinh ───
  var tuViCung = anTuVi(amNgay, cuc);
  var chinhTinh = anChinhTinh(tuViCung);

  // ─── 7. Tứ Hóa ───
  var tuHoa = anTuHoa(yearCan);

  // ─── 8. Phụ tinh (không trùng lặp) ───
  var phus = [];

  // Lộc Tồn, Kình Dương, Đà La
  var locTonResult = anLocTon(yearCan);
  Object.entries(locTonResult).forEach(function(e) {
    var loai = 'loc';
    if (e[0] === 'Kình Dương' || e[0] === 'Đà La') loai = 'sat';
    phus.push({ n: e[0], c: e[1], t: loai });
  });

  // Thiên Mã
  Object.entries(anThienMa(yearChi)).forEach(function(e) {
    phus.push({ n: e[0], c: e[1], t: 'loc' });
  });

  // Hỏa Tinh, Linh Tinh
  Object.entries(anHoaLinh(yearChi, gioIndex)).forEach(function(e) {
    phus.push({ n: e[0], c: e[1], t: 'sat' });
  });

  // Văn Xương, Văn Khúc
  Object.entries(anVanXuongKhuc(gioIndex)).forEach(function(e) {
    phus.push({ n: e[0], c: e[1], t: 'cat' });
  });

  // Tả Phù, Hữu Bật
  Object.entries(anTaHuu(amThang)).forEach(function(e) {
    phus.push({ n: e[0], c: e[1], t: 'cat' });
  });

  // Thiên Khôi, Thiên Việt
  Object.entries(anKhoiViet(yearCan)).forEach(function(e) {
    phus.push({ n: e[0], c: e[1], t: 'cat' });
  });

  // Địa Không, Địa Kiếp
  Object.entries(anKhongKiep(gioIndex)).forEach(function(e) {
    phus.push({ n: e[0], c: e[1], t: 'sat' });
  });

  // Hồng Loan, Thiên Hỷ
  Object.entries(anHongLoan(yearChi)).forEach(function(e) {
    phus.push({ n: e[0], c: e[1], t: 'tap' });
  });

  // Thiên Hình (theo tháng ÂL)
  Object.entries(anThienHinh(amThang)).forEach(function(e) {
    phus.push({ n: e[0], c: e[1], t: 'tap' });
  });

  // Long Trì, Phượng Các (theo chi NĂM)
  Object.entries(anLongPhong(yearChi)).forEach(function(e) {
    phus.push({ n: e[0], c: e[1], t: 'tap' });
  });

  // Thiên Khốc, Thiên Hư (theo ngày ÂL)
  Object.entries(anThienKhocHu(amNgay)).forEach(function(e) {
    phus.push({ n: e[0], c: e[1], t: 'tap' });
  });

  // Tam Thai, Bát Tọa (theo ngày ÂL)
  Object.entries(anTamThaiBatToa(monthChi)).forEach(function(e) {
    phus.push({ n: e[0], c: e[1], t: 'tap' });
  });

  // Đào Hoa (theo chi năm)
  Object.entries(anDaoHoa(yearChi)).forEach(function(e) {
    phus.push({ n: e[0], c: e[1], t: 'tap' });
  });

  // Cô Thần, Quả Tú (theo chi năm — CHỈ bản này, bỏ bản theo cung Mệnh)
  Object.entries(anCoQuaNam(yearChi)).forEach(function(e) {
    phus.push({ n: e[0], c: e[1], t: 'tap' });
  });

  // Thiên Đức, Nguyệt Đức (theo tháng ÂL)
  Object.entries(anThienNguyetDuc(amThang)).forEach(function(e) {
    phus.push({ n: e[0], c: e[1], t: 'tap' });
  });

  // Thiên Thương, Thiên Sứ
  Object.entries(anThuongSu(cungMenh)).forEach(function(e) {
    phus.push({ n: e[0], c: e[1], t: 'tap' });
  });

  // Phá Toái (theo chi năm)
  Object.entries(anPhaToai(yearChi)).forEach(function(e) {
    phus.push({ n: e[0], c: e[1], t: 'tap' });
  });

  // Đẩu Quân (theo tháng + giờ)
  Object.entries(anDauQuan(amThang, gioIndex)).forEach(function(e) {
    phus.push({ n: e[0], c: e[1], t: 'tap' });
  });

  // Kiếp Sát (theo chi năm)
  Object.entries(anKiepSat(yearChi)).forEach(function(e) {
    phus.push({ n: e[0], c: e[1], t: 'sat' });
  });

  // Hoa Cái (theo chi năm)
  Object.entries(anHoaCai(yearChi)).forEach(function(e) {
    phus.push({ n: e[0], c: e[1], t: 'tap' });
  });

  // Thiên Quan, Thiên Phúc (theo can năm)
  Object.entries(anThienQuanPhuc(yearCan)).forEach(function(e) {
    phus.push({ n: e[0], c: e[1], t: 'tap' });
  });

  // Ân Quang, Thiên Quý (theo ngày ÂL)
  Object.entries(anAnQuangThienQuy(amNgay)).forEach(function(e) {
    phus.push({ n: e[0], c: e[1], t: 'tap' });
  });

  // Thiên Y (theo chi tháng: chiThang - 1)
  phus.push({ n: 'Thiên Y', c: (monthChi - 1 + 120) % 12, t: 'tap' });

  // Thiên Tài (theo chi năm: yearChi + 2)
  phus.push({ n: 'Thiên Tài', c: (yearChi + 2) % 12, t: 'tap' });

  // Thiên Riêu (theo chi NĂM)
  var THIEN_RIEU_CHI_NAM = [6,7,2,8,9,7,4,5,6,7,7,2];
  phus.push({ n: 'Thiên Riêu', c: THIEN_RIEU_CHI_NAM[yearChi], t: 'tap' });

  // Lưu Hà (theo chi tháng: chiThang - 1)
  phus.push({ n: 'Lưu Hà', c: (monthChi - 1 + 120) % 12, t: 'tap' });

  // Đường Phù (theo chi tháng: chiThang + 2)
  phus.push({ n: 'Đường Phù', c: (monthChi + 2) % 12, t: 'tap' });

  // Phong Cáo (theo chi tháng)
  phus.push({ n: 'Phong Cáo', c: monthChi % 12, t: 'tap' });

  // Thiên Thọ (theo chi tháng)
  phus.push({ n: 'Thiên Thọ', c: monthChi % 12, t: 'tap' });

  // Văn Tinh (theo chi tháng)
  phus.push({ n: 'Văn Tinh', c: monthChi % 12, t: 'tap' });

  // Quốc Ấn (theo chi năm: yearChi - 3)
  phus.push({ n: 'Quốc Ấn', c: (yearChi - 3 + 120) % 12, t: 'tap' });

  // Địa Giải (theo chi năm: yearChi - 3)
  phus.push({ n: 'Địa Giải', c: (yearChi - 3 + 120) % 12, t: 'tap' });

  // Giải Thần (theo chi năm)
  phus.push({ n: 'Giải Thần', c: yearChi % 12, t: 'tap' });

  // Thiên Trù (theo Lộc Tồn + 10)
  var locTonCung = anLocTon(yearCan)['Lộc Tồn'];
  phus.push({ n: 'Thiên Trù', c: (locTonCung + 10) % 12, t: 'tap' });

  // Địa Võng (cố định tại Tuất = 10)
  phus.push({ n: 'Địa Võng', c: 10, t: 'tap' });

  // Thiên La (cố định tại Thìn = 4)
  phus.push({ n: 'Thiên La', c: 4, t: 'tap' });

  // Thiên Giải (theo chi tháng + 6)
  phus.push({ n: 'Thiên Giải', c: (monthChi + 6) % 12, t: 'tap' });

  // Thiên Không (theo giờ: gioIndex + 11)
  phus.push({ n: 'Thiên Không', c: (gioIndex + 11) % 12, t: 'tap' });

  // ─── 9. Vòng Tràng Sinh, Thái Tuế, Bác Sĩ ───
  var trangSinh = anTrangSinh(cuc);
  var thaiTue = anThaiTue(yearChi);
  var bacSi = anBacSi(locTonResult['Lộc Tồn']);

  // ─── 10. Đại Vận ───
  var dvResult = tinhDaiVan(cungMenh, gioiTinh, yearCan, cuc);
  var daiVans = dvResult.daiVans;
  var dir = dvResult.dir;
  var thuan = dvResult.thuan;

  // ─── 11. Tuần Triệt ───
  var ttResult = anTuanTriet(yearCan, yearChi);
  var tuanKhong = ttResult.tuanKhong;
  var triet = ttResult.triet;

  // ─── 12. Build 12 cung ───
  var allStars = {};
  for (i = 0; i < 12; i++) allStars[i] = [];

  // 12a. Chính tinh + Miếu Hãm
  Object.entries(chinhTinh).forEach(function(e) {
    var name = e[0], cung = e[1];
    var mh = getMieuHam(name, cung);
    allStars[cung].push({
      name: name,
      type: 'chinh',
      hoa: tuHoa[name] || null,
      mieuHam: mh
    });
  });

  // 12b. Phụ tinh
    phus.forEach(function(p) {
    var cung = parseInt(p.c);
    if (isNaN(cung) || cung < 0 || cung > 11) return;
    if (!allStars[cung]) allStars[cung] = [];
    allStars[cung].push({
      name: p.n,
      type: p.t,
      hoa: tuHoa[p.n] || null,
      mieuHam: ''
    });
  });

  // 12c. Tràng Sinh
  Object.entries(trangSinh).forEach(function(e) {
    allStars[parseInt(e[0])].push({
      name: e[1], type: 'ts', hoa: null, mieuHam: '', group: 'ts'
    });
  });

  // 12d. Thái Tuế
  Object.entries(thaiTue).forEach(function(e) {
    allStars[parseInt(e[0])].push({
      name: e[1], type: 'tt', hoa: null, mieuHam: '', group: 'tt'
    });
  });

  // 12e. Bác Sĩ
  Object.entries(bacSi).forEach(function(e) {
    allStars[parseInt(e[0])].push({
      name: e[1], type: 'bs', hoa: null, mieuHam: '', group: 'bs'
    });
  });

  // ─── 13. Gán Tứ Hóa lên sao ───
  Object.entries(tuHoa).forEach(function(e) {
    var starName = e[0], hoaArr = e[1];
    for (var ci2 = 0; ci2 < 12; ci2++) {
      allStars[ci2].forEach(function(s) {
        if (s.name === starName) s.hoa = hoaArr;
      });
    }
  });

  // ─── 14. Map Đại Vận, Tuần Triệt ───
  var daiVanByCung = {};
  daiVans.forEach(function(dv) { daiVanByCung[dv.cung] = dv; });

  var tuanSet = {};
  var trietSet = {};
  if (tuanKhong) { tuanKhong.forEach(function(v) { tuanSet[v] = true; }); }
  if (triet) { triet.forEach(function(v) { trietSet[v] = true; }); }

  // ─── 15. Tạo mảng 12 cung ───
  var cungs12 = [];
  for (i = 0; i < 12; i++) {
    cungs12.push({
      index: i,
      diachi: DIACHI[i],
      cungChuc: cungChucMap[i] || '',
      isLaMenh: i === cungMenh,
      isLaThan: i === cungThan,
      stars: allStars[i] || [],
      daiVan: daiVanByCung[i] || null,
      isTuan: !!tuanSet[i],
      isTriet: !!trietSet[i]
    });
  }

  // ─── 16. Giờ Can Chi ───
  var jdNgay = solarToJD(ngay, thang, nam);
  var ngayCan = ((Math.floor(jdNgay) + 40) % 10 + 10) % 10;
  var gioCanChi = getCanGio(gioIndex, ngayCan);

  // ─── 18. Thông tin bổ sung (như tuvi.cohoc.net) ───
  
  // Nạp Âm đầy đủ (tên Hán Việt)
  var NAP_AM_FULL = [
    'Hải Trung Kim','Lô Trung Hỏa','Đại Lâm Mộc','Lộ Bàng Thổ','Kiếm Phong Kim',
    'Sơn Đầu Hỏa','Giản Hạ Thủy','Thành Đầu Thổ','Bạch Lạp Kim','Dương Liễu Mộc',
    'Tuyền Trung Thủy','Ốc Thượng Thổ','Tích Lịch Hỏa','Tùng Bách Mộc','Trường Lưu Thủy',
    'Sa Trung Kim','Sơn Hạ Hỏa','Bình Địa Mộc','Bích Thượng Thổ','Kim Bá Kim',
    'Phú Đăng Hỏa','Thiên Hà Thủy','Đại Dịch Thổ','Thoa Xuyến Kim','Tang Đố Mộc',
    'Đại Khê Thủy','Sa Trung Thổ','Thiên Thượng Hỏa','Thạch Lựu Mộc','Đại Hải Thủy'
  ];
  var napAmIdx = Math.floor(((6*yearCan - 5*yearChi) % 60 + 60) % 60 / 2);
  var banMenhFull = NAP_AM_FULL[napAmIdx] || banMenh;

  // Can Chi ngày sinh
  var ngayCanIdx = ((Math.floor(jdNgay) + 40) % 10 + 10) % 10;
  var ngayChiIdx = ((Math.floor(jdNgay) + 40) % 12 + 12) % 12;
  var ngayCanChi = THIENCAN[ngayCanIdx] + ' ' + DIACHI[ngayChiIdx];

  // Can Chi tháng ÂL
  var thangAmCanChi = canThang + ' ' + chiThang;

  // Âm Dương + Thuận Nghịch
  var amDuong = (yearCan % 2 === 0) ? 'Dương' : 'Âm';
  var amDuongGT = amDuong + ' ' + (gioiTinh === 'nam' ? 'Nam' : 'Nữ');
  var huongDi = thuan ? 'Thuận lý' : 'Nghịch lý';

  // Sao chủ Mệnh — theo giờ sinh (Nam phái chuẩn)
  var MENH_CHU_GIO = ['Tham Lang','Cự Môn','Liêm Trinh','Văn Khúc','Thiên Lương','Thiên Đồng',
                      'Tham Lang','Cự Môn','Liêm Trinh','Văn Khúc','Thiên Lương','Thiên Đồng'];
  var menhChu = MENH_CHU_GIO[gioIndex] || '(vô chính diệu)';

  // Sao chủ Thân — chính tinh đầu tiên ở cung Thân
  var thanChu = '';
  var thanStars = allStars[cungThan] || [];
  for (var tc = 0; tc < thanStars.length; tc++) {
    if (thanStars[tc].type === 'chinh') {
      thanChu = thanStars[tc].name;
      break;
    }
  }
  if (!thanChu) thanChu = '(vô chính diệu)';

  // Thân cư cung nào
  var thanCuCung = cungChucMap[cungThan] || '';

  // Mệnh Cục quan hệ
  var menhCucQH = '';
  var menhHanh = banMenh;
  var cucHanh = napAmThang;
  if (menhHanh === cucHanh) menhCucQH = 'Mệnh Cục bình hòa';
  else {
    var sinhMap = {'Kim':'Thủy','Thủy':'Mộc','Mộc':'Hỏa','Hỏa':'Thổ','Thổ':'Kim'};
    if (sinhMap[menhHanh] === cucHanh) menhCucQH = 'Mệnh sinh Cục (tiết khí)';
    else if (sinhMap[cucHanh] === menhHanh) menhCucQH = 'Cục sinh Mệnh (tương sinh)';
    else {
      var khacMap = {'Kim':'Mộc','Mộc':'Thổ','Thổ':'Thủy','Thủy':'Hỏa','Hỏa':'Kim'};
      if (khacMap[menhHanh] === cucHanh) menhCucQH = 'Mệnh khắc Cục (đắc tài)';
      else menhCucQH = 'Cục khắc Mệnh (bất lợi)';
    }
  }

  // Sao chủ Cục
  var cucChu = '';
  var cucChuMap = {2:'Phá Quân',3:'Thiên Cơ',4:'Vũ Khúc',5:'Tử Vi',6:'Liêm Trinh'};
  cucChu = cucChuMap[cuc] || '';
  // ─── 17. Trả kết quả ───
    return {
    ten: ten || '',
    gioiTinh: gioiTinh,
    duongLich: { ngay: ngay, thang: thang, nam: nam },
    amLich: { ngay: amNgay, thang: amThang, nam: amNam, isLeap: amLich.isLeap },
    namCanChi: canNam + ' ' + chiNam,
    thangCanChi: canThang + ' ' + chiThang,
    ngayCanChi: ngayCanChi,
    gioSinh: DIACHI[gioIndex],
    gioCanChi: gioCanChi.tenCan + ' ' + gioCanChi.tenChi,
    gioIndex: gioIndex,
    banMenh: banMenh,
    banMenhFull: banMenhFull,
    cuc: cuc,
    cucName: CUC_NAME[cuc],
    cucChu: cucChu,
    napAmThang: napAmThang,
    cungMenh: cungMenh,
    cungMenh_diachi: DIACHI[cungMenh],
    cungThan: cungThan,
    cungThan_diachi: DIACHI[cungThan],
    menhChu: menhChu,
    thanChu: thanChu,
    thanCuCung: thanCuCung,
    amDuongGT: amDuongGT,
    huongDi: huongDi,
    menhCucQH: menhCucQH,
    cungs: cungs12,
    tuHoa: tuHoa,
    chinhTinh: chinhTinh,
    tuViCung: tuViCung,
    yearCan: yearCan,
    yearChi: yearChi,
    canNam: canNam,
    chiNam: chiNam,
    daiVans: daiVans,
    dir: dir,
    thuan: thuan
  };
}

// ═══ EXPORT ═══
if (typeof module !== 'undefined') {
  module.exports = {
    tinhLaSo: tinhLaSo,
    solarToLunar: solarToLunar,
    DIACHI: DIACHI,
    THIENCAN: THIENCAN,
    CUNG_CHUC: CUNG_CHUC,
    getMieuHam: getMieuHam
  };
} else {
  window.TuViAlgorithm = {
    tinhLaSo: tinhLaSo,
    solarToLunar: solarToLunar,
    DIACHI: DIACHI,
    THIENCAN: THIENCAN,
    CUNG_CHUC: CUNG_CHUC,
    getMieuHam: getMieuHam
  };
}