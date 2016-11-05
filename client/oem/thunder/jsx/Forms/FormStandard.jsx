import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Input, DropdownButton, MenuItem } from 'react-bootstrap';

class FormStandard extends React.Component {

    render() {

        const innerIcon = <em className="fa fa-check"></em>;
        const innerButton = <Button>Before</Button>;
        const innerDropdown = (
        <DropdownButton title="Action" id="input-dropdown-addon">
            <MenuItem key="1">Item</MenuItem>
        </DropdownButton>
        );
        const innerRadio = <input standalone type="radio" aria-label="..." />;
        const innerCheckbox = <input standalone type="checkbox" aria-label="..." />;

        return (
            <ContentWrapper>
                <h3>Form Elements
                               <small>Standard and custom elements for any form</small>
                            </h3>
                { /* START panel */ }
                <Panel header="Inline form">
                    <form role="form" className="form-inline">
                        <div className="form-group">
                            <label htmlFor="input-email" className="sr-only">Email address</label>
                            <Input id="input-email" type="email" placeholder="Type your email" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="input-password" className="sr-only">Password</label>
                            <Input id="input-password" type="password" placeholder="Type your password" className="form-control" />
                        </div>
                        <div className="checkbox c-checkbox">
                            <label>
                                <input standalone type="checkbox" />
                                <em className="fa fa-check"></em>Remember</label>
                        </div>
                        <Button type="submit" bsStyle="default">Sign in</Button>
                    </form>
                </Panel>
                { /* END panel */ }
                { /* START row */ }
                <Row>
                    <Col sm={ 6 }>
                        { /* START panel */ }
                        <Panel header="Stacked form">
                            <form role="form">
                                <div className="form-group">
                                    <label>Email address</label>
                                    <Input standalone type="email" placeholder="Enter email" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <Input standalone type="password" placeholder="Password" className="form-control" />
                                </div>
                                <div className="checkbox c-checkbox">
                                    <label>
                                        <input standalone type="checkbox" defaultChecked />
                                        <em className="fa fa-times"></em>Check me out</label>
                                </div>
                                <Button type="submit" bsStyle="default" bsSize="small">Submit</Button>
                            </form>
                        </Panel>
                        { /* END panel */ }
                    </Col>
                    <Col sm={ 6 }>
                        { /* START panel */ }
                        <Panel header="Horizontal form">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <label className="col-lg-2 control-label">Email</label>
                                    <Col lg={ 10 }>
                                        <Input standalone type="email" placeholder="Email" className="form-control" />
                                    </Col>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label">Password</label>
                                    <Col lg={ 10 }>
                                        <Input standalone type="password" placeholder="Password" className="form-control" />
                                    </Col>
                                </div>
                                <div className="form-group">
                                    <Col lgOffset={ 2 } lg={ 10 }>
                                        <div className="checkbox c-checkbox">
                                            <label>
                                                <input standalone type="checkbox" defaultChecked />
                                                <em className="fa fa-check"></em>Remember me</label>
                                        </div>
                                    </Col>
                                </div>
                                <div className="form-group">
                                    <Col lgOffset={ 2 } lg={ 10 }>
                                        <Button type="submit" bsStyle="default" bsSize="small">Sign in</Button>
                                    </Col>
                                </div>
                            </form>
                        </Panel>
                        { /* END panel */ }
                    </Col>
                </Row>
                { /* END row */ }
                { /* START panel */ }
                <Panel header="Form elements">
                    <form method="get" action="/" className="form-horizontal">
                        <fieldset>
                            <legend>Classic inputs</legend>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Rounded Corners</label>
                                <Col sm={ 10 }>
                                    <Input standalone type="text" className="form-control form-control-rounded" />
                                </Col>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">With help</label>
                                <Col sm={ 10 }>
                                    <Input standalone type="text" className="form-control" />
                                    <span className="help-block m-b-none">A block of help text that breaks onto a new line and may extend beyond one line.</span>
                                </Col>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="input-id-1" className="col-sm-2 control-label">Label focus</label>
                                <Col sm={ 10 }>
                                    <Input standalone id="input-id-1" type="text" className="form-control" />
                                </Col>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Password</label>
                                <Col sm={ 10 }>
                                    <Input standalone type="password" name="password" className="form-control" />
                                </Col>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Placeholder</label>
                                <Col sm={ 10 }>
                                    <Input standalone type="text" placeholder="placeholder" className="form-control" />
                                </Col>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label className="col-lg-2 control-label">Disabled</label>
                                <Col lg={ 10 }>
                                    <Input standalone type="text" placeholder="Disabled input here..." disabled className="form-control" />
                                </Col>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label className="col-lg-2 control-label">Static control</label>
                                <Col lg={ 10 }>
                                    <p className="form-control-static">email@example.com</p>
                                </Col>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Checkboxes and radios</label>
                                <Col sm={ 10 }>
                                    <div className="checkbox">
                                        <label>
                                            <input standalone type="checkbox" value="" />Option one is this and that—be sure to include why it's great</label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input id="optionsRadios1" type="radio" name="optionsRadios" value="option1" defaultChecked />Option one is this and that—be sure to include why it's great</label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input id="optionsRadios2" type="radio" name="optionsRadios" value="option2" />Option two can be something else and selecting it will deselect option one</label>
                                    </div>
                                </Col>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Inline checkboxes</label>
                                <Col sm={ 10 }>
                                    <label className="checkbox checkbox-inline">
                                        <input id="inlineCheckbox1" type="checkbox" value="option1" />a</label>
                                    <label className="checkbox-inline">
                                        <input id="inlineCheckbox2" type="checkbox" value="option2" />b</label>
                                    <label className="checkbox-inline">
                                        <input id="inlineCheckbox3" type="checkbox" value="option3" />c</label>
                                </Col>
                            </div>
                        </fieldset>
                        <fieldset className="last-child">
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Select</label>
                                <Col sm={ 10 }>
                                    <Input standalone type="select" name="account" className="form-control m-b">
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                    <option>Option 3</option>
                                    <option>Option 4</option>
                                    </Input>
                                    <br/>
                                    <Row>
                                        <div className="col-lg-4">
                                            <Input standalone type="select" multiple="" className="form-control">
                                            <option>Option 1</option>
                                            <option>Option 2</option>
                                            <option>Option 3</option>
                                            <option>Option 4</option>
                                            </Input>
                                        </div>
                                    </Row>
                                </Col>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Input variants</legend>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Custom Checkboxes &amp; radios</label>
                                <Col sm={ 10 }>
                                    <div className="checkbox c-checkbox needsclick">
                                        <label className="needsclick">
                                            <input standalone type="checkbox" value="" className="needsclick" />
                                            <em className="fa fa-check"></em>Option one</label>
                                    </div>
                                    <div className="checkbox c-checkbox">
                                        <label>
                                            <input standalone type="checkbox" defaultChecked value="" />
                                            <em className="fa fa-check"></em>Option two checked</label>
                                    </div>
                                    <div className="checkbox c-checkbox">
                                        <label>
                                            <input standalone type="checkbox" defaultChecked disabled value="" />
                                            <em className="fa fa-check"></em>Option three checked and disabled</label>
                                    </div>
                                    <div className="checkbox c-checkbox">
                                        <label>
                                            <input standalone type="checkbox" disabled value="" />
                                            <em className="fa fa-check"></em>Option four disabled</label>
                                    </div>
                                    <div className="radio c-radio">
                                        <label>
                                            <input standalone type="radio" name="a" value="option1" />
                                            <em className="fa fa-circle"></em>Option one</label>
                                    </div>
                                    <div className="radio c-radio">
                                        <label>
                                            <input standalone type="radio" name="a" value="option2" defaultChecked />
                                            <em className="fa fa-circle"></em>Option two checked</label>
                                    </div>
                                    <div className="radio c-radio">
                                        <label>
                                            <input standalone type="radio" value="option2" defaultChecked disabled />
                                            <em className="fa fa-circle"></em>Option three checked and disabled</label>
                                    </div>
                                    <div className="radio c-radio">
                                        <label>
                                            <input standalone type="radio" name="a" disabled/>
                                            <em className="fa fa-circle"></em>Option four disabled</label>
                                    </div>
                                </Col>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Inline checkboxes</label>
                                <Col sm={ 10 }>
                                    <label className="checkbox-inline c-checkbox">
                                        <input id="inlineCheckbox10" type="checkbox" value="option1" />
                                        <em className="fa fa-check"></em>a</label>
                                    <label className="checkbox-inline c-checkbox">
                                        <input id="inlineCheckbox20" type="checkbox" value="option2" />
                                        <em className="fa fa-check"></em>b</label>
                                    <label className="checkbox-inline c-checkbox">
                                        <input id="inlineCheckbox30" type="checkbox" value="option3" />
                                        <em className="fa fa-check"></em>c</label>
                                </Col>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Rounded</label>
                                <Col sm={ 10 }>
                                    <label className="checkbox c-checkbox c-checkbox-rounded">
                                        <input id="roundedcheckbox10" type="checkbox" defaultChecked />
                                        <em className="fa fa-check"></em>Lorem</label>
                                    <label className="checkbox c-checkbox c-checkbox-rounded">
                                        <input id="roundedcheckbox20" type="checkbox" />
                                        <em className="fa fa-check"></em>Ipsum</label>
                                </Col>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Inline radios</label>
                                <Col sm={ 10 }>
                                    <label className="radio-inline c-radio">
                                        <input id="inlineradio1" type="radio" name="i-radio" value="option1" defaultChecked />
                                        <em className="fa fa-circle"></em>a</label>
                                    <label className="radio-inline c-radio">
                                        <input id="inlineradio2" type="radio" name="i-radio" value="option2" />
                                        <em className="fa fa-circle"></em>b</label>
                                    <label className="radio-inline c-radio">
                                        <input id="inlineradio3" type="radio" name="i-radio" value="option3" />
                                        <em className="fa fa-circle"></em>c</label>
                                </Col>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Custom icons</label>
                                <Col sm={ 10 }>
                                    <label className="radio-inline c-radio">
                                        <input id="inlineradio10" type="radio" name="i-radio" value="option1" defaultChecked />
                                        <em className="fa fa-check"></em>a</label>
                                    <label className="radio-inline c-radio">
                                        <input id="inlineradio20" type="radio" name="i-radio" value="option2" defaultChecked />
                                        <em className="fa fa-user"></em>b</label>
                                    <label className="radio-inline c-radio">
                                        <input id="inlineradio30" type="radio" name="i-radio" value="option3" defaultChecked />
                                        <em className="fa fa-tint"></em>c</label>
                                    <br/>
                                    <label className="checkbox-inline c-checkbox">
                                        <input id="inlinecheckbox10" type="checkbox" value="option1" defaultChecked />
                                        <em className="fa fa-star"></em>a</label>
                                    <label className="checkbox-inline c-checkbox">
                                        <input id="inlinecheckbox20" type="checkbox" value="option2" defaultChecked />
                                        <em className="fa fa-heart"></em>b</label>
                                    <label className="checkbox-inline c-checkbox">
                                        <input id="inlinecheckbox30" type="checkbox" value="option3" defaultChecked />
                                        <em className="fa fa-bell"></em>c</label>
                                </Col>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group has-success">
                                <label className="col-sm-2 control-label">Input with success</label>
                                <Col sm={ 10 }>
                                    <Input standalone type="text" className="form-control" />
                                </Col>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group has-warning">
                                <label className="col-sm-2 control-label">Input with warning</label>
                                <Col sm={ 10 }>
                                    <Input standalone type="text" className="form-control" />
                                </Col>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group has-error">
                                <label className="col-sm-2 control-label">Input with error</label>
                                <Col sm={ 10 }>
                                    <Input standalone type="text" className="form-control" />
                                </Col>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Control sizing</label>
                                <Col sm={ 10 }>
                                    <Input standalone type="text" placeholder=".input-lg" className="form-control input-lg m-b" />
                                    <br/>
                                    <Input standalone type="text" placeholder="Default input" className="form-control m-b" />
                                    <br/>
                                    <Input standalone type="text" placeholder=".input-sm" className="form-control input-sm" />
                                </Col>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Column sizing</label>
                                <Col sm={ 10 }>
                                    <Row>
                                        <div className="col-md-2">
                                            <Input standalone type="text" standalone placeholder=".col-md-2" className="form-control" />
                                        </div>
                                        <div className="col-md-3">
                                            <Input standalone type="text" standalone placeholder=".col-md-3" className="form-control" />
                                        </div>
                                        <div className="col-md-4">
                                            <Input standalone type="text" standalone placeholder=".col-md-4" className="form-control" />
                                        </div>
                                    </Row>
                                </Col>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Input groups</label>
                                <Col sm={ 10 }>
                                    <Input standalone type="text" standalone addonBefore="@" />
                                    <br />
                                    <Input standalone type="text" standalone addonAfter=".00" />
                                    <br />
                                    <Input standalone type="text" standalone addonBefore="$" addonAfter=".00" />
                                    <br />
                                    <Input standalone type="text" standalone addonAfter={ innerIcon } />
                                    <br />
                                    <Input standalone type="text" standalone buttonBefore={ innerButton } />
                                    <br />
                                    <Input standalone type="text" standalone buttonAfter={ innerDropdown } />
                                    <br />
                                    <Input standalone type="text" standalone addonBefore={ innerRadio } />
                                    <br />
                                    <Input standalone type="text" standalone addonBefore={ innerCheckbox } />
                                </Col>
                            </div>
                        </fieldset>
                    </form>
                </Panel>
                { /* END panel */ }
            </ContentWrapper>
            );
    }

}

export default FormStandard;
