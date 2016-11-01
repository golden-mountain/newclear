import React from 'react';
import { Match } from 'react-router';
import { set } from 'lodash';

// import { TransitionMotion, spring } from 'react-motion';
// import BallKicker from 'helpers/BallKicker';
// import { REDIRECT_ROUTE } from 'configs/messages';

export const MatchWithFade = ({ component:Component, paths, ...rest }) => {
  return (
    <Match {...rest} render={(props) => (
      (<Component {...props} paths={paths} />)
    )} />
  );
};

// export const MatchWithFade = ({ component:Component, ...rest }) => {
//   const willLeave = () => ({ zIndex: 1, opacity: spring(0) });

//   const styles = {
//     fill: {
//       position: 'absolute',
//       left: 0,
//       right: 0,
//       top: 0,
//       bottom: 0
//     }
//   };

//   return (
//     <Match {...rest} children={({ matched, ...props }) => {
//       return (<TransitionMotion
//         willLeave={willLeave}
//         styles={matched ? [ {
//           key: props.location.pathname,
//           style: { opacity: 1 },
//           data: props
//         } ] : []}
//       >
//         {interpolatedStyles => (
//           <div>
//             {interpolatedStyles.map(config => (
//               <div
//                 key={config.key}
//                 style={{ ...styles.fill, ...config.style }}
//               >
//                 <Component {...config.data}/>
//               </div>
//             ))}
//           </div>
//         )}
//       </TransitionMotion>);
//     }}/>
//   );
// };

export default class RouterBase extends React.Component {
  static paths = {}
  path = ''
  pages = {}
  activePath = ''

  // state = {
  //   activePath: '',
  //   params: {}
  // }

  // constructor(props) {
  //   super(props);
  //   this.ballKicker = new BallKicker();
  //   this.ballKicker.accept([], REDIRECT_ROUTE, (from, to, { path, params }) => {
  //     if (RouterBase.paths[path]) {
  //       this.setState({ activePath: RouterBase.paths[path], params: params });
  //     }
  //   }, []);
  // }

  // shouldComponentUpdate(nextProps, nextState) { // eslint-disable-line
  //   // console.log(nextState, this.state);
  //   return !isEqual(this.state, nextState);
  // }

  get paths() {
    return RouterBase.paths;
  }

  buildPath(page) {
    const { path:parentPath } = this.props;
    if (parentPath == this.path) {
      if ( parentPath == page ) {
        return [ page ];
      } else {
        return [ this.path, page ];
      }
    } else {
      return [ parentPath, this.path, page ];
    }
  }

  render() {
    return (
      <div>
        {
          Object.entries(this.pages).map(([ pageName, PageComponent ]) => {
            const paths = this.buildPath(pageName);
            const path = '/' + paths.join('/');
            set(RouterBase.paths, paths.join('.'), path);
            return <MatchWithFade key={path} pattern={path} component={PageComponent} paths={this.paths} />;
          })
        }
      </div>
    );
  }

}
