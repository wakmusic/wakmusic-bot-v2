enum CommandName {
  QNA = '질문',
  QNA_SUB_LIST = '목록',
  QNA_SUB_ADD = '추가',
  QNA_SUB_DELETE = '삭제',
  QNA_SUB_CHANGE = '변경',
  QNA_SUB_CATEGORY_LIST = '카테고리목록',
  QNA_SUB_CATEGORY_ADD = '카테고리추가',
  QNA_SUB_CATEGORY_DELETE = '카테고리삭제',
  PLAYLIST = '재생목록',
  PLAYLIST_SUB_LIST = '목록',
  PLAYLIST_SUB_ADD = '추가',
  PLAYLIST_SUB_DELETE = '삭제',
  PLAYLIST_SUB_TOGGLE_PUBLIC = '공개설정',
  PLAYLIST_SUB_UPLOAD_SQUARE = '사각아이콘',
  PLAYLIST_SUB_UPLOAD_ROUND = '원형아이콘',
  PLAYLIST_SUB_SONG_LIST = '곡목록',
  PLAYLIST_SUB_SONG_ADD = '곡추가',
  PLAYLIST_SUB_SONG_DELETE = '곡삭제',
  NOTICE = '공지',
  NOTICE_SUB_LIST = '목록',
  NOTICE_SUB_ADD = '등록',
  NOTICE_SUB_DELETE = '삭제',
  NOTICE_SUB_CHANGE_PERIOD = '노출시간',
  NOTICE_SUB_CATEGORY_LIST = '카테고리목록',
  NOTICE_SUB_CATEGORY_ADD = '카테고리추가',
  NOTICE_SUB_CATEGORY_DELETE = '카테고리삭제',
  LYRICS = '가사',
  LYRICS_SUB_UPLOAD = '업로드',
  LYRICS_SUB_DEPLOY = '배포',
}

enum OptionId {
  QNA_ID = 'question_id',
  CATEGORY_NAME = 'category_name',
  PLAYLIST_KEY = 'playlist_key',
  SONG_ID = 'song_id',
  PLAYLIST_SQUARE = 'playlist_square',
  PLAYLIST_ROUND = 'playlist_round',
  NOTICE_ID = 'notice_id',
  NOTICE_PERIOD = 'notice_period',
  LYRICS_FILE = 'lyrics_file',
}

enum ModalName {
  QNA_ADD = 'qna_add',
  QNA_CHANGE = 'qna_change',
  PLAYLIST_ADD = 'playlist_add',
  NOTICE_ADD = 'notice_add',
}

enum ModalOptionId {
  QNA_ID = 'qna_id',
  QNA_CATEGORY = 'qna_category',
  QNA_QUESTION = 'qna_question',
  QNA_ANSWER = 'qna_answer',
  PLAYLIST_ID = 'playlist_id',
  PLAYLIST_NAME = 'playlist_name',
  NOTICE_ID = 'notice_id',
  NOTICE_CATEGORY = 'notice_category',
  NOTICE_TITLE = 'notice_title',
  NOTICE_MAIN_TEXT = 'notice_main_text',
  NOTICE_IMAGES = 'notice_images',
  NOTICE_START_DATE = 'notice_start_date',
}

export { CommandName, OptionId, ModalName, ModalOptionId };
