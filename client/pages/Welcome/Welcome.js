import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import './assets/sass/index.scss';

class Welcome extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // FIXME. using action
    document.cookie = 'isFirst=false';
  }

  render() {
    const solutions = [
      {
        title: 'ADC Application',
        description: 'Copywriter<br/>Copywriter'
      },
      {
        title: 'Security Application',
        description: 'Copywriter<br/>Copywriter'
      },
      {
        title: 'ADC Application',
        description: 'Copywriter<br/>Copywriter'
      }
    ];
    return (
      <div id="welcome-container">
        <section>
          <h1>Welcome to choose Thunder 830 Series</h1>
          <div>
            <p>We wish you a merry Christmas</p>
            <p>We wish you a merry Christmas</p>
            <p>We wish you a merry Christmas</p>
            <p>And a happy New Year</p>
          </div>
        </section>
        <section>
          <h3 id="sub-title">Choose App you want to deploy on this device</h3>
          <div className="row recommend-solution-container">
            {
              solutions.map((item, index) => {
                return (
                  <div className="col-md-4" key={index}>
                    <div className="">
                      <img alt="100%x200" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQyIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI0MiAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MjAwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTU5MTEwYzRjNjUgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMnB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTkxMTBjNGM2NSI+PHJlY3Qgd2lkdGg9IjI0MiIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI4OS44NTkzNzUiIHk9IjEwNS4xIj4yNDJ4MjAwPC90ZXh0PjwvZz48L2c+PC9zdmc+" />
                      <div className="caption">
                        <h4>{item.title}</h4>
                        <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
                        <div className="sub-title">
                          <span className="glyphicon glyphicon-thumbs-up"/>Recommend Solutions:
                        </div>
                        <div className="solution-row">
                          <a href="#">Microsoft</a>
                          <a href="#">Google</a>
                          <a href="#">L2 Single Line</a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </section>
        <div className="toolbar">
          <Button>Skip</Button>
        </div>
      </div>
    );
  }

}
export default Welcome;
