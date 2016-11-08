import React from 'react';
import ContentWrapper from './jsx/Layout/ContentWrapper';


class PageLayout extends React.Component {

  render() {
    const { title, description, children } = this.props;

    return (
      <ContentWrapper>
        <h3>
          {title}
           <small>{description}</small>
        </h3>
        { children }
      </ContentWrapper>
    );
  }

}

export default PageLayout;
