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
}

enum OptionId {
  QNA_ID = 'question_id',
  QNA_CATEGORY_NAME = 'category_name',
  PLAYLIST_KEY = 'playlist_key',
  SONG_ID = 'song_id',
  PLAYLIST_SQUARE = 'playlist_square',
  PLAYLIST_ROUND = 'playlist_round',
}

enum ModalName {
  QNA_ADD = 'qna_add',
  QNA_CHANGE = 'qna_change',
  PLAYLIST_ADD = 'playlist_add',
}

enum ModalOptionId {
  QNA_ID = 'qna_id',
  QNA_CATEGORY = 'qna_category',
  QNA_QUESTION = 'qna_question',
  QNA_ANSWER = 'qna_answer',
  PLAYLIST_ID = 'playlist_id',
  PLAYLIST_NAME = 'playlist_name',
}

export { CommandName, OptionId, ModalName, ModalOptionId };
