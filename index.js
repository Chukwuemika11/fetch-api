const { useEffect } = require("react");

// post request
const [blogs, setBlogs] = useState([]);
const [title, setTitle] = useState('');
const [content, setContent] = useState('');
const [author, setAuthor] = useState('');

function handleSubmit(event){
    event.preventDefault();

    const blog = {
        title,
        content,
        author,
        date: new Date().toISOString()
    }
}

fetch("http://localhost:8000/blog",{
    method: "POST",
    headers: {"content-type": "application/json"},
    body : JSON.stringify(blog)
}).then(function(response){
    if(response.ok){
        console.log("new blog added successfully");
        fetchBlogs();
    }else{
        console.error("Failed to add new  blog")
    }
}).catch(function(error){
    console.error("Error:", error);
})

const fetchBlogs = function(){
fetch("http://localhost/8000/blog/",{
    method: "GET",
    headers: {"Content-Type": "application/json"}
}).then(function(response){
    if(response.ok){
        return response.json();
    }else{
        console.log("Failed to get blogs");
    }
    
}).then(function(data){
    setBlogs(data)

}).catch(function(error){
    console.log("Error:", error)
})

};

useEffect(()=>{
    fetchBlogs();
},[]);

<div>
<h1>Blog Manager</h1>
<form onSubmit={handleSubmit}>
    <input 
        type="text" 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
        placeholder="Title" 
        required 
    />
    <textarea 
        value={content} 
        onChange={e => setContent(e.target.value)} 
        placeholder="Content" 
        required 
    />
    <input 
        type="text" 
        value={author} 
        onChange={e => setAuthor(e.target.value)} 
        placeholder="Author" 
        required 
    />
    <button type="submit">Add Blog</button>
</form>
<h2>Blogs</h2>
<div>
    {blogs.map((blog, index) => (
        <div key={index}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <p><em>{blog.author}</em></p>
            <p><small>{blog.date}</small></p>
        </div>
    ))}

    {blogs.map((blog, index)=>(
                <div key={index}>
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
                <p><em>{blog.author}</em></p>
                <p><small>{blog.date}</small></p>
            </div>
    
    ))}
</div>
</div>