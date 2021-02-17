import useFetch from "./useFetch";
import BlogList from "./BlogList";

const Home = () => {
   const {data, isPending, error } = useFetch("http://localhost:3000/blogs");

    return ( 
        <div className="home">
            { error && <div>{ error }</div>}
            { isPending && <div>Loading...</div>}
           {data && <BlogList blogs={data} title="All blogs" />}
        </div>
    );
}

export default Home;