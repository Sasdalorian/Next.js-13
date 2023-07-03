const fetchComments = async (id) => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, {
        next: {
            revalidate: 60
        }
    }).then(res => res.json())
};

export default async function Post({ params }) {    
    const { id } = params;
    const comment = await fetchComments(id)

    return (
        <ul style={{ background: "#444", fontSize: "12px", padding: "2rem"}}>
            {comment.map(comment => (
                <li key={comment.id}>
                    <img style={{ width: "50px", height: "50px"}} alt={comment.name} src={`https://avatars.dicebear.com/api/pixel-art-neutral/${comment.email}.svg`} />
                    <h2>{comment.name}</h2>
                    <small>{comment.body}</small>
                </li>
            ))}
        </ul>
    )
}