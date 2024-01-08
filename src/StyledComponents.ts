import styled, { keyframes } from 'styled-components';

export const MainTag = styled.div`
  background-color: white;
  color: black;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-size: calc(10px + 1vmin);
`;

export const rotate360 = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid #858cdd;
  border-right: 2px solid #858cdd;
  border-bottom: 2px solid #858cdd;
  border-left: 4px solid #858cdd;
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin: 1rem auto;
`;

export const StyledNav = styled.nav`
  background: #eeeeee;
  padding: 1rem;
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  margin: 0 20px;
  border-radius: 10px;
`;

export const NavLink = styled.span`
  color: black;
  margin: 0 15px;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.5s;
  text-decoration: none;

  &:hover {
    color: red;
    text-decoration: underline;
  }
`;

export const RatesTable = styled.table`
  border-collapse: collapse;
  margin: 1rem auto;
  max-width: 100%;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
    min-width: 120px;
  }

  th {
    background-color: #f2f2f2;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

interface StyledPageButtonProps {
  isActive: boolean;
}

export const StyledPageButton = styled.button<StyledPageButtonProps>`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: ${props => props.isActive ? 'grey' : 'white'};
  color: ${props => props.isActive ? 'white' : 'black'};
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: black;
    color: white;
  }

  &:disabled {
    background-color: lightgrey;
    color: grey;
    cursor: default;
  }
` as React.FC<StyledPageButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>>;


export const ConverterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #ccc;
  margin: 1rem 1.3rem;
`;

export const ConverterControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const StyledInput = styled.input`
  margin: 10px;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const StyledSelect = styled.select`
  margin: 10px;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
`;

export const StyledButton = styled.button`
  margin: 10px;
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

