import React, { useEffect, useState } from 'react';
import API from 'services/api/index';
import styled from 'styled-components';
import { TQuestion } from 'utils/type';

type Tprops = {
  quData: TQuestion;
};

const DetailMainText: React.FC<Tprops> = ({ quData }) => {
  const [fileUrl, setFileUrl] = useState(``);

  const handleImgError = () => {
    setFileUrl('');
  };

  const getDataUrl = async () => {
    try {
      const res = await API.GET(
        `/api/questions/${quData.questionId}/files?size=1`
      );
      if (res.status !== 200) throw res;

      setFileUrl(`data:image/jpeg;base64,` + res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDataUrl();
  }, []);

  return (
    <DetailText>
      <p>{quData.content}</p>
      {fileUrl && (
        <img src={fileUrl} width={300} height={300} onError={handleImgError} />
      )}
    </DetailText>
  );
};

const DetailText = styled.div`
  display: grid;
  padding-right: 16px;
  grid-column: 2;
  margin: 16px;
  white-space: pre-line;

  p {
    clear: both;
    margin-top: 0;
  }
`;
export default DetailMainText;
