// server/index.js
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());


const jwt = require('jsonwebtoken');


const PORT = 4000;

// index.js 맨 위에 추가
const bcrypt = require('bcrypt');

process.on('uncaughtException', (err) => {
  console.error('🔥 uncaughtException:', err.message);
  console.error(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('🔥 unhandledRejection:', reason);
});

// 테스트 API
app.get("/", (req, res) => {

  
  res.send("서버 정상 zz작동 🚀");

  db.query('SELECT 1')
  .then(() => console.log('✅ DB 연결 성공!'))
  .catch((err) => console.error('❌ DB 연결 실패:', err.message));
});

// 게시판 API
/////////////////////////////////////
// 🔥 CREATE (글 작성)
/////////////////////////////////////
app.post("/write", async (req, res) => {
  const { title, content } = req.body;
    
  try {
    const [result] = await db.query(
      "INSERT INTO board (title, content) VALUES (?, ?)",
      [title, content]
    );

    console.log("저장 완료", result);

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
   
  const {  type, keyword } = req.query;
  
   console.log('page = ' + page , 'limit = ' +limit, 'offset = ' + offset);

  try {
   let sql = `
    SELECT id, title, content, writer, views,
    DATE_FORMAT(created_at, '%Y-%m-%d') as created_at
    FROM board
    WHERE 1=1
  `;

  const params = [];

  // 🔥 검색 조건 추가
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

    const [[count]] = await db.query(
      "SELECT COUNT(*) as total FROM board"
    );

    res.json({
      data: list,
      total: count.total,
      page,
      totalPages: Math.ceil(count.total / limit),
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



/////////////////////////////////////
// 🔥 READ (상세)
/////////////////////////////////////
app.get("/detail/:id", async (req, res) => {
  try {

      const [result] = await db.query(
    "UPDATE board SET views = views + 1 WHERE id = ?",
        [req.params.id]
      );


    const [rows] = await db.query(
      "SELECT  id, title, content, writer, views, date_format(created_at, '%Y-%m-%d') as created_at FROM board WHERE id = ?",
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
app.post("/update", async (req, res) => {
  const {  content , id } = req.body;

  try {
    console.log('수정시작');

    const [result] = await db.query(
      "UPDATE board SET  content=? WHERE id=?",
      [ content, id]
    );

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
        (id, name, phone, email, password, role) 
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
// 🔥 아이디 중복 체크
/////////////////////////////////////
app.post("/check-id", async (req, res) => {
  const { id } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT id FROM users WHERE id = ?",
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
      { id: user.id, name: user.name, role: user.role },
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
        id: user.id,
        name: user.name,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류" });
  }
});



const path = require('path');
const distPath = path.join(__dirname, '../dist');
console.log('dist path:', distPath);  // 👈 추가

app.use(express.static(distPath));
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});