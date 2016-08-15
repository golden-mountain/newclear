import React from 'react';
import Header from 'components/Header';
import List from 'components/List/List';

const listItems = [
  { title: 'One' },
  { title: 'Two' },
  { title: 'Three' },
  { title: 'Four' }
];

export default () => (
  <article className="women">
    <Header title="Blog" className="header-red" />
    <List items={listItems} />
  </article>
);
