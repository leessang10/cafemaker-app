# Typography 컴포넌트 가이드

## 1. 개요

`Typography` 컴포넌트는 앱 전체에서 일관된 텍스트 스타일을 적용하기 위한 공통 컴포넌트입니다. Pretendard 폰트를 기본으로 사용하며, 다양한 텍스트 스타일을 제공합니다.

## 2. 설치 및 설정

### 폰트 파일 추가

1. `assets/fonts` 디렉토리에 다음 폰트 파일들을 추가합니다:

   - Pretendard-Regular.otf
   - Pretendard-Medium.otf
   - Pretendard-Bold.otf

2. `app.json`에 폰트 설정 추가:

```json
{
  "expo": {
    "fonts": ["./assets/fonts/Pretendard-Regular.otf", "./assets/fonts/Pretendard-Medium.otf", "./assets/fonts/Pretendard-Bold.otf"]
  }
}
```

## 3. 컴포넌트 사용법

### 기본 사용법

```tsx
import { Typography } from './components/Typography';

// 기본 사용
<Typography variant="body">일반 텍스트</Typography>

// 스타일 커스터마이징
<Typography
  variant="title"
  style={{ color: 'red' }}
>
  커스텀 스타일 적용
</Typography>
```

### Variant 종류

| Variant  | 설명            | 기본 스타일              |
| -------- | --------------- | ------------------------ |
| title    | 제목용 텍스트   | Pretendard-Bold, 24px    |
| subtitle | 부제목용 텍스트 | Pretendard-Medium, 18px  |
| body     | 본문용 텍스트   | Pretendard-Regular, 16px |
| caption  | 설명용 텍스트   | Pretendard-Regular, 14px |

## 4. 테마 연동

`Typography` 컴포넌트는 테마 컨텍스트와 연동되어 다크 모드를 지원합니다.

```tsx
import { useTheme } from './context/ThemeContext';

function MyComponent() {
  const { colors } = useTheme();

  return (
    <Typography variant="body" style={{ color: colors.text }}>
      테마 색상 적용
    </Typography>
  );
}
```

## 5. 주의사항

1. 폰트 파일이 정상적으로 추가되었는지 확인하세요.
2. 앱을 재빌드하여 폰트가 적용되었는지 확인하세요.
3. 커스텀 스타일을 적용할 때는 기존 스타일을 덮어쓰지 않도록 주의하세요.

## 6. 예시 코드

### 홈 화면 적용 예시

```tsx
import { Typography } from './components/Typography';

export default function HomeScreen() {
  return (
    <View>
      <Typography variant="title">카페메이커</Typography>
      <Typography variant="subtitle">나만의 카페를 만들어보세요</Typography>
      <Typography variant="body">다양한 카페 창업 정보를 확인하세요</Typography>
      <Typography variant="caption">* 모든 정보는 참고용입니다</Typography>
    </View>
  );
}
```

## 7. 마이그레이션 가이드

기존 `Text` 컴포넌트를 `Typography`로 변경하는 방법:

1. `Text` import 제거
2. `Typography` import 추가
3. `Text` 컴포넌트를 `Typography`로 변경
4. 적절한 variant 선택

```tsx
// 변경 전
<Text style={styles.title}>제목</Text>

// 변경 후
<Typography variant="title">제목</Typography>
```

## 8. 참고사항

- Pretendard 폰트는 [GitHub](https://github.com/orioncactus/pretendard)에서 다운로드할 수 있습니다.
- 폰트 적용 후 앱을 재빌드해야 변경사항이 반영됩니다.
- 테마 변경 시 자동으로 텍스트 색상이 변경됩니다.
