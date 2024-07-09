import { Fragment,Component} from 'react'
import Navigation from './Navigation';
import withAuth from '../../context/AuthContextExtenstion';

export interface LayoutProps{
  navigation: any
};

class Layout extends Component<LayoutProps> {
  render(){
    return (
      <Fragment>
        <Navigation />
        <main>{this.props.navigation}</main>
      </Fragment>
    )
  }
}
export default withAuth(Layout);

