import DetailButton from 'components/Button/DetailButton';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'store/user/store.user';
import styled from 'styled-components';
import UserInfo from './UserInfo';

type Tprops = {
  memberId: string;
  writer: string;
  createdAt: string;
  deleteQu?: (id: number, type: string) => void;
  id: number;
  updateQu: (id: number, type: string) => void;
  type: string;
  handleEdit?: (answerId: number) => void;
};

const LabelContainer: React.FC<Tprops> = ({
  memberId,
  writer,
  createdAt,
  deleteQu,
  id,
  updateQu,
  type,
}) => {
  const navigate = useNavigate();
  const onClickButton = () => navigate('/button');
  const loginId = useUserStore().memberId;
  const handleEdit = () => {
    updateQu(id, type);
  };
  const handleDelete = () => {
    deleteQu(id, type);
  };

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  return (
    // quData && (
    <Label>
      <ButtonContainer>
        <DetailButton onClick={onClickButton}>Share</DetailButton>
        {loginId == memberId && (
          <>
            <DetailButton onClick={handleEdit}>Edit</DetailButton>
            <DetailButton onClick={handleDelete}>Delete</DetailButton>
          </>
        )}
      </ButtonContainer>
      <UserInfo
        img={`${serverUrl}/members/${memberId}/files`}
        site={`/profile/${memberId}`}
        memberId={memberId}
        name={writer}
        createdAt={createdAt}
      />
    </Label>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  margin-left: 8px;
`;

const Label = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default LabelContainer;
