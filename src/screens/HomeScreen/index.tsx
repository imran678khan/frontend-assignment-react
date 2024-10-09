/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getProviderDetail, getProviders } from '../../api/providers';
import Accordion from '../../components/Accordion';

const Drawer = styled.div<{ $isOpen: boolean }>`
  width: 500px;
  background: #2c3e50;
  color: white;
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
  transform: ${({ $isOpen }) =>
    $isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease-in-out;
  box-shadow: ${({ $isOpen }) =>
    $isOpen ? '-4px 0px 8px rgba(0, 0, 0, 0.2)' : 'none'};
`;

const Overlay = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
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

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #2f5881;
`;

const HomeScreen: React.FC = () => {
  const [providers, setProviders] = useState<string[]>([]);
  const [apiDetails, setApiDetails] = useState<{ [key: string]: any }>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (sidebarOpen) {
      fetchProviders();
    }
  }, [sidebarOpen]);

  const fetchProviders = async () => {
    const response = await getProviders();
    setProviders(response.data);
  };

  const loadApis = async (provider: string) => {
    const response = await getProviderDetail(provider);
    if (response.apis) {
      setApiDetails((prev) => ({
        ...prev,
        [provider]: response.apis,
      }));
    }
  };

  return (
    <div>
      <Overlay $isVisible={sidebarOpen} onClick={() => setSidebarOpen(false)} />
      <Drawer $isOpen={sidebarOpen}>
        <h2>Select Provider</h2>
        {providers?.map((provider) => (
          <Accordion
            key={provider}
            provider={provider}
            loadApis={loadApis}
            apiDetail={apiDetails[provider] || null}
          />
        ))}
      </Drawer>

      <CenterContainer>
        <Button onClick={() => setSidebarOpen(!sidebarOpen)}>
          Explore web APIs
        </Button>
      </CenterContainer>
    </div>
  );
};

export default HomeScreen;
