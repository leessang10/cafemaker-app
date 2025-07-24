-- Insert sample notices
INSERT INTO public.notices (title, content, category, is_published, published_at) VALUES
('CafeMaker 서비스 정식 오픈', '안녕하세요! CafeMaker가 정식으로 서비스를 시작합니다. 창업을 꿈꾸는 모든 분들을 위한 종합 플랫폼으로 성장하겠습니다.', 'important', true, NOW()),
('11월 창업 세미나 안내', '11월 창업 세미나가 개최됩니다. 성공한 카페 사장님들의 생생한 경험담을 들어보세요.', 'general', true, NOW()),
('견적 시스템 업데이트', '견적 시스템이 업데이트되어 더욱 정확한 창업 비용을 산출할 수 있습니다.', 'general', true, NOW()),
('앱 버전 1.2 업데이트', '새로운 기능들이 추가된 1.2 버전이 출시되었습니다. 업데이트 후 이용해주세요.', 'general', true, NOW());

-- Insert sample events
INSERT INTO public.events (title, description, event_date, location, max_participants, current_participants, registration_fee, is_published) VALUES
('카페 창업 기초 세미나', '카페 창업을 위한 기초 지식부터 실무까지, 전문가와 함께하는 세미나입니다.', '2024-12-15 14:00:00+09', '서울 강남구 창업센터', 50, 23, 0, true),
('성공 사례 공유회', '실제 카페를 성공적으로 운영 중인 사장님들의 노하우를 공유하는 자리입니다.', '2024-12-20 19:00:00+09', '온라인 (Zoom)', 100, 67, 10000, true),
('디저트 카페 트렌드 워크숍', '최신 디저트 카페 트렌드와 메뉴 개발 워크숍에 참여해보세요.', '2024-12-25 13:00:00+09', '부산 해운대구 쿠킹스튜디오', 30, 12, 50000, true);

-- Insert sample success stories
INSERT INTO public.success_stories (title, content, author_name, business_type, location, revenue_info, is_featured, is_published) VALUES
('작은 동네 카페에서 월 매출 3천만원까지', '처음엔 작은 동네 카페였지만, 고객 중심의 서비스와 특별한 메뉴로 성공할 수 있었습니다. CafeMaker의 견적 시스템 덕분에 초기 투자를 효율적으로 할 수 있었어요.', '김○○', '카페', '서울 마포구', '월 매출 3,000만원', true, true),
('베이커리 카페 창업 6개월 만에 흑자 전환', '베이킹에 대한 열정만 가지고 시작했는데, 전문가 상담을 통해 체계적으로 준비할 수 있었습니다.', '이○○', '베이커리', '경기 성남시', '월 매출 2,500만원', false, true),
('프랜차이즈보다 개인 카페가 답이었다', '프랜차이즈를 고려했지만, 개인 카페로 시작해서 더 큰 수익을 올릴 수 있었습니다.', '박○○', '카페', '부산 해운대구', '월 매출 4,200만원', true, true),
('디저트 전문점으로 차별화 성공', '경쟁이 치열한 카페 시장에서 디저트 전문점으로 포지셔닝하여 성공했습니다.', '최○○', '디저트 전문점', '대구 중구', '월 매출 2,800만원', false, true);

-- Insert sample FAQs
INSERT INTO public.faqs (question, answer, category, order_index, is_published) VALUES
('카페 창업에 필요한 최소 자본금은 얼마인가요?', '카페 창업에 필요한 최소 자본금은 입지와 규모에 따라 다르지만, 일반적으로 5,000만원에서 1억원 정도가 필요합니다. 견적 시스템을 통해 정확한 비용을 산출해보세요.', 'startup', 1, true),
('상권 분석은 어떻게 하나요?', '상권 분석은 유동인구, 경쟁업체, 임대료, 접근성 등을 종합적으로 고려해야 합니다. 우리 앱의 상권 분석 기능을 활용해보세요.', 'location', 2, true),
('전문가 상담은 어떻게 받을 수 있나요?', '앱 내 상담 탭에서 실시간으로 전문가와 1:1 상담이 가능합니다. 창업 관련 모든 궁금증을 해결해드립니다.', 'consulting', 3, true),
('견적서는 어떻게 작성하나요?', '견적 탭에서 필요한 항목들을 선택하시면 자동으로 견적서가 작성됩니다. 실시간으로 비용이 계산되어 편리합니다.', 'estimate', 4, true);