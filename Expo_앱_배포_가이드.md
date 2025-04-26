# 📦 EAS Build 실제 커맨드 정리

```bash
# 1. EAS CLI 설치 (최초 1회)
npm install -g eas-cli

# 2. Expo 로그인
eas login

# 3. EAS 프로젝트 설정
eas build:configure

# 4. iOS 앱 빌드 (ipa 파일 만들기)
eas build -p ios --profile production

# 5. Android 앱 빌드 (aab 파일 만들기)
eas build -p android --profile production

# 6. 빌드 진행 상황 확인
eas build:list

# 7. 빌드 완료된 파일 다운로드 링크 확인
eas build:list
```

---

# ✅ 애플스토어/플레이스토어 앱 등재 시 체크리스트

## [iOS - App Store Connect]

- [ ] Apple Developer 계정 가입 ($99/년)
- [ ] App Store Connect에 앱 등록
- [ ] 아이콘 1024x1024 준비 (투명도 X)
- [ ] 스플래시 스크린 설정 완료
- [ ] 스크린샷 준비 (iPhone SE, iPhone 14, iPad)
- [ ] 앱 설명/키워드/메뉴 문구 준비
- [ ] 개인정보처리방침 URL 준비
- [ ] 심사용 테스트 계정 준비 (로그인 필요시)
- [ ] 권한, 카메라 권한 필요시 Info.plist에 사유 기입

## [Android - Google Play Console]

- [ ] Google Play Console 계정 가입 ($25 일회성)
- [ ] Play Console에 새 앱 등록
- [ ] 아이콘 512x512 준비
- [ ] 스플래시 스크린 설정 완료
- [ ] 스크린샷 준비 (휴대폰, 태블릿)
- [ ] 앱 설명/키워드/카테고리 선택
- [ ] 개인정보처리방침 URL 준비
- [ ] 앱 서명 키 등록
- [ ] 개발자 규정 확인 후 내부 테스트로 문제 검수

---

# 🚀 빌드 참고 팁 (아이콘, 스플래시 화면 설정 등)

## [아이콘 설정]

`app.json` 또는 `app.config.js` 파일에 추가

```json
{
  "expo": {
    "name": "CafeMaker",
    "slug": "cafe-maker",
    "icon": "./assets/icon.png"
  }
}
```

- 사이즈 512x512 이상 권장 (iOS는 1024x1024)
- 투명도 X

## [스플래시 화면 설정]

```json
{
  "expo": {
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "cover",
      "backgroundColor": "#ffffff"
    }
  }
}
```

- 이미지 1242x2436 이상 권장
- `resizeMode: cover` 권장 (보기에 추천)

## [권한 설정]

```json
{
  "expo": {
    "ios": {
      "infoPlist": {
        "NSCameraUsageDescription": "사진 업로드를 위해 카메라 권한이 필요합니다.",
        "NSLocationWhenInUseUsageDescription": "현재 위치를 활용하여 주변 상권 분석 기능을 제공합니다."
      }
    },
    "android": {
      "permissions": ["CAMERA", "ACCESS_FINE_LOCATION"]
    }
  }
}
```

## [초기 빌드 참고]

- 빌드 전에 `expo-optimize` 명령으로 이미지 최적화

```bash
npx expo-optimize
```

- 프로덕션용 빌드에서 디버깅 비활성화 가능

---

# 📢 요약

> **Expo로 개발 → EAS Build로 앱 파일 만들기 → 각 스토어에 업로드**

이 과정으로 "카페메이커" 앱 출시가 가능해집니다.
