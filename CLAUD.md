# CafeMaker App 프로젝트 설명

## 1. 배경 및 목적

* **프로젝트명**: CafeMaker App
* **목적**: 예비 카페 창업자한테 상권 분석, 창업 견적 생성, 실시간 상담 채팅, 공지·이벤트 정보, FAQ 기능을 한 번에 제공해서 창업 과정을 간소화하고 성공 확률을 높이려고 하는 모바일 앱
* **주요 대상**: 카페 창업 희망자, 소규모 카페 운영자

## 2. 주요 기능

1. **홈 스크린**

    * 공지사항, 이벤트, 성공사례 등 읽을거리를 카드 형식으로 한눈에 볼 수 있게 표시
    * 주요 콘텐츠 요약을 스크롤로 확인하고, 상세 화면으로 이동 가능

2. **회원가입 & 인증**

    * 이메일/비밀번호 로그인 지원
    * 소셜 로그인: Google, Naver, Kakao
    * Supabase Auth 기반으로 세션 관리하고 권한 제어해

3. **창업자 프로필 설정 (온보딩 & My Data)**

    * 온보딩 절차로 가게명, 주소, 연락처, 선호 장비 같은 정보 단계별로 입력해
    * 입력한 정보는 ‘My Data’로 저장해서 이후 기능(상권 분석, 견적, 문의)에서 자동 활용해

4. **상권 분석**

    * 외부 시스템(external URL) 연동: 분석 결과를 보여주는 웹페이지 URL만 노출해
    * 하단 네비게이션 홈바에서 바로 접근 가능해

5. **창업 견적 생성**

    * 창업에 필요한 장비·가구 항목을 직접 선택하고 수량 입력해
    * 항목별 단가랑 수량을 바탕으로 실시간으로 총비용 계산해
    * 최종 견적서는 앱에서 확인하고 PDF로 내보낼 수 있게 해

6. **문의 & 실시간 상담 채팅**

    * Supabase Realtime으로 1:1 채팅 기능 구현해
    * 사용자가 문의하면 관리자가 답변을 실시간으로 보내줘
    * 채팅 기록은 저장해

7. **정보 제공**

    * **FAQ**: 자주 묻는 질문 목록
    * **공지사항**: 운영자 공지 리스트
    * **이벤트**: 진행 중인 프로모션·이벤트 정보
    * **성공사례**: 다른 창업자의 성공 스토리 및 팁 제공

8. **프로필 관리**

    * 등록한 매장 정보 수정할 수 있어
    * 이전 상권 분석, 견적서, 상담 내역도 확인 가능해

9. **오프라인 지원 (추후)**

    * Expo SQLite로 로컬에 데이터 저장하고 동기화 로직 추가할 수 있어

## 3. 기술 스택

* **프론트엔드**: Expo(Managed Workflow), React Native, TypeScript
* **라우팅**:

    * **Expo Router**: 파일 기반 Page Router 사용 (app/ 디렉토리 기반)
    * React Navigation App Router API 사용 가능하나, 파일 기반 Page Router 방식이 유지보수성과 코드 구조화에 유리함
* **백엔드 & 인증**: Supabase(Auth, Storage, Realtime, PostgreSQL)
* **상태관리 & 데이터 패칭**: React Query
* **지도 & 시각화**: react-native-maps, victory-native
* **네비게이션**: React Navigation(bottom-tabs: Home, Chat, FAQ, Profile, More)
* **전역 상태 관리**:

    * React Query: 서버 상태, 데이터 캐싱
    * Zustand: 클라이언트 상태 스토어
    * Supabase Realtime Subscription: 실시간 업데이트
* **환경관리**: dotenv, babel-plugin-module-resolver

## 4. 디자인 & UI 라이브러리

* **스타일링**: NativeWind (Tailwind 문법 기반, 동적 스타일 및 자동 완성 지원)
* **아이콘**: react-native-vector-icons (FontAwesome, Ionicons 등 지원)
* **애니메이션 & 제스처**:

    * React Native Reanimated (고성능 애니메이션)
    * React Native Gesture Handler (제스처 처리)

## 5. 테마 관리

NativeWind의 테마 시스템을 활용:

1. **Tailwind 설정(tailwind.config.js)**

   ```js
   module.exports = {
     content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
     theme: {
       extend: {
         colors: { primary: '#1f2937', secondary: '#f59e0b' },
         fontFamily: { sans: ['Roboto', 'sans-serif'] },
       },
     },
     darkMode: 'media',
   };
   ```
2. **다크 모드**: React Native `useColorScheme()` 또는 `Appearance` API로 감지하여 `dark:` 클래스 사용
3. **사용자 테마 선택**: Zustand 스토어에 테마 모드 저장 후 `className` 동적 적용

## 6. 디렉토리 구조

Flat 구조로 API 파일은 `api/`에 고유한 이름만 쓰고 관리 부담을 최소화:

```
/src
 ├ api/
 │   ├ authApi.ts         # 로그인/회원가입/세션 관리 함수
 │   ├ estimateApi.ts     # 견적 생성·조회 함수
 │   ├ chatApi.ts         # 채팅 메시지 송수신 함수
 │   ├ profileApi.ts      # My Data 프로필 관리 함수
 │   └ marketApi.ts       # 상권 분석 링크 요청 함수
 ├ components/
 │   ├ Auth/
 │   ├ Chat/
 │   ├ FAQ/
 │   ├ Notice/
 │   ├ Event/
 │   └ UI/
 ├ navigation/
 │   └ AppNavigator.tsx   # bottom-tabs 구성
 ├ screens/
 │   ├ OnboardingScreen.tsx
 │   ├ HomeScreen.tsx      # 공지·이벤트·성공사례 대시보드
 │   ├ MarketLinkScreen.tsx
 │   ├ EstimateScreen.tsx
 │   ├ ChatScreen.tsx
 │   ├ FAQScreen.tsx
 │   ├ NoticeScreen.tsx
 │   ├ EventScreen.tsx
 │   └ ProfileScreen.tsx
 ├ types/
 │   ├ authTypes.ts
 │   ├ estimateTypes.ts
 │   ├ chatTypes.ts
 │   ├ profileTypes.ts
 │   └ marketTypes.ts
 └ utils/
     └ helpers.ts
```

## 7. 타입 관리

도메인별 타입 분리 방식(파일명 접미사 `Types.ts`) 채택:

```
/src/types/
 ├ authTypes.ts       # 로그인/인증 타입
 ├ estimateTypes.ts   # 견적 생성·조회 타입
 ├ chatTypes.ts       # 채팅 타입
 ├ profileTypes.ts    # 프로필 관리 타입
 └ marketTypes.ts     # 상권 분석 링크 요청 타입
```

* **장점**: 파일명만 보고 도메인과 역할 파악 용이
* **Import 예시**:

  ```ts
  import { SignInPayload } from 'types/authTypes';
  ```

## 8. 헬퍼 함수 (단일 파일)

`utils/helpers.ts`에 헬퍼 함수 모아:

1. formatPrice(amount: number): string
2. formatDate(date: Date, format?: string): string
3. calculateTotalCost(items: { price: number; quantity: number }\[]): number
4. debounce(func, delay?): func
5. throttle(func, limit?): func
6. getGeoCoordinates(address: string): Promise<{ latitude: number; longitude: number }>
7. validateEmail(email: string): boolean
8. sanitizeInput(input: string): string

## 9. 컴포넌트 폴더 관리

* **공통(UI) 컴포넌트 (`components/UI`)**: 버튼, 카드, 입력 폼 등 재사용 컴포넌트
* **도메인별 컴포넌트**: `components/Auth`, `components/Chat` 등 기능별 폴더로 분리
* **Container vs Presentational**: 로직 처리 컴포넌트와 UI 컴포넌트를 구분
* **Atomic 디자인 (선택)**: `components/atoms`, `molecules`, `organisms` 구조로 확장 가능
