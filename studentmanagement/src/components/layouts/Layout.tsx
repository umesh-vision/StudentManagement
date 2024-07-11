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
        <div className='padding-top'>{this.props.navigation}</div>
      </Fragment>
    )
  }
}
export default withAuth(Layout);

