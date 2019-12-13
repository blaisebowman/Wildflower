import React, {Component} from 'react';
import {Button, Form, Grid, Divider, Segment, Label, Icon, Dropdown, Menu, Image, Message} from 'semantic-ui-react'
import '../pageStyles/MainPage.css'
import axios from 'axios';
const GoogleImages = require('google-images');
const client = new GoogleImages('013885028907795664912:7vhaocgxitg', 'AIzaSyCxoZDZ3fQAPI9BNevm7eDONwBmjh5iWZw');

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
            popUp2: false,
            popUpName: false,
            popUpPerson: false,
            popUpLocation: false,
            popUpDate: false,
            toView: [],
            textBased: "",
            flowerInput: "Draperia",
            flowerReturn: 10,
            flowerSightings: [],
            flowersDB: [],
            dopt: [],
            visCrt: [],
            text:"",
            url:"https://s3.amazonaws.com/cdn0.brecks.com/images/500/71217.jpg",
            flower: "",
            submitFlower: "",
            person: "",
            submitPerson: "",
            location: "",
            submitLocation: "",
            data: "",
            submitData: "",
            err: 2,
            hasClickedTop: false,
            gName: "",
            sName: "",
            cName: ""
        };
        this.onHomePress = this.onHomePress.bind(this);

    }

    onHomePress = () => {
        this.props.history.push('/homepage/' + this.props.getId);
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

    handleCurrFlowers = () => {
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


    componentDidMount() {
        this.onFlowerList("Alpine columbine");
        this.onAllFlowers(this); //RUN AGAIN EACH TIME A FLOWER IS ADDED ---- SO IT POPULATES IN DROP DONWs
    };


    handleSubmitTop = () => {
        const {gName,  sName, cName } = this.state;
        //this.setState({ flowerSubmit: name, personSubmit: person, location: location, sighted : date });
        var opt = [{genus: gName}, {species: sName}, {commonname: cName}];
        axios.post('http://localhost:8000/api/flowers/update', {arr:opt},
            {headers: {'Content-Type': 'application/json'}}
        ).then(res => {
            console.log(res.data.rows[0]["NAME"]);
            this.setState({r1: res.data.rows[0]});
            for (let i = 0, v = res.data.rows.length; i < v; i++) {
                //console.log(res.data.rows[i]);
                this.setState({flowersDB: this.state.flowersDB.concat(res.data.rows[i]["NAME"])}, () => console.log(this.state.flowersDB));
            }
            /*this.handleCurrFlowers(this);*/
        })
            .catch(err => {
                console.log(err);
            })
    };

    handleClickTop = () => {
        console.log('dropdown clicked');
        if(this.state.hasClickedTop === false){
            this.setState({hasClickedTop: true});
        }
        else {
            this.setState({hasClickedTop: false});
        }
    };
    handleCloseTop = () =>{
        this.setState({hasClickedTop: false});
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


    handleChangeTop = (e, {name, text}) => {
        this.setState({[name]: text});
        this.setState({text: text});
    };


    handleChange = (e, {name, text}) => {
        this.setState({[name]: text});
        this.setState({text: text});
        console.log(name);
        console.log(text);
        client.search(text + ' flower')
            .then(images => {
                console.log(images);
                console.log(this.state.url);
                console.log(JSON.stringify(images));
                console.log(images[0]["url"]);
                console.log(images["url"]);
                console.log(JSON.stringify(images["url"]));
                this.setState({url: images[0].url});
                console.log(this.state.url);
            });
        this.setState({flowerSightings: []});
        this.onFlowerList(text);
    };

    handleText = (e, { text }) => this.setState({ text });

    handleSubmit = () => {
        const { name, person, location, date } = this.state;
        //this.setState({ flowerSubmit: name, personSubmit: person, location: location, sighted : date });
        var opt = [{name: name}, {person: person}, {location: location}, {sighted: date}];
        axios.post('http://localhost:8000/api/flowers/update', {arr:opt},
            {headers: {'Content-Type': 'application/json'}}
        ).then(res => {
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

    dateFormat = (isDate) => {
        var r = /^\d{4}-\d{2}-\d{2}$/;
        if(!isDate.match(r)) return false;
        var d = new Date(isDate);
        var dN = d.getTime();
        if(!dN && dN !== 0) return false;
        return d.toISOString().slice(0,10) === isDate;
    };

    handleSubmit2 = () => {
        console.log(this.state.flower);
        if (this.state.popUpName === true || this.state.popUpPerson === true || this.state.popUpLocation === true || this.state.popUpDate === true) {
            this.setState(({popUpName: false, popUpPerson: false , popUpLocation: false, popUpData: false}));
        }
        if (/[^a-zA-Z0-9\s_-]/.test(String(this.state.flower)) === true) {
            this.setState({popUpFlower: true});
            this.setState(({flower: "", person: "", location: "", data: ""}));
            return;
        }
        if (/[^a-zA-Z\s-]/.test(String(this.state.person)) === true) {
            this.setState({popUpPerson: true});
            this.setState(({flower: "", person: "", location: "", data: ""}));
            return;
        }if (/[^a-zA-Z#0-9.\s-]/.test(String(this.state.location)) === true) {
            this.setState({popUpLocation: true});
            this.setState(({flower: "", person: "", location: "", data: ""}));
            return;
        }
        if (this.dateFormat(this.state.data) === false) {
            this.setState({popUpDate: true});
            //console.log('Invalid Date Format was entered in user input');
            this.setState(({flower: "", person: "", location: "", data: ""}));
            return;
        }
        var info = [{name: String(this.state.flower)}, {person:String(this.state.person)}, {location: String(this.state.location)}, {sighted: String(this.state.data)}];
        console.log(info);
        console.log(JSON.stringify(info));
        axios.post('http://localhost:8000/api/flower/found', {name: String(this.state.flower), person: String(this.state.person), location: String(this.state.location), sighted: String(this.state.data)},
            {headers: {'Content-Type': 'application/json'}}
        ).then(res => {
            if (res.status === 400){
            console.log('se');
                }
            console.log(res);
            console.log(res.data.rows[0]["NAME"]);
            this.setState({r1: res.data.rows[0]});
            for (let i = 0, v = res.data.rows.length; i < v; i++) {
                //console.log(res.data.rows[i]);
                this.setState({flowersDB: this.state.flowersDB.concat(res.data.rows[i]["NAME"])}, () => console.log(this.state.flowersDB));
            }
            this.handleCurrFlowers(this);
        })
            .catch(err => {
                this.setState({popUp2: true});
                this.setState({err2: String('Error: Improper inputs entered')});
                console.log(err.json);
            });

        this.setState(({flower: "", person: "", location: "" , data: ""}));


    };
    handleChange2 = (e, {name, value}) => {
        this.setState({[name]: value});
        this.setState(({popUpName: false, popUpPerson: false , popUpLocation: false, popUpData: false}));


    };

    render() {
        const options = [
            //HAVE OPTIONS POPULATE FROM THE DATABASE WITH AXIOS REQUEST
            /*{key: 1, text: 'Draperia', value: 1, onClick: (''), selected: this.state.vis === 1}*/
        ];

        const trigger = (
            <span><Icon size="large" bordered={false} name='hand point right'/>{'Select a Flower'}</span>
        );

        const {flower, person, location, data}  = this.state;

        return (
            <div className="box">
                <fieldset>
                    <Label color='grey'><Icon name = 'compose'/><b>Report a New Flower Sighting</b></Label>
                    <Divider/>

                    <Form error onSubmit = {this.handleSubmitTop} >
                        <Form.Group width = {16}>
                            <Grid relaxed = 'very' columns={3} padded = 'horizontally' float= 'right'>

                                <Grid.Row width = {16}>


                                    <Grid.Column>
                                        <Segment inverted color='teal' fluid>
                                            <label><b>Flower Genus Name</b></label>
                                            <Form.Input
                                                required
                                                placeholder = 'Carex'
                                                name = 'flower'
                                                value = {flower}
                                                onChange = {this.handleChange2}
                                            />
                                            {this.state.popUpFlower === true &&
                                            <Message
                                                error
                                                header='ERROR!'
                                                content='You entered an invalid format for flower genus name!'
                                            />
                                            }
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment inverted color='teal' fluid>
                                            <label><b>Flower Species Name</b></label>
                                            <Form.Input
                                                required
                                                placeholder = 'ex: limosa'
                                                name ='person'
                                                value = {this.state.person}
                                                onChange = {this.handleChangeTop}
                                            />
                                            {this.state.popUpPerson === true &&
                                            <Message
                                                error
                                                header='ERROR!'
                                                content='You entered an invalid format for the species name!'
                                            />
                                            }
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment inverted color='teal' fluid>
                                            <label><b>Flower Common Name</b></label>
                                            <Form.Input
                                                required
                                                placeholder = 'ex: Mud sedge'
                                                name = 'data'
                                                value = {this.state.data}
                                                onChange = {this.handleChangeTop}
                                            />
                                            {this.state.popUpCommon === true &&
                                            <Message
                                                error
                                                header='ERROR!'
                                                content='You entered an invalid format for the common name.'
                                            />
                                            }
                                        </Segment>
                                    </Grid.Column>


                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column floated="left">
                                    </Grid.Column>
                                    <Grid.Column verticalAlign="center">
                                    </Grid.Column>
                                    <Grid.Column verticalAlign="center">
                                        <Form.Button size = 'medium' color = 'grey' content='Report Sighting' icon = {{name: 'upload', color: 'white'}} onClick = {this.closePopUp2}/>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Form.Group>
                    </Form>
                </fieldset>

                <fieldset>
                    <Label color='grey'><Icon name = 'compose'/><b>Report a New Flower Sighting</b></Label>
                    <Divider/>

                    <Form error onSubmit = {this.handleSubmit2} >
                        <Form.Group width = {16}>
                    <Grid relaxed = 'very' columns={4} padded = 'horizontally' float= 'right'>

                        <Grid.Row width = {16}>


                            <Grid.Column>
                                <Segment inverted color='teal' fluid>
                                    <label><b>Flower Common Name</b></label>
                                    <Form.Input
                                        required
                                        placeholder = 'ex: Mud Sedge'
                                        name = 'flower'
                                        value = {flower}
                                        onChange = {this.handleChange2}
                                    />
                                    {this.state.popUpFlower === true &&
                                    <Message
                                        error
                                        header='ERROR!'
                                        content='You entered an invalid format for flower name!
                                        Flower names must contain only alphanumeric characters!'
                                        />
                                    }
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment inverted color='teal' fluid>
                                    <label><b>Person/Spotter</b></label>
                                    <Form.Input
                                        required
                                        placeholder = 'ex: Timothy'
                                        name ='person'
                                        value = {this.state.person}
                                        onChange = {this.handleChange2}
                                    />
                                    {this.state.popUpPerson === true &&
                                    <Message
                                        error
                                        header='ERROR!'
                                        content='You entered an invalid format for person name! Person names must contain only alphabetical characters!'
                                    />
                                    }
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment inverted color='teal' fluid>
                                    <label><b>Location</b></label>
                                    <Form.Input
                                        required
                                        placeholder = 'ex: Alaska Flat'
                                        name = 'location'
                                        value = {this.state.location}
                                        onChange = {this.handleChange2}
                                    />
                                    {this.state.popUpLocation === true &&
                                    <Message
                                        error
                                        header='ERROR!'
                                        content='You entered an invalid format for location (ex: 1)'
                                    />
                                    }
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment inverted color='teal' fluid>
                                    <label><b>Date Spotted</b></label>
                                    <Form.Input
                                        required
                                        placeholder = 'ex: 2019-07-19'
                                        name = 'data'
                                        value = {this.state.data}
                                        onChange = {this.handleChange2}
                                    />
                                    {this.state.popUpComName === true &&
                                    <Message
                                        error
                                        header='ERROR!'
                                        content='You entered an invalid format for date (ex: 07-28x7-@3)'
                                    />
                                    }
                                </Segment>
                            </Grid.Column>


                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column floated="left">
                            </Grid.Column>
                            <Grid.Column verticalAlign="center">
                            </Grid.Column>
                            <Grid.Column verticalAlign="center">
                                <Form.Button size = 'medium' color = 'grey' content='Report Sighting' icon = {{name: 'upload', color: 'white'}} onClick = {this.closePopUp2}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                        </Form.Group>
                    </Form>
                </fieldset>

                <Grid padded='very' relaxed='very'>
                    <Grid.Row floated='right'>
                        <Grid.Column width={8}>
                            <Grid.Row>
                                <Grid.Column>
                                <Menu inverted color='grey' floated="right" fluid scrolling = 'true'>
                                    <Menu.Menu color = 'grey'>
                                        <Button.Group color='white' fluid>
                                            <Dropdown
                                                scrolling = 'true'
                                                search = 'true'
                                                selection
                                                button
                                                fluid
                                                onClick = {this.handleClick}
                                                open={this.state.hasClicked2}
                                                onClose = {this.handleClose}
                                                openOnFocus
                                                onChange={this.handleChange}
                                                options={this.state.dopt}
                                                placeholder = "Enter a flower name"
                                                text = {this.state.text}
                                            />
                                        </Button.Group>
                                    </Menu.Menu>
                                </Menu>
                                </Grid.Column>
                            </Grid.Row>
                            <Divider />
                            <Grid.Row floated='right'>
                                <Grid celled floated='right' padded='horizontally'>
                                    <Grid.Row color='grey'>
                                        {this.state.flowerSightings.length !== 0 &&
                                        <Grid.Column width={16} textAlign='center'>
                                            <b>Flower Sightings</b>
                                        </Grid.Column>
                                        }
                                    </Grid.Row>
                                    {this.state.flowerSightings.length !== 0 &&
                                    <Grid.Row color = 'teal'>
                                        <Grid.Column width={4} textAlign = 'center'>
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

                                        <Image fluid size = "massive" src = {this.state.url}/>

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