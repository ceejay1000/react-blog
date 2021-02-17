import { useParams , useHistory} from "react-router-dom";
import useFetch from "./useFetch";
import React from "react";

const BlogDetails = () => {
    const { id } = useParams();
    const { data, error, isPending } = useFetch(`http://localhost:3000/blogs/${id}`)
    const history = useHistory();

    function handleClick(){
        fetch('http://localhost:3000/blogs/' + id, {
            method: "DELETE"
        })
        .then(() => {
            history.push("/");
        })
    }

    return ( 
        <div className="blog-details">
            <React.Fragment>
                { isPending &&  <div>Loading...</div>}
                { error &&  <div>{ error }</div>}
                { data && (
                    <article>
                        <h2>{ data.title }</h2>
                        <p>Written by { data.author }</p>
                        <div className="blog-body">{ data.body }</div>
                        <button onClick={handleClick}>Delete</button>
                    </article>
                )}
            </React.Fragment>

        </div>
     );
}
 
export default BlogDetails;