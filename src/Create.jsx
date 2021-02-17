import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("");
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    function handleSubmit(e){
        e.preventDefault();
        const blog = {title, body, author};
        
        fetch('http://localhost:3000/blogs', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(blog)
        })
        .then(res => {
            setIsPending(false)
            console.log("blog added")

           // history.go(-1);
           history.push("/");
        })
    }

    return (  
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={(e) => {handleSubmit(e)}}>
                <label htmlFor="">Blog Title</label>
                <input type="text" 
                        value={title} 
                        onChange={
                            (e) => {setTitle(e.target.value); 
                            console.log(title)}} required/>

                <label htmlFor="">Blog Body</label>
                <textarea value={body} 
                        onChange={
                            (e) => {setBody(e.target.value); 
                            }}></textarea>

                <label htmlFor="">Blog Author</label>
                <select value={author} onChange={(e) => {setAuthor(e.target.value); console.log(author)}}>
                    <option value="mario">Mario</option>
                    <option value="luigi">Luigi</option>
                </select>

                {!isPending && <button type="submit">Add Blog</button>}
                {isPending && <button type="submit" disabled>Loading...</button>}
            </form>
            <p>{author}</p>
        </div>
    );
}
 
export default Create;