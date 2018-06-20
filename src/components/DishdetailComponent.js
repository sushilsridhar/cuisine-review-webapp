import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


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
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            </div>    
        );
    }

export default DishDetail;