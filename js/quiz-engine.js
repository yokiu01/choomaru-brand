/**
 * Dance DNA Quiz Engine
 * 춤 DNA 유형 테스트의 핵심 로직을 담당하는 엔진
 */

// 8가지 춤 DNA 유형
export const DANCE_TYPES = {
  POWERFUL: 'powerful',      // 파워풀 - 강렬한 에너지
  PRECISE: 'precise',        // 프리사이즈 - 정확한 동작
  MINIMAL: 'minimal',        // 미니멀 - 절제된 움직임
  EXPRESSER: 'expresser',    // 익스프레서 - 감정 표현
  TECHNICIAN: 'technician',  // 테크니션 - 기술 중심
  CLASSICAL: 'classical',    // 클래시컬 - 전통적 아름다움
  GROOVER: 'groover',        // 그루버 - 리듬 중심
  SILHOUETTE: 'silhouette'   // 실루엣 - 라인과 형태
};

// localStorage 키
const STORAGE_KEY = 'dance_dna_result';
const ANSWERS_KEY = 'dance_dna_answers';

export class QuizEngine {
  constructor() {
    this.scores = {};
    this.answers = [];
    this.initScores();
  }

  /**
   * 점수 초기화 - 모든 유형의 점수를 0으로 설정
   */
  initScores() {
    this.scores = {
      [DANCE_TYPES.POWERFUL]: 0,
      [DANCE_TYPES.PRECISE]: 0,
      [DANCE_TYPES.MINIMAL]: 0,
      [DANCE_TYPES.EXPRESSER]: 0,
      [DANCE_TYPES.TECHNICIAN]: 0,
      [DANCE_TYPES.CLASSICAL]: 0,
      [DANCE_TYPES.GROOVER]: 0,
      [DANCE_TYPES.SILHOUETTE]: 0
    };
    this.answers = [];
  }

  /**
   * 답변 기록 및 점수 계산
   * @param {number} questionId - 질문 ID (0부터 시작)
   * @param {number} answerIndex - 선택한 답변 인덱스
   * @param {Object} answerScores - 해당 답변의 유형별 점수 { powerful: 2, precise: 1, ... }
   */
  recordAnswer(questionId, answerIndex, answerScores) {
    // 기존 답변이 있으면 해당 점수를 먼저 제거
    const existingAnswer = this.answers.find(a => a.questionId === questionId);
    if (existingAnswer) {
      // 기존 점수 차감
      for (const [type, score] of Object.entries(existingAnswer.scores)) {
        if (this.scores[type] !== undefined) {
          this.scores[type] -= score;
        }
      }
      // 기존 답변 제거
      this.answers = this.answers.filter(a => a.questionId !== questionId);
    }

    // 새 답변 기록
    this.answers.push({
      questionId,
      answerIndex,
      scores: answerScores,
      timestamp: Date.now()
    });

    // 점수 합산
    for (const [type, score] of Object.entries(answerScores)) {
      if (this.scores[type] !== undefined) {
        this.scores[type] += score;
      }
    }

    return this.scores;
  }

  /**
   * 특정 질문의 답변 취소
   * @param {number} questionId - 질문 ID
   */
  removeAnswer(questionId) {
    const answer = this.answers.find(a => a.questionId === questionId);
    if (answer) {
      // 점수 차감
      for (const [type, score] of Object.entries(answer.scores)) {
        if (this.scores[type] !== undefined) {
          this.scores[type] -= score;
        }
      }
      // 답변 제거
      this.answers = this.answers.filter(a => a.questionId !== questionId);
    }
    return this.scores;
  }

  /**
   * 최종 결과 계산 (1위, 2위 유형 반환)
   * @returns {Object} { primary: string, secondary: string, scores: Object, ranking: Array }
   */
  calculateResult() {
    // 점수를 배열로 변환하고 정렬
    const scoreEntries = Object.entries(this.scores);
    const sortedScores = scoreEntries.sort((a, b) => b[1] - a[1]);

    // 동점 처리: 동점인 경우 알파벳 순으로 정렬 (일관성 유지)
    const rankedTypes = sortedScores.map(([type, score], index) => ({
      type,
      score,
      rank: index + 1
    }));

    // 동점자 처리 - 같은 점수면 같은 순위 부여
    let currentRank = 1;
    for (let i = 0; i < rankedTypes.length; i++) {
      if (i > 0 && rankedTypes[i].score < rankedTypes[i - 1].score) {
        currentRank = i + 1;
      }
      rankedTypes[i].rank = currentRank;
    }

    const primary = sortedScores[0] ? sortedScores[0][0] : null;
    const secondary = sortedScores[1] ? sortedScores[1][0] : null;

    // 1위와 2위가 동점인 경우 표시
    const isTied = sortedScores[0] && sortedScores[1] &&
                   sortedScores[0][1] === sortedScores[1][1];

    const result = {
      primary,
      secondary,
      primaryScore: sortedScores[0] ? sortedScores[0][1] : 0,
      secondaryScore: sortedScores[1] ? sortedScores[1][1] : 0,
      scores: { ...this.scores },
      ranking: rankedTypes,
      isTied,
      totalQuestions: this.answers.length,
      timestamp: Date.now()
    };

    return result;
  }

  /**
   * 결과 저장 (localStorage)
   * @param {Object} result - calculateResult()의 반환값
   */
  saveResult(result) {
    try {
      const dataToSave = {
        result,
        answers: this.answers,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      return true;
    } catch (error) {
      console.error('Failed to save result to localStorage:', error);
      return false;
    }
  }

  /**
   * 결과 불러오기
   * @returns {Object|null} 저장된 결과 또는 null
   */
  loadResult() {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (!savedData) return null;

      const parsed = JSON.parse(savedData);

      // 저장된 답변으로 상태 복원
      if (parsed.answers && Array.isArray(parsed.answers)) {
        this.initScores();
        for (const answer of parsed.answers) {
          this.answers.push(answer);
          for (const [type, score] of Object.entries(answer.scores)) {
            if (this.scores[type] !== undefined) {
              this.scores[type] += score;
            }
          }
        }
      }

      return parsed.result;
    } catch (error) {
      console.error('Failed to load result from localStorage:', error);
      return null;
    }
  }

  /**
   * 저장된 결과 삭제
   */
  clearResult() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      this.initScores();
      return true;
    } catch (error) {
      console.error('Failed to clear result:', error);
      return false;
    }
  }

  /**
   * 공유 URL 생성
   * @param {Object} result - calculateResult()의 반환값
   * @returns {string} 공유용 URL
   */
  generateShareUrl(result) {
    const baseUrl = window.location.origin + window.location.pathname;

    // URL 파라미터 구성
    const params = new URLSearchParams();

    // 1위, 2위 유형
    if (result.primary) {
      params.set('p', result.primary);
    }
    if (result.secondary) {
      params.set('s', result.secondary);
    }

    // 점수 정보 (압축된 형태로 저장)
    // 형식: type1:score1,type2:score2,...
    const scoresStr = Object.entries(result.scores)
      .map(([type, score]) => `${type.charAt(0)}${type.charAt(type.length - 1)}:${score}`)
      .join(',');
    params.set('sc', scoresStr);

    // 타임스탬프 (결과 생성 시간)
    params.set('t', result.timestamp || Date.now());

    return `${baseUrl}?${params.toString()}`;
  }

  /**
   * URL에서 결과 파싱
   * @returns {Object|null} 파싱된 결과 또는 null
   */
  parseResultFromUrl() {
    try {
      const params = new URLSearchParams(window.location.search);

      const primary = params.get('p');
      const secondary = params.get('s');
      const scoresStr = params.get('sc');
      const timestamp = params.get('t');

      if (!primary) return null;

      // 점수 파싱
      const scores = {};
      if (scoresStr) {
        const scorePairs = scoresStr.split(',');
        for (const pair of scorePairs) {
          const [typeAbbrev, score] = pair.split(':');
          // 약어에서 원래 유형 찾기
          const type = this.findTypeFromAbbrev(typeAbbrev);
          if (type) {
            scores[type] = parseInt(score, 10) || 0;
          }
        }
      }

      // 랭킹 재구성
      const ranking = Object.entries(scores)
        .sort((a, b) => b[1] - a[1])
        .map(([type, score], index) => ({
          type,
          score,
          rank: index + 1
        }));

      return {
        primary,
        secondary,
        primaryScore: scores[primary] || 0,
        secondaryScore: scores[secondary] || 0,
        scores,
        ranking,
        isTied: scores[primary] === scores[secondary],
        timestamp: timestamp ? parseInt(timestamp, 10) : null,
        isShared: true // 공유된 결과임을 표시
      };
    } catch (error) {
      console.error('Failed to parse result from URL:', error);
      return null;
    }
  }

  /**
   * 유형 약어에서 원래 유형명 찾기
   * @param {string} abbrev - 유형 약어 (첫글자 + 마지막글자)
   * @returns {string|null} 유형명 또는 null
   */
  findTypeFromAbbrev(abbrev) {
    const typeMap = {
      'pl': DANCE_TYPES.POWERFUL,
      'pe': DANCE_TYPES.PRECISE,
      'ml': DANCE_TYPES.MINIMAL,
      'er': DANCE_TYPES.EXPRESSER,
      'tn': DANCE_TYPES.TECHNICIAN,
      'cl': DANCE_TYPES.CLASSICAL,
      'gr': DANCE_TYPES.GROOVER,
      'se': DANCE_TYPES.SILHOUETTE
    };
    return typeMap[abbrev] || null;
  }

  /**
   * 현재 진행 상황 반환
   * @param {number} totalQuestions - 전체 질문 수
   * @returns {Object} { answered: number, total: number, percentage: number }
   */
  getProgress(totalQuestions) {
    const answered = this.answers.length;
    return {
      answered,
      total: totalQuestions,
      percentage: totalQuestions > 0 ? Math.round((answered / totalQuestions) * 100) : 0
    };
  }

  /**
   * 특정 질문에 대한 답변 여부 확인
   * @param {number} questionId - 질문 ID
   * @returns {number|null} 선택한 답변 인덱스 또는 null
   */
  getAnswerForQuestion(questionId) {
    const answer = this.answers.find(a => a.questionId === questionId);
    return answer ? answer.answerIndex : null;
  }

  /**
   * 모든 답변 데이터 반환
   * @returns {Array} 답변 배열
   */
  getAllAnswers() {
    return [...this.answers];
  }

  /**
   * 현재 점수 반환
   * @returns {Object} 유형별 점수
   */
  getCurrentScores() {
    return { ...this.scores };
  }

  /**
   * 결과 유효성 검사
   * @param {number} minQuestions - 최소 답변 필요 수
   * @returns {boolean} 유효한 결과인지 여부
   */
  isResultValid(minQuestions = 1) {
    return this.answers.length >= minQuestions;
  }

  /**
   * 디버그용: 현재 상태 출력
   */
  debugState() {
    console.log('=== QuizEngine State ===');
    console.log('Scores:', this.scores);
    console.log('Answers:', this.answers);
    console.log('Result:', this.calculateResult());
    console.log('========================');
  }
}

// 싱글톤 인스턴스 (필요시 사용)
let quizEngineInstance = null;

export function getQuizEngine() {
  if (!quizEngineInstance) {
    quizEngineInstance = new QuizEngine();
  }
  return quizEngineInstance;
}

export function resetQuizEngine() {
  quizEngineInstance = new QuizEngine();
  return quizEngineInstance;
}

// 기본 내보내기
export default QuizEngine;
