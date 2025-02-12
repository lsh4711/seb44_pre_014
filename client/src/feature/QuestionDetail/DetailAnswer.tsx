import React from 'react';
import styled from 'styled-components';
import { TQuestion } from 'utils/type';
import EditAnswer from './EditAnswer';
import LabelContainer from './LabellContainer';
import VoteContainer from './VoteContainer';

type Tprops = {
  quData: TQuestion;
  deleteQu: (id: number, type: string) => void;
  updateQu?: (id: number, type: string) => void;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  selectedAnswerId: number;
  setTimeStamp: React.Dispatch<React.SetStateAction<number>>;
  timeStamp: number;
};

const DetailAnswer: React.FC<Tprops> = ({
  quData,
  deleteQu,
  isEdit,
  setIsEdit,
  updateQu,
  selectedAnswerId,
  setTimeStamp,
  timeStamp,
}) => {
  return (
    <>
      <h3>{quData.answers.length} Answer</h3>
      {quData.answers.map(
        ({ memberId, writer, answerId, content, createdAt }) => (
          <AnswerContainer key={answerId}>
            <VoteContainer />
            <AnswerMain>
              {isEdit && selectedAnswerId === answerId && (
                <EditAnswer
                  setIsEdit={setIsEdit}
                  content={content}
                  id={answerId}
                  setTimeStamp={setTimeStamp}
                  timeStamp={timeStamp}
                />
              )}
              {isEdit && selectedAnswerId !== answerId && (
                <AnswerText>
                  <p>{content}</p>
                </AnswerText>
              )}
              {!isEdit && (
                <AnswerText>
                  <p>{content}</p>
                </AnswerText>
              )}
              <LabelContainer
                memberId={memberId}
                writer={writer}
                createdAt={createdAt}
                deleteQu={deleteQu}
                id={answerId}
                type="answer"
                updateQu={updateQu}
              />
            </AnswerMain>
          </AnswerContainer>
        )
      )}
    </>
  );
};

export default DetailAnswer;

const AnswerContainer = styled.section`
  display: flex;
`;

const AnswerText = styled.div`
  font-size: 16px;
  padding: 15px;
  white-space: pre-line;
`;

const AnswerMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid hsl(210, 8%, 85%);
`;
