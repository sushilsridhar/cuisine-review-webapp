import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

    function RenderDish({dishDetails}) {
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

    function RenderComments({comments}) {
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
            return allComments
        } 
        else {
            return(
                <div></div>
            );
        }
    }

    const DishDetail = (props) => {

        const dishDetails = props.dishDetails;
        return(
            <div className="container">
                <div className ="row">
                    <div className="col-12 col-md-5 mt-1">
                       {dishDetails.map((dish)=> <RenderDish dishDetails={dish} /> )}
                    </div>
                    <div className="col-12 col-md-5 mt-1">
                        <h4>Comments</h4>
                        {dishDetails.map((dish)=> <RenderComments comments={dish.comments} /> )}
                    </div>
                </div>
            </div>    
        );
    }

export default DishDetail;