import React, { useEffect, useState } from 'react';
import { useApiContext } from '../../context/ApiContext';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const emptyImage =
  'https://thumbs.dreamstime.com/b/image-not-available-icon-image-not-available-icon-set-default-missing-photo-stock-vector-symbol-black-filled-330249482.jpg';

const Container = styled.div`
  height: 100vh;
  background: #2f5881;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 50px;
  align-items: center;
`;

const InnerContainer = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`;

const Icon = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 5px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Heading = styled.h3`
  color: white;
  margin-top: 20px;
`;

const Description = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
`;

const ContactInfo = styled.div`
  width: 100%;
`;

const ContactDetail = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const ContactUrl = styled.a`
  font-size: 16px;
  color: white;
  text-decoration: none;
`;

const NoDataFound = styled.div`
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 15px 30px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 18px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #2f5881;
`;

const DetailsScreen: React.FC = () => {
  const { apiData } = useApiContext();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (apiData) {
      setLoading(false);
    }
  }, [apiData]);

  if (loading) return <NoDataFound>Loading...</NoDataFound>;

  if (!apiData) return <NoDataFound>No API data available.</NoDataFound>;

  const { info, swaggerUrl } = apiData;
  const { title, description, contact, ['x-logo']: logo } = info || {};

  const navigateToHome = () => {
    navigate(`/`);
  };

  return (
    <Container>
      <InnerContainer>
        <Header>
          {logo && <Icon src={logo.url ?? emptyImage} alt={title} />}
          <Title>{title}</Title>
        </Header>
        <Heading>Description</Heading>
        <Description dangerouslySetInnerHTML={{ __html: description }} />
        <Heading>Swagger</Heading>
        <ContactUrl>{swaggerUrl}</ContactUrl>

        <Heading>Contact</Heading>
        <ContactInfo>
          {contact?.email && (
            <ContactDetail>Email: {contact.email}</ContactDetail>
          )}
          {contact?.name && <ContactDetail>Name: {contact.name}</ContactDetail>}
          {contact?.url && (
            <ContactUrl
              href={contact.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Url: {contact.url}
            </ContactUrl>
          )}
        </ContactInfo>
      </InnerContainer>
      <ButtonWrapper>
        <Button onClick={navigateToHome}>Explore more APIs</Button>
      </ButtonWrapper>
    </Container>
  );
};

export default DetailsScreen;
