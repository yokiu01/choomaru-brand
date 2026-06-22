/**
 * 춤 숙련도 옵션
 */
export const skillLevels = [
    { id: 'none', label: '전혀 안 해봤어요', description: '춤을 배운 적이 없어요' },
    { id: 'beginner', label: '조금 해봤어요', description: '취미로 가볍게 배워본 정도' },
    { id: 'intermediate', label: '꽤 해봤어요', description: '1년 이상 배웠거나 동아리 활동' },
    { id: 'advanced', label: '전문적으로 해요', description: '전공 또는 프로 수준' }
];

/**
 * AB 테스트 버전
 * A: 춤 관련 질문 (기존)
 * B: 일상적인 질문 (새로 추가)
 */
export const quizData = {
  // 버전 A: 춤 관련 질문 (기존)
  questionsA: [
    // 1. 프롤로그 - 음악과의 첫 만남
    {
      id: 1,
      question: "어느 조용한 카페. 창밖으로 비가 내리고, 갑자기 익숙한 멜로디가 흘러나온다. 당신의 몸은...",
      answers: [
        { text: "어깨가 절로 들썩인다. 리듬을 타지 않으면 오히려 어색하다.", scores: { groover: 2 } },
        { text: "손가락이 테이블을 가볍게 두드린다. 음악의 결을 따라가고 있다.", scores: { precise: 2 } },
        { text: "눈을 감고 멜로디에 빠져든다. 어떤 감정이 떠오르는지 느껴본다.", scores: { expresser: 2 } },
        { text: "숨을 깊이 들이쉬며 음악의 힘을 온몸으로 받아들인다.", scores: { powerful: 2 } }
      ]
    },
    // 2. 혼자만의 시간 - 아무도 보지 않는 순간
    {
      id: 2,
      question: "집에서 혼자 좋아하는 음악을 틀었다. 아무도 보지 않는 이 순간, 당신의 몸은?",
      answers: [
        { text: "거울 앞에서 동작 하나를 따라해본다. 제대로 되는지 확인하고 싶다.", scores: { precise: 1, minimal: 1 } },
        { text: "온 힘을 다해 움직여본다. 에너지를 마음껏 발산한다.", scores: { powerful: 2 } },
        { text: "내 모습이 어떻게 보일지 상상하며 움직인다. 라인이 신경 쓰인다.", scores: { silhouette: 2 } },
        { text: "리듬에 몸을 맡기며 자유롭게 움직인다. 생각 없이 느끼는 대로.", scores: { groover: 2 } }
      ]
    },
    // 3. 중요한 순간 전날 - 설렘과 긴장 사이
    {
      id: 3,
      question: "중요한 발표를 앞두고 밤늦게 잠이 오지 않는다. 머릿속을 맴도는 것은?",
      answers: [
        { text: "준비한 것을 완벽히 해낼 수 있을까. 실수하면 어쩌지.", scores: { technician: 2 } },
        { text: "사람들 앞에서 내 모습이 어떻게 보일까. 인상이 걱정된다.", scores: { silhouette: 2 } },
        { text: "내 진심이 전달될 수 있을까. 사람들이 공감해줄지 모르겠다.", scores: { expresser: 2 } },
        { text: "끝까지 집중력을 유지할 수 있을까. 에너지 조절이 관건이다.", scores: { powerful: 2 } }
      ]
    },
    // 4. 새로운 안무 - 배움의 순간
    {
      id: 4,
      question: "처음 보는 안무 영상. 난이도가 상당하다. 당신의 접근법은?",
      answers: [
        { text: "느린 속도로 재생하며 손 모양, 발 위치 하나하나 분석한다.", scores: { precise: 2 } },
        { text: "전체 흐름을 파악한 후 내 스타일로 소화해본다.", scores: { groover: 2 } },
        { text: "동작보다 표정과 분위기를 먼저 익힌다. 감정이 먼저다.", scores: { expresser: 2 } },
        { text: "될 때까지 반복한다. 어려운 기술도 결국 연습량이다.", scores: { technician: 2 } }
      ]
    },
    // 5. 칭찬의 순간
    {
      id: 5,
      question: "만약 당신의 춤을 본 사람들이 감탄한다면, 어떤 말이 가장 기분 좋을까?",
      answers: [
        { text: "\"힘이 느껴져요. 에너지가 대단해요.\"", scores: { powerful: 2 } },
        { text: "\"손끝까지 신경 쓴 게 느껴져요. 정말 섬세하네요.\"", scores: { precise: 2 } },
        { text: "\"감정이 전해져요. 보는 내내 빠져들었어요.\"", scores: { expresser: 2 } },
        { text: "\"라인이 정말 아름다워요. 자세가 예술이에요.\"", scores: { silhouette: 2 } }
      ]
    },
    // 6. 춤 영상 감상
    {
      id: 6,
      question: "SNS에서 춤 영상을 볼 때, 가장 먼저 눈이 가는 부분은?",
      answers: [
        { text: "전체적인 실루엣. 몸의 라인이 어떻게 보이는지.", scores: { silhouette: 2 } },
        { text: "동작의 칼각. 깔끔하게 딱딱 끊기는 느낌.", scores: { minimal: 2 } },
        { text: "표정과 눈빛. 감정이 영상을 통해 전달되는지.", scores: { expresser: 2 } },
        { text: "기술 동작의 완성도. 어려운 동작이 성공했는지.", scores: { technician: 2 } }
      ]
    },
    // 7. 짧은 영상 챌린지
    {
      id: 7,
      question: "짧은 영상 하나를 올리려 한다. 어떤 방식으로 촬영할까?",
      answers: [
        { text: "원본과 똑같이. 정확하게 재현하는 것이 목표다.", scores: { precise: 2 } },
        { text: "나만의 그루브를 더해서. 같은 안무도 다르게 소화한다.", scores: { groover: 2 } },
        { text: "힘 있게, 임팩트 있게. 짧은 영상에선 강렬함이 중요하다.", scores: { powerful: 2 } },
        { text: "표정과 분위기로 승부. 기술보다 무드가 먼저다.", scores: { expresser: 2 } }
      ]
    },
    // 8. 가르쳐주는 순간
    {
      id: 8,
      question: "친구에게 무언가를 가르쳐줄 때, 당신의 스타일은?",
      answers: [
        { text: "전체 흐름과 맥락을 먼저 설명해준다. 큰 그림이 중요하다.", scores: { classical: 2 } },
        { text: "어려운 부분만 집중적으로 쪼개서 알려준다. 분절이 효과적이다.", scores: { minimal: 2 } },
        { text: "직접 시범을 보여준다. 보고 따라하는 게 빠르다.", scores: { powerful: 2 } },
        { text: "느낌과 감각으로 설명한다. 말보다 몸으로 전달한다.", scores: { groover: 2 } }
      ]
    },
    // 9. 갑작스러운 요청
    {
      id: 9,
      question: "모임에서 갑자기 \"춤 한 번만 보여줘\"라는 요청을 받았다. 당신의 선택은?",
      answers: [
        { text: "음악이 흐르면 자연스럽게 몸이 반응한다. 리듬을 타며 즐긴다.", scores: { groover: 2 } },
        { text: "짧고 임팩트 있는 동작 몇 개로 깔끔하게 마무리한다.", scores: { minimal: 2 } },
        { text: "분위기에 맞게 연기하듯 움직인다. 관객과 교감이 중요하다.", scores: { expresser: 2 } },
        { text: "평소 연마한 기술을 선보인다. 보여줄 수 있을 때 보여줘야 한다.", scores: { technician: 2 } }
      ]
    },
    // 10. 거울 앞에서
    {
      id: 10,
      question: "거울 앞에서 나를 바라본다. 가장 신경 쓰이는 부분은?",
      answers: [
        { text: "팔과 다리의 라인. 각도 하나가 전체 인상을 바꾼다.", scores: { silhouette: 2 } },
        { text: "동작의 깔끔함. 시작과 끝이 분명해야 한다.", scores: { minimal: 2 } },
        { text: "전체적인 품격. 흐르는 듯한 우아함이 있는가.", scores: { classical: 2 } },
        { text: "음악과의 일체감. 리듬에 정확히 맞아떨어지는가.", scores: { groover: 2 } }
      ]
    },
    // 11. 감상의 순간
    {
      id: 11,
      question: "영상 속 누군가의 춤에 시선이 멈춘다. 무엇이 당신의 눈길을 사로잡았을까?",
      answers: [
        { text: "놀라운 기술. \"저게 가능해?\"라는 생각이 먼저 든다.", scores: { technician: 2 } },
        { text: "음악과의 조화. 완벽한 그루브가 느껴진다.", scores: { groover: 2 } },
        { text: "전해지는 감정. 스토리가 보이는 듯하다.", scores: { expresser: 2 } },
        { text: "아름다운 형태. 멈춘 화면 자체가 작품이다.", scores: { silhouette: 1, classical: 1 } }
      ]
    },
    // 12. 에필로그 - 나의 정체성
    {
      id: 12,
      question: "당신에게 '춤'이란 무엇인가요? 스스로에게 가장 어울리는 표현은?",
      answers: [
        { text: "강렬한 에너지의 분출. 무대를 지배하는 힘.", scores: { powerful: 2 } },
        { text: "섬세한 감성의 표현. 손끝까지 담긴 이야기.", scores: { precise: 2 } },
        { text: "감정을 전달하는 매개. 관객과 나누는 교감.", scores: { expresser: 2 } },
        { text: "우아한 선의 예술. 형태 그 자체의 아름다움.", scores: { classical: 1, silhouette: 1 } }
      ]
    }
  ],
  types: {
    powerful: {
      name: "파워풀",
      englishName: "Powerful",
      emoji: "⚔️",
      nickname: "무대 장악형",
      description: "강한 힘으로 표현하는 당신. 폭발적인 에너지와 강렬한 존재감으로 무대를 압도합니다.",
      traits: [
        "폭발적인 에너지",
        "강렬한 무대 장악력",
        "힘과 감정의 극대화",
        "다이나믹한 표현력"
      ],
      advice: "강한 에너지는 당신의 최대 무기입니다. 때로는 섬세한 표현도 더해보세요. 강약의 대비가 당신을 더욱 돋보이게 할 것입니다.",
      color: "#DC143C"
    },
    precise: {
      name: "정밀",
      englishName: "Precise",
      emoji: "🌊",
      nickname: "디테일 집착형",
      description: "손끝까지 감성을 담는 당신. 남들이 놓치는 미세한 디테일로 춤에 깊이를 더합니다.",
      traits: [
        "손끝까지 전해지는 감성",
        "섬세한 동작 컨트롤",
        "정교한 표현력",
        "완성도에 대한 집착"
      ],
      advice: "디테일에 대한 집착은 장인정신입니다. 가끔은 크고 자유로운 움직임도 시도해보세요. 새로운 매력을 발견할 수 있습니다.",
      color: "#4169E1"
    },
    minimal: {
      name: "미니멀",
      englishName: "Minimal",
      emoji: "🌙",
      nickname: "프레임 장인",
      description: "동작을 쪼개어 분절하는 당신. 깔끔하고 정확한 움직임으로 독특한 리듬감을 만들어냅니다.",
      traits: [
        "깔끔한 동작 분절",
        "군더더기 없는 움직임",
        "정확한 시작과 끝",
        "모던하고 세련된 스타일"
      ],
      advice: "절제된 움직임은 그 자체로 미학입니다. 때로는 감정을 풍부하게 실어보세요. 절제와 감성의 조화가 완벽을 만듭니다.",
      color: "#2F4F4F"
    },
    expresser: {
      name: "표현자",
      englishName: "Expresser",
      emoji: "🎭",
      nickname: "감정 과몰입형",
      description: "감정을 연기하는 당신. 춤으로 이야기를 전달하며 관객의 마음을 움직입니다.",
      traits: [
        "풍부한 감정 표현",
        "몰입감 있는 연기력",
        "스토리텔링 능력",
        "관객과의 감정 교감"
      ],
      advice: "감정 표현은 당신의 가장 큰 재능입니다. 기술적인 부분도 함께 다듬어보세요. 표현력에 기술이 더해지면 더욱 빛납니다.",
      color: "#8B008B"
    },
    technician: {
      name: "테크니션",
      englishName: "Technician",
      emoji: "🔥",
      nickname: "스킬 덕후",
      description: "기술로 보여주는 당신. 어려운 동작도 척척 해내며 끊임없이 한계를 넘어섭니다.",
      traits: [
        "뛰어난 테크닉",
        "정확한 기술 구사",
        "끊임없는 도전",
        "숙련된 퍼포먼스"
      ],
      advice: "기술의 완성도는 타의 추종을 불허합니다. 감정을 담아 표현해보세요. 기술에 영혼이 담기면 관객의 마음을 사로잡습니다.",
      color: "#FF4500"
    },
    classical: {
      name: "클래시컬",
      englishName: "Classical",
      emoji: "🏛️",
      nickname: "정적인 카리스마",
      description: "한국무용의 본질을 품은 당신. 우아함과 품격이 자연스럽게 묻어나는 고유의 아름다움을 지녔습니다.",
      traits: [
        "우아한 몸짓",
        "한국적인 선의 아름다움",
        "품격 있는 자세",
        "전통과 현대의 조화"
      ],
      advice: "전통적인 아름다움은 당신의 정체성입니다. 현대적인 움직임도 접목해보세요. 클래식과 모던의 만남이 새로운 가능성을 열어줍니다.",
      color: "#704214"
    },
    groover: {
      name: "그루버",
      englishName: "Groover",
      emoji: "🥁",
      nickname: "리듬이 체질",
      description: "몸을 리듬에 맡기는 당신. 음악과 하나 되어 자연스럽게 흐르는 그루브가 매력입니다.",
      traits: [
        "타고난 리듬감",
        "음악과의 일체감",
        "자연스러운 바이브",
        "즉흥 능력"
      ],
      advice: "리듬감은 타고난 재능입니다. 때로는 정확한 동작 연습도 해보세요. 그루브에 정확성이 더해지면 더욱 매력적입니다.",
      color: "#FFD700"
    },
    silhouette: {
      name: "실루엣",
      englishName: "Silhouette",
      emoji: "🦢",
      nickname: "라인의 정석",
      description: "선과 모양을 만드는 당신. 아름다운 몸의 라인이 그 자체로 하나의 작품입니다.",
      traits: [
        "아름다운 바디라인",
        "포즈의 완성도",
        "시각적 균형감",
        "우아한 형태미"
      ],
      advice: "라인의 아름다움은 당신만의 무기입니다. 리듬감도 함께 길러보세요. 아름다운 선에 그루브가 더해지면 완벽한 조화를 이룹니다.",
      color: "#20B2AA"
    }
  },
  typeKeys: ["powerful", "precise", "minimal", "expresser", "technician", "classical", "groover", "silhouette"],

  // 버전 B: 일상적인 질문 (춤 비경험자 친화적)
  questionsB: [
    // 1. 음악 반응
    {
      id: 1,
      question: "좋아하는 노래가 흘러나올 때, 당신의 반응은?",
      answers: [
        { text: "어깨가 절로 들썩인다. 리듬을 타지 않으면 오히려 어색하다.", scores: { groover: 2 } },
        { text: "손가락이 테이블을 가볍게 두드린다. 박자를 세고 있다.", scores: { precise: 2 } },
        { text: "눈을 감고 멜로디에 빠져든다. 어떤 감정이 떠오르는지 느껴본다.", scores: { expresser: 2 } },
        { text: "숨을 깊이 들이쉬며 음악의 에너지를 온몸으로 받아들인다.", scores: { powerful: 2 } }
      ]
    },
    // 2. 혼자만의 시간
    {
      id: 2,
      question: "집에서 혼자 좋아하는 음악을 틀었다. 아무도 보지 않는 이 순간, 당신은?",
      answers: [
        { text: "거울을 보며 표정이나 제스처를 확인한다.", scores: { precise: 1, minimal: 1 } },
        { text: "온 힘을 다해 몸을 움직여본다. 에너지를 마음껏 발산한다.", scores: { powerful: 2 } },
        { text: "내 모습이 어떻게 보일지 상상하며 포즈를 취해본다.", scores: { silhouette: 2 } },
        { text: "리듬에 몸을 맡기며 자유롭게 움직인다. 생각 없이 느끼는 대로.", scores: { groover: 2 } }
      ]
    },
    // 3. 중요한 순간 전날
    {
      id: 3,
      question: "중요한 발표를 앞두고 밤늦게 잠이 오지 않는다. 머릿속을 맴도는 것은?",
      answers: [
        { text: "준비한 것을 완벽히 해낼 수 있을까. 실수하면 어쩌지.", scores: { technician: 2 } },
        { text: "사람들 앞에서 내 모습이 어떻게 보일까. 인상이 걱정된다.", scores: { silhouette: 2 } },
        { text: "내 진심이 전달될 수 있을까. 사람들이 공감해줄지 모르겠다.", scores: { expresser: 2 } },
        { text: "끝까지 집중력을 유지할 수 있을까. 에너지 조절이 관건이다.", scores: { powerful: 2 } }
      ]
    },
    // 4. 새로운 것을 배울 때
    {
      id: 4,
      question: "새로운 기술이나 취미를 배울 때, 당신의 접근 방식은?",
      answers: [
        { text: "영상을 느린 속도로 재생하며 세부 동작을 하나하나 분석한다.", scores: { precise: 2 } },
        { text: "전체 흐름을 파악한 후 나만의 방식으로 해석해본다.", scores: { groover: 2 } },
        { text: "왜 이걸 배우는지, 어떤 의미가 있는지 먼저 생각한다.", scores: { expresser: 2 } },
        { text: "될 때까지 반복한다. 어려워도 결국 연습량이다.", scores: { technician: 2 } }
      ]
    },
    // 5. 칭찬의 순간
    {
      id: 5,
      question: "누군가 당신을 칭찬한다면, 어떤 말이 가장 기분 좋을까?",
      answers: [
        { text: "\"에너지가 느껴져요. 열정이 대단해요.\"", scores: { powerful: 2 } },
        { text: "\"디테일까지 신경 쓴 게 느껴져요. 꼼꼼하시네요.\"", scores: { precise: 2 } },
        { text: "\"진심이 전해져요. 보는 내내 감동받았어요.\"", scores: { expresser: 2 } },
        { text: "\"자세가 정말 멋있어요. 품격이 느껴져요.\"", scores: { silhouette: 2 } }
      ]
    },
    // 6. SNS 콘텐츠 감상
    {
      id: 6,
      question: "SNS에서 누군가의 영상에 눈길이 멈춘다. 무엇 때문일까?",
      answers: [
        { text: "전체적인 비주얼. 구도나 포즈가 예술이다.", scores: { silhouette: 2 } },
        { text: "깔끔한 편집. 타이밍이 딱딱 맞아떨어진다.", scores: { minimal: 2 } },
        { text: "표정과 분위기. 감정이 영상을 통해 전달된다.", scores: { expresser: 2 } },
        { text: "대단한 실력. \"이게 가능해?\"라는 생각이 먼저 든다.", scores: { technician: 2 } }
      ]
    },
    // 7. 콘텐츠 제작
    {
      id: 7,
      question: "짧은 영상 하나를 찍어 올리려 한다. 어떤 방식으로 촬영할까?",
      answers: [
        { text: "레퍼런스와 똑같이. 정확하게 재현하는 것이 목표다.", scores: { precise: 2 } },
        { text: "나만의 느낌을 더해서. 같은 주제도 다르게 표현한다.", scores: { groover: 2 } },
        { text: "임팩트 있게. 짧은 영상에선 강렬함이 중요하다.", scores: { powerful: 2 } },
        { text: "표정과 분위기로 승부. 기술보다 무드가 먼저다.", scores: { expresser: 2 } }
      ]
    },
    // 8. 가르쳐줄 때
    {
      id: 8,
      question: "친구에게 무언가를 알려줄 때, 당신의 스타일은?",
      answers: [
        { text: "전체 맥락과 큰 그림을 먼저 설명해준다.", scores: { classical: 2 } },
        { text: "핵심만 쏙쏙 집어서 간결하게 알려준다.", scores: { minimal: 2 } },
        { text: "직접 시범을 보여준다. 보고 따라하는 게 빠르다.", scores: { powerful: 2 } },
        { text: "느낌과 감각으로 설명한다. \"이런 기분으로 해봐.\"", scores: { groover: 2 } }
      ]
    },
    // 9. 갑작스러운 요청
    {
      id: 9,
      question: "모임에서 갑자기 \"뭔가 보여줘\"라는 요청을 받았다. 당신의 선택은?",
      answers: [
        { text: "즉흥적으로 반응한다. 분위기를 타며 즐긴다.", scores: { groover: 2 } },
        { text: "짧고 임팩트 있게 깔끔하게 마무리한다.", scores: { minimal: 2 } },
        { text: "분위기에 맞게 연기하듯 움직인다. 관객과 교감이 중요하다.", scores: { expresser: 2 } },
        { text: "평소 갈고닦은 실력을 선보인다. 보여줄 수 있을 때 보여줘야 한다.", scores: { technician: 2 } }
      ]
    },
    // 10. 거울 앞에서
    {
      id: 10,
      question: "거울 앞에서 나를 바라본다. 가장 신경 쓰이는 부분은?",
      answers: [
        { text: "전체적인 실루엣. 라인이 예쁘게 나오는지.", scores: { silhouette: 2 } },
        { text: "깔끔함. 군더더기 없이 정돈된 느낌인지.", scores: { minimal: 2 } },
        { text: "전체적인 품격. 우아하고 고급스러워 보이는지.", scores: { classical: 2 } },
        { text: "활력. 에너지 넘치고 생동감 있어 보이는지.", scores: { groover: 2 } }
      ]
    },
    // 11. 영상 감상
    {
      id: 11,
      question: "영상 속 누군가의 퍼포먼스에 시선이 멈춘다. 무엇이 눈길을 끌었을까?",
      answers: [
        { text: "놀라운 기술. \"저게 가능해?\"라는 생각이 먼저 든다.", scores: { technician: 2 } },
        { text: "음악과의 조화. 완벽한 타이밍과 흐름이 느껴진다.", scores: { groover: 2 } },
        { text: "전해지는 감정. 이야기가 보이는 듯하다.", scores: { expresser: 2 } },
        { text: "아름다운 형태. 멈춘 화면 자체가 작품이다.", scores: { silhouette: 1, classical: 1 } }
      ]
    },
    // 12. 자기표현
    {
      id: 12,
      question: "당신에게 '자기표현'이란 무엇인가요?",
      answers: [
        { text: "강렬한 에너지의 분출. 존재감을 드러내는 것.", scores: { powerful: 2 } },
        { text: "섬세한 감성의 표현. 디테일까지 담긴 이야기.", scores: { precise: 2 } },
        { text: "감정을 전달하는 매개. 사람들과 나누는 교감.", scores: { expresser: 2 } },
        { text: "우아한 아름다움. 품격 그 자체.", scores: { classical: 1, silhouette: 1 } }
      ]
    }
  ]
};

// 하위 호환성을 위한 questions 별칭
quizData.questions = quizData.questionsA;

/**
 * AB 그룹 결정 및 저장
 * @returns {'A' | 'B'} AB 그룹
 */
export const getABGroup = () => {
  const storageKey = 'dance_dna_ab_group';
  let group = localStorage.getItem(storageKey);

  if (!group) {
    // 50:50 무작위 배정
    group = Math.random() < 0.5 ? 'A' : 'B';
    localStorage.setItem(storageKey, group);
  }

  return group;
};

/**
 * AB 그룹에 따른 질문 가져오기
 * @param {string} group - 'A' 또는 'B'
 * @returns {Array} 질문 배열
 */
export const getQuestionsByGroup = (group) => {
  return group === 'B' ? quizData.questionsB : quizData.questionsA;
};

export const getScoreBalance = (group = 'A') => {
  const balance = {};
  quizData.typeKeys.forEach(key => balance[key] = 0);

  const questions = getQuestionsByGroup(group);
  questions.forEach(q => {
    q.answers.forEach(a => {
      Object.entries(a.scores).forEach(([type, score]) => {
        balance[type] += score;
      });
    });
  });

  return balance;
};
