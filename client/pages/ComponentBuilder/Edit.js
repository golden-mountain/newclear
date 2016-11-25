import React, { PropTypes } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext as dragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ComponentBuilderSidebar from '../../components/ComponentBuilderSidebar/ComponentBuilderSidebar';
import ComponentBuilderSandbox from '../../components/ComponentBuilderSandbox/ComponentBuilderSandbox';
import ComponentBuilderProperties from '../../components/ComponentBuilderProperties/ComponentBuilderProperties';
import ComponentBuilderExportModal from '../../components/ComponentBuilderExportModal/ComponentBuilderExportModal';
import RightSideHelper from '../../components/RightSideHelper/RightSideHelper';


import {
  stopEditingComponent
} from '../../redux/modules/componentBuilder';

@dragDropContext(HTML5Backend)
@connect(
  state => ({ ...state.componentBuilder }), {
    stopEditingComponent
  }
)
export default class ComponentBuilder extends React.Component {

  static propTypes = {
    sandboxValue: PropTypes.object,
    editingComponentProps: PropTypes.object,
    editingComponentPropTypes: PropTypes.object,
    isEditingProps: PropTypes.bool,
    editingComponentId: PropTypes.string,
    stopEditingComponent: PropTypes.func,
    routes: PropTypes.array
  }

  state = {
    showPropertiesModal: false,
    enablePreview: false
  }

  onKeyUp(event) {
    if (event.keyCode === 13 || event.keyCode === 27) {
      this.props.stopEditingComponent();
    }
  }

  closePropertiesModal() {
    this.setState({ showPropertiesModal: false });
  }

  openPropertiesModal(event) {
    event.preventDefault();
    this.setState({ showPropertiesModal: true });
  }

  switchPreview(event) {
    event.preventDefault();
    this.setState({ enablePreview: !this.state.enablePreview });
  }

  render() {
    const {
      sandboxValue,
      isEditingProps,
      editingComponentId,
      editingComponentProps,
      editingComponentPropTypes
    } = this.props;
    const {
      enablePreview
    } = this.state;

    return (
      <div className="container-fluid" onKeyUp={::this.onKeyUp}>
        <Row>
          <Col xs={4}>
            <ComponentBuilderSidebar />
          </Col>
          <Col xs={8}>
            <ComponentBuilderSandbox
              editingComponentId={editingComponentId}
              enablePreview={enablePreview}
              active={enablePreview}
              value={sandboxValue}
            />
            <ButtonToolbar>
              <Button bsStyle="info" onClick={::this.switchPreview}>
                { enablePreview ? (
                  <span><i className="fa fa-pencil"/>&nbsp;Edit</span>
                  ) : (
                  <span><i className="fa fa-eye"/>&nbsp;Preview</span>
                  )
                }
              </Button>
              <Button bsStyle="success" onClick={::this.openPropertiesModal}>
                Export
              </Button>
            </ButtonToolbar>
          </Col>
          <RightSideHelper show={isEditingProps}>
            <ComponentBuilderProperties
              editingComponentId={editingComponentId}
              componentProps={editingComponentProps}
              componentPropTypes={editingComponentPropTypes}
            />
          </RightSideHelper>
        </Row>
        <ComponentBuilderExportModal
          show={this.state.showPropertiesModal}
          onHide={::this.closePropertiesModal}
          container={this}
          aria-labelledby="contained-modal-title"
          sandboxValue={sandboxValue}
        />
      </div>
    );
  }
}
