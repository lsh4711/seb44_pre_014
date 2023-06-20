import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import Sidebar from 'components/Sidebar/Sidebar';
import styled from 'styled-components';

/*ContentContainer안에 컴포넌트 넣어서 페이지 구성 */

const TestPageh = () => {
  return (
    <div>
      <Header />
      <DivContainer>
        <Sidebar />
        <ContentContainer>
          <div>contents</div>
        </ContentContainer>
      </DivContainer>
      <Footer />
    </div>
  );
};

export default TestPageh;

const DivContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: var(--black-050);
`;
const ContentContainer = styled.div``;
