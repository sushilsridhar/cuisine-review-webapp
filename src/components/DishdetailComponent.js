import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import { Button, Modal, ModalHeader, ModalBody,
     FormGroup, Label, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


    function RenderDish({dishDetails}) {
        return(
            <Card>
                <CardImg top src={baseUrl + dishDetails.image} alt={dishDetails.name} />
                <CardBody>
                    <CardTitle>{dishDetails.name}</CardTitle>
                    <CardText>{dishDetails.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    function RenderComments({comments, addComment, dishId}) {
        if(comments != null) {  
            var allComments = []          
            for(var i=0; i<comments.length; i++) {
                allComments.push(
                <div key={comments[i].id}>
                    <ol className="list-unstyled">
                        <li>{comments[i].comment}</li>
                        <li>-- {comments[i].author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments[i].date)))}</li>
                    </ol>
                </div>);
            }
            
            allComments.push(<CommentForm dishId={dishId} addComment={addComment} />);

            return allComments
        } 
        else {
            return(
                <div></div>
            );
        }
    }

    const DishDetail = (props) => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) 
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>

                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className ="row">
                        <div className="col-12 col-md-5 mt-1">
                        <RenderDish dishDetails={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 mt-1">
                            <h4>Comments</h4>
                            <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id} />
                        </div>
                    </div>
                </div>    
            );
    }

export default DishDetail;

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
              isModalOpen: false
        };
    }

    handleSubmit(values) {
        this.toggleModal();
        console.log('Current State is: ' + JSON.stringify(values));
        //alert('Current State is: ' + JSON.stringify(values));
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    
    render() {
        return(
            <React.Fragment>
                    <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <FormGroup>
                                    <Label htmlFor="rating" md={2}>Rating</Label>
                                    <Col>
                                       <Control.select model=".rating" id="rating" name="rating"
                                                    className="form-control">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                        </Control.select>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="name" md={2}>Name</Label>
                                    <Col>
                                        <Control.text model=".author" id="name" name="name"
                                            placeholder="Your Name"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }}
                                            />
                                        <Errors
                                            className="text-danger"
                                            model=".name"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="message" md={2}>Comment</Label>
                                    <Col>
                                        <Control.textarea model=".comment" id="message" name="message"
                                            rows="6"
                                            className="form-control" />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col>
                                        <Button type="submit" value="submit" color="primary">Submit</Button>
                                    </Col>
                                </FormGroup>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
            </React.Fragment>
        );
    }
}