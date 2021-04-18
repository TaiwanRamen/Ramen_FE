import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory(); //this object represent history

  useEffect(()=>{
    // console.log(title);
  }, [title]);

  useEffect(()=>{
    // console.log(body);
  }, [body]); 
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      const blog = {title, body, author};
      setIsPending(true);
      let res = await fetch('http://localhost:8000/blogs', {
        method: 'POST',
        headers: { "Content-Type" : "application/JSON"},
        body: JSON.stringify(blog)
      });

      console.log(res);
      setIsPending(false);
      // history.go(-1); 
      history.push('/'); //goto '/'
    }

    return (
      <div className="create">
        <form onSubmit={handleSubmit}>
        <label>Blog title</label>
          <input 
            type="test" 
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
          <label>Blog body</label>
          <textarea required onChange={(e) => setBody(e.target.value)}/>
          <label>Blog author</label>
          <select value={author} onChange={(e) => setAuthor(e.target.value)}>
            <option value="mario">mario</option>
            <option value="julian">julian</option>
          </select>
          {!isPending && <button>add blog</button>}
          {isPending && <button disabled>adding blogggggggggg</button>}

        </form>
      </div>
    );
  }
  
   
  export default Create;