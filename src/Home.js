import BlogList from './BlogList';
import useFetch from './useFetch';


const Home = () => {
    const { data:blogs, isLoading, error} = useFetch('http://localhost:8000/blogs');

    return ( 
    <div className="home">

            {isLoading && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} title="All blogs"/>}
            {error && <div>ERROR</div>}

    </div>
    );
}
 
export default Home;