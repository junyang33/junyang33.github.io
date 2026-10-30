const fs = require('fs');
const path = require('path');

/* 把两份 Markdown 题库解析成结构化 JSON */
const SOURCES = [
  { file: 'content/quiz/iot-extra.md', id: 'iot', title: '鸿蒙与华为云物联网 · 补充题库' },
  { file: 'content/quiz/harmony-cert.md', id: 'cert', title: 'HarmonyOS 应用开发者认证题库' },
];

const TYPE_MAP = { '单选': 'single', '多选': 'multi', '判断': 'judge' };

/* 去掉正文里的 markdown 强调标记，避免页面上出现星号 */
function clean(t) {
  return String(t || '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseFile(src) {
  const text = fs.readFileSync(src.file, 'utf8');
  const lines = text.split(/\r?\n/);

  const questions = [];
  const topics = [];
  let topicId = null;
  let topicIndex = 0;
  let cur = null;
  let mode = 'stem';        // stem | options | detail
  let detailLines = [];

  const push = () => {
    if (!cur) return;
    // 解析 details 里的答案与解析
    const detail = detailLines.join('\n');
    const ansLine = (detail.match(/\*\*答案[:：]\s*([^*]+)\*\*/) || [])[1] || '';
    const letters = (ansLine.toUpperCase().match(/[A-D]/g) || []);
    let explain = '';
    const mExpl = detail.match(/解析[:：]([\s\S]*)$/);
    if (mExpl) explain = mExpl[1].replace(/<\/details>/g, '').trim();
    explain = clean(explain);

    if (cur.stem && letters.length) {
      questions.push({
        id: questions.length + 1,
        bank: src.id,
        topic: cur.topic,
        type: cur.type,
        stem: clean(cur.stem),
        options: cur.options.map(clean),
        answer: letters.map((L) => L.charCodeAt(0) - 65),
        explain,
      });
    }
    cur = null;
    detailLines = [];
    mode = 'stem';
  };

  lines.forEach((raw) => {
    const line = raw.trim();

    // 一级标题：专题 / 章节
    if (/^#\s+/.test(line)) {
      push();
      const title = line.replace(/^#\s+/, '').trim();
      // 文档主标题（第一个 # 包含“题库”且不含“专题/、”）跳过
      if (/题库/.test(title) && !/^专题/.test(title) && !/^[一二三四五六七八九十]+、/.test(title)) {
        topicId = null;
        return;
      }
      topicIndex += 1;
      topicId = src.id + '-t' + topicIndex;
      topics.push({ id: topicId, bank: src.id, title });
      return;
    }

    // 二级标题：题型分组，不影响归属
    if (/^##\s+/.test(line)) {
      push();
      return;
    }

    // 题目开始
    const qm = line.match(/^\*\*(\d+)\.\*\*\s*(.*)$/);
    if (qm) {
      push();
      const body = qm[2];
      const tm = body.match(/【(单选|多选|判断)】/);
      cur = {
        topic: topicId,
        type: tm ? TYPE_MAP[tm[1]] : 'single',
        stem: body.replace(/【(单选|多选|判断)】/, '').trim(),
        options: [],
      };
      mode = 'stem';
      return;
    }

    if (!cur) return;

    if (line.startsWith('<details')) { mode = 'detail'; detailLines = []; return; }
    if (mode === 'detail') {
      detailLines.push(raw);
      if (line.includes('</details>')) mode = 'detail-done';
      return;
    }
    if (mode === 'detail-done') return;

    const om = line.match(/^[-*]\s*([A-D])[.、]\s*(.*)$/);
    if (om) {
      cur.options.push(om[2].trim());
      mode = 'options';
      return;
    }

    if (mode === 'stem' && line) {
      cur.stem += ' ' + line;
    } else if (mode === 'options' && line && !/^---/.test(line)) {
      // 选项换行续写
      if (cur.options.length) cur.options[cur.options.length - 1] += ' ' + line;
    }
  });
  push();

  return { topics, questions };
}

const allTopics = [];
const allQuestions = [];
const banks = [];

SOURCES.forEach((src) => {
  const { topics, questions } = parseFile(src);
  allTopics.push(...topics);
  allQuestions.push(...questions);
  banks.push({
    id: src.id,
    title: src.title,
    count: questions.length,
    topics: topics.length,
  });
  console.log(src.id, '题数', questions.length, '专题', topics.length);
});

/* 编号重排，并统计每题类型 */
allQuestions.forEach((q, i) => { q.id = i + 1; });
const typeCount = { single: 0, multi: 0, judge: 0 };
allQuestions.forEach((q) => { typeCount[q.type] += 1; });

const out = { banks, topics: allTopics, questions: allQuestions, types: typeCount };
fs.writeFileSync('content/quiz.json', JSON.stringify(out), 'utf8');
fs.mkdirSync('assets/data', { recursive: true });
fs.writeFileSync('assets/data/quiz.json', JSON.stringify(out), 'utf8');
fs.writeFileSync('.preview/quiz-pretty.json', JSON.stringify(out, null, 1), 'utf8');

console.log('合计', allQuestions.length, '题', typeCount);
console.log('答案缺失:', allQuestions.filter((q) => !q.answer.length).length);
console.log('解析缺失:', allQuestions.filter((q) => !q.explain).length);
console.log('无选项:', allQuestions.filter((q) => q.options.length < 2).length);
console.log('JSON 体积:', (fs.statSync('content/quiz.json').size / 1024).toFixed(1), 'KB');
