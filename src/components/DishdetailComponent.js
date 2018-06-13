import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props){
        super(props);
    }

    renderDish(dishDetails) {
        return(
            <Card>
                <CardImg width="100%" src={dishDetails.image} alt={dishDetails.name} />
                <CardBody>
                    <CardTitle>{dishDetails.name}</CardTitle>
                    <CardText>{dishDetails.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    renderComments(comments) {
        if(comments != null) {  
            var allComments = []          
            for(var i=0; i<comments.length; i++) {
                allComments.push(
                <div key={comments[i].id}>
                    <ol className="list-unstyled">
                        <li>{comments[i].comment}</li>
                        <li>-- {comments[i].author}, {comments[i].date}</li>
                    </ol>
                </div>);
            }
            return allComments
        } 
        else {
            return(
                <div></div>
            );
        }
    }

    render() {
        const dishDetails = this.props.dishDetails;
        return(
            <div className="container">
                <div className ="row">
                    <div className="col-12 col-md-5 mt-1">
                       {this.renderDish(dishDetails)}
                    </div>
                    <div className="col-12 col-md-5 mt-1">
                        <h4>Comments</h4>
                        {this.renderComments(dishDetails.comments)}
                    </div>
                </div>
            </div>    
        );
    }

}

export default DishDetail;