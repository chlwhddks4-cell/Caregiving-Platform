// server/index.js
const express = require("express");
const cors = require("cors");
const db = require("./db");
const path = require('path');
const app = express();

const multer = require('multer');

const fs = require('fs');

app.use(cors());
app.use(express.json());


const jwt = require('jsonwebtoken');


const PORT = 4000;

// index.js 맨 위에 추가
const bcrypt = require('bcrypt');

// ✅ React 서빙 코드만 남기기 배포시는 주석 해제 
// const distPath = path.join(__dirname, '../dist');
// app.use(express.static(distPath));
// app.get('/{*splat}', (req, res) => {
//   res.sendFile(path.join(distPath, 'index.html'));
// });

// // 테스트 API
// app.get("/", (req, res) => {

  
//   res.send("서버 정상 zz작동 🚀");


// });

// 업로드 폴더 생성
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// multer 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // 한글 파일명 깨짐 방지
    const uniqueName = `${Date.now()}-${Buffer.from(file.originalname, 'latin1').toString('utf8')}`;
    cb(null, uniqueName);
  }
});



const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.doc', '.docx', '.hwp', '.xlsx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('허용되지 않는 파일 형식입니다.'));
    }
  }
});

/////////////////////////////////////
// 🔥 파일 업로드
/////////////////////////////////////
app.post('/upload', upload.single('file'), async (req, res) => {
  const { title, category } = req.body;
  console.log('파일 업로드 - title:', title, 'file:', req.file);

  try {
    await db.query(
      `INSERT INTO resources 
        (title, category, filename, originalname, filesize)
       VALUES (?, ?, ?, ?, ?)`,
      [
        title,
        category,
        req.file.filename,       // 저장된 파일명
        req.file.originalname,   // 원본 파일명
        req.file.size,
      ]
    );

    res.json({ success: true, message: "업로드 완료" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/////////////////////////////////////
// 🔥 파일 다운로드
/////////////////////////////////////
app.get('/download/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT * FROM board WHERE id = ?", [id]
    );

    if (rows.length === 0 || !rows[0].filename) {
      return res.status(404).json({ message: "파일 없음" });
    }

    const filePath = path.join(__dirname, '../uploads', rows[0].filename);
    
    // 한글 파일명 깨짐 방지
    const encodedName = encodeURIComponent(rows[0].originalname);
    res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodedName}`);
    res.download(filePath);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



// 게시판 API
/////////////////////////////////////
// 🔥 CREATE (글 작성)
/////////////////////////////////////
app.post("/write", upload.single('file'), async (req, res) => {
  const { title, content ,tab , user_id  } = req.body;

  // 관리자 체크
  const [rows] = await db.query(
    "SELECT role FROM users WHERE user_id = ?", [user_id]
  );

  if (rows[0].role !== 'admin') {
    return res.status(403).json({ message: "권한이 없습니다." });
  }
 
   // 한글 파일명 변환
  const originalname = req.file 
    ? Buffer.from(req.file.originalname, 'latin1').toString('utf8')
    : null;
  const filename = req.file ? req.file.filename : null;

   try {
    await db.query(
      "INSERT INTO board (title, content, tab, writer, filename, originalname) VALUES (?, ?, ?, ?, ?, ?)",
      [title, content, tab || '공지사항', user_id , filename, originalname]
    );
    

    console.log("저장 완료");

    res.json({ success: true });

  } catch (err) {
    console.error(err); // 🔥 꼭 찍어라
    res.status(500).json(err);
  }
});

/////////////////////////////////////
// 🔥 READ (목록 + 페이징)
/////////////////////////////////////
app.get("/selectPaging", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;
   
  const { type, keyword, tab } = req.query;
  
  console.log('page = ' + page, 'limit = ' + limit, 'offset = ' + offset, 'tab = ' + tab);

  try {
    let sql = `
      SELECT id, title, content, writer, views,
        DATE_FORMAT(created_at, '%Y-%m-%d') as created_at
      FROM board
      WHERE tab = ?
    `;

    const params = [tab || '공지사항']; // 🔥 수정 (배열에 바로 넣기)

    // 검색 조건 추가
    if (keyword) {
      if (type === "title") {
        sql += " AND title LIKE ?";
        params.push(`%${keyword}%`);
      } else if (type === "writer") {
        sql += " AND writer LIKE ?";
        params.push(`%${keyword}%`);
      }
    }

    // 정렬 + 페이징
    sql += " ORDER BY id DESC LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const [list] = await db.query(sql, params);

    // 🔥 count 도 tab 조건 추가
    const [[count]] = await db.query(
      "SELECT COUNT(*) as total FROM board WHERE tab = ?",
      [tab || '공지사항']
    );

    res.json({
      data: list,
      total: count.total,
      page,
      totalPages: Math.ceil(count.total / limit),
    });

  } catch (err) {
    console.log("에러:", err);
    res.status(500).json({ error: err.message });
  }
});



/////////////////////////////////////
// 🔥 계시판 READ (상세)
/////////////////////////////////////
app.get("/detail/:id", async (req, res) => {
  try {

      const [result] = await db.query(
    "UPDATE board SET views = views + 1 WHERE id = ?",
        [req.params.id]
      );


     const [rows] = await db.query(
      `SELECT id, title, content, writer, views, filename, originalname,
       date_format(created_at, '%Y-%m-%d') as created_at 
       FROM board WHERE id = ?`,
      [req.params.id]
    );

     console.log("상세 조회 완료:", req.params.id);

    res.json(rows[0]); // 🔥 이게 진짜 데이터
  } catch (err) {
    res.status(500).json(err);
  }
});

/////////////////////////////////////
// 🔥 UPDATE (수정)
/////////////////////////////////////
app.post("/update", upload.single('file'), async (req, res) => {
  const { id, content } = req.body;

  try {
    if (req.file) {
      // 파일 있으면 파일도 업데이트
      const originalname = Buffer.from(req.file.originalname, 'latin1').toString('utf8');
      await db.query(
        "UPDATE board SET content=?, filename=?, originalname=? WHERE id=?",
        [content, req.file.filename, originalname, id]
      );
    } else {
      // 파일 없으면 내용만 업데이트
      await db.query(
        "UPDATE board SET content=? WHERE id=?",
        [content, id]
      );
    }

    res.json({ message: "수정 완료" });
  } catch (err) {
    res.status(500).json(err);
  }
});

/////////////////////////////////////
// 🔥 DELETE (삭제)
/////////////////////////////////////
app.delete("/delete", async (req, res) => {
  const {  id } = req.body;
  const sql = "DELETE FROM board WHERE id=?";

  //  console.log("삭제 시작:", id);

  try {
    const [result] = await db.query(sql, [id]);

    if (result.affectedRows === 0) {
      // console.log("데이터 없음");
      return res.status(404).json({ message: "데이터 없음" });
    }

    //  console.log("삭제 완료:", id);

    res.json({ message: "삭제 완료" });

  } catch (err) {
    console.log("에러:", err);
    res.status(500).json({ error: err.message });
  }
});

/////////////////////////////////////
// 🔥 회원가입 
/////////////////////////////////////
app.post("/register", async (req, res) => {
  // const { title, content } = req.body;
    console.log('이름 = ' + req.body.name);
  try {
   const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // 2. INSERT (컬럼명, 개수 맞춤)
    const [result] = await db.query(
      `INSERT INTO users 
        (USER_ID, name, phone, email, password, role) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        req.body.id,
        req.body.name,
        req.body.phone,
        req.body.email,
        hashedPassword,   // 암호화된 비밀번호
        req.body.role
      ]
    );

    console.log("저장 완료", result);

    res.json({ success: true });

  } catch (err) {
    console.error(err); // 🔥 꼭 찍어라
    res.status(500).json(err);
  }
});

/////////////////////////////////////
// 🔥 회원정보 수정
/////////////////////////////////////
app.put("/update-user", async (req, res) => {
  const { user_id, name, phone, email } = req.body;
  console.log('회원정보 수정 시작 - user_id:', user_id);

  try {
    const [result] = await db.query(
      `UPDATE users SET name=?, phone=?, email=? WHERE user_id=?`,
      [name, phone, email, user_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "유저를 찾을 수 없습니다." });
    }

    console.log('회원정보 수정 완료 - user_id:', user_id);
    res.json({ success: true, message: "회원정보가 수정되었습니다." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/////////////////////////////////////
// 🔥 아이디 중복 체크
/////////////////////////////////////
app.post("/check-id", async (req, res) => {
  const { id } = req.body;

  console.log('아이디 중복 체크 - id:', id);
  try {
    const [rows] = await db.query(
      "SELECT USER_ID FROM users WHERE USER_ID = ?",
      [id]
    );

    if (rows.length > 0) {
      res.json({ available: false, message: "이미 사용 중인 아이디입니다." });
    } else {
      res.json({ available: true, message: "사용 가능한 아이디입니다." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


/////////////////////////////////////
// 🔥 로그인 
/////////////////////////////////////
app.post("/login", async (req, res) => {
  const { id, password } = req.body;
  console.log('로그인 시도 - 아이디:', id);
  try {
    // 1. 아이디로 유저 조회
    const [rows] = await db.query(
      "SELECT * FROM users WHERE user_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "아이디가 존재하지 않습니다." });
    }

    const user = rows[0];

    // 2. 비밀번호 검증
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "비밀번호가 올바르지 않습니다." });
    }

    // 3. 계정 상태 확인
    // if (user.status === 'banned') {
    //   return res.status(403).json({ message: "정지된 계정입니다." });
    // }
    // if (user.status === 'pending') {
    //   return res.status(403).json({ message: "인증 대기 중인 계정입니다." });
    // }

    // 4. JWT 토큰 발급
    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role  },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }  // 7일 유효
    );

    // 5. 마지막 로그인 시간 업데이트
    await db.query(
      "UPDATE users SET last_login_at = NOW() WHERE user_id = ?",
      [id]
    );

    

    res.json({
      success: true,
      token,
      user: {
        id: user.user_id,
        name: user.name,
        role: user.role,
        email: user.email,
        phone: user.phone

         
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류" });
  }
});


/////////////////////////////////////
// 🔥 간병인 프로필 저장/수정
/////////////////////////////////////
app.post("/caregiver-profile", async (req, res) => {
  const { user_id, careerYears, certificates, city, district, intro } = req.body;
  console.log('프로필 저장 시작 - user_id:', user_id);

  try {
    // 기존 프로필 있는지 확인
    const [existing] = await db.query(
      "SELECT user_id FROM caregiver_profile WHERE user_id = ?",
      [user_id]
    );

    if (existing.length > 0) {
      // 🔥 있으면 UPDATE
      await db.query(
        `UPDATE caregiver_profile 
         SET career_years=?, certificates=?, city=?, district=?, intro=?
         WHERE user_id=?`,
        [careerYears, certificates, city, district, intro, user_id]
      );
      console.log('프로필 수정 완료 - user_id:', user_id);
    } else {
      // 🔥 없으면 INSERT
      await db.query(
        `INSERT INTO caregiver_profile 
         (user_id, career_years, certificates, city, district, intro)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [user_id, careerYears, certificates, city, district, intro]
      );
      console.log('프로필 등록 완료 - user_id:', user_id);
    }

    res.json({ success: true, message: "프로필이 저장되었습니다." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/////////////////////////////////////
// 🔥 간병인 프로필 조회
/////////////////////////////////////
app.get("/caregiver-profile/:user_id", async (req, res) => {
  const { user_id } = req.params;
  console.log('프로필 조회 - user_id:', user_id);

  try {
    const [rows] = await db.query(
      "SELECT * FROM caregiver_profile WHERE user_id = ?",
      [user_id]
    );

    if (rows.length === 0) {
      return res.json({ success: false, message: "프로필 없음" });
    }

    res.json({ success: true, data: rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/////////////////////////////////////
// 🔥 간병 요청 등록
/////////////////////////////////////
app.post("/care-request", async (req, res) => {
  const {
    user_id, title, city, district,
    start_date, end_date, care_time,
    daily_wage, wage_type, patient_age,
    patient_gender, mobility, diseases, description
  } = req.body;

  console.log('간병 요청 등록 시작 - user_id:', user_id);

  try {
    const [result] = await db.query(
      `INSERT INTO care_request 
        (user_id, title, city, district, start_date, end_date, 
         care_time, daily_wage, wage_type, patient_age, 
         patient_gender, mobility, diseases, description)ㅉ
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id, title, city, district,
        start_date, end_date, care_time,
        daily_wage, wage_type, patient_age || null,
        patient_gender || null, mobility || null,
        diseases ? diseases.join(',') : null,
        description || null
      ]
    );

    console.log('간병 요청 등록 완료 - id:', result.insertId);
    res.json({ success: true, id: result.insertId });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/////////////////////////////////////
// 🔥 간병 요청 목록 조회
/////////////////////////////////////
app.get("/care-request-list", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 6;
  const offset = (page - 1) * limit;
  const { city, startDate, endDate } = req.query;

  console.log('간병 요청 목록 조회 - page:', page, 'city:', city  , 'startDate:', startDate, 'endDate:', endDate);

  try {
    let sql = `
      SELECT id, user_id, title, city, district,
        DATE_FORMAT(start_date, '%Y-%m-%d') as startDate,
        DATE_FORMAT(end_date, '%Y-%m-%d') as endDate,
        daily_wage as dailyWage,
        care_time, diseases, mobility, status,
        DATE_FORMAT(created_at, '%Y-%m-%d') as createdAt
      FROM care_request
      WHERE 1=1
    `;

    const params = [];

    if (city && city !== '전체') {
      sql += " AND city = ?";
      params.push(city);
    }
    if (startDate) {
      sql += " AND start_date >= ?";
      params.push(startDate);
    }
    if (endDate) {
      sql += " AND end_date <= ?";
      params.push(endDate);
    }

    sql += " ORDER BY id DESC LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const [list] = await db.query(sql, params);

    // diseases 콤마 → 배열 변환
    const data = list.map((item) => ({
      ...item,
      diseases: item.diseases ? item.diseases.split(',') : [],
    }));

    // 전체 건수
    let countSql = "SELECT COUNT(*) as total FROM care_request WHERE 1=1";
    const countParams = [];

    if (city && city !== '전체') {
      countSql += " AND city = ?";
      countParams.push(city);
    }
    if (startDate) {
      countSql += " AND start_date >= ?";
      countParams.push(startDate);
    }
    if (endDate) {
      countSql += " AND end_date <= ?";
      countParams.push(endDate);
    }

    const [[count]] = await db.query(countSql, countParams);

    res.json({
      data,
      total: count.total,
      page,
      totalPages: Math.ceil(count.total / limit),
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/////////////////////////////////////
// 🔥 간병 요청 상세 조회
/////////////////////////////////////
app.get("/care-request_detail/:id", async (req, res) => {
  const { id } = req.params;
  console.log('간병 요청 상세 조회 - id:', id);

  try {
    const [rows] = await db.query(
      `SELECT id, user_id, title, city, district,
        DATE_FORMAT(start_date, '%Y-%m-%d') as startDate,
        DATE_FORMAT(end_date, '%Y-%m-%d') as endDate,
        daily_wage as dailyWage,
        care_time as careTime,
        wage_type as wageType,
        patient_age as patientAge,
        patient_gender as patientGender,
        mobility, diseases, description, status,
        DATE_FORMAT(created_at, '%Y-%m-%d') as createdAt
      FROM care_request
      WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "요청을 찾을 수 없습니다." });
    }

    const item = {
      ...rows[0],
      diseases: rows[0].diseases ? rows[0].diseases.split(',') : [],
    };

    // 신청자 수 조회
    const [[applyCount]] = await db.query(
      "SELECT COUNT(*) as count FROM care_apply WHERE request_id = ?",
      [id]
    );

    item.applicants = applyCount.count;

    res.json({ success: true, data: item });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/////////////////////////////////////
// 🔥 간병 신청하기
/////////////////////////////////////
app.post("/care-apply/:id", async (req, res) => {
  const { request_id, caregiver_id } = req.body;
  console.log('간병 신청 - request_id:', request_id, 'caregiver_id:', caregiver_id);

  try {
    // 1. 중복 신청 체크
    const [existing] = await db.query(
      "SELECT id FROM care_apply WHERE request_id = ? AND caregiver_id = ?",
      [request_id, caregiver_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "이미 신청한 요청입니다." });
    }

    // 2. 본인 요청인지 체크
    const [request] = await db.query(
      "SELECT user_id FROM care_request WHERE id = ?",
      [request_id]
    );

    if (request[0].user_id === caregiver_id) {
      return res.status(400).json({ message: "본인이 등록한 요청에는 신청할 수 없습니다." });
    }

    // 3. 신청 저장
    const [result] = await db.query(
      "INSERT INTO care_apply (request_id, caregiver_id) VALUES (?, ?)",
      [request_id, caregiver_id]
    );

    console.log('간병 신청 완료 - id:', result.insertId);
    res.json({ success: true, message: "신청이 완료되었습니다." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/////////////////////////////////////
// 🔥 수락하기
/////////////////////////////////////
app.put("/care-apply/:id/accept", async (req, res) => {
  const { id } = req.params;
  const { request_id } = req.body;

  console.log('수락하기 - apply_id:', id, 'request_id:', request_id);

  try {
    await db.query("UPDATE care_apply SET status = '수락' WHERE id = ?", [id]);
    await db.query("UPDATE care_apply SET status = '거절' WHERE request_id = ? AND id != ?", [request_id, id]);
    await db.query("UPDATE care_request SET status = '매칭 완료' WHERE id = ?", [request_id]);

    res.json({ success: true, message: "수락되었습니다." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



/////////////////////////////////////
// 🔥 신청자 목록 조회 (보호자용)
/////////////////////////////////////
app.get("/care-apply/:request_id", async (req, res) => {
  const { request_id } = req.params;
  console.log('신청자 목록 조회 - request_id:', request_id);

  try {
    const [rows] = await db.query(
      `SELECT 
        ca.id, ca.status, ca.created_at,
        u.user_id, u.name, u.phone, u.email,
        cp.career_years, cp.certificates, cp.city, cp.district, cp.intro
      FROM care_apply ca
      JOIN users u ON ca.caregiver_id = u.user_id
      LEFT JOIN caregiver_profile cp ON ca.caregiver_id = cp.user_id
      WHERE ca.request_id = ?
      ORDER BY ca.created_at DESC`,
      [request_id]
    );

    res.json({ success: true, data: rows });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


/////////////////////////////////////
// 🔥 내 요청 목록 조회 (보호자용)
/////////////////////////////////////
app.get("/care-request/my/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const offset = (page - 1) * limit;

  try {
    const [rows] = await db.query(
      `SELECT 
        cr.id, cr.title, cr.city, cr.district,
        DATE_FORMAT(cr.start_date, '%Y-%m-%d') as startDate,
        DATE_FORMAT(cr.end_date, '%Y-%m-%d') as endDate,
        cr.daily_wage as dailyWage,
        cr.care_time as careTime,
        cr.status,
        DATE_FORMAT(cr.created_at, '%Y-%m-%d') as createdAt,
        COUNT(ca.id) as applicants
      FROM care_request cr
      LEFT JOIN care_apply ca ON cr.id = ca.request_id
      WHERE cr.user_id = ?
      GROUP BY cr.id
      ORDER BY cr.created_at DESC
      LIMIT ? OFFSET ?`,
      [user_id, limit, offset]
    );

    const [[count]] = await db.query(
      "SELECT COUNT(*) as total FROM care_request WHERE user_id = ?",
      [user_id]
    );

    res.json({
      success: true,
      data: rows,
      total: count.total,
      totalPages: Math.ceil(count.total / limit),
      page,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



/////////////////////////////////////
// 🔥 내 신청 현황 조회 (간병인용)
/////////////////////////////////////
app.get("/care-apply/my/:caregiver_id", async (req, res) => {
  const { caregiver_id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const offset = (page - 1) * limit;
  console.log('내 신청 현황 조회 - caregiver_id:', caregiver_id);

  try {
    const [rows] = await db.query(
      `SELECT 
        ca.id, ca.status as applyStatus,
        DATE_FORMAT(ca.created_at, '%Y-%m-%d') as applyDate,
        cr.id as requestId, cr.title, cr.city, cr.district,
        DATE_FORMAT(cr.start_date, '%Y-%m-%d') as startDate,
        DATE_FORMAT(cr.end_date, '%Y-%m-%d') as endDate,
        cr.daily_wage as dailyWage,
        cr.care_time as careTime,
        cr.status as requestStatus
      FROM care_apply ca
      JOIN care_request cr ON ca.request_id = cr.id
      WHERE ca.caregiver_id = ?
      ORDER BY ca.created_at DESC
      LIMIT ? OFFSET ?`,
      [caregiver_id, limit, offset]
    );

    const [[count]] = await db.query(
      "SELECT COUNT(*) as total FROM care_apply WHERE caregiver_id = ?",
      [caregiver_id]
    );

    res.json({
      success: true,
      data: rows,
      total: count.total,
      totalPages: Math.ceil(count.total / limit),
      page,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/////////////////////////////////////
// 🔥 활동 내역 통계 조회 (간병인용)
/////////////////////////////////////
app.get("/care-apply/stats/:caregiver_id", async (req, res) => {
  const { caregiver_id } = req.params;
  console.log('활동 내역 통계 조회 - caregiver_id:', caregiver_id);

  try {
    // 진행중
    const [[active]] = await db.query(
      "SELECT COUNT(*) as count FROM care_apply WHERE caregiver_id = ? AND status = '수락'",
      [caregiver_id]
    );

    // 완료
    const [[done]] = await db.query(
      "SELECT COUNT(*) as count FROM care_apply WHERE caregiver_id = ? AND status = '완료'",
      [caregiver_id]
    );

    // 전체 신청
    const [[total]] = await db.query(
      "SELECT COUNT(*) as count FROM care_apply WHERE caregiver_id = ?",
      [caregiver_id]
    );

    res.json({
      success: true,
      data: {
        active: active.count,
        done: done.count,
        total: total.count,
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});












/////////////////////////////////////
// 🔥 비밀번호 변경
/////////////////////////////////////
app.put("/change-password", async (req, res) => {
  const { user_id, currentPassword, newPassword } = req.body;
  console.log('비밀번호 변경 - user_id:', user_id);

  try {
    // 1. 현재 비밀번호 조회
    const [rows] = await db.query(
      "SELECT password FROM users WHERE user_id = ?",
      [user_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "유저를 찾을 수 없습니다." });
    }

    // 2. 현재 비밀번호 검증
    const isMatch = await bcrypt.compare(currentPassword, rows[0].password);
    if (!isMatch) {
      return res.status(401).json({ message: "현재 비밀번호가 올바르지 않습니다." });
    }

    // 3. 새 비밀번호 암호화 후 저장
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query(
      "UPDATE users SET password = ? WHERE user_id = ?",
      [hashedPassword, user_id]
    );

    console.log('비밀번호 변경 완료 - user_id:', user_id);
    res.json({ success: true, message: "비밀번호가 변경되었습니다." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});






/////////////////////////////////////
// 🔥 회원 탈퇴
/////////////////////////////////////
app.delete("/withdraw", async (req, res) => {
  const { user_id } = req.body;
  console.log('회원 탈퇴 시작 - user_id:', user_id);

  try {
    // 1. 간병인 프로필 삭제
      await db.query(
      "UPDATE caregiver_profile SET use_yn = 'N' WHERE user_id = ?",
        [user_id]
      );

     const [result] = await db.query(
      "UPDATE users SET use_yn = 'N' WHERE user_id = ?",
      [user_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "유저를 찾을 수 없습니다." });
    }

    console.log('회원 탈퇴 완료 - user_id:', user_id);
    res.json({ success: true, message: "회원 탈퇴가 완료되었습니다." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});


