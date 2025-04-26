# 카페메이커 앱 기술 스택 권장 버전

현재 프로젝트의 Expo 버전(52.0.46)을 기준으로 권장 버전들을 나열합니다.

## OS 및 시뮬레이터 권장 버전

### iOS

- iOS 버전: 13.0 이상
- Xcode 버전: 15.0 이상
- iOS 시뮬레이터: iOS 13.0 ~ 17.x

### Android

- Android 버전: API 21-34 (Android 5.0 - Android 14)
- 권장 타겟 SDK: API 33 (Android 13, Tiramisu)
- 권장 에뮬레이터 이미지: API 33 Google APIs Intel x86_64 또는 ARM 64

## 주요 라이브러리 권장 버전

### 코어 라이브러리

```json
{
  "expo": "~52.0.46",
  "react": "18.3.1",
  "react-native": "0.76.9",
  "expo-router": "~4.0.20"
}
```

### 네비게이션 관련

```json
{
  "@react-navigation/native": "^7.0.14",
  "@react-navigation/native-stack": "^7.0.14",
  "@react-navigation/bottom-tabs": "^7.2.0",
  "react-native-screens": "~4.4.0",
  "react-native-safe-area-context": "4.12.0"
}
```

### UI/애니메이션 관련

```json
{
  "react-native-reanimated": "~3.16.1",
  "react-native-gesture-handler": "~2.20.2",
  "expo-blur": "~14.0.3"
}
```

### 시스템 관련

```json
{
  "expo-status-bar": "~2.0.1",
  "expo-system-ui": "~4.0.9",
  "expo-constants": "~17.0.8",
  "expo-linking": "~7.0.5",
  "expo-splash-screen": "~0.29.24",
  "expo-web-browser": "~14.0.2"
}
```

## 개발 환경 권장 버전

### Node.js

- 버전: 18.x 이상 (20.x 권장)

### 패키지 매니저

- npm: 8.x 이상
- yarn: 1.22.x 이상

### 개발 도구

- Android Studio: 2022.3.1 이상
- Xcode: 15.0 이상 (iOS 개발 시)
- VSCode: 최신 버전

## 주의사항

1. Android 에뮬레이터는 API 33 (Android 13)을 사용하는 것이 가장 안정적입니다.
2. iOS 개발의 경우 최신 버전의 Xcode를 사용하되, 시뮬레이터는 iOS 13.0 이상이면 충분합니다.
3. 라이브러리 버전은 서로 호환성이 검증된 조합이므로, 임의로 버전을 변경하지 않는 것이 좋습니다.
4. Node.js 버전은 프로젝트의 안정성을 위해 LTS 버전을 사용하는 것을 권장합니다.
5. Expo 52.0.46과 React Native 0.76.9는 2024년 4월 기준 최신 안정 버전입니다.
