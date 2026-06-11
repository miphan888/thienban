// ============================================================
// luan-giai.js — Luận Giải Tử Vi Đẩu Số
// Phiên bản đầy đủ từ Tử Vi Đẩu Số Toàn Thư
// (Hi Di Trần Đoàn, dịch Vũ Tài Lục)
// ============================================================

'use strict';

// ============================================================
// PHẦN 1: DỮ LIỆU LUẬN GIẢI 14 CHÍNH TINH
// ============================================================

const LUAN_CHINH_TINH = {
  'Tử Vi': {
    mieuVuong: 'Tử Vi đắc địa chủ quyền quý, được người tôn trọng, lãnh đạo giỏi. Có thể giáng phúc tiêu tai ở các cung.',
    dac: 'Tử Vi Đắc địa — có phúc lộc nhưng cần Tả Hữu phù tá mới phát huy.',
    binh: 'Tử Vi Bình địa — có uy nhưng thiếu thực quyền, cần cát tinh trợ lực.',
    ham: 'Tử Vi gặp sát tinh mất uy, như vua mất triều thần. Thiếu Phủ Bật thành cô quân.',
    nuMenh: 'Nữ mệnh Tử Vi gặp cát tinh lấy chồng sang quý. Gặp Tham Lang đào hoa đa dâm.',
    ketHop: {
      'Thiên Phủ': 'Tử Phủ đồng cung — toàn y phụ bật chi công, phú quý song toàn.',
      'Thiên Tướng': 'Tử Tướng — được quý nhân phù trợ, quyền quý.',
      'Phá Quân': 'Tử Phá Thìn Tuất — vi thần bất trung vi tử bất hiếu, phú nhưng bất quý.',
      'Thất Sát': 'Tử Vi khuất phục Thất Sát — cách về Võ, uy quyền.',
      'Tham Lang': 'Tử Tham — đào hoa phẩm chủ, nam nữ tà dâm.',
    }
  },
  'Thiên Cơ': {
    mieuVuong: 'Thiên Cơ miếu vượng chủ thông minh xuất chúng, mưu lược cao siêu, đa tài đa nghệ.',
    dac: 'Thiên Cơ Đắc — thông minh, biến thông nhưng hay thay đổi.',
    binh: 'Thiên Cơ Bình — có mưu nhưng thiếu quyết đoán.',
    ham: 'Thiên Cơ hãm bôn ba lao đao, đổi nghề nhiều lần, lập cơ sáng nghiệp khó.',
    nuMenh: 'Nữ mệnh Thiên Cơ gặp cát tinh thảo vát khéo léo. Gặp Thái Âm hãm dâm bần.',
    ketHop: {
      'Thiên Lương': 'Cơ Lương — thiện đàm binh pháp, tài kiêm văn võ. Ưa tu hành nếu gặp Không.',
      'Cự Môn': 'Cơ Cự — Mão cung rất tốt, Dậu cung tuy hay nhưng khó bền.',
      'Thái Âm': 'Cơ Nguyệt — ngoài ba mươi mới khá, mộ đại kinh thương.',
    }
  },
  'Thái Dương': {
    mieuVuong: 'Thái Dương miếu sáng rực rỡ, chủ danh vọng lớn, quý hiển. Quang minh bác ái.',
    dac: 'Thái Dương Đắc — có danh, hơi uổng công nhưng vẫn khá.',
    binh: 'Thái Dương Bình — có danh nhỏ, cần nỗ lực nhiều.',
    ham: 'Thái Dương hãm như mặt trời lặn, công danh mờ nhạt. Nam khắc phụ, nữ khắc phu.',
    nuMenh: 'Nữ mệnh Thái Dương đoan chính, sớm gặp chồng hiền. Lấy Nhật làm phu chủ.',
    ketHop: {
      'Thái Âm': 'Nhật Nguyệt đồng cung Sửu Mùi — phú bắc phong, trung cục luận.',
      'Cự Môn': 'Nhật Cự — Dần cung trì danh thực lộc. Thân cung bình.',
      'Thiên Lương': 'Nhật Lương — danh chấn biên di, thanh hiển.',
    }
  },
  'Vũ Khúc': {
    mieuVuong: 'Vũ Khúc miếu uy danh hách hách, chủ giàu có vững chắc, tài tinh đệ nhất.',
    dac: 'Vũ Khúc Đắc — có tài, cần cần kiệm mới giữ được.',
    binh: 'Vũ Khúc Bình — vất vả kiếm tiền, không dư dả.',
    ham: 'Vũ Khúc hãm gặp Phá Quân phá tổ phá gia, lao bác vất vả.',
    nuMenh: 'Vũ Khúc nữ mệnh — sao quả tú, dễ cô quả hoặc khuất phục chồng.',
    ketHop: {
      'Thiên Phủ': 'Vũ Phủ — tài quan song mỹ, giàu bền.',
      'Tham Lang': 'Vũ Tham — tiền bần hậu phú, sau ba mươi mới phát.',
      'Thiên Tướng': 'Vũ Tướng — thông minh sảo nghệ, tài lộc phong doanh.',
      'Phá Quân': 'Vũ Phá — phá tổ phá gia lao bác, đông thành tây bại.',
      'Thất Sát': 'Vũ Sát — vì tiền bạc mà bị hại, nguy hiểm.',
    }
  },
  'Thiên Đồng': {
    mieuVuong: 'Thiên Đồng đắc địa phúc dày thọ lâu, du du hưởng nhàn, ôn hòa.',
    dac: 'Thiên Đồng Đắc — có phúc, đời tương đối nhàn.',
    binh: 'Thiên Đồng Bình — có phúc nhỏ, không được nhàn lắm.',
    ham: 'Thiên Đồng hãm lao khổ bôn ba không ngừng, phúc mỏng.',
    nuMenh: 'Nữ mệnh Thiên Đồng tất thị hiền, nội trợ giỏi, tính thuận.',
    ketHop: {
      'Thiên Lương': 'Đồng Lương — Tị Hợi cung phúc khánh doanh phong, tuy phát nhưng đề phòng cuối.',
      'Cự Môn': 'Đồng Cự — trước khó sau dễ, lao tâm.',
      'Thái Âm': 'Đồng Âm — Tý cung rất tốt, hưởng phúc.',
    }
  },
  'Liêm Trinh': {
    mieuVuong: 'Liêm Trinh miếu văn võ song toàn, uy danh lẫy lừng. Coi về quyền lệnh.',
    dac: 'Liêm Trinh Đắc — có uy, cần kiểm soát tính nóng.',
    binh: 'Liêm Trinh Bình — tính cứng rắn, cần cẩn thận pháp luật.',
    ham: 'Liêm Trinh hãm dễ phạm tù tội, thị phi tai họa. Thứ đào hoa, thủ hai ham đánh bạc.',
    nuMenh: 'Liêm Trinh nữ mệnh đắc địa trinh thảo. Hãm thì tà dâm, hại tiện.',
    ketHop: {
      'Thiên Phủ': 'Liêm Phủ — an lạc, tài lộc sung túc.',
      'Tham Lang': 'Liêm Tham — Tị Hợi cung tàn kho, dâm đãng.',
      'Thiên Tướng': 'Liêm Tướng — Trọng Do uy mãnh, nhập miếu hội tướng quân.',
      'Thất Sát': 'Liêm Sát — miếu vượng phấn tác tích phú. Hãm lưu đãng thiên nhai.',
      'Phá Quân': 'Liêm Phá — gặp Hỏa tự ải đầu hà, nguy hiểm tính mạng.',
    }
  },
  'Thiên Phủ': {
    mieuVuong: 'Thiên Phủ chủ tài lộc điền trạch, giàu có bền vững. Giải tai ách chi tính.',
    dac: 'Thiên Phủ Đắc — có của ăn, cuộc sống ổn.',
    binh: 'Thiên Phủ Bình — có nhưng không giàu to, bình ổn.',
    ham: 'Thiên Phủ gặp Không Kiếp Tứ Sát cô lập, giảm phúc.',
    nuMenh: 'Nữ mệnh Thiên Phủ vượng phu ích tử, thông minh, thanh thoát.',
    ketHop: {
      'Tử Vi': 'Tử Phủ — toàn y phụ bật, phú quý.',
      'Liêm Trinh': 'Liêm Phủ — tài lộc sung túc, an lạc.',
      'Vũ Khúc': 'Vũ Phủ — đại phú, tích ngọc đôi kim.',
    }
  },
  'Thái Âm': {
    mieuVuong: 'Thái Âm miếu sáng sủa, chủ giàu phú quý. Thanh tú đoan nhã.',
    dac: 'Thái Âm Đắc — có tài, nhan sắc, cuộc sống êm đềm.',
    binh: 'Thái Âm Bình — có duyên nhưng tài lộc thường.',
    ham: 'Thái Âm hãm tài lộc kém, hôn nhân trắc trở. Lao tâm khổ tứ.',
    nuMenh: 'Nữ mệnh Thái Âm miếu — nhan sắc đẹp, phu ích tử. Hãm thì dâm bần.',
    ketHop: {
      'Thái Dương': 'Nhật Nguyệt — Sửu Mùi phú bắc phong.',
      'Thiên Đồng': 'Đồng Âm — Tý cung hưởng phúc.',
      'Thiên Cơ': 'Cơ Âm — trước ít sau nhiều.',
    }
  },
  'Tham Lang': {
    mieuVuong: 'Tham Lang tứ mộ phúc khí nùng. Gặp Hỏa Linh hào phú gia tư bá quý.',
    dac: 'Tham Lang Đắc — đa tài, phát muộn nhưng bền.',
    binh: 'Tham Lang Bình — đa tài nhưng hay sa đà, cần tiết chế.',
    ham: 'Tham Lang hãm quỷ quyệt, thủ đoạn. Suốt đời chẳng nên cơm cháo.',
    nuMenh: 'Nữ mệnh Tham Lang đa tật đố, hãm thì dâm bôn. Miếu thì phong lưu hào hoa.',
    ketHop: {
      'Liêm Trinh': 'Liêm Tham — Tị Hợi tàn kho, dâm đãng, dễ tù.',
      'Vũ Khúc': 'Vũ Tham — tiền bần hậu phú, lợi kỷ tổn nhân.',
      'Phá Quân': 'Tham gặp Phá — mê hoa luyến tửu, tán mạng.',
    }
  },
  'Cự Môn': {
    mieuVuong: 'Cự Môn đắc địa tài biện luận giỏi. Khoa Quyền Lộc ẩn ngọc phúc hưng long.',
    dac: 'Cự Môn Đắc — có tài ăn nói, thuyết phục.',
    binh: 'Cự Môn Bình — hay thị phi nhưng không đến nỗi họa.',
    ham: 'Cự Môn hãm chủ thị phi, miệng lưỡi gây họa. Ám muội đa nghi.',
    nuMenh: 'Nữ mệnh Cự Môn nhiều bất mãn với chồng. Cự cư Thê đa bất mãn hoài.',
    ketHop: {
      'Thái Dương': 'Cự Nhật — Dần cung trì danh thực lộc.',
      'Thiên Cơ': 'Cự Cơ — thầy kiện, luật sư, tranh biện giỏi.',
      'Thiên Đồng': 'Cự Đồng — lao tâm, trước khó sau dễ.',
    }
  },
  'Thiên Tướng': {
    mieuVuong: 'Thiên Tướng chủ ấn tín phúc lộc, đáng tin cậy. Ăn nói thành thực.',
    dac: 'Thiên Tướng Đắc — phúc lộc, được cấp trên giúp đỡ.',
    binh: 'Thiên Tướng Bình — có phúc nhỏ, thành bại bất định.',
    ham: 'Thiên Tướng hãm thành bại vô thường, ít được trợ giúp.',
    nuMenh: 'Nữ mệnh Thiên Tướng con quý chồng hiền, đoan trang.',
    ketHop: {
      'Tử Vi': 'Tử Tướng — quyền quý.',
      'Vũ Khúc': 'Vũ Tướng — thông minh sảo nghệ.',
      'Liêm Trinh': 'Liêm Tướng — uy quyền nếu miếu.',
    }
  },
  'Thiên Lương': {
    mieuVuong: 'Thiên Lương miếu chủ phúc thọ, đức độ. Giải nạn cho người, ẩn trọng.',
    dac: 'Thiên Lương Đắc — hiền lành, phúc thọ khá.',
    binh: 'Thiên Lương Bình — hiền nhưng ưu tư nhiều.',
    ham: 'Thiên Lương hãm chán trần tục, thích tu hành. Đa phiêu đãng.',
    nuMenh: 'Nữ mệnh Thiên Lương miếu vượng phu ích tử. Hãm cô đơn.',
    ketHop: {
      'Thiên Cơ': 'Cơ Lương — thiện đàm binh pháp, ưa đạo.',
      'Thiên Đồng': 'Đồng Lương — phúc khánh, cuối đời chú ý.',
      'Thái Dương': 'Nhật Lương — danh chấn, thanh hiển.',
    }
  },
  'Thất Sát': {
    mieuVuong: 'Thất Sát Dần Thân Tý Ngọ uy danh lẫy lừng, tước lộc vinh xương.',
    dac: 'Thất Sát Đắc — có uy nhưng sóng gió, cần cát tinh.',
    binh: 'Thất Sát Bình — sóng gió nhưng có thể thành công nếu có chí.',
    ham: 'Thất Sát gặp sát tinh hung hóa vô kể. Trầm ngâm phúc bất sinh.',
        nuMenh: 'Nữ mệnh Thất Sát cô độc, chí cao như nam tử. Miếu thì nữ trung hào kiệt.',
    ketHop: {
      'Vũ Khúc': 'Vũ Sát — vì tiền mà bị hại nếu hãm. Miếu thì lập công.',
      'Liêm Trinh': 'Liêm Sát — miếu tích phú vi nhân. Hãm lộ thương mai thi.',
      'Phá Quân': 'Sát Phá — cách bôn ba, khai sáng nghiệp lớn.',
    }
  },
  'Phá Quân': {
    mieuVuong: 'Phá Quân Tý Ngọ vô sát, quan tử thanh hiển chí tam công.',
    dac: 'Phá Quân Đắc — sự nghiệp qua đổi thay mà thành.',
    binh: 'Phá Quân Bình — hay đổi thay, bất ổn nhưng không đến nỗi phá.',
    ham: 'Phá Quân hãm phá tổ ly tông, bôn ba giang hồ, phiêu đãng.',
    nuMenh: 'Nữ mệnh Phá Quân đắc địa nữ trung hào kiệt. Hãm dâm đãng vô sỉ.',
    ketHop: {
      'Tử Vi': 'Tử Phá — Thìn Tuất bất nhân bất nghĩa. Sửu Mùi khá hơn.',
      'Vũ Khúc': 'Vũ Phá — đông thành tây bại, bôn ba.',
      'Liêm Trinh': 'Liêm Phá — gặp Hỏa tự ải. Nguy hiểm.',
    }
  },
};

// ============================================================
// PHẦN 2: HÀM TIỆN ÍCH
// ============================================================

function tamHopCungs(idx) {
  const groups = [[0,4,8],[1,5,9],[2,6,10],[3,7,11]];
  for (const g of groups) {
    if (g.includes(idx)) return g.filter(v => v !== idx);
  }
  return [];
}

function makeInMenhOrTam(menhIdx) {
  const tam = tamHopCungs(menhIdx);
  return (v) => v === menhIdx || tam.includes(v);
}

function cungHasHoa(stars, hoaType) {
  if (!stars) return false;
  return stars.some(s => s.hoa && s.hoa.includes(hoaType));
}

function findHoaStar(stars, hoaType) {
  if (!stars) return null;
  return stars.find(s => s.hoa && s.hoa.includes(hoaType));
}

function countSat(starNames) {
  return ['Kình Dương','Đà La','Hỏa Tinh','Linh Tinh']
    .filter(s => starNames.includes(s)).length;
}

function extractData(laSo) {
  const saoMap = {};
  const cungMap = {};
  const mieuHamMap = {};

  if (!laSo || !laSo.cungs) return { saoMap, cungMap, mieuHamMap };

  for (const c of laSo.cungs) {
    if (c.cungChuc) cungMap[c.cungChuc] = c.index;
    if (c.stars) {
      for (const s of c.stars) {
        saoMap[s.name] = c.index;
        if (s.mieuHam) mieuHamMap[s.name] = s.mieuHam;
      }
    }
  }
  return { saoMap, cungMap, mieuHamMap };
}

// ============================================================
// PHẦN 3: LUẬN TỔNG QUAN MỆNH
// ============================================================

function luanTongQuan(laSo, data) {
  const kets = [];
  if (!laSo.cungs) return kets;

  const menhIdx = laSo.cungMenh;
  const menhCung = laSo.cungs[menhIdx];
  if (!menhCung || !menhCung.stars) return kets;

  const stars = menhCung.stars;
  const menhChinh = stars.filter(s => s.type === 'chinh');
  const starNames = stars.map(s => s.name);

  // --- Vô chính diệu ---
  if (menhChinh.length === 0) {
    kets.push('Mệnh vô chính diệu — cần xem đối cung chiếu sang. Cuộc đời bấp bênh, đa nghệ.');
    const doiIdx = (menhIdx + 6) % 12;
    const doiChinh = laSo.cungs[doiIdx]?.stars?.filter(s => s.type === 'chinh') || [];
    if (doiChinh.length > 0) {
      kets.push('Đối cung có ' + doiChinh.map(s => s.name).join(', ') + ' chiếu sang — mượn lực đối cung.');
    }
  }

  // --- Chính tinh tại Mệnh ---
  for (const s of menhChinh) {
    const info = LUAN_CHINH_TINH[s.name];
    if (!info) continue;
    const mh = s.mieuHam || '';
    if (mh === 'Miếu' || mh === 'Vượng') kets.push(info.mieuVuong);
    else if (mh === 'Hãm') kets.push(info.ham);
    else if (mh === 'Bình' && info.binh) kets.push(info.binh);
    else if (mh === 'Đắc' && info.dac) kets.push(info.dac);
    else kets.push(s.name + ' tại Mệnh — ' + (info.mieuVuong || '').split('.')[0] + '.');

    if (laSo.gioiTinh === 'nu' && info.nuMenh) kets.push(info.nuMenh);
  }

  // --- Kết hợp chính tinh ---
  if (menhChinh.length >= 2) {
    const names = menhChinh.map(s => s.name);
    for (const s of menhChinh) {
      const info = LUAN_CHINH_TINH[s.name];
      if (!info || !info.ketHop) continue;
      for (const other of names) {
        if (other !== s.name && info.ketHop[other]) {
          kets.push(info.ketHop[other]);
          break;
        }
      }
      break; // Chỉ lấy 1 cặp
    }
  }

  // --- Mệnh Thân ---
  const thanIdx = laSo.cungThan;
  if (thanIdx === menhIdx) {
    kets.push('Mệnh Thân đồng cung — tốt rất tốt, xấu rất xấu. Tăng cường bản mệnh.');
  } else {
    const thanChinh = laSo.cungs[thanIdx]?.stars?.filter(s => s.type === 'chinh') || [];
    if (thanChinh.length > 0) {
      const thanHam = thanChinh.some(s => s.mieuHam === 'Hãm');
      const thanMieu = thanChinh.some(s => ['Miếu','Vượng'].includes(s.mieuHam));
      if (thanHam) kets.push('Thân cung chính tinh hãm — hậu vận trắc trở.');
      else if (thanMieu) kets.push('Thân cung chính tinh miếu vượng — hậu vận tốt đẹp.');
    }
  }

  // --- Tứ Hóa tại Mệnh ---
  if (cungHasHoa(stars, 'Lộc')) {
    const s = findHoaStar(stars, 'Lộc');
    kets.push('Hóa Lộc (' + s.name + ') tại Mệnh — suốt đời có phúc, làm gì cũng thuận.');
  }
  if (cungHasHoa(stars, 'Quyền')) {
    const s = findHoaStar(stars, 'Quyền');
    kets.push('Hóa Quyền (' + s.name + ') tại Mệnh — uy quyền, quả đoán, tự chủ.');
  }
  if (cungHasHoa(stars, 'Khoa')) {
    const s = findHoaStar(stars, 'Khoa');
    kets.push('Hóa Khoa (' + s.name + ') tại Mệnh — thanh danh, văn tài, dễ đỗ đạt.');
  }
  if (cungHasHoa(stars, 'Kị')) {
    const s = findHoaStar(stars, 'Kị');
    kets.push('Hóa Kị (' + s.name + ') tại Mệnh — bất như ý, hay lo, thị phi.');
  }

  // --- Sát tinh ---
  const satN = countSat(starNames);
  if (satN >= 3) kets.push('Mệnh gặp quá nhiều sát tinh — đời cực sóng gió.');
  else if (satN === 2) kets.push('Mệnh gặp hai sát tinh — nhiều trắc trở, cần nghị lực.');

  if (starNames.includes('Địa Không') && starNames.includes('Địa Kiếp'))
    kets.push('Không Kiếp đồng cung Mệnh — đại hung, dễ trắng tay.');

  return kets;
}

// ============================================================
// PHẦN 4: LUẬN CÁCH CỤC
// ============================================================

function luanCachCuc(laSo, data) {
  const kets = [];
  const { saoMap, cungMap } = data;
  const menhIdx = cungMap['Mệnh'];
  if (menhIdx === undefined) return kets;
  const inMenhOrTam = makeInMenhOrTam(menhIdx);
  const getMH = window.TuViAlgorithm?.getMieuHam;

  const tham=saoMap['Tham Lang'], hoa=saoMap['Hỏa Tinh'], linh=saoMap['Linh Tinh'];
  const sat=saoMap['Thất Sát'], pha=saoMap['Phá Quân'];
  const tuvi=saoMap['Tử Vi'], thienPhu=saoMap['Thiên Phủ'];
  const nhat=saoMap['Thái Dương'], nguyet=saoMap['Thái Âm'];
  const loc=saoMap['Lộc Tồn'], ma=saoMap['Thiên Mã'];
  const kinh=saoMap['Kình Dương'], da=saoMap['Đà La'];
  const dk=saoMap['Địa Không'], dki=saoMap['Địa Kiếp'];
  const liem=saoMap['Liêm Trinh'];
  const co=saoMap['Thiên Cơ'], dong=saoMap['Thiên Đồng'], luong=saoMap['Thiên Lương'];
  const tuong=saoMap['Thiên Tướng'];
  const hkhoa=saoMap['Hóa Khoa'], hquyen=saoMap['Hóa Quyền'], hloc=saoMap['Hóa Lộc'];
  const hki=saoMap['Hóa Kị'];

  const m1=(menhIdx+1)%12, m2=(menhIdx-1+12)%12;

  // --- QUÝ CÁCH ---

  if (tham!==undefined && hoa!==undefined && tham===hoa && [4,10,1,7].includes(tham) && inMenhOrTam(tham))
    kets.push({ten:'Tham Hỏa Tương Phùng', luan:'Tham Lang Hỏa Tinh tứ mộ cung — hào phú gia tư bá quý.', muc:'quý'});

  if (tham!==undefined && linh!==undefined && tham===linh && [4,10,1,7].includes(tham) && inMenhOrTam(tham))
    kets.push({ten:'Tham Linh Triều Đẩu', luan:'Tham Lang Linh Tinh tịnh thủ tứ mộ — tướng tướng chi danh.', muc:'quý'});

  if (loc!==undefined && ma!==undefined && loc===ma)
    kets.push({ten:'Lộc Mã Giao Trì', luan:'Lộc Tồn Thiên Mã đồng cung — phát tài phương xa.', muc:'phú'});

  if (ma!==undefined && kinh!==undefined && ma===kinh)
    kets.push({ten:'Mã Đầu Đới Kiếm', luan:'Thiên Mã Kình Dương — uy danh biên cương, quyền lực.', muc:'quý'});

  if (sat!==undefined && pha!==undefined && tham!==undefined) {
    if ([sat,pha,tham].filter(v=>inMenhOrTam(v)).length >= 2)
      kets.push({ten:'Sát Phá Tham', luan:'Cách bôn ba lập nghiệp — gian nan nhưng thành công lớn.', muc:'quý'});
  }

  if (tuvi!==undefined && thienPhu!==undefined && inMenhOrTam(tuvi) && inMenhOrTam(thienPhu))
    kets.push({ten:'Tử Phủ Triều Viên', luan:'Tử Vi Thiên Phủ hội chiếu — phú quý song toàn.', muc:'quý'});

  if (thienPhu!==undefined && tuong!==undefined && inMenhOrTam(thienPhu) && inMenhOrTam(tuong))
    kets.push({ten:'Phủ Tướng Triều Viên', luan:'Thiên Phủ Thiên Tướng triều — thực lộc thiên chung.', muc:'quý'});

  if (tuvi!==undefined && tuvi===6 && inMenhOrTam(tuvi)) {
    const ms = laSo.cungs[tuvi]?.stars||[];
    if (!ms.some(s=>['Kình Dương','Đà La','Hỏa Tinh','Linh Tinh','Địa Không','Địa Kiếp'].includes(s.name)))
      kets.push({ten:'Tử Vi Cư Ngọ', luan:'Tử Vi cư Ngọ vô sát — vị chí công khanh.', muc:'quý'});
  }

  if (nhat!==undefined && nguyet!==undefined && getMH) {
    const nMH=getMH('Thái Dương',nhat), ngMH=getMH('Thái Âm',nguyet);
    if (['Miếu','Vượng'].includes(nMH) && ['Miếu','Vượng'].includes(ngMH))
      kets.push({ten:'Nhật Nguyệt Tinh Minh', luan:'Nhật Nguyệt đều sáng — quý hiển phú quý song toàn.', muc:'quý'});
    if (nMH==='Hãm' && ngMH==='Hãm')
      kets.push({ten:'Nhật Nguyệt Tàng Huy', luan:'Nhật Nguyệt đều hãm — bần tiện lận đận.', muc:'bần'});
  }

  if (nhat!==undefined && nhat===3 && inMenhOrTam(nhat))
    kets.push({ten:'Nhật Chiếu Lôi Môn', luan:'Thái Dương tại Mão — phú quý vinh hoa.', muc:'quý'});
  if (nhat!==undefined && nhat===6 && inMenhOrTam(nhat))
    kets.push({ten:'Kim Sán Quang Huy', luan:'Thái Dương Ngọ — Nhật lệ trung thiên, quyền quý.', muc:'quý'});
  if (nguyet!==undefined && nguyet===11 && inMenhOrTam(nguyet))
    kets.push({ten:'Nguyệt Lãng Thiên Môn', luan:'Thái Âm cư Hợi — trăng sáng cửa trời.', muc:'quý'});
  if (nguyet!==undefined && nguyet===0 && inMenhOrTam(nguyet))
    kets.push({ten:'Thủy Trừng Quế Ngạc', luan:'Thái Âm cư Tý — nước trong có quế, thanh quý.', muc:'quý'});

  if (co!==undefined && nguyet!==undefined && dong!==undefined && luong!==undefined) {
    if ([co,nguyet,dong,luong].filter(v=>inMenhOrTam(v)).length >= 3)
      kets.push({ten:'Cơ Nguyệt Đồng Lương', luan:'Bốn sao hội — an phận thủ thường, công chức ổn.', muc:'phú'});
  }

  if (liem!==undefined && sat!==undefined && liem===sat && getMH) {
    if (['Miếu','Vượng','Đắc'].includes(getMH('Liêm Trinh',liem)))
            kets.push({ten:'Liêm Sát Đồng Cung', luan:'Liêm Trinh Thất Sát miếu — tích phú vi nhân.', muc:'phú'});
  }

  if (loc!==undefined && hloc!==undefined && ((loc===m1&&hloc===m2)||(hloc===m1&&loc===m2)))
    kets.push({ten:'Song Lộc Giáp Mệnh', luan:'Lộc Tồn Hóa Lộc kẹp Mệnh — suốt đời dư dả.', muc:'phú'});

  if (hkhoa!==undefined && hquyen!==undefined && hloc!==undefined) {
    if ([hkhoa,hquyen,hloc].filter(v=>inMenhOrTam(v)).length >= 2)
      kets.push({ten:'Khoa Quyền Lộc Hội', luan:'Tam Hóa hội — phú quý song toàn.', muc:'quý'});
  }

  // --- HUNG CÁCH ---

  if (dk!==undefined && dki!==undefined && ((dk===m1&&dki===m2)||(dki===m1&&dk===m2)))
    kets.push({ten:'Không Kiếp Giáp Mệnh', luan:'Phi yểu tắc bần, cô đơn khốn khổ.', muc:'bần'});

  if (hoa!==undefined && linh!==undefined && ((hoa===m1&&linh===m2)||(linh===m1&&hoa===m2)))
    kets.push({ten:'Hỏa Linh Giáp Mệnh', luan:'Bại cục, tai họa bất ngờ.', muc:'bần'});

  if (kinh!==undefined && da!==undefined && hki!==undefined) {
    const k1=(hki+1)%12, k2=(hki-1+12)%12;
    if ((kinh===k1&&da===k2)||(da===k1&&kinh===k2))
      kets.push({ten:'Dương Đà Giáp Kị', luan:'Kình Đà kẹp Hóa Kị — suốt đời trắc trở.', muc:'bần'});
  }

  if (liem!==undefined && tham!==undefined && (liem===5||liem===11) && liem===tham)
    kets.push({ten:'Liêm Tham Tị Hợi', luan:'Dâm đãng, gặp sát dễ tù tội.', muc:'bần'});

  if (liem!==undefined && pha!==undefined && liem===pha) {
    const ls = laSo.cungs[liem]?.stars?.map(s=>s.name)||[];
    if (ls.includes('Hỏa Tinh')||ls.includes('Linh Tinh'))
      kets.push({ten:'Liêm Phá Gặp Hỏa', luan:'Tự ải đầu hà — nguy hiểm tính mạng.', muc:'bần'});
  }

  return kets;
}

// ============================================================
// PHẦN 5: LUẬN TUẦN TRIỆT
// ============================================================

function luanTuanTriet(laSo, data) {
  const kets = [];
  const { cungMap } = data;

  const tuanIdxs = [], trietIdxs = [];
  for (const c of laSo.cungs) {
    if (c.isTuan) tuanIdxs.push(c.index);
    if (c.isTriet) trietIdxs.push(c.index);
  }

  const menhIdx = cungMap['Mệnh'];
  const taiIdx = cungMap['Tài Bạch'];
  const phuIdx = cungMap['Phu Thê'];
  const quanIdx = cungMap['Quan Lộc'];
  const phucIdx = cungMap['Phúc Đức'];

  if (tuanIdxs.includes(menhIdx))
    kets.push('⊘ Mệnh bị Tuần — giảm lực cát tinh, cũng giảm hung tinh. Như dao hai lưỡi.');
  if (trietIdxs.includes(menhIdx))
    kets.push('✕ Mệnh bị Triệt — đầu đời trắc trở. Tam phương có cát thì Triệt hóa giải sát.');

  if (taiIdx!==undefined && (tuanIdxs.includes(taiIdx)||trietIdxs.includes(taiIdx)))
    kets.push('Tài Bạch bị Tuần/Triệt — tài lộc bấp bênh, lúc có lúc không.');
  if (phuIdx!==undefined && (tuanIdxs.includes(phuIdx)||trietIdxs.includes(phuIdx)))
    kets.push('Phu Thê bị Tuần/Triệt — hôn nhân trắc trở, nên lấy muộn.');
  if (quanIdx!==undefined && (tuanIdxs.includes(quanIdx)||trietIdxs.includes(quanIdx)))
    kets.push('Quan Lộc bị Tuần/Triệt — công danh lận đận, hay đổi nghề.');
  if (phucIdx!==undefined && (tuanIdxs.includes(phucIdx)||trietIdxs.includes(phucIdx)))
    kets.push('Phúc Đức bị Tuần/Triệt — phúc đức ông bà giảm sút.');

  return kets;
}

// ============================================================
// PHẦN 6: LUẬN TỪNG CUNG
// (Dùng cungStars = mảng star objects)
// ============================================================

function luanMotCung(tenCung, cungStars, mieuHamMap) {
  const kets = [];
  if (!cungStars || cungStars.length === 0) return kets;

  const starNames = cungStars.map(s => s.name);
  const chinh = [];
  for (const s of starNames) { if (LUAN_CHINH_TINH[s]) chinh.push(s); }

  const hasLoc = cungHasHoa(cungStars,'Lộc');
  const hasQuyen = cungHasHoa(cungStars,'Quyền');
  const hasKhoa = cungHasHoa(cungStars,'Khoa');
  const hasKy = cungHasHoa(cungStars,'Kị');
  const locS = findHoaStar(cungStars,'Lộc');
  const quyenS = findHoaStar(cungStars,'Quyền');
  const khoaS = findHoaStar(cungStars,'Khoa');
  const kyS = findHoaStar(cungStars,'Kị');

  const hasDuong=starNames.includes('Kình Dương'), hasDa=starNames.includes('Đà La');
  const hasHoa=starNames.includes('Hỏa Tinh'), hasLinh=starNames.includes('Linh Tinh');
  const hasKhong=starNames.includes('Địa Không'), hasKiep=starNames.includes('Địa Kiếp');
  const satN = countSat(starNames);

  const hasLocTon=starNames.includes('Lộc Tồn'), hasMa=starNames.includes('Thiên Mã');
  const hasTaPhu=starNames.includes('Tả Phù'), hasHuuBat=starNames.includes('Hữu Bật');
  const hasXuong=starNames.includes('Văn Xương'), hasKhuc=starNames.includes('Văn Khúc');
  const hasKhoi=starNames.includes('Thiên Khôi'), hasViet=starNames.includes('Thiên Việt');
  const hasHongLoan=starNames.includes('Hồng Loan'), hasThienHy=starNames.includes('Thiên Hỷ');
  const hasDaoHoa=starNames.includes('Đào Hoa'), hasThienHinh=starNames.includes('Thiên Hình');
  const hasTangMon=starNames.includes('Tang Môn'), hasBachHo=starNames.includes('Bạch Hổ');

  // --- A. CHÍNH TINH ---
  for (const s of chinh) {
    const mh = mieuHamMap[s]||'';
    if (mh==='Miếu'||mh==='Vượng') kets.push(s+' '+mh+' tại '+tenCung+' — rất tốt.');
    else if (mh==='Đắc') kets.push(s+' Đắc tại '+tenCung+' — khá tốt.');
    else if (mh==='Bình') kets.push(s+' Bình tại '+tenCung+' — trung bình, cần phụ tinh.');
    else if (mh==='Hãm') kets.push(s+' Hãm tại '+tenCung+' — giảm lực, trắc trở.');
  }

  // --- B. TỨ HÓA ---
  if (hasLoc) kets.push('Hóa Lộc ('+locS.name+') tại '+tenCung+' — tăng phúc lộc.');
  if (hasQuyen) kets.push('Hóa Quyền ('+quyenS.name+') tại '+tenCung+' — tăng quyền lực.');
  if (hasKhoa) kets.push('Hóa Khoa ('+khoaS.name+') tại '+tenCung+' — tăng danh tiếng.');
  if (hasKy) kets.push('Hóa Kị ('+kyS.name+') tại '+tenCung+' — trắc trở thị phi.');

  // --- C. THEO TỪNG CUNG ---

  if (tenCung==='Mệnh') {
    if (chinh.length===0) kets.push('Mệnh vô chính diệu — xem đối cung. Đa nghệ, bấp bênh.');
    if (satN>=2) kets.push('Mệnh nhiều sát — đời sóng gió.');
    if (hasKhong&&hasKiep) kets.push('Không Kiếp đồng cung — đại hung, dễ trắng tay.');
    else if (hasKhong||hasKiep) kets.push((hasKhong?'Địa Không':'Địa Kiếp')+' tại Mệnh — phải tự lập.');
    if (hasLocTon) kets.push('Lộc Tồn thủ Mệnh — giàu nhưng keo kiệt.');
    if (hasLocTon&&hasMa) kets.push('Lộc Mã tại Mệnh — phát tài phương xa.');
    if (hasMa&&!hasLocTon) kets.push('Thiên Mã tại Mệnh — bôn ba, hay di chuyển.');
    if (hasTaPhu&&hasHuuBat) kets.push('Tả Hữu đồng cung — quyền quý, nhiều người phù trợ.');
    if (hasXuong&&hasKhuc) kets.push('Xương Khúc đồng cung — văn tài xuất chúng.');
    if (hasKhoi||hasViet) kets.push('Khôi Việt tại Mệnh — quý nhân nhiều, đỗ đạt sớm.');
    if (hasDaoHoa) kets.push('Đào Hoa tại Mệnh — nhan sắc, đa tình.');
    if (hasThienHinh) kets.push('Thiên Hình tại Mệnh — nghề pháp luật, y tế, quân sự.');
    if (hasDuong&&hasHoa) kets.push('Kình Hỏa đồng cung — uy quyền nếu miếu, hung nếu hãm.');
  }

  if (tenCung==='Phu Thê') {
    if (hasHongLoan||hasThienHy) kets.push('Hồng Loan/Thiên Hỷ — hôn nhân tốt đẹp.');
    if (hasDaoHoa) kets.push('Đào Hoa tại Phu Thê — vợ/chồng đẹp nhưng đa tình.');
    if (satN>=2) kets.push('Nhiều sát tại Phu Thê — hôn nhân trắc trở, nên lấy muộn.');
    if (hasKhong||hasKiep) kets.push('Không Kiếp tại Phu Thê — duyên mỏng, bấp bênh.');
    if (starNames.includes('Cự Môn')) kets.push('Cự Môn cư Thê — đa bất mãn, hay cãi vã.');
    if (starNames.includes('Phá Quân')) kets.push('Phá Quân tại Phu Thê — nam khắc thê nữ khắc phu.');
    if (starNames.includes('Liêm Trinh')) kets.push('Liêm Trinh tại Phu Thê — viễn phối, lấy xa mới tốt.');
    if (hasTaPhu||hasHuuBat) kets.push('Tả Hữu tại Phu Thê — hai đời vợ/chồng hoặc có người thứ ba.');
    if (hasDa) kets.push('Đà La tại Phu Thê — không cô quả cũng buồn khổ.');
  }

  if (tenCung==='Tài Bạch') {
    if (starNames.some(s=>['Vũ Khúc','Thiên Phủ'].includes(s))) kets.push('Tài tinh tại Tài Bạch — giàu có, tích lũy.');
    if (hasKhong||hasKiep) kets.push('Không Kiếp tại Tài — hao tán, hoạnh phát hoạnh phá.');
    if (hasLocTon&&hasMa) kets.push('Lộc Mã tại Tài — phát tài phương xa.');
    if (hasLocTon&&!hasMa) kets.push('Lộc Tồn tại Tài — tích ngọc đôi kim.');
    if (starNames.includes('Phá Quân')) kets.push('Phá Quân tại Tài — đông thành tây bại.');
    if (starNames.includes('Tham Lang')) kets.push('Tham Lang tại Tài — sau 30 mới phát.');
    if (satN>=2) kets.push('Nhiều sát tại Tài — vất vả kiếm sống.');
  }

  if (tenCung==='Quan Lộc') {
    if (starNames.includes('Thất Sát')) {
      const mh=mieuHamMap['Thất Sát']||'';
      kets.push('Thất Sát tại Quan — '+(['Miếu','Vượng'].includes(mh)?'uy áp vạn nhân':'sóng gió nhưng có thể lập công')+'.');
    }
    if (hasXuong||hasKhuc) kets.push('Xương Khúc tại Quan — văn chương đỗ đạt.');
    if (starNames.includes('Tử Vi')) kets.push('Tử Vi tại Quan — chức vị cao.');
    if (starNames.includes('Liêm Trinh')&&hasThienHinh) kets.push('Liêm Hình tại Quan — dính líu pháp luật.');
    if (starNames.includes('Phá Quân')) kets.push('Phá Quân tại Quan — hay đổi nghề.');
    if (hasKhong||hasKiep) kets.push('Không Kiếp tại Quan — công danh bấp bênh.');
  }

  if (tenCung==='Phúc Đức') {
    if (starNames.some(s=>['Thiên Đồng','Thiên Lương','Thiên Phủ'].includes(s))) kets.push('Phúc tinh tại Phúc Đức — an nhàn phúc thọ.');
    if (starNames.includes('Thất Sát')) kets.push('Thất Sát tại Phúc — lao tâm suốt đời.');
    if (starNames.includes('Phá Quân')) kets.push('Phá Quân tại Phúc — đa tai phá phúc.');
    if (hasKhong||hasKiep) kets.push('Không Kiếp tại Phúc — sinh lai bần tiện.');
  }

  if (tenCung==='Tử Tức') {
    if (starNames.some(s=>['Tử Vi','Thiên Phủ'].includes(s))) kets.push('Đế tinh tại Tử Tức — sinh quý tử.');
    if (hasThienHinh) kets.push('Thiên Hình tại Tử Tức — hiếm con, khắc con.');
    if (hasKhong&&hasKiep) kets.push('Không Kiếp tại Tử Tức — sinh nhiều nuôi ít.');
    if (satN>=2) kets.push('Sát tinh tại Tử Tức — con gian truân.');
    if (hasXuong||hasKhuc) kets.push('Xương Khúc tại Tử Tức — con thông minh xinh đẹp.');
  }

  if (tenCung==='Tật Ách') {
    if (starNames.includes('Liêm Trinh')) kets.push('Liêm Trinh tại Tật — huyết quang, thương tích.');
    if (hasHoa||hasLinh) kets.push('Hỏa Linh tại Tật — bỏng, viêm nhiễm.');
        if (hasDuong) kets.push('Kình Dương tại Tật — tai nạn, phẫu thuật, sẹo.');
    if (hasDa) kets.push('Đà La tại Tật — bệnh ám, khó phát hiện.');
    if (starNames.includes('Cự Môn')) kets.push('Cự Môn tại Tật — bệnh miệng, tai, hô hấp.');
    if (hasKhong||hasKiep) kets.push('Không Kiếp tại Tật — bệnh tim, phong tật.');
    if (starNames.includes('Thiên Phủ')) kets.push('Thiên Phủ tại Tật — mạnh khỏe, gặp nạn dễ cứu.');
  }

  if (tenCung==='Thiên Di') {
    if (hasLocTon&&hasMa) kets.push('Lộc Mã tại Thiên Di — ra ngoài phát tài.');
    if (hasKhong||hasKiep) kets.push('Không Kiếp tại Thiên Di — ra ngoài bất an.');
    if (satN>=2) kets.push('Sát tinh tại Thiên Di — lênh đênh góc bể chân trời.');
    if (starNames.some(s=>['Tử Vi','Thiên Phủ','Thiên Tướng'].includes(s))) kets.push('Quý tinh tại Thiên Di — gặp quý nhân phù trợ.');
    if (starNames.includes('Liêm Trinh')&&starNames.includes('Thất Sát')) kets.push('Liêm Sát tại Thiên Di — phiêu bồng giang hồ.');
  }

  if (tenCung==='Huynh Đệ') {
    if (hasKhong||hasKiep) kets.push('Không Kiếp tại Huynh — anh em đơn sơ.');
    if (satN>=2) kets.push('Sát tinh tại Huynh — anh em bất hòa.');
    if (hasTaPhu||hasHuuBat) kets.push('Tả Hữu tại Huynh — anh em nhiều, giúp đỡ.');
    if (starNames.includes('Phá Quân')) kets.push('Phá Quân tại Huynh — anh em tranh tài sản.');
  }

  if (tenCung==='Nô Bộc') {
    if (satN>=2) kets.push('Sát tinh tại Nô Bộc — bạn bè phản bội.');
    if (hasKhong||hasKiep) kets.push('Không Kiếp tại Nô Bộc — dễ bị bạn hại.');
    if (starNames.includes('Thất Sát')) kets.push('Thất Sát tại Nô — thuộc hạ rình rập.');
    if (hasLocTon) kets.push('Lộc Tồn tại Nô — túng hữu quan dã bôn trì.');
  }

  if (tenCung==='Điền Trạch') {
    if (starNames.some(s=>['Thiên Phủ','Vũ Khúc','Lộc Tồn'].includes(s))) kets.push('Tài tinh tại Điền — nhà rộng ruộng nhiều.');
    if (starNames.includes('Phá Quân')) kets.push('Phá Quân tại Điền — phá tổ nghiệp, bán hết.');
    if (hasKhong||hasKiep) kets.push('Không Kiếp tại Điền — nhà cửa bất ổn.');
    if (starNames.includes('Tham Lang')&&(hasHoa||hasLinh)) kets.push('Tham Hỏa/Linh tại Điền — rất tốt nhưng cẩn thận cháy nhà.');
  }

  if (tenCung==='Phụ Mẫu') {
    if (starNames.includes('Thái Dương')) {
      const mh=mieuHamMap['Thái Dương']||'';
      if (mh==='Hãm') kets.push('Thái Dương hãm tại Phụ Mẫu — cha mất sớm hoặc khắc ly.');
      else if (['Miếu','Vượng'].includes(mh)) kets.push('Thái Dương sáng tại Phụ Mẫu — cha hiền, gia đình thuận.');
    }
    if (starNames.includes('Thái Âm')) {
      const mh=mieuHamMap['Thái Âm']||'';
      if (mh==='Hãm') kets.push('Thái Âm hãm tại Phụ Mẫu — mẹ mất sớm hoặc khắc ly.');
      else if (['Miếu','Vượng'].includes(mh)) kets.push('Thái Âm sáng tại Phụ Mẫu — mẹ hiền.');
    }
    if (satN>=2) kets.push('Sát tinh tại Phụ Mẫu — phụ mẫu bất toàn.');
    if (hasThienHinh) kets.push('Thiên Hình tại Phụ Mẫu — khắc cha mẹ, hoặc con nuôi.');
    if (hasTangMon||hasBachHo) kets.push('Tang Hổ tại Phụ Mẫu — sớm chịu tang cha/mẹ.');
  }

  return kets;
}

// ============================================================
// PHẦN 7: LUẬN ĐẠI HẠN
// ============================================================

// ============================================================
// PHẦN 7: LUẬN ĐẠI HẠN (PHIÊN BẢN ĐẦY ĐỦ)
// Nguồn: Tử Vi Đẩu Số Toàn Thư — chương Đại Tiểu Hạn
// "Mệnh hảo thân hảo hạn hảo đáo lão vinh xương"
// "Mệnh suy thân suy hạn suy chung thân khất cái"
// ============================================================
// ============================================================
// LUẬN ĐẠI HẠN — PHIÊN BẢN TỰ ĐỦ (SELF-CONTAINED)
// Không phụ thuộc findHoaStar, cungHasHoa, tamHopCungs
// ============================================================

function luanDaiHan(laSo, data) {
  const kets = [];
  const DIACHI = (window.TuViAlgorithm && window.TuViAlgorithm.DIACHI)
    ? window.TuViAlgorithm.DIACHI
    : ['Tý','Sửu','Dần','Mão','Thìn','Tị','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];

  if (!laSo || !laSo.daiVans || !laSo.cungs) return kets;

  // --- Helper nội bộ: tìm sao mang Hóa ---
  function _findHoa(stars, hoaType) {
    if (!stars) return null;
    for (var i = 0; i < stars.length; i++) {
      if (stars[i].hoa && stars[i].hoa.indexOf(hoaType) >= 0) return stars[i];
    }
    return null;
  }

  // --- Helper nội bộ: tam hợp ---
  function _tamHop(idx) {
    var groups = [[0,4,8],[1,5,9],[2,6,10],[3,7,11]];
    for (var g = 0; g < groups.length; g++) {
      if (groups[g].indexOf(idx) >= 0) {
        return groups[g].filter(function(v) { return v !== idx; });
      }
    }
    return [];
  }

  // --- Tràng Sinh theo cung ---
  var tsByCung = {};
  for (var ci = 0; ci < laSo.cungs.length; ci++) {
    var cc = laSo.cungs[ci];
    if (!cc.stars) continue;
    for (var si = 0; si < cc.stars.length; si++) {
      var ss = cc.stars[si];
      if (ss.type === 'ts' || ss.group === 'ts') {
        tsByCung[cc.index] = ss.name;
      }
    }
  }

  // --- Cung chức ---
  var cungChucMap = {};
  for (var ci2 = 0; ci2 < laSo.cungs.length; ci2++) {
    if (laSo.cungs[ci2].cungChuc) {
      cungChucMap[laSo.cungs[ci2].index] = laSo.cungs[ci2].cungChuc;
    }
  }

  // --- Duyệt từng đại vận ---
  for (var di = 0; di < laSo.daiVans.length; di++) {
    var dh = laSo.daiVans[di];
    var cungIdx = dh.cung;
    var cungTen = DIACHI[cungIdx] || '?';
    var cungChuc = cungChucMap[cungIdx] || '';
    var tsName = tsByCung[cungIdx] || '';
    var lines = [];

    var cungData = laSo.cungs[cungIdx];
    if (!cungData || !cungData.stars) {
      kets.push({ tuoi: dh.tuoiDau+'-'+dh.tuoiCuoi, cung: cungTen, nhanDinh: ['Không có dữ liệu cung.'] });
      continue;
    }

    var stars = cungData.stars;
    var starNames = [];
    for (var sn = 0; sn < stars.length; sn++) starNames.push(stars[sn].name);

    var chinhStars = [];
    for (var cs = 0; cs < stars.length; cs++) {
      if (stars[cs].type === 'chinh') chinhStars.push(stars[cs]);
    }

    // Đối cung
    var doiIdx = (cungIdx + 6) % 12;
    var doiData = laSo.cungs[doiIdx];
    var doiStars = (doiData && doiData.stars) ? doiData.stars : [];
    var doiChinh = [];
    for (var dc = 0; dc < doiStars.length; dc++) {
      if (doiStars[dc].type === 'chinh') doiChinh.push(doiStars[dc]);
    }

    // Tam hợp
    var tamHop = _tamHop(cungIdx);
    var tamStars0 = (laSo.cungs[tamHop[0]] && laSo.cungs[tamHop[0]].stars) ? laSo.cungs[tamHop[0]].stars : [];
    var tamStars1 = (laSo.cungs[tamHop[1]] && laSo.cungs[tamHop[1]].stars) ? laSo.cungs[tamHop[1]].stars : [];

    // ══════════ 1. CUNG CHỨC ══════════
    if (cungChuc) {
      lines.push('📍 Hạn hành cung ' + cungChuc + ' (' + cungTen + ')');
      var chucLuan = {
        'Mệnh': 'Trở về bản mệnh — vận khí ảnh hưởng trực tiếp bản thân.',
        'Huynh Đệ': 'Vận liên quan anh em, bạn bè, hợp tác.',
        'Phu Thê': 'Vận liên quan hôn nhân, tình duyên, đối tác.',
        'Tử Tức': 'Vận liên quan con cái, sáng tạo, đầu tư.',
        'Tài Bạch': 'Vận liên quan tài chính, kinh doanh, thu nhập.',
        'Tật Ách': 'Vận liên quan sức khỏe, bệnh tật. Cần chú ý.',
        'Thiên Di': 'Vận liên quan xuất ngoại, giao tế, di chuyển.',
        'Nô Bộc': 'Vận liên quan thuộc hạ, nhân viên, bạn bè.',
        'Quan Lộc': 'Vận liên quan công danh, sự nghiệp, chức vụ.',
        'Điền Trạch': 'Vận liên quan nhà cửa, bất động sản.',
        'Phúc Đức': 'Vận liên quan phúc thọ, hưởng thụ, tâm linh.',
        'Phụ Mẫu': 'Vận liên quan cha mẹ, học hành, giấy tờ.'
      };
      if (chucLuan[cungChuc]) lines.push('  ' + chucLuan[cungChuc]);
    }

    // ══════════ 2. TRÀNG SINH ══════════
    var tsLuan = {
      'Tràng Sinh': '🟢 Tràng Sinh — vận thịnh, nhiều cơ hội mới, phát triển thuận lợi.',
      'Mộc Dục':    '🟡 Mộc Dục — nhiều biến động, đa dục, không ổn định.',
      'Quan Đới':   '🔵 Quan Đới — bắt đầu lập nghiệp, dần khá lên.',
      'Lâm Quan':   '🟢 Lâm Quan — sự nghiệp thăng tiến, đang lên đỉnh.',
      'Đế Vượng':   '🟢 Đế Vượng — cực thịnh, quyền uy cao nhất.',
      'Suy':        '🟡 Suy — đang đi xuống, nên bảo toàn, ít mạo hiểm.',
      'Bệnh':       '🔴 Bệnh — sức khỏe yếu, rắc rối, nên nghỉ ngơi.',
      'Tử':         '🔴 Tử — vận tận cùng, kết thúc giai đoạn.',
            'Mộ':         '🟡 Mộ — tàng trữ, thu về, không phát lộ. Cần xung phá.',
      'Tuyệt':      '🔴 Tuyệt — đứt đoạn, chia xa, đổi thay lớn.',
      'Thai':       '🔵 Thai — mầm mống mới đang hình thành, chờ thời.',
      'Dưỡng':      '🔵 Dưỡng — nuôi dưỡng tích lũy, dưỡng sức chờ cơ hội.'
    };
    if (tsName && tsLuan[tsName]) {
      lines.push(tsLuan[tsName]);
    } else if (tsName) {
      lines.push(tsName + ' — vận bình thường.');
    }

    // ══════════ 3. CHÍNH TINH ══════════
    if (chinhStars.length === 0) {
      lines.push('⬜ Hạn vô chính diệu — mượn sao đối cung và tam hợp.');

      if (doiChinh.length > 0) {
        var doiDesc = [];
        for (var dci = 0; dci < doiChinh.length; dci++) {
          var ds = doiChinh[dci];
          doiDesc.push(ds.name + (ds.mieuHam ? '('+ds.mieuHam+')' : ''));
        }
        lines.push('  Đối cung ' + DIACHI[doiIdx] + ': ' + doiDesc.join(', ') + ' chiếu sang.');

        for (var dci2 = 0; dci2 < doiChinh.length; dci2++) {
          var ds2 = doiChinh[dci2];
          var mh2 = ds2.mieuHam || '';
          if (mh2 === 'Miếu' || mh2 === 'Vượng') {
            lines.push('  → ' + ds2.name + ' ' + mh2 + ' chiếu: hạn được trợ lực tốt.');
          } else if (mh2 === 'Hãm') {
            lines.push('  → ' + ds2.name + ' Hãm chiếu: trợ lực yếu, hạn trắc trở.');
          } else {
            lines.push('  → ' + ds2.name + ' chiếu: hạn tạm được.');
          }
        }
      } else {
        lines.push('  Đối cung cũng vô chính diệu — hạn mờ nhạt, bất định.');
      }

      // Tam hợp chính tinh
      var tamChinhAll = [];
      for (var t0 = 0; t0 < tamStars0.length; t0++) {
        if (tamStars0[t0].type === 'chinh') tamChinhAll.push(tamStars0[t0].name);
      }
      for (var t1 = 0; t1 < tamStars1.length; t1++) {
        if (tamStars1[t1].type === 'chinh') tamChinhAll.push(tamStars1[t1].name);
      }
      if (tamChinhAll.length > 0) {
        lines.push('  Tam hợp có: ' + tamChinhAll.join(', ') + ' trợ lực.');
      }

    } else {
      // Có chính tinh
      for (var csi = 0; csi < chinhStars.length; csi++) {
        var s = chinhStars[csi];
        var mh = s.mieuHam || '';
        if (mh === 'Miếu' || mh === 'Vượng') {
          lines.push('⭐ ' + s.name + ' ' + mh + ': hạn rất tốt, phát huy đầy đủ.');
        } else if (mh === 'Đắc') {
          lines.push('🔵 ' + s.name + ' Đắc: hạn khá tốt, ổn định.');
        } else if (mh === 'Bình') {
          lines.push('⚪ ' + s.name + ' Bình: hạn trung bình, cần phụ tinh.');
        } else if (mh === 'Hãm') {
          lines.push('🔴 ' + s.name + ' Hãm: hạn khó khăn, nhiều trở ngại.');
        } else {
          lines.push('→ ' + s.name + ' tại hạn.');
        }
      }
    }

    // ══════════ 4. TỨ HÓA ══════════
    var hoaLoc = _findHoa(stars, 'Lộc');
    var hoaQuyen = _findHoa(stars, 'Quyền');
    var hoaKhoa = _findHoa(stars, 'Khoa');
    var hoaKy = _findHoa(stars, 'Kị');

    if (hoaLoc) lines.push('💰 Hóa Lộc (' + hoaLoc.name + '): phát tài, nhiều cơ hội.');
    if (hoaQuyen) lines.push('⚡ Hóa Quyền (' + hoaQuyen.name + '): nắm quyền, thăng tiến.');
    if (hoaKhoa) lines.push('📜 Hóa Khoa (' + hoaKhoa.name + '): danh tiếng, thi cử tốt.');
    if (hoaKy) lines.push('⚠️ Hóa Kị (' + hoaKy.name + '): trắc trở, thị phi. Cẩn thận.');

    // Tứ Hóa đối cung chiếu
    var doiLoc = _findHoa(doiStars, 'Lộc');
    var doiKy = _findHoa(doiStars, 'Kị');
    if (doiLoc) lines.push('  (Đối cung Hóa Lộc ' + doiLoc.name + ' chiếu: thêm tài.)');
    if (doiKy) lines.push('  (Đối cung Hóa Kị ' + doiKy.name + ' chiếu: thêm lo.)');

    // ══════════ 5. CÁT TINH ══════════
    var catList = [
      ['Tả Phù','quý nhân bề trên'], ['Hữu Bật','bạn bè phù trợ'],
      ['Văn Xương','học hành khoa bảng'], ['Văn Khúc','nghệ thuật tài hoa'],
      ['Thiên Khôi','quý nhân trên'], ['Thiên Việt','quý nhân dưới'],
      ['Lộc Tồn','tài lộc bền'], ['Thiên Mã','di chuyển phương xa']
    ];
    var catFound = [];
    for (var cli = 0; cli < catList.length; cli++) {
      if (starNames.indexOf(catList[cli][0]) >= 0) {
        catFound.push(catList[cli][0] + ' (' + catList[cli][1] + ')');
      }
    }
    if (catFound.length >= 3) {
      lines.push('🟢 Nhiều cát tinh: ' + catFound.join(', ') + ' — hạn rất tốt.');
    } else if (catFound.length >= 1) {
      lines.push('🔵 Cát tinh: ' + catFound.join(', ') + '.');
    }

    // Cát tinh đặc biệt
    if (starNames.indexOf('Lộc Tồn') >= 0 && starNames.indexOf('Thiên Mã') >= 0)
      lines.push('🐎 Lộc Mã giao trì: phát tài phương xa.');
    if (starNames.indexOf('Tả Phù') >= 0 && starNames.indexOf('Hữu Bật') >= 0)
      lines.push('🤝 Tả Hữu đồng hạn: nhiều người phù trợ.');
    if (starNames.indexOf('Văn Xương') >= 0 && starNames.indexOf('Văn Khúc') >= 0)
      lines.push('📚 Xương Khúc đồng hạn: văn tài phát, đỗ đạt.');
    if (starNames.indexOf('Thiên Khôi') >= 0 && starNames.indexOf('Thiên Việt') >= 0)
      lines.push('👑 Khôi Việt đồng hạn: quý nhân nhiều phía.');

    // ══════════ 6. SÁT TINH ══════════
    var satList = [
      ['Kình Dương','xung đột, thương tích'], ['Đà La','trì trệ, ám hại'],
      ['Hỏa Tinh','đột biến, tai nạn'], ['Linh Tinh','tai họa ngầm']
    ];
    var satFound = [];
    for (var sli = 0; sli < satList.length; sli++) {
      if (starNames.indexOf(satList[sli][0]) >= 0) {
        satFound.push(satList[sli][0] + ' (' + satList[sli][1] + ')');
      }
    }
    if (satFound.length >= 3) {
      lines.push('🔴 Tam sát hội: ' + satFound.join('; ') + ' — cực hung.');
    } else if (satFound.length === 2) {
      lines.push('🔴 Nhị sát hội: ' + satFound.join('; ') + ' — hung.');
    } else if (satFound.length === 1) {
      lines.push('🟡 ' + satFound[0] + '.');
    }

    // ══════════ 7. KHÔNG KIẾP ══════════
    var hK = starNames.indexOf('Địa Không') >= 0;
    var hKi = starNames.indexOf('Địa Kiếp') >= 0;
    if (hK && hKi) lines.push('🔴 Không Kiếp đồng hạn: hao tán lớn, dễ trắng tay.');
    else if (hK) lines.push('🟡 Địa Không: hư hao, kế hoạch dễ thất bại.');
    else if (hKi) lines.push('🟡 Địa Kiếp: kiếp đoạt, mất mát tài sản.');

    // ══════════ 8. TẠP TINH ══════════
    if (starNames.indexOf('Hồng Loan') >= 0 || starNames.indexOf('Thiên Hỷ') >= 0)
      lines.push('💕 Hồng Loan/Thiên Hỷ: hỷ sự — cưới hỏi, sinh con.');
    if (starNames.indexOf('Đào Hoa') >= 0)
      lines.push('🌸 Đào Hoa: tình duyên phong phú. Cẩn thận lụy tình.');
    if (starNames.indexOf('Thiên Hình') >= 0)
      lines.push('⚖ Thiên Hình: kiện tụng, phẫu thuật, pháp luật.');
    if (starNames.indexOf('Tang Môn') >= 0)
      lines.push('😢 Tang Môn: đề phòng tang tóc, chia ly.');
    if (starNames.indexOf('Bạch Hổ') >= 0)
      lines.push('🐯 Bạch Hổ: tai nạn, thương tích, huyết quang.');
    if (starNames.indexOf('Thiên Khốc') >= 0 || starNames.indexOf('Thiên Hư') >= 0)
      lines.push('💨 Khốc Hư: sầu khổ, hư hao.');
    if (starNames.indexOf('Cô Thần') >= 0 || starNames.indexOf('Quả Tú') >= 0)
      lines.push('🕯 Cô Quả: cô đơn, lẻ loi.');
    if (starNames.indexOf('Thiên Đức') >= 0 || starNames.indexOf('Nguyệt Đức') >= 0)
      lines.push('✨ Thiên/Nguyệt Đức: phúc đức giải nạn, gặp dữ hóa lành.');
    if (starNames.indexOf('Kiếp Sát') >= 0)
      lines.push('⚡ Kiếp Sát: tai nạn bất ngờ.');

    // ══════════ 9. TUẦN TRIỆT ══════════
    if (cungData.isTuan)
      lines.push('⊘ Hạn bị Tuần: giảm cát lẫn hung.');
    if (cungData.isTriet)
      lines.push('✕ Hạn bị Triệt: đầu hạn trắc trở. Nhiều sát thì Triệt giải bớt.');

    // ══════════ 10. TAM HỢP CHIẾU ══════════
    var tamInfo = [];
    if (_findHoa(tamStars0, 'Lộc') || _findHoa(tamStars1, 'Lộc')) tamInfo.push('Hóa Lộc chiếu: thêm tài');
    if (_findHoa(tamStars0, 'Kị') || _findHoa(tamStars1, 'Kị')) tamInfo.push('Hóa Kị chiếu: thêm lo');

    var tamSatCount = 0;
    var tamCatCount = 0;
    var satCheck = ['Kình Dương','Đà La','Hỏa Tinh','Linh Tinh'];
    var catCheck = ['Tả Phù','Hữu Bật','Văn Xương','Văn Khúc','Lộc Tồn'];
    var allTamStars = tamStars0.concat(tamStars1);
    for (var ats = 0; ats < allTamStars.length; ats++) {
      if (satCheck.indexOf(allTamStars[ats].name) >= 0) tamSatCount++;
      if (catCheck.indexOf(allTamStars[ats].name) >= 0) tamCatCount++;
    }
    if (tamSatCount >= 2) tamInfo.push('Sát tam hợp xung: thêm hung');
    if (tamCatCount >= 2) tamInfo.push('Cát tam hợp trợ: thêm phúc');

    if (tamInfo.length > 0) {
      lines.push('🔄 Tam hợp: ' + tamInfo.join('. ') + '.');
    }

    // ══════════ 11. TỔNG ĐÁNH GIÁ ══════════
    var diemCat = 0;
    var diemHung = 0;

    // Tràng Sinh
    if (['Tràng Sinh','Lâm Quan','Đế Vượng'].indexOf(tsName) >= 0) diemCat += 2;
    else if (['Tử','Tuyệt'].indexOf(tsName) >= 0) diemHung += 2;
    else if (['Suy','Bệnh','Mộ'].indexOf(tsName) >= 0) diemHung += 1;
    else if (['Thai','Dưỡng','Quan Đới'].indexOf(tsName) >= 0) diemCat += 1;

    // Chính tinh
    for (var pi = 0; pi < chinhStars.length; pi++) {
      var pmh = chinhStars[pi].mieuHam || '';
      if (pmh === 'Miếu' || pmh === 'Vượng') diemCat += 3;
      else if (pmh === 'Đắc') diemCat += 2;
      else if (pmh === 'Bình') diemCat += 1;
      else if (pmh === 'Hãm') diemHung += 3;
    }
    if (chinhStars.length === 0) {
      for (var dpi = 0; dpi < doiChinh.length; dpi++) {
        var dmh = doiChinh[dpi].mieuHam || '';
        if (dmh === 'Miếu' || dmh === 'Vượng') diemCat += 1;
        else if (dmh === 'Hãm') diemHung += 1;
      }
    }

    // Tứ Hóa
    if (hoaLoc) diemCat += 3;
    if (hoaQuyen) diemCat += 2;
    if (hoaKhoa) diemCat += 2;
    if (hoaKy) diemHung += 3;

    // Cát sát
    diemCat += catFound.length;
    diemHung += satFound.length * 2;
    if (hK) diemHung += 2;
    if (hKi) diemHung += 2;

    // Tạp tinh
    if (starNames.indexOf('Tang Môn') >= 0) diemHung += 1;
    if (starNames.indexOf('Bạch Hổ') >= 0) diemHung += 1;
    if (starNames.indexOf('Thiên Hình') >= 0) diemHung += 1;
    if (starNames.indexOf('Thiên Đức') >= 0 || starNames.indexOf('Nguyệt Đức') >= 0) diemCat += 1;
    if (starNames.indexOf('Hồng Loan') >= 0 || starNames.indexOf('Thiên Hỷ') >= 0) diemCat += 1;

    // Tuần Triệt giảm
    if (cungData.isTuan) { diemCat -= 1; diemHung -= 1; }
    if (cungData.isTriet) { diemCat -= 1; }

    var hieu = diemCat - diemHung;
    var tongKet = '';
        if (hieu >= 6) tongKet = '📊 ĐẠI CÁT — Hạn rất tốt, phát đạt mọi mặt.';
    else if (hieu >= 3) tongKet = '📊 CÁT — Hạn tốt, thuận lợi, có quý nhân.';
    else if (hieu >= 1) tongKet = '📊 TIỂU CÁT — Hạn khá, có thuận có nghịch.';
    else if (hieu >= -2) tongKet = '📊 BÌNH — Hạn bình thường, không nổi bật.';
    else if (hieu >= -5) tongKet = '📊 HUNG — Hạn xấu, nhiều trở ngại.';
    else tongKet = '📊 ĐẠI HUNG — Hạn rất xấu, đề phòng tai họa.';

    lines.push(tongKet);

    // ══════════ PUSH KẾT QUẢ ══════════
    var cleanLines = [];
    for (var fl = 0; fl < lines.length; fl++) {
      if (lines[fl] !== '') cleanLines.push(lines[fl]);
    }

    kets.push({
      tuoi: dh.tuoiDau + '-' + dh.tuoiCuoi,
      cung: cungTen,
      nhanDinh: cleanLines.length > 0 ? cleanLines : ['Hạn bình thường.']
    });
  }

  return kets;
}

// ============================================================
// PHẦN 8: HÀM TỔNG HỢP (ENTRY POINT)
// ============================================================

function luanGiaiTongHop(laSo) {
  const result = {
    tongQuan: [],
    cachCuc: [],
    luanCungs: {},
    tuanTriet: [],
    daiHan: [],
  };

  if (!laSo || !laSo.cungs || !Array.isArray(laSo.cungs)) {
    result.tongQuan.push('Không thể luận giải — dữ liệu lá số không hợp lệ.');
    return result;
  }

  const data = extractData(laSo);

  // 1. Tổng quan Mệnh
  result.tongQuan = luanTongQuan(laSo, data);

  // 2. Cách cục
  result.cachCuc = luanCachCuc(laSo, data);

  // 3. Tuần Triệt
  result.tuanTriet = luanTuanTriet(laSo, data);

  // 4. Luận từng cung (SỬA: truyền c.stars thay vì starNames)
  for (const c of laSo.cungs) {
    if (!c.cungChuc) continue;
    const items = luanMotCung(c.cungChuc, c.stars || [], data.mieuHamMap);
    if (items.length > 0) {
      result.luanCungs[c.cungChuc] = items;
    }
  }

  // 5. Đại hạn
  result.daiHan = luanDaiHan(laSo, data);

  return result;
}

// ============================================================
// EXPORT
// ============================================================
window.LuanGiai = { luanGiaiTongHop, LUAN_CHINH_TINH };