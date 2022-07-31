import React from 'react'

export default function NewsItem(props) {
    
    let {title,description,imageUrl,newsUrl,author,date,source} = props;
    return (
        <div className="my-3">
            <div className="card my-3 mx-3">
                <div className="d-flex" style={{justifyContent: "flex-end" , position: "absolute" , right: "0"}}>
                    <span className="badge bg-danger"> {source} </span>
                </div>
                <img src={imageUrl} className="card-img-top" alt=""/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By <b>{author}</b> on <br /> <b>{new Date(date).toGMTString()}</b></small></p>
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark text-light">Read More</a>
                </div>
            </div>
            </div>
    )
}
