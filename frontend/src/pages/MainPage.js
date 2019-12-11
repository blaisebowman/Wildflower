import React, {Component} from 'react';
import {Button, Form, Grid, Divider, Segment, Label, Icon, Dropdown, Menu,Card, Placeholder} from 'semantic-ui-react'
import '../pageStyles/MainPage.css'
import axios from 'axios';

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            array: [],
            vis: 1,
            hasClicked: false,
            hasClicked2: false,
            modalIsOpen: false,
            popUp: false,
            toView: [],
            textBased: "",
            flowerInput: "Draperia",
            flowerReturn: 10,
            flowerSightings: []
        };
        this.onHomePress = this.onHomePress.bind(this);
    }
    onHomePress = () => {
        this.props.history.push('/homepage/' + this.props.getId);
    };

    onSubmit = () => {


    };

    handleChange = () => {

    };


    onFlowerList = () => {
        axios.post('http://localhost:8000/api/sightings',  {name: "Draperia"},
            {headers: {'Content-Type': 'application/json'}}
        )
            .then(res => {
               console.log('tried');
               console.log(res.data[0]);
               console.log(res.data.rows[0]);
               console.log (res.data.rows.length);
               console.log(res.data.rows[0].name);
               var b = [];
               this.setState({r1:res.data.rows[0]});
                for (let i = 0, v = res.data.rows.length; i < v; i++){
                    console.log(res.data.rows[i]);
                    this.setState({flowerSightings: this.state.flowerSightings.concat(res.data.rows[i])}, () => console.log(this.state.flowerSightings));
                }
                console.log(this.state.flowerSightings);
console.log(this.state.flowerSightings[0]["NAME"]
    );
            })
            .catch(err => {
                console.log(err);
            })
    };


    onFlowerUpdate = () => {
        //
    };

    onFlowerInsert = () => {
        //
    };
componentDidMount () {
    this.onFlowerList(this);
};



//ERROR BC IT IS RUNNING IN RENDER METHOD _------- DO NOT HAVE ONCLICK RENDER


    render() {
        const options = [
            //HAVE OPTIONS POPULATE FROM THE DATABASE WITH AXIOS REQUEST
            {key: 1, text: 'Draperia', value: 1, onClick: (''), selected: this.state.vis === 1}
        ];

        const trigger = (
            <span><Icon size="large" bordered={false} name='hand point right'/>{'Select a Flower'}</span>
        );

        return (
            <div className="box">
                <fieldset>
                        <Label color = 'grey'><b>Update A Flower's Information</b></Label>
                <Divider />
                    <Grid columns={3}>
                        <Grid.Row>
                        <Grid.Column>
                                <Menu inverted color='grey' className="menu" fluid>
                                    <Menu.Menu className='menu' fluid>
                                        <Button.Group color='grey' className='groups'>
                                            <Dropdown
                                                scrolling
                                                searching
                                                button
                                                simple
                                                fluid
                                                open={this.state.hasClicked2}
                                                closeOnChange={true}
                                                options={options}
                                                trigger={trigger}
                                            />
                                        </Button.Group>
                                    </Menu.Menu>
                                </Menu>
                        </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                        <Grid.Column>
                            <Segment inverted color='teal'>
                                        <Form.Field className='emailInput'>
                                            <label>Genus</label>
                                            <Form>
                                                <input
                                                    placeholder='ex: Carex '
                                                    autoComplete="off"
                                                />
                                            </Form>
                                        </Form.Field>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment inverted color='teal'>
                                <Form.Field className='emailInput'>
                                    <label>Species</label>
                                    <Form>
                                        <input
                                            placeholder='ex: Limosa '
                                            autoComplete="off"
                                        />
                                    </Form>
                                </Form.Field>
                            </Segment>
                        </Grid.Column>
                            <Grid.Column>

                                <Segment inverted color='teal'>
                                    <Form.Field className='emailInput'>
                                        <label>Common Name</label>
                                        <Form>
                                            <input
                                                placeholder='ex: Mud sedge '
                                                autoComplete="off"
                                            />
                                        </Form>
                                    </Form.Field>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column floated="left">
                                <Label style={{margin: '10px'}} size="big" floated="left">
                                    <Icon name='users'/>{this.state.numObservations}
                                </Label>
                            </Grid.Column>
                            <Grid.Column verticalAlign="center">
                                {this.state.popUp === true &&
                                <Button size='medium' color='yellow' onClick={this.closeModal} toggle={!this.popUp}>
                                    <Icon name='remove' color="black"/><b className="text">Warning: Flower not found</b>
                                </Button>
                                }
                            </Grid.Column>
                            <Grid.Column verticalAlign="center">
                                <Button color='grey'  fluid size="medium" icon labelPosition='right'
                                    /*onClick={this.addDataSet.bind(this)}*/>
                                    Update Flower
                                    <Icon name='upload' color="white" fitted ='true'/>
                                </Button>
                            </Grid.Column>

                        </Grid.Row>
                    </Grid>
                </fieldset>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width = {4}>
                            <Menu inverted color='grey' floated="right ">
                                <Menu.Menu fluid>
                                    <Button.Group color='grey' fluid>
                                        <Dropdown
                                            button
                                            simple
                                            fluid
                                            open={this.state.hasClicked2}
                                            closeOnChange={true}
                                            options={options}
                                            trigger={trigger}
                                        />
                                    </Button.Group>
                                </Menu.Menu>
                            </Menu>
            </Grid.Column>
                        <Grid.Column width = {5} floated = 'right' textAlign = 'center'>
                            <Grid celled>
                                    <Grid.Row color = 'grey'>
                                        <Grid.Column width = {16} textAlign = 'center'>
                                            Flower Sightings
                                        </Grid.Column>
                                    </Grid.Row>
                                {this.state.flowerSightings.length !== 0 &&
                                <Grid.Row>
                                    <Grid.Column width={4}>
                                        Flower Spotted
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        Flower Spotter
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        Location
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        Date Sighted
                                    </Grid.Column>
                                </Grid.Row>
                                }
                                {this.state.flowerSightings.rows[0]["NAME") != null &&
                                <Grid.Row>
                                    <Grid.Column width={4}>
                                        {this.state.flowerSightings[0]["NAME"] &&
                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                </Grid.Row>
                                }
                                {this.state.flowerSightings.length >= 2 &&
                                <Grid.Row>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                </Grid.Row>
                                }
                                {this.state.flowerSightings.length >=3 &&
                                <Grid.Row>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                </Grid.Row>
                                }
                                {this.state.flowerSightings.length >=4 &&
                                <Grid.Row>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                </Grid.Row>
                                }
                                {this.state.flowerSightings.length >=5 &&
                                <Grid.Row>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                </Grid.Row>
                                }
                                {this.state.flowerSightings.length >=6 &&
                                <Grid.Row>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                </Grid.Row>
                                }
                                {this.state.flowerSightings.length >=7 &&
                                <Grid.Row>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                </Grid.Row>
                                }
                                {this.state.flowerSightings.length >=8 &&
                                <Grid.Row>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                </Grid.Row>
                                }
                                {this.state.flowerSightings.length >=9 &&
                                <Grid.Row>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                </Grid.Row>
                                }
                                {this.state.flowerSightings.length >=10 &&
                                <Grid.Row>
                                    <Grid.Column width={4}>
                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                    <Grid.Column width={4}>

                                    </Grid.Column>
                                </Grid.Row>
                                }

                            </Grid>
                        </Grid.Column>
                        <Grid.Column width = {6}>
<Segment basic floated = 'right'>
    <Card>
        {/*put flower name as header*/}
        <Card.Header/>
        <Card.Content>
            <Placeholder>
                <Placeholder.Image rectangular>

                </Placeholder.Image>
            </Placeholder>
        </Card.Content>
    </Card>
</Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Divider/>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <div>
                    <div className='homeSection'>
                        <Divider/>
                        <Grid>
                            <Grid.Row stretched>
                                <Grid.Column centered stretched>
                                    <Grid textAlign='center'>
                                        <Button size='tiny' basic color="black" onClick={this.onHomePress}>
                                            <Icon name='home'/>
                                            Home
                                        </Button>
                                    </Grid>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </div>
            </div>
        )
}}

export default MainPage