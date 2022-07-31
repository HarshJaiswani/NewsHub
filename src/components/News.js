import React, {useEffect,useState}  from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    
    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
        // setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        // setLoading(false);
        props.setProgress(100);
    };
    useEffect(() => {
        document.title = capitalise(props.category) + ' - NewsHub';
        updateNews();
        // eslint-disable-next-line
    }, [])
    const fetchMoreData = async () =>  {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pagesize=${props.pageSize}`;
        setPage(page + 1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
    };
    // const handlePClick = async () => {
    //     setPage(page - 1);
    //     updateNews();
    // }
    // const handleNClick = async () => {
        //     setPage(page + 1);
    //     updateNews();
    // }
    const capitalise = (word) => {
        let a = word.toString().toLowerCase();
        return a.slice(0,1).toUpperCase() + word.slice(1);
    }
    let defaultUrl = '../assets/news.jpg';
    return (
        <>
                {/* <div className="container"> */}
                    <InfiniteScroll
                        dataLength={articles.length}
                        next={fetchMoreData}
                        hasMore={articles.length !== totalResults}
                        loader={<Spinner/>}
                        style={{overflow: 'visible'}}
                    >
                    <h1 className="text-center" style={{margin: '30px 0px',marginTop: '90px'}}> <span style={{color: 'crimson'}}> NewsHub </span>  : Top {capitalise(props.category)} Headlines </h1>
                    {/* {loading && <Spinner />} */}
                    <div className="container">
                        <div className="row">
                            {articles.map((element) => {
                                return <div className="col-md-4" key={element.url === null ? Math.random(): element.url}>
                                    <NewsItem title={element.title == null ? '' : element.title} description={element.description == null ? '' : element.description.slice(0, 100)} imageUrl={element.urlToImage == null ? defaultUrl : element.urlToImage} newsUrl={element.url} author={element.author === null ? 'Unknown':element.author} date={element.publishedAt === null ? 'Unknown' : element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                    </InfiniteScroll>
                {/* </div> */}
                {/* <div className="container d-flex my-3 justify-content-between">
                    <button disabled={page <= 1} className="btn btn-dark" onClick={handlePClick}>&larr; Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults / 6)} className="btn btn-dark" onClick={handleNClick}>Next &rarr;</button>
                </div> */}
            </>
        )
    
}

export default News

News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}