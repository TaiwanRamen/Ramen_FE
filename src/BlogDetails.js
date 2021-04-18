import { useParams } from "react-router";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, error, isLoading} = useFetch(`http://localhost:8000/blogs/${id}`);
    const history = useHistory(); 

    const handleClick = async () => {
        await fetch(`http://localhost:8000/blogs/${blog.id}`, {
            method: 'DELETE'
        });
        history.push('/');
    }
    
    return ( 
        <div className="blog-details">
            
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Writen by {blog.author}</p>
                    <div>{blog.body}</div>
                </article>
            )}
            <button onClick={handleClick}>delete</button>
        </div>
     );
}
 
export default BlogDetails;