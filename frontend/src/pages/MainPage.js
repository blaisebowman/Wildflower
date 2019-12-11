import React, {Component} from 'react';
import {Button, Form, Grid, Divider, Segment, Label, Icon, Dropdown, Menu, Card, Placeholder} from 'semantic-ui-react'
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
            flowerSightings: [],
            flowersDB: [],
            dopt: [],
            visCrt: [],
            text:""
        };
        this.onHomePress = this.onHomePress.bind(this);
    }

    onHomePress = () => {
        this.props.history.push('/homepage/' + this.props.getId);
    };

    onSubmit = () => {

    };

    onFlowerList = (name) => {
        axios.post('http://localhost:8000/api/sightings', {name: name},
            {headers: {'Content-Type': 'application/json'}}
        )
            .then(res => {
                console.log('tried');
                console.log(res.data[0]);
                console.log(res.data.rows[0]);
                console.log(res.data.rows.length);
                console.log(res.data.rows[0].name);
                var b = [];
                this.setState({r1: res.data.rows[0]});
                for (let i = 0, v = res.data.rows.length; i < v; i++) {
                    console.log(res.data.rows[i]);
                    this.setState({flowerSightings: this.state.flowerSightings.concat(res.data.rows[i])}, () => console.log(this.state.flowerSightings));
                }
                console.log(this.state.flowerSightings);
                console.log(this.state.flowerSightings[0]["NAME"]);
                console.log(this.state.flowerSightings[1]["NAME"]
                );
            })
            .catch(err => {
                console.log(err);
            })
    };

    onAllFlowers = () => {
        axios.get('http://localhost:8000/api/flowers/db',
            {headers: {'Content-Type': 'application/json'}}
        )
            .then(res => {
                console.log(res.data.rows[0]["NAME"]);
                this.setState({r1: res.data.rows[0]});
                for (let i = 0, v = res.data.rows.length; i < v; i++) {
                    //console.log(res.data.rows[i]);
                    this.setState({flowersDB: this.state.flowersDB.concat(res.data.rows[i]["NAME"])}, () => console.log(this.state.flowersDB));
                }
                this.handleCurrFlowers(this);
            })
            .catch(err => {
                console.log(err);
            })
    };

onComplete () {
    //
}
/*handleDropdownClick = (text) =>{
    this.setState({text: text});
    console.log('dropdown clicked');
};*/

    handleCurrFlowers = () => {


        ///is not DISPLAYING IN ORDER.... CHECK SQL ALPINE PENSETEMON



    //USED TO ADD AND REMOVE FROM DROPDOWN *BASED ON BACKEND* do insertions and deletions there, NOT HERE
        for(var b = 0, len = this.state.flowersDB.length; b < len; b++){
            console.log(this.state.flowersDB[b]);
            console.log('50');
            this.setState({
                dopt: this.state.dopt.concat({
                    key: this.state.dopt.length ,
                    text: this.state.flowersDB[b] , value: this.state.dopt.length ,
                    onClick: (this.handleChange.bind(String(this.state.flowersDB[b])))
        })
        });
        console.log(this.state.flowersDB);
        console.log(this.state.dopt);
        }
        };


    onFlowerUpdate = () => {
        //
    };

    onFlowerInsert = () => {
        //
    };

    componentDidMount() {
        //this.onFlowerList(this);

        ///////////
        this.onAllFlowers(this); //RUN AGAIN EACH TIME A FLOWER IS ADDED ---- SO IT POPULATES IN DROP DONW
        //////
        /////

    };
    handleClick = () => {
        console.log('dropdown clicked');
        if(this.state.hasClicked2 === false){
            this.setState({hasClicked2: true});
        }
        else {
            this.setState({hasClicked2: false});
        }
    };
    handleClose = () =>{
        this.setState({hasClicked2: false});
    };

    handleChange = (e, { name, text }) => {
        this.setState({ [name]: text });
        console.log(name);
    console.log(text);
this.setState({flowerSightings: []});
    this.onFlowerList(text);

    };


    handleText = (e, { text }) => this.setState({ text });


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
                    <Label color='grey'><b>Update A Flower's Information</b></Label>
                    <Divider/>
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
                                <Button color='grey' fluid size="medium" icon labelPosition='right'
                                    /*onClick={this.addDataSet.bind(this)}*/>
                                    Update Flower
                                    <Icon name='upload' color="white" fitted='true'/>
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </fieldset>
                <Grid padded='very' relaxed='very'>
                    <Grid.Row floated='right'>
                        <Grid.Column width={8}>
                            <Grid.Row>
                                <Grid.Column>
                                <Menu inverted color='grey' floated="right" fluid scrolling = 'true'>
                                    <Menu.Menu>
                                        <Button.Group color='white' fluid>
                                            <Dropdown
                                                scrolling = 'true'
                                                search = 'true'
                                                button
                                                selection
                                                fluid
                                                onClick = {this.handleClick}
                                                open={this.state.hasClicked2}
                                                onClose = {this.handleClose}
                                                openOnFocus
                                                onChange={this.handleChange}
                                                options={this.state.dopt}
                                                trigger={trigger}
                                            />
                                        </Button.Group>
                                    </Menu.Menu>
                                </Menu>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row floated='right'>
                                <Grid celled floated='right' padded='horizontally'>
                                    <Grid.Row color='grey'>
                                        <Grid.Column width={16} textAlign='center'>
                                            <b>Flower Sightings</b>
                                        </Grid.Column>
                                    </Grid.Row>
                                    {this.state.flowerSightings.length !== 0 &&
                                    <Grid.Row>
                                        <Grid.Column width={4} textAlign = 'center'>
                                            <h3>Flower Spotted</h3>
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
                                    {this.state.flowerSightings.length >= 1 &&
                                    <Grid.Row>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[0]["NAME"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[0]["PERSON"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[0]["LOCATION"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[0]["SIGHTED"]}
                                        </Grid.Column>
                                    </Grid.Row>
                                    }
                                    {this.state.flowerSightings.length >= 2 &&
                                    <Grid.Row>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[1]["NAME"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[1]["PERSON"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[1]["LOCATION"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[1]["SIGHTED"]}
                                        </Grid.Column>
                                    </Grid.Row>
                                    }
                                    {this.state.flowerSightings.length >= 3 &&
                                    <Grid.Row>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[2]["NAME"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[2]["PERSON"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[2]["LOCATION"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[2]["SIGHTED"]}
                                        </Grid.Column>
                                    </Grid.Row>
                                    }
                                    {this.state.flowerSightings.length >= 4 &&
                                    <Grid.Row>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[3]["NAME"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[3]["PERSON"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[3]["LOCATION"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[3]["SIGHTED"]}
                                        </Grid.Column>
                                    </Grid.Row>
                                    }
                                    {this.state.flowerSightings.length >= 5 &&
                                    <Grid.Row>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[4]["NAME"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[4]["PERSON"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[4]["LOCATION"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[4]["SIGHTED"]}
                                        </Grid.Column>
                                    </Grid.Row>
                                    }
                                    {this.state.flowerSightings.length >= 6 &&
                                    <Grid.Row>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[5]["NAME"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[5]["PERSON"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[5]["LOCATION"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[5]["SIGHTED"]}
                                        </Grid.Column>
                                    </Grid.Row>
                                    }
                                    {this.state.flowerSightings.length >= 7 &&
                                    <Grid.Row>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[6]["NAME"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[6]["PERSON"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[6]["LOCATION"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[6]["SIGHTED"]}
                                        </Grid.Column>
                                    </Grid.Row>
                                    }
                                    {this.state.flowerSightings.length >= 8 &&
                                    <Grid.Row>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[7]["NAME"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[7]["PERSON"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[7]["LOCATION"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[7]["SIGHTED"]}
                                        </Grid.Column>
                                    </Grid.Row>
                                    }
                                    {this.state.flowerSightings.length >= 9 &&
                                    <Grid.Row>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[8]["NAME"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[8]["PERSON"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[8]["LOCATION"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[8]["SIGHTED"]}
                                        </Grid.Column>
                                    </Grid.Row>
                                    }
                                    {this.state.flowerSightings.length >= 10 &&
                                    <Grid.Row>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[9]["NAME"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[9]["PERSON"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[9]["LOCATION"]}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {this.state.flowerSightings[9]["SIGHTED"]}
                                        </Grid.Column>
                                    </Grid.Row>
                                    }
                                </Grid>
                            </Grid.Row>
                        </Grid.Column>


                        <Grid.Column width={8}>
                            <Segment basic floated='right'>
                                <Card>
                                    {/*put flower name as header*/}
                                    <Card.Header/>
                                    <Card.Content>
                                        <Placeholder>
                                            <Placeholder.Image square>

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
    }
}

export default MainPage