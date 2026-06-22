/**
 * Result UI Controller
 * 춤 DNA 테스트 결과 페이지의 UI를 관리합니다.
 *
 * Features:
 * - 드라마틱한 결과 공개 애니메이션
 * - 메인/서브 유형 표시
 * - SNS 공유 최적화
 * - 점수 차트 시각화
 */

import { quizData } from './quiz-data.js';
import { QuizEngine } from './quiz-engine.js';
import { trackAppDownload } from './firebase-config.js';

class ResultUI {
    constructor() {
        // DOM Elements
        this.loadingScreen = document.getElementById('loadingScreen');
        this.resultContainer = document.getElementById('resultContainer');
        this.mainTypeCard = document.getElementById('mainTypeCard');
        this.typeBadge = document.getElementById('typeBadge');
        this.typeEmoji = document.getElementById('typeEmoji');
        this.typeName = document.getElementById('typeName');
        this.typeEnglish = document.getElementById('typeEnglish');
        this.typeNickname = document.getElementById('typeNickname');
        this.typeDescription = document.getElementById('typeDescription');
        this.traitsList = document.getElementById('traitsList');
        this.adviceText = document.getElementById('adviceText');
        this.secondaryEmoji = document.getElementById('secondaryEmoji');
        this.secondaryName = document.getElementById('secondaryName');
        this.secondaryTag = document.getElementById('secondaryTag');
        this.scoreBars = document.getElementById('scoreBars');
        this.storyType = document.getElementById('storyType');
        this.storyPreview = document.getElementById('storyPreview');

        // Buttons
        this.shareBtn = document.getElementById('shareBtn');
        this.retryBtn = document.getElementById('retryBtn');
        this.saveImageBtn = document.getElementById('saveImageBtn');
        this.shareModal = document.getElementById('shareModal');
        this.shareModalClose = document.getElementById('shareModalClose');
        this.shareInstagram = document.getElementById('shareInstagram');
        this.shareTwitter = document.getElementById('shareTwitter');
        this.shareKakao = document.getElementById('shareKakao');
        this.shareCopyLink = document.getElementById('shareCopyLink');
        this.copyLinkSection = document.getElementById('copyLinkSection');
        this.copyLinkInput = document.getElementById('copyLinkInput');
        this.copyLinkBtn = document.getElementById('copyLinkBtn');
        this.toast = document.getElementById('toast');

        // App Download Buttons
        this.downloadIOS = document.getElementById('downloadIOS');
        this.downloadAndroid = document.getElementById('downloadAndroid');

        // Type icon mapping (SVG paths)
        this.typeIcons = {
            powerful: './assets/icons/powerful.svg',
            precise: './assets/icons/precise.svg',
            minimal: './assets/icons/minimal.svg',
            expresser: './assets/icons/expresser.svg',
            technician: './assets/icons/technician.svg',
            classical: './assets/icons/classical.svg',
            groover: './assets/icons/groover.svg',
            silhouette: './assets/icons/silhouette.svg'
        };

        // Type gradient colors
        this.typeColors = {
            powerful: { main: '#DC143C', light: '#FF6B6B' },
            precise: { main: '#4169E1', light: '#74B9FF' },
            minimal: { main: '#2F4F4F', light: '#5D8A8A' },
            expresser: { main: '#8B008B', light: '#C56CF0' },
            technician: { main: '#FF4500', light: '#FF7675' },
            classical: { main: '#704214', light: '#A67C52' },
            groover: { main: '#DAA520', light: '#FFD700' },
            silhouette: { main: '#20B2AA', light: '#81ECEC' }
        };

        // Quiz Engine
        this.engine = new QuizEngine();
        this.result = null;

        // Initialize
        this.init();
    }

    async init() {
        // Try to load result from localStorage or URL
        this.result = this.engine.loadResult();

        if (!this.result) {
            // Try parsing from URL (shared result)
            this.result = this.engine.parseResultFromUrl();
        }

        if (!this.result) {
            // No result found - redirect to quiz
            setTimeout(() => {
                window.location.href = 'quiz.html';
            }, 1000);
            return;
        }

        // Show loading animation
        await this.showLoadingAnimation();

        // Render result
        this.renderResult();

        // Hide loading, show result
        this.hideLoading();

        // Bind events
        this.bindEvents();

        // Animate score bars
        setTimeout(() => {
            this.animateScoreBars();
        }, 500);
    }

    showLoadingAnimation() {
        return new Promise((resolve) => {
            // Loading messages
            const messages = [
                '당신의 춤 DNA를 분석 중...',
                '패턴을 찾고 있어요...',
                '거의 다 됐어요!'
            ];

            const loadingText = this.loadingScreen.querySelector('.loading-text');
            let messageIndex = 0;

            const interval = setInterval(() => {
                messageIndex++;
                if (messageIndex < messages.length) {
                    loadingText.textContent = messages[messageIndex];
                }
            }, 800);

            setTimeout(() => {
                clearInterval(interval);
                resolve();
            }, 2500);
        });
    }

    hideLoading() {
        this.loadingScreen.classList.add('fade-out');
        this.resultContainer.style.display = 'flex';

        setTimeout(() => {
            this.loadingScreen.style.display = 'none';
        }, 500);
    }

    renderResult() {
        const primaryType = quizData.types[this.result.primary];
        const secondaryType = quizData.types[this.result.secondary];

        if (!primaryType) {
            console.error('Primary type not found:', this.result.primary);
            return;
        }

        // Set data attribute for color theming
        this.mainTypeCard.setAttribute('data-type', this.result.primary);

        // Update main type info - use SVG icon
        this.typeEmoji.innerHTML = `<img src="${this.typeIcons[this.result.primary]}" alt="${primaryType.name}" class="type-icon-svg">`;
        this.typeName.textContent = primaryType.name;
        this.typeEnglish.textContent = primaryType.englishName;
        this.typeNickname.textContent = primaryType.nickname;
        this.typeDescription.textContent = primaryType.description;
        this.adviceText.textContent = primaryType.advice;

        // Update type badge color
        const colors = this.typeColors[this.result.primary];
        if (colors) {
            this.typeBadge.style.background = `linear-gradient(135deg, ${colors.main}, ${colors.light})`;
        }

        // Render traits
        this.traitsList.innerHTML = primaryType.traits
            .map(trait => `<span class="trait-tag">${trait}</span>`)
            .join('');

        // Update secondary type
        if (secondaryType) {
            this.secondaryEmoji.innerHTML = `<img src="${this.typeIcons[this.result.secondary]}" alt="${secondaryType.name}" class="type-icon-svg-sm">`;
            this.secondaryName.textContent = secondaryType.name;
            this.secondaryTag.textContent = secondaryType.nickname;
        }

        // Render score chart
        this.renderScoreChart();

        // Update story preview
        this.updateStoryPreview();

        // Update meta tags for sharing
        this.updateMetaTags();
    }

    renderScoreChart() {
        const scores = this.result.scores || {};
        const maxScore = Math.max(...Object.values(scores), 1);

        // Sort by score descending
        const sortedTypes = Object.entries(scores)
            .sort((a, b) => b[1] - a[1]);

        this.scoreBars.innerHTML = sortedTypes.map(([type, score]) => {
            const typeData = quizData.types[type];
            const colors = this.typeColors[type];
            const percentage = (score / maxScore) * 100;
            const iconPath = this.typeIcons[type] || '';

            return `
                <div class="score-bar-item">
                    <span class="score-bar-icon">
                        <img src="${iconPath}" alt="${typeData?.name || type}" class="type-icon-svg-xs">
                    </span>
                    <span class="score-bar-name">${typeData ? typeData.name : type}</span>
                    <div class="score-bar-track">
                        <div class="score-bar-fill"
                             style="width: 0%; background: linear-gradient(90deg, ${colors?.main || '#888'}, ${colors?.light || '#aaa'})"
                             data-width="${percentage}">
                        </div>
                    </div>
                    <span class="score-bar-value">${score}</span>
                </div>
            `;
        }).join('');
    }

    animateScoreBars() {
        const fills = this.scoreBars.querySelectorAll('.score-bar-fill');
        fills.forEach((fill, index) => {
            setTimeout(() => {
                fill.style.width = fill.dataset.width + '%';
            }, index * 100);
        });
    }

    updateStoryPreview() {
        const primaryType = quizData.types[this.result.primary];
        const colors = this.typeColors[this.result.primary];

        if (primaryType && this.storyPreview) {
            const content = this.storyPreview.querySelector('.story-preview-content');
            const storyEmoji = this.storyPreview.querySelector('.story-emoji');

            if (content && colors) {
                content.style.background = `linear-gradient(135deg, ${colors.main} 0%, ${colors.light} 100%)`;
            }

            if (storyEmoji) {
                storyEmoji.innerHTML = `<img src="${this.typeIcons[this.result.primary]}" alt="${primaryType.name}" class="type-icon-svg-story">`;
            }

            if (this.storyType) {
                this.storyType.textContent = primaryType.name;
            }
        }
    }

    updateMetaTags() {
        const primaryType = quizData.types[this.result.primary];

        if (primaryType) {
            // Update page title
            document.title = `나의 춤 DNA는 ${primaryType.name}! | MU:ON`;

            // Update OG meta tags
            const ogTitle = document.querySelector('meta[property="og:title"]');
            const ogDescription = document.querySelector('meta[property="og:description"]');

            if (ogTitle) {
                ogTitle.content = `나의 춤 DNA는 ${primaryType.name}!`;
            }

            if (ogDescription) {
                ogDescription.content = primaryType.description;
            }
        }
    }

    bindEvents() {
        // Share button
        this.shareBtn.addEventListener('click', () => this.showShareModal());

        // Retry button
        this.retryBtn.addEventListener('click', () => this.retryQuiz());

        // Save image button
        this.saveImageBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.saveAsImage();
        });

        // Share modal close
        this.shareModalClose.addEventListener('click', () => this.hideShareModal());
        this.shareModal.addEventListener('click', (e) => {
            if (e.target === this.shareModal) {
                this.hideShareModal();
            }
        });

        // Share options
        this.shareInstagram.addEventListener('click', () => this.shareToInstagram());
        this.shareTwitter.addEventListener('click', () => this.shareToTwitter());
        this.shareKakao.addEventListener('click', () => this.shareToKakao());
        this.shareCopyLink.addEventListener('click', () => this.showCopyLink());

        // Copy link
        this.copyLinkBtn.addEventListener('click', () => this.copyLink());

        // Keyboard
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.shareModal.classList.contains('active')) {
                this.hideShareModal();
            }
        });

        // App Download Buttons
        if (this.downloadIOS) {
            this.downloadIOS.addEventListener('click', (e) => this.handleAppDownload(e, 'ios'));
        }
        if (this.downloadAndroid) {
            this.downloadAndroid.addEventListener('click', (e) => this.handleAppDownload(e, 'android'));
        }
    }

    async handleAppDownload(e, platform) {
        e.preventDefault();

        // Get session data
        const sessionId = localStorage.getItem('dance_dna_session_id');
        const abGroup = localStorage.getItem('dance_dna_ab_group');
        const skillLevel = localStorage.getItem('dance_dna_skill_level');

        // Track download conversion
        trackAppDownload({
            sessionId,
            abGroup,
            skillLevel,
            platform,
            primaryType: this.result?.primary,
            secondaryType: this.result?.secondary,
            userAgent: navigator.userAgent,
            referrer: document.referrer
        }).catch(err => console.warn('다운로드 추적 실패:', err));

        // Show toast message (since actual app links are not set yet)
        this.showToast('앱이 준비 중입니다. 곧 만나요!');

        // When actual links are ready, uncomment and update:
        // const appStoreUrl = 'https://apps.apple.com/app/muon/id...';
        // const playStoreUrl = 'https://play.google.com/store/apps/details?id=...';
        // window.open(platform === 'ios' ? appStoreUrl : playStoreUrl, '_blank');
    }

    showShareModal() {
        this.shareModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    hideShareModal() {
        this.shareModal.classList.remove('active');
        document.body.style.overflow = '';
        this.copyLinkSection.style.display = 'none';
    }

    getShareUrl() {
        return this.engine.generateShareUrl(this.result);
    }

    getShareText() {
        const primaryType = quizData.types[this.result.primary];
        return `나의 춤 DNA는 ${primaryType?.name || '???'}! ${this.typeEmojis[this.result.primary] || '💃'}\n\n당신의 춤 DNA도 확인해보세요!`;
    }

    shareToInstagram() {
        // Instagram doesn't support direct sharing via web
        // Show instructions or copy to clipboard
        this.showToast('이미지를 저장한 후 인스타그램에 공유해주세요!');
        this.saveAsImage();
    }

    shareToTwitter() {
        const text = encodeURIComponent(this.getShareText());
        const url = encodeURIComponent(this.getShareUrl());
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    }

    shareToKakao() {
        // Check if Kakao SDK is loaded
        if (typeof Kakao !== 'undefined' && Kakao.isInitialized()) {
            const primaryType = quizData.types[this.result.primary];

            Kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                    title: `나의 춤 DNA는 ${primaryType?.name}!`,
                    description: primaryType?.description || '나만의 춤 스타일을 발견했어요!',
                    imageUrl: '', // Add your image URL here
                    link: {
                        mobileWebUrl: this.getShareUrl(),
                        webUrl: this.getShareUrl()
                    }
                },
                buttons: [
                    {
                        title: '나도 테스트하기',
                        link: {
                            mobileWebUrl: window.location.origin + '/quiz.html',
                            webUrl: window.location.origin + '/quiz.html'
                        }
                    }
                ]
            });
        } else {
            // Fallback: copy link
            this.showCopyLink();
            this.showToast('카카오톡 SDK가 로드되지 않았습니다. 링크를 복사해주세요.');
        }
    }

    showCopyLink() {
        this.copyLinkSection.style.display = 'flex';
        this.copyLinkInput.value = this.getShareUrl();
    }

    async copyLink() {
        try {
            await navigator.clipboard.writeText(this.getShareUrl());
            this.copyLinkBtn.textContent = '복사됨!';
            this.copyLinkBtn.classList.add('copied');
            this.showToast('링크가 복사되었습니다!');

            setTimeout(() => {
                this.copyLinkBtn.textContent = '복사';
                this.copyLinkBtn.classList.remove('copied');
            }, 2000);
        } catch (err) {
            // Fallback for older browsers
            this.copyLinkInput.select();
            document.execCommand('copy');
            this.showToast('링크가 복사되었습니다!');
        }
    }

    async saveAsImage() {
        // Simple approach: take a screenshot of the main type card
        // For production, you might want to use html2canvas or similar library
        this.showToast('화면을 캡처하여 저장해주세요!');

        // Alternative: provide instructions
        // Or implement with html2canvas if available
    }

    showToast(message) {
        this.toast.textContent = message;
        this.toast.classList.add('show');

        setTimeout(() => {
            this.toast.classList.remove('show');
        }, 3000);
    }

    retryQuiz() {
        this.engine.clearResult();
        window.location.href = 'quiz.html';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ResultUI();
});

export default ResultUI;
