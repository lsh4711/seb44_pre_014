import moment from 'moment';
import React from 'react';
import styled from 'styled-components';

type UserProps = {
  memberId: string;
  name: string;
  img: string;
  site: string;
  createdAt: string;
};

const UserInfo: React.FC<UserProps> = (props) => {
  // const handleImgError = (event: React.SyntheticEvent<HTMLImageElement>) => {
  //   event.currentTarget.style.display = 'none';
  // };
  const handleImgError = (e) => {
    e.target.src = 'https://i.ibb.co/gwgngJy/cutecat.jpg';
  };
  return (
    <UserInfoContainer>
      <div>asked {moment(props.createdAt).fromNow()}</div>
      <UserDetail>
        <img src={props.img} onError={handleImgError} />
        <UserFollow>
          <a href={props.site}>{props.name}</a>
          <span>{props.memberId}</span>
        </UserFollow>
      </UserDetail>
    </UserInfoContainer>
  );
};

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  margin-right: 30px;
  font-size: 13px;
  margin-top: 10px;
  color: var(--black-500);
  /* background-color: #d9e9f7; */
  padding: 5px 6px 7px 7px;
  border-radius: 3px;
`;

const UserDetail = styled.div`
  display: flex;
  padding-top: 3px;

  p {
    margin-left: 0;
  }

  img {
    width: 32px;
    height: 32px;
    margin-right: 5px;
    border-radius: 2px;
  }

  a {
    font-size: 12px;
    color: var(--blue-600);
    text-decoration: none;
    cursor: pointer;
  }
`;
const UserFollow = styled.div`
  display: flex;
  flex-direction: column;

  span {
    margin-top: 3px;
    font-weight: 600;
  }
`;
export default UserInfo;
