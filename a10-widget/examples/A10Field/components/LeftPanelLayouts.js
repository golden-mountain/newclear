import React from 'react';
import fuzzy from 'fuzzy';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Panel from 'react-bootstrap/lib/Panel';

export default class LeftPanelLayout extends React.Component {
  static propTypes = {
    searchingLayoutName: React.PropTypes.string,
    layouts: React.PropTypes.object.isRequired,
    onLayoutChange: React.PropTypes.func,
    tileStyle: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      searchingLayoutName,
      layouts,
      onLayoutChange,
      tileStyle
    } = this.props;
    return (
      <div>
        <FormGroup>
          <InputGroup>
            <FormControl 
              type="text" 
              placeholder="Search layouts"
              value={searchingLayoutName}
              onChange={this.onSearchingLayoutName}
            />
            <InputGroup.Addon>
              <i className="fa fa-search" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          searchingLayoutName && (
            <Panel header={
              <div>
                <span>Search Result</span>
                <i className="fa fa-close pull-right" style={{ cursor: 'pointer' }} onClick={this.clearSearchingLayoutName}/>
              </div>
            }>
              {
                fuzzy.filter(searchingLayoutName, Object.values(layouts), {
                  pre: '<strong style="color: blue;">',
                  post: '</strong>',
                  extract: item => item.name
                })
                .map(item=> Object.assign({}, item.original, {
                  name: (
                    <span dangerouslySetInnerHTML={{ __html: item.string }}/>
                  )
                }))
                .map((item, index) => {
                  return (
                    <span
                      key={index}
                      style={tileStyle}
                      onClick={onLayoutChange.bind(this, item.schema)}
                    >
                      <i className={item.iconClassName} />
                      <br />
                      {item.name}
                    </span>
                  );
                })
              }
            </Panel>
          )
        }
        
        <PanelGroup accordion defaultActiveKey="basic">
          <Panel header="basic" eventKey="basic" key="basic">
            {
              Object.values(layouts).map((item, index)=>{
                return (
                  <span
                    key={index}
                    style={tileStyle}
                    title={item.name}
                    onClick={onLayoutChange.bind(this, item.schema)}
                  >
                    <i className={item.iconClassName} />
                    <br />
                    {item.name}
                  </span>
                );
              })
            }
          </Panel>
        </PanelGroup>
      </div>
    );
  }
}
