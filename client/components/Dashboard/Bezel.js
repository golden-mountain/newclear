import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import SVGInjector from 'svg-injector';

import './assets/bezel/sass/index.scss';

class Bezel extends Component {

  static propTypes = {
    logo: PropTypes.string.isRequired,
    logoPos: PropTypes.array.isRequired,
    portPos: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
    auth: PropTypes.any
  }

  constructor(props) {
    super(props);
    this.statusColors = {
      'UP':'#09942B',
      'DOWN': '#777777',
      'DISABLED': '#999999'
    };
    this.modelStatus = {
      interface: {
        'mgmt': {
          fill: this.statusColors['UP'],
          title: 'UP'
        }
      },
      validInterfaceNum: []
    };
    this.state = {
      modelName: 'th6435',
      netInfo: null,
      validInterfaceNum: null,
      svgDOM: null
    };
  }

  injectorSVG = () => {
    const dom = ReactDOM.findDOMNode(this.refs.bezel);
    SVGInjector(dom, {
      evalScripts: 'once',
      each: svg => {
        const { logo, logoPos } = this.props;
        const logoGroup = svg.querySelector('#bezel-logo');
        if (logoGroup) {
          logoGroup.innerHTML = logo;
          logoGroup.setAttribute('transform', `translate${logoPos[0]} scale${logoPos[1]}`);
        }
        this.setState({ svgDOM: svg });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { netInfo } = this.state;
    if (this.props.auth && !netInfo) this.getNetInfo();
    if (netInfo !== prevState.netInfo) this.setEtherStatus();
    if (prevProps.url !== this.props.url) {
      this.injectorSVG();
    }
  }

  componentDidMount() {
    this.injectorSVG();
    if (this.props.auth) this.getNetInfo();
  }

  setEtherStatus() {
    const { netInfo, svgDOM } = this.state;
    if (!netInfo || !svgDOM) return;

    const { portPos } = this.props;
    const portGroupDOM = svgDOM.querySelector('#bezel-port-group');
    for (const key in portPos) {
      const line = portPos[key];

      // FIXME, shard mode
      const ethernetDOM = document.createElementNS('http://www.w3.org/2000/svg', 'a');
      let netItemInfo;
      if (key === 'management') {
        netItemInfo = {
          fill: this.statusColors['UP'],
          title: 'enable',
          href: '/'
        };
      } else {
        netItemInfo = netInfo[key];
        netItemInfo.href = '/';
      }

      ethernetDOM.setAttribute('xlink:href', netItemInfo.href);
      ethernetDOM.setAttribute('title', netItemInfo.title);
      if (line[0] === 'M') {
        ethernetDOM.innerHTML = `<path fill="${netItemInfo.fill}" d="${line}">${netItemInfo.title}</path>`;
      } else if (line[0] === 'x') {
        ethernetDOM.innerHTML = `<rect fill="${netItemInfo.fill}" ${line}>${netItemInfo.title}</rect>`;
      } else {
        ethernetDOM.innerHTML = `<polygon fill="${netItemInfo.fill}" points="${line}">${netItemInfo.title}</polygon>`;
      }
      portGroupDOM.appendChild(ethernetDOM);
    }
  }

  getNetInfo() {
    fetch('/axapi/v3/interface/ethernet/oper', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.props.auth
      }
    }).then(res => {
      return res.json();
    }).then(data => {
      const netInfo = {};
      const validInterfaceNum = [];
      for (let i = 0; i < data['ethernet-list'].length; i++) {
        const ethernetDataItem = data['ethernet-list'][i];
        netInfo[ethernetDataItem.ifnum] = {
          fill: this.statusColors[ethernetDataItem.oper.state],
          title: `MAC:${ethernetDataItem.oper.mac}\n` +
                  `State:${ethernetDataItem.oper.state}\n` +
                  `Status:${ethernetDataItem.oper['line_protocol']}\n` +
                  `Type:${ethernetDataItem.oper['link_type']}\n` +
                  `Media Type:${ethernetDataItem.oper['media_type']}`
        };
        validInterfaceNum.push(ethernetDataItem.ifnum);
      }
      this.setState({
        netInfo: netInfo,
        validInterfaceNum: validInterfaceNum
      });
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    const { url } = this.props;
    return (
      <img ref="bezel" src={url} />
    );
  }

}

export default Bezel;
