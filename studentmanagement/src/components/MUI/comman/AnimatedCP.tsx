import { Component } from "react";
import styled, { keyframes } from 'styled-components';
import { bounce } from 'react-animations';

const BounceAnimation = keyframes`${bounce}`;

// Create styled components with the animation
const BouncyDiv = styled.div`
  animation: 2s ${BounceAnimation};
`;

const AnimatedButton = styled.button`
  animation: 2s ${BounceAnimation};
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

class AnimatedCP extends Component<any, any> {
  render() {
    return (
       <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <BouncyDiv>
          <h1>Bouncing Text!</h1>
        </BouncyDiv>
        <AnimatedButton>Bounce Button</AnimatedButton>
      </div>
    );
  }
}

export default AnimatedCP;
