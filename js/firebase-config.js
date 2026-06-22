/**
 * Firebase Configuration
 *
 * Firebase 콘솔에서 프로젝트 설정 후 아래 값들을 입력하세요:
 * https://console.firebase.google.com/
 */

// Firebase SDK (CDN)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Firebase 설정 - 실제 값으로 교체 필요
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Firebase 초기화
let app = null;
let db = null;

try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
} catch (error) {
    console.warn('Firebase 초기화 실패:', error.message);
}

/**
 * AB 테스트 결과 저장
 */
export async function saveQuizResult(data) {
    if (!db) {
        console.warn('Firebase가 설정되지 않았습니다. localStorage에 저장합니다.');
        saveToLocalStorage('quiz_results', data);
        return null;
    }

    try {
        const docRef = await addDoc(collection(db, 'quiz_results'), {
            ...data,
            createdAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Firebase 저장 실패:', error);
        saveToLocalStorage('quiz_results', data);
        return null;
    }
}

/**
 * 앱 다운로드 전환 추적
 */
export async function trackAppDownload(data) {
    if (!db) {
        console.warn('Firebase가 설정되지 않았습니다. localStorage에 저장합니다.');
        saveToLocalStorage('app_downloads', data);
        return null;
    }

    try {
        const docRef = await addDoc(collection(db, 'app_downloads'), {
            ...data,
            createdAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Firebase 저장 실패:', error);
        saveToLocalStorage('app_downloads', data);
        return null;
    }
}

/**
 * localStorage 폴백 저장
 */
function saveToLocalStorage(key, data) {
    try {
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.push({
            ...data,
            savedAt: new Date().toISOString()
        });
        localStorage.setItem(key, JSON.stringify(existing));
    } catch (error) {
        console.error('localStorage 저장 실패:', error);
    }
}

/**
 * localStorage에서 데이터 가져오기 (디버깅/분석용)
 */
export function getLocalStorageData(key) {
    try {
        return JSON.parse(localStorage.getItem(key) || '[]');
    } catch {
        return [];
    }
}

export { db };
