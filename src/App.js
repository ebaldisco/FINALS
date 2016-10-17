import React, { Component } from 'react';
import logo from './TOPLOGO.png';
import 'bootstrap/dist/css/bootstrap.css';
import httpClient from 'axios'
import {
    Button,ButtonGroup,
    Form,FormGroup,ControlLabel,
    FormControl,HelpBlock,
    Checkbox,Radio,Grid,Row,Col,
    Table,Panel,Header,Pager,Item,
	InputGroup,Modal,DropdownButton,
    MenuItem
} from 'react-bootstrap';


class App extends Component {



    state = {
        name: "",
        sexo: "",
		age: "",
        movies: [],
        gender: "",
        ethnicity: "",
        education: "",
		status: "",
		income: "",
		sexex: "",
		sexfreq: "",
		sexact: "",
		sexmos: "",
		sexave: "",
        comment: "",
        selectedName: "",
        show: false,
                selectedSexo: "",
                selectedAge: "",
                selectedMovies: [],
                selectedGender: "",
                selectedEthnicity: "",
                selectedEducation: "",
                selectedStatus: "",
                selectedIncome: "",
                selectedSexex: "",
                selectedSexfreq: "",
                selectedSexact: "",
                selectedSexmos: "",
                selectedSexave: "",
                selectedComment: "",
        records:[]
    };
    
    

    componentDidMount(){

        this.refreshData();
    }

     refreshData=()=>{

         httpClient.get('http://localhost:3004/surveys')
             .then((response)=> {
                 var data =response.data;
                 this.setState({
                     records:data
                 })

             }).catch((error)=> {

             });

     };

    onChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };

    checkboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state;
            state[fieldName] = targetArray;
            this.setState(state);
        }
    };


    saveSurvey = ()=> {

       
        var data = {name: this.state.name,
                    sexo: this.state.sexo,
                    age: this.state.age,
                    movies: this.state.movies,
                    gender: this.state.gender,
                    ethnicity: this.state.ethnicity,
                    education: this.state.education,
                    status: this.state.status,
                    income: this.state.income,
                    sexex: this.state.sexex,
                    sexfreq: this.state.sexfreq,
                    sexact: this.state.sexact,
                    sexmos: this.state.sexmos,
                    sexave: this.state.sexave,
                    comment: this.state.comment
                };
         console.log(data);
         delete data.records;

        httpClient.post('http://localhost:3004/surveys',
         data)
            .then((response)=> {
                this.refreshData();
            }).catch((error)=> {

            });

    };
	
    deleteItem = (id)=>{

        return ()=>{

            httpClient.delete('http://localhost:3004/surveys/'+ id )
                .then((response)=> {
                    console.log('delete');
                    this.refreshData();
                }).catch((error)=> {

                });

        };
    };
    
    modalonChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };
    
    modalcheckboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state.selectedMovies;
            state[fieldName] = targetArray;
            this.setState(state.selectedMovies);
        }
    };
    
    editItem = (id) =>{
        return ()=> {
            
            httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    console.log('edit');
                    var data = response.data
                    console.log(response.data);
                    this.setState({
                        name: data.name,
                        sexo: data.sexo,
                        age: data.age,
                        movies: data.movies,
                        gender: data.gender,
                        ethnicity: data.ethnicity,
                        education: data.education,
                        status: data.status,
                        income: data.income,
                        sexex: data.sexex,
                        sexfreq: data.sexfreq,
                        sexact: data.sexact,
                        sexmos: data.sexmos,
                        sexave: data.sexave,
                        comment: data.comment
                    })
                }).catch((error)=>{
                    
                });
        };
    };
    
    openModal = (id)=>{

            return ()=>{
                this.setState({
                    show: true
                })

                 httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    var data = response.data
                    this.setState({
                        selectedName: data.name,
                        selectedSexo: data.sexo,
                        selectedAge: data.age,
                        selectedMovies: data.movies,
                        selectedGender: data.gender,
                        selectedEthnicity: data.ethnicity,
                        selectedEducation: data.education,
                        selectedStatus: data.status,
                        selectedIncome: data.income,
                        selectedSexex: data.sexex,
                        selectedSexfreq: data.sexfreq,
                        selectedSexact: data.sexact,
                        selectedSexmos: data.sexmos,
                        selectedSexave: data.sexave,
                        selectedComment: data.comment,
                        selectedId: data.id
                    })
                    console.log(this.state.selectedData.name);
                }).catch((error)=>{
                    
                });

            };
        };
        
        
        
        saveEdit = (id) =>{


        return () => {
            console.log(data);
            var data = {name: this.state.selectedName,
                        sexo: this.state.selectedSexo,
                        age: this.state.selectedAge,
                        movies: this.state.selectedMovies,
                        gender: this.state.selectedGender,
                        ethnicity: this.state.selectedEthnicity,
                        education: this.state.selectedEducation,
                        status: this.state.selectedStatus,
                        income: this.state.selectedIncome,
                        sexex: this.state.selectedSexex,
                        sexfreq: this.state.selectedSexfreq,
                        sexact: this.state.selectedSexact,
                        sexmos: this.state.selectedSexmos,
                        sexave: this.state.selectedSexave,
                        comment: this.state.selectedComment
                        };
            delete data.records;

            httpClient.patch('http://localhost:3004/surveys/'+id,
            data)
                .then((response)=> {
                    this.refreshData();
                }).catch((error)=> {

                });

            this.setState({
                show: false,
                
                selectedName: "",
                selectedSexo: "",
                selectedAge: "",
                selectedMovies: [],
                selectedGender: "",
                selectedEthnicity: "",
                selectedEducation: "",
                selectedStatus: "",
                selectedIncome: "",
                selectedSexex: "",
                selectedSexfreq: "",
                selectedSexact: "",
                selectedSexmos: "",
                selectedSexave: "",
                selectedComment: "",
                
                
            });
        }
    };



    render() {

        var rows  = this.state.records.map((item,i)=>{

            return (
                <tr key={i} className="text-center">
                     <td width="10%"><ButtonGroup><Button bsSize="xsmall" bsStyle="danger" className="glyphicon glyphicon-trash" onClick={this.deleteItem(item.id)}></Button><Button className="glyphicon glyphicon-pencil" bsSize="xsmall"  bsStyle="warning" onClick={this.openModal(item.id)}></Button></ButtonGroup></td>
                     
                     <td>{item.id}</td>
                     <td className="textfieldarea">{item.name}</td>
                     <td>{item.gender}</td>
					 <td>{item.age}</td>
                     <td>{item.sexo}</td>
                     <td>{item.ethnicity}</td>
                     <td>{item.education}</td>
					 <td>{item.status}</td>
					 <td>{item.income}</td>
					 <td>{item.sexex}</td>
                     <td>{item.sexact}</td>
                     <td>{item.sexfreq}</td>
                     <td>{item.sexmos}</td>
                     <td>{item.sexave}</td>
                     <td>{
                         item.movies.map((movies, mi)=> {
                             return <div key={mi}>
                                   <span className="label label-warning">{movies}</span>
                                 </div>
                         })

                      }
                     </td>
                     <td className="textfieldarea">{item.comment}</td>
                     
                </tr>
            );
        });
        
        let close = () => this.setState({ show: false })


        return (
            <div className="container-fluid">

              <Grid>
                        <Row>
                            <Col md={1}>
                            </Col>
                            <Col md={10}>
                                <div className="page-header">
                                <h1>HOBOHOBO</h1>
                                <p>Sexual Activity Survey</p>
                            </div>
                            <div className="jumbotron">
                   <h3>Welcome to the HOBOHOBO sexual activity survey!</h3>
                                    
Thank you for agreeing to take part in this important survey studying sexual activity. Today we will be asking for some information in order to better understand people's sexual behaviours and habits. This survey should only take 4-6 minutes to complete. Be assured that all answers you provide will be kept in the strictest confidentiality.<br/>
                                   
                </div>						   
                                <Form>
                                <br/><br/>
                                
                                            <Panel>
                                    <br/>
                                        <h4>First, we would like to know some personal details for demographic reasons. Please provide your information in the text boxes below:</h4>
                                        
                                        <br/><br/>
                                        
                                        <Panel>
                                            <FormGroup>
                                                <FormControl
                                                    placeholder="Enter name here..."
                                                    type="text"
                                                    value={this.state.name}
                                                    onChange={this.onChange('name')}
                                                    />
                                                                    
                                                </FormGroup>
                                    
                                            <FormGroup>
                                                <FormControl componentClass="select"
                                                value={this.state.gender}
                                                onChange={this.onChange('gender')}
                                                >
                                                <option value="" disabled selected>Select your gender</option>                    
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Prefer Not to Answer">Prefer Not to Answer</option>
                                                </FormControl>
                                            </FormGroup>
											<FormGroup>
                                                <FormControl componentClass="select"
                                                    value={this.state.age}
                                                    onChange={this.onChange('age')}
                                                    >
                                                    <option value="" disabled selected>Select your age level</option>                    
                                                    <option value="Under 18">Under 18</option>
                                                    <option value="18-24">18-24</option>
                                                    <option value="25-34">25-34</option>
													<option value="35-44">35-44</option>
													<option value="45-44">45-44</option>
													<option value="55-64">55-64</option>
													<option value="65 or Above">65 or Above</option>
                                                    <option value="Prefer Not to Answer">Prefer Not to Answer</option>
                                                </FormControl>                        
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControl componentClass="select"
                                                    value={this.state.sexo}
                                                    onChange={this.onChange('sexo')}
                                                    >
                                                    <option value="" disabled selected>Sex orientation</option>                    
                                                    <option value="Heterosexual">Heterosexual</option>
                                                    <option value="Homosexual">Homosexual</option>
                                                    <option value="Bisexual">Bisexual</option>
                                                    <option value="Prefer Not to Answer">Prefer Not to Answer</option>
                                                </FormControl>                        
                                            </FormGroup>
											
                                        </Panel>   
                                     </Panel>
								
										<Panel>	
										<FormGroup className="formlabel">
											<Table condensed>
											<thead>
												<tr>
													<th><h4>Please select your ethnicity:</h4></th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>
														<Radio name="ethnicity" value="White / Caucasian"
                                                                onChange={this.onChange('ethnicity')}><p className="formlabel">White / Caucasian</p></Radio>
													</td>
												</tr>
												<tr>
													<td>
														<Radio name="ethnicity" value="Black / African American"
                                                                onChange={this.onChange('ethnicity')}><p className="formlabel">Black / African American</p></Radio>
													</td>
												</tr>
												<tr>
													<td>
														<Radio name="ethnicity" value="Asian"
                                                                onChange={this.onChange('ethnicity')}><p className="formlabel">Asian</p></Radio>
													</td>
												</tr>
												<tr>
													<td>
														<Radio name="ethnicity" value="Pacific Islander"
                                                                onChange={this.onChange('ethnicity')}><p className="formlabel">Pacific Islander</p></Radio>
													</td>
												</tr>
												<tr>
													<td>
														<Radio name="ethnicity" value="Native American"
                                                                onChange={this.onChange('ethnicity')}><p className="formlabel">Native American</p></Radio>
													</td>
												</tr>
												<tr>
													<td>
														<Radio name="ethnicity" value="Prefer Not to Answer"
                                                                onChange={this.onChange('ethnicity')}><p className="formlabel">Prefer Not to Answer</p></Radio>
													</td>
												</tr>
												</tbody>
											</Table>
											</FormGroup>
											</Panel>
											
											<Panel>	
											<FormGroup className="formlabel">
												<Table condensed>
												<thead>
													<tr>
														<th><h4>What is the highest level of education you have completed?</h4></th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>
															<Radio name="education" value="Some High School"
                                                                    onChange={this.onChange('education')}><p className="formlabel">Some High School</p></Radio>
														</td>
													</tr>
													<tr>
														<td>
															<Radio name="education" value="Some College/University"
                                                                    onChange={this.onChange('education')}><p className="formlabel">Some College/University</p></Radio>
														</td>
													</tr>
													<tr>
														<td>
															<Radio name="education" value="College"
                                                                    onChange={this.onChange('education')}><p className="formlabel">College</p></Radio>
														</td>
													</tr>
													<tr>
														<td>
															<Radio name="education" value="University"
                                                                    onChange={this.onChange('education')}><p className="formlabel">University</p></Radio>
														</td>
													</tr>
													<tr>
														<td>
															<Radio name="education" value="Graduate Degree/Masters"
                                                                    onChange={this.onChange('education')}><p className="formlabel">Graduate Degree/Masters</p></Radio>
														</td>
													</tr>
													<tr>
														<td>
															<Radio name="education" value="Prefer Not to Answer"
                                                                    onChange={this.onChange('education')}><p className="formlabel">Prefer Not to Answer</p></Radio>
														</td>
													</tr>
													</tbody>
												</Table>
												</FormGroup>
												</Panel>
												
												<Panel>	
												<FormGroup className="formlabel">
													<Table condensed>
													<thead>
														<tr>
															<th><h4>Please select the option that best describes your current employment status:</h4></th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>
																<Radio name="status" value="Employed Full-Time"
                                                                onChange={this.onChange('status')}><p className="formlabel">Employed Full-Time</p></Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="status" value="Employed Part-Time"
                                                                onChange={this.onChange('status')}><p className="formlabel">Employed Part-Time</p></Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="status" value="Self-employed"
                                                                onChange={this.onChange('status')}><p className="formlabel">Self-employed</p></Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="status" value="Not employed, but looking for work"
                                                                onChange={this.onChange('status')}><p className="formlabel">Not employed, but looking for work</p></Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="status" value="Not employed and not looking for work"
                                                                onChange={this.onChange('status')}><p className="formlabel">Not employed and not looking for work</p></Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="status" value="Homemaker"
                                                                onChange={this.onChange('status')}><p className="formlabel">Homemaker</p></Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="status" value="Retired"
                                                                onChange={this.onChange('status')}><p className="formlabel">Retired</p></Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="status" value="Student"
                                                                onChange={this.onChange('status')}><p className="formlabel">Student</p></Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="status" value="Prefer Not to Answer"
                                                                onChange={this.onChange('status')}><p className="formlabel">Prefer Not to Answer</p></Radio>
															</td>
														</tr>
														</tbody>
													</Table>
													
													
													<Table condensed>
													<thead>
														<tr>
															<th><h4>Please select the range of your household's overall annual income:</h4></th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>
																<Radio name="income" value="Under $20,000"
                                                                onChange={this.onChange('income')}><p className="formlabel">Under $20,000</p></Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="income" value="$20,000 - $30,000"
                                                                onChange={this.onChange('income')}><p className="formlabel">$20,000 - $30,000</p></Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="income" value="$30,000 - $40,000"
                                                                onChange={this.onChange('income')}><p className="formlabel">$30,000 - $40,000</p></Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="income" value="$40,000 - $50,000"
                                                                onChange={this.onChange('income')}><p className="formlabel">$40,000 - $50,000</p></Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="income" value="$50,000 - $75,000"
                                                                onChange={this.onChange('income')}><p className="formlabel">$50,000 - $75,000</p></Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="income" value="$75,000 - $100,000"
                                                                onChange={this.onChange('income')}><p className="formlabel">$75,000 - $100,000</p></Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="income" value="$100,000 - $150,0000"
                                                                onChange={this.onChange('income')}><p className="formlabel">$100,000 - $150,000</p></Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="income" value="$150,000 or more"
                                                                onChange={this.onChange('income')}><p className="formlabel">$150,000 or more</p></Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="status" value="Prefer Not to Answer"
                                                                onChange={this.onChange('income')}><p className="formlabel">Prefer Not to Answer</p></Radio>
															</td>
														</tr>
														</tbody>
													</Table>
													
													</FormGroup>
													</Panel>
                                                    
                                                    
                                                    <Panel>	
                                                    <FormGroup className="formlabel">
                                                        <Table condensed>
                                                        <thead>
                                                            <tr>
                                                                <th><h4>Have you ever had sex before?</h4></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <Radio name="sexex" value="Yes"
                                                                    onChange={this.onChange('sexex')}><p className="formlabel">Yes</p></Radio>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <Radio name="sexex" value="No"
                                                                    onChange={this.onChange('sexex')}><p className="formlabel">No</p></Radio>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <Radio name="sexex" value="Prefer Not to Answer"
                                                                    onChange={this.onChange('sexex')}><p className="formlabel">Prefer Not to Answer</p></Radio>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </Table>
                                                        </FormGroup>
                                                        </Panel>
                                                        
                                                        <Panel>	
                                                        <FormGroup className="formlabel">
                                                            <Table condensed>
                                                            <thead>
                                                                <tr>
                                                                    <th><h4>Are you currently sexually active?</h4></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <Radio name="sexact" value="Yes"
                                                                        onChange={this.onChange('sexact')}><p className="formlabel">Yes</p></Radio>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <Radio name="sexact" value="No"
                                                                        onChange={this.onChange('sexact')}><p className="formlabel">No</p></Radio>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <Radio name="sexact" value="Prefer Not to Answer"
                                                                        onChange={this.onChange('sexact')}><p className="formlabel">Prefer Not to Answer</p></Radio>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </Table>
                                                            </FormGroup>
                                                            </Panel>
										
												
												<Panel>
													<FormGroup>
													<h4>Please provide the total number of people you have been sexually active with:</h4>
													<FormControl
														placeholder="- - -"
														type="number"
														min="0"
														value={this.state.sexfreq}
														onChange={this.onChange('sexfreq')}
														/>			
													</FormGroup>
												
													<FormGroup>
													<h4>Please provide the number of people you are were sexually active with in the past month:</h4>
													<FormControl
														placeholder="- - -"
														type="number"
														min="0"
														value={this.state.sexmos}
														onChange={this.onChange('sexmos')}
														/>			
													</FormGroup>
												</Panel>
                                                
                                                <Panel>	
                                                <FormGroup className="formlabel">
                                                <Table condensed>
                                                      <thead>
                                                        <tr>
                                                        <th><h4>Thinking about your current sexual activity, please indicate the average amount of sex you have:</h4></th>
                                                        </tr>
                                                      </thead>
                                                      <tbody>
                                                        <tr>
                                                            <td>
                                                            <Radio name="sexave" value="Less than once a month"
                                                                onChange={this.onChange('sexave')}><p className="formlabel">Less than once a month</p></Radio>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                            <Radio name="sexave" value="Once or twice a month"
                                                                onChange={this.onChange('sexave')}><p className="formlabel">Once or twice a month</p></Radio>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                            <Radio name="sexave" value="Weekly"
                                                                onChange={this.onChange('sexave')}><p className="formlabel">Weekly</p></Radio>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                            <Radio name="sexave" value="2-3 times a week"
                                                                onChange={this.onChange('sexave')}><p className="formlabel">2-3 times a week</p></Radio>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                            <Radio name="sexave" value="4-5 times a week"
                                                                onChange={this.onChange('sexave')}><p className="formlabel">4-5 times a week</p></Radio>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                            <Radio name="sexave" value="More than 5 times a week"
                                                                onChange={this.onChange('sexave')}><p className="formlabel">More than 5 times a week</p></Radio>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                            <Radio name="sexave" value="Prefer Not to Answer"
                                                                onChange={this.onChange('sexave')}><p className="formlabel">Prefer Not to Answer</p></Radio>
                                                            </td>
                                                        </tr>
                                                      </tbody>
                                                   </Table>
                                                   </FormGroup>
                                                   </Panel>
                                                   
                                                   <Panel>	
                                                <FormGroup className="formlabel">
                                                <Table condensed>
                                                      <thead>
                                                        <tr>
                                                        <th><h4>Based on the past month, what was the status of your sex partner(s):</h4></th>
                                                        </tr>
                                                      </thead>
                                                      <tbody>
                                                        <tr>
                                                            <td>
                                                            <Checkbox value="Spouse"
                                                                        checked={this.state.movies.indexOf('Spouse')>=0 ? true:false}
                                                                        onChange={this.checkboxChange('movies')}>
                                                                    <p className="formlabel">Spouse</p>
                                                                </Checkbox>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                            <Checkbox value="Common Law Spouse"
                                                                        checked={this.state.movies.indexOf('Common Law Spouse')>=0 ? true:false}
                                                                        onChange={this.checkboxChange('movies')}>
                                                                    <p className="formlabel">Common Law Spouse</p>
                                                                </Checkbox>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                            <Checkbox value="Girlfriend/Boyfriend"
                                                                        checked={this.state.movies.indexOf('Girlfriend/Boyfriend')>=0 ? true:false}
                                                                        onChange={this.checkboxChange('movies')}>
                                                                    <p className="formlabel">Girlfriend/Boyfriend</p>
                                                                </Checkbox>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                            <Checkbox value="Friend"
                                                                        checked={this.state.movies.indexOf('Friend')>=0 ? true:false}
                                                                        onChange={this.checkboxChange('movies')}>
                                                                    <p className="formlabel">Friend</p>
                                                                </Checkbox>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                            <Checkbox value="One Night Stand"
                                                                        checked={this.state.movies.indexOf('One Night Stand')>=0 ? true:false}
                                                                        onChange={this.checkboxChange('movies')}>
                                                                    <p className="formlabel">One Night Stand</p>
                                                                </Checkbox>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                            <Checkbox value="Prefer Not to Answer"
                                                                        checked={this.state.movies.indexOf('Prefer Not to Answer')>=0 ? true:false}
                                                                        onChange={this.checkboxChange('movies')}>
                                                                    <p className="formlabel">Prefer Not to Answer</p>
                                                                </Checkbox>
                                                            </td>
                                                        </tr>
                                                      </tbody>
                                                   </Table>
                                                   </FormGroup>
                                                   </Panel>
												
                                                    <Panel>
                                                    <br/>
                                                    <h4>Finally, we would like to know if you have any comments that you think HOBOHOBO should be aware of. If so, please explain in the text box below:</h4>
                                                    <br/>
                                                    <FormGroup>
                                                        <textarea
                                                                placeholder="Enter text here..."
                                                                value={this.state.comment}
                                                                onChange={this.onChange('comment')}
                                                                cols = "100"
                                                                rows = "7"
                                                                className = "form-control"
                                                                />
                                                        </FormGroup>
                                                    </Panel>
                           <br/><br/>
                                    <div className="buttoncenter">
                                    <ButtonGroup>

                                        <Button bsStyle="primary" bsSize="large" onClick={this.saveSurvey}>&nbsp;&nbsp;&nbsp;&nbsp;Done&nbsp;&nbsp;&nbsp;&nbsp;</Button>

                                    </ButtonGroup>
                                    </div>
                                      <br/>
                                      <div className="page-header">
                                
                            </div>  
                            </Form>
                                </Col>
                            <Col md={1}>
                            </Col>
                        </Row>
                    </Grid>
                           
                           
                                    
                    
                    
                                <br/><br/> <br/><br/> <br/><br/> <br/><br/>
                                
                                <Panel>
                                 <Table condensed striped bordered hover>
                                    <thead >
                                    <tr>
                                        <th className="text-center">#</th>
                                        <th className="text-center">ID</th>
                                        <th className="text-center">Name</th>
                                        <th className="text-center">Gender</th>
										<th className="text-center">Age</th>
                                        <th className="text-center">Sexual Orientation</th>
                                        <th className="text-center">Ethnicity</th>
                                        <th className="text-center">Education</th>
										<th className="text-center">Status</th>
                                        <th className="text-center">Income</th>
                                        <th className="text-center">Sexual Experience</th>
                                        <th className="text-center">Sexualy Active</th>
                                        <th className="text-center">Number of Partner</th>
                                        <th className="text-center">Average Sex/Month</th>
                                        <th className="text-center">Average Sex</th>
                                        <th className="text-center">Sexual Partner</th>
                                        <th className="text-center">Comment</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {rows}
                                    </tbody>
                                </Table>
                                </Panel>
                                
                            
                 
                          
                     
                                
                      <div className="modal-container" style={{height: 200}}>
                    <Modal
                    show={this.state.show}
                    onHide={close}
                    container={this}
                    aria-labelledby="contained-modal-title"
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Contained Modal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                                <br/><br/>
                                
                                            <Panel>
                                    <br/>
                                        <h4>First, we would like to know some personal details for demographic reasons. Please provide your information in the text boxes below:</h4>
                                        
                                        <br/><br/>
                                        
                                        <Panel>
                                            <FormGroup>
                                                <FormControl
                                                    placeholder="Enter name here..."
                                                    type="text"
                                                    value={this.state.selectedName}
                                                    onChange={this.modalonChange('selectedName')}
                                                    />
                                                                    
                                                </FormGroup>
                                    
                                            <FormGroup>
                                                <FormControl componentClass="select"
                                                value={this.state.selectedGender}
                                                onChange={this.modalonChange('selectedGender')}
                                                >
                                                <option value="" disabled selected>Select your gender</option>                    
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Prefer Not to Answer">Prefer Not to Answer</option>
                                                </FormControl>
                                            </FormGroup>
											<FormGroup>
                                                <FormControl componentClass="select"
                                                    value={this.state.selectedAge}
                                                    onChange={this.modalonChange('selectedAge')}
                                                    >
                                                    <option value="" disabled selected>Select your age level</option>                    
                                                    <option value="Under 18">Under 18</option>
                                                    <option value="18-24">18-24</option>
                                                    <option value="25-34">25-34</option>
													<option value="35-44">35-44</option>
													<option value="45-44">45-44</option>
													<option value="55-64">55-64</option>
													<option value="65 or Above">65 or Above</option>
                                                    <option value="Prefer Not to Answer">Prefer Not to Answer</option>
                                                </FormControl>                        
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControl componentClass="select"
                                                    value={this.state.selectedSexo}
                                                    onChange={this.onChange('selectedSexo')}
                                                    >
                                                    <option value="" disabled selected>Sex orientation</option>                    
                                                    <option value="Heterosexual">Heterosexual</option>
                                                    <option value="Homosexual">Homosexual</option>
                                                    <option value="Bisexual">Bisexual</option>
                                                    <option value="Prefer Not to Answer">Prefer Not to Answer</option>
                                                </FormControl>                        
                                            </FormGroup>
											
                                        </Panel>   
                                     </Panel>
								
										<Panel>	
										<FormGroup className="formlabel">
											<Table condensed>
											<thead>
												<tr>
													<th><h4>Please select your ethnicity:</h4></th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>
														<Radio name="selectedEthnicity" value="White / Caucasian" checked={this.state.selectedEthnicity == "White / Caucasian" ? true : false}
                                                        onChange={this.modalonChange('selectedEthnicity')}>White / Caucasian</Radio>
													</td>
												</tr>
												<tr>
													<td>
														<Radio name="selectedEthnicity" value="Black / African American" checked={this.state.selectedEthnicity == "Black / African American" ? true : false}
                                                        onChange={this.modalonChange('selectedEthnicity')}>Black / African American</Radio>
													</td>
												</tr>
												<tr>
													<td>
														<Radio name="selectedEthnicity" value="Asian" checked={this.state.selectedEthnicity == "Asian" ? true : false}
                                                        onChange={this.modalonChange('selectedEthnicity')}>Asian</Radio>
													</td>
												</tr>
												<tr>
													<td>
														<Radio name="selectedEthnicity" value="Pacific Islander" checked={this.state.selectedEthnicity == "Pacific Islander" ? true : false}
                                                        onChange={this.modalonChange('selectedEthnicity')}>Pacific Islander</Radio>
													</td>
												</tr>
												<tr>
													<td>
														<Radio name="selectedEthnicity" value="Native American" checked={this.state.selectedEthnicity == "Native American" ? true : false}
                                                        onChange={this.modalonChange('selectedEthnicity')}>Native American</Radio>
													</td>
												</tr>
												<tr>
													<td>
														<Radio name="selectedEthnicity" value="Prefer Not to Answer" checked={this.state.selectedEthnicity == "Prefer Not to Answer" ? true : false}
                                                        onChange={this.modalonChange('selectedEthnicity')}>Prefer Not to Answer</Radio>
													</td>
												</tr>
												</tbody>
											</Table>
											</FormGroup>
											</Panel>
											
											<Panel>	
											<FormGroup className="formlabel">
												<Table condensed>
												<thead>
													<tr>
														<th><h4>What is the highest level of education you have completed?</h4></th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>
															<Radio name="selectedEducation" value="Some High School" checked={this.state.selectedEducation == "Some High School" ? true : false}
                                                            onChange={this.modalonChange('selectedEducation')}>Some High School</Radio>
														</td>
													</tr>
													<tr>
														<td>
															<Radio name="selectedEducation" value="Some College/University" checked={this.state.selectedEducation == "Some College/University" ? true : false}
                                                            onChange={this.modalonChange('selectedEducation')}>Some College/University</Radio>
														</td>
													</tr>
													<tr>
														<td>
															<Radio name="selectedEducation" value="College" checked={this.state.selectedEducation == "College" ? true : false}
                                                            onChange={this.modalonChange('selectedEducation')}>College</Radio>
														</td>
													</tr>
													<tr>
														<td>
															<Radio name="selectedEducation" value="University" checked={this.state.selectedEducation == "University" ? true : false}
                                                            onChange={this.modalonChange('selectedEducation')}>University</Radio>
														</td>
													</tr>
													<tr>
														<td>
															<Radio name="selectedEducation" value="Graduate Degree/Masters" checked={this.state.selectedEducation == "Graduate Degree/Masters" ? true : false}
                                                            onChange={this.modalonChange('selectedEducation')}>Graduate Degree/Masters</Radio>
														</td>
													</tr>
													<tr>
														<td>
															<Radio name="selectedEducation" value="Prefer Not to Answer" checked={this.state.selectedEducation == "Prefer Not to Answer" ? true : false}
                                                            onChange={this.modalonChange('selectedEducation')}>Prefer Not to Answer</Radio>
														</td>
													</tr>
													</tbody>
												</Table>
												</FormGroup>
												</Panel>
												
												<Panel>	
												<FormGroup className="formlabel">
													<Table condensed>
													<thead>
														<tr>
															<th><h4>Please select the option that best describes your current employment status:</h4></th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>
																<Radio name="selectedStatus" value="Employed Full-Time" checked={this.state.selectedStatus == "Employed Full-Time" ? true : false}
                                                                onChange={this.modalonChange('selectedStatus')}>Employed Full-Time</Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="selectedStatus" value="Employed Part-Time" checked={this.state.selectedStatus == "Employed Part-Time" ? true : false}
                                                                onChange={this.modalonChange('selectedStatus')}>Employed Part-Time</Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="selectedStatus" value="Self-employed" checked={this.state.selectedStatus == "Self-employed" ? true : false}
                                                                onChange={this.modalonChange('selectedStatus')}>Self-employed</Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="selectedStatus" value="Not employed, but looking for work" checked={this.state.selectedStatus == "Not employed, but looking for work" ? true : false}
                                                                onChange={this.modalonChange('selectedStatus')}>Not employed, but looking for work</Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="selectedStatus" value="Not employed and not looking for work" checked={this.state.selectedStatus == "Not employed and not looking for work" ? true : false}
                                                                onChange={this.modalonChange('selectedStatus')}>Not employed and not looking for work</Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="selectedStatus" value="Homemaker" checked={this.state.selectedStatus == "Homemaker" ? true : false}
                                                                onChange={this.modalonChange('selectedStatus')}>Homemaker</Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="selectedStatus" value="Retired" checked={this.state.selectedStatus == "Retired" ? true : false}
                                                                onChange={this.modalonChange('selectedStatus')}>Retired</Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="selectedStatus" value="Student" checked={this.state.selectedStatus == "Student" ? true : false}
                                                                onChange={this.modalonChange('selectedStatus')}>Student</Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="selectedStatus" value="Prefer Not to Answer" checked={this.state.selectedStatus == "Prefer Not to Answer" ? true : false}
                                                                onChange={this.modalonChange('selectedStatus')}>Prefer Not to Answer</Radio>
															</td>
														</tr>
														</tbody>
													</Table>
													
													
													<Table condensed>
													<thead>
														<tr>
															<th><h4>Please select the range of your household's overall annual income:</h4></th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>
																<Radio name="selectedIncome" value="Under $20,000" checked={this.state.selectedIncome == "Under $20,000" ? true : false}
                                                                onChange={this.modalonChange('selectedIncome')}>Under $20,000</Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="selectedIncome" value="$20,000 - $30,000" checked={this.state.selectedIncome == "$20,000 - $30,000" ? true : false}
                                                                onChange={this.modalonChange('selectedIncome')}>$20,000 - $30,000</Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="selectedIncome" value="$30,000 - $40,000" checked={this.state.selectedIncome == "$30,000 - $40,000" ? true : false}
                                                                onChange={this.modalonChange('selectedIncome')}>$30,000 - $40,000</Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="selectedIncome" value="$40,000 - $50,000" checked={this.state.selectedIncome == "$40,000 - $50,000" ? true : false}
                                                                onChange={this.modalonChange('selectedIncome')}>$40,000 - $50,000</Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="selectedIncome" value="$50,000 - $75,000" checked={this.state.selectedIncome == "$50,000 - $75,000" ? true : false}
                                                                onChange={this.modalonChange('selectedIncome')}>$50,000 - $75,000</Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="selectedIncome" value="$75,000 - $100,000" checked={this.state.selectedIncome == "$75,000 - $100,000" ? true : false}
                                                                onChange={this.modalonChange('selectedIncome')}>$75,000 - $100,000</Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="selectedIncome" value="$100,000 - $150,000" checked={this.state.selectedIncome == "$100,000 - $150,000" ? true : false}
                                                                onChange={this.modalonChange('selectedIncome')}>$100,000 - $150,000</Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="selectedIncome" value="$$150,000 or more" checked={this.state.selectedIncome == "$100,000 - $150,000" ? true : false}
                                                                onChange={this.modalonChange('selectedIncome')}>$150,000 or more</Radio>
															</td>
														</tr>
														<tr>
															<td>
																<Radio name="selectedIncome" value="Prefer Not to Answer" checked={this.state.selectedIncome == "Prefer Not to Answer" ? true : false}
                                                                onChange={this.modalonChange('selectedIncome')}>Prefer Not to Answer</Radio>
															</td>
														</tr>
														</tbody>
													</Table>
													
													</FormGroup>
													</Panel>
                                                    
                                                    
                                                    <Panel>	
                                                    <FormGroup className="formlabel">
                                                        <Table condensed>
                                                        <thead>
                                                            <tr>
                                                                <th><h4>Have you ever had sex before?</h4></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <Radio name="selectedSexex" value="Yes" checked={this.state.selectedSexex == "Yes" ? true : false}
                                                                    onChange={this.modalonChange('selectedSexex')}>Yes</Radio>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <Radio name="selectedSexex" value="No" checked={this.state.selectedSexex == "No" ? true : false}
                                                                    onChange={this.modalonChange('selectedSexex')}>No</Radio>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <Radio name="selectedSexex" value="Prefer Not to Answer" checked={this.state.selectedSexex == "Prefer Not to Answer" ? true : false}
                                                                    onChange={this.modalonChange('selectedSexex')}>Prefer Not to Answer</Radio>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </Table>
                                                        </FormGroup>
                                                        </Panel>
                                                        
                                                        <Panel>	
                                                        <FormGroup className="formlabel">
                                                            <Table condensed>
                                                            <thead>
                                                                <tr>
                                                                    <th><h4>Are you currently sexually active?</h4></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <Radio name="selectedSexact" value="Yes" checked={this.state.selectedSexact == "Yes" ? true : false}
                                                                    onChange={this.modalonChange('selectedSexact')}>Yes</Radio>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <Radio name="selectedSexact" value="No" checked={this.state.selectedSexact == "No" ? true : false}
                                                                    onChange={this.modalonChange('selectedSexact')}>No</Radio>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <Radio name="selectedSexact" value="Prefer Not to Answer" checked={this.state.selectedSexact == "Prefer Not to Answer" ? true : false}
                                                                    onChange={this.modalonChange('selectedSexact')}>Prefer Not to Answer</Radio>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </Table>
                                                            </FormGroup>
                                                            </Panel>
										
												
												<Panel>
													<FormGroup>
													<h4>Please provide the total number of people you have been sexually active with:</h4>
													<FormControl
														placeholder="- - -"
														type="number"
														min="0"
														value={this.state.selectedSexfreq}
														onChange={this.modalonChange('selectedSexfreq')}
														/>			
													</FormGroup>
												
													<FormGroup>
													<h4>Please provide the number of people you are were sexually active with in the past month:</h4>
													<FormControl
														placeholder="- - -"
														type="number"
														min="0"
														value={this.state.selectedSexmos}
														onChange={this.modalonChange('selectedSexmos')}
														/>			
													</FormGroup>
												</Panel>
                                                
                                                <Panel>	
                                                <FormGroup className="formlabel">
                                                <Table condensed>
                                                      <thead>
                                                        <tr>
                                                        <th><h4>Thinking about your current sexual activity, please indicate the average amount of sex you have:</h4></th>
                                                        </tr>
                                                      </thead>
                                                      <tbody>
                                                        <tr>
                                                            <td>
                                                                <Radio name="selectedSexave" value="Less than once a month" checked={this.state.selectedSexave == "Less than once a month" ? true : false}
                                                                onChange={this.modalonChange('selectedSexave')}>Less than once a month</Radio>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                            <Radio name="selectedSexave" value="Once or twice a month" checked={this.state.selectedSexave == "Once or twice a month" ? true : false}
                                                                onChange={this.modalonChange('selectedSexave')}>Once or twice a month</Radio>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                            <Radio name="selectedSexave" value="Weekly" checked={this.state.selectedSexave == "Weekly" ? true : false}
                                                                onChange={this.modalonChange('selectedSexave')}>Weekly</Radio>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                            <Radio name="selectedSexave" value="2-3 times a week" checked={this.state.selectedSexave == "2-3 times a week" ? true : false}
                                                                onChange={this.modalonChange('selectedSexave')}>2-3 times a week</Radio>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                            <Radio name="selectedSexave" value="4-5 times a week" checked={this.state.selectedSexave == "4-5 times a week" ? true : false}
                                                                onChange={this.modalonChange('selectedSexave')}>4-5 times a week</Radio>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                            <Radio name="selectedSexave" value="More than 5 times a week" checked={this.state.selectedSexave == "More than 5 times a week" ? true : false}
                                                                onChange={this.modalonChange('selectedSexave')}>More than 5 times a week</Radio>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                            <Radio name="selectedSexave" value="Prefer Not to Answer" checked={this.state.selectedSexave == "Prefer Not to Answer" ? true : false}
                                                                onChange={this.modalonChange('selectedSexave')}>Prefer Not to Answer</Radio>
                                                            </td>
                                                        </tr>
                                                      </tbody>
                                                   </Table>
                                                   </FormGroup>
                                                   </Panel>
                                                   
                                                   <Panel>	
                                                <FormGroup className="formlabel">
                                                <Table condensed>
                                                      <thead>
                                                        <tr>
                                                        <th><h4>Based on the past month, what was the status of your sex partner(s):</h4></th>
                                                        </tr>
                                                      </thead>
                                                      <tbody>
                                                        <tr>
                                                            <td>
                                                            <Checkbox value="Spouse"
                                                                        checked={this.state.selectedMovies.indexOf('Spouse')>=0 ? true:false}
                                                                        onChange={this.modalcheckboxChange('selectedMovies')}>
                                                                    <p className="formlabel">Spouse</p>
                                                                </Checkbox>
                                                            </td>
                                                        </tr>
                                                        
                                                       
                                                        
                                                        <tr>
                                                            <td>
                                                            <Checkbox value="Common Law Spouse"
                                                                        checked={this.state.selectedMovies.indexOf('Common Law Spouse')>=0 ? true:false}
                                                                        onChange={this.modalcheckboxChange('selectedMovies')}>
                                                                    <p className="formlabel">Common Law Spouse</p>
                                                                </Checkbox>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                            <Checkbox value="Girlfriend/Boyfriend"
                                                                        checked={this.state.selectedMovies.indexOf('Girlfriend/Boyfriend')>=0 ? true:false}
                                                                        onChange={this.modalcheckboxChange('selectedMovies')}>
                                                                    <p className="formlabel">Girlfriend/Boyfriend</p>
                                                                </Checkbox>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                            <Checkbox value="Friend"
                                                                        checked={this.state.selectedMovies.indexOf('Friend')>=0 ? true:false}
                                                                        onChange={this.modalcheckboxChange('selectedMovies')}>
                                                                    <p className="formlabel">Friend</p>
                                                                </Checkbox>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                            <Checkbox value="One Night Stand"
                                                                        checked={this.state.selectedMovies.indexOf('One Night Stand')>=0 ? true:false}
                                                                        onChange={this.modalcheckboxChange('selectedMovies')}>
                                                                    <p className="formlabel">One Night Stand</p>
                                                                </Checkbox>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                            <Checkbox value="Prefer Not to Answer"
                                                                        checked={this.state.selectedMovies.indexOf('Prefer Not to Answer')>=0 ? true:false}
                                                                        onChange={this.modalcheckboxChange('selectedMovies')}>
                                                                    <p className="formlabel">Prefer Not to Answer</p>
                                                                </Checkbox>
                                                            </td>
                                                        </tr>
                                                      </tbody>
                                                   </Table>
                                                   </FormGroup>
                                                   </Panel>
												
                                                    <Panel>
                                                    <br/>
                                                    <h4>Finally, we would like to know if you have any comments that you think HOBOHOBO should be aware of. If so, please explain in the text box below:</h4>
                                                    <br/>
                                                    <FormGroup>
                                                        <textarea
                                                                placeholder="Enter text here..."
                                                                value={this.state.comment}
                                                                onChange={this.onChange('comment')}
                                                                cols = "100"
                                                                rows = "7"
                                                                className = "form-control"
                                                                />
                                                        </FormGroup>
                                                    </Panel>
                           
                                    <div className="buttoncenter">
                                    <ButtonGroup>

                                        <Button bsStyle="primary" onClick={this.saveEdit(this.state.selectedId)}>&nbsp;&nbsp;&nbsp;&nbsp;Save&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                                        
                                    </ButtonGroup>
                                    </div>
                                        
                            </Form>
                    </Modal.Body>
                    </Modal>
                    </div>     
                               
                           
                </div>
                
                
        );
    }
}

export default App;