import DetailAnswer from 'feature/QuestionDetail/DetailAnswer';
import DetailAnswerInput from 'feature/QuestionDetail/DetailAnswerInput';
import DetailMainText from 'feature/QuestionDetail/DetailMainText';
import DetailTitle from 'feature/QuestionDetail/DetailTitle';
import LabelContainer from 'feature/QuestionDetail/LabellContainer';
import VoteContainer from 'feature/QuestionDetail/VoteContainer';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
// import axios from 'axios';
import API from 'services/api/index';

const StyledDetailPage = styled.div`
  max-width: 1100px;
  padding: 24px 16px;
`;

const DetailMain = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid hsl(210, 8%, 85%);
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
`;

export default function DetailQuestion() {
  const { id } = useParams();
  const [quData, setQuData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  const [timeStamp, setTimeStamp] = useState(0);
  const navigate = useNavigate();

  //질문 수정하기

  //질문데이터 불러오기
  const requestQuestion = async () => {
    try {
      const res = await API.GET(`/api/questions/${id}`);
      if (res.status !== 200) throw res;

      setQuData(res.data);
      setIsLoading(false);
      // console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 질문글 삭제하기
  const deleteQuestion = async (id: number, type: string) => {
    try {
      if (type === 'question') {
        //질문삭제
        const res = await API.DELETE({ url: `/api/questions/${id}` });
        navigate(`/`);
        if (res.status !== 200) throw res;
      } else {
        // 답변삭제
        const res = await API.DELETE({ url: `/answers/${id}` });
        setTimeStamp(timeStamp + 1);
        if (res.status !== 200) throw res;
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 질문글 수정하기
  const updateQuestion = (id: number, type: string) => {
    if (type === 'question') {
      navigate(`/questions/edit/${id}`);
    } else {
      setSelectedAnswerId(id);
      setIsEdit(true);
    }
  };

  useEffect(() => {
    requestQuestion();
  }, [id, timeStamp]);

  return (
    !isLoading && (
      <StyledDetailPage>
        <DetailTitle quData={quData} />
        <DetailMain>
          <VoteContainer />
          <MainContainer>
            <DetailMainText quData={quData} />
            <LabelContainer
              type="question"
              memberId={quData.memberId}
              writer={quData.writer}
              createdAt={quData.createdAt}
              deleteQu={deleteQuestion}
              id={quData.questionId}
              updateQu={updateQuestion}
            />
          </MainContainer>
        </DetailMain>
        <DetailAnswer
          quData={quData}
          deleteQu={deleteQuestion}
          updateQu={updateQuestion}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          selectedAnswerId={selectedAnswerId}
          setTimeStamp={setTimeStamp}
          timeStamp={timeStamp}
        />
        <DetailAnswerInput
          quData={quData}
          questionId={quData.questionId}
          timeStamp={timeStamp}
          setTimeStamp={setTimeStamp}
        />
      </StyledDetailPage>
    )
  );
}
