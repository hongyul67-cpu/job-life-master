/* ══════════════════════════════════════════════════════════════
   성공적인 직업생활 마스터 — 그림 모음 (보조06 · 2026-10-01)
   공용 그리기 도우미 links/fig.js 를 쓴다. index.html(배우기) · lesson.js(수업 슬라이드)가 함께 부른다.

   한 칸의 모양
     키: { cap:'캡션 한 줄', cards:['카드 제목 앞부분'…], draw:function(){ … } }
       cards — data.js 배우기 카드의 h(제목)가 이 글자로 **시작하면** 그 카드에 그림이 붙는다
     순서 = 한 카드에 그림이 둘 이상일 때 나오는 순서.

   내용은 data.js 배우기 카드와 lesson.js 슬라이드 본문(교과 강의안 전사)에 있는 것만 옮겼다.
   옛 슬라이드 그림(lesson.js SLIDEFIG, 어두운 바탕)은 이 파일의 그림으로 다시 그렸다.
   ans:true 글자 = 슬라이드 빈칸 {{ }} 의 답 — 슬라이드에서는 ? 로 가린다(labels:false).
   ══════════════════════════════════════════════════════════════ */
var FIGS = (function () {
  var F = window.FIG;
  if (!F) return {};
  var C = F.C;
  var t = F.t, box = F.box, line = F.line, arrow = F.arrow, circle = F.circle;

  /* ── 작은 도우미 ── */
  /* 사람 한 명 — (x,y) = 발밑 가운데 */
  function person(x, y, s, c, fill) {
    s = s || 1; c = c || C.ink;
    return '<circle cx="' + x + '" cy="' + (y - 34 * s) + '" r="' + (7 * s) + '" fill="' + (fill || '#fff') + '" stroke="' + c + '" stroke-width="' + (1.8) + '"/>' +
      F.path('M' + (x - 11 * s) + ',' + y + ' L' + (x - 11 * s) + ',' + (y - 15 * s) + ' Q' + (x - 11 * s) + ',' + (y - 25 * s) + ' ' + x + ',' + (y - 25 * s) +
        ' Q' + (x + 11 * s) + ',' + (y - 25 * s) + ' ' + (x + 11 * s) + ',' + (y - 15 * s) + ' L' + (x + 11 * s) + ',' + y + ' Z',
        { fill: fill || '#fff', c: c, w: 1.8 });
  }
  /* 건물 — (x,y) 왼쪽 위 */
  function building(x, y, w, h, c, fill) {
    var s = box(x, y, w, h, { fill: fill || C.grayL, c: c || C.ink, r: 3, w: 1.6 });
    for (var yy = y + 10; yy < y + h - 22; yy += 18)
      for (var xx = x + 8; xx < x + w - 12; xx += 16)
        s += box(xx, yy, 8, 9, { fill: '#fff', c: c || C.ink, r: 1, w: 1 });
    s += box(x + w / 2 - 7, y + h - 18, 14, 18, { fill: '#fff', c: c || C.ink, r: 1, w: 1.2 });
    return s;
  }
  function check(x, y, c) { return F.poly([[x - 7, y], [x - 2, y + 6], [x + 8, y - 7]], { c: c || C.green, w: 3 }); }
  function cross(x, y, c, r) {
    r = r || 7;
    return line(x - r, y - r, x + r, y + r, { c: c || C.red, w: 3 }) + line(x + r, y - r, x - r, y + r, { c: c || C.red, w: 3 });
  }
  function coin(x, y, r) {
    return circle(x, y, r || 11, { fill: '#fde68a', c: '#b45309', w: 1.6 }) + t(x, y + 1, '₩', { a: 'm', size: 12, b: 1, c: '#b45309', halo: false });
  }
  function arcPts(cx, cy, r, a0, a1, k) {
    var p = [];
    for (var i = 0; i <= k; i++) { var a = (a0 + (a1 - a0) * i / k) * Math.PI / 180; p.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
    return p;
  }
  /* 두 줄 칸: 굵은 제목 + 보조 글자 */
  function card2(x, y, w, h, head, sub, o) {
    o = o || {};
    return box(x, y, w, h, { fill: o.fill || C.grayL, c: o.c || C.grayM, r: 10, w: o.w || 1.6 }) +
      t(x + w / 2, y + h / 2 - (sub ? 10 : 0), head, { a: 'm', b: 1, size: o.size || 16, c: o.hc || C.ink, ans: o.ans }) +
      (sub ? t(x + w / 2, y + h / 2 + 13, sub, { a: 'm', size: 13, c: C.sub, ans: o.subAns }) : '');
  }

  return {

  /* ─────────── Ⅰ 일과 직업생활 ─────────── */
  three: { cards: ['바람직한 직업의 3요소'],
    cap: '바람직한 직업의 3요소 — 경제성 · 윤리성 · 자아실현',
    draw: function () {
      var s = F.poly([[240, 70], [95, 228], [385, 228]], { close: 1, fill: '#f8fafc', c: C.grayM, w: 2 });
      s += t(240, 168, '바람직한', { a: 'm', b: 1, size: 17 }) + t(240, 192, '직업', { a: 'm', b: 1, size: 17 });
      s += circle(240, 64, 46, { fill: C.orangeL, c: C.orange, w: 2 }) +
        t(240, 56, '자아실현', { a: 'm', b: 1, c: C.orange, ans: 1 }) + t(240, 80, '성취감 · 보람', { a: 'm', size: 13, c: C.sub });
      s += circle(95, 228, 46, { fill: C.blueL, c: C.blue, w: 2 }) +
        t(95, 220, '경제성', { a: 'm', b: 1, c: C.blue, ans: 1 }) + t(95, 244, '생계유지', { a: 'm', size: 13, c: C.sub });
      s += circle(385, 228, 46, { fill: C.greenL, c: C.green, w: 2 }) +
        t(385, 220, '윤리성', { a: 'm', b: 1, c: C.green, ans: 1 }) + t(385, 244, '사회 기여', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 290, s);
    } },

  future: { cards: ['미래 직업 생활의 변화'],
    cap: '미래 직업 생활 — 평생직장에서 평생직업으로',
    draw: function () {
      var s = t(120, 32, '평생직장', { a: 'm', b: 1, size: 17, c: C.sub }) +
        t(360, 32, '평생직업', { a: 'm', b: 1, size: 17, c: C.blue, ans: 1 });
      s += line(240, 20, 240, 206, { c: C.grayM, w: 1.4, dash: '6 5' });
      /* 한 회사에 쭉 */
      s += building(70, 62, 100, 112, C.sub) + person(145, 174, 0.9, C.sub);
      s += t(120, 196, '한 회사에 쭉', { a: 'm', size: 15 });
      /* 내 능력으로 옮겨 다님 */
      s += building(266, 104, 44, 70, C.blue, C.blueL) + building(338, 104, 44, 70, C.blue, C.blueL) + building(410, 104, 44, 70, C.blue, C.blueL);
      s += person(360, 96, 0.8, C.blue, C.blueL);
      s += F.route(arcPts(324, 82, 30, 200, 330, 8), { c: C.blue, w: 1.6, head: 9 });
      s += F.route(arcPts(396, 82, 30, 210, 340, 8), { c: C.blue, w: 1.6, head: 9 });
      s += t(360, 196, '내 능력으로 옮겨 다님', { a: 'm', size: 15 });
      s += arrow(212, 120, 262, 120, { c: C.orange, w: 2.4 });
      /* 새 일하는 모습 */
      s += card2(16, 222, 130, 40, '잡 노마드', '', { size: 15 }) +
        card2(158, 222, 150, 40, '스마트워크', '', { size: 15, ans: 1, fill: C.blueL, c: C.blue }) +
        card2(320, 222, 144, 40, '복합 지식 전문가', '', { size: 15 });
      return F.svg(480, 276, s);
    } },

  social: { cards: ['직업이 ‘나(개인)’에게 주는 것'],
    cap: '직업이 주는 것 — 나에게 · 사회에 · 나라에',
    draw: function () {
      var s = box(160, 16, 160, 44, { fill: C.blueL, c: C.blue, label: '내가 하는 일', size: 17 });
      s += line(240, 60, 240, 80, { w: 1.6, c: C.grayM }) + line(90, 80, 390, 80, { w: 1.6, c: C.grayM });
      [90, 240, 390].forEach(function (x) { s += arrow(x, 80, x, 104, { c: C.grayM, w: 1.6, head: 9 }); });
      function col(x, head, a, b, c3, ansB, ansC) {
        return box(x - 70, 108, 140, 126, { fill: '#fff', c: C.grayM, r: 10 }) +
          t(x, 132, head, { a: 'm', b: 1, size: 17, c: C.blue }) +
          t(x, 164, a, { a: 'm', size: 15 }) + t(x, 190, b, { a: 'm', size: 15, b: 1, ans: ansB }) +
          t(x, 216, c3, { a: 'm', size: 13, c: C.sub, ans: ansC });
      }
      s += col(90, '나에게', '생계(수입)', '보람', '관계 · 자아실현', 1);
      s += col(240, '사회에', '재화 · 서비스', '분업', '일을 나눠 맡음', 1);
      s += col(390, '나라에', '일자리', '세금', '경제 성장', 1);
      return F.svg(480, 250, s);
    } },

  life: { cards: ['생애 발달 5단계'],
    cap: '생애 발달 5단계 — 성장기 → 탐색기 → 확립기 → 유지기 → 쇠퇴기 (막대 높이는 개념)',
    draw: function () {
      var st = [['성장기', '1~14세', 40], ['탐색기', '15~24세', 72], ['확립기', '25~44세', 112], ['유지기', '45~65세', 124], ['쇠퇴기', '65세~', 74]];
      var s = line(20, 200, 460, 200, { c: C.grayM, w: 1.6 });
      st.forEach(function (d, i) {
        var cx = 64 + i * 88, now = i === 1;
        s += box(cx - 34, 200 - d[2], 68, d[2], { fill: now ? C.orangeL : C.blueL, c: now ? C.orange : C.blue, r: 6, w: 1.6 });
        s += F.num(cx, 200 - d[2] + 18, String(i + 1), { c: now ? C.orange : C.blue });
        s += t(cx, 222, d[0], { a: 'm', b: 1, c: now ? C.orange : C.ink, ans: now });
        s += t(cx, 246, d[1], { a: 'm', size: 13, c: C.sub });
      });
      s += t(152, 70, '지금 여러분', { a: 'm', b: 1, c: C.orange });
      s += arrow(152, 84, 152, 118, { c: C.orange, w: 2 });
      s += F.route(arcPts(240, 260, 210, 222, 318, 16), { c: C.grayM, w: 1.4, dash: '5 5', head: 9 });
      return F.svg(480, 266, s);
    } },

  /* ─────────── Ⅱ 기업과 산업 활동 ─────────── */
  firm: { cards: ['기업의 종류'],
    cap: '기업의 종류 — 규모로 · 주인이 누구냐로',
    draw: function () {
      var s = box(170, 16, 140, 44, { fill: C.blueL, c: C.blue, label: '기업', size: 18 });
      s += t(236, 80, '목적 —', { a: 'e', size: 15, c: C.sub }) + t(244, 80, '이윤', { a: 's', size: 15, b: 1, c: C.blue, ans: 1 }) +
        t(282, 80, '(영리)', { a: 's', size: 15, c: C.sub });
      s += F.route([[240, 60], [240, 66], [122, 66], [122, 102]], { c: C.grayM, w: 1.4, head: 9 });
      s += F.route([[240, 60], [240, 66], [358, 66], [358, 102]], { c: C.grayM, w: 1.4, head: 9 });
      s += box(16, 106, 212, 130, { fill: '#fff', c: C.grayM, r: 12 }) + t(122, 128, '규모로 나누면', { a: 'm', b: 1, c: C.sub, size: 15 });
      s += card2(28, 150, 86, 64, '중소기업', '', { size: 15, ans: 1, fill: C.greenL, c: C.green }) +
        card2(130, 150, 86, 64, '대기업', '', { size: 15 });
      s += box(252, 106, 212, 130, { fill: '#fff', c: C.grayM, r: 12 }) + t(358, 128, '주인이 누구냐로', { a: 'm', b: 1, c: C.sub, size: 15 });
      s += card2(264, 150, 86, 64, '사기업', '민간', { size: 15 }) +
        card2(366, 150, 86, 64, '공기업', '국가 · 공공', { size: 15, ans: 1, fill: C.orangeL, c: C.orange });
      return F.svg(480, 252, s);
    } },

  coop: { cards: ['기업의 종류'],
    cap: '여럿이 차리는 공동기업 — 책임의 크기에 따라 회사 형태가 갈린다',
    draw: function () {
      var cols = [['합명회사', 'rr', '전원 무한'], ['합자회사', 'rb', '무한 + 유한'], ['유한회사', 'bb', '전원 유한'], ['주식회사', 'bbb', '주식으로 자본']];
      var s = '';
      cols.forEach(function (d, i) {
        var cx = 64 + i * 117;
        s += box(cx - 54, 22, 108, 40, { fill: i === 3 ? C.blueL : C.grayL, c: i === 3 ? C.blue : C.grayM, r: 8 }) +
          t(cx, 42, d[0], { a: 'm', b: 1, size: 16, ans: i === 3 });
        var n = d[1].length;
        for (var k = 0; k < n; k++) {
          var red = d[1][k] === 'r', px = cx + (k - (n - 1) / 2) * (n > 2 ? 26 : 32);
          s += person(px, 118, n > 2 ? 0.8 : 0.95, red ? C.red : C.blue, red ? C.redL : C.blueL);
        }
        s += t(cx, 140, d[2], { a: 'm', size: 13, c: C.sub });
      });
      s += arrow(24, 168, 456, 168, { c: C.green, w: 2 });
      s += t(240, 188, '오른쪽으로 갈수록 돈 모으기 쉽고, 개인 부담은 가벼워진다', { a: 'm', size: 13, c: C.green });
      s += person(38, 238, 0.75, C.red, C.redL) + t(56, 222, '무한책임', { a: 's', b: 1, c: C.red, ans: 1 }) +
        t(136, 222, '회사 빚을 내 재산으로도 갚는다', { a: 's', size: 15 });
      s += person(38, 282, 0.75, C.blue, C.blueL) + t(56, 266, '유한책임', { a: 's', b: 1, c: C.blue, ans: 1 }) +
        t(136, 266, '낸 돈(출자금)만큼만 책임진다', { a: 's', size: 15 });
      return F.svg(480, 296, s);
    } },

  pds: { cards: ['일하는 흐름 = P-D-S'],
    cap: 'P-D-S — 계획 → 실행 → 평가, 그리고 다시 계획',
    draw: function () {
      var cx = 240, cy = 150, R = 100, s = '';
      var nodes = [[-90, '계획', 'Plan', C.blue, 1], [30, '실행', 'Do', C.green, 0], [150, '평가', 'See', C.orange, 1]];
      [[-90, 30], [30, 150], [150, 270]].forEach(function (a) {
        s += F.route(arcPts(cx, cy, R, a[0] + 27, a[1] - 27, 12), { c: C.grayM, w: 2.2, head: 12 });
      });
      nodes.forEach(function (d) {
        var x = cx + R * Math.cos(d[0] * Math.PI / 180), y = cy + R * Math.sin(d[0] * Math.PI / 180);
        s += circle(x, y, 42, { fill: '#fff', c: d[3], w: 2.4 }) +
          t(x, y - 8, d[1], { a: 'm', b: 1, size: 18, c: d[3], ans: d[4] }) + t(x, y + 16, d[2], { a: 'm', size: 13, c: C.sub });
      });
      s += t(cx, cy - 8, '계속', { a: 'm', size: 15, c: C.sub }) + t(cx, cy + 14, '반복', { a: 'm', b: 1, size: 17, ans: 1 });
      s += t(240, 272, '평가에서 찾은 문제 → 다음 계획에 반영', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 290, s);
    } },

  flow: { cards: ['제조업이란', '생산 흐름'],
    cap: '제조업의 생산 흐름 — 투입 → 변환 → 산출',
    draw: function () {
      var s = card2(16, 26, 124, 62, '투입', '', { size: 20, ans: 1, fill: C.blueL, c: C.blue, hc: C.blue }) +
        card2(178, 26, 124, 62, '변환', '', { size: 20, fill: C.orangeL, c: C.orange, hc: C.orange }) +
        card2(340, 26, 124, 62, '산출', '', { size: 20, ans: 1, fill: C.greenL, c: C.green, hc: C.green });
      s += arrow(142, 57, 176, 57, { w: 2.4 }) + arrow(304, 57, 338, 57, { w: 2.4 });
      s += t(78, 108, '재료 · 노동력 · 자본', { a: 'm', size: 13, c: C.sub }) +
        t(240, 108, '가공 · 조립', { a: 'm', size: 13, c: C.sub }) + t(402, 108, '완성된 제품', { a: 'm', size: 13, c: C.sub });
      /* 투입: 철판 · 사람 · 돈 */
      s += box(30, 150, 44, 10, { fill: C.grayM, r: 2, w: 1.2 }) + box(30, 162, 44, 10, { fill: C.grayM, r: 2, w: 1.2 }) +
        box(30, 174, 44, 10, { fill: C.grayM, r: 2, w: 1.2 }) + person(100, 186, 0.9) + coin(128, 172);
      /* 변환: 톱니 */
      var g = '';
      for (var k = 0; k < 8; k++) g += box(-5, -34, 10, 14, { fill: C.orange, c: C.orange, r: 2, w: 1 }).replace('<rect', '<rect transform="rotate(' + k * 45 + ')"');
      s += F.g(g + circle(0, 0, 24, { fill: C.orangeL, c: C.orange, w: 2 }) + circle(0, 0, 8, { fill: '#fff', c: C.orange, w: 2 }), { x: 240, y: 168 });
      /* 산출: 자동차 */
      s += F.path('M362,182 L362,166 L378,166 L390,150 L424,150 L436,166 L446,168 L446,182 Z', { fill: C.greenL, c: C.green, w: 2 }) +
        circle(378, 184, 8, { fill: '#fff', c: C.ink, w: 2 }) + circle(430, 184, 8, { fill: '#fff', c: C.ink, w: 2 });
      s += t(240, 230, '예) 철판 · 부품 → 가공 · 조립 → 자동차', { a: 'm', size: 15 });
      return F.svg(480, 252, s);
    } },

  vs: { cards: ['제조업의 특징'],
    cap: '제조업과 서비스업 — 서비스 4대 특징은 제조업의 반대',
    draw: function () {
      var rows = [['만질 수 있다 (유형)', '만질 수 없다', '무형성'], ['창고에 쌓아 둔다 (재고)', '저장이 안 된다', '소멸성'],
        ['만들고 → 나중에 판다', '만들면서 동시에 쓴다', '비분리성'], ['품질을 재기 쉽다', '사람(직원)마다 다르다', '이질성']];
      var s = box(16, 16, 212, 40, { fill: C.blueL, c: C.blue, label: '제조업', size: 17 }) +
        box(252, 16, 212, 40, { fill: C.orangeL, c: C.orange, label: '서비스업', size: 17 });
      rows.forEach(function (r, i) {
        var y = 94 + i * 52;
        s += line(16, y - 26, 464, y - 26, { c: C.edge, w: 1 });
        s += t(122, y, r[0], { a: 'm', size: 15 });
        s += t(358, y - 10, r[1], { a: 'm', size: 15 }) + t(358, y + 12, r[2], { a: 'm', size: 15, b: 1, c: C.orange, ans: 1 });
        s += t(240, y, '↔', { a: 'm', c: C.sub });
      });
      return F.svg(480, 290, s);
    } },

  svc4: { cards: ['서비스의 4대 특징'],
    cap: '서비스의 4대 특징 — 무형성 · 이질성 · 비분리성 · 소멸성 (무-이-비-소)',
    draw: function () {
      var s = '';
      function panel(x, y, name, sub) {
        return box(x, y, 222, 134, { fill: '#fff', c: C.grayM, r: 12 }) +
          t(x + 14, y + 22, name, { a: 's', b: 1, size: 17, c: C.orange }) + t(x + 14, y + 116, sub, { a: 's', size: 13, c: C.sub });
      }
      /* 무형성 — 손에 잡히는 물건이 없다 */
      s += panel(12, 14, '무형성', '보거나 만질 수 없다');
      s += box(80, 52, 60, 46, { fill: 'none', c: C.sub, r: 6, dash: '5 4', w: 1.6 }) + t(110, 76, '?', { a: 'm', size: 22, b: 1, c: C.sub });
      s += F.path('M150,96 Q162,78 176,84 L190,84', { c: C.ink, w: 2 }) + t(196, 86, '손', { a: 's', size: 13, c: C.sub });
      /* 이질성 — 직원마다 다르다 */
      s += panel(246, 14, '이질성', '사람(직원)마다 질이 다르다');
      s += person(300, 104, 0.85, C.blue, C.blueL) + person(400, 104, 0.85, C.purple, C.purpleL);
      s += t(300, 52, '★★★', { a: 'm', size: 15, c: C.orange }) + t(400, 52, '★☆☆', { a: 'm', size: 15, c: C.orange });
      /* 비분리성 — 만들면서 동시에 쓴다 */
      s += panel(12, 160, '비분리성', '생산과 소비가 동시에');
      s += person(120, 258, 0.9, C.blue, C.blueL) + person(190, 258, 0.9, C.green, C.greenL);
      s += arrow(136, 240, 172, 240, { c: C.orange, w: 2, head: 9 });
      s += t(120, 210, '미용사', { a: 'm', size: 13, c: C.sub });
      s += t(190, 210, '손님', { a: 'm', size: 13, c: C.sub });
      s += t(60, 236, '같은\n시간', { a: 'm', size: 13, c: C.orange, b: 1 });
      /* 소멸성 — 오늘 빈자리는 내일 못 판다 */
      s += panel(246, 160, '소멸성', '저장 · 재고가 안 된다');
      for (var k = 0; k < 5; k++) {
        var x = 268 + k * 36, empty = k === 1 || k === 3;
        s += box(x, 204, 26, 30, { fill: empty ? '#fff' : C.blueL, c: empty ? C.red : C.blue, r: 5, w: 1.6 });
        if (empty) s += cross(x + 13, 219, C.red, 6);
      }
      s += t(356, 250, '오늘 빈자리 → 내일 못 판다', { a: 'm', size: 13, c: C.red });
      return F.svg(480, 308, s);
    } },

  /* ─────────── Ⅲ 직업 능력 개발과 평생 학습 ─────────── */
  ncs: { cards: ['직업기초능력 · NCS', '직무 수행 능력이란'],
    cap: '직업인의 능력 — 어느 직업이든 공통인 직업기초능력 위에, 직무마다 다른 직무수행능력',
    draw: function () {
      var s = t(240, 26, '직무수행능력 — 직무마다 다르다', { a: 'm', b: 1, size: 16, c: C.blue });
      [['드론 정비', 40], ['용접', 185], ['사무 행정', 330]].forEach(function (d) {
        s += box(d[1], 46, 110, 92, { fill: C.blueL, c: C.blue, r: 6 }) + t(d[1] + 55, 76, d[0], { a: 'm', b: 1, size: 15 }) +
          t(d[1] + 55, 108, '지식 · 기술 · 태도', { a: 'm', size: 13, c: C.sub, ans: 1 });
      });
      s += box(20, 146, 440, 64, { fill: C.greenL, c: C.green, r: 8, w: 2 });
      s += t(240, 168, '직업기초능력 (10가지)', { a: 'm', b: 1, size: 17, c: C.green });
      s += t(232, 192, '어느 직업이든', { a: 'e', size: 15 }) + t(240, 192, '공통', { a: 's', size: 15, b: 1, c: C.green, ans: 1 });
      s += t(206, 236, '국가가 표준으로 정리한 것 =', { a: 'e', size: 13, c: C.sub }) +
        t(214, 236, 'NCS', { a: 's', size: 15, b: 1, c: C.orange, ans: 1 }) + t(258, 236, '(국가직무능력표준)', { a: 's', size: 13, c: C.sub });
      return F.svg(480, 256, s);
    } },

  ncs10: { cards: ['10대 직업기초능력'],
    cap: 'NCS 10대 직업기초능력 — 어느 직업에서나 쓰이는 기본기',
    draw: function () {
      var names = ['의사소통', '수리', '문제해결', '자기개발', '자원관리', '대인관계', '정보', '기술', '조직이해', '직업윤리'];
      var cx = 240, cy = 152, s = circle(cx, cy, 58, { fill: C.greenL, c: C.green, w: 2 }) +
        t(cx, cy - 12, '직업기초', { a: 'm', b: 1, size: 16, c: C.green }) + t(cx, cy + 12, '능력 10', { a: 'm', b: 1, size: 16, c: C.green });
      names.forEach(function (n, i) {
        var a = (-90 + i * 36) * Math.PI / 180, x = cx + 170 * Math.cos(a), y = cy + 112 * Math.sin(a);
        s += line(cx + 60 * Math.cos(a), cy + 60 * Math.sin(a), x - 30 * Math.cos(a), y - 12 * Math.sin(a), { c: C.grayM, w: 1.2 });
        s += box(x - 50, y - 16, 100, 32, { fill: '#fff', c: i === 4 || i === 9 ? C.orange : C.green, r: 16, w: 1.6 }) +
          t(x, y, n, { a: 'm', b: 1, size: 15, ans: i === 4 });
      });
      return F.svg(480, 300, s);
    } },

  task: { cards: ['일의 크기 순서'],
    cap: '일의 크기 — 직업 > 직무 > 작업',
    draw: function () {
      var s = box(16, 16, 448, 214, { fill: C.blueL, c: C.blue, r: 14, w: 2 }) +
        t(36, 40, '직업', { a: 's', b: 1, size: 18, c: C.blue, ans: 1 }) + t(90, 40, '예) 드론 정비사', { a: 's', size: 13, c: C.sub });
      s += box(56, 60, 368, 156, { fill: C.greenL, c: C.green, r: 12, w: 2 }) +
        t(76, 84, '직무', { a: 's', b: 1, size: 18, c: C.green }) + t(130, 84, '예) 부품 점검', { a: 's', size: 13, c: C.sub });
      s += box(96, 104, 288, 96, { fill: C.orangeL, c: C.orange, r: 10, w: 2 }) +
        t(240, 140, '작업', { a: 'm', b: 1, size: 18, c: C.orange, ans: 1 }) + t(240, 170, '예) 나사 조이기', { a: 'm', size: 13, c: C.sub });
      s += t(240, 250, '큰 것 → 작은 것 :  직업 > 직무 > 작업', { a: 'm', size: 15, b: 1 });
      return F.svg(480, 268, s);
    } },

  career: { cards: ['경력 개발', '평생 학습', '선취업 후학습'],
    cap: '선취업 후학습 — 먼저 취업하고, 일하면서 계속 배워 성장한다',
    draw: function () {
      var st = [['특성화고 졸업', ''], ['취업', '선취업'], ['일하면서 학습', '후학습'], ['경력 성장', '']];
      var s = '';
      st.forEach(function (d, i) {
        var x = 20 + i * 110, y = 212 - i * 44;
        s += box(x, y, 110, 250 - y, { fill: i === 3 ? C.blueL : C.grayL, c: C.grayM, r: 4, w: 1.4 });
        s += t(x + 55, y + 20, d[0], { a: 'm', b: 1, size: 15 });
        if (d[1]) s += t(x + 55, y - 16, d[1], { a: 'm', b: 1, size: 16, c: C.orange, ans: 1 });
      });
      s += person(405, 80, 0.9, C.blue, C.blueL);
      s += arrow(36, 150, 346, 30, { c: C.green, w: 2.2, flow: 1 });
      s += t(20, 34, '평생 학습 — 계속 배우는 것', { a: 's', size: 15, b: 1, c: C.green });
      s += t(20, 56, '(요람에서 무덤까지)', { a: 's', size: 13, c: C.sub });
      return F.svg(480, 262, s);
    } },

  /* ─────────── Ⅳ 취업과 창업 ─────────── */
  job3: { cards: ['취업, 무엇부터?'],
    cap: '취업 준비 순서 — 나를 이해 → 기업 분석 → 입사지원서 → 자기소개서 → 면접',
    draw: function () {
      var st = [['나를', '이해', '장단점·적성', 1], ['기업', '분석', '정보 모으기', 1], ['입사', '지원서', '거짓·과장 ✕', 2], ['자기', '소개서', '내 이야기로', 1], ['면접', '', '경험·상황…', 2]];
      var s = t(98, 26, '먼저 준비', { a: 'm', b: 1, size: 15, c: C.green }) + t(338, 26, '취업 절차', { a: 'm', b: 1, size: 15, c: C.blue });
      s += line(14, 38, 182, 38, { c: C.green, w: 2 }) + line(202, 38, 466, 38, { c: C.blue, w: 2 });
      st.forEach(function (d, i) {
        var x = 14 + i * 94, pre = i < 2;
        s += box(x, 52, 78, 70, { fill: pre ? C.greenL : C.blueL, c: pre ? C.green : C.blue, r: 10 });
        s += t(x + 39, d[1] ? 76 : 87, d[0], { a: 'm', b: 1, size: 16, ans: d[3] === 1 && i !== 4 }) +
          (d[1] ? t(x + 39, 98, d[1], { a: 'm', b: 1, size: 16, ans: d[3] === 1 }) : '');
        s += t(x + 39, 140, d[2], { a: 'm', size: 13, c: C.sub, ans: d[3] === 2 });
        if (i < 4) s += arrow(x + 79, 87, x + 93, 87, { w: 1.8, head: 8 });
      });
      return F.svg(480, 160, s);
    } },

  decide: { cards: ['경력을 위한 마음가짐'],
    cap: '합리적 의사결정 5단계 — 기준을 정해 비교하고, 해 본 뒤 점검한다',
    draw: function () {
      var st = [['문제', '확인', '무엇을 정하나'], ['정보', '수집', '자료 · 사람'], ['대안', '만들기', '여러 길'], ['평가·', '선택', '기준으로 비교'], ['실행·', '점검', '되돌아보기']];
      var s = '';
      st.forEach(function (d, i) {
        var x = 14 + i * 94, key = i === 3;
        s += box(x, 30, 78, 76, { fill: key ? C.orangeL : C.blueL, c: key ? C.orange : C.blue, r: 10, w: key ? 2.4 : 1.6 });
        s += F.num(x + 14, 30, String(i + 1), { c: key ? C.orange : C.blue, r: 11, size: 13 });
        s += t(x + 39, 58, d[0], { a: 'm', b: 1, size: 16, ans: 1 }) + t(x + 39, 82, d[1], { a: 'm', b: 1, size: 16, ans: 1 });
        s += t(x + 39, 124, d[2], { a: 'm', size: 13, c: C.sub, ans: 1 });
        if (i < 4) s += arrow(x + 79, 68, x + 93, 68, { w: 1.8, head: 8 });
      });
      s += F.route([[427, 136], [427, 158], [53, 158], [53, 144]], { c: C.sub, w: 1.6, dash: '6 4', head: 9 });
      s += t(240, 176, '아니면 다시 ①로', { a: 'm', size: 13, c: C.sub });
      s += t(343, 196, '④ 가 가장 중요', { a: 'm', size: 13, b: 1, c: C.orange });
      return F.svg(480, 210, s);
    } },

  startup: { cards: ['창업이란'],
    cap: '창업의 3요소 — 창업자 · 아이템 · 자본 (가장 중요한 것은 창업자)',
    draw: function () {
      var s = line(170, 140, 330, 84, { c: C.grayM, w: 1.6 }) + line(170, 140, 330, 206, { c: C.grayM, w: 1.6 }) +
        line(330, 84, 330, 206, { c: C.grayM, w: 1.6, dash: '5 4' });
      s += circle(160, 144, 82, { fill: C.blueL, c: C.blue, w: 2.4 }) + person(160, 132, 1.1, C.blue, '#fff') +
        t(160, 158, '창업자', { a: 'm', b: 1, size: 19, c: C.blue, ans: 1 }) + t(160, 184, '의지 · 가장 중요', { a: 'm', size: 13, c: C.sub });
      s += circle(356, 78, 56, { fill: C.orangeL, c: C.orange, w: 2 }) +
        t(356, 68, '아이템', { a: 'm', b: 1, size: 17, c: C.orange }) + t(356, 92, '차별화 · 내 적성', { a: 'm', size: 13, c: C.sub });
      s += circle(356, 212, 56, { fill: C.greenL, c: C.green, w: 2 }) +
        t(356, 202, '자본', { a: 'm', b: 1, size: 17, c: C.green, ans: 1 }) + t(356, 226, '무리한 대출 ✕', { a: 'm', size: 13, c: C.red, ans: 1 });
      return F.svg(480, 280, s);
    } },

  /* ─────────── Ⅴ 근로관계와 산업 안전 ─────────── */
  labor3: { cards: ['노동 3권'],
    cap: '노동 3권 (헌법 제33조) — 단결권 · 단체교섭권 · 단체행동권',
    draw: function () {
      var s = F.poly([[40, 72], [240, 18], [440, 72]], { close: 1, fill: C.blueL, c: C.blue, w: 2 }) +
        t(240, 56, '노동 3권 · 헌법 제33조', { a: 'm', b: 1, size: 16, c: C.blue });
      [['단결권', '노동조합을', '만들 권리'], ['단체교섭권', '대등하게', '협상할 권리'], ['단체행동권', '단체로 행동', '(예: 파업)']].forEach(function (d, i) {
        var x = 52 + i * 132;
        s += box(x, 80, 112, 132, { fill: '#fff', c: C.blue, r: 4, w: 2 });
        s += t(x + 56, 104, d[0], { a: 'm', b: 1, size: 16, ans: 1 }) + t(x + 56, 150, d[1], { a: 'm', size: 13, c: C.sub }) +
          t(x + 56, 172, d[2], { a: 'm', size: 13, c: C.sub });
      });
      s += box(30, 214, 420, 36, { fill: C.grayL, c: C.grayM, r: 4, label: '일하는 사람(근로자)', size: 15 });
      return F.svg(480, 264, s);
    } },

  parttime: { cards: ['아르바이트, 이건 꼭!'],
    cap: '청소년 아르바이트 — 근로계약서는 반드시, 계약은 본인이 직접, 최저임금 이상',
    draw: function () {
      var s = box(24, 18, 180, 232, { fill: '#fff', c: C.ink, r: 6, w: 1.8 }) +
        t(114, 46, '근로계약서', { a: 'm', b: 1, size: 17, ans: 1 });
      for (var k = 0; k < 5; k++) s += line(44, 80 + k * 24, 184 - (k % 2) * 30, 80 + k * 24, { c: C.grayM, w: 2 });
      s += t(44, 218, '서명', { a: 's', size: 13, c: C.sub }) + F.path('M84,222 q10,-16 20,0 t20,0 t20,0', { c: C.blue, w: 2 });
      s += t(342, 34, '청소년도 반드시 작성', { a: 'm', b: 1, size: 15, c: C.orange });
      s += person(262, 132, 0.95, C.green, C.greenL) + check(262, 150);
      s += t(262, 176, '본인', { a: 'm', b: 1, size: 16, c: C.green, ans: 1 }) + t(262, 196, '이 직접 계약', { a: 'm', size: 13, c: C.sub });
      s += person(412, 132, 0.95, C.sub, C.grayL) + cross(412, 150, C.red, 7);
      s += t(412, 176, '부모가 대신', { a: 'm', b: 1, size: 15, c: C.red }) + t(412, 196, '할 수 없다', { a: 'm', size: 13, c: C.sub });
      s += coin(246, 232, 12) + t(266, 232, '최저임금 이상 — 미성년자도 같다', { a: 's', size: 13, b: 1 });
      return F.svg(480, 266, s);
    } },

  wage: { cards: ['수당 규칙'],
    cap: '알바 수당 규칙 — 야간 22~06시는 50% 더 · 8시간 일하면 1시간 이상 휴게 · 주 15시간 이상 만근이면 주휴 (근무 시간은 예시)',
    draw: function () {
      var x0 = 40, x1 = 440, px = (x1 - x0) / 24, s = t(16, 22, '① 야간수당', { a: 's', b: 1, size: 15, c: C.purple });
      s += box(x0, 38, x1 - x0, 26, { fill: C.grayL, c: C.grayM, r: 3, w: 1.2 });
      s += box(x0, 38, 6 * px, 26, { fill: C.purpleL, c: C.purple, r: 3, w: 1.4 }) + box(x0 + 22 * px, 38, 2 * px, 26, { fill: C.purpleL, c: C.purple, r: 3, w: 1.4 });
      [0, 6, 12, 18, 22, 24].forEach(function (h) { s += t(x0 + h * px, 78, h + '시', { a: 'm', size: 13, c: h === 6 || h === 22 ? C.purple : C.sub, b: h === 6 || h === 22 }); });
      s += t(112, 22, '밤 10시 ~ 아침 6시 → 통상임금의', { a: 's', size: 13 });
      s += t(326, 22, '50% 더', { a: 's', size: 13, b: 1, c: C.purple, ans: 1 });
      /* ② 휴게 */
      s += t(16, 108, '② 휴게시간', { a: 's', b: 1, size: 15, c: C.green });
      for (var k = 0; k < 9; k++) {
        var brk = k === 4;
        s += box(40 + k * 34, 122, 32, 26, { fill: brk ? C.greenL : C.blueL, c: brk ? C.green : C.blue, r: 3, w: 1.2 });
      }
      s += t(40 + 4 * 34 + 16, 135, '쉼', { a: 'm', size: 13, b: 1, c: C.green });
      s += t(356, 128, '8시간 일하면', { a: 's', size: 13 }) + t(356, 146, '1시간 이상 쉰다', { a: 's', size: 13, b: 1, c: C.green });
      /* ③ 주휴 */
      s += t(16, 182, '③ 주휴수당', { a: 's', b: 1, size: 15, c: C.orange, ans: 1 });
      ['월', '화', '수', '목', '금', '토', '일'].forEach(function (d, i) {
        var x = 40 + i * 44, work = i < 5, rest = i === 6;
        s += box(x, 196, 38, 44, { fill: work ? C.blueL : (rest ? C.orangeL : '#fff'), c: work ? C.blue : (rest ? C.orange : C.grayM), r: 5, w: 1.4 });
        s += t(x + 19, 210, d, { a: 'm', size: 13, b: 1 }) + t(x + 19, 229, work ? '3h' : (rest ? '유급' : ''), { a: 'm', size: 13, c: rest ? C.orange : C.sub, b: rest });
      });
      s += t(356, 208, '주', { a: 's', size: 13 }) + t(372, 208, '15', { a: 's', size: 13, b: 1, ans: 1 }) + t(392, 208, '시간 이상', { a: 's', size: 13 });
      s += t(356, 228, '+ 만근 → 유급 휴일', { a: 's', size: 13, b: 1, c: C.orange });
      return F.svg(480, 256, s);
    } },

  koyong: { cards: ['고용 서비스', '고용보험 · 실업급여'],
    cap: '고용 서비스는 사람과 일자리를 잇고, 고용보험은 실직했을 때 다시 일하도록 돕는다',
    draw: function () {
      var s = person(56, 92, 1, C.blue, C.blueL) + t(56, 112, '구직자', { a: 'm', size: 15, b: 1 });
      s += building(392, 34, 64, 60, C.green, C.greenL) + t(424, 112, '기업', { a: 'm', size: 15, b: 1 });
      s += box(156, 44, 168, 56, { fill: C.orangeL, c: C.orange, r: 12 });
      s += t(240, 62, '고용 서비스', { a: 'm', b: 1, size: 16, ans: 1 }) + t(240, 84, '예) 워크넷', { a: 'm', size: 13, c: C.sub, ans: 1 });
      s += arrow(84, 72, 154, 72, { both: 1, w: 2 }) + arrow(326, 72, 388, 72, { both: 1, w: 2 });
      s += line(16, 132, 464, 132, { c: C.edge, w: 1.2 });
      s += t(16, 154, '고용보험', { a: 's', b: 1, size: 16, c: C.blue, ans: 1 }) + t(96, 154, '— 실직에 대비하는 보험', { a: 's', size: 13, c: C.sub });
      var st = [['일할 때', '보험 가입', C.blueL, C.blue], ['실직', '', C.redL, C.red], ['실업급여', '일정 기간 지원', C.greenL, C.green], ['재취업', '알선 · 직업훈련', C.greenL, C.green]];
      st.forEach(function (d, i) {
        var x = 16 + i * 116;
        s += box(x, 172, 100, 60, { fill: d[2], c: d[3], r: 10 }) + t(x + 50, d[1] ? 192 : 202, d[0], { a: 'm', b: 1, size: 15 }) +
          (d[1] ? t(x + 50, 214, d[1], { a: 'm', size: 13, c: C.sub }) : '');
        if (i < 3) s += arrow(x + 101, 202, x + 115, 202, { w: 1.8, head: 8 });
      });
      return F.svg(480, 250, s);
    } },

  unemp: { cards: ['실업급여, 아무나 받나?'],
    cap: '실업급여를 받으려면 — 세 가지를 모두 채워야 한다',
    draw: function () {
      var q = [['고용보험 가입 사업장에서 일했나?', '받을 수 없다'], ['회사 사정으로 그만두었나?', '스스로 그만두면 원칙적으로 ✕'], ['일할 뜻·능력이 있는데 아직 못 구했나?', '받을 수 없다']];
      var s = '';
      q.forEach(function (d, i) {
        var y = 18 + i * 76;
        s += box(12, y, 284, 50, { fill: C.blueL, c: C.blue, r: 10 }) + t(154, y + 25, d[0], { a: 'm', size: 14, b: 1 });
        s += arrow(298, y + 25, 338, y + 25, { c: C.red, w: 1.8, head: 8 }) + t(318, y + 12, '아니오', { a: 'm', size: 13, c: C.red });
        s += box(340, y + 4, 126, 42, { fill: C.redL, c: C.red, r: 8 }) + t(403, y + 25, i === 1 ? '스스로 그만둠' : d[1], { a: 'm', size: 13, b: 1, c: C.red, ans: i === 1 ? 0 : 1 });
        s += arrow(154, y + 50, 154, y + 74, { c: C.green, w: 2, head: 9 }) + t(164, y + 63, '예', { a: 's', size: 13, b: 1, c: C.green });
      });
      s += box(12, 246, 284, 44, { fill: C.greenL, c: C.green, r: 10, w: 2 }) + t(154, 268, '실업급여를 받을 수 있다', { a: 'm', b: 1, size: 16, c: C.green });
      s += t(403, 268, '원칙적으로 받을 수 없다', { a: 'm', size: 13, c: C.red, ans: 1 });
      return F.svg(480, 300, s);
    } },

  acc: { cards: ['대표 사고와 대책'],
    cap: '현장에서 가장 많은 3가지 사고 — 추락 · 협착 · 전도와 막는 법',
    draw: function () {
      var s = '';
      function panel(x, name, fix1, fix2, c) {
        return box(x, 14, 148, 250, { fill: '#fff', c: C.grayM, r: 12 }) +
          t(x + 74, 38, name, { a: 'm', b: 1, size: 17, c: C.red, ans: 1 }) +
          box(x + 8, 188, 132, 66, { fill: C.greenL, c: C.green, r: 8, w: 1.2 }) +
          t(x + 74, 210, fix1, { a: 'm', size: 13, b: 1, ans: c === 1 }) + t(x + 74, 234, fix2, { a: 'm', size: 13, b: 1, ans: c === 2 });
      }
      s += panel(10, '추락', '작업발판 설치', '+ 안전모 착용', 2);
      s += panel(166, '협착(끼임)', '방호덮개', '수리 땐 전원 끄기', 2);
      s += panel(322, '전도(넘어짐)', '물기·기름 제거', '정리정돈', 0);
      /* 추락: 높은 발판 끝에서 떨어지는 사람 */
      s += box(22, 70, 64, 10, { fill: C.grayM, r: 2, w: 1.2 }) + line(30, 80, 30, 176, { w: 1.6, c: C.sub }) + line(78, 80, 78, 176, { w: 1.6, c: C.sub });
      s += F.g(person(0, 0, 0.8, C.red, C.redL), { x: 118, y: 150, r: 35 });
      s += arrow(112, 96, 112, 126, { c: C.red, w: 2, head: 9 }) + line(14, 176, 154, 176, { c: C.ink, w: 1.6 });
      /* 협착: 두 롤러 사이로 들어가는 손 */
      s += circle(222, 118, 26, { fill: C.grayL, c: C.ink, w: 1.8 }) + circle(274, 118, 26, { fill: C.grayL, c: C.ink, w: 1.8 });
      s += F.route(arcPts(222, 118, 16, 200, 330, 6), { c: C.sub, w: 1.4, head: 7 }) + F.route(arcPts(274, 118, 16, -20, -150, 6), { c: C.sub, w: 1.4, head: 7 });
      s += F.path('M248,172 L248,150 Q246,142 252,140', { c: C.red, w: 5 }) + t(262, 166, '손', { a: 's', size: 13, c: C.red, b: 1 });
      /* 전도: 물웅덩이에서 미끄러짐 */
      s += F.path('M346,172 Q372,160 404,168 Q432,176 452,170 L452,176 L346,176 Z', { fill: C.blueL, c: C.blue, w: 1.2 });
      s += F.g(person(0, 0, 0.8, C.red, C.redL), { x: 400, y: 160, r: -60 });
      s += line(334, 176, 462, 176, { c: C.ink, w: 1.6 });
      return F.svg(480, 278, s);
    } },

  signs: { cards: ['안전·보건 표지'],
    cap: '안전·보건 표지 — 색과 모양만 봐도 안다 (금지 · 경고 · 지시 · 안내)',
    draw: function () {
      var s = '', cx = [66, 184, 302, 420], y = 86;
      /* 금지: 흰 바탕 빨강 원 + 빗금 */
      s += circle(cx[0], y, 44, { fill: '#fff', c: C.red, w: 8 }) + person(cx[0], y + 26, 0.85, C.ink, C.ink) +
        line(cx[0] - 30, y - 30, cx[0] + 30, y + 30, { c: C.red, w: 8 });
      /* 경고: 노랑 삼각형 + 번개 */
      s += F.poly([[cx[1], y - 48], [cx[1] - 52, y + 40], [cx[1] + 52, y + 40]], { close: 1, fill: '#facc15', c: C.ink, w: 4 }) +
        F.poly([[cx[1] + 6, y - 22], [cx[1] - 10, y + 6], [cx[1] + 2, y + 6], [cx[1] - 6, y + 30], [cx[1] + 12, y - 2], [cx[1], y - 2]], { close: 1, fill: C.ink, c: C.ink, w: 1 });
      /* 지시: 파랑 원 + 안전모 */
      s += circle(cx[2], y, 46, { fill: C.blue, c: C.blue, w: 2 }) +
        F.path('M' + (cx[2] - 26) + ',' + (y + 10) + ' Q' + (cx[2] - 26) + ',' + (y - 26) + ' ' + cx[2] + ',' + (y - 26) + ' Q' + (cx[2] + 26) + ',' + (y - 26) + ' ' + (cx[2] + 26) + ',' + (y + 10) + ' Z', { fill: '#fff', c: '#fff', w: 2 }) +
        box(cx[2] - 34, y + 8, 68, 9, { fill: '#fff', c: '#fff', r: 3, w: 1 });
      /* 안내: 녹색 사각형 + 문과 화살표 */
      s += box(cx[3] - 46, y - 46, 92, 92, { fill: C.green, c: C.green, r: 6, w: 2 }) +
        box(cx[3] + 2, y - 30, 30, 56, { fill: '#fff', c: '#fff', r: 2, w: 1 }) + person(cx[3] - 14, y + 26, 0.75, '#fff', '#fff') +
        arrow(cx[3] - 32, y - 20, cx[3] - 4, y - 20, { c: '#fff', w: 3, head: 10 });
      [['금지', '빨강 원(빗금)', '출입금지 · 금연'], ['경고', '노랑 삼각형', '고압전기 · 낙하물'], ['지시', '파랑 원', '안전모 · 보안경'], ['안내', '녹색 사각형', '비상구 · 구호소']].forEach(function (d, i) {
        s += t(cx[i], 158, d[0], { a: 'm', b: 1, size: 18, ans: 1 }) + t(cx[i], 184, d[1], { a: 'm', size: 13 }) + t(cx[i], 206, d[2], { a: 'm', size: 13, c: C.sub });
      });
      return F.svg(480, 224, s);
    } },

  nosa: { cards: ['노사 관계란', '노동조합 · 노사정위원회'],
    cap: '노사 관계 — 근로자(노)와 사용자(사)는 대등한 협력 관계, 정부까지 셋이 모이면 노사정위원회',
    draw: function () {
      var s = F.poly([[240, 60], [96, 196], [384, 196]], { close: 1, fill: '#f8fafc', c: C.grayM, w: 1.6, dash: '6 5' });
      s += t(240, 150, '노사정위원회', { a: 'm', b: 1, size: 15, c: C.purple }) + t(240, 172, '셋이 모여 협의', { a: 'm', size: 13, c: C.sub });
      s += circle(240, 52, 38, { fill: C.purpleL, c: C.purple, w: 2 }) + t(240, 44, '정', { a: 'm', b: 1, size: 20, c: C.purple }) +
        t(240, 68, '정부', { a: 'm', size: 13, ans: 1 });
      s += circle(96, 196, 40, { fill: C.blueL, c: C.blue, w: 2 }) + t(96, 188, '노', { a: 'm', b: 1, size: 20, c: C.blue }) +
        t(96, 212, '근로자', { a: 'm', size: 13, ans: 1 });
      s += circle(384, 196, 40, { fill: C.greenL, c: C.green, w: 2 }) + t(384, 188, '사', { a: 'm', b: 1, size: 20, c: C.green }) +
        t(384, 212, '사용자', { a: 'm', size: 13, ans: 1 });
      s += arrow(140, 222, 340, 222, { both: 1, c: C.orange, w: 2.4 }) + t(240, 208, '대등한', { a: 'm', size: 13, c: C.orange }) +
        t(240, 240, '협력', { a: 'm', size: 16, b: 1, c: C.orange, ans: 1 });
      /* 노동조합 */
      s += person(26, 118, 0.6, C.blue, C.blueL) + person(46, 118, 0.6, C.blue, C.blueL) + person(66, 118, 0.6, C.blue, C.blueL);
      s += F.path('M16,124 Q46,134 76,124', { c: C.blue, w: 1.4 }) + t(46, 86, '노동조합', { a: 'm', size: 13, b: 1, c: C.blue });
      return F.svg(480, 256, s);
    } },

  /* ─────────── Ⅵ 직업윤리와 직업 사회 ─────────── */
  ethics: { cards: ['‘나’에 대한 윤리', '‘남·사회’에 대한 윤리'],
    cap: '직업윤리 — 나에 대한 윤리(근로윤리)와 남·사회에 대한 윤리(공동체윤리)',
    draw: function () {
      function col(x, head, sub, items, c, cl) {
        var s = box(x, 16, 212, 196, { fill: cl, c: c, r: 14, w: 2 }) +
          t(x + 106, 42, head, { a: 'm', b: 1, size: 17, c: c }) + t(x + 106, 64, sub, { a: 'm', size: 13, c: C.sub });
        items.forEach(function (it, i) {
          var y = 98 + i * 30;
          s += '<circle cx="' + (x + 30) + '" cy="' + y + '" r="4" fill="' + c + '"/>' +
            t(x + 42, y, it[0], { a: 's', b: 1, size: 16, ans: it[2] }) + t(x + 92, y, it[1], { a: 's', size: 13, c: C.sub });
        });
        return s;
      }
      var s = col(16, '나에 대한 윤리', '근로윤리', [['근면', '부지런히', 1], ['정직', '속이지 않기', 1], ['성실', '끝까지 정성껏', 0]], C.blue, C.blueL);
      s += col(252, '남·사회에 대한 윤리', '공동체윤리', [['봉사', '남을 먼저', 0], ['책임', '끝까지 책임', 1], ['준법', '규칙 지키기', 0], ['예절', '서로 존중', 0]], C.green, C.greenL);
      s += t(236, 236, '그중', { a: 'e', size: 15 }) + t(244, 236, '정직', { a: 's', size: 15, b: 1, c: C.orange, ans: 1 }) +
        t(284, 236, '— 모든 신뢰의 기본', { a: 's', size: 15 });
      return F.svg(480, 254, s);
    } },

  ethics5: { cards: ['‘남·사회’에 대한 윤리'],
    cap: '직업윤리를 이루는 다섯 가지 의식',
    draw: function () {
      var st = [['소명', '주어진', '부름'], ['천직', '타고난', '나의 일'], ['직분', '맡은 역할', '성실히'], ['책임', '끝까지', '책임짐'], ['봉사', '전문성으로', '사회에']];
      var s = t(143, 24, '일을 어떻게 받아들이나', { a: 'm', size: 13, b: 1, c: C.blue }) + t(385, 24, '일을 어떻게 하나', { a: 'm', size: 13, b: 1, c: C.green });
      s += line(14, 36, 272, 36, { c: C.blue, w: 2 }) + line(296, 36, 466, 36, { c: C.green, w: 2 });
      st.forEach(function (d, i) {
        var x = 14 + i * 92 + (i > 2 ? 12 : 0), c = i < 3 ? C.blue : C.green, cl = i < 3 ? C.blueL : C.greenL;
        s += box(x, 48, 80, 124, { fill: cl, c: c, r: 10 });
        s += t(x + 40, 76, d[0], { a: 'm', b: 1, size: 18, c: c, ans: 1 }) + t(x + 40, 100, '의식', { a: 'm', size: 13, c: C.sub });
        s += t(x + 40, 132, d[1], { a: 'm', size: 13 }) + t(x + 40, 152, d[2], { a: 'm', size: 13 });
      });
      return F.svg(480, 190, s);
    } },

  pay: { cards: ['내 월급', '월급에서 빠지는 것'],
    cap: '월급 — 세전에서 4대 보험과 세금을 빼면 세후(실수령액) (막대 길이는 개념)',
    draw: function () {
      var s = t(16, 26, '계약한 연봉 ÷', { a: 's', size: 15 }) + t(120, 26, '12', { a: 's', size: 15, b: 1, ans: 1 }) + t(144, 26, '개월 = 매달 받는 돈', { a: 's', size: 15 });
      s += t(16, 60, '세전', { a: 's', b: 1, size: 16, ans: 1 }) + box(70, 46, 390, 28, { fill: C.grayL, c: C.ink, r: 4, w: 1.4 });
      s += t(16, 104, '세후', { a: 's', b: 1, size: 16, c: C.blue, ans: 1 }) + box(70, 90, 320, 28, { fill: C.blueL, c: C.blue, r: 4, w: 1.4 }) +
        box(390, 90, 70, 28, { fill: C.redL, c: C.red, r: 4, w: 1.4, dash: '4 3' });
      s += t(230, 104, '통장에 들어오는 돈', { a: 'm', size: 13, b: 1, c: C.blue });
      s += t(425, 136, '빠지는 것', { a: 'm', size: 13, b: 1, c: C.red });
      s += t(425, 154, '4대 보험 + 세금', { a: 'm', size: 13, c: C.red });
      var ins = [['국민연금', '노후', 0], ['건강보험', '질병 · 의료', 0], ['고용보험', '실직', 1], ['산재보험', '업무상 재해', 1]];
      ins.forEach(function (d, i) {
        var x = 16 + i * 114;
        s += box(x, 176, 104, 60, { fill: '#fff', c: d[2] && i === 3 ? C.orange : C.grayM, r: 10, w: 1.6 }) +
          t(x + 52, 196, d[0], { a: 'm', b: 1, size: 15, ans: d[2] }) + t(x + 52, 220, d[1], { a: 'm', size: 13, c: C.sub });
      });
      s += F.route([[425, 164], [425, 170]], { c: C.red, w: 1.2, head: 6 });
      s += t(464, 256, '※ 산재보험료는 회사가 전액 낸다', { a: 'e', size: 13, b: 1, c: C.orange });
      return F.svg(480, 272, s);
    } },

  jikgeup: { cards: ['직급 · 직장 예절'],
    cap: '직급(예)과 직장 예절 — 회사마다 직급 이름은 조금씩 다르다',
    draw: function () {
      var st = [['사원', 0], ['대리', 1], ['과장', 0], ['부장', 1]];
      var s = t(16, 24, '직급 (예)', { a: 's', b: 1, size: 15, c: C.sub });
      st.forEach(function (d, i) {
        var x = 16 + i * 62, y = 196 - i * 40;
        s += box(x, y, 62, 236 - y, { fill: i === 0 ? C.blueL : C.grayL, c: C.grayM, r: 4, w: 1.4 });
        s += t(x + 31, y + 20, d[0], { a: 'm', b: 1, size: 16, ans: d[1] });
      });
      s += person(47, 190, 0.8, C.blue, C.blueL) + t(47, 144, '나', { a: 'm', size: 13, b: 1, c: C.blue });
      s += line(280, 20, 280, 236, { c: C.grayM, w: 1.2, dash: '6 5' });
      s += t(298, 24, '기본 예절', { a: 's', b: 1, size: 15, c: C.sub });
      /* 시계 */
      s += circle(314, 64, 16, { fill: '#fff', c: C.ink, w: 1.8 }) + line(314, 64, 314, 54, { w: 1.8 }) + line(314, 64, 322, 68, { w: 1.8 });
      s += t(340, 64, '시간 약속', { a: 's', b: 1, size: 15, ans: 1 }) + t(340, 86, '가장 기본', { a: 's', size: 13, c: C.sub });
      /* 인사 */
      s += person(314, 144, 0.7, C.green, C.greenL) + t(340, 128, '인사 · 호칭', { a: 's', b: 1, size: 15 }) + t(340, 150, '바르게', { a: 's', size: 13, c: C.sub });
      /* 보고 */
      s += box(300, 180, 28, 34, { fill: '#fff', c: C.ink, r: 3, w: 1.6 }) + line(306, 190, 322, 190, { w: 1.2, c: C.sub }) + line(306, 198, 322, 198, { w: 1.2, c: C.sub });
      s += t(340, 186, '모르면 묻고, 실수는', { a: 's', size: 13 }) + t(340, 208, '바로 보고', { a: 's', b: 1, size: 15, c: C.orange, ans: 1 });
      return F.svg(480, 246, s);
    } }

  };
})();
