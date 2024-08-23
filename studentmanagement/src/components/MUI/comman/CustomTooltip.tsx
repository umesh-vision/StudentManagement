import { Theme, Tooltip, withStyles } from "@material-ui/core";
import { Component } from "react";

// Define props for the CustomTooltip component
type ToolProps = {
  option: any;
  possition: any;
  setTitle: string;
  st: { color: string; bgcolor: string };
};

// Styled component using withStyles and accepting dynamic styles based on props
const LightTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: (props: ToolProps) => props.st.bgcolor || theme.palette.common.white,
    color: (props: ToolProps) => props.st.color || "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

export class CustomTooltip extends Component<ToolProps, any> {
  constructor(props: ToolProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <LightTooltip
        title={this.props.setTitle}
        placement={this.props.possition}
        {...this.props} 
      >
        {this.props.option}
      </LightTooltip>
    );
  }
}

export default CustomTooltip;
