/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useApiContext } from '../context/ApiContext';
const empty_image =
  'https://thumbs.dreamstime.com/b/image-not-available-icon-image-not-available-icon-set-default-missing-photo-stock-vector-symbol-black-filled-330249482.jpg';

const AccordionContainer = styled.div<{ $isOpen: boolean }>`
  background-color: ${({ $isOpen }) => ($isOpen ? '#15191d' : '#34495e')};
  color: white;
  margin: 10px 0;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const AccordionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  cursor: pointer;
`;

const AccordionHeaderContent = styled.div`
  display: flex;
  align-items: center;
`;

const ProviderName = styled.div`
  font-size: 16px;
`;

const AccordionContent = styled.div<{ $isOpen: boolean }>`
  background-color: #2c3e50;
  padding: 10px 20px;
  transition: max-height 0.3s ease-out;
  max-height: ${({ $isOpen }) => ($isOpen ? '300px' : '0')};
  overflow: hidden;
`;

const ScrollableContent = styled.div`
  max-height: 200px;
  overflow-y: auto;
`;

const AccordionInnerContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 5px;
`;

const Title = styled.h4`
  color: white;
  margin: 0;
`;

const ApiContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 2px 0;
  cursor: pointer;
`;

interface AccordionProps {
  provider: string;
  loadApis: (provider: string) => void;
  apiDetail: Record<string, any> | null;
}

const Accordion: React.FC<AccordionProps> = ({
  provider,
  loadApis,
  apiDetail,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { setApiData } = useApiContext();

  const handleAccordionClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      loadApis(provider);
    }
  };

  const handleApiClick = (apiName: string, api: object) => {
    setApiData(api);
    navigate(`/details`);
  };

  return (
    <AccordionContainer $isOpen={isOpen}>
      <AccordionHeader onClick={handleAccordionClick}>
        <AccordionHeaderContent>
          <ProviderName>{provider}</ProviderName>
        </AccordionHeaderContent>
        <span>{isOpen ? '-' : '+'}</span>
      </AccordionHeader>
      <AccordionContent $isOpen={isOpen}>
        <ScrollableContent>
          {apiDetail ? (
            <AccordionInnerContent>
              {Object.entries(apiDetail).map(([apiKey, api]) => (
                <ApiContainer
                  key={apiKey}
                  onClick={() => handleApiClick(apiKey, api)}
                >
                  {api.info?.['x-logo'] && (
                    <Icon
                      src={api?.info['x-logo']?.url ?? empty_image}
                      alt={apiKey}
                    />
                  )}
                  <Title>{api.info?.title ?? 'No title available'}</Title>
                </ApiContainer>
              ))}
            </AccordionInnerContent>
          ) : (
            <p>Loading...</p>
          )}
        </ScrollableContent>
      </AccordionContent>
    </AccordionContainer>
  );
};

export default Accordion;
