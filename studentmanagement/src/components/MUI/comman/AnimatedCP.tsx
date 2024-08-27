import { Component } from "react";
import styled, { keyframes } from 'styled-components';
import { bounce,slideInLeft } from 'react-animations';
import preset from 'jss-preset-default'
import jss from 'jss'

const BounceAnimation = keyframes`${slideInLeft}`;
jss.setup(preset())
 
const {classes} = jss.createStyleSheet({
  '@keyframes bounce': bounce,
  bounce: {
    animationName: bounce,
    animationDuration: '3s',
  },
}).attach()

const BouncyDiv = styled.div`
  animation: 1s ${BounceAnimation};
`;

type ToolProps = {
  element: any;
};

class AnimatedCP extends Component<ToolProps, any> {
  render() {
    return (  
        <BouncyDiv>
          {this.props.element}
        </BouncyDiv>
    );
  }
}

export default AnimatedCP;
