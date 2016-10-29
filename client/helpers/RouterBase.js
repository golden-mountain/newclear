import React from 'react';
import { Match } from 'react-router';
// import { TransitionMotion, spring } from 'react-motion';
export const MatchWithFade = Match;

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
  path = ''
  pages = ''

  // state = {
  //   activePage: 'list'
  // }

  buildPath(page) {
    const { path:parentPath } = this.props;
    if (parentPath == this.path) {
      if ( parentPath == page ) {
        return `/${page}`;
      } else {
        return `/${parentPath}/${page}`;
      }
    } else {
      return `/${parentPath}/${this.path}/${page}`;
    }
  }

  render() {    
    return (
      <div>
        {
          Object.entries(this.pages).map(([ pageName, PageComponent ]) => {
            const path = this.buildPath(pageName);
            // console.log(path);
            return <MatchWithFade key={path} pattern={path} component={PageComponent} />;
          })
        }
      </div>
    );
  }
  
}
