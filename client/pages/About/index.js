import React from 'react';
import Header from 'components/Header';
import List from 'components/List/List';

const listItems = [
  { title: 'Expand me 2', content: 'Thank you' },
  { title: 'Click me', content: 'Saved me' },
  { title: 'Tap me', content: 'Hey, watch it!' },
  { title: 'Open me', content: 'I am free' }
];

export default () => (
  <article className="home">
    <Header title="About" className="header-blue" />
    <List items={listItems} collapsible />
  </article>
);
