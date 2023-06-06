enum CommandName {
  QNA = '질문',
  QNA_SUB_LIST = '목록',
  QNA_SUB_ADD = '추가',
  QNA_SUB_DELETE = '삭제',
  QNA_SUB_CHANGE = '변경',
  QNA_SUB_CATEGORY_LIST = '카테고리목록',
  QNA_SUB_CATEGORY_ADD = '카테고리추가',
  QNA_SUB_CATEGORY_DELETE = '카테고리삭제',
}

enum OptionId {
  QNA_ID = 'question_id',
  QNA_CATEGORY_NAME = 'category_name',
}

enum ModalName {
  QNA_ADD = 'qna_add',
  QNA_CHANGE = 'qna_change',
}

enum ModalOptionId {
  QNA_ID = 'qna_id',
  QNA_CATEGORY = 'qna_category',
  QNA_QUESTION = 'qna_question',
  QNA_ANSWER = 'qna_answer',
}

export { CommandName, OptionId, ModalName, ModalOptionId };
